import numeral from 'numeral';

export const POST_GOAL_STATEMENT_MAX_LENGTH = 200;

const ELLIPSIS = '...';

function normalizeUse(use: string): string {
	if (!use.length) return '';
	return use.charAt(0).toLowerCase() + use.slice(1);
}

function truncateText(value: string, maxLength: number): string {
	if (maxLength <= 0) return '';
	if (value.length <= maxLength) return value;
	if (maxLength <= ELLIPSIS.length) return ELLIPSIS.slice(0, maxLength);
	return `${value.slice(0, maxLength - ELLIPSIS.length).trimEnd()}${ELLIPSIS}`;
}

export interface ComputePostGoalStatementArgs {
	borrowerName: string;
	distributionModel: string;
	formattedLocation: string;
	loanAmount: string;
	loanBorrowerCount: number;
	loanStatus: string;
	loanUse: string;
	anonymizationLevel?: string;
}

export interface PostGoalStatementResult {
	borrowerNameWithCountry: string;
	loanUsePrefixStart: string;
	loanUsePrefixEnd: string;
	statementTitle: string | undefined;
	visibleUseStatement: string;
}

/**
 * Post-goal loan use statement segments for KvCompactLoanCard (mirrors loan card computeds +
 * anonymization fields from props.loan).
 */
export function computePostGoalLoanCardStatement(
	args: ComputePostGoalStatementArgs,
): PostGoalStatementResult {
	const {
		anonymizationLevel,
		borrowerName,
		distributionModel,
		formattedLocation,
		loanAmount,
		loanBorrowerCount,
		loanStatus,
		loanUse,
	} = args;

	const borrowerLocation = formattedLocation
		? `${borrowerName} in ${formattedLocation}`
		: borrowerName;
	const hasLoanUse = anonymizationLevel !== 'full' && !!loanUse.length;

	const helpLanguage = ['fundraising', 'inactive', 'reviewed'].includes(loanStatus)
		? 'helps'
		: 'helped';

	const prefixStart = hasLoanUse
		? [
			numeral(loanAmount).format('$0,0'),
			distributionModel === 'direct' ? 'to' : helpLanguage,
			loanBorrowerCount > 1 ? 'a member of' : '',
		].filter(Boolean).join(' ')
		: '';

	let prefixEnd = '';
	if (hasLoanUse) {
		prefixEnd = distributionModel === 'direct' ? ` ${helpLanguage} ` : ' ';
	}

	const rawStatement = hasLoanUse
		? normalizeUse(loanUse)
		: "For the borrower's privacy, this loan has been made anonymous.";

	const prefix = hasLoanUse ? `${prefixStart} ${borrowerLocation}${prefixEnd}` : '';
	const fullStatement = `${prefix}${rawStatement}`;

	return {
		borrowerNameWithCountry: borrowerLocation,
		loanUsePrefixStart: prefixStart ? `${prefixStart} ` : '',
		loanUsePrefixEnd: prefixEnd,
		statementTitle:
			fullStatement.length > POST_GOAL_STATEMENT_MAX_LENGTH ? fullStatement : undefined,
		visibleUseStatement: truncateText(rawStatement, POST_GOAL_STATEMENT_MAX_LENGTH - prefix.length),
	};
}
