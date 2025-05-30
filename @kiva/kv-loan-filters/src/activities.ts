export const facetsKey = 'activityId';

export const stateKey = 'activityId';

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
		...(loanSearchState?.activityId?.length && { activityId: { any: loanSearchState.activityId } }),
	}),
	getValidatedSearchState: (loanSearchState) => ({
		// Don't worry about validating activity ID filter for now against available facets
		// We don't display the filter in the UI and only use it for a small number of categories
		activityId: loanSearchState?.activityId ?? [],
	}),
	getFilterFromQuery: () => ({}),
	getQueryFromFilter: () => ({}),
};
