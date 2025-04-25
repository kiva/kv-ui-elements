import { getMinMaxRangeFilter, createMinMaxRange } from './minMaxRangeUtils';

/**
 * The min risk rating value
 */
export const MIN = 25;

/**
 * The max risk rating value
 */
export const MAX = 1000000;

export const facetsKey = 'loanAmount';

export const stateKey = 'loanAmount';

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
	getOptions: (allFacets: any = {}, filteredFacets: any = {}) => ({ min: MIN, max: MAX, step: 25 }),
	showSavedSearch: () => (false),
	getFilterChips: () => ([]),
	getRemovedFacet: () => ({}),
	getSavedSearch: () => ({}),
	getFlssFilter: (loanSearchState) => ({
		...(loanSearchState?.loanAmount && {
			loanAmount: { range: getMinMaxRangeFilter(loanSearchState.loanAmount) },
		}),
	}),
	getValidatedSearchState: (loanSearchState) => {
		const min = loanSearchState?.loanAmount?.min ?? MIN;
		const max = loanSearchState?.loanAmount?.max ?? MAX;
		return {
			loanAmount: loanSearchState?.loanAmount
				? createMinMaxRange(min >= MIN ? min : MIN, max <= MAX ? max : MAX)
				: null,
		};
	},
	getFilterFromQuery: () => ({}),
	getQueryFromFilter: () => ({}),
};
