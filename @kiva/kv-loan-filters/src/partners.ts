import { getIdsFromQueryParam } from './queryParseUtils';

/**
 * Transforms partners into a form usable by the select box
 *
 * @param partners The partners from the lend API
 * @returns Partners sorted by region and partner name
 */
export const transformPartners = (partners) => {
	const order = [
		'NORTH AMERICA',
		'CENTRAL AMERICA',
		'SOUTH AMERICA',
		'AFRICA',
		'EASTERN EUROPE',
		'MIDDLE EAST',
		'ASIA',
		'OCEANIA',
	];

	const transformed = [];

	partners.forEach(({ id, name, countries }) => {
		const region = countries?.[0]?.region ?? '';

		transformed.push({
			id,
			name,
			region,
		});
	});

	// Sort by region order array, then partner name
	transformed.sort((a, b) => {
		if (a.region !== b.region) {
			const aIndex = order.indexOf(a.region.toUpperCase());
			const bIndex = order.indexOf(b.region.toUpperCase());
			// eslint-disable-next-line no-nested-ternary
			return aIndex < bIndex ? -1 : aIndex > bIndex ? 1 : 0;
		}
		const aName = a.name.toUpperCase();
		const bName = b.name.toUpperCase();
		// eslint-disable-next-line no-nested-ternary
		return aName < bName ? -1 : aName > bName ? 1 : 0;
	});

	return transformed;
};

export const facetsKey = 'partners';

export const stateKey = 'partnerId';

export const getUiConfig = (options) => ({
	type: undefined,
	hasAccordion: false,
	title: 'Partner info',
	shouldDisplayTitle: true,
	itemHeaderKey: 'region',
	placeholder: 'Partner name',
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
	stateKey,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
	getOptions: (allFacets: any = {}, filteredFacets: any = {}) => transformPartners(allFacets?.partnerFacets ?? []),
	showSavedSearch: (loanSearchState) => loanSearchState.partnerId.length > 0,
	getFilterChips: (loanSearchState, allFacets) => {
		if (loanSearchState.partnerId?.length) {
			const partnerFacets = loanSearchState.partnerId
				.map((id) => allFacets.partnerFacets?.find((f) => f.id === id));
			return partnerFacets;
		}
		return [];
	},
	getRemovedFacet: (loanSearchState, facet) => ({
		partnerId: [...loanSearchState.partnerId?.filter((id) => facet.id !== id)],
	}),
	getSavedSearch: (loanSearchState) => ({ partner: loanSearchState?.partnerId }),
	getFlssFilter: (loanSearchState) => ({
		...(loanSearchState?.partnerId?.length && { partnerId: { any: loanSearchState.partnerId } }),
	}),
	getValidatedSearchState: (loanSearchState, allFacets) => ({
		partnerId: loanSearchState?.partnerId?.filter((p) => allFacets?.partnerIds?.includes(p)) ?? [],
	}),
	getFilterFromQuery: (query, allFacets) => ({
		partnerId: getIdsFromQueryParam(query.partner, allFacets?.partnerNames, allFacets?.partnerFacets) ?? [],
	}),
	getQueryFromFilter: (loanSearchState) => ({
		...(loanSearchState.partnerId?.length && { partner: loanSearchState.partnerId.join() }),
	}),
};
