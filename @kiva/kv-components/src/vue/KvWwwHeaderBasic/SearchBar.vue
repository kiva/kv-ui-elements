<template>
	<form
		class="tw-relative"
		autocomplete="off"
		@submit.prevent="onSubmit"
	>
		<label
			:for="inputId"
			class="tw-sr-only"
		>Search all loans</label>
		<kv-text-input
			:id="inputId"
			type="search"
			name="queryString"
			data-testid="header-basic-search-input"
			:icon="mdiMagnify"
			:model-value="displayTerm"
			:can-clear="true"
			class="tw-w-full"
			placeholder="Search all loans"
			@input="onInput"
			@focus="onFocus"
			@blur="onBlur"
			@keydown.up.prevent="listUp"
			@keydown.down.prevent="listDown"
			@keydown.enter.prevent="onSubmit"
		/>
		<ol
			v-show="showResults"
			class="
				tw-w-full tw-bg-primary tw-p-2.5
				tw-border tw-border-tertiary
				tw-absolute tw-z-popover tw-inset-x-0
				tw-overflow-auto md:tw-rounded-b
			"
		>
			<li
				v-for="section in groupedResults"
				:key="section.group"
				:data-testid="`header-basic-search-results-${section.group}`"
			>
				<h2 class="tw-text-base tw-py-0.5">
					{{ section.group }}
				</h2>
				<ol>
					<li
						v-for="(suggestion, i) in section.items"
						:key="suggestion.label"
					>
						<button
							type="button"
							class="
								tw-w-full tw-text-left tw-pl-1.5 tw-py-0.5 tw-rounded-xs
								tw-font-medium tw-cursor-pointer
								hover:tw-bg-secondary hover:tw-underline
							"
							:class="{ 'tw-bg-secondary tw-underline': suggestion.label === highlighted?.label }"
							:data-testid="`header-basic-search-result-item-${section.group}-${i}`"
							@mousedown.prevent
							@click="runSearch(suggestion)"
						>
							<!-- eslint-disable-next-line vue/no-v-html -->
							<span v-html="formatResult(suggestion)"></span>
						</button>
					</li>
				</ol>
			</li>
		</ol>
	</form>
</template>

<script lang="ts">
import {
	ref, computed, toRef, inject,
} from 'vue';
import { mdiMagnify } from '@mdi/js';
import KvTextInput from '#components/KvTextInput.vue';
import markMatches from '#utils/markMatches';
import type { SearchSuggestion } from '#utils/typeaheadSearchEngine';
import { useTypeaheadSearch } from '#utils/useTypeaheadSearch';

interface TrackEvent {
	// eslint-disable-next-line no-unused-vars
	(category: string, action: string, label?: string, value?: number): void;
}

export default {
	name: 'SearchBar',
	components: { KvTextInput },
	props: {
		searchSuggestions: {
			type: Array as () => SearchSuggestion[],
			default: () => [],
		},
		appOrigin: {
			type: String,
			default: '',
		},
		isMobile: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['load-search-data', 'search-submit'],
	setup(props, { emit }) {
		const $kvTrackEvent = inject<TrackEvent>('$kvTrackEvent', () => {});
		const inputId = 'kv-www-header-basic-search';
		const hasFocus = ref(false);
		const hasRequested = ref(false);

		const {
			term, groupedResults, activeIndex, resolveSubmit,
		} = useTypeaheadSearch(toRef(props, 'searchSuggestions'), props.appOrigin);

		// Flattened list across all groups, used for keyboard navigation and highlighting.
		const flatItems = computed(() => groupedResults.value.flatMap((g) => g.items));
		const highlighted = computed(() => (activeIndex.value > -1 ? flatItems.value[activeIndex.value] : undefined));
		const displayTerm = computed(() => highlighted.value?.label ?? term.value);
		const showResults = computed(() => groupedResults.value.length > 0 && hasFocus.value);

		function onInput(value: string): void {
			term.value = value;
		}

		function onFocus(): void {
			hasFocus.value = true;
			// Ask the host to fetch the suggestion dataset on the first focus only.
			if (!hasRequested.value) {
				emit('load-search-data');
				hasRequested.value = true;
			}
			$kvTrackEvent('search', 'focus');
		}

		function onBlur(): void {
			hasFocus.value = false;
			activeIndex.value = -1;
		}

		function submit(selection: SearchSuggestion | string): void {
			const payload = resolveSubmit(selection);
			$kvTrackEvent('search', 'click', payload.suggestion ? 'type-ahead-search' : 'custom-search-option');
			emit('search-submit', payload);
		}

		function runSearch(suggestion: SearchSuggestion): void {
			submit(suggestion);
		}

		function onSubmit(): void {
			if (highlighted.value) {
				submit(highlighted.value);
			} else {
				submit(term.value);
			}
		}

		function listDown(): void {
			activeIndex.value += 1;
			if (activeIndex.value >= flatItems.value.length) {
				activeIndex.value = -1;
			}
		}

		function listUp(): void {
			if (activeIndex.value === -1) {
				activeIndex.value = flatItems.value.length;
			}
			activeIndex.value -= 1;
		}

		function formatResult(suggestion: SearchSuggestion): string {
			return markMatches(suggestion.label, suggestion.matches);
		}

		return {
			mdiMagnify,
			inputId,
			term,
			displayTerm,
			groupedResults,
			highlighted,
			showResults,
			onInput,
			onFocus,
			onBlur,
			onSubmit,
			runSearch,
			listUp,
			listDown,
			formatResult,
		};
	},
};
</script>
