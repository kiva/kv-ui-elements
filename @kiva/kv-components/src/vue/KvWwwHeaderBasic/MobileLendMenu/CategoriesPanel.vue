<template>
	<ul class="tw-font-medium">
		<template v-if="isChannelsLoading">
			<li
				v-for="i in 12"
				:key="i"
				class="tw-py-1"
			>
				<kv-loading-placeholder style="height: 1rem; width: 11rem;" />
			</li>
		</template>
		<template v-else>
			<li
				v-for="(category, index) in categories"
				:key="category.url"
			>
				<a
					v-kv-track-event="['TopNav', 'click-Lend-Category', category.name, index + 1]"
					:href="category.url"
					class="lend-link"
				>
					{{ category.name }}
				</a>
			</li>
		</template>
		<li class="tw-border-t tw-border-tertiary tw-mt-1">
			<a
				v-kv-track-event="['TopNav','click-Lend-Recommended-by-lenders']"
				href="/lend-by-category/recommended-by-lenders"
				class="lend-link tw-text-brand"
			>
				Recommended by lenders
			</a>
		</li>
		<li>
			<a
				v-kv-track-event="['TopNav','click-Lend-All_Loans']"
				href="/lend"
				class="lend-link"
			>
				All loans
			</a>
		</li>
		<li>
			<a
				v-kv-track-event="['TopNav','click-Lend-All_Categories']"
				href="/categories"
				class="lend-link"
			>
				All categories
			</a>
		</li>
	</ul>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import KvLoadingPlaceholder from '#components/KvLoadingPlaceholder.vue';

export interface Category {
	name: string;
	url: string;
}

export default {
	name: 'CategoriesPanel',
	components: { KvLoadingPlaceholder },
	props: {
		categories: {
			type: Array as PropType<Category[]>,
			default: () => [],
		},
		isChannelsLoading: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<style lang="postcss" scoped>
.lend-link {
	@apply tw-text-primary hover:tw-text-action tw-block tw-w-full tw-py-1 tw-no-underline hover:tw-underline;
}
</style>
