export const facetsKey = 'state';

export const stateKey = 'trusteeId';

export const getUiConfig = (options) => ({
	type: undefined,
	hasAccordion: undefined,
	topLine: false,
	bottomLine: false,
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
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
	getOptions: (allFacets: any = {}, filteredFacets: any = {}) => ([]),
	showSavedSearch: () => (false),
	getFilterChips: () => ([]),
	getRemovedFacet: () => ({}),
	getSavedSearch: () => ({}),
	getFlssFilter: (loanSearchState) => ({
		...(loanSearchState?.trusteeId?.length && { city: { any: loanSearchState.trusteeId } }),
	}),
	getValidatedSearchState: (loanSearchState) => ({
		// Don't worry about validating the filter for now against available facets
		// We don't display the filter in the UI and only pass it through for baseline campaign searches
		trusteeId: loanSearchState?.trusteeId ?? [],
	}),
	getFilterFromQuery: () => ({}),
	getQueryFromFilter: () => ({}),
};
