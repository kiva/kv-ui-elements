export const facetsKey = 'activityId';

export const stateKey = 'activityId';

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
		...(loanSearchState?.activityId?.length && { activityId: { any: loanSearchState.activityId } }),
	}),
	getValidatedSearchState: () => ({}),
	getFilterFromQuery: () => ({}),
	getQueryFromFilter: () => ({}),
};
