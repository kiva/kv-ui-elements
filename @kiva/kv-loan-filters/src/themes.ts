import orderBy from 'lodash.orderby';
import { getIdsFromQueryParam } from './queryParseUtils';

/**
 * The themes/attributes that are always visible in the filter UI
 */
export const visibleThemeIds = [2, 6, 8, 11, 14, 28, 29, 32, 36];

/**
 * Transforms filtered themes into a form usable by the filters
 *
 * @param filteredThemes The themes from FLSS
 * @param allThemes The themes from lend API
 * @returns Themes with number of loans fundraising
 */
export const transformThemes = (filteredThemes, allThemes = []) => {
	const transformed = [];

	// Always show certain themes regardless of whether there are applicable loans
	visibleThemeIds.forEach((id) => {
		const themeFromLend = allThemes.find((a) => a.id === id);

		if (!themeFromLend) return;

		// Case insensitive matching since lend and FLSS APIs can use different casing for themes
		const themeFromFlss = filteredThemes.find((t) => t.key.toUpperCase() === themeFromLend.name.toUpperCase());

		const theme = { id, name: themeFromLend.name, numLoansFundraising: themeFromFlss?.value ?? 0 };

		transformed.push(theme);
	});

	return orderBy(transformed, 'name');
};

export const facetsKey = 'themes';

export const stateKey = 'themeId';

export const getUiConfig = (options) => ({
	type: undefined,
	hasAccordion: true,
	topLine: false,
	bottomLine: false,
	title: 'Attributes',
	shouldDisplayTitle: true,
	itemHeaderKey: undefined,
	placeholder: undefined,
	facetsKey,
	stateKey,
	eventAction: 'click-theme-filter',
	allOptionsTitle: undefined,
	valueMap: undefined,
	isPercentage: false,
	displayedUnit: undefined,
	...options,
});

export default {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	getOptions: (allFacets: any = {}, filteredFacets: any = {}) => {
		return transformThemes(filteredFacets.themes, allFacets.themeFacets);
	},
	showSavedSearch: (loanSearchState) => loanSearchState.themeId.length > 0,
	getFilterChips: (loanSearchState, allFacets) => {
		if (loanSearchState.themeId?.length) {
			return loanSearchState.themeId.map((id) => {
				return allFacets.themeFacets?.find((facet) => facet.id === id);
			});
		}
		return [];
	},
	getRemovedFacet: (loanSearchState, facet) => ({
		themeId: [...loanSearchState.themeId?.filter((id) => facet.id !== id)],
	}),
	getSavedSearch: (loanSearchState, allFacets) => ({
		theme: loanSearchState?.themeId.map((themeId) => allFacets.themeFacets.find((t) => t.id === themeId).name),
	}),
	getFlssFilter: (loanSearchState) => ({
		...(loanSearchState?.themeId?.length && { themeId: { any: loanSearchState.themeId } }),
	}),
	getValidatedSearchState: (loanSearchState, allFacets) => ({
		themeId: loanSearchState?.themeId?.filter((t) => allFacets?.themeIds?.includes(t)) ?? [],
	}),
	getFilterFromQuery: (query, allFacets) => ({
		themeId: getIdsFromQueryParam(
			query.attribute || query.attributes || query.theme,
			allFacets?.themeNames, allFacets?.themeFacets,
		) ?? [],
	}),
	getQueryFromFilter: (loanSearchState) => ({
		...(loanSearchState.themeId?.length && { attribute: loanSearchState.themeId.join() }),
	}),
};
