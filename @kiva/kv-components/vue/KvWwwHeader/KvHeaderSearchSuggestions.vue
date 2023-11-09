<template>
	<ol>
		<li
			v-for="section in suggestionSections"
			:key="section.name"
		>
			<h2>{{ section.name }}</h2>
			<ol>
				<li
					v-for="suggestion in section.suggestions"
					:key="suggestion.label"
					data-testid="header-search-result-item"
					class=""
					:class="{
						'todo': highlightedSuggestion === suggestion,
					}"
				>
					<!-- eslint-disable-next-line vue/no-v-html -->
					<span v-html="suggestion.html"></span>
				</li>
			</ol>
		</li>
	</ol>
</template>

<script>
import { useSiteSearch } from '../../utils/siteSearch';

export default {
	setup() {
		const {
			suggestionSections,
			highlightedSuggestion,
		} = useSiteSearch();

		return {
			suggestionSections,
			highlightedSuggestion,
		};
	},
};
</script>
