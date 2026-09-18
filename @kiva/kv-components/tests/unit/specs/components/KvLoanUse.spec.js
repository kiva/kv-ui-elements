import { render } from '@testing-library/vue';
import KvLoanUse from '#components/KvLoanUse.vue';

const baseProps = {
	use: 'to purchase a milking cow to increase her dairy production.',
	loanAmount: '1000.00',
	status: 'fundraising',
	borrowerCount: 1,
	name: 'Alan',
	country: 'Uganda',
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
});
