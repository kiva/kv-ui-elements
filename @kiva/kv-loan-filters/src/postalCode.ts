import { getPassThroughChips, getStringsFromQueryParam, getValidatedStrings } from './passThroughUtils';

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
	getFilterChips: (loanSearchState) => getPassThroughChips(loanSearchState?.postalCode),
	getRemovedFacet: (loanSearchState, facet) => ({
		postalCode: (loanSearchState?.postalCode ?? []).filter((p) => p !== facet?.id),
	}),
	getSavedSearch: () => ({}),
	getFlssFilter: (loanSearchState) => ({
		...(loanSearchState?.postalCode?.length && { postalCode: { any: loanSearchState.postalCode } }),
	}),
	getValidatedSearchState: (loanSearchState) => ({ postalCode: getValidatedStrings(loanSearchState?.postalCode) }),
	getFilterFromQuery: (query) => ({ postalCode: getStringsFromQueryParam(query?.postalCode) }),
	getQueryFromFilter: (loanSearchState) => ({
		...(loanSearchState?.postalCode?.length && { postalCode: loanSearchState.postalCode.join() }),
	}),
};
