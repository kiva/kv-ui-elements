import {
	ref, watch, computed, type Ref,
} from 'vue';
import SearchEngine, { type SearchSuggestion } from '#utils/typeaheadSearchEngine';
import { SECTION_ORDER, MAX_PER_GROUP, GIFT_SUGGESTIONS } from '#utils/typeaheadSearchConfig';

export interface SubmitPayload {
	url: string;
	query: Record<string, string> | null;
	suggestion: SearchSuggestion | null;
	term: string;
}

export interface ResultGroup {
	group: string;
	items: SearchSuggestion[];
}

// Filter query params not yet supported by /lend/filter; queries using them fall back to the legacy /lend page.
// Ported verbatim from the app util/loanSearch/queryParamUtils.ts (identical in both apps).
const EXCLUDED_FILTER_PARAMS = ['activity', 'city_state', 'loanTags', 'state', 'loanLimit'];

function hasExcludedQueryParams(query: Record<string, string>): boolean {
	return Object.keys(query).some((key) => EXCLUDED_FILTER_PARAMS.includes(key));
}

function lendPath(query: Record<string, string> | null): string {
	return query && hasExcludedQueryParams(query) ? '/lend' : '/lend/filter';
}

export function useHeaderBasicSearch(source: Ref<SearchSuggestion[]>, appOrigin: string) {
	const engine = new SearchEngine();
	const term = ref('');
	const rawResults = ref<SearchSuggestion[]>([]);
	const activeIndex = ref(-1);

	// Rebuild the index whenever the host-provided dataset changes; the Gifts suggestions are always appended.
	watch(source, (next) => {
		engine.reset([...(next ?? []), ...GIFT_SUGGESTIONS]);
	}, { immediate: true });

	watch(term, async (next) => {
		activeIndex.value = -1;
		if (!next) {
			rawResults.value = [];
			return;
		}
		rawResults.value = await engine.search(next);
	});

	// Group results by section, cap each group, and order the sections per SECTION_ORDER.
	const groupedResults = computed<ResultGroup[]>(() => {
		const byGroup = new Map<string, SearchSuggestion[]>();
		rawResults.value.forEach((item) => {
			const list = byGroup.get(item.group) ?? [];
			if (list.length < MAX_PER_GROUP) {
				list.push(item);
			}
			byGroup.set(item.group, list);
		});
		return [...byGroup.keys()]
			.sort((a, b) => SECTION_ORDER.indexOf(a) - SECTION_ORDER.indexOf(b))
			.map((group) => ({ group, items: byGroup.get(group) ?? [] }));
	});

	// Builds the /lend navigation payload for a selected suggestion or free-text term, mirroring the app SearchBar.
	function resolveSubmit(selection: SearchSuggestion | string): SubmitPayload {
		// Free-text submit.
		if (typeof selection === 'string') {
			const query = { queryString: selection };
			return {
				url: `${appOrigin}${lendPath(query)}`,
				query,
				suggestion: null,
				term: selection,
			};
		}
		// Gifts / explicit-url suggestion: navigate to the url directly.
		if (selection.url) {
			return {
				url: selection.url, query: null, suggestion: selection, term: term.value,
			};
		}
		// "key=value" filter-query suggestion.
		const [key, value] = (selection.query ?? '').split('=');
		const query = key ? { [key]: value } : null;
		return {
			url: `${appOrigin}${lendPath(query)}`,
			query,
			suggestion: selection,
			term: term.value,
		};
	}

	return {
		term, rawResults, activeIndex, groupedResults, resolveSubmit,
	};
}
