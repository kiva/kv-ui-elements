import { STANDARD_QUERY_TYPE, FLSS_QUERY_TYPE, sortByNameToDisplay } from './filterOptionUtils';

/**
 * Map used to convert lend <> FLSS sort option values
 */
const lendToFlssSort = new Map([
	['expiringSoon', 'expiringSoon'],
	['popularity', 'popularityScore'],
	['personalized', 'personalized'],
	['loanAmountDesc', 'amountHighToLow'],
	['loanAmount', 'amountLowToHigh'],
	['amountLeft', 'amountLeft'],
	['repaymentTerm', 'repaymentTerm'],
]);

export const visibleFLSSSortOptions = [
	'expiringSoon',
	'amountHighToLow',
	'amountLowToHigh',
	'amountLeft',
	'popularityScore',
	'repaymentTerm',
	'personalized',
];

/**
 * Categorizes Sort Options
 *
 * @param standardSorts Sort options from the lend API
 * @param flssSorts Sort options from the FLSS API
 * @returns New formatted array
 */
export const formatSortOptions = (standardSorts?, flssSorts?) => {
	const labeledStandardSorts = standardSorts?.map((sort) => {
		return {
			name: sort.name,
			sortSrc: STANDARD_QUERY_TYPE,
		};
	}) ?? [];

	const labeledFlssSorts = flssSorts?.reduce((prev, current) => {
		if (visibleFLSSSortOptions.includes(current.name)) {
			prev.push({ name: current.name, sortSrc: FLSS_QUERY_TYPE });
		}

		return prev;
	}, []) ?? [];

	// Personalized/recommended sort should go at the bottom of the options list to align with help text
	const personalized = labeledFlssSorts.splice(labeledFlssSorts.findIndex((s) => s.name === 'personalized'), 1);

	return [...labeledStandardSorts, ...labeledFlssSorts, ...personalized];
};

export const facetsKey = 'sortOptions';

export const stateKey = 'sortBy';

export const getUiConfig = (options) => ({
	type: undefined,
	hasAccordion: true,
	topLine: true,
	bottomLine: false,
	title: 'Sort order',
	shouldDisplayTitle: true,
	itemHeaderKey: undefined,
	placeholder: undefined,
	facetsKey,
	stateKey,
	eventAction: undefined,
	allOptionsTitle: undefined,
	valueMap: undefined,
	isPercentage: false,
	displayedUnit: undefined,
	...options,
});

export default {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	getOptions: (allFacets: any = {}) => {
		const options = formatSortOptions(allFacets.standardSorts ?? [], allFacets.flssSorts ?? []);

		return options.filter((sortOption) => {
			return sortOption.sortSrc === FLSS_QUERY_TYPE;
		}).map((option) => {
			return {
				...option,
				label: sortByNameToDisplay[option.name],
			};
		}) ?? [];
	},
	showSavedSearch: () => false,
	getFilterChips: () => ([]),
	getRemovedFacet: () => ({}),
	getSavedSearch: () => ({}),
	getFlssFilter: () => ({}),
	getValidatedSearchState: (loanSearchState, allFacets, queryType) => {
		const validSorts = queryType === FLSS_QUERY_TYPE ? allFacets?.flssSorts : allFacets?.standardSorts;
		return {
			sortBy: validSorts?.some((s) => s.name === loanSearchState.sortBy) ? loanSearchState.sortBy : null,
		};
	},
	getFilterFromQuery: (query, _allFacets, _pageLimit, queryType) => ({
		sortBy: (queryType === FLSS_QUERY_TYPE ? lendToFlssSort.get(query.sortBy) : query.sortBy) ?? null,
	}),
	getQueryFromFilter: (loanSearchState, queryType) => {
		// The query param uses the standard sort values, so map from FLSS as needed
		const queryParamSortBy = queryType === FLSS_QUERY_TYPE
			// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
			? [...lendToFlssSort].find(([_, value]) => value === loanSearchState.sortBy)?.[0]
			: loanSearchState.sortBy;

		return { ...(queryParamSortBy && { sortBy: queryParamSortBy }) };
	},
};
