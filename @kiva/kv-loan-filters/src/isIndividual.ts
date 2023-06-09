import { transformRadioGroupOptions, getFilterKeyFromValue } from './filterOptionUtils';
import { getBooleanValueFromQueryParam } from './queryParseUtils';

// Is individual option keys
export const INDIVIDUAL_KEY = 'INDIVIDUAL';
export const GROUP_KEY = 'GROUP';

/**
 * Maps the is individual keys to display names
 */
export const isIndividualDisplayMap = {
	[INDIVIDUAL_KEY]: 'Individual',
	[GROUP_KEY]: 'Group',
};

/**
 * Maps the is individual keys to values
 */
const isIndividualValueMap = {
	[INDIVIDUAL_KEY]: true,
	[GROUP_KEY]: false,
};

/**
 * Prepares the is individual options to be used by a radio group
 *
 * @returns The transformed radio group options
 */
export const transformIsIndividualOptions = () => {
	const options = [{ name: INDIVIDUAL_KEY }, { name: GROUP_KEY }];
	const order = [INDIVIDUAL_KEY, GROUP_KEY];
	return transformRadioGroupOptions(options, order, isIndividualDisplayMap, isIndividualValueMap);
};

/**
 * Gets the is individual filter value based on the query param
 *
 * @param param The query param to parse
 * @returns The is individual filter value
 */
export const getIsIndividualFromQueryParam = (param?) => {
	const value = getBooleanValueFromQueryParam(param);

	// Reverse the "isGroup" param that is used to match legacy filters
	return typeof value === 'boolean' ? !value : null;
};

export const facetsKey = 'isIndividual';

export const stateKey = 'isIndividual';

export const getUiConfig = (options) => ({
	type: undefined,
	hasAccordion: false,
	topLine: false,
	bottomLine: false,
	title: undefined,
	shouldDisplayTitle: false,
	itemHeaderKey: undefined,
	placeholder: undefined,
	facetsKey,
	stateKey,
	eventAction: 'click-isIndividual-filter',
	allOptionsTitle: undefined,
	valueMap: isIndividualValueMap,
	isPercentage: false,
	displayedUnit: undefined,
	...options,
});

export default {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
	getOptions: (allFacets: any = {}, filteredFacets: any = {}) => transformIsIndividualOptions(),
	showSavedSearch: (loanSearchState) => loanSearchState.isIndividual !== null,
	getFilterChips: (loanSearchState) => {
		if (typeof loanSearchState.isIndividual !== 'undefined' && loanSearchState.isIndividual !== null) {
			return [{
				name: isIndividualDisplayMap[getFilterKeyFromValue(
					loanSearchState.isIndividual,
					isIndividualValueMap,
				)],
				__typename: 'IsIndividual',
			}];
		}
		return [];
	},
	getRemovedFacet: () => ({ isIndividual: null }),
	getSavedSearch: (loanSearchState) => ({
		// Reverse "isIndividual" to match legacy "isGroup" query param
		isGroup: loanSearchState?.isIndividual !== null ? !loanSearchState.isIndividual : null,
	}),
	getFlssFilter: (loanSearchState) => ({
		...(typeof loanSearchState?.isIndividual !== 'undefined' && loanSearchState.isIndividual !== null && {
			isIndividual: { eq: loanSearchState.isIndividual },
		}),
	}),
	getValidatedSearchState: (loanSearchState) => ({
		isIndividual: typeof loanSearchState?.isIndividual === 'boolean' ? loanSearchState?.isIndividual : null,
	}),
	getFilterFromQuery: (query) => ({ isIndividual: getIsIndividualFromQueryParam(query.isGroup) }),
	getQueryFromFilter: (loanSearchState) => ({
		// Reverse "isIndividual" to match legacy "isGroup" query param
		...(typeof loanSearchState.isIndividual === 'boolean' && {
			isGroup: (!loanSearchState.isIndividual).toString(),
		}),
	}),
};
