import { getBooleanValueFromQueryParam } from './queryParseUtils';

export const facetsKey = 'dafEligible';

export const stateKey = 'dafEligible';

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
	getRemovedFacet: () => ({ dafEligible: null }),
	getSavedSearch: () => ({}),
	getFlssFilter: (loanSearchState) => ({
		...(typeof loanSearchState?.dafEligible !== 'undefined' && loanSearchState.dafEligible !== null && {
			dafEligible: { eq: loanSearchState.dafEligible },
		}),
	}),
	getValidatedSearchState: (loanSearchState) => ({
		// dafEligible is a boolean filter
		// We don't display this filter in the UI and only use it for a small number of categories
		dafEligible: typeof loanSearchState?.dafEligible === 'boolean' ? loanSearchState?.dafEligible : null,
	}),
	getFilterFromQuery: (query) => ({ dafEligible: getBooleanValueFromQueryParam(query.dafEligible) }),
	getQueryFromFilter: (loanSearchState) => ({
		...(typeof loanSearchState.dafEligible === 'boolean' && {
			dafEligible: loanSearchState.dafEligible.toString(),
		}),
	}),
};
