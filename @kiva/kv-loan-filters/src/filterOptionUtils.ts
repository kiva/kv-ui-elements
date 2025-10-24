import orderBy from 'lodash.orderby';
import { sortRegions } from './countryUtils';

/**
 * FLSS API query type
 */
export const FLSS_QUERY_TYPE = 'flss';

/**
 * Standard/lend API query type
 */
export const STANDARD_QUERY_TYPE = 'standard';

/**
 * Object for the different types of filter components
 */
export const filterUiType = {
	radioGroup: 'radioGroup',
	keyword: 'keyword',
	sortBy: 'sortBy',
	location: 'location',
	checkboxList: 'checkboxList',
	partner: 'partner',
	rangeSlider: 'rangeSlider',
	dropdown: 'dropdown',
};

/**
 * Used to map the sort value to display value
 */
export const sortByNameToDisplay = {
	// Shared
	expiringSoon: 'Ending soon',
	amountLeft: 'Almost funded',
	repaymentTerm: 'Loan length',
	// Standard (lend)
	loanAmount: 'Amount: Low to High',
	loanAmountDesc: 'Amount: High to Low',
	newest: 'Most recent',
	popularity: 'Trending now',
	random: 'Random',
	// FLSS specific
	amountHighToLow: 'Amount: High to Low',
	amountLowToHigh: 'Amount: Low to High',
	personalized: 'Recommended',
	popularityScore: 'Trending now',
	mostRecent: 'Most recent',
};

/**
 * Prepares the options to be used by a radio group
 *
 * @param options The options to transform
 * @param order The order of the options (name property)
 * @param displayMap The map for name to display title
 * @param valueMap The map for name to value
 * @returns The transformed radio group options
 */
export const transformRadioGroupOptions = (options, order, displayMap, valueMap = {}) => {
	const capitalizedOrder = order?.map((o) => o.toUpperCase());

	const transformed = options?.filter((o) => capitalizedOrder?.includes(o.name.toUpperCase()))?.map((o) => {
		const key = o.name.toUpperCase();

		return {
			name: o.name,
			title: displayMap?.[key] ?? o,
			value: valueMap[key] ?? o.name,
		};
	}).sort((a, b) => {
		return capitalizedOrder?.indexOf(a.name.toUpperCase()) - capitalizedOrder?.indexOf(b.name.toUpperCase());
	});

	return transformed ?? [];
};

/**
 * Gets the filter key based on the value
 * @param value The filter value
 * @param valueMap The filter key to value map
 * @returns The key of the filter
 */
export const getFilterKeyFromValue = (value, valueMap) => {
	const isMinMax = typeof value === 'object'
		&& typeof value?.min !== 'undefined'
		&& typeof value?.max !== 'undefined';

	return Object.keys(valueMap).find((k) => {
		const mapValue = valueMap[k];

		if (isMinMax) {
			return mapValue.min === value.min && mapValue.max === value.max;
		}

		return mapValue === value;
	});
};

/**
 * Gets an updated items list to display in the filter with updated numLoansFundraising. Expected items and next format:
 * [{
 *   id: 1,
 *   name: '',
 *   numLoansFundraising: 1,
 * }]
 *
 * @param items The items previously displayed in the filter
 * @param next The items returned by the FLSS facets query
 * @returns The updated items list
 */
export const getUpdatedNumLoansFundraising = (items, next) => {
	const updated = [];

	// Get updated numLoansFundraising
	items?.forEach((item) => {
		const nextItem = next.find((a) => a.id === item.id);

		// Some facets don't have loan counts in FLSS
		const hasNumLoans = typeof item.numLoansFundraising !== 'undefined';

		const updatedItem = {
			...item,
			numLoansFundraising: hasNumLoans ? nextItem?.numLoansFundraising || 0 : undefined,
		};

		updated.push(updatedItem);
	});

	// Add missing items that have been added since previous query
	next?.forEach((item) => {
		if (!updated.find((a) => a.id === item.id)) {
			updated.push({ ...item });
		}
	});

	return orderBy(updated, 'name');
};

/**
 * Gets an updated regions list to display in the filter with updated numLoansFundraising
 *
 * @param regions The regions previously displayed in the filter
 * @param nextRegions The regions returned by the latest FLSS facets query
 * @returns The updated regions list
 */
export const getUpdatedRegionsNumLoansFundraising = (regions, nextRegions) => {
	// Default to nextRegions
	if (!regions) return nextRegions;

	const updated = [];

	// Get updated numLoansFundraising
	regions.forEach((region) => {
		const nextRegion = nextRegions.find((r) => r.region === region.region);
		const nextRegionExists = !!nextRegion;
		const updatedRegion = {
			region: region.region,
			numLoansFundraising: nextRegionExists ? nextRegion.numLoansFundraising : 0,
			countries: [],
		};

		updated.push(updatedRegion);

		region.countries.forEach((country) => {
			const updatedCountry = { ...country };

			if (!nextRegionExists) {
				updatedCountry.numLoansFundraising = 0;
			} else {
				const nextCountry = nextRegion.countries.find((c) => c.name === updatedCountry.name);
				updatedCountry.numLoansFundraising = nextCountry?.numLoansFundraising || 0;
			}

			updatedRegion.countries.push(updatedCountry);
		});
	});

	// Add missing regions that have been added since previous query
	nextRegions.forEach((region) => {
		let updatedRegion = updated.find((r) => r.region === region.region);

		if (!updatedRegion) {
			updatedRegion = {
				region: region.region,
				numLoansFundraising: region.numLoansFundraising,
				countries: [],
			};
			updated.push(updatedRegion);
		}

		region.countries.forEach((country) => {
			if (!updatedRegion.countries.find((c) => c.name === country.name)) {
				updatedRegion.countries.push({ ...country });
			}
		});
	});

	return sortRegions(updated);
};

/**
 * Returns the item label with fundraising amount in parens
 *
 * @param item The item for generating the label
 * @returns The item label
 */
export const getCheckboxLabel = (item) => {
	const countLabel = typeof item.numLoansFundraising !== 'undefined' ? ` (${item.numLoansFundraising})` : '';

	return `${item.name || item.region}${countLabel}`;
};

/**
 * Gets the adjusted number ready for display
 *
 * @param value The value of the number
 * @param isPercentage Whether the number is a decimal-representation of a percentage
 * @param unit The unit to display after the number
 * @param step The step associated with selecting the number
 * @returns The number to be used for display
 */
export const getDisplayedNumber = (value, isPercentage = false, unit: string = undefined, step: number = undefined) => {
	const stepWithFallback = step ?? 1;

	// Get visual step based on whether the number is a decimal percentage
	const precision = isPercentage ? stepWithFallback * 100 : stepWithFallback;

	// Use string splitting to count decimals
	const numberOfDecimals = Math.floor(precision) === precision ? 0 : precision.toString().split('.')[1].length || 0;

	// Adjust for decimal percentage
	let adjustedValue = isPercentage ? value * 100 : value;

	if (step) {
		// Set fixed decimals if the number isn't a whole number
		adjustedValue = Math.floor(adjustedValue) !== adjustedValue
			? adjustedValue.toFixed(numberOfDecimals)
			: adjustedValue;
	}

	// Return with displayed unit
	return `${adjustedValue}${unit ?? ''}`;
};
