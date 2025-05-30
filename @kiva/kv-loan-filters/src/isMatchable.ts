import { transformRadioGroupOptions, getFilterKeyFromValue } from './filterOptionUtils';
import { getBooleanValueFromQueryParam } from './queryParseUtils';

/**
 * Key for matched loans option
 */
const MATCHED_LOANS_KEY = 'MATCHED_LOANS';

/**
 * Maps the is matchable key to display name
 */
const isMatchableDisplayMap = {
	[MATCHED_LOANS_KEY]: 'Matched loans',
};

/**
 * Maps the is matchable key to value
 */
const isMatchableValueMap = {
	[MATCHED_LOANS_KEY]: true,
};

export const facetsKey = 'isMatchable';

export const stateKey = 'isMatchable';

export const getUiConfig = (options) => ({
	type: undefined,
	hasAccordion: false,
	title: undefined,
	shouldDisplayTitle: false,
	itemHeaderKey: undefined,
	placeholder: undefined,
	facetsKey,
	stateKey,
	eventAction: 'click-isMatchable-filter',
	allOptionsTitle: undefined,
	valueMap: isMatchableValueMap,
	isPercentage: false,
	displayedUnit: undefined,
	...options,
});

export default {
	stateKey,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
	getOptions: (allFacets: any = {}, filteredFacets: any = {}) => transformRadioGroupOptions(
		[{ name: MATCHED_LOANS_KEY }],
		[MATCHED_LOANS_KEY],
		isMatchableDisplayMap,
		isMatchableValueMap,
	),
	showSavedSearch: (loanSearchState) => typeof loanSearchState.isMatchable === 'boolean',
	getFilterChips: (loanSearchState) => {
		if (typeof loanSearchState.isMatchable !== 'undefined' && loanSearchState.isMatchable !== null) {
			return [{
				name: isMatchableDisplayMap[getFilterKeyFromValue(
					loanSearchState.isMatchable,
					isMatchableValueMap,
				)],
				__typename: 'isMatchable',
			}];
		}
		return [];
	},
	getRemovedFacet: () => ({ isMatchable: null }),
	getSavedSearch: (loanSearchState) => ({
		isMatched: loanSearchState?.isMatchable !== null ? loanSearchState.isMatchable : null,
	}),
	getFlssFilter: (loanSearchState) => ({
		...(typeof loanSearchState?.isMatchable !== 'undefined' && loanSearchState.isMatchable !== null && {
			isMatchable: { eq: loanSearchState.isMatchable },
		}),
	}),
	getValidatedSearchState: (loanSearchState) => ({
		isMatchable: typeof loanSearchState?.isMatchable === 'boolean' ? loanSearchState?.isMatchable : null,
	}),
	getFilterFromQuery: (query) => ({ isMatchable: getBooleanValueFromQueryParam(query.matchedOnly) }),
	getQueryFromFilter: (loanSearchState) => ({
		...(typeof loanSearchState.isMatchable === 'boolean' && {
			matchedOnly: loanSearchState.isMatchable.toString(),
		}),
	}),
};
