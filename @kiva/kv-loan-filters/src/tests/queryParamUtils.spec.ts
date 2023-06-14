import { convertQueryToFilters, updateQueryParams, hasExcludedQueryParams } from '../queryParamUtils';
import { FLSS_QUERY_TYPE } from '../filterOptionUtils';
import filterUtils from '../filterUtils';
import { mockState, mockAllFacets } from './fixtures/mockLoanSearchData';

jest.mock('../filterUtils', () => {
	return {
		filters: {
			regions: {
				getFilterFromQuery: jest.fn().mockReturnValue({ a: 'a' }),
				getQueryFromFilter: jest.fn().mockReturnValue({ a: 'a' }),
			},
			tags: {
				getFilterFromQuery: jest.fn().mockReturnValue({ b: 'b' }),
				getQueryFromFilter: jest.fn().mockReturnValue({ b: 'b' }),
			},
		},
		keys: ['regions', 'tags'],
	};
});

describe('queryParamUtils.ts', () => {
	beforeEach(jest.clearAllMocks);

	describe('hasExcludedQueryParams', () => {
		it('should return true', () => {
			expect(hasExcludedQueryParams({ activity: [] })).toBe(true);
			expect(hasExcludedQueryParams({ city_state: [] })).toBe(true);
			expect(hasExcludedQueryParams({ loanTags: [] })).toBe(true);
			expect(hasExcludedQueryParams({ state: [] })).toBe(true);
			expect(hasExcludedQueryParams({ loanLimit: [] })).toBe(true);
		});

		it('should return false', () => {
			expect(hasExcludedQueryParams({ test: [] })).toBe(false);
		});
	});

	describe('convertQueryToFilters', () => {
		it('should call filterUtils', () => {
			const result = convertQueryToFilters({}, mockAllFacets, FLSS_QUERY_TYPE, mockState.pageLimit);

			expect(result).toEqual({ a: 'a', b: 'b' });
			expect(filterUtils.filters.regions.getFilterFromQuery).toHaveBeenCalledTimes(1);
			expect(filterUtils.filters.regions.getFilterFromQuery)
				.toHaveBeenCalledWith({}, mockAllFacets, mockState.pageLimit, FLSS_QUERY_TYPE);
			expect(filterUtils.filters.tags.getFilterFromQuery).toHaveBeenCalledTimes(1);
			expect(filterUtils.filters.tags.getFilterFromQuery)
				.toHaveBeenCalledWith({}, mockAllFacets, mockState.pageLimit, FLSS_QUERY_TYPE);
		});
	});

	describe('updateQueryParams', () => {
		const getRouter = (query = {}) => ({
			currentRoute: { name: 'name', query },
			push: jest.fn().mockReturnValue({ catch: jest.fn() }),
		});

		it('should call filterUtils', () => {
			const router = getRouter();

			updateQueryParams({}, router.currentRoute, router.push, FLSS_QUERY_TYPE);

			expect(filterUtils.filters.regions.getQueryFromFilter).toHaveBeenCalledTimes(1);
			expect(filterUtils.filters.regions.getQueryFromFilter).toHaveBeenCalledWith({}, FLSS_QUERY_TYPE);
			expect(filterUtils.filters.tags.getQueryFromFilter).toHaveBeenCalledTimes(1);
			expect(filterUtils.filters.tags.getQueryFromFilter).toHaveBeenCalledWith({}, FLSS_QUERY_TYPE);
			expect(router.push).toHaveBeenCalledWith({
				name: 'name',
				query: { a: 'a', b: 'b' },
				params: {},
			});
		});

		it('should preserve UTM params', () => {
			const router = getRouter({ utm_test: 'test' });

			updateQueryParams({}, router.currentRoute, router.push, FLSS_QUERY_TYPE);

			expect(router.push).toHaveBeenCalledWith({
				name: 'name',
				query: { a: 'a', b: 'b', utm_test: 'test' },
				params: {},
			});
		});
	});
});
