/**
 * Returns an alphabetical comparison function to be used by Array.prototype.sort(). Sorting can be done on both
 * objects and strings.
 *
 * @param key The key to use for object sorting
 * @returns The comparison function
 */
export function abc(key) {
	return (a, b) => {
		if (typeof a === 'object' && typeof b === 'object' && key) {
			return a[key].localeCompare(b[key]);
		} if (typeof a === 'string' && typeof b === 'string') {
			return a.localeCompare(b);
		}
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
export function startsWith(query, key) {
	const q = query.toLowerCase();
	return (a, b) => {
		const isAObject = typeof a === 'object';
		const isBObject = typeof b === 'object';
		if ((isAObject || isBObject) && !key) return 0;
		const as = (isAObject && key ? a[key] : a).toLowerCase();
		const bs = (isBObject && key ? b[key] : b).toLowerCase();
		const ai = as.indexOf(q);
		const bi = bs.indexOf(q);
		if (ai === 0) return bi === 0 ? abc()(as, bs) : -1;
		return bi === 0 ? 1 : abc()(as, bs);
	};
}
