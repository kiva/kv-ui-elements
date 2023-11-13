/* eslint-disable import/prefer-default-export */

/**
 * Check for excluded query params
 *
 * @param query The query to check
 * @returns Whether the query has a param excluded from lend/filter
 */
export function hasExcludedQueryParams(query) {
	// Handle temporary query param exclusions
	const excludedParams = [
		'activity',
		'city_state',
		'loanTags',
		'state',
		'loanLimit',
	];
	// Check route.query for excluded params
	const queryContainsExcludedParams = Object.keys(query).filter((key) => {
		return excludedParams.includes(key);
	});
	return queryContainsExcludedParams.length > 0;
}
