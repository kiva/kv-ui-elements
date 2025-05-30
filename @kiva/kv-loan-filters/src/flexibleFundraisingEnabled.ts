import { transformRadioGroupOptions, getFilterKeyFromValue } from './filterOptionUtils';
import { getBooleanValueFromQueryParam } from './queryParseUtils';

/**
 * Key for options
 */
export const FIXED_KEY = 'FIXED';
export const FLEXIBLE_KEY = 'FLEXIBLE';

/**
 * Maps the key to display name
 */
export const displayMap = {
	[FIXED_KEY]: 'Fixed',
	[FLEXIBLE_KEY]: 'Flexible',
};

/**
 * Maps the is matchable key to value
 */
export const valueMap = {
	[FIXED_KEY]: false,
	[FLEXIBLE_KEY]: true,
};

/**
 * Prepares the is options to be used by a radio group
 *
 * @returns The transformed radio group options
 */
const transformOptions = () => {
	const options = [{ name: FIXED_KEY }, { name: FLEXIBLE_KEY }];
	const order = [FIXED_KEY, FLEXIBLE_KEY];
	return transformRadioGroupOptions(options, order, displayMap, valueMap);
};

export const stateKey = 'flexibleFundraisingEnabled';

export const facetsKey = stateKey;

export const typeName = 'FlexibleFundraisingEnabled';

export const getUiConfig = (options) => ({
	type: undefined,
	hasAccordion: false,
	title: 'Loan Funding Type',
	shouldDisplayTitle: true,
	itemHeaderKey: undefined,
	placeholder: undefined,
	facetsKey,
	stateKey,
	eventAction: 'click-flexibleFundraisingEnabled-filter',
	allOptionsTitle: undefined,
	valueMap,
	isPercentage: false,
	displayedUnit: undefined,
	...options,
});

export default {
	stateKey,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
	getOptions: (allFacets: any = {}, filteredFacets: any = {}) => transformOptions(),
	showSavedSearch: (loanSearchState) => loanSearchState.flexibleFundraisingEnabled !== null,
	getFilterChips: (loanSearchState) => {
		if (typeof loanSearchState.flexibleFundraisingEnabled !== 'undefined'
			&& loanSearchState.flexibleFundraisingEnabled !== null) {
			return [{
				name: displayMap[getFilterKeyFromValue(
					loanSearchState.flexibleFundraisingEnabled,
					valueMap,
				)],
				__typename: typeName,
			}];
		}
		return [];
	},
	getRemovedFacet: () => ({ flexibleFundraisingEnabled: null }),
	getSavedSearch: () => ({}),
	getFlssFilter: (loanSearchState) => ({
		...(typeof loanSearchState?.flexibleFundraisingEnabled !== 'undefined'
			&& loanSearchState.flexibleFundraisingEnabled !== null
			&& { flexibleFundraisingEnabled: { eq: loanSearchState.flexibleFundraisingEnabled } }),
	}),
	getValidatedSearchState: (loanSearchState) => ({
		flexibleFundraisingEnabled: typeof loanSearchState?.flexibleFundraisingEnabled === 'boolean'
			? loanSearchState?.flexibleFundraisingEnabled
			: null,
	}),
	getFilterFromQuery: (query) => ({
		flexibleFundraisingEnabled: getBooleanValueFromQueryParam(query.flexibleFundraisingEnabled),
	}),
	getQueryFromFilter: (loanSearchState) => ({
		...(typeof loanSearchState.flexibleFundraisingEnabled === 'boolean' && {
			flexibleFundraisingEnabled: loanSearchState.flexibleFundraisingEnabled.toString(),
		}),
	}),
};
