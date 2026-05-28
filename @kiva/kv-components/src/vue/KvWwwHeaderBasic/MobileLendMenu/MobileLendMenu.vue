<template>
	<div class="tw-px-0 tw-pt-1.5 tw-pb-2">
		<kv-tabs ref="tabsRef">
			<template #tabNav>
				<kv-tab
					v-kv-track-event="['TopNav', 'click-Lend-Tab-Categories']"
					for-panel="mobile-lend-categories"
					selected
				>
					Categories
				</kv-tab>
				<kv-tab
					v-kv-track-event="['TopNav', 'click-Lend-Tab-Regions']"
					for-panel="mobile-lend-regions"
				>
					Regions
				</kv-tab>
				<kv-tab
					v-if="userId"
					v-kv-track-event="['TopNav', 'click-Lend-Tab-My-Kiva']"
					for-panel="mobile-lend-my-kiva"
				>
					MyKiva
				</kv-tab>
				<kv-tab
					v-kv-track-event="['TopNav', 'click-Lend-Tab-Search']"
					for-panel="mobile-lend-search"
				>
					Search
				</kv-tab>
			</template>
			<template #tabPanels>
				<kv-tab-panel id="mobile-lend-categories">
					<categories-panel
						:categories="categories"
						:is-channels-loading="isChannelsLoading"
					/>
				</kv-tab-panel>
				<kv-tab-panel id="mobile-lend-regions">
					<regions-panel
						:regions="regions"
						:is-regions-loading="isRegionsLoading"
					/>
				</kv-tab-panel>
				<kv-tab-panel
					v-if="userId"
					id="mobile-lend-my-kiva"
				>
					<my-kiva-panel
						:user-id="userId"
						:favorites="favorites"
						:searches="searches"
						:countries-not-lent-to-url="countriesNotLentToUrl"
					/>
				</kv-tab-panel>
				<kv-tab-panel id="mobile-lend-search">
					<search-panel
						:search-suggestions="searchSuggestions"
						:app-origin="appOrigin"
						@load-search-data="$emit('load-search-data')"
						@search-submit="$emit('search-submit', $event)"
					/>
				</kv-tab-panel>
			</template>
		</kv-tabs>
	</div>
</template>

<script lang="ts">
import { ref, type PropType } from 'vue';
import KvTab from '#components/KvTab.vue';
import KvTabPanel from '#components/KvTabPanel.vue';
import KvTabs from '#components/KvTabs.vue';
import type { SearchSuggestion } from '#utils/typeaheadSearchEngine';
import type { LendMenuSearch } from '#components/KvWwwHeader/LendMenu/KvLendMenuSearchList.vue';
import CategoriesPanel, { type Category } from './CategoriesPanel.vue';
import RegionsPanel, { type Region } from './RegionsPanel.vue';
import MyKivaPanel from './MyKivaPanel.vue';
import SearchPanel from './SearchPanel.vue';

/**
 * Tabbed mobile presentation of the Lend menu used by KvWwwHeaderBasic. Renders Categories,
 * Regions, MyKiva (logged-in only), and an inline Search tab. Data is supplied by the parent
 * KvLendMenu so the GraphQL loader stays in one place.
 */
export default {
	name: 'MobileLendMenu',
	components: {
		KvTab,
		KvTabPanel,
		KvTabs,
		CategoriesPanel,
		RegionsPanel,
		MyKivaPanel,
		SearchPanel,
	},
	props: {
		categories: {
			type: Array as PropType<Category[]>,
			default: () => [],
		},
		regions: {
			type: Array as PropType<Region[]>,
			default: () => [],
		},
		userId: {
			type: Number,
			default: null,
		},
		favorites: {
			type: Number,
			default: 0,
		},
		searches: {
			type: Array as PropType<LendMenuSearch[]>,
			default: () => [],
		},
		isChannelsLoading: {
			type: Boolean,
			default: false,
		},
		isRegionsLoading: {
			type: Boolean,
			default: false,
		},
		countriesNotLentToUrl: {
			type: String,
			default: '/lend/countries-not-lent',
		},
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
	setup() {
		// Untyped ref keeps the heavy KvTabs internals out of the emitted .d.ts (matches LinkBar's avatarMenu).
		const tabsRef = ref(null);

		// Reset to Categories when the host closes the menu, mirroring KvLendListMenu's onClose.
		function onClose(): void {
			(tabsRef.value as { tabContext?: { setTab?: Function } } | null)
				?.tabContext?.setTab?.(0);
		}

		return { tabsRef, onClose };
	},
};
</script>

<style lang="postcss" scoped>
/*
 * Tighten KvTab labels from its default tw-text-h3 down to the 16px the Figma uses for the mobile
 * lend menu — otherwise Categories/Search overflow horizontally and force the tab strip to scroll.
 */
:deep([role="tab"]) {
	@apply tw-text-title;
}
</style>
