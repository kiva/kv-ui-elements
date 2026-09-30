import matcherAccountIds from '../matcherAccountIds';
import filterUtils from '../filterUtils';

describe('matcherAccountIds.ts', () => {
	describe('default', () => {
		it('should be registered', () => {
			expect(filterUtils.filters.matcherAccountIds).toBe(matcherAccountIds);
		});

		describe('getFlssFilter', () => {
			it('should handle missing and empty', () => {
				expect(matcherAccountIds.getFlssFilter({})).toEqual({});
				expect(matcherAccountIds.getFlssFilter({ matcherAccountIds: [] })).toEqual({});
			});

			it('should return filters', () => {
				expect(matcherAccountIds.getFlssFilter({ matcherAccountIds: [1487001] }))
					.toEqual({ matcherAccountIds: { any: [1487001] } });
			});
		});

		describe('getValidatedSearchState', () => {
			it('should handle undefined and missing', () => {
				expect(matcherAccountIds.getValidatedSearchState(undefined)).toEqual({ matcherAccountIds: [] });
				expect(matcherAccountIds.getValidatedSearchState({})).toEqual({ matcherAccountIds: [] });
			});

			it('should keep positive integers', () => {
				expect(matcherAccountIds.getValidatedSearchState({ matcherAccountIds: [1487001, 1487001, '5', -1] }))
					.toEqual({ matcherAccountIds: [1487001] });
			});
		});

		describe('getFilterChips', () => {
			it('should handle missing', () => {
				expect(matcherAccountIds.getFilterChips(undefined)).toEqual([]);
			});

			it('should return one chip per value', () => {
				expect(matcherAccountIds.getFilterChips({ matcherAccountIds: [1487001, 1547025] }))
					.toEqual([{ id: 1487001, name: '1487001' }, { id: 1547025, name: '1547025' }]);
			});
		});

		describe('getRemovedFacet', () => {
			it('should remove one value', () => {
				expect(matcherAccountIds.getRemovedFacet({ matcherAccountIds: [1487001, 1547025] }, { id: 1547025 }))
					.toEqual({ matcherAccountIds: [1487001] });
			});

			it('should handle missing', () => {
				expect(matcherAccountIds.getRemovedFacet(undefined, { id: 1 })).toEqual({ matcherAccountIds: [] });
			});
		});

		describe('getFilterFromQuery', () => {
			it('should handle missing and null', () => {
				expect(matcherAccountIds.getFilterFromQuery({})).toEqual({ matcherAccountIds: [] });
				expect(matcherAccountIds.getFilterFromQuery({ matcherAccountIds: null })).toEqual({ matcherAccountIds: [] });
			});

			it('should keep positive integers only', () => {
				expect(matcherAccountIds.getFilterFromQuery({ matcherAccountIds: 'abc,12,-3,4.5' }))
					.toEqual({ matcherAccountIds: [12] });
			});
		});

		describe('getQueryFromFilter', () => {
			it('should handle empty', () => {
				expect(matcherAccountIds.getQueryFromFilter({})).toEqual({});
			});

			it('should round trip', () => {
				const state = { matcherAccountIds: [1487001, 1547025] };

				expect(matcherAccountIds.getQueryFromFilter(state)).toEqual({ matcherAccountIds: '1487001,1547025' });
				expect(matcherAccountIds.getFilterFromQuery(matcherAccountIds.getQueryFromFilter(state))).toEqual(state);
			});
		});
	});
});
