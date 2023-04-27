import { transformIsoCodes } from './countryUtils';

/**
 * Returns the country ISO codes based on the query param. Handles FLSS/legacy and Algolia formats.
 *
 * @param param The query param
 * @param allFacets All available facets from the APIs
 * @returns Valid country ISO codes based on the query param
 */
export const getCountryIsoCodesFromQueryParam = (param?, allFacets?) => {
	if (!param) return;

	const decoded = decodeURI(param).toUpperCase();

	// Handles FLSS and legacy query params, such as "do,ht"
	if (decoded.includes(',') || allFacets?.countryIsoCodes?.includes(decoded)) {
		return decoded.split(',').filter((s) => s !== '');
	}

	// Handles Algolia query params, such as "Africa%20>%20Burkina%20Faso~Africa%20>%20Congo%20%28DRC%29"
	return decoded.split('~').reduce((prev, current) => {
		const [region, country] = current.toUpperCase().split('>').map((s) => s.trim());

		if (allFacets?.countryNames?.includes(country)) {
			const facet = allFacets.countryFacets.find(({ country: c }) => (
				c.region.toUpperCase() === region && c.name.toUpperCase() === country
			));

			if (facet) {
				prev.push(facet.country.isoCode);
			}
		}
		return prev;
	}, []);
};

export const facetsKey = 'regions';

export const stateKey = 'countryIsoCode';

export const getUiConfig = (options) => ({
	type: undefined,
	hasAccordion: true,
	topLine: false,
	bottomLine: false,
	title: 'Location',
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
	getOptions: (allFacets: any = {}, filteredFacets: any = {}) => {
		return transformIsoCodes(filteredFacets.isoCodes, allFacets.countryFacets);
	},
	showSavedSearch: (loanSearchState) => loanSearchState.countryIsoCode.length > 0,
	getFilterChips: (loanSearchState, allFacets) => {
		if (loanSearchState.countryIsoCode?.length) {
			return loanSearchState.countryIsoCode.map((iso) => {
				return allFacets.countryFacets?.find((facet) => {
					return facet.country.isoCode === iso;
				})?.country;
			});
		}
		return [];
	},
	getRemovedFacet: (loanSearchState, facet) => ({
		countryIsoCode: [...loanSearchState.countryIsoCode?.filter((iso) => {
			return facet.isoCode !== iso;
		})],
	}),
	getSavedSearch: (loanSearchState) => ({ country: loanSearchState?.countryIsoCode }),
	getFlssFilter: (loanSearchState) => ({
		...(loanSearchState?.countryIsoCode?.length && { countryIsoCode: { any: loanSearchState.countryIsoCode } }),
	}),
	getValidatedSearchState: (loanSearchState, allFacets) => ({
		countryIsoCode: loanSearchState?.countryIsoCode
			?.filter((c) => allFacets?.countryIsoCodes?.includes(c.toUpperCase())) ?? [],
	}),
	getFilterFromQuery: (query, allFacets) => ({
		countryIsoCode: getCountryIsoCodesFromQueryParam(query.country || query.countries, allFacets) ?? [],
	}),
	getQueryFromFilter: (loanSearchState) => ({
		...(loanSearchState.countryIsoCode?.length && { country: loanSearchState.countryIsoCode.join() }),
	}),
};
