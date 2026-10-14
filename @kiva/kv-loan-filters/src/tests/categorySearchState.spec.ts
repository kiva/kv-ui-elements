import { getValidatedSearchState } from '../searchStateUtils';
import { FLSS_QUERY_TYPE } from '../filterOptionUtils';
import { mockAllFacets } from './fixtures/mockLoanSearchData';

const allFacets = {
	...mockAllFacets,
	resolvedCategories: {
		'ending-soon': {
			slug: 'ending-soon',
			savedSearch: {
				filters: [{ daysUntilExpiration: { range: { gte: 0, lte: 7 } } }],
				sortBy: 'expiringSoon',
			},
		},
		'new-backend-field': {
			slug: 'new-backend-field',
			savedSearch: { filters: [{ notAFilterModule: { any: [1] } }] },
		},
	},
};

describe('category search state', () => {
	it('should apply the category saved search through each filter module', () => {
		const result = getValidatedSearchState({ category: 'ending-soon' }, allFacets, FLSS_QUERY_TYPE);

		expect(result).toMatchObject({
			category: 'ending-soon',
			daysUntilExpiration: { min: 0, max: 7 },
			sortBy: 'expiringSoon',
		});
	});

	it('should drop saved search keys that no filter module owns', () => {
		const result = getValidatedSearchState({ category: 'new-backend-field' }, allFacets, FLSS_QUERY_TYPE);

		expect(result).toHaveProperty('category', 'new-backend-field');
		expect(result).not.toHaveProperty('notAFilterModule');
	});

	it.each([
		['activityId', { none: [1] }, []],
		['sectorId', { none: [1] }, []],
		['themeId', { none: [1] }, []],
		['tagId', { none: [1] }, []],
		['partnerId', { none: [1] }, []],
		['trusteeId', { none: [1] }, []],
		['countryIsoCode', { none: ['US'] }, []],
		['countryIsoCode', { any: [1] }, []],
		['gender', { any: ['female', 'nonbinary'] }, null],
		['distributionModel', { eq: 5 }, null],
		['keywordSearch', { eq: 5 }, null],
	])('should not throw on an unexpected saved search shape for %s %j', (key, modifier, expected) => {
		const facets = {
			...allFacets,
			resolvedCategories: { odd: { slug: 'odd', savedSearch: { filters: [{ [key]: modifier }] } } },
		};

		const result = getValidatedSearchState({ category: 'odd' }, facets, FLSS_QUERY_TYPE);

		expect(result).toHaveProperty('category', 'odd');
		expect(result).toHaveProperty(key, expected);
	});

	it('should clear the category and its filters for an unresolved slug', () => {
		const result = getValidatedSearchState({ category: 'team-kiva' }, allFacets, FLSS_QUERY_TYPE);

		expect(result).toMatchObject({ category: null, daysUntilExpiration: null });
	});
});
