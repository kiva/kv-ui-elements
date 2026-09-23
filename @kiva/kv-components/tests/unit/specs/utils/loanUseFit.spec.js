import {
	READ_MORE_CLASS,
	overflows,
	findStatementTail,
	trimStatementToFit,
	fitStatement,
} from '#utils/loanUseFit';

// jsdom has no layout, so each paragraph fakes its own box: `clientHeight` is the visible height
// of the clamp and `scrollHeight` grows with the text, one line per CHARS_PER_LINE.
const LINE = 18;
const CHARS_PER_LINE = 40;

const PREFIX = '$375 helps <span class="tw-font-medium">Arfa in Pakistan</span>';
const LINK = `<span class="${READ_MORE_CLASS}">read more</span>`;
const SHORT_USE = 'buy seeds.';
const LONG_USE = 'buy raw materials such as thread, sequins, pearls and other embroidery supplies '
	+ 'in large quantities so that she can take on bigger orders from her regular customers.';
// Fills the three fake lines on its own but leaves no room for " read more".
const EXACT_USE = 'buy a new set of pots, pans and a gas stove so she can cook and sell more food each day.';

const fakeBox = (statement, { visibleLines }) => {
	Object.defineProperty(statement, 'clientHeight', { get: () => visibleLines * LINE });
	Object.defineProperty(statement, 'scrollHeight', {
		get: () => Math.max(1, Math.ceil(statement.textContent.length / CHARS_PER_LINE)) * LINE,
	});
	return statement;
};

const buildStatement = (html, { visibleLines = 3 } = {}) => {
	const statement = document.createElement('p');
	statement.innerHTML = html;
	return fakeBox(statement, { visibleLines });
};

const withLink = (use) => `${PREFIX} ${use} ${LINK}`;

describe('loanUseFit', () => {
	describe('overflows', () => {
		it('is false when the text fits inside the visible lines', () => {
			expect(overflows(buildStatement(withLink(SHORT_USE)))).toBe(false);
		});

		it('is true when the text needs more lines than are visible', () => {
			expect(overflows(buildStatement(withLink(LONG_USE)))).toBe(true);
		});

		it('tolerates a one pixel difference', () => {
			const statement = document.createElement('p');
			Object.defineProperty(statement, 'clientHeight', { get: () => 54 });
			Object.defineProperty(statement, 'scrollHeight', { get: () => 55 });
			expect(overflows(statement)).toBe(false);
		});
	});

	describe('findStatementTail', () => {
		it('returns the text node right before the "read more" link', () => {
			const tail = findStatementTail(buildStatement(withLink(LONG_USE)));
			expect(tail.nodeType).toBe(Node.TEXT_NODE);
			expect(tail.textContent).toBe(` ${LONG_USE} `);
		});

		it('skips whitespace-only text and non-text nodes between the tail and the link', () => {
			const tail = findStatementTail(buildStatement(`${PREFIX} ${SHORT_USE}<b>!</b>   ${LINK}`));
			expect(tail.textContent).toBe(` ${SHORT_USE}`);
		});

		it('falls back to the last text node when there is no link', () => {
			const tail = findStatementTail(buildStatement(`${PREFIX} ${SHORT_USE}`));
			expect(tail.textContent).toBe(` ${SHORT_USE}`);
		});

		it('returns null when the statement has no text of its own', () => {
			expect(findStatementTail(buildStatement(LINK))).toBeNull();
		});
	});

	describe('trimStatementToFit', () => {
		it('keeps as many whole words as fit and ends with an ellipsis before the link', () => {
			const statement = buildStatement(withLink(LONG_USE));
			trimStatementToFit(statement);

			const text = statement.textContent;
			expect(text).toMatch(/\S… read more$/);
			expect(text.length).toBeLessThanOrEqual(3 * CHARS_PER_LINE);
			expect(statement.querySelector(`.${READ_MORE_CLASS}`).textContent).toBe('read more');

			// One more word would not have fit, so the search found the maximum.
			const kept = text.replace(/… read more$/, '');
			const keptUseWords = kept.trim().split(' ').length - 'Arfa in Pakistan $375 helps'.split(' ').length;
			const nextWord = LONG_USE.split(' ')[keptUseWords];
			expect(`${kept} ${nextWord}… read more`.length).toBeGreaterThan(3 * CHARS_PER_LINE);
		});

		it('preserves the space between the name and the use text', () => {
			const statement = buildStatement(withLink(LONG_USE));
			trimStatementToFit(statement);
			expect(statement.textContent).toContain('Arfa in Pakistan buy raw materials');
			expect(statement.querySelector('.tw-font-medium').textContent).toBe('Arfa in Pakistan');
		});

		it('drops trailing punctuation before the ellipsis', () => {
			const statement = buildStatement(withLink(
				'buy thread, sequins, pearls, beads, ribbons, needles, fabric, buttons, zippers, lace, '
				+ 'yarn, wool, cotton, silk, dye, and more.',
			));
			trimStatementToFit(statement);
			expect(statement.textContent).toMatch(/[a-z]… read more$/);
			expect(statement.textContent).not.toMatch(/[,;:]…/);
		});

		it('keeps one word when even that does not fit', () => {
			const statement = buildStatement(withLink(LONG_USE), { visibleLines: 1 });
			trimStatementToFit(statement);
			expect(statement.textContent).toBe('$375 helps Arfa in Pakistan buy… read more');
		});

		it('leaves a statement without a tail untouched', () => {
			const statement = buildStatement(LINK);
			trimStatementToFit(statement);
			expect(statement.innerHTML).toBe(LINK);
		});
	});

	describe('fitStatement', () => {
		it('shows a statement that fits together with its link', () => {
			const statement = buildStatement('');
			fitStatement(statement, withLink(SHORT_USE));
			expect(statement.textContent).toBe(`$375 helps Arfa in Pakistan ${SHORT_USE} read more`);
		});

		it('drops the link when the statement alone fills the lines', () => {
			const statement = buildStatement('');
			fitStatement(statement, withLink(EXACT_USE));
			expect(statement.textContent).toBe(`$375 helps Arfa in Pakistan ${EXACT_USE}`);
			expect(statement.querySelector(`.${READ_MORE_CLASS}`)).toBeNull();
		});

		it('trims and keeps the link when the statement itself runs past the lines', () => {
			const statement = buildStatement('');
			fitStatement(statement, withLink(LONG_USE));
			expect(statement.textContent).toMatch(/\S\u2026 read more$/);
			expect(statement.querySelector(`.${READ_MORE_CLASS}`).textContent).toBe('read more');
		});

		it('shows the whole statement again once there is room for it', () => {
			const statement = buildStatement('', { visibleLines: 10 });
			fitStatement(statement, withLink(LONG_USE));
			expect(statement.textContent).toBe(`$375 helps Arfa in Pakistan ${LONG_USE} read more`);
		});
	});
});
