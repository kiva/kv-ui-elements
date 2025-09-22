/**
 * Groups an array of objects by a specified key.
 * @param {Array} array - The array of objects to be grouped.
 * @param {string} groupByKey - The key based on which the grouping should be done.
 * @returns {Object} - An object where keys are unique values of the specified key,
 * and values are arrays of objects that share the same key value.
 */

const groupBy = (array, groupByKey) => {
	return array.reduce((groups, currentItem) => {
		const keyValue = currentItem[groupByKey];
		if (!groups[keyValue]) {
			// eslint-disable-next-line no-param-reassign
			groups[keyValue] = [];
		}
		groups[keyValue].push(currentItem);
		return groups;
	}, {});
};

/**
 * Returns a comparator function for sorting an array of objects by a specified key.
 * @param {string} key - The key based on which the sorting should be done.
 * @returns {Function} - A comparator function that can be used with the Array.sort() method.
 */
const sortBy = (key) => {
	// eslint-disable-next-line no-nested-ternary
	return (a, b) => ((a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0));
};

export { groupBy, sortBy };
