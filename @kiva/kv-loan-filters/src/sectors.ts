import orderBy from 'lodash.orderby';
import { getIdsFromQueryParam } from './queryParseUtils';

/**
 * Transforms filtered sectors into a form usable by the filters
 *
 * @param filteredSectors The sector IDs from FLSS
 * @param allSectors The sectors from lend API
 * @returns Sectors with number of loans fundraising
 */
export const transformSectors = (filteredSectors, allSectors = []) => {
	const transformed = [];

	filteredSectors.forEach(({ key: id, value: numLoansFundraising }) => {
		const lookupSector = allSectors.find((s) => s.id === +id);
		if (!lookupSector) return;
		const sector = { id: lookupSector.id, name: lookupSector.name, numLoansFundraising };
		transformed.push(sector);
	});

	return orderBy(transformed, 'name');
};

export const facetsKey = 'sectors';

export const stateKey = 'sectorId';

export const getUiConfig = (options) => ({
	type: undefined,
	hasAccordion: true,
	topLine: false,
	bottomLine: false,
	title: 'Sectors',
	shouldDisplayTitle: true,
	itemHeaderKey: undefined,
	placeholder: undefined,
	facetsKey,
	stateKey,
	eventAction: 'click-sector-filter',
	allOptionsTitle: undefined,
	valueMap: undefined,
	isPercentage: false,
	displayedUnit: undefined,
	...options,
});

export default {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	getOptions: (allFacets: any = {}, filteredFacets: any = {}) => {
		return transformSectors(filteredFacets.sectors, allFacets.sectorFacets);
	},
	showSavedSearch: (loanSearchState) => loanSearchState.sectorId.length > 0,
	getFilterChips: (loanSearchState, allFacets) => {
		if (loanSearchState.sectorId?.length) {
			return loanSearchState.sectorId.map((sectorId) => {
				return allFacets.sectorFacets?.find((facet) => {
					return facet.id === sectorId;
				});
			});
		}
		return [];
	},
	getRemovedFacet: (loanSearchState, facet) => ({
		sectorId: [...loanSearchState.sectorId?.filter((id) => facet.id !== id)],
	}),
	getSavedSearch: (loanSearchState) => ({ sector: loanSearchState?.sectorId }),
	getFlssFilter: (loanSearchState) => ({
		...(loanSearchState?.sectorId?.length && { sectorId: { any: loanSearchState.sectorId } }),
	}),
	getValidatedSearchState: (loanSearchState, allFacets) => ({
		sectorId: loanSearchState?.sectorId?.filter((s) => allFacets?.sectorIds?.includes(s)) ?? [],
	}),
	getFilterFromQuery: (query, allFacets) => ({
		sectorId: getIdsFromQueryParam(query.sector, allFacets?.sectorNames, allFacets?.sectorFacets) ?? [],
	}),
	getQueryFromFilter: (loanSearchState) => ({
		...(loanSearchState.sectorId?.length && { sector: loanSearchState.sectorId.join() }),
	}),
};
