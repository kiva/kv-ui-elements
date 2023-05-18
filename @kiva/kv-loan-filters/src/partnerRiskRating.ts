import { getMinMaxRangeFilter, getMinMaxRangeQueryParam, createMinMaxRange } from './minMaxRangeUtils';
import { getMinMaxRangeFromQueryParam } from './queryParseUtils';

/**
 * The min risk rating value
 */
export const MIN = 0;

/**
 * The max risk rating value
 */
export const MAX = 5;

export const facetsKey = 'partnerRiskRating';

export const stateKey = 'partnerRiskRating';

export const getUiConfig = (options) => ({
	type: undefined,
	hasAccordion: false,
	topLine: true,
	bottomLine: false,
	title: 'Risk rating',
	shouldDisplayTitle: true,
	itemHeaderKey: undefined,
	placeholder: undefined,
	facetsKey,
	stateKey,
	eventAction: 'change-partnerRiskRating-filter',
	allOptionsTitle: undefined,
	valueMap: undefined,
	isPercentage: false,
	displayedUnit: undefined,
	...options,
});

export default {
	getOptions: (allFacets: any = {}, filteredFacets: any = {}) => ({ min: MIN, max: MAX, step: 0.5 }),
	showSavedSearch: (loanSearchState) => !!loanSearchState.partnerRiskRating,
	getFilterChips: (loanSearchState) => {
		if (loanSearchState.partnerRiskRating) {
			return [{
				name: `Risk rating: ${
					loanSearchState.partnerRiskRating.min
				} to ${loanSearchState.partnerRiskRating.max}`,
				__typename: 'PartnerRiskRating',
			}];
		}
		return [];
	},
	getRemovedFacet: () => ({ partnerRiskRating: null }),
	getSavedSearch: (loanSearchState) => ({
		// Create new simple object that can be saved to legacy "MinMaxRangeInput" type
		riskRating: loanSearchState?.partnerRiskRating
			? {
				min: loanSearchState.partnerRiskRating.min,
				max: loanSearchState.partnerRiskRating.max,
			} : null,
	}),
	getFlssFilter: (loanSearchState) => ({
		...(loanSearchState?.partnerRiskRating && {
			partnerRiskRating: { range: getMinMaxRangeFilter(loanSearchState.partnerRiskRating) },
		}),
	}),
	getValidatedSearchState: (loanSearchState) => {
		const min = loanSearchState?.partnerRiskRating?.min ?? MIN;
		const max = loanSearchState?.partnerRiskRating?.max ?? MAX;
		return {
			partnerRiskRating: loanSearchState?.partnerRiskRating
				? createMinMaxRange(min >= MIN ? min : MIN, max <= MAX ? max : MAX)
				: null,
		};
	},
	getFilterFromQuery: (query) => ({
		partnerRiskRating: getMinMaxRangeFromQueryParam(query.riskRating) ?? null,
	}),
	getQueryFromFilter: (loanSearchState) => ({
		...(loanSearchState.partnerRiskRating && {
			riskRating: getMinMaxRangeQueryParam(loanSearchState.partnerRiskRating),
		}),
	}),
};
