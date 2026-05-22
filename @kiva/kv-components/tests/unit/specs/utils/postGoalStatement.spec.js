import {
	computePostGoalLoanCardStatement,
	POST_GOAL_STATEMENT_MAX_LENGTH,
} from '#utils/postGoalStatement';

const baseLoan = () => ({
	borrowerName: 'Alan',
	formattedLocation: 'Uganda',
	loanAmount: '1000',
	loanBorrowerCount: 1,
	loanStatus: 'fundraising',
	distributionModel: '',
	loanUse: 'to purchase dairy equipment.',
});

describe('computePostGoalLoanCardStatement', () => {
	it('formats partner fundraising loan with prefixed amount and borrower location', () => {
		expect(computePostGoalLoanCardStatement(baseLoan())).toMatchObject({
			borrowerNameWithCountry: 'Alan in Uganda',
			loanUsePrefixStart: '$1,000 helps ',
			loanUsePrefixEnd: ' ',
			visibleUseStatement: 'to purchase dairy equipment.',
			statementTitle: undefined,
		});
	});

	it('lowercases the first letter of the use sentence', () => {
		expect(
			computePostGoalLoanCardStatement({
				...baseLoan(),
				loanUse: 'To buy seeds.',
			}).visibleUseStatement,
		).toBe('to buy seeds.');
	});

	it('uses Kiva US direct wording (to / helped) around the borrower name', () => {
		const result = computePostGoalLoanCardStatement({
			...baseLoan(),
			distributionModel: 'direct',
			formattedLocation: 'Boulder, Colorado, United States',
			loanStatus: 'funded',
		});
		expect(result.loanUsePrefixStart).toBe('$1,000 to ');
		expect(result.loanUsePrefixEnd).toBe(' helped ');
	});

	it('includes "helped" for non-active statuses outside fundraising bucket', () => {
		expect(computePostGoalLoanCardStatement({
			...baseLoan(),
			loanStatus: 'funded',
		}).loanUsePrefixStart).toContain('helped');
	});

	it('includes "a member of" when there are multiple borrowers', () => {
		expect(computePostGoalLoanCardStatement({
			...baseLoan(),
			loanBorrowerCount: 3,
		}).loanUsePrefixStart).toContain('a member of');
	});

	it('omits " in …" when there is no formatted location', () => {
		expect(computePostGoalLoanCardStatement({
			...baseLoan(),
			formattedLocation: '',
		}).borrowerNameWithCountry).toBe('Alan');
	});

	it('uses privacy copy when anonymized at full level', () => {
		const result = computePostGoalLoanCardStatement({
			...baseLoan(),
			anonymizationLevel: 'full',
			loanUse: 'would otherwise show here',
		});
		expect(result.loanUsePrefixStart).toBe('');
		expect(result.loanUsePrefixEnd).toBe('');
		expect(result.visibleUseStatement).toBe(
			"For the borrower's privacy, this loan has been made anonymous.",
		);
	});

	it('does not apply whySpecial field even if provided', () => {
		const resultWithWhySpecial = computePostGoalLoanCardStatement({
			...baseLoan(),
			whySpecial: 'They uplift their village.',
		});
		const resultWithoutWhySpecial = computePostGoalLoanCardStatement(baseLoan());

		expect(resultWithWhySpecial.visibleUseStatement).toBe(
			resultWithoutWhySpecial.visibleUseStatement,
		);
		expect(resultWithWhySpecial.visibleUseStatement).toBe('to purchase dairy equipment.');
	});

	it('sets statementTitle when the full text exceeds POST_GOAL_STATEMENT_MAX_LENGTH and truncates visible use', () => {
		const prefixLength = '$1,000 helps Alan in Uganda '.length;
		const budget = POST_GOAL_STATEMENT_MAX_LENGTH - prefixLength;

		expect(budget > 10).toBe(true);

		const longUseSegment = `${'x'.repeat(budget)}yyyy`;
		const result = computePostGoalLoanCardStatement({
			...baseLoan(),
			loanUse: `${longUseSegment} extra tail that only appears in tooltip`,
		});

		expect(result.statementTitle).toBeDefined();
		expect(result.statementTitle.length > POST_GOAL_STATEMENT_MAX_LENGTH).toBe(true);
		expect(result.visibleUseStatement.endsWith('...')).toBe(true);

		expect(result.visibleUseStatement.length <= budget).toBe(true);
	});
});
