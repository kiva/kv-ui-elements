import loanChannelQueryMap from './loanChannelQueryMap';
import { transformRadioGroupOptions } from './filterOptionUtils';

export const facetsKey = 'categories';

export const stateKey = 'category';

export const getUiConfig = (options) => ({
	type: undefined,
	hasAccordion: true,
	title: 'category',
	shouldDisplayTitle: true,
	itemHeaderKey: undefined,
	placeholder: undefined,
	facetsKey,
	stateKey,
	eventAction: 'click-category-filter',
	allOptionsTitle: 'All categories',
	valueMap: undefined,
	isPercentage: false,
	displayedUnit: undefined,
	...options,
});

export default {
	stateKey,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
	getOptions: (allFacets: any = {}, filteredFacets: any = {}) => {
		const sortedCategories = [...allFacets?.categoryFacets ?? []].sort(
			// eslint-disable-next-line no-nested-ternary
			(catA, catB) => {
				if (catA.name < catB.name) return -1;
				if (catA.name > catB.name) return 1;
				return 0;
			},
		);

		return sortedCategories.map((c) => ({ key: c.id, title: c.name }));
	},
	showSavedSearch: () => (false),
	getFilterChips: () => ([]),
	getRemovedFacet: () => ({ category: null }),
	getSavedSearch: () => ({}),
	getFlssFilter: () => ({}),
	getValidatedSearchState: (loanSearchState, allFacets) => {
		const parsedId = +loanSearchState?.category;

		const category = allFacets?.categoryIds?.includes(parsedId) ? parsedId : null;
		let categoryFilters = {};

		if (category) {
			const queryMap = loanChannelQueryMap.data().loanChannelQueryMap;
			categoryFilters = queryMap.find((c) => c.id === parsedId)?.flssLoanSearch ?? {};
		}

		return { category, ...categoryFilters };
	},
	getFilterFromQuery: (query) => ({
		category: query.category ?? null,
	}),
	getQueryFromFilter: (loanSearchState) => ({
		...(loanSearchState.category && { category: loanSearchState.category }),
	}),
};

// Radio group options for categories
const CATEGORY_ORDER = [
	'AGRICULTURE',
	'EDUCATION',
	'RETAIL',
	'HEALTH',
	'ARTS',
	'REFUGEES_AND_IDPS',
	'ECO_FRIENDLY',
	'KIVA_US',
	'LIVESTOCK',
	'WOMEN',
	'ENDING_SOON',
	'SINGLE_PARENTS',
	'FOOD',
	'WATER_AND_SANITATION',
	'CONFLICT_ZONES',
	'LGBTQ',
	'SOCIAL_ENTERPRISES',
	'SHORT_TERM_LOANS',
	'MATCHED_LOANS',
	'CRISIS_SUPPORT_LOANS',
];
const categoryDisplayMap = {
	AGRICULTURE: 'Agriculture',
	EDUCATION: 'Education',
	RETAIL: 'Retail',
	HEALTH: 'Health',
	ARTS: 'Arts',
	REFUGEES_AND_IDPS: 'Refugees and IDPs',
	ECO_FRIENDLY: 'Eco-friendly',
	KIVA_US: 'Kiva U.S.',
	LIVESTOCK: 'Livestock',
	WOMEN: 'Women',
	ENDING_SOON: 'Ending soon',
	SINGLE_PARENTS: 'Single parents',
	FOOD: 'Food',
	WATER_AND_SANITATION: 'Water and sanitation',
	CONFLICT_ZONES: 'Conflict zones',
	LGBTQ: 'LGBTQ',
	SOCIAL_ENTERPRISES: 'Social Enterprises',
	SHORT_TERM_LOANS: 'Short-term loans',
	MATCHED_LOANS: 'Matched loans',
	CRISIS_SUPPORT_LOANS: 'Crisis Support Loans',
};

export const transformCategoryOptions = (categories: Array<{ name: string }>) => {
	return transformRadioGroupOptions(categories, CATEGORY_ORDER, categoryDisplayMap);
};

export const getRadioGroupOptions = (allFacets: { categoryFacets?: Array<{ name: string }> }) => {
	return transformRadioGroupOptions(
		allFacets?.categoryFacets,
		CATEGORY_ORDER,
		categoryDisplayMap,
	);
};
