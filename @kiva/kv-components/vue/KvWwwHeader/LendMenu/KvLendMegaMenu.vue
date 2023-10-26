<template>
	<div class="lend-mega-menu tw-overflow-hidden tw-pb-3 lg:tw-pt-3">
		<a
			v-if="showMGUpsellLink"
			v-kv-track-event="['TopNav', 'click-Lend-Menu-Monthly-Good', 'Lend-monthly']"
			href="/monthlygood"
		>
			<span class="tw-inline-flex tw-items-center tw-py-2 tw-mb-2 tw-gap-0.5 tw-font-medium">
				Lend monthly
				<kv-material-icon
					:icon="mdiArrowRight"
					class="tw-w-3 tw-h-3"
				/>
			</span>
		</a>
		<div
			v-else
			class="tw-block tw-py-2 tw-mb-2 tw-w-16"
		>
			<kv-loading-placeholder
				style="height: 1.5rem;"
			/>
		</div>
		<div
			:style="computedStyle"
			class="tw-transition tw-duration-1000 tw-ease-in-out"
		>
			<kv-grid style="grid-template-columns: repeat(18, minmax(0, 1fr));">
				<!-- categories -->
				<div
					ref="categoriesSection"
					class="tw-col-span-7"
				>
					<h2 class="tw-text-base tw-mb-2">
						Categories
					</h2>

					<div class="tw-flex tw-gap-4 tw-whitespace-nowrap">
						<ul class="tw-columns-2 tw-gap-4 tw-font-medium">
							<template v-if="isChannelsLoading">
								<li
									v-for="i in 14"
									:key="i"
									class="tw-w-[11rem]"
								>
									<kv-loading-placeholder
										class="tw-inline-block tw-align-middle"
										style="height: 1.25rem;"
									/>
									<span class="tw-py-1 tw-inline-block">&nbsp;</span>
								</li>
							</template>
							<template v-else>
								<li
									v-for="(category, index) in categories"
									:key="index"
									class="tw-w-[11rem]"
								>
									<a
										v-kv-track-event="['TopNav', 'click-Lend-Category', category.name, index + 1]"
										:href="category.url"
										class="tw-text-primary tw-text-left hover:tw-text-action-highlight
									tw-py-1 tw-inline-block"
									>
										{{ category.name }}
									</a>
								</li>
							</template>
						</ul>
						<div>
							<ul class="tw-font-medium">
								<li class="tw-w-[11rem]">
									<a
										v-kv-track-event="['TopNav','click-Lend-Recommended-by-lenders']"
										href="/lend-by-category/recommended-by-lenders"
										class="tw-text-action hover:tw-text-action-highlight tw-inline-block tw-py-1"
									>
										Recommended by lenders
									</a>
								</li>
								<li class="tw-w-[11rem]">
									<a
										v-kv-track-event="['TopNav','click-Lend-All_Categories']"
										href="/categories"
										class="tw-text-primary hover:tw-text-action-highlight tw-inline-block tw-py-1"
									>
										All categories
									</a>
								</li>
								<li
									class="tw-w-[11rem]"
								>
									<a
										v-kv-track-event="['TopNav','click-Lend-All_Loans']"
										class="tw-text-primary hover:tw-text-action-highlight tw-inline-block tw-py-1"
										href="/lend"
									>
										All loans
									</a>
								</li>
							</ul>
							<!-- My Kiva -->
							<div v-if="userId">
								<!-- blank line to keep things lined up just right -->
								<span class="tw-inline-block tw-py-1">&nbsp;</span>

								<h2 class="tw-text-base tw-my-1">
									My Kiva
								</h2>
								<ul class="tw-font-medium">
									<li>
										<a
											v-if="favorites > 0"
											v-kv-track-event="['TopNav','click-Lend-Favorites']"
											:href="`/lend?lenderFavorite=${userId}`"
											class="tw-text-primary tw-text-left hover:tw-text-action-highlight
												tw-py-1 tw-inline-block"
										>
											Saved loans
										</a>
										<span
											v-else
											class="tw-text-secondary tw-py-1 tw-inline-block"
										>
											Saved loans
										</span>
									</li>
									<li>
										<button
											v-if="hasSearches"
											:aria-pressed="isOpenSection(savedSearchesTitle) ? 'true' : 'false'"
											class="tw-text-primary tw-text-left tw-py-1 tw-inline-block
											hover:tw-text-action-highlight hover:tw-underline"
											@click="openSection(savedSearchesTitle)"
										>
											{{ savedSearchesTitle }}
										</button>
										<span
											v-else
											class="tw-text-secondary tw-py-1 tw-inline-block"
										>
											Saved searches
										</span>
									</li>
									<li>
										<a
											v-kv-track-event="['TopNav','click-Lend-Countries_Not_Lent']"
											href="/lend/countries-not-lent"
											class="tw-text-primary tw-text-left hover:tw-text-action-highlight
												tw-py-1 tw-inline-block"
										>
											Countries I haven't lent to
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<div class="tw-col-span-2">
					<button
						v-if="sectionOpen"
						class="tw-flex"
						@click="openedSection = ''"
					>
						<kv-material-icon
							class="tw-flex-shrink-0 tw-w-3 tw-h-3"
							:icon="mdiChevronLeft"
						/>
						<span class="tw-text-base">
							Back
						</span>
					</button>
				</div>

				<!-- regions -->
				<div class="tw-col-span-8 tw-flex tw-flex-col">
					<template v-if="isOpenSection(savedSearchesTitle)">
						<h2 class="tw-text-base tw-mb-2">
							Saved Searches
						</h2>
						<kv-lend-menu-search-list
							class="search-list tw-h-full"
							:searches="searches"
						/>
					</template>
					<template v-else>
						<h2 class="tw-text-base tw-mb-2">
							Regions
						</h2>
						<div class="tw-flex tw-whitespace-nowrap tw-h-full">
							<ul class="tw-font-medium">
								<template v-if="isRegionsLoading">
									<li
										v-for="i in 8"
										:key="i"
										class="tw-w-[11rem]"
									>
										<kv-loading-placeholder
											class="tw-inline-block tw-align-middle"
											style="height: 1.25rem;"
										/>
										<span class="tw-py-1 tw-inline-block">&nbsp;</span>
									</li>
								</template>
								<template v-else>
									<li
										v-for="region in regions"
										:key="region.name"
										class="tw-w-[11rem] tw-mr-4"
									>
										<button
											v-kv-track-event="['TopNav','click-Lend-Region', region.name]"
											:aria-pressed="isOpenSection(region.name) ? 'true' : 'false'"
											class="tw-text-primary tw-text-left tw-py-1
											hover:tw-text-action-highlight hover:tw-underline "
											:class="{ 'tw-text-action' : isOpenSection(region.name)}"
											@click="openSection(region.name)"
										>
											{{ region.name }}
										</button>
									</li>
								</template>
							</ul>
							<div
								v-for="region in openRegions"
								:key="region.name"
								class="tw-h-full"
							>
								<kv-lend-menu-country-list
									:countries="region.countries"
									class="region-list tw-h-full"
								/>
							</div>
						</div>
					</template>
				</div>
			</kv-grid>
		</div>
	</div>
</template>

<script>
import { mdiArrowRight, mdiChevronLeft } from '@mdi/js';
import {
	computed,
	ref,
} from 'vue-demi';
import KvLoadingPlaceholder from '../../KvLoadingPlaceholder.vue';
import KvGrid from '../../KvGrid.vue';
import KvMaterialIcon from '../../KvMaterialIcon.vue';
import KvLendMenuCountryList from './KvLendMenuCountryList.vue';
import KvLendMenuSearchList from './KvLendMenuSearchList.vue';

export default {
	components: {
		KvGrid,
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
		isRegionsLoading: {
			type: Boolean,
			default: true,
		},
		isChannelsLoading: {
			type: Boolean,
			default: true,
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
		showMGUpsellLink: {
			type: Boolean,
			default: false,
		},
	},
	setup(props) {
		const categoriesSection = ref(null);
		const openedSection = ref('');

		const sectionOpen = computed(() => {
			return openedSection.value !== '';
		});
		const isOpenSection = (name) => {
			return openedSection.value === name;
		};
		const openSection = (name) => {
			openedSection.value = name;
		};

		const computedStyle = computed(() => {
			const style = { width: '150%' };
			if (sectionOpen.value) {
				const categoryWidth = categoriesSection.value?.clientWidth ?? 0;
				style.transform = `translateX(${categoryWidth * -1}px)`;
			}
			return style;
		});

		const openRegions = computed(() => {
			return props.regions.filter((region) => isOpenSection(region.name));
		});

		const hasSearches = computed(() => {
			return props.searches.length > 0;
		});

		const onClose = () => {
			openedSection.value = '';
		};

		return {
			mdiArrowRight,
			mdiChevronLeft,
			categoriesSection,

			openedSection,
			sectionOpen,
			isOpenSection,
			openSection,

			onClose,

			openRegions,
			computedStyle,
			hasSearches,
			savedSearchesTitle: 'Saved searches',
		};
	},
};
</script>

<style lang="postcss" scoped>
.region-list,
.search-list {
	column-fill: auto; /* Tailwind doesnt have a column-fill option currently */
	@apply tw-columns-3 tw-gap-4;
}
</style>
