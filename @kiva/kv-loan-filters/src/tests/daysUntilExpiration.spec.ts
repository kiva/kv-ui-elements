import daysUntilExpiration, { MIN, MAX } from '../daysUntilExpiration';

describe('daysUntilExpiration.ts', () => {
	describe('default', () => {
		describe('getValidatedSearchState', () => {
			it('should handle undefined', () => {
				const result = daysUntilExpiration.getValidatedSearchState({});

				expect(result).toEqual({ daysUntilExpiration: null });
			});

			it('should validate risk rating', () => {
				const state = { daysUntilExpiration: { min: 0, max: 45 } };

				const result = daysUntilExpiration.getValidatedSearchState(state);

				expect(result).toEqual({ daysUntilExpiration: { min: MIN, max: MAX, __typename: 'MinMaxRange' } });
			});
		});

		describe('getFlssFilter', () => {
			it('should handle missing', () => {
				expect(daysUntilExpiration.getFlssFilter({})).toEqual({});
			});

			it('should handle empty', () => {
				expect(daysUntilExpiration.getFlssFilter({ daysUntilExpiration: null })).toEqual({});
			});

			it('should return filters', () => {
				expect(daysUntilExpiration.getFlssFilter({ daysUntilExpiration: { min: 5, max: 12, __typename: 'MinMaxRange' } }))
					.toEqual({ daysUntilExpiration: { range: { gte: 5, lte: 12 } } });
			});
		});
	});
});
