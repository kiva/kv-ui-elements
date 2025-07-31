import { transformRadioGroupOptions } from './filterOptionUtils';
import { getEnumNameFromQueryParam } from './queryParseUtils';

// Gender enum keys
export const FEMALE_KEY = 'FEMALE';
export const MALE_KEY = 'MALE';
export const NON_BINARY_KEY = 'NONBINARY';

/**
 * Maps the gender enum names to display names
 */
export const genderDisplayMap = {
	[FEMALE_KEY]: 'Women',
	[MALE_KEY]: 'Men',
	[NON_BINARY_KEY]: 'Nonbinary',
};

/**
 * Prepares the gender options to be used by a radio group
 *
 * @param genders The genders to transform
 * @returns The transformed radio group options
 */
export const transformGenderOptions = (genders) => {
	return transformRadioGroupOptions(genders, [FEMALE_KEY, MALE_KEY, NON_BINARY_KEY], genderDisplayMap);
};

export const facetsKey = 'genders';

export const stateKey = 'gender';

export const getUiConfig = (options) => ({
	type: undefined,
	hasAccordion: false,
	title: 'gender',
	shouldDisplayTitle: true,
	itemHeaderKey: undefined,
	placeholder: undefined,
	facetsKey,
	stateKey,
	eventAction: 'click-gender-filter',
	allOptionsTitle: 'All genders',
	valueMap: undefined,
	isPercentage: false,
	displayedUnit: undefined,
	...options,
});

export default {
	stateKey,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
	getOptions: (allFacets: any = {}, filteredFacets: any = {}) => transformGenderOptions(allFacets?.genderFacets),
	showSavedSearch: (loanSearchState) => !!loanSearchState.gender,
	getFilterChips: (loanSearchState, allFacets) => {
		if (loanSearchState.gender) {
			const genderFacet = allFacets.genderFacets?.find((f) => f.name === loanSearchState.gender);
			return [{
				name: genderDisplayMap[genderFacet?.name.toUpperCase()],
				__typename: 'Gender',
			}];
		}
		return [];
	},
	getRemovedFacet: () => ({ gender: null }),
	getSavedSearch: (loanSearchState) => ({ gender: loanSearchState?.gender }),
	getFlssFilter: (loanSearchState) => ({
		...(loanSearchState?.gender && { gender: { any: loanSearchState.gender } }),
	}),
	getValidatedSearchState: (loanSearchState, allFacets) => ({
		gender: allFacets?.genders?.includes(loanSearchState?.gender?.toUpperCase()) ? loanSearchState.gender : null,
	}),
	getFilterFromQuery: (query, allFacets) => ({
		gender: getEnumNameFromQueryParam(query.gender, allFacets?.genderFacets) ?? null,
	}),
	getQueryFromFilter: (loanSearchState) => ({ ...(loanSearchState.gender && { gender: loanSearchState.gender }) }),
};
