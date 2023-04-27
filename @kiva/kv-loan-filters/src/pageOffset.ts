import { isNumber } from './numberUtils';

export const facetsKey = 'pageOffset';

export const stateKey = 'pageOffset';

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
	getOptions: () => ([]),
	showSavedSearch: () => (false),
	getFilterChips: () => ([]),
	getRemovedFacet: () => ({}),
	getSavedSearch: () => ({}),
	getFlssFilter: () => ({}),
	getValidatedSearchState: (loanSearchState) => ({
		pageOffset: isNumber(loanSearchState?.pageOffset) ? loanSearchState.pageOffset : 0,
	}),
	getFilterFromQuery: (query, _allFacets, pageLimit) => {
		// Convert query param 1-based page to pager 0-based page and ensure page is an integer
		const page = isNumber(query.page) && query.page >= 1 ? Math.floor(query.page) - 1 : 0;

		return { pageOffset: page * pageLimit };
	},
	getQueryFromFilter: (loanSearchState) => {
		// Page query param is 1-based
		const page = (loanSearchState.pageOffset / loanSearchState.pageLimit) + 1;

		return { ...(page > 1 && { page: page.toString() }) };
	},
};
