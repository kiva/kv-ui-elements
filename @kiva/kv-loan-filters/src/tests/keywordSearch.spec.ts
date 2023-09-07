import keywordSearch from '../keywordSearch';

describe('keywordSearch.ts', () => {
	describe('default', () => {
		describe('getFilterChips', () => {
			it('should handle undefined', () => {
				expect(keywordSearch.getFilterChips({})).toEqual([]);
			});

			it('should return chips', () => {
				const result = keywordSearch.getFilterChips({ keywordSearch: 'search' });

				expect(result).toEqual([{ name: 'search', __typename: 'KeywordSearch' }]);
			});
		});

		describe('getRemovedFacet', () => {
			it('should remove facet', () => {
				expect(keywordSearch.getRemovedFacet()).toEqual({ keywordSearch: null });
			});
		});

		describe('getValidatedSearchState', () => {
			it('should handle undefined', () => {
				const result = keywordSearch.getValidatedSearchState({});

				expect(result).toEqual({ keywordSearch: null });
			});

			it('should validate keyword search and trim', () => {
				const state = { keywordSearch: 'test ' };

				const result = keywordSearch.getValidatedSearchState(state);

				expect(result).toEqual({ keywordSearch: 'test' });
			});

			it('should validate keyword search empty string', () => {
				const state = { keywordSearch: ' ' };

				const result = keywordSearch.getValidatedSearchState(state);

				expect(result).toEqual({ keywordSearch: null });
			});

			it('should validate keyword search undefined', () => {
				const state = { keywordSearch: undefined };

				const result = keywordSearch.getValidatedSearchState(state);

				expect(result).toEqual({ keywordSearch: null });
			});
		});

		describe('getFilterFromQuery', () => {
			it('it should get filter', () => {
				const query = { queryString: 'search' };

				const result = keywordSearch.getFilterFromQuery(query);

				expect(result).toEqual({ keywordSearch: 'search' });
			});
		});

		describe('getQueryFromFilter', () => {
			it('should push queryString', () => {
				const state = { keywordSearch: 'search' };

				const result = keywordSearch.getQueryFromFilter(state);

				expect(result).toEqual({ queryString: 'search' });
			});
		});

		describe('getFlssFilter', () => {
			it('should handle missing', () => {
				expect(keywordSearch.getFlssFilter({})).toEqual({});
			});

			it('should handle empty', () => {
				expect(keywordSearch.getFlssFilter({ keywordSearch: null })).toEqual({});
			});

			it('should return filters', () => {
				expect(keywordSearch.getFlssFilter({ keywordSearch: 'search' })).toEqual({ keywordSearch: { eq: 'search' } });
			});
		});
	});
});
