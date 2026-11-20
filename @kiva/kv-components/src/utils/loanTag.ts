import { differenceInDays, parseISO } from 'date-fns';
import numeral from 'numeral';

const LSE_LOAN_KEY = 'N/A';

export const LOAN_TAG_VARIATION = {
	almostFunded: 'almost-funded',
	endingSoon: 'ending-soon',
	matchedLoan: 'matched-loan',
	lseLoan: 'lse-loan',
} as const;

export type LoanTagVariation = typeof LOAN_TAG_VARIATION[keyof typeof LOAN_TAG_VARIATION];

export interface LoanTagLoan {
	matchingText?: string | null;
	simultaneousMatching?: unknown[] | null;
	partnerName?: string | null;
	plannedExpirationDate?: string;
	loanAmount?: string | number;
	loanFundraisingInfo?: {
		fundedAmount: string | number;
		reservedAmount: string | number;
	} | null;
}

/**
 * Checks whether the loan's partner name marks it as an LSE loan
 *
 * @param loan The loan to check
 * @returns Whether the loan is an LSE loan
 */
export function isLseLoan(loan?: LoanTagLoan | null): boolean {
	return loan?.partnerName?.toUpperCase().includes(LSE_LOAN_KEY) ?? false;
}

/**
 * Checks whether the loan has matching, from legacy matching text or simultaneous matching
 *
 * @param loan The loan to check
 * @param enableMultiMatching Whether simultaneous matching counts as a match
 * @returns Whether the loan is matched
 */
export function isMatchedLoan(loan?: LoanTagLoan | null, enableMultiMatching = false): boolean {
	return !!loan?.matchingText
		|| (enableMultiMatching && (loan?.simultaneousMatching ?? []).length > 0);
}

/**
 * Gets the tag variation to show for a loan, if any
 *
 * @param loan The loan to check
 * @param enableMultiMatching Whether simultaneous matching counts as a match
 * @returns The tag variation, or null when the loan has no tag
 */
export function getLoanTagVariation(
	loan?: LoanTagLoan | null,
	enableMultiMatching = false,
): LoanTagVariation | null {
	if (isMatchedLoan(loan, enableMultiMatching)) {
		return LOAN_TAG_VARIATION.matchedLoan;
	}
	if (isLseLoan(loan)) {
		return LOAN_TAG_VARIATION.lseLoan;
	}
	if (differenceInDays(parseISO(loan?.plannedExpirationDate), Date.now()) <= 3) {
		return LOAN_TAG_VARIATION.endingSoon;
	}
	const { fundedAmount, reservedAmount } = loan?.loanFundraisingInfo ?? { fundedAmount: 0, reservedAmount: 0 };
	const amountLeft = numeral(loan?.loanAmount).subtract(fundedAmount).subtract(reservedAmount).value();
	if (amountLeft < 100 && amountLeft >= 0) {
		return LOAN_TAG_VARIATION.almostFunded;
	}
	return null;
}
