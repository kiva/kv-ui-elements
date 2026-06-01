<template>
	<!--
		Reuses SearchBar so the Search tab inherits the desktop popover-style results (absolute,
		z-popover, tw-inset-x-0) instead of re-implementing the typeahead UI. SearchBar's form is
		tw-relative, so the popover anchors to the input within this tab panel.
	-->
	<search-bar
		:search-suggestions="searchSuggestions"
		:app-origin="appOrigin"
		is-mobile
		@load-search-data="$emit('load-search-data')"
		@search-submit="$emit('search-submit', $event)"
	/>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import type { SearchSuggestion } from '#utils/typeaheadSearchEngine';
import SearchBar from '../SearchBar.vue';

export default {
	name: 'SearchPanel',
	components: { SearchBar },
	props: {
		searchSuggestions: {
			type: Array as PropType<SearchSuggestion[]>,
			default: () => [],
		},
		appOrigin: {
			type: String,
			default: '',
		},
	},
	emits: ['load-search-data', 'search-submit'],
};
</script>
