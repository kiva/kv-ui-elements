import city from '../city';
import { getValidatedSearchState } from '../searchStateUtils';
import { mockAllFacets } from './fixtures/mockLoanSearchData';

describe('city.ts', () => {
	describe('default', () => {
		describe('getFlssFilter', () => {
			it('should handle missing', () => {
				expect(city.getFlssFilter({})).toEqual({});
			});

			it('should handle empty', () => {
				expect(city.getFlssFilter({ city: [] })).toEqual({});
			});

			it('should return filters', () => {
				expect(city.getFlssFilter({ city: ['test'] })).toEqual({ city: { any: ['test'] } });
			});
		});

		describe('getValidatedSearchState', () => {
			it('should handle undefined', () => {
				expect(city.getValidatedSearchState(undefined)).toEqual({ city: [] });
			});

			it('should handle missing', () => {
				expect(city.getValidatedSearchState({})).toEqual({ city: [] });
			});

			it('should keep values that are not in the facets', () => {
				expect(getValidatedSearchState({ city: ['San Jose'] }, mockAllFacets, 'flss'))
					.toEqual(expect.objectContaining({ city: ['San Jose'] }));
				expect(getValidatedSearchState({ city: ['San Jose'] }, {}, 'flss'))
					.toEqual(expect.objectContaining({ city: ['San Jose'] }));
			});

			it('should clean values', () => {
				expect(city.getValidatedSearchState({ city: [' San Jose ', '', 'San Jose', 3] })).toEqual({ city: ['San Jose'] });
			});
		});

		describe('getFilterChips', () => {
			it('should handle missing', () => {
				expect(city.getFilterChips(undefined)).toEqual([]);
				expect(city.getFilterChips({})).toEqual([]);
			});

			it('should return one chip per value', () => {
				expect(city.getFilterChips({ city: ['San Jose', 'Fresno'] }))
					.toEqual([{ id: 'San Jose', name: 'San Jose' }, { id: 'Fresno', name: 'Fresno' }]);
			});
		});

		describe('getRemovedFacet', () => {
			it('should remove one value', () => {
				expect(city.getRemovedFacet({ city: ['San Jose', 'Fresno'] }, { id: 'Fresno' })).toEqual({ city: ['San Jose'] });
			});

			it('should handle missing', () => {
				expect(city.getRemovedFacet(undefined, { id: 'Fresno' })).toEqual({ city: [] });
			});
		});

		describe('getFilterFromQuery', () => {
			it('should handle missing and null', () => {
				expect(city.getFilterFromQuery({})).toEqual({ city: [] });
				expect(city.getFilterFromQuery({ city: null })).toEqual({ city: [] });
			});

			it('should read comma separated and repeated params', () => {
				expect(city.getFilterFromQuery({ city: 'San Jose,,Fresno' })).toEqual({ city: ['San Jose', 'Fresno'] });
				expect(city.getFilterFromQuery({ city: ['San Jose', 'Fresno'] })).toEqual({ city: ['San Jose', 'Fresno'] });
			});
		});

		describe('getQueryFromFilter', () => {
			it('should handle empty', () => {
				expect(city.getQueryFromFilter({})).toEqual({});
				expect(city.getQueryFromFilter({ city: [] })).toEqual({});
			});

			it('should join values', () => {
				expect(city.getQueryFromFilter({ city: ['San Jose', 'Fresno'] })).toEqual({ city: 'San Jose,Fresno' });
			});

			it('should round trip', () => {
				const loanSearchState = { city: ['San Jose', 'Fresno'] };

				expect(city.getFilterFromQuery(city.getQueryFromFilter(loanSearchState))).toEqual(loanSearchState);
			});
		});
	});
});
