import regions, { getCountryIsoCodesFromQueryParam } from '../regions';
import { mockAllFacets } from './fixtures/mockLoanSearchData';

describe('regions.ts', () => {
	describe('default', () => {
		describe('getFilterChips', () => {
			it('should handle undefined', () => {
				expect(regions.getFilterChips({}, mockAllFacets)).toEqual([]);
			});

			it('should return chips', () => {
				const result = regions.getFilterChips({ countryIsoCode: ['US'] }, mockAllFacets);

				const expected = [mockAllFacets.countryFacets[0].country];

				expect(result).toEqual(expected);
			});
		});

		describe('getRemovedFacet', () => {
			it('should remove facet', () => {
				expect(regions.getRemovedFacet({ countryIsoCode: ['US'] }, { isoCode: 'US' }))
					.toEqual({ countryIsoCode: [] });
			});
		});

		describe('getValidatedSearchState', () => {
			it('should handle undefined', () => {
				const result = regions.getValidatedSearchState({ countryIsoCode: ['US'] }, undefined);

				expect(result).toEqual({ countryIsoCode: [] });
			});

			it('should handle empty', () => {
				const result = regions.getValidatedSearchState({}, mockAllFacets);

				expect(result).toEqual({ countryIsoCode: [] });
			});

			it('should validate country ISO code', () => {
				const state = { countryIsoCode: ['asd'] };

				const result = regions.getValidatedSearchState(state, mockAllFacets);

				expect(result).toEqual({ countryIsoCode: [] });
			});
		});

		describe('getFilterFromQuery', () => {
			it('it should get filter', () => {
				const query = { countries: 'US' };

				const result = regions.getFilterFromQuery(query, mockAllFacets);

				expect(result).toEqual({ countryIsoCode: ['US'] });
			});

			it('should handle Algolia countries param', () => {
				const query = { countries: 'us' };

				const result = regions.getFilterFromQuery(query, mockAllFacets);

				expect(result).toEqual({ countryIsoCode: ['US'] });
			});
		});

		describe('getQueryFromFilter', () => {
			it('should push ISO code', () => {
				const state = { countryIsoCode: ['US', 'CA'] };

				const result = regions.getQueryFromFilter(state);

				expect(result).toEqual({ country: 'US,CA' });
			});
		});

		describe('getFlssFilter', () => {
			it('should handle missing', () => {
				expect(regions.getFlssFilter({})).toEqual({});
			});

			it('should handle empty', () => {
				expect(regions.getFlssFilter({ countryIsoCode: [] })).toEqual({});
			});

			it('should return filters', () => {
				expect(regions.getFlssFilter({ countryIsoCode: ['US'] })).toEqual({ countryIsoCode: { any: ['US'] } });
			});
		});
	});

	describe('getCountryIsoCodesFromQueryParam', () => {
		it('should handle empty', () => {
			expect(getCountryIsoCodesFromQueryParam()).toBe(undefined);
			expect(getCountryIsoCodesFromQueryParam('')).toBe(undefined);
			expect(getCountryIsoCodesFromQueryParam('asd', undefined)).toEqual([]);
		});

		it('should handle FLSS and legacy single sector', () => {
			const param = 'us';

			const result = getCountryIsoCodesFromQueryParam(param, mockAllFacets);

			expect(result).toEqual(['US']);
		});

		it('should handle FLSS and legacy list', () => {
			const param = 'us,ca';

			const result = getCountryIsoCodesFromQueryParam(param, mockAllFacets);

			expect(result).toEqual(['US', 'CA']);
		});

		it('should handle FLSS and legacy list trailing separator', () => {
			const param = 'us,ca,';

			const result = getCountryIsoCodesFromQueryParam(param, mockAllFacets);

			expect(result).toEqual(['US', 'CA']);
		});

		it('should handle Algolia single sector', () => {
			const param = 'north%20america%20>%20united%20states';

			const result = getCountryIsoCodesFromQueryParam(param, mockAllFacets);

			expect(result).toEqual(['US']);
		});

		it('should handle Algolia single list', () => {
			const param = 'north%20america%20>%20united%20states~north%20america%20>%20canada';

			const result = getCountryIsoCodesFromQueryParam(param, mockAllFacets);

			expect(result).toEqual(['US', 'CA']);
		});

		it('should handle Algolia single list trailing separator', () => {
			const param = 'north%20america%20>%20united%20states~north%20america%20>%20canada~';

			const result = getCountryIsoCodesFromQueryParam(param, mockAllFacets);

			expect(result).toEqual(['US', 'CA']);
		});
	});
});
