import { isNumber } from './numberUtils';

export const DEFAULT_PAGE_LIMIT = 15;

export const facetsKey = 'pageLimit';

export const stateKey = 'pageLimit';

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
	getFlssFilter: () => ({}),
	getValidatedSearchState: (loanSearchState) => ({
		pageLimit: isNumber(loanSearchState?.pageLimit) ? loanSearchState.pageLimit : DEFAULT_PAGE_LIMIT,
	}),
	getFilterFromQuery: (_query, _allFacets, pageLimit) => ({ pageLimit }),
	getQueryFromFilter: () => ({}),
};
