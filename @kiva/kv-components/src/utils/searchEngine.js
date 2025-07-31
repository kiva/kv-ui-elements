// eslint-disable-next-line import/no-extraneous-dependencies
import Fuse from 'fuse.js';
import { startsWith } from './comparators';

/*
 * Simple wrapper class around Fuse. Used in the header search bar.
 */
export default class SearchEngine {
	constructor(data = []) {
		this.ready = new Promise((resolve) => {
			this.resolveReady = resolve;
		});

		if (data.length) {
			this.init(data);
		}
	}

	/**
   * Resets the engine with the provided data
   *
   * @param data The data to reset with
   */
	reset(data) {
		if (this.fuse) {
			this.fuse.setCollection(data);
		} else {
			this.init(data);
		}
	}

	/**
   * Initializes the engine with the provided data
   *
   * @param data The data to use
   */
	init(data) {
		this.fuse = new Fuse(data, {
			threshold: 0.25,
			distance: 100000,
			includeMatches: true,
			keys: ['label', 'keywords'],
		});
		this.resolveReady?.();
	}

	/**
   * Searches using Fuze
   *
   * @param query The query to search
   * @returns Matching results with results that start with query sorted first
   */
	search(query) {
		return this.ready.then(() => {
			return new Promise((resolve) => {
				const results = this.fuse?.search(query);

				// Filter out results that don't have any matches
				const filtered = results?.filter((result) => result.matches?.length);

				// Flatten the results back to the original item + simple array of matches
				const flattened = filtered?.map(({ item, matches }) => {
					return {
						...item,
						matches: matches?.map((m) => m.indices)?.flat(),
					};
				});

				// Sort the results alphabetically, putting results start with the query first
				resolve(flattened?.sort(startsWith(query, 'label')) ?? []);
			});
		});
	}
}
