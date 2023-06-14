import categories from '../categories';
import { mockAllFacets } from './fixtures/mockLoanSearchData';

describe('categories.ts', () => {
	describe('default', () => {
		describe('getOptions', () => {
			it('should handle undefined', () => {
				const result = categories.getOptions(undefined);

				expect(result).toEqual([]);
			});

			it('should return sorted', () => {
				const result = categories.getOptions({
					categoryFacets: [
						{
							id: 2,
							name: 'b',
						},
						{
							id: 1,
							name: 'c',
						},
						{
							id: 0,
							name: 'a',
						},
					],
				});

				expect(result).toEqual([
					{
						key: 0,
						title: 'a',
					},
					{
						key: 2,
						title: 'b',
					},
					{
						key: 1,
						title: 'c',
					},
				]);
			});
		});

		describe('getValidatedSearchState', () => {
			it('should handle undefined', () => {
				const result = categories.getValidatedSearchState({}, undefined);

				expect(result).toEqual({ category: null });
			});

			it('should handle empty', () => {
				const result = categories.getValidatedSearchState({}, mockAllFacets);

				expect(result).toEqual({ category: null });
			});

			it('should validate category', () => {
				const state = { category: -1 };

				const result = categories.getValidatedSearchState(state, mockAllFacets);

				expect(result).toEqual({ category: null });
			});

			it('should return category and filters', () => {
				const state = { category: 28 };

				const result = categories.getValidatedSearchState(state, mockAllFacets);

				expect(result).toEqual({
					category: 28,
					countryIsoCode: ['US', 'GU', 'VI', 'PR'],
					distributionModel: 'DIRECT',
				});
			});

			it('should return category and filters if string', () => {
				const state = { category: '28' };

				const result = categories.getValidatedSearchState(state, mockAllFacets);

				expect(result).toEqual({
					category: 28,
					countryIsoCode: ['US', 'GU', 'VI', 'PR'],
					distributionModel: 'DIRECT',
				});
			});
		});

		describe('getFilterFromQuery', () => {
			it('should handle missing category', () => {
				const result = categories.getFilterFromQuery({});

				expect(result).toEqual({ category: null });
			});

			it('should get filter', () => {
				const query = { category: 2 };

				const result = categories.getFilterFromQuery(query);

				expect(result).toEqual({ category: 2 });
			});
		});

		describe('getQueryFromFilter', () => {
			it('should handle missing category', () => {
				const result = categories.getQueryFromFilter({});

				expect(result).toEqual({});
			});

			it('should push category', () => {
				const state = { category: 2 };

				const result = categories.getQueryFromFilter(state);

				expect(result).toEqual({ category: 2 });
			});
		});
	});
});
