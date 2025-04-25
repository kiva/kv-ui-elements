import { getMinMaxRangeFilter, createMinMaxRange } from './minMaxRangeUtils';

/**
 * The min daysUntilExpiration value
 */
export const MIN = 0;

/**
 * The max daysUntilExpiration value
 */
export const MAX = 45;

export const facetsKey = 'daysUntilExpiration';

export const stateKey = 'daysUntilExpiration';

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
	getOptions: (allFacets: any = {}, filteredFacets: any = {}) => ({ min: MIN, max: MAX, step: 1 }),
	showSavedSearch: () => (false),
	getFilterChips: () => ([]),
	getRemovedFacet: () => ({}),
	getSavedSearch: () => ({}),
	getFlssFilter: (loanSearchState) => ({
		...(loanSearchState?.daysUntilExpiration && {
			daysUntilExpiration: { range: getMinMaxRangeFilter(loanSearchState.daysUntilExpiration) },
		}),
	}),
	getValidatedSearchState: (loanSearchState) => {
		const min = loanSearchState?.daysUntilExpiration?.min ?? MIN;
		const max = loanSearchState?.daysUntilExpiration?.max ?? MAX;
		return {
			daysUntilExpiration: loanSearchState?.daysUntilExpiration
				? createMinMaxRange(min >= MIN ? min : MIN, max <= MAX ? max : MAX)
				: null,
		};
	},
	getFilterFromQuery: () => ({}),
	getQueryFromFilter: () => ({}),
};
