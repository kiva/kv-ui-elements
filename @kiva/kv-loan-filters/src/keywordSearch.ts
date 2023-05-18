export const facetsKey = 'keywordSearch';

export const stateKey = 'keywordSearch';

export const getUiConfig = (options) => ({
	type: undefined,
	hasAccordion: false,
	topLine: true,
	bottomLine: true,
	title: 'Keywords',
	shouldDisplayTitle: true,
	itemHeaderKey: undefined,
	placeholder: 'Search borrower story',
	facetsKey,
	stateKey,
	eventAction: undefined,
	allOptionsTitle: undefined,
	valueMap: undefined,
	isPercentage: false,
	displayedUnit: undefined,
	...options,
});

export default {
	getOptions: (allFacets: any = {}, filteredFacets: any = {}) => [],
	showSavedSearch: (loanSearchState) => !!loanSearchState.keywordSearch,
	getFilterChips: (loanSearchState) => {
		if (loanSearchState.keywordSearch) {
			return [{ name: loanSearchState.keywordSearch, __typename: 'KeywordSearch' }];
		}
		return [];
	},
	getRemovedFacet: () => ({ keywordSearch: null }),
	getSavedSearch: () => ({}),
	getFlssFilter: (loanSearchState) => ({
		...(loanSearchState?.keywordSearch && { description: { eq: loanSearchState.keywordSearch } }),
	}),
	getValidatedSearchState: (loanSearchState) => ({ keywordSearch: loanSearchState?.keywordSearch?.trim() || null }),
	getFilterFromQuery: (query) => ({ keywordSearch: query.queryString ?? null }),
	getQueryFromFilter: (loanSearchState) => ({
		...(loanSearchState.keywordSearch && { queryString: loanSearchState.keywordSearch }),
	}),
};
