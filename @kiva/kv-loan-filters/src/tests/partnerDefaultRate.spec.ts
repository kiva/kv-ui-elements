import partnerDefaultRate, { MIN, MAX } from '../partnerDefaultRate';
import { createMinMaxRange } from '../minMaxRangeUtils';

describe('partnerDefaultRate.ts', () => {
	describe('default', () => {
		describe('getFilterChips', () => {
			it('should handle undefined', () => {
				expect(partnerDefaultRate.getFilterChips({})).toEqual([]);
			});

			it('should return chips', () => {
				const result = partnerDefaultRate.getFilterChips({
					partnerDefaultRate: { min: 1, max: 2 },
				});

				expect(result).toEqual([{ name: 'Default rate: 100% to 200%', __typename: 'PartnerDefaultRate' }]);
			});
		});

		describe('getRemovedFacet', () => {
			it('should remove facet', () => {
				expect(partnerDefaultRate.getRemovedFacet()).toEqual({ partnerDefaultRate: null });
			});
		});

		describe('getValidatedSearchState', () => {
			it('should handle undefined', () => {
				const result = partnerDefaultRate.getValidatedSearchState({});

				expect(result).toEqual({ partnerDefaultRate: null });
			});

			it('should validate default rate', () => {
				const state = { partnerDefaultRate: { min: -1, max: 6 } };

				const result = partnerDefaultRate.getValidatedSearchState(state);

				expect(result).toEqual({ partnerDefaultRate: { min: MIN, max: MAX, __typename: 'MinMaxRange' } });
			});
		});

		describe('getFilterFromQuery', () => {
			it('it should get filter', () => {
				const query = { defaultRate: '1,2' };

				const result = partnerDefaultRate.getFilterFromQuery(query);

				expect(result).toEqual({ partnerDefaultRate: createMinMaxRange(1, 2) });
			});
		});

		describe('getQueryFromFilter', () => {
			it('should push default rate', () => {
				const state = { partnerDefaultRate: { min: 1, max: 2 } };

				const result = partnerDefaultRate.getQueryFromFilter(state);

				expect(result).toEqual({ defaultRate: '1,2' });
			});
		});

		describe('getFlssFilter', () => {
			it('should handle missing', () => {
				expect(partnerDefaultRate.getFlssFilter({})).toEqual({});
			});

			it('should handle empty', () => {
				expect(partnerDefaultRate.getFlssFilter({ partnerDefaultRate: null })).toEqual({});
			});

			it('should return filters', () => {
				expect(partnerDefaultRate.getFlssFilter({ partnerDefaultRate: { min: 1, max: 2, __typename: 'MinMaxRange' } }))
					.toEqual({ partnerDefaultRate: { range: { gte: 1, lte: 2 } } });
			});
		});
	});
});
