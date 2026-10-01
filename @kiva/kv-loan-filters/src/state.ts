import { getPassThroughChips, getStringsFromQueryParam, getValidatedStrings } from './passThroughUtils';

export const facetsKey = 'state';

export const stateKey = 'state';

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
	getFilterChips: (loanSearchState) => getPassThroughChips(loanSearchState?.state),
	getRemovedFacet: (loanSearchState, facet) => ({
		state: (loanSearchState?.state ?? []).filter((s) => s !== facet?.id),
	}),
	getSavedSearch: () => ({}),
	getFlssFilter: (loanSearchState) => ({
		...(loanSearchState?.state?.length && { state: { any: loanSearchState.state } }),
	}),
	getValidatedSearchState: (loanSearchState) => ({ state: getValidatedStrings(loanSearchState?.state) }),
	getFilterFromQuery: (query) => ({ state: getStringsFromQueryParam(query?.state) }),
	getQueryFromFilter: (loanSearchState) => ({
		...(loanSearchState?.state?.length && { state: loanSearchState.state.join() }),
	}),
};
