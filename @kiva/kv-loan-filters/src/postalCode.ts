export const facetsKey = 'postalCode';

export const stateKey = 'postalCode';

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
		...(loanSearchState?.postalCode?.length && { postalCode: { any: loanSearchState.postalCode } }),
	}),
	getValidatedSearchState: (loanSearchState, allFacets) => ({
		postalCode: loanSearchState?.postalCode?.filter((c) => allFacets?.postalCode?.includes(c)) ?? [],
	}),
	getFilterFromQuery: () => ({}),
	getQueryFromFilter: () => ({}),
};
