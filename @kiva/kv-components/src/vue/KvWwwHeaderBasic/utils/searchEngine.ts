import Fuse, { type IFuseOptions } from 'fuse.js';
import { startsWith } from '#utils/comparators';

export interface SearchSuggestion {
	group: string;
	label: string;
	query?: string;
	url?: string;
	keywords?: string[];
	// Populated on search results: flattened Fuse match index pairs, used by markMatches for highlighting.
	matches?: Array<[number, number]>;
}

const FUSE_OPTIONS: IFuseOptions<SearchSuggestion> = {
	threshold: 0.25,
	distance: 100000,
	includeMatches: true,
	keys: ['label', 'keywords'],
};

/**
 * Lightweight Fuse.js wrapper for the header search bar. Ported from the app `util/searchEngine.ts`.
 * Results that start with the query are ranked first (via the `startsWith` comparator).
 */
export default class SearchEngine {
	private fuse: Fuse<SearchSuggestion> | null = null;

	constructor(data: SearchSuggestion[] = []) {
		if (data.length) {
			this.reset(data);
		}
	}

	reset(data: SearchSuggestion[] = []): void {
		this.fuse = new Fuse(data, FUSE_OPTIONS);
	}

	async search(query: string): Promise<SearchSuggestion[]> {
		if (!this.fuse || !query) {
			return [];
		}
		const results = this.fuse.search(query)
			// Keep only results with actual matches, then flatten match indices onto the item.
			.filter((result) => result.matches?.length)
			.map(({ item, matches }) => ({
				...item,
				matches: matches?.flatMap((m) => m.indices) as Array<[number, number]>,
			}));
		return results.sort(startsWith<SearchSuggestion>(query, 'label'));
	}
}
