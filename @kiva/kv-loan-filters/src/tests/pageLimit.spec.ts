import pageLimit, { DEFAULT_PAGE_LIMIT } from '../pageLimit';
import { mockAllFacets, mockState } from './fixtures/mockLoanSearchData';

describe('pageLimit.ts', () => {
	describe('default', () => {
		describe('getValidatedSearchState', () => {
			it('should handle undefined', () => {
				const result = pageLimit.getValidatedSearchState({});

				expect(result).toEqual({ pageLimit: DEFAULT_PAGE_LIMIT });
			});

			it('should validate pageLimit', () => {
				const state = { pageLimit: 'asd' };

				const result = pageLimit.getValidatedSearchState(state);

				expect(result).toEqual({ pageLimit: 15 });
			});
		});

		describe('getFilterFromQuery', () => {
			it('it should get filter', () => {
				const result = pageLimit.getFilterFromQuery(
					{},
					mockAllFacets,
					mockState.pageLimit,
				);

				expect(result).toEqual({ pageLimit: mockState.pageLimit });
			});
		});
	});
});
