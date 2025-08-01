import amountLeft, { MIN, MAX } from '../amountLeft';
import { createMinMaxRange } from '../minMaxRangeUtils';

describe('amountLeft.ts', () => {
	describe('default', () => {
		describe('getFlssFilter', () => {
			it('should handle missing', () => {
				expect(amountLeft.getFlssFilter({})).toEqual({});
			});

			it('should handle empty', () => {
				expect(amountLeft.getFlssFilter({ amountLeft: null })).toEqual({});
			});

			it('should return filters', () => {
				expect(amountLeft.getFlssFilter({ amountLeft: { min: 25, max: 50, __typename: 'MinMaxRange' } }))
					.toEqual({ amountLeft: { range: { gte: 25, lte: 50 } } });
			});
		});

		describe('getValidatedSearchState', () => {
			it('should handle undefined', () => {
				const result = amountLeft.getValidatedSearchState({});

				expect(result).toEqual({ amountLeft: null });
			});

			it('should validate', () => {
				const state = { amountLeft: { min: -1, max: 1000001 } };

				const result = amountLeft.getValidatedSearchState(state);

				expect(result).toEqual({ amountLeft: { min: MIN, max: MAX, __typename: 'MinMaxRange' } });
			});

			it('should return search state', () => {
				const state = { amountLeft: { min: 25, max: 1000000 } };

				const result = amountLeft.getValidatedSearchState(state);

				expect(result).toEqual({ amountLeft: { min: 25, max: 1000000, __typename: 'MinMaxRange' } });
			});
		});

		describe('getFilterFromQuery', () => {
			it('it should get filter', () => {
				const query = { amountLeft: '1,2' };

				const result = amountLeft.getFilterFromQuery(query);

				expect(result).toEqual({ amountLeft: createMinMaxRange(1, 2) });
			});
		});
	});
});
