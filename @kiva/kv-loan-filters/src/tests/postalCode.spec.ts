import postalCode from '../postalCode';
import { getValidatedSearchState } from '../searchStateUtils';
import { mockAllFacets } from './fixtures/mockLoanSearchData';

describe('postalCode.ts', () => {
	describe('default', () => {
		describe('getFlssFilter', () => {
			it('should handle missing', () => {
				expect(postalCode.getFlssFilter({})).toEqual({});
			});

			it('should handle empty', () => {
				expect(postalCode.getFlssFilter({ postalCode: [] })).toEqual({});
			});

			it('should return filters', () => {
				expect(postalCode.getFlssFilter({ postalCode: [1] })).toEqual({ postalCode: { any: [1] } });
			});
		});

		describe('getValidatedSearchState', () => {
			it('should handle undefined', () => {
				expect(postalCode.getValidatedSearchState(undefined)).toEqual({ postalCode: [] });
			});

			it('should handle missing', () => {
				expect(postalCode.getValidatedSearchState({})).toEqual({ postalCode: [] });
			});

			it('should keep values that are not in the facets', () => {
				expect(getValidatedSearchState({ postalCode: ['80011'] }, mockAllFacets, 'flss'))
					.toEqual(expect.objectContaining({ postalCode: ['80011'] }));
				expect(getValidatedSearchState({ postalCode: ['80011'] }, {}, 'flss'))
					.toEqual(expect.objectContaining({ postalCode: ['80011'] }));
			});

			it('should clean values', () => {
				expect(postalCode.getValidatedSearchState({ postalCode: [' 80011 ', '', '80011', 80011] })).toEqual({ postalCode: ['80011'] });
			});
		});

		describe('getFilterChips', () => {
			it('should handle missing', () => {
				expect(postalCode.getFilterChips(undefined)).toEqual([]);
				expect(postalCode.getFilterChips({})).toEqual([]);
			});

			it('should return one chip per value', () => {
				expect(postalCode.getFilterChips({ postalCode: ['80011', '15213'] }))
					.toEqual([{ id: '80011', name: '80011' }, { id: '15213', name: '15213' }]);
			});
		});

		describe('getRemovedFacet', () => {
			it('should remove one value', () => {
				expect(postalCode.getRemovedFacet({ postalCode: ['80011', '15213'] }, { id: '15213' })).toEqual({ postalCode: ['80011'] });
			});

			it('should handle missing', () => {
				expect(postalCode.getRemovedFacet(undefined, { id: '15213' })).toEqual({ postalCode: [] });
			});
		});

		describe('getFilterFromQuery', () => {
			it('should handle missing and null', () => {
				expect(postalCode.getFilterFromQuery({})).toEqual({ postalCode: [] });
				expect(postalCode.getFilterFromQuery({ postalCode: null })).toEqual({ postalCode: [] });
			});

			it('should read comma separated and repeated params', () => {
				expect(postalCode.getFilterFromQuery({ postalCode: '80011,,15213' })).toEqual({ postalCode: ['80011', '15213'] });
				expect(postalCode.getFilterFromQuery({ postalCode: ['80011', '15213'] })).toEqual({ postalCode: ['80011', '15213'] });
			});
		});

		describe('getQueryFromFilter', () => {
			it('should handle empty', () => {
				expect(postalCode.getQueryFromFilter({})).toEqual({});
				expect(postalCode.getQueryFromFilter({ postalCode: [] })).toEqual({});
			});

			it('should join values', () => {
				expect(postalCode.getQueryFromFilter({ postalCode: ['80011', '15213'] })).toEqual({ postalCode: '80011,15213' });
			});

			it('should round trip', () => {
				const loanSearchState = { postalCode: ['80011', '15213'] };

				expect(postalCode.getFilterFromQuery(postalCode.getQueryFromFilter(loanSearchState))).toEqual(loanSearchState);
			});
		});
	});
});
