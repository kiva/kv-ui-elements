/**
 * Returns an alphabetical comparison function to be used by Array.prototype.sort(). Sorting can be done on both
 * objects and strings.
 *
 * @param key The key to use for object sorting
 * @returns The comparison function
 */
export function abc<T extends Record<string, any>>(key?: keyof T) {
	return (a: T | string, b: T | string): number => {
		if (typeof a === 'object' && typeof b === 'object' && key) {
			return String(a[key]).localeCompare(String(b[key]));
		}
		if (typeof a === 'string' && typeof b === 'string') {
			return a.localeCompare(b);
		}
		return 0;
	};
}

/**
 * Returns a comparison function to be used by Array.prototype.sort(). The comparison function will
 * report elements that start with the given query to come first, and otherwise compares elements
 * alphabetically.
 *
 * @param query The query to check
 * @param key Compare property 'key' of elements rather than the elements themselves
 * @returns The comparison function
 */
export function startsWith<T extends Record<string, any>>(query: string, key?: keyof T) {
	const q = query.toLowerCase();
	return (a: T | string, b: T | string): number => {
		const isAObject = typeof a === 'object';
		const isBObject = typeof b === 'object';
		if ((isAObject || isBObject) && !key) return 0;
		const as = (isAObject && key ? String(a[key]) : String(a)).toLowerCase();
		const bs = (isBObject && key ? String(b[key]) : String(b)).toLowerCase();
		const ai = as.indexOf(q);
		const bi = bs.indexOf(q);
		if (ai === 0) return bi === 0 ? abc<T>(key)(as, bs) : -1;
		return bi === 0 ? 1 : abc<T>(key)(as, bs);
	};
}

/**
 * Returns a comparison function to be used by Array.prototype.sort(). The comparison function will
 * sort elements to match their relative position in the given list.
 *
 * const list = ['a', 'b', 'c', 'd'];
 * const arrayToSort = ['d', 'a'];
 * arrayToSort.sort(indexIn(list)); // will return ['a','d']
 *
 * @param {array} list
 * @param {string} [key] - compare property 'key' of elements rather than the elements themselves
 * @returns {function}
 */
export function indexIn(list, key) {
	if (!Array.isArray(list)) {
		throw new TypeError('list must be an array');
	}
	return (a, b) => {
		const as = key ? a[key] : a;
		const bs = key ? b[key] : b;
		return list.indexOf(as) < list.indexOf(bs) ? -1 : 1;
	};
}
