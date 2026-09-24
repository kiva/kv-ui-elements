import { render } from '@testing-library/vue';
import { nextTick } from 'vue';
import { axe } from 'jest-axe';
import KvLoanUse from '#components/KvLoanUse.vue';

const baseProps = {
	use: 'to purchase a milking cow to increase her dairy production.',
	loanAmount: '1000.00',
	status: 'fundraising',
	borrowerCount: 1,
	name: 'Alan',
	country: 'Uganda',
};

// jsdom has no layout, so the paragraph's box is faked: `clientHeight` is the visible height of
// the clamp and `scrollHeight` grows with the text, one line per CHARS_PER_LINE.
const LINE = 18;
const CHARS_PER_LINE = 40;
let visibleLines = 3;

// jsdom defines these on Element.prototype.
const clientHeight = Object.getOwnPropertyDescriptor(Element.prototype, 'clientHeight');
const scrollHeight = Object.getOwnPropertyDescriptor(Element.prototype, 'scrollHeight');
// jsdom has no ResizeObserver; tests that need one install this stub and afterEach puts the original
// back. The stub records what is observed and lets a test fire the callbacks by hand.
const OriginalResizeObserver = window.ResizeObserver;
const resizeCallbacks = [];
const observed = [];
class ResizeObserverStub {
	constructor(callback) { resizeCallbacks.push(callback); }

	observe(element) { observed.push(element); return this; }

	disconnect() { observed.length = 0; return this; }
}

const SHORT_USE = 'buy seeds.';
const LONG_USE = 'buy raw materials such as thread, sequins, pearls and other embroidery supplies '
	+ 'in large quantities so that she can take on bigger orders from her regular customers.';
// Fills the three fake lines on its own but leaves no room for " read more".
const EXACT_USE = 'buy a new set of pots, pans and a gas stove so she can cook and sell more food each day.';

const readMoreProps = {
	loanAmount: '375.00',
	status: 'fundraising',
	name: 'Arfa',
	country: 'Pakistan',
	boldName: true,
	distributionModel: 'partner',
};

const renderStatement = (props = {}) => {
	const utils = render(KvLoanUse, { props: { ...readMoreProps, ...props } });
	return { ...utils, statement: utils.container.querySelector('p') };
};

describe('KvLoanUse', () => {
	// These two blocks had no prior test coverage, though the sentence-building logic they pin
	// predates this file - a regression here would previously have gone unnoticed.
	describe('default sentence (no special props)', () => {
		it('builds "$amount to Name helps use" for a direct loan', () => {
			const { container } = render(KvLoanUse, { props: baseProps });

			expect(container.textContent).toContain(
				'$1,000 to Alan helps to purchase a milking cow to increase her dairy production.',
			);
		});
	});

	describe('hideLoanAmount', () => {
		it('builds "Help Name use" without the dollar amount', () => {
			const { container } = render(KvLoanUse, {
				props: { ...baseProps, hideLoanAmount: true },
			});

			expect(container.textContent).toContain(
				'Help Alan to purchase a milking cow to increase her dairy production.',
			);
			expect(container.textContent).not.toContain('$1,000');
		});
	});

	describe('hideBorrowerDetails', () => {
		it('shows the use statement without the amount, name, or country', () => {
			const { container } = render(KvLoanUse, {
				props: { ...baseProps, hideBorrowerDetails: true },
			});

			expect(container.textContent).toBe(
				'Helps to purchase a milking cow to increase her dairy production.',
			);
		});

		it('ignores read-more truncation and always renders the full statement', () => {
			const { container, queryByText } = render(KvLoanUse, {
				props: {
					...baseProps,
					hideBorrowerDetails: true,
					showReadMore: true,
					truncateWordsNumber: 3,
				},
			});

			expect(container.textContent).toBe(
				'Helps to purchase a milking cow to increase her dairy production.',
			);
			expect(queryByText('read more')).not.toBeInTheDocument();
		});

		it('still shows the privacy message for fully anonymized loans', () => {
			const { container } = render(KvLoanUse, {
				props: {
					...baseProps,
					hideBorrowerDetails: true,
					anonymizationLevel: 'full',
				},
			});

			expect(container.textContent).toBe(
				'For the borrower\'s privacy, this loan has been made anonymous.',
			);
		});

		// hideBorrowerDetails and hideLoanAmount both shorten the sentence; no consumer sets both
		// today, but the precedence has to be *something* deterministic. Pinning it here so a
		// future refactor of loanUse()'s branch order doesn't change it silently.
		it('takes precedence over hideLoanAmount when both are set', () => {
			const { container } = render(KvLoanUse, {
				props: { ...baseProps, hideBorrowerDetails: true, hideLoanAmount: true },
			});

			expect(container.textContent).toBe(
				'Helps to purchase a milking cow to increase her dairy production.',
			);
		});
	});

	describe('maxLines and read more', () => {
		beforeEach(() => {
			visibleLines = 3;
			resizeCallbacks.length = 0;
			observed.length = 0;
			Object.defineProperty(Element.prototype, 'clientHeight', {
				configurable: true,
				get() { return visibleLines * LINE; },
			});
			Object.defineProperty(Element.prototype, 'scrollHeight', {
				configurable: true,
				get() { return Math.max(1, Math.ceil((this.textContent ?? '').length / CHARS_PER_LINE)) * LINE; },
			});
		});

		afterEach(() => {
			Object.defineProperty(Element.prototype, 'clientHeight', clientHeight);
			Object.defineProperty(Element.prototype, 'scrollHeight', scrollHeight);
			window.ResizeObserver = OriginalResizeObserver;
		});

		it('has no automated accessibility violations', async () => {
			const { container } = renderStatement({ use: SHORT_USE, showReadMore: true });
			expect(await axe(container)).toHaveNoViolations();
		});

		it('builds the statement from the amount, name, country and use', () => {
			const { statement } = renderStatement({ use: SHORT_USE });
			expect(statement.textContent).toBe('$375 helps Arfa in Pakistan buy seeds.');
		});

		it('keeps the plain 4-line clamp when maxLines is unset', () => {
			const { statement } = renderStatement({ use: SHORT_USE });
			expect(statement).toHaveClass('tw-line-clamp-4');
			expect(statement).not.toHaveClass('kv-loan-use-lines');
			expect(statement.getAttribute('style')).toBeNull();
		});

		it('rejects a cap that would hide the whole statement', () => {
			const { validator } = KvLoanUse.props.maxLines;
			expect(validator(null)).toBe(true);
			expect(validator(3)).toBe(true);
			expect(validator(0)).toBe(false);
		});

		it('follows the maxLines prop when set', () => {
			const { statement } = renderStatement({ use: SHORT_USE, maxLines: 3 });
			expect(statement).toHaveClass('kv-loan-use-lines');
			expect(statement.getAttribute('style')).toContain('--kv-loan-use-lines: 3');
		});

		it('appends the "read more" link when showReadMore is on', () => {
			const { statement } = renderStatement({ use: SHORT_USE, showReadMore: true });
			expect(statement.textContent).toBe('$375 helps Arfa in Pakistan buy seeds. read more');
			expect(statement.querySelector('.tw-text-action').textContent).toBe('read more');
		});

		describe('fitting "read more" inside the clamp', () => {
			it('leaves a statement that fits untouched', () => {
				const { statement } = renderStatement({ use: SHORT_USE, showReadMore: true, maxLines: 3 });
				expect(statement.textContent).toBe('$375 helps Arfa in Pakistan buy seeds. read more');
			});

			it('drops the link when the statement alone fills the lines', () => {
				const { statement } = renderStatement({ use: EXACT_USE, showReadMore: true, maxLines: 3 });
				expect(statement.textContent).toBe(`$375 helps Arfa in Pakistan ${EXACT_USE}`);
				expect(statement.querySelector('.tw-text-action')).toBeNull();
			});

			it('trims an overflowing statement so "… read more" ends the last visible line', () => {
				const { statement } = renderStatement({ use: LONG_USE, showReadMore: true, maxLines: 3 });

				expect(statement.textContent).toMatch(/\S\u2026 read more$/);
				expect(statement.textContent.length).toBeLessThanOrEqual(3 * CHARS_PER_LINE);
				// Keeps as many words as fit, and only trims the use text: the name markup and the space
				// after it survive.
				expect(statement.textContent).toContain('Arfa in Pakistan buy raw materials');
				expect(statement.querySelector('.tw-font-medium').textContent).toBe('Arfa in Pakistan');
				expect(statement.querySelector('.tw-text-action').textContent).toBe('read more');
			});

			it('does not leave punctuation in front of the ellipsis', () => {
				// Every word carries a trailing comma, so wherever the cut lands the kept text would end
				// in one. Long enough (158 chars against a 120-char box) that trimming always happens.
				const { statement } = renderStatement({
					use: 'buy thread, sequins, pearls, beads, ribbons, needles, fabric, buttons, zippers, lace, '
						+ 'yarn, wool, cotton, silk, dye, and more.',
					showReadMore: true,
					maxLines: 3,
				});
				expect(statement.textContent).toMatch(/[a-z]\u2026 read more$/);
				expect(statement.textContent).not.toMatch(/[,;:]\u2026/);
			});

			it('runs no fit and attaches no observer when maxLines is unset', () => {
				window.ResizeObserver = ResizeObserverStub;
				const { statement } = renderStatement({ use: LONG_USE, showReadMore: true });
				expect(statement.textContent).toBe(`$375 helps Arfa in Pakistan ${LONG_USE} read more`);
				expect(observed).toEqual([]);
			});

			it('does not touch the statement when showReadMore is off', () => {
				const { statement } = renderStatement({ use: LONG_USE, maxLines: 3 });
				expect(statement.textContent).toBe(`$375 helps Arfa in Pakistan ${LONG_USE}`);
			});

			it('does not touch the statement when hideBorrowerDetails drops the link', () => {
				const { statement } = renderStatement({
					use: LONG_USE, showReadMore: true, hideBorrowerDetails: true, maxLines: 3,
				});
				expect(statement.textContent).toBe(`Helps ${LONG_USE}`);
			});

			it('skips a paragraph with no height, as one hidden at the current breakpoint reports', () => {
				visibleLines = 0;
				const { statement } = renderStatement({ use: LONG_USE, showReadMore: true, maxLines: 3 });
				expect(statement.textContent).toBe(`$375 helps Arfa in Pakistan ${LONG_USE} read more`);
			});

			it('fits again when the statement changes, as on a loan swap', async () => {
				const { statement, rerender } = renderStatement({ use: SHORT_USE, showReadMore: true, maxLines: 3 });
				expect(statement.textContent).not.toContain('\u2026');

				await rerender({
					...readMoreProps, use: LONG_USE, showReadMore: true, maxLines: 3,
				});
				await nextTick();

				expect(statement.textContent).toMatch(/\u2026 read more$/);
			});

			it('fits once from the observer\'s initial notification, then again when the paragraph gains room', () => {
				window.ResizeObserver = ResizeObserverStub;

				const { statement, unmount } = renderStatement({ use: LONG_USE, showReadMore: true, maxLines: 3 });
				// Mounting only registers the observer; a real one reports the initial size itself.
				expect(observed).toEqual([statement]);
				expect(statement.textContent).toBe(`$375 helps Arfa in Pakistan ${LONG_USE} read more`);

				resizeCallbacks.forEach((callback) => callback());
				expect(statement.textContent).toMatch(/\u2026 read more$/);

				visibleLines = 10;
				resizeCallbacks.forEach((callback) => callback());
				expect(statement.textContent).toBe(`$375 helps Arfa in Pakistan ${LONG_USE} read more`);

				unmount();
				expect(observed).toEqual([]);
			});
		});
	});
});
