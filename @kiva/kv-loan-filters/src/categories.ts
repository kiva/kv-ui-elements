import loanChannelQueryMap from './loanChannelQueryMap';

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
