import categories, { stateKey as categoriesStateKey } from './categories';
import filterUtils from './filterUtils';

/**
 * Returns loan search state that has been validated against the available facets
 *
 * @param loanSearchState The current loan search state from Apollo cache
 * @param allFacets All available facets from the APIs
 * @param queryType The current query type (lend vs FLSS)
 * @returns Validated search state, including default enum null values expected by GraphQL
 */
export const getValidatedSearchState = (loanSearchState, allFacets, queryType) => {
	if (loanSearchState[categoriesStateKey]) {
		// eslint-disable-next-line no-param-reassign
		loanSearchState = {
			...loanSearchState,
			...categories.getValidatedSearchState(loanSearchState, allFacets),
		};
	}

	return filterUtils.keys.reduce((prev, key) => {
		return { ...prev, ...filterUtils.filters[key].getValidatedSearchState(loanSearchState, allFacets, queryType) };
	}, {});
};

/**
 * Updates the search state using the provided apollo client and filters
 *
 * @param apollo The Apollo client instance
 * @param mutation The mutation to run to update the search state
 * @param loanQueryFilters The filters for the loan query
 * @param allFacets All available facets from the APIs
 * @param queryType The current query type (lend vs FLSS)
 * @param previousState The previous search state
 * @returns Promise for the results of the mutation
 */
export const updateSearchState = async (
	apollo,
	mutation,
	loanQueryFilters,
	allFacets,
	queryType,
	previousState = {},
) => {
	const validatedPreviousFilters = getValidatedSearchState(previousState, allFacets, queryType);
	const validatedFilters = getValidatedSearchState(loanQueryFilters, allFacets, queryType);

	// Quick JSON compare works because both states are results of getValidatedSearchState
	if (JSON.stringify(validatedPreviousFilters) === JSON.stringify(validatedFilters)) return;

	return apollo.mutate({
		mutation,
		variables: {
			searchParams: {
				...validatedFilters,
			},
		},
	});
};
