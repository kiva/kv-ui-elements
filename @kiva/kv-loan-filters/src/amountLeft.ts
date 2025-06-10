import { getMinMaxRangeFilter, createMinMaxRange } from './minMaxRangeUtils';
import { getMinMaxRangeFromQueryParam } from './queryParseUtils';

export const MIN = 0;

export const MAX = 1000000;

export const facetsKey = 'amountLeft';

export const stateKey = 'amountLeft';

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
		...(loanSearchState?.amountLeft && {
			amountLeft: { range: getMinMaxRangeFilter(loanSearchState.amountLeft) },
		}),
	}),
	getValidatedSearchState: (loanSearchState) => {
		const min = loanSearchState?.amountLeft?.min ?? MIN;
		const max = loanSearchState?.amountLeft?.max ?? MAX;
		return {
			amountLeft: loanSearchState?.amountLeft
				? createMinMaxRange(min >= MIN ? min : MIN, max <= MAX ? max : MAX)
				: null,
		};
	},
	getFilterFromQuery: (query) => ({
		amountLeft: getMinMaxRangeFromQueryParam(query.amountLeft) ?? null,
	}),
	getQueryFromFilter: () => ({}),
};
