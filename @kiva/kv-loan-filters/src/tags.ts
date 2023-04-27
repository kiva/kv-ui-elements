import orderBy from 'lodash.orderby';
import { getIdsFromQueryParam } from './queryParseUtils';

/**
 * Transforms tag names for display
 *
 * @param name The tag name to transform
 * @returns The transformed tag name
 */
export const transformTagName = (name = '') => {
	// Public tags start with a '#' which we don't want to display
	return name[0] === '#' ? name.substring(1) : name;
};

/**
 * Transforms tags into a form usable by the filters
 *
 * @param filteredTags The tag IDs from FLSS
 * @param allTags The tags from lend API
 * @returns Tags usable by the filters
 */
export const transformTags = (filteredTags, allTags = []) => {
	// Public tags have vocabularyId of 2
	const publicTags = allTags.filter((t) => t.vocabularyId === 2);

	const transformed = [];

	filteredTags.forEach(({ key: id, value: numLoansFundraising }) => {
		const lookupTag = publicTags.find((t) => t.id === +id);
		if (!lookupTag) return;
		const tag = { id: lookupTag.id, name: transformTagName(lookupTag.name), numLoansFundraising };
		transformed.push(tag);
	});

	return orderBy(transformed, 'name');
};

export const facetsKey = 'tags';

export const stateKey = 'tagId';

export const getUiConfig = (options) => ({
	type: undefined,
	hasAccordion: true,
	topLine: false,
	bottomLine: false,
	title: 'Tags',
	shouldDisplayTitle: true,
	itemHeaderKey: undefined,
	placeholder: undefined,
	facetsKey,
	stateKey,
	eventAction: 'click-tag-filter',
	allOptionsTitle: undefined,
	valueMap: undefined,
	isPercentage: false,
	displayedUnit: undefined,
	...options,
});

export default {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, max-len
	getOptions: (allFacets: any = {}, filteredFacets: any = {}) => transformTags(filteredFacets.tags, allFacets.tagFacets),
	showSavedSearch: (loanSearchState) => loanSearchState.tagId.length > 0,
	getFilterChips: (loanSearchState, allFacets) => {
		if (loanSearchState.tagId?.length) {
			return loanSearchState.tagId.map((id) => {
				const tagFacet = allFacets.tagFacets?.find((facet) => facet.id === id);

				return {
					...tagFacet,
					name: transformTagName(tagFacet?.name),
				};
			});
		}
		return [];
	},
	getRemovedFacet: (loanSearchState, facet) => ({
		tagId: [...loanSearchState.tagId?.filter((id) => facet.id !== id)],
	}),
	getSavedSearch: (loanSearchState) => ({ loanTags: loanSearchState?.tagId }),
	getFlssFilter: (loanSearchState) => ({
		...(loanSearchState?.tagId?.length && { tagId: { any: loanSearchState.tagId } }),
	}),
	getValidatedSearchState: (loanSearchState, allFacets) => ({
		tagId: loanSearchState?.tagId?.filter((t) => allFacets?.tagIds?.includes(t)) ?? [],
	}),
	getFilterFromQuery: (query, allFacets) => ({
		tagId: getIdsFromQueryParam(query.tag || query.tags, allFacets?.tagNames, allFacets?.tagFacets) ?? [],
	}),
	getQueryFromFilter: (loanSearchState) => ({
		...(loanSearchState.tagId?.length && { tag: loanSearchState.tagId.join() }),
	}),
};
