<template>
	<ul class="tw-font-book">
		<li
			v-for="search in searches"
			:key="search.id"
		>
			<a
				class="tw-text-primary hover:tw-text-action tw-block tw-w-full tw-py-1"
				:href="search.url"
			>{{ search.name }}</a>
		</li>
		<li>
			<a
				class="tw-text-primary hover:tw-text-action tw-block tw-w-full tw-py-1"
				href="/lend/saved-search"
			>
				Manage saved searches
			</a>
		</li>
	</ul>
</template>

<script lang="ts">
import type { PropType } from 'vue';

export interface LendMenuSearch {
	id: number;
	name: string;
	url: string;
}

export default {
	props: {
		searches: {
			type: Array as PropType<LendMenuSearch[]>,
			default: () => [],
		},
	},
};
</script>
