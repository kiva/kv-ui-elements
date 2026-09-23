import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import KvCompactLoanCard from '#components/KvCompactLoanCard.vue';

const loan = {
	id: 1,
	loanAmount: '1000.00',
	loanFundraisingInfo: {
		id: 1,
		fundedAmount: '250.00',
		reservedAmount: '250.00',
	},
};

const photoPath = 'https://www.kiva.org/img/';

const lightDetailedLoan = {
	id: 2,
	name: 'Talisoa',
	use: 'to purchase additional inventory for her store.',
	status: 'fundraising',
	borrowerCount: 1,
	loanAmount: '1000.00',
	geocode: {
		country: { name: 'Dominican Republic', isoCode: 'DO' },
	},
	activity: { id: 61, name: 'Retail' },
	sector: { id: 1, name: 'Food' },
	loanFundraisingInfo: {
		id: 2,
		fundedAmount: '875.00',
		reservedAmount: '0.00',
	},
};

const renderCard = (overrides = {}) => render(KvCompactLoanCard, {
	props: {
		loanId: lightDetailedLoan.id,
		loan: lightDetailedLoan,
		photoPath,
		externalLinks: true,
		customLoanDetails: true,
		showRefreshButton: true,
		customAmountLent: '25',
		kvTrackFunction: jest.fn(),
		...overrides,
	},
});
const renderLightDetailed = (overrides = {}) => renderCard({ variant: 'light-detailed', ...overrides });
const renderLightView = (overrides = {}) => renderCard({ showLightView: true, ...overrides });

describe('KvCompactLoanCard', () => {
	describe('light view loan use statement', () => {
		it('clamps the statement to 4 lines by default', () => {
			const { container } = renderLightView();
			const statement = container.querySelector('[aria-label="Loan use"] p');
			expect(statement.getAttribute('style')).toContain('--kv-loan-use-lines: 4');
		});

		it('passes loanUseMaxLines through to the statement', () => {
			const { container } = renderLightView({ loanUseMaxLines: 3 });
			const statement = container.querySelector('[aria-label="Loan use"] p');
			expect(statement.getAttribute('style')).toContain('--kv-loan-use-lines: 3');
		});
	});

	it('tracks the selected amount when the lend amount dropdown changes', async () => {
		const kvTrackFunction = jest.fn();
		const { getByRole } = render(KvCompactLoanCard, {
			props: {
				variant: 'post-goal',
				loan,
				photoPath,
				kvTrackFunction,
			},
		});

		const dropdown = getByRole('combobox', { name: 'Lend amount' });
		await userEvent.selectOptions(dropdown, '25');

		expect(kvTrackFunction).toHaveBeenCalledWith(
			'Lending',
			'Modify lend amount',
			'25',
			1,
		);
	});

	describe('light detailed variant', () => {
		it('has no automated accessibility violations', async () => {
			const { container } = renderLightDetailed();

			expect(await axe(container)).toHaveNoViolations();
		});

		it('shows a placeholder instead of "$0" or a blank name while the loan is still loading', () => {
			const { queryByText } = renderLightDetailed({ loanId: undefined, loan: undefined });

			expect(queryByText('$0')).not.toBeInTheDocument();
		});

		it('shows 2 loan-use skeleton rows while loading, one fewer than the 3-line clamp', () => {
			const { getByTestId } = renderLightDetailed({ loanId: undefined, loan: undefined });

			const rows = getByTestId('loan-use-loading').querySelectorAll('.loading-placeholder');
			expect(rows).toHaveLength(2);
		});

		it('shows the borrower name, amount, and country in a header above the loan use statement', () => {
			const { getByText, getByTestId } = renderLightDetailed();

			getByText('Talisoa');
			getByText('$1,000');
			getByText('Dominican Republic');
			expect(getByTestId('loan-use-statement').textContent).toBe(
				'Helps to purchase additional inventory for her store.',
			);
		});

		it('clamps the loan use statement to 3 lines via an ancestor, not the text element itself', () => {
			// The clamp CSS selector is a descendant combinator (`.loan-card-use-text-light-detailed :deep(p)`);
			// if this class ever lands on the text element's own root instead of a wrapper, the
			// selector silently stops matching and the 3-line clamp AC stops being enforced.
			const { getByTestId } = renderLightDetailed();

			const textEl = getByTestId('loan-use-statement');
			const clampAncestor = textEl.closest('.loan-card-use-text-light-detailed');
			expect(clampAncestor).not.toBeNull();
			expect(clampAncestor).not.toBe(textEl);
		});

		it('truncates the borrower name and country instead of wrapping, with the full value on hover', () => {
			const { getByText } = renderLightDetailed();

			expect(getByText('Talisoa')).toHaveClass('tw-truncate');
			expect(getByText('Talisoa')).toHaveAttribute('title', 'Talisoa');
			expect(getByText('Dominican Republic')).toHaveClass('tw-truncate');
			expect(getByText('Dominican Republic')).toHaveAttribute('title', 'Dominican Republic');
		});

		it('does not show the orange funding-status tag even when the loan qualifies', () => {
			// fundedAmount 950 of 1000 leaves $50 left, which qualifies for "Almost funded"
			// in the default variant (see the control test below) - the light detailed variant must
			// still suppress it.
			const { queryByText } = renderLightDetailed({
				loan: {
					...lightDetailedLoan,
					loanFundraisingInfo: {
						id: lightDetailedLoan.id,
						fundedAmount: '950.00',
						reservedAmount: '0.00',
					},
				},
			});

			expect(queryByText('Almost funded', { exact: false })).not.toBeInTheDocument();
		});

		it('does not show the refresh button', () => {
			const { queryByRole } = renderLightDetailed();

			expect(queryByRole('button')).not.toBeInTheDocument();
		});

		it('does not show a "read more" link or a "View" CTA', () => {
			const { queryByText } = renderLightDetailed();

			expect(queryByText('read more', { exact: false })).not.toBeInTheDocument();
			expect(queryByText('View')).not.toBeInTheDocument();
		});

		it('still shows the gray category pills', () => {
			const { getByText } = renderLightDetailed();

			getByText('Retail');
		});

		it('opens the borrower profile modal when the arrow is clicked', async () => {
			const kvTrackFunction = jest.fn();
			const { getByRole, emitted } = renderLightDetailed({ kvTrackFunction });

			const arrow = getByRole('link', { name: /talisoa/i });
			await userEvent.click(arrow);

			expect(kvTrackFunction).toHaveBeenCalledWith(
				'Lending',
				'click-Read more',
				'Arrow',
				lightDetailedLoan.id,
			);
			expect(emitted()['show-loan-details']).toBeTruthy();
		});

		it('renders the arrow as a real link, reachable by keyboard, with a label screen readers can read', () => {
			const { getByRole } = renderLightDetailed();

			const arrow = getByRole('link', { name: /talisoa/i });
			expect(arrow.tagName).toBe('A');
		});

		it('colors the arrow to match Figma\'s icon fill', () => {
			const { getByRole } = renderLightDetailed();

			const arrow = getByRole('link', { name: /talisoa/i });
			expect(arrow.querySelector('[role="img"]')).toHaveClass('tw-text-action');
		});

		it('caps the progress bar at a fixed width instead of stretching into the arrow', () => {
			const { container } = renderLightDetailed();

			const progressGroup = container.querySelector('.light-detailed-progress-group');
			expect(progressGroup.parentElement).toHaveStyle('max-width: 9.75rem');
		});

		it('falls back to a generic arrow label when the borrower has no name', () => {
			const { getByRole } = renderLightDetailed({ loan: { ...lightDetailedLoan, name: '' } });

			getByRole('link', { name: /this borrower/i });
		});

		it('shows the custom lend amount as a static pill', () => {
			const { getByTestId } = renderLightDetailed();

			expect(getByTestId('light-detailed-amount-pill')).toHaveTextContent('$25');
		});

		it('renders a group loan without breaking', () => {
			const { getByTestId } = renderLightDetailed({
				loan: { ...lightDetailedLoan, borrowerCount: 5 },
			});

			expect(getByTestId('loan-use-statement')).toBeInTheDocument();
		});

		it('renders a loan without a country, omitting the dot and country from the header', () => {
			const { getByTestId, queryByText } = renderLightDetailed({
				loan: { ...lightDetailedLoan, geocode: undefined },
			});

			expect(getByTestId('loan-use-statement')).toBeInTheDocument();
			expect(queryByText('Dominican Republic')).not.toBeInTheDocument();
		});

		it('renders the privacy message without breaking for an anonymized loan', () => {
			const { getByTestId } = renderLightDetailed({
				loan: { ...lightDetailedLoan, use: '', anonymizationLevel: 'full' },
			});

			expect(getByTestId('loan-use-statement').textContent).toBe(
				'For the borrower\'s privacy, this loan has been made anonymous.',
			);
		});
	});

	describe('default variant (control)', () => {
		it('still shows the refresh button and the orange funding-status tag', () => {
			const almostFundedLoan = {
				...lightDetailedLoan,
				loanFundraisingInfo: {
					id: lightDetailedLoan.id,
					fundedAmount: '950.00',
					reservedAmount: '0.00',
				},
			};
			const { container, getByText } = render(KvCompactLoanCard, {
				props: {
					loanId: almostFundedLoan.id,
					loan: almostFundedLoan,
					photoPath,
					externalLinks: true,
					showRefreshButton: true,
					kvTrackFunction: jest.fn(),
				},
			});

			expect(container.querySelector('.tw--top-1')).toBeInTheDocument();
			getByText('Almost funded', { exact: false });
		});
	});
});
