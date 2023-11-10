<template>
	<div
		v-show="suggestionSections.length"
		class="
			search-results
			tw-absolute
			tw-bg-primary
			tw-border
			tw-border-tertiary
			tw-p-2.5
			tw-w-full
			tw-z-popover
		"
	>
		<ol
			:style="{
				'max-width': '600px',
			}"
			class="tw-mx-auto"
		>
			<li
				v-for="section in suggestionSections"
				:key="section.name"
				:data-testid="`header-search-results-${section.name}`"
			>
				<h2 class="tw-text-base tw-py-0.5">
					{{ section.name }}
				</h2>
				<ol>
					<li
						v-for="suggestion in section.suggestions"
						:key="suggestion.label"
						data-testid="header-search-result-item"
						class="
							tw-pl-1.5 tw-py-0.5 tw-rounded-sm
							tw-font-medium tw-cursor-pointer
							hover:tw-bg-tertiary hover:tw-underline
						"
						:class="{
							'tw-bg-tertiary tw-underline': highlightedSuggestion === suggestion,
						}"
						@mousedown.prevent
						@click="runSearch(suggestion)"
					>
						<!-- eslint-disable-next-line vue/no-v-html -->
						<span v-html="suggestion.html"></span>
					</li>
				</ol>
			</li>
		</ol>
	</div>
</template>

<script>
import { useSiteSearch } from '../../utils/siteSearch';

export default {
	setup() {
		const {
			suggestionSections,
			highlightedSuggestion,
			runSearch,
		} = useSiteSearch();

		return {
			suggestionSections,
			highlightedSuggestion,
			runSearch,
		};
	},
};
</script>

<style lang="postcss" scoped>
.search-results {
  top: 3.75rem;
}
</style>
