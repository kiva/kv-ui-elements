<template>
	<div class="tw-pb-2">
		<a
			v-if="showMGUpsellLink"
			v-kv-track-event="['TopNav', 'click-Lend-Menu-Monthly-Good', 'Lend-monthly']"
			href="/monthlygood"
		>
			<span
				class="
					tw-inline-flex tw-items-center
					tw-py-2 tw-mb-2 tw-gap-0.5
					tw-border-b tw-border-tertiary
					tw-font-medium"
			>
				Lend monthly
				<kv-material-icon
					:icon="mdiArrowRight"
					class="tw-w-3 tw-h-3"
				/>
			</span>
		</a>
		<kv-tabs ref="navLendCategories">
			<template #tabNav>
				<kv-tab
					v-kv-track-event="['TopNav', 'click-Lend-Tab-Categories']"
					for-panel="nav-lend-categories"
				>
					Categories
				</kv-tab>
				<kv-tab
					v-kv-track-event="['TopNav', 'click-Lend-Tab-Regions']"
					for-panel="nav-lend-regions"
				>
					Regions
				</kv-tab>
				<kv-tab
					v-if="userId"
					v-kv-track-event="['TopNav', 'click-Lend-Tab-My-Kiva']"
					for-panel="nav-my-kiva"
				>
					My Kiva
				</kv-tab>
			</template>
			<template #tabPanels>
				<kv-tab-panel id="nav-lend-categories">
					<ul
						class="tw-font-medium"
					>
						<template v-if="isChannelsLoading">
							<li
								v-for="i in 14"
								:key="i"
								style="width: 11rem;"
								class="tw-py-1 tw-flex"
							>
								<kv-loading-placeholder
									class="tw-inline-block tw-align-middle"
									style="height: 1rem"
								/>
								<span class="tw-inline-block">&nbsp;</span>
							</li>
						</template>
						<template v-else>
							<li
								v-for="(category, index) in categories"
								:key="index"
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
						<li class="tw-border-t tw-border-tertiary">
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
				</kv-tab-panel>
				<kv-tab-panel id="nav-lend-regions">
					<template v-if="isRegionsLoading">
						<kv-accordion-item
							v-for="i in 8"
							:id="`placeholder-${i}-panel`"
							:key="i"
							:disabled="true"
						>
							<template #header>
								<div class="tw-flex">
									<kv-loading-placeholder
										class="tw-inline-block tw-align-middle"
										style="height: 1rem;"
									/>
									<span class="tw-inline-block tw-text-h4">&nbsp;</span>
								</div>
							</template>
						</kv-accordion-item>
					</template>
					<template v-else>
						<kv-accordion-item
							v-for="region in regions"
							:id="`lend-menu-${paramCase(region.name)}-panel`"
							:key="region.name"
							ref="regionAccordions"
							v-kv-track-event="['TopNav','click-Lend-Region', region.name]"
						>
							<template #header>
								<h3 class="tw-text-h4">
									{{ region.name }}
								</h3>
							</template>
							<kv-lend-menu-country-list :countries="region.countries" />
						</kv-accordion-item>
					</template>
				</kv-tab-panel>
				<kv-tab-panel
					v-if="userId"
					id="nav-my-kiva"
				>
					<ul class="tw-font-medium">
						<li>
							<a
								v-if="favorites > 0"
								v-kv-track-event="['TopNav','click-Lend-Favorites']"
								:href="`/lend?lenderFavorite=${userId}`"
								class="lend-link"
							>
								Saved loans
							</a>
							<span
								v-else
								class="tw-block tw-py-1 tw-text-tertiary"
							>Saved loans</span>
						</li>
						<li
							v-if="hasSearches"
						>
							<kv-accordion-item
								id="lend-menu-saved-searches-panel"
								ref="searchesLink"
							>
								<template #header>
									<p class="tw-font-medium">
										Saved searches
									</p>
								</template>
								<kv-lend-menu-search-list :searches="searches" />
							</kv-accordion-item>
						</li>
						<li v-else>
							<span class="tw-block tw-py-1 tw-text-tertiary">Saved searches</span>
						</li>
						<li>
							<a
								v-kv-track-event="['TopNav','click-Lend-Countries_Not_Lent']"
								:href="countriesNotLentToUrl"
								class="lend-link"
							>
								Countries I haven't lent to
							</a>
						</li>
					</ul>
				</kv-tab-panel>
			</template>
		</kv-tabs>
	</div>
</template>

<script>
import { mdiArrowRight } from '@mdi/js';
import { computed, ref } from 'vue';
import KvAccordionItem from '../../KvAccordionItem.vue';
import KvLoadingPlaceholder from '../../KvLoadingPlaceholder.vue';
import KvLendMenuCountryList from './KvLendMenuCountryList.vue';
import KvLendMenuSearchList from './KvLendMenuSearchList.vue';
import KvTab from '../../KvTab.vue';
import KvTabPanel from '../../KvTabPanel.vue';
import KvTabs from '../../KvTabs.vue';
import paramCase from '../../../utils/paramCase';
import KvMaterialIcon from '../../KvMaterialIcon.vue';

export default {
	components: {
		KvAccordionItem,
		KvTab,
		KvTabPanel,
		KvTabs,
		KvLendMenuCountryList,
		KvLendMenuSearchList,
		KvLoadingPlaceholder,
		KvMaterialIcon,
	},
	props: {
		categories: {
			type: Array,
			default: () => [],
		},
		favorites: {
			type: Number,
			default: 0,
		},
		userId: {
			type: Number,
			default: null,
		},
		regions: {
			type: Array,
			default: () => [],
		},
		searches: {
			type: Array,
			default: () => [],
		},
		isRegionsLoading: {
			type: Boolean,
			default: true,
		},
		isChannelsLoading: {
			type: Boolean,
			default: true,
		},
		showMGUpsellLink: {
			type: Boolean,
			default: false,
		},
		countriesNotLentToUrl: {
			type: String,
			default: '/lend/countries-not-lent',
		},
	},
	setup(props) {
		const navLendCategories = ref(null);
		const regionAccordions = ref([]);
		const searchesLink = ref(null);

		const hasSearches = computed(() => props.searches.length > 0);

		const onClose = () => {
			// reset the tabs
			navLendCategories.value?.tabContext?.setTab?.(0);
			// close all region accordions
			regionAccordions.value?.forEach?.((accordionRef) => {
				accordionRef?.collapse?.();
			});
			// close saved search accordion
			searchesLink.value?.collapse?.();
		};

		return {
			mdiArrowRight,
			hasSearches,
			navLendCategories,
			regionAccordions,
			searchesLink,
			onClose,
			paramCase,
		};
	},
};
</script>

<style lang="postcss" scoped>
.lend-link {
	@apply tw-text-primary hover:tw-text-action tw-block tw-w-full tw-py-1 tw-no-underline hover:tw-underline;
}
</style>
