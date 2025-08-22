<template>
	<div>
		<kv-lend-list-menu
			class="lg:tw-hidden"
			:categories="computedCategories"
			:regions="regions"
			:user-id="userId"
			:favorites="favoritesCount"
			:searches="savedSearches"
			:is-regions-loading="isRegionsLoading"
			:is-channels-loading="isChannelsLoading"
			:show-m-g-upsell-link="showMGUpsellLink"
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
		/>
	</div>
</template>

<script>
import { gql } from '@apollo/client/core';
import {
	computed, onMounted, ref, toRefs,
} from 'vue';
import KvLendListMenu from './KvLendListMenu.vue';
import KvLendMegaMenu from './KvLendMegaMenu.vue';
import { indexIn } from '../../../utils/comparators';
import { groupBy, sortBy } from '../../../utils/arrayUtils';

export default {
	components: {
		KvLendListMenu,
		KvLendMegaMenu,
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
	},
	emits: ['load-lend-menu-data'],
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
