import { render } from '@testing-library/vue';
import { axe } from 'jest-axe';
import KvLoanTag from '#components/KvLoanTag.vue';

const nextWeek = new Date();
nextWeek.setDate(new Date().getDate() + 7);

// Base loan with a far-off expiration and plenty left to fund so that, on its own,
// it produces no tag (variation === null). Tests layer matching data on top of this.
const baseLoan = {
	id: 1,
	plannedExpirationDate: nextWeek.toISOString(),
	loanAmount: 199,
	loanFundraisingInfo: { fundedAmount: 0, reservedAmount: 0 },
};

const renderTag = (props) => render(KvLoanTag, { props });

const matchingOrg = (overrides) => ({
	managedAccountId: 1, ratio: 1, displayName: 'PG&E', ...overrides,
});

describe('KvLoanTag', () => {
	describe('multi-matching (enableMultiMatching)', () => {
		it('shows "4x match by 3 organizations" for 3 orgs each with a match ratio of 1', () => {
			// total ratio = 1 base + (1 + 1 + 1) = 4x
			const { getByText } = renderTag({
				enableMultiMatching: true,
				loan: {
					...baseLoan,
					simultaneousMatching: [
						matchingOrg({ managedAccountId: 1, displayName: 'PG&E' }),
						matchingOrg({ managedAccountId: 2, displayName: 'US Bank' }),
						matchingOrg({ managedAccountId: 3, displayName: 'Bank Of America' }),
					],
				},
			});

			getByText(/4x match by/);
			getByText('3 organizations');
		});

		it('renders one "2x matching by <org>" tooltip line per organization', () => {
			const { getByText, getAllByText } = renderTag({
				enableMultiMatching: true,
				loan: {
					...baseLoan,
					simultaneousMatching: [
						matchingOrg({ managedAccountId: 1, displayName: 'PG&E' }),
						matchingOrg({ managedAccountId: 2, displayName: 'US Bank' }),
						matchingOrg({ managedAccountId: 3, displayName: 'Bank Of America' }),
					],
				},
			});

			expect(getAllByText(/2x matching by/)).toHaveLength(3);
			getByText('2x matching by PG&E');
			getByText('2x matching by US Bank');
			getByText('2x matching by Bank Of America');
		});

		it('scales the total ratio with each org ratio (2 orgs at ratio 1 => 3x by 2 organizations)', () => {
			const { getByText } = renderTag({
				enableMultiMatching: true,
				loan: {
					...baseLoan,
					simultaneousMatching: [
						matchingOrg({ managedAccountId: 1, displayName: 'PG&E' }),
						matchingOrg({ managedAccountId: 2, displayName: 'US Bank' }),
					],
				},
			});

			getByText(/3x match by/);
			getByText('2 organizations');
		});

		it('respects differing org ratios in the total (ratios 1 + 2 => 4x)', () => {
			const { getByText } = renderTag({
				enableMultiMatching: true,
				loan: {
					...baseLoan,
					simultaneousMatching: [
						matchingOrg({ managedAccountId: 1, ratio: 1, displayName: 'PG&E' }),
						matchingOrg({ managedAccountId: 2, ratio: 2, displayName: 'US Bank' }),
					],
				},
			});

			getByText(/4x match by/);
			getByText('2 organizations');
		});

		it('renders a flat label (no tooltip) when only a single org is matching', () => {
			const { getByText, queryByText } = renderTag({
				enableMultiMatching: true,
				loan: {
					...baseLoan,
					simultaneousMatching: [matchingOrg({ displayName: 'Bank Of America' })],
				},
			});

			getByText('2x matching by Bank Of America');
			expect(queryByText(/organizations/)).toBeNull();
		});

		it('falls back to "a Kiva supporter" for an org with no display name', () => {
			const { getByText } = renderTag({
				enableMultiMatching: true,
				loan: {
					...baseLoan,
					simultaneousMatching: [matchingOrg({ displayName: null })],
				},
			});

			getByText('2x matching by a Kiva supporter');
		});

		it('falls back to "a Kiva supporter" for an "Anonymous" org', () => {
			const { getByText } = renderTag({
				enableMultiMatching: true,
				loan: {
					...baseLoan,
					simultaneousMatching: [matchingOrg({ displayName: 'Anonymous' })],
				},
			});

			getByText('2x matching by a Kiva supporter');
		});

		it('does not render the multi-match tag when enableMultiMatching is false', () => {
			const { queryByText } = renderTag({
				enableMultiMatching: false,
				loan: {
					...baseLoan,
					simultaneousMatching: [
						matchingOrg({ managedAccountId: 1, displayName: 'PG&E' }),
						matchingOrg({ managedAccountId: 2, displayName: 'US Bank' }),
					],
				},
			});

			expect(queryByText(/match by/)).toBeNull();
			expect(queryByText(/organizations/)).toBeNull();
		});
	});

	describe('legacy matching (matchingText)', () => {
		it('renders "<ratio + 1>x matching by <matchingText>"', () => {
			const { getByText } = renderTag({
				loan: {
					...baseLoan,
					matchingText: 'Ebay',
					matchRatio: 1,
				},
			});

			getByText('2x matching by Ebay');
		});
	});

	describe('non-matching variations', () => {
		it('renders the "Almost funded" tag when under $100 remains', () => {
			const { getByText } = renderTag({
				loan: {
					...baseLoan,
					loanFundraisingInfo: { fundedAmount: 50, reservedAmount: 50 },
				},
			});

			getByText(/Almost funded/);
		});

		it('renders the "High community impact" tag for an LSE loan', () => {
			const { getByText } = renderTag({
				loan: {
					...baseLoan,
					partnerName: 'N/A, direct to Novulis',
				},
			});

			getByText(/High community impact/);
		});
	});

	it('has no automated accessibility violations', async () => {
		const { container } = renderTag({
			enableMultiMatching: true,
			loan: {
				...baseLoan,
				simultaneousMatching: [
					matchingOrg({ managedAccountId: 1, displayName: 'PG&E' }),
					matchingOrg({ managedAccountId: 2, displayName: 'US Bank' }),
					matchingOrg({ managedAccountId: 3, displayName: 'Bank Of America' }),
				],
			},
		});

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
