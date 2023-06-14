import filterUtils from './filterUtils';

/**
 * Check for query params excluded from lend/filter
 *
 * @param query The route query to check
 * @returns Whether the query has excluded query params
 */
export const hasExcludedQueryParams = (query) => {
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
};

/**
 * Converts the query string to loan search state
 *
 * @param query The Vue Router query object (this.$route.query)
 * @param allFacets All available facets from the APIs
 * @param queryType The current query type (lend vs FLSS)
 * @param pageLimit The limit/size of the page
 * @returns The loan search state
 */
export const convertQueryToFilters = (query, allFacets, queryType, pageLimit) => {
	return filterUtils.keys.reduce((prev, key) => {
		return { ...prev, ...filterUtils.filters[key].getFilterFromQuery(query, allFacets, pageLimit, queryType) };
	}, {});
};

/**
 * Pushes a new route to the Vue Router with the updated query string params, which ensures that Vue knows about the
 * route change, and it enables watching the browser navigation via back/forward buttons to update filters
 *
 * @param loanSearchState The current loan search state from Apollo
 * @param currentRoute The current route from the Vue Router
 * @param push The push method from the Vue Router
 * @param queryType The current query type (lend vs FLSS)
 */
export const updateQueryParams = (loanSearchState, currentRoute, push, queryType) => {
	const oldParamKeys = Object.keys(currentRoute.query);

	// Preserve UTM params
	const utmParams = {};
	oldParamKeys.forEach((key) => {
		if (key.includes('utm_')) {
			utmParams[key] = currentRoute.query[key];
		}
	});

	// Create new query params object
	const newParams = {
		...filterUtils.keys.reduce((prev, key) => {
			return { ...prev, ...filterUtils.filters[key].getQueryFromFilter(loanSearchState, queryType) };
		}, {}),
		...utmParams,
	};

	// Params cleared due to needing to remove category from URL
	return push({ ...currentRoute, query: newParams, params: {} });
};
