import { computed, ref, watch } from 'vue-demi';
import { gql } from '@apollo/client/core';
import { useEventListener } from './event';
import markMatches from './markMatches';
import { hasExcludedQueryParams } from './loanSearch/queryParamUtils';
import SearchEngine from './searchEngine';

// instances
const instances = {};

// Display order for search result sections
const sectionOrder = [
	'Gender',
	'Regions',
	'Countries and Territories',
	'United States',
	'U.S. cities',
	'Sectors',
	'Group or Individual',
	'Attributes',
	'User tags',
	'Partners',
	'Gifts',
];

function makeInstance()	{
	// element refs
	const searchInput = ref(null);

	// reactive data
	const term = ref('');
	const displayTerm = ref('');
	const listIndex = ref(-1);
	const rawSuggestions = ref([]);

	const engine = new SearchEngine();

	const suggestionSections = computed(() => {
		// Group the results by their group name
		const resultGroups = rawSuggestions.value.reduce((groups, result) => {
			const { group } = result;
			if (!groups[group]) {
				// eslint-disable-next-line no-param-reassign
				groups[group] = [];
			}
			groups[group].push(result);
			return groups;
		}, {});

		// From the groups, build the sections of suggestions to display
		return Object.keys(resultGroups)
			// Construct the section, using the group name and sorted results
			.map((name) => {
				const suggestions = resultGroups[name]
					// Limit the displayed results to the first 5
					.slice(0, 5)
					// Mark the matches in each result
					.map((result) => ({
						...result,
						html: markMatches(result.label, result.matches),
					}));
				return { name, suggestions };
			})
			// Sort the sections by the display order defined above
			.sort((a, b) => {
				const aIndex = sectionOrder.indexOf(a.name);
				const bIndex = sectionOrder.indexOf(b.name);
				if (aIndex === -1 && bIndex === -1) {
					return a.name.localeCompare(b.name);
				}
				if (aIndex === -1) {
					return 1;
				}
				if (bIndex === -1) {
					return -1;
				}
				return aIndex - bIndex;
			});
	});

	// Total number of suggestions across all sections
	const totalSuggestions = computed(() => {
		return suggestionSections.value.reduce((total, section) => total + section.suggestions.length, 0);
	});

	const getSuggestions = (apollo) => {
		apollo.query({
			query: gql`
				query LoanSearchSuggestions {
					lend {
						loanSearchSuggestions {
							group
							label
							query
						}
					}
				}
			`,
		}).then(({ data }) => {
			if (data && data.lend) {
				engine.reset([
					...data.lend.loanSearchSuggestions,
					{
						group: 'Gifts',
						label: 'Kiva Cards',
						keywords: ['gift card', 'kiva card', 'gift', 'gift certificate'],
						url: 'https://www.kiva.org/gifts/kiva-cards',
					},
					{
						group: 'Gifts',
						label: 'Kiva Store',
						keywords: ['gift card', 'kiva card', 'gift', 'gift certificate'],
						url: 'https://store.kiva.org',
					},
				]);
			}
		});
	};

	// The suggestion that is currently highlighted in the list
	const highlightedSuggestion = computed(() => {
		if (listIndex.value === -1) {
			return {};
		}
		let index = listIndex.value;
		let sectionIndex = 0;
		while (index >= suggestionSections.value[sectionIndex].suggestions.length) {
			index -= suggestionSections.value[sectionIndex].suggestions.length;
			sectionIndex += 1;
		}
		return suggestionSections.value[sectionIndex].suggestions[index];
	});

	// Watch for changes to highlightedSuggestion and update the display term
	watch(highlightedSuggestion, (suggestion) => {
		displayTerm.value = suggestion?.label ?? term.value;
	});

	// search input event listeners
	useEventListener(searchInput, 'input', (event) => {
		// Don't do anything if the value hasn't changed
		if (event.target.value === term.value) {
			return;
		}

		// update search term with value from input event
		term.value = event.target.value;

		// Reset the result list index, since the list is about to change
		listIndex.value = -1;

		// Only search if there actually is a term entered
		if (term.value.length > 0) {
			engine.search(term.value).then((results) => {
				rawSuggestions.value = results;
			});
		} else {
			// No search term entered, so reset the result list
			rawSuggestions.value = [];
		}
	});
	useEventListener(searchInput, 'keydown', (event) => {
		if (event.key === 'ArrowUp') {
			event.preventDefault();
			// Jump to the end to the list if nothing was highlighted previously.
			if (listIndex.value === -1) {
				listIndex.value = totalSuggestions.value;
			}
			// Highlight the previous item up in the result list.
			listIndex.value -= 1;
		} else if (event.key === 'ArrowDown') {
			event.preventDefault();
			// Highlight the next item down in the result list.
			listIndex.value += 1;
			// Loop back to nothing (-1) if there are no items left in the list.
			if (listIndex.value === totalSuggestions.value) {
				listIndex.value = -1;
			}
		}
	});
	useEventListener(searchInput, 'blur', () => {
		// Reset the result list index when the input loses focus.
		listIndex.value = -1;
	});

	const runSearch = (suggestion) => {
		const isSuggestionObject = typeof suggestion === 'object';

		if (isSuggestionObject && suggestion.url) {
			window.location.href = suggestion.url;
		} else {
			let query;

			if (isSuggestionObject && suggestion.query) {
				const [key, value] = suggestion.query.split('=');
				query = { [key]: value };
			} else {
				query = { queryString: suggestion };
			}

			// Fallback to legacy filter if there's an unsupported query param
			let filterUrl = '/lend/filter';
			if (hasExcludedQueryParams(query)) {
				filterUrl = '/lend';
			}

			const params = new URLSearchParams(query).toString();
			window.location.href = `${window.location.origin}${filterUrl}?${params}`;
		}
	};

	return {
		searchInput,
		displayTerm,
		suggestionSections,
		highlightedSuggestion,
		getSuggestions,
		runSearch,
	};
}

export function useSiteSearch(instance = 'default') {
	if (!instances[instance]) {
		instances[instance] = makeInstance();
	}
	return instances[instance];
}
