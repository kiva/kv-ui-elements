import { getIntegersFromQueryParam, getPassThroughChips, getValidatedIntegers } from './passThroughUtils';

export const facetsKey = 'matcherAccountIds';

export const stateKey = 'matcherAccountIds';

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
	getFilterChips: (loanSearchState) => getPassThroughChips(loanSearchState?.matcherAccountIds),
	getRemovedFacet: (loanSearchState, facet) => ({
		matcherAccountIds: (loanSearchState?.matcherAccountIds ?? []).filter((id) => id !== facet?.id),
	}),
	getSavedSearch: () => ({}),
	getFlssFilter: (loanSearchState) => ({
		...(loanSearchState?.matcherAccountIds?.length && {
			matcherAccountIds: { any: loanSearchState.matcherAccountIds },
		}),
	}),
	getValidatedSearchState: (loanSearchState) => ({
		matcherAccountIds: getValidatedIntegers(loanSearchState?.matcherAccountIds),
	}),
	getFilterFromQuery: (query) => ({ matcherAccountIds: getIntegersFromQueryParam(query?.matcherAccountIds) }),
	getQueryFromFilter: (loanSearchState) => ({
		...(loanSearchState?.matcherAccountIds?.length && {
			matcherAccountIds: loanSearchState.matcherAccountIds.join(),
		}),
	}),
};
