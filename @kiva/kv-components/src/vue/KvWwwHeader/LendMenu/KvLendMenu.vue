<template>
	<kv-page-container class="tw-pt-2 lg:tw-pt-0">
		<!--
			Three-tier responsive Lend menu when useMobileMegaMenu is on (KvWwwHeaderBasic): the
			tabbed mobile mega below md, KvLendListMenu through tablet (matches cms-page-server /
			ui), and KvLendMegaMenu at lg+. Legacy false-branch keeps its two-tier list-then-mega
			split for KvWwwHeader.
		-->
		<mobile-lend-menu
			v-if="useMobileMegaMenu"
			class="md:tw-hidden"
			:categories="computedCategories"
			:regions="regions"
			:user-id="userId"
			:favorites="favoritesCount"
			:searches="savedSearches"
			:is-regions-loading="isRegionsLoading"
			:is-channels-loading="isChannelsLoading"
			:countries-not-lent-to-url="countriesNotLentToUrl"
			:search-suggestions="searchSuggestions"
			:app-origin="appOrigin"
			@load-search-data="$emit('load-search-data')"
			@search-submit="$emit('search-submit', $event)"
		/>
		<kv-lend-list-menu
			:class="useMobileMegaMenu ? 'tw-hidden md:tw-block lg:tw-hidden' : 'lg:tw-hidden'"
			:categories="computedCategories"
			:regions="regions"
			:user-id="userId"
			:favorites="favoritesCount"
			:searches="savedSearches"
			:is-regions-loading="isRegionsLoading"
			:is-channels-loading="isChannelsLoading"
			:show-m-g-upsell-link="showMGUpsellLink"
			:countries-not-lent-to-url="countriesNotLentToUrl"
		/>
		<kv-lend-mega-menu
			class="tw-hidden lg:tw-block"
			:categories="computedCategories"
			:regions="regions"
			:user-id="userId"
			:favorites="favoritesCount"
			:searches="savedSearches"
			:is-regions-loading="isRegionsLoading"
			:is-channels-loading="isChannelsLoading"
			:show-m-g-upsell-link="showMGUpsellLink"
			:countries-not-lent-to-url="countriesNotLentToUrl"
		/>
	</kv-page-container>
</template>

<script lang="ts">
import { gql } from '@apollo/client/core';
import {
	computed, onMounted, ref, toRefs, type PropType,
} from 'vue';
import KvLendListMenu from './KvLendListMenu.vue';
import KvLendMegaMenu from './KvLendMegaMenu.vue';
import MobileLendMenu from '../../KvWwwHeaderBasic/MobileLendMenu/MobileLendMenu.vue';
import { indexIn } from '../../../utils/comparators';
import { groupBy, sortBy } from '../../../utils/arrayUtils';
import KvPageContainer from '../../KvPageContainer.vue';
import type { SearchSuggestion } from '../../../utils/typeaheadSearchEngine';

export default {
	components: {
		KvLendListMenu,
		KvLendMegaMenu,
		MobileLendMenu,
		KvPageContainer,
	},
	props: {
		userId: {
			type: Number,
			default: null,
		},
		showMGUpsellLink: {
			type: Boolean,
			default: false,
		},
		countriesNotLentToUrl: {
			type: String,
			default: '/lend/countries-not-lent',
		},
		/**
		 * Render the new KvWwwHeaderBasic mobile tabbed menu (Categories / Regions / MyKiva / Search)
		 * below the md breakpoint instead of the legacy KvLendListMenu. Mega menu still renders at
		 * md+ in this mode. Default off preserves the legacy KvWwwHeader behavior.
		 */
		useMobileMegaMenu: {
			type: Boolean,
			default: false,
		},
		/**
		 * Search suggestion dataset for the mobile Search tab. Only used when useMobileMegaMenu is on.
		 */
		searchSuggestions: {
			type: Array as PropType<SearchSuggestion[]>,
			default: () => [],
		},
		/**
		 * App origin used to build /lend/filter URLs on Search-tab submit. Only used when
		 * useMobileMegaMenu is on.
		 */
		appOrigin: {
			type: String,
			default: '',
		},
	},
	emits: ['load-lend-menu-data', 'load-search-data', 'search-submit'],
	setup(props, { emit }) {
		const {
			userId,
		} = toRefs(props);

		const categories = ref([]);
		const countryFacets = ref([]);
		const favoritesCount = ref(0);
		const savedSearches = ref([]);
		const regionDisplayOrder = [
			'North America',
			'Central America',
			'South America',
			'Africa',
			'Eastern Europe',
			'Middle East',
			'Asia',
			'Oceania',
		];
		const isRegionsLoading = ref(true);
		const isChannelsLoading = ref(true);

		const onLoad = async (apollo) => {
			apollo.watchQuery({
				query: gql`query countryFacets {
					lend {
						countryFacets {
							count
							country {
								name
								region
								isoCode
							}
						}
					}

				}`,
			}).subscribe({
				next: ({ data }) => {
					countryFacets.value = data?.lend?.countryFacets ?? [];
					isRegionsLoading.value = false;
				},
			});

			apollo.watchQuery({
				query: gql`
					query lendMenuData {
						lend {
							loanChannels(popular: true, applyMinLoanCount: true, limit: 50) {
								values {
									id
									name
									url
								}
							}
						}
					}
				`,
			}).subscribe({
				next: ({ data }) => {
					categories.value = data?.lend?.loanChannels?.values ?? [];
					isChannelsLoading.value = false;
				},
			});

			if (userId.value) {
				const { data } = await apollo.query({
					query: gql`
						query lendMenuPrivateData($userId: Int!) {
							lend {
								loans(limit: 1, filters: {
									lenderFavorite: $userId
								}) {
									totalCount
								}
							}
							my {
								savedSearches {
									values {
										id
										name
										url
									}
								}
							}
						}
					`,
					variables: {
						userId: userId.value,
					},
					fetchPolicy: 'network-only',
				});

				favoritesCount.value = data?.lend?.loans?.totalCount ?? 0;
				savedSearches.value = data?.my?.savedSearches?.values ?? [];
			}
		};

		const regions = computed(() => {
			const facets = countryFacets.value.map((facet) => {
				return {
					name: facet.country.name,
					region: facet.country.region,
					isoCode: facet.country.isoCode.toLowerCase(),
					count: facet.count || 0,
				};
			});

			const groups = groupBy(facets, 'region');

			const formattedRegions = [];
			// eslint-disable-next-line no-restricted-syntax
			for (const [name, countries] of Object.entries(groups)) {
				formattedRegions.push({
					name,
					countries: countries.sort(sortBy('name')),
				});
			}

			return formattedRegions.sort(indexIn(regionDisplayOrder, 'name'));
		});

		const computedCategories = computed(() => {
			const formattedCategories = categories.value?.map((category) => {
				const updatedCat = JSON.parse(JSON.stringify(category));
				updatedCat.url = updatedCat.url.replace('lend', 'lend-by-category');
				return updatedCat;
			});

			return formattedCategories.sort(sortBy('name'));
		});

		onMounted(() => {
			emit('load-lend-menu-data');
		});

		return {
			onLoad,
			regions,
			computedCategories,
			isChannelsLoading,
			isRegionsLoading,
			savedSearches,
			favoritesCount,
		};
	},
};
</script>
