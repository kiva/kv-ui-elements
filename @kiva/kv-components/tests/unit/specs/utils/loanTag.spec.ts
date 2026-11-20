import { addDays } from 'date-fns';
import {
	getLoanTagVariation,
	isLseLoan,
	isMatchedLoan,
	LOAN_TAG_VARIATION,
} from '#utils/loanTag';

const makeLoan = (overrides = {}) => ({
	loanAmount: 500,
	loanFundraisingInfo: { fundedAmount: 0, reservedAmount: 0 },
	plannedExpirationDate: addDays(new Date(), 14).toISOString(),
	partnerName: 'Partner',
	matchingText: '',
	simultaneousMatching: [],
	...overrides,
});

describe('loanTag', () => {
	describe('isMatchedLoan', () => {
		it('returns true when the loan has matching text', () => {
			expect(isMatchedLoan(makeLoan({ matchingText: 'Ebay' }))).toBe(true);
		});

		it('returns true for simultaneous matching when multi-matching is enabled', () => {
			const loan = makeLoan({ simultaneousMatching: [{ managedAccountId: 1, ratio: 1 }] });
			expect(isMatchedLoan(loan, true)).toBe(true);
		});

		it('returns false for simultaneous matching when multi-matching is disabled', () => {
			const loan = makeLoan({ simultaneousMatching: [{ managedAccountId: 1, ratio: 1 }] });
			expect(isMatchedLoan(loan, false)).toBe(false);
		});

		it('returns false when the loan has no matching', () => {
			expect(isMatchedLoan(makeLoan(), true)).toBe(false);
		});
	});

	describe('isLseLoan', () => {
		it('returns true when the partner name contains N/A in any case', () => {
			expect(isLseLoan(makeLoan({ partnerName: 'Partner n/a' }))).toBe(true);
		});

		it('returns false for any other partner name', () => {
			expect(isLseLoan(makeLoan())).toBe(false);
		});

		it('returns false when there is no loan', () => {
			expect(isLseLoan(undefined)).toBe(false);
		});
	});

	describe('getLoanTagVariation', () => {
		it('returns matched loan for a matched loan', () => {
			expect(getLoanTagVariation(makeLoan({ matchingText: 'Ebay' }))).toBe(LOAN_TAG_VARIATION.matchedLoan);
		});

		it('returns matched loan over LSE when the loan is both', () => {
			const loan = makeLoan({ matchingText: 'Ebay', partnerName: 'N/A' });
			expect(getLoanTagVariation(loan)).toBe(LOAN_TAG_VARIATION.matchedLoan);
		});

		it('returns LSE loan for an LSE partner', () => {
			expect(getLoanTagVariation(makeLoan({ partnerName: 'N/A' }))).toBe(LOAN_TAG_VARIATION.lseLoan);
		});

		it('returns ending soon when the loan expires within three days', () => {
			const loan = makeLoan({ plannedExpirationDate: addDays(new Date(), 1).toISOString() });
			expect(getLoanTagVariation(loan)).toBe(LOAN_TAG_VARIATION.endingSoon);
		});

		it('returns almost funded when less than $100 is left', () => {
			const loan = makeLoan({ loanFundraisingInfo: { fundedAmount: 300, reservedAmount: 150 } });
			expect(getLoanTagVariation(loan)).toBe(LOAN_TAG_VARIATION.almostFunded);
		});

		it('returns null for a loan with no tag', () => {
			expect(getLoanTagVariation(makeLoan())).toBeNull();
		});
	});
});
