import { readFileSync } from 'fs';
import { join } from 'path';
import categories, { ResolvedCategories } from '../categories';

const savedSearches = JSON.parse(
	readFileSync(join(__dirname, 'fixtures', 'categorySavedSearches.json'), 'utf8'),
);

const toResolved = (slug: string) => ({
	slug,
	savedSearch: { filters: savedSearches[slug].filters, sortBy: savedSearches[slug].sortBy },
});

const resolvedCategories: ResolvedCategories = {
	agriculture: toResolved('agriculture'),
	'ending-soon': toResolved('ending-soon'),
	'no-saved-search': { slug: 'no-saved-search', savedSearch: null },
};

const allFacets = { resolvedCategories };

describe('categories.ts', () => {
	describe('default', () => {
		describe('getOptions', () => {
			it('should handle undefined', () => {
				const result = categories.getOptions(undefined);

				expect(result).toEqual([]);
			});

			it('should return sorted options keyed by slug', () => {
				const result = categories.getOptions({
					categoryFacets: [
						{ slug: 'b-slug', name: 'b' },
						{ slug: 'c-slug', name: 'c' },
						{ slug: 'a-slug', name: 'a' },
					],
				});

				expect(result).toEqual([
					{ key: 'a-slug', title: 'a' },
					{ key: 'b-slug', title: 'b' },
					{ key: 'c-slug', title: 'c' },
				]);
			});
		});

		describe('getValidatedSearchState', () => {
			it('should handle undefined', () => {
				expect(categories.getValidatedSearchState({}, undefined)).toEqual({ category: null });
			});

			it('should handle missing resolved categories', () => {
				expect(categories.getValidatedSearchState({ category: 'agriculture' }, {})).toEqual({ category: null });
			});

			it('should return category, filters and sort for a resolved slug', () => {
				const result = categories.getValidatedSearchState({ category: 'agriculture' }, allFacets);

				expect(result).toEqual({
					category: 'agriculture',
					sectorId: [1],
					sortBy: savedSearches.agriculture.sortBy,
				});
			});

			it('should convert range filters', () => {
				const result = categories.getValidatedSearchState({ category: 'ending-soon' }, allFacets);

				expect(result).toEqual({
					category: 'ending-soon',
					daysUntilExpiration: { min: 0, max: 7, __typename: 'MinMaxRange' },
					sortBy: 'expiringSoon',
				});
			});

			it('should keep a sort already in state over the category sort', () => {
				const result = categories.getValidatedSearchState({ category: 'agriculture', sortBy: 'amountLeft' }, allFacets);

				expect(result).toEqual({ category: 'agriculture', sectorId: [1] });
			});

			it('should return null for an unresolved slug', () => {
				expect(categories.getValidatedSearchState({ category: 'team-kiva' }, allFacets))
					.toEqual({ category: null });
			});

			it('should normalise case and whitespace to the canonical slug', () => {
				const result = categories.getValidatedSearchState({ category: ' Agriculture ' }, allFacets);

				expect(result.category).toBe('agriculture');
			});

			it.each([28, '28', null, ''])('should return null for legacy or empty category %p', (category) => {
				expect(categories.getValidatedSearchState({ category }, allFacets)).toEqual({ category: null });
			});

			it.each(['constructor', '__proto__', 'toString'])('should return null for prototype name %p', (category) => {
				expect(categories.getValidatedSearchState({ category }, allFacets)).toEqual({ category: null });
			});

			it('should return only the category when it has no saved search', () => {
				expect(categories.getValidatedSearchState({ category: 'no-saved-search' }, allFacets))
					.toEqual({ category: 'no-saved-search' });
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
