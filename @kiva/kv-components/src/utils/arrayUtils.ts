/**
 * Groups an array of objects by a specified key.
 * @param array - The array of objects to be grouped.
 * @param groupByKey - The key based on which the grouping should be done.
 * @returns - An object where keys are unique values of the specified key,
 * and values are arrays of objects that share the same key value.
 */

const groupBy = <T extends Record<string, any>>(array: T[], groupByKey: keyof T): Record<string, T[]> => {
	return array.reduce((groups, currentItem) => {
		const keyValue = String(currentItem[groupByKey]);
		if (!groups[keyValue]) {
			// eslint-disable-next-line no-param-reassign
			groups[keyValue] = [];
		}
		groups[keyValue].push(currentItem);
		return groups;
	}, {} as Record<string, T[]>);
};

/**
 * Returns a comparator function for sorting an array of objects by a specified key.
 * @param key - The key based on which the sorting should be done.
 * @returns - A comparator function that can be used with the Array.sort() method.
 */
const sortBy = <T extends Record<string, any>>(key: keyof T) => {
	// eslint-disable-next-line no-nested-ternary
	return (a: T, b: T): number => ((a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0));
};

export { groupBy, sortBy };
