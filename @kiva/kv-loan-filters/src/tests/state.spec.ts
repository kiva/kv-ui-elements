import state from '../state';
import { getValidatedSearchState } from '../searchStateUtils';
import { mockAllFacets } from './fixtures/mockLoanSearchData';

describe('state.ts', () => {
	describe('default', () => {
		describe('getFlssFilter', () => {
			it('should handle missing', () => {
				expect(state.getFlssFilter({})).toEqual({});
			});

			it('should handle empty', () => {
				expect(state.getFlssFilter({ state: [] })).toEqual({});
			});

			it('should return filters', () => {
				expect(state.getFlssFilter({ state: ['test'] })).toEqual({ state: { any: ['test'] } });
			});
		});

		describe('getValidatedSearchState', () => {
			it('should handle undefined', () => {
				expect(state.getValidatedSearchState(undefined)).toEqual({ state: [] });
			});

			it('should handle missing', () => {
				expect(state.getValidatedSearchState({})).toEqual({ state: [] });
			});

			it('should keep values that are not in the facets', () => {
				expect(getValidatedSearchState({ state: ['CO'] }, mockAllFacets, 'flss'))
					.toEqual(expect.objectContaining({ state: ['CO'] }));
				expect(getValidatedSearchState({ state: ['CO'] }, {}, 'flss'))
					.toEqual(expect.objectContaining({ state: ['CO'] }));
			});

			it('should clean values', () => {
				expect(state.getValidatedSearchState({ state: [' CO ', '', 'CO', 'California'] })).toEqual({ state: ['CO', 'California'] });
			});
		});

		describe('getFilterChips', () => {
			it('should handle missing', () => {
				expect(state.getFilterChips(undefined)).toEqual([]);
				expect(state.getFilterChips({})).toEqual([]);
			});

			it('should return one chip per value', () => {
				expect(state.getFilterChips({ state: ['CO', 'WI'] }))
					.toEqual([{ id: 'CO', name: 'CO' }, { id: 'WI', name: 'WI' }]);
			});
		});

		describe('getRemovedFacet', () => {
			it('should remove one value', () => {
				expect(state.getRemovedFacet({ state: ['CO', 'WI'] }, { id: 'WI' })).toEqual({ state: ['CO'] });
			});

			it('should handle missing', () => {
				expect(state.getRemovedFacet(undefined, { id: 'WI' })).toEqual({ state: [] });
			});
		});

		describe('getFilterFromQuery', () => {
			it('should handle missing and null', () => {
				expect(state.getFilterFromQuery({})).toEqual({ state: [] });
				expect(state.getFilterFromQuery({ state: null })).toEqual({ state: [] });
			});

			it('should read comma separated and repeated params', () => {
				expect(state.getFilterFromQuery({ state: 'CO,,WI' })).toEqual({ state: ['CO', 'WI'] });
				expect(state.getFilterFromQuery({ state: ['CO', 'WI'] })).toEqual({ state: ['CO', 'WI'] });
			});
		});

		describe('getQueryFromFilter', () => {
			it('should handle empty', () => {
				expect(state.getQueryFromFilter({})).toEqual({});
				expect(state.getQueryFromFilter({ state: [] })).toEqual({});
			});

			it('should join values', () => {
				expect(state.getQueryFromFilter({ state: ['CO', 'WI'] })).toEqual({ state: 'CO,WI' });
			});

			it('should round trip', () => {
				const loanSearchState = { state: ['CO', 'WI'] };

				expect(state.getFilterFromQuery(state.getQueryFromFilter(loanSearchState))).toEqual(loanSearchState);
			});
		});
	});
});
