import loanAmount, { MIN, MAX } from '../loanAmount';

describe('loanAmount.ts', () => {
	describe('default', () => {
		describe('getValidatedSearchState', () => {
			it('should handle undefined', () => {
				const result = loanAmount.getValidatedSearchState({});

				expect(result).toEqual({ loanAmount: null });
			});

			it('should validate risk rating', () => {
				const state = { loanAmount: { min: 25, max: 1000000 } };

				const result = loanAmount.getValidatedSearchState(state);

				expect(result).toEqual({ loanAmount: { min: MIN, max: MAX, __typename: 'MinMaxRange' } });
			});
		});

		describe('getFlssFilter', () => {
			it('should handle missing', () => {
				expect(loanAmount.getFlssFilter({})).toEqual({});
			});

			it('should handle empty', () => {
				expect(loanAmount.getFlssFilter({ loanAmount: null })).toEqual({});
			});

			it('should return filters', () => {
				expect(loanAmount.getFlssFilter({ loanAmount: { min: 25, max: 50, __typename: 'MinMaxRange' } }))
					.toEqual({ loanAmount: { range: { gte: 25, lte: 50 } } });
			});
		});
	});
});
