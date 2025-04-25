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
		...(loanSearchState?.trusteeId?.length && { trusteeId: { any: loanSearchState.trusteeId } }),
	}),
	getValidatedSearchState: (loanSearchState, allFacets) => ({
		trusteeId: loanSearchState?.trusteeId?.filter((c) => allFacets?.trusteeId?.includes(c)) ?? [],
	}),
	getFilterFromQuery: () => ({}),
	getQueryFromFilter: () => ({}),
};
