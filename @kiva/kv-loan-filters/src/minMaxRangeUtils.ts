import { isNumber } from './numberUtils';

/**
 * Creates the min max range object
 *
 * @param min The min of the range
 * @param max The max of the range
 * @returns The new min max range object
 */
export const createMinMaxRange = (min, max) => {
	if (!isNumber(min) || !isNumber(max)) return undefined;

	return { min, max, __typename: 'MinMaxRange' };
};

/**
 * Gets the FLSS filter object from the min max range object
 *
 * @param param0.min The min of the range
 * @param param0.max The max of the range
 * @returns The FLSS filter object
 */
export const getMinMaxRangeFilter = ({ min, max }: { min?: number, max?: number }) => {
	if (!isNumber(min) && !isNumber(max)) return null;

	return {
		...(typeof min !== 'undefined' && { gte: min }),
		...(typeof max !== 'undefined' && { lte: max }),
	};
};

/**
 * Gets the query param string based on the min max range object
 *
 * @param param0.min The min of the range
 * @param param0.max The max of the range
 * @returns The query param string
 */
export const getMinMaxRangeQueryParam = ({ min, max }: { min?: number, max?: number }) => {
	if (!isNumber(min) || !isNumber(max)) return null;

	return [min, max].join();
};
