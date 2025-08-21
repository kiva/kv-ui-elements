export const facetsKey = 'countriesNotLentTo';

export const stateKey = 'countriesNotLentTo';

export const getUiConfig = (options) => ({
	type: undefined,
	hasAccordion: undefined,
	title: undefined,
	shouldDisplayTitle: false,
	itemHeaderKey: undefined,
	placeholder: undefined,
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
	stateKey,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
	getOptions: (allFacets: any = {}, filteredFacets: any = {}) => ([]),
	showSavedSearch: () => (false),
	getFilterChips: () => ([]),
	getRemovedFacet: () => ({}),
	getSavedSearch: () => ({}),
	getFlssFilter: (loanSearchState) => ({
		...(loanSearchState?.countriesNotLentTo && { countriesNotLentTo: { any: loanSearchState.countriesNotLentTo } }),
	}),
	getValidatedSearchState: (loanSearchState, allFacets) => ({
		countriesNotLentTo: loanSearchState?.countriesNotLentTo && allFacets?.countriesNotLentTo,
	}),
	getFilterFromQuery: () => ({}),
	getQueryFromFilter: () => ({}),
};
