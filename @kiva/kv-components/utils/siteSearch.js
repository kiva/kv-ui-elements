import { computed, ref, watch } from 'vue-demi';
import { useEventListener } from './event';
import markMatches from './markMatches';

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
			// TODO: start getting new search suggestions
			// For now, return static results
			rawSuggestions.value = [
				{
					group: 'Partners',
					label: 'Aflore',
					query: 'partner=637',
					matches: [
						[0, 1],
					],
				},
				{
					group: 'Partners',
					label: 'African Clean Energy (ACE)',
					query: 'partner=452',
					matches: [
						[0, 1],
					],
				},
				{
					group: 'Partners',
					label: 'Hand in Hand Eastern Africa',
					query: 'partner=388',
					matches: [
						[1, 1],
						[9, 9],
						[14, 14],
						[21, 22],
					],
				},
				{
					group: 'Partners',
					label: 'Micro Start/AFD',
					query: 'partner=187',
					matches: [
						[8, 8],
						[12, 13],
					],
				},
				{
					group: 'Partners',
					label: 'N/A, direct to All Across Africa',
					query: 'partner=532',
					matches: [
						[2, 2],
						[15, 15],
						[19, 19],
						[26, 27],
					],
				},
				{
					__typename: 'SearchSuggestion',
					group: 'Regions',
					label: 'Africa',
					query: 'country=mz,ug,tz,sn,rw,ke,cd,lr,sl,bf,cm,gh,ng,tg,mg,mw,ml,eg,ls,zm,za,bi,ss,zw,bj,na,ci',
					matches: [
						[0, 1],
					],
				},
				{
					__typename: 'SearchSuggestion',
					group: 'Countries and Territories',
					label: 'South Africa',
					query: 'country=za',
					matches: [
						[6, 7],
					],
				},
				{
					__typename: 'SearchSuggestion',
					group: 'U.S. cities',
					label: 'Barksdale Afb, LA',
					query: 'city_state=Barksdale Afb,LA',
					matches: [
						[1, 1],
						[6, 6],
						[10, 11],
					],
				},
				{
					__typename: 'SearchSuggestion',
					group: 'U.S. cities',
					label: 'Cannon Afb, NM',
					query: 'city_state=Cannon Afb,NM',
					matches: [
						[1, 1],
						[7, 8],
					],
				},
				{
					__typename: 'SearchSuggestion',
					group: 'U.S. cities',
					label: 'Delafield, WI',
					query: 'city_state=Delafield,WI',
					matches: [
						[3, 4],
					],
				},
				{
					__typename: 'SearchSuggestion',
					group: 'U.S. cities',
					label: 'Flagstaff, AZ',
					query: 'city_state=Flagstaff,AZ',
					matches: [
						[0, 0],
						[2, 2],
						[6, 7],
					],
				},
				{
					__typename: 'SearchSuggestion',
					group: 'U.S. cities',
					label: 'Grafton, ND',
					query: 'city_state=Grafton,ND',
					matches: [
						[2, 3],
					],
				},
			];
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

	// TODO: running search when results are selected

	return {
		searchInput,
		displayTerm,
		suggestionSections,
		highlightedSuggestion,
	};
}

export function useSiteSearch(instance = 'default') {
	if (!instances[instance]) {
		instances[instance] = makeInstance();
	}
	return instances[instance];
}
