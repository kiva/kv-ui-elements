import { getPassThroughChips, getStringsFromQueryParam, getValidatedStrings } from './passThroughUtils';

export const facetsKey = 'city';

export const stateKey = 'city';

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
	getFilterChips: (loanSearchState) => getPassThroughChips(loanSearchState?.city),
	getRemovedFacet: (loanSearchState, facet) => ({
		city: (loanSearchState?.city ?? []).filter((c) => c !== facet?.id),
	}),
	getSavedSearch: () => ({}),
	getFlssFilter: (loanSearchState) => ({
		...(loanSearchState?.city?.length && { city: { any: loanSearchState.city } }),
	}),
	getValidatedSearchState: (loanSearchState) => ({ city: getValidatedStrings(loanSearchState?.city) }),
	getFilterFromQuery: (query) => ({ city: getStringsFromQueryParam(query?.city) }),
	getQueryFromFilter: (loanSearchState) => ({
		...(loanSearchState?.city?.length && { city: loanSearchState.city.join() }),
	}),
};
