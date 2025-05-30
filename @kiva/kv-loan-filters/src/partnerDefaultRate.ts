import { getMinMaxRangeFilter, getMinMaxRangeQueryParam, createMinMaxRange } from './minMaxRangeUtils';
import { getMinMaxRangeFromQueryParam } from './queryParseUtils';
import { getDisplayedNumber } from './filterOptionUtils';

/**
 * The min default rate value
 */
export const MIN = 0;

/**
 * The max default rate value
 */
export const MAX = 1;

const IS_PERCENTAGE = true;
const DISPLAYED_UNIT = '%';
const STEP = 0.001;

export const facetsKey = 'partnerDefaultRate';

export const stateKey = 'partnerDefaultRate';

export const getUiConfig = (options) => ({
	type: undefined,
	hasAccordion: false,
	title: 'Default rate',
	shouldDisplayTitle: true,
	itemHeaderKey: undefined,
	placeholder: undefined,
	facetsKey,
	stateKey,
	eventAction: 'change-partnerDefaultRate-filter',
	allOptionsTitle: undefined,
	valueMap: undefined,
	isPercentage: IS_PERCENTAGE,
	displayedUnit: DISPLAYED_UNIT,
	...options,
});

export default {
	stateKey,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
	getOptions: (allFacets: any = {}, filteredFacets: any = {}) => ({ min: MIN, max: MAX, step: STEP }),
	showSavedSearch: (loanSearchState) => !!loanSearchState.partnerDefaultRate,
	getFilterChips: (loanSearchState) => {
		if (loanSearchState.partnerDefaultRate) {
			const minDisplayed = getDisplayedNumber(
				loanSearchState.partnerDefaultRate.min,
				IS_PERCENTAGE,
				DISPLAYED_UNIT,
				STEP,
			);

			const maxDisplayed = getDisplayedNumber(
				loanSearchState.partnerDefaultRate.max,
				IS_PERCENTAGE,
				DISPLAYED_UNIT,
				STEP,
			);

			return [{ name: `Default rate: ${minDisplayed} to ${maxDisplayed}`, __typename: 'PartnerDefaultRate' }];
		}
		return [];
	},
	getRemovedFacet: () => ({ partnerDefaultRate: null }),
	getSavedSearch: (loanSearchState) => ({
		// Create new simple object that can be saved to legacy "MinMaxRangeInput" type
		defaultRate: loanSearchState?.partnerDefaultRate
			? {
				min: loanSearchState.partnerDefaultRate.min,
				max: loanSearchState.partnerDefaultRate.max,
			} : null,
	}),
	getFlssFilter: (loanSearchState) => ({
		...(loanSearchState?.partnerDefaultRate && {
			partnerDefaultRate: { range: getMinMaxRangeFilter(loanSearchState.partnerDefaultRate) },
		}),
	}),
	getValidatedSearchState: (loanSearchState) => {
		const min = loanSearchState?.partnerDefaultRate?.min ?? MIN;
		const max = loanSearchState?.partnerDefaultRate?.max ?? MAX;
		return {
			partnerDefaultRate: loanSearchState?.partnerDefaultRate
				? createMinMaxRange(min >= MIN ? min : MIN, max <= MAX ? max : MAX)
				: null,
		};
	},
	getFilterFromQuery: (query) => ({
		partnerDefaultRate: getMinMaxRangeFromQueryParam(query.defaultRate) ?? null,
	}),
	getQueryFromFilter: (loanSearchState) => ({
		...(loanSearchState.partnerDefaultRate && {
			defaultRate: getMinMaxRangeQueryParam(loanSearchState.partnerDefaultRate),
		}),
	}),
};
