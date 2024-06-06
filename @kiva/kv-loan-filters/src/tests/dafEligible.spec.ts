import dafEligible from '../dafEligible';

describe('dafEligible.ts', () => {
	describe('default', () => {
		describe('getFlssFilter', () => {
			it('should handle missing', () => {
				expect(dafEligible.getFlssFilter({})).toEqual({});
			});

			it('should handle empty', () => {
				expect(dafEligible.getFlssFilter({ dafEligible: null })).toEqual({});
			});

			it('should return filters', () => {
				expect(dafEligible.getFlssFilter({ dafEligible: false })).toEqual({ dafEligible: { eq: false } });
			});
		});

		describe('getRemovedFacet', () => {
			it('should remove facet', () => {
				expect(dafEligible.getRemovedFacet()).toEqual({ dafEligible: null });
			});
		});

		describe('getValidatedSearchState', () => {
			it('should handle undefined', () => {
				expect(dafEligible.getValidatedSearchState(undefined)).toEqual({ dafEligible: null });
			});

			it('should handle missing', () => {
				expect(dafEligible.getValidatedSearchState({})).toEqual({ dafEligible: null });
			});

			it('should return value', () => {
				expect(dafEligible.getValidatedSearchState({ dafEligible: true })).toEqual({ dafEligible: true });
			});
		});

		describe('getFilterFromQuery', () => {
			it('it should get filter', () => {
				const query = { dafEligible: 'true' };

				const result = dafEligible.getFilterFromQuery(query);

				expect(result).toEqual({ dafEligible: true });
			});

			it('should handle different is query casing', () => {
				const query = { dafEligible: 'TRUE' };

				const result = dafEligible.getFilterFromQuery(query);

				expect(result).toEqual({ dafEligible: true });
			});
		});

		describe('getQueryFromFilter', () => {
			it('should push is dafEligible', () => {
				const state = { dafEligible: true };

				const result = dafEligible.getQueryFromFilter(state);

				expect(result).toEqual({ dafEligible: 'true' });
			});
		});
	});
});
