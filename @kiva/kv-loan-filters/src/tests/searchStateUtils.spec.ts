import { updateSearchState, getValidatedSearchState } from '../searchStateUtils';
import { FLSS_QUERY_TYPE } from '../filterOptionUtils';
import filterUtils from '../filterUtils';
import { mockAllFacets } from './fixtures/mockLoanSearchData';

jest.mock('../filterUtils', () => {
	return {
		filters: {
			regions: { getValidatedSearchState: jest.fn().mockReturnValue({ a: 'a' }) },
			tags: { getValidatedSearchState: jest.fn().mockReturnValue({ b: 'b' }) },
		},
		keys: ['regions', 'tags'],
	};
});

describe('searchStateUtils.js', () => {
	beforeEach(jest.clearAllMocks);

	describe('getValidatedSearchState', () => {
		it('should call filterUtils', () => {
			const result = getValidatedSearchState({}, mockAllFacets, FLSS_QUERY_TYPE);

			expect(result).toEqual({ a: 'a', b: 'b' });
			expect(filterUtils.filters.regions.getValidatedSearchState).toHaveBeenCalledTimes(1);
			expect(filterUtils.filters.regions.getValidatedSearchState)
				.toHaveBeenCalledWith({}, mockAllFacets, FLSS_QUERY_TYPE);
			expect(filterUtils.filters.tags.getValidatedSearchState).toHaveBeenCalledTimes(1);
			expect(filterUtils.filters.tags.getValidatedSearchState)
				.toHaveBeenCalledWith({}, mockAllFacets, FLSS_QUERY_TYPE);
		});
	});

	describe('updateSearchState', () => {
		const mockResult = 1;
		const apollo = { mutate: jest.fn(() => Promise.resolve(mockResult)) };
		const mockState = { a: 'a', b: 'b' };
		const mutation = { test: 1 };
		const params = {
			mutation,
			variables: { searchParams: mockState },
		};

		it('should call apollo with the provided filters and return results', async () => {
			(filterUtils.filters.regions.getValidatedSearchState as jest.Mock).mockReturnValueOnce({ a: 'aa' });
			(filterUtils.filters.tags.getValidatedSearchState as jest.Mock).mockReturnValueOnce({ b: 'bb' });

			const result = await updateSearchState(apollo, mutation, mockState, mockAllFacets, FLSS_QUERY_TYPE, {});

			expect(apollo.mutate).toHaveBeenCalledWith(params);
			expect(result).toBe(mockResult);
		});

		it('should check if state has changed', async () => {
			await updateSearchState(apollo, mutation, mockState, mockAllFacets, FLSS_QUERY_TYPE, mockState);

			expect(apollo.mutate).toHaveBeenCalledTimes(0);
		});
	});
});
