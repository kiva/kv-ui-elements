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
		/>
	</div>
</template>

<script>
import { gql } from '@apollo/client/core';
import { computed, onMounted, ref } from 'vue-demi';
import KvLendListMenu from './KvLendListMenu.vue';
import KvLendMegaMenu from './KvLendMegaMenu.vue';
import { indexIn } from '../../../utils/comparators';
import { groupBy, sortBy } from '../../../utils/arrayUtils';

export default {
	components: {
		KvLendListMenu,
		KvLendMegaMenu,
	},
	emits: ['load-lend-menu-data'],
	setup(props, { emit }) {
		const	userId = ref(null);
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

		const hasUserId = computed(() => {
			return !!userId.value;
		});

		const onLoad = async (apollo) => {
			// apollo.watchQuery({
			// 	query: gql`query countryFacets {
			// 		lend {
			// 			countryFacets {
			// 				count
			// 				country {
			// 					name
			// 					region
			// 					isoCode
			// 				}
			// 			}
			// 		}

			// 	}`,
			// }).subscribe({
			// 	next: ({ data }) => {
			// 		countryFacets.value = data?.data?.lend?.countryFacets ?? [];
			// 		isRegionsLoading.value = false;
			// 	},
			// });

			countryFacets.value = [
				{
					count: 72,
					country: {
						name: 'Samoa',
						region: 'Oceania',
						isoCode: 'WS',
					},
				},
				{
					count: 84,
					country: {
						name: 'Mozambique',
						region: 'Africa',
						isoCode: 'MZ',
					},
				},
				{
					count: 18,
					country: {
						name: 'Dominican Republic',
						region: 'North America',
						isoCode: 'DO',
					},
				},
				{
					count: 40,
					country: {
						name: 'Bolivia',
						region: 'South America',
						isoCode: 'BO',
					},
				},
				{
					count: 22,
					country: {
						name: 'Guatemala',
						region: 'Central America',
						isoCode: 'GT',
					},
				},
				{
					count: 63,
					country: {
						name: 'Paraguay',
						region: 'South America',
						isoCode: 'PY',
					},
				},
				{
					count: 4,
					country: {
						name: 'Nepal',
						region: 'Asia',
						isoCode: 'NP',
					},
				},
				{
					count: 370,
					country: {
						name: 'Tajikistan',
						region: 'Asia',
						isoCode: 'TJ',
					},
				},
				{
					count: 90,
					country: {
						name: 'Uganda',
						region: 'Africa',
						isoCode: 'UG',
					},
				},
				{
					count: 42,
					country: {
						name: 'Jordan',
						region: 'Middle East',
						isoCode: 'JO',
					},
				},
				{
					count: 20,
					country: {
						name: 'Palestine',
						region: 'Middle East',
						isoCode: 'PS',
					},
				},
				{
					count: 9,
					country: {
						name: 'Tanzania',
						region: 'Africa',
						isoCode: 'TZ',
					},
				},
				{
					count: 76,
					country: {
						name: 'Senegal',
						region: 'Africa',
						isoCode: 'SN',
					},
				},
				{
					count: 68,
					country: {
						name: 'Cambodia',
						region: 'Asia',
						isoCode: 'KH',
					},
				},
				{
					count: null,
					country: {
						name: 'Thailand',
						region: 'Asia',
						isoCode: 'TH',
					},
				},
				{
					count: 52,
					country: {
						name: 'Rwanda',
						region: 'Africa',
						isoCode: 'RW',
					},
				},
				{
					count: 56,
					country: {
						name: 'Honduras',
						region: 'Central America',
						isoCode: 'HN',
					},
				},
				{
					count: 47,
					country: {
						name: 'Peru',
						region: 'South America',
						isoCode: 'PE',
					},
				},
				{
					count: 47,
					country: {
						name: 'Vietnam',
						region: 'Asia',
						isoCode: 'VN',
					},
				},
				{
					count: 393,
					country: {
						name: 'Philippines',
						region: 'Asia',
						isoCode: 'PH',
					},
				},
				{
					count: 17,
					country: {
						name: 'Costa Rica',
						region: 'Central America',
						isoCode: 'CR',
					},
				},
				{
					count: 4,
					country: {
						name: 'Panama',
						region: 'Central America',
						isoCode: 'PA',
					},
				},
				{
					count: 574,
					country: {
						name: 'Kenya',
						region: 'Africa',
						isoCode: 'KE',
					},
				},
				{
					count: 294,
					country: {
						name: 'Ecuador',
						region: 'South America',
						isoCode: 'EC',
					},
				},
				{
					count: 56,
					country: {
						name: 'Congo (DRC)',
						region: 'Africa',
						isoCode: 'CD',
					},
				},
				{
					count: 214,
					country: {
						name: 'El Salvador',
						region: 'Central America',
						isoCode: 'SV',
					},
				},
				{
					count: 90,
					country: {
						name: 'Kyrgyzstan',
						region: 'Asia',
						isoCode: 'KG',
					},
				},
				{
					count: null,
					country: {
						name: 'Israel',
						region: 'Middle East',
						isoCode: 'IL',
					},
				},
				{
					count: 220,
					country: {
						name: 'Nicaragua',
						region: 'Central America',
						isoCode: 'NI',
					},
				},
				{
					count: 94,
					country: {
						name: 'Colombia',
						region: 'South America',
						isoCode: 'CO',
					},
				},
				{
					count: 264,
					country: {
						name: 'Georgia',
						region: 'Eastern Europe',
						isoCode: 'GE',
					},
				},
				{
					count: null,
					country: {
						name: 'Liberia',
						region: 'Africa',
						isoCode: 'LR',
					},
				},
				{
					count: 9,
					country: {
						name: 'Sierra Leone',
						region: 'Africa',
						isoCode: 'SL',
					},
				},
				{
					count: 2,
					country: {
						name: 'Burkina Faso',
						region: 'Africa',
						isoCode: 'BF',
					},
				},
				{
					count: 8,
					country: {
						name: 'Turkey',
						region: 'Middle East',
						isoCode: 'TR',
					},
				},
				{
					count: null,
					country: {
						name: 'Cameroon',
						region: 'Africa',
						isoCode: 'CM',
					},
				},
				{
					count: null,
					country: {
						name: 'India',
						region: 'Asia',
						isoCode: 'IN',
					},
				},
				{
					count: 59,
					country: {
						name: 'Mexico',
						region: 'North America',
						isoCode: 'MX',
					},
				},
				{
					count: 12,
					country: {
						name: 'Brazil',
						region: 'South America',
						isoCode: 'BR',
					},
				},
				{
					count: 21,
					country: {
						name: 'Ghana',
						region: 'Africa',
						isoCode: 'GH',
					},
				},
				{
					count: 100,
					country: {
						name: 'Indonesia',
						region: 'Asia',
						isoCode: 'ID',
					},
				},
				{
					count: null,
					country: {
						name: 'Kazakhstan',
						region: 'Eastern Europe',
						isoCode: 'KZ',
					},
				},
				{
					count: 15,
					country: {
						name: 'United States',
						region: 'North America',
						isoCode: 'US',
					},
				},
				{
					count: null,
					country: {
						name: 'Uzbekistan',
						region: 'Asia',
						isoCode: 'UZ',
					},
				},
				{
					count: 5,
					country: {
						name: 'Albania',
						region: 'Eastern Europe',
						isoCode: 'AL',
					},
				},
				{
					count: 29,
					country: {
						name: 'Kosovo',
						region: 'Eastern Europe',
						isoCode: 'XK',
					},
				},
				{
					count: 11,
					country: {
						name: 'Timor-Leste',
						region: 'Oceania',
						isoCode: 'TL',
					},
				},
				{
					count: 19,
					country: {
						name: 'Pakistan',
						region: 'Asia',
						isoCode: 'PK',
					},
				},
				{
					count: 25,
					country: {
						name: 'Nigeria',
						region: 'Africa',
						isoCode: 'NG',
					},
				},
				{
					count: 47,
					country: {
						name: 'Togo',
						region: 'Africa',
						isoCode: 'TG',
					},
				},
				{
					count: 54,
					country: {
						name: 'Madagascar',
						region: 'Africa',
						isoCode: 'MG',
					},
				},
				{
					count: null,
					country: {
						name: 'Myanmar (Burma)',
						region: 'Asia',
						isoCode: 'MM',
					},
				},
				{
					count: null,
					country: {
						name: 'Malawi',
						region: 'Africa',
						isoCode: 'MW',
					},
				},
				{
					count: 105,
					country: {
						name: 'Solomon Islands',
						region: 'Oceania',
						isoCode: 'SB',
					},
				},
				{
					count: 8,
					country: {
						name: 'Moldova',
						region: 'Eastern Europe',
						isoCode: 'MD',
					},
				},
				{
					count: null,
					country: {
						name: 'Chile',
						region: 'South America',
						isoCode: 'CL',
					},
				},
				{
					count: null,
					country: {
						name: 'Lao PDR',
						region: 'Asia',
						isoCode: 'LA',
					},
				},
				{
					count: 2,
					country: {
						name: 'Mali',
						region: 'Africa',
						isoCode: 'ML',
					},
				},
				{
					count: 16,
					country: {
						name: 'Egypt',
						region: 'Africa',
						isoCode: 'EG',
					},
				},
				{
					count: null,
					country: {
						name: 'Haiti',
						region: 'North America',
						isoCode: 'HT',
					},
				},
				{
					count: null,
					country: {
						name: 'Lesotho',
						region: 'Africa',
						isoCode: 'LS',
					},
				},
				{
					count: null,
					country: {
						name: 'Zambia',
						region: 'Africa',
						isoCode: 'ZM',
					},
				},
				{
					count: null,
					country: {
						name: 'South Africa',
						region: 'Africa',
						isoCode: 'ZA',
					},
				},
				{
					count: null,
					country: {
						name: 'Burundi',
						region: 'Africa',
						isoCode: 'BI',
					},
				},
				{
					count: null,
					country: {
						name: 'South Sudan',
						region: 'Africa',
						isoCode: 'SS',
					},
				},
				{
					count: null,
					country: {
						name: 'Bhutan',
						region: 'Asia',
						isoCode: 'BT',
					},
				},
				{
					count: null,
					country: {
						name: 'Canada',
						region: 'North America',
						isoCode: 'CA',
					},
				},
				{
					count: 16,
					country: {
						name: 'Tonga',
						region: 'Oceania',
						isoCode: 'TO',
					},
				},
				{
					count: 133,
					country: {
						name: 'Fiji',
						region: 'Oceania',
						isoCode: 'FJ',
					},
				},
				{
					count: null,
					country: {
						name: 'Bangladesh',
						region: 'Asia',
						isoCode: 'BD',
					},
				},
				{
					count: null,
					country: {
						name: 'Papua New Guinea',
						region: 'Oceania',
						isoCode: 'PG',
					},
				},
				{
					count: null,
					country: {
						name: 'Zimbabwe',
						region: 'Africa',
						isoCode: 'ZW',
					},
				},
				{
					count: null,
					country: {
						name: 'Benin',
						region: 'Africa',
						isoCode: 'BJ',
					},
				},
				{
					count: null,
					country: {
						name: 'Namibia',
						region: 'Africa',
						isoCode: 'NA',
					},
				},
				{
					count: 28,
					country: {
						name: 'Vanuatu',
						region: 'Oceania',
						isoCode: 'VU',
					},
				},
				{
					count: null,
					country: {
						name: 'Mongolia',
						region: 'Asia',
						isoCode: 'MN',
					},
				},
				{
					count: null,
					country: {
						name: "Cote D'Ivoire",
						region: 'Africa',
						isoCode: 'CI',
					},
				},
				{
					count: null,
					country: {
						name: 'Guam',
						region: 'Oceania',
						isoCode: 'GU',
					},
				},
				{
					count: null,
					country: {
						name: 'Virgin Islands',
						region: 'North America',
						isoCode: 'VI',
					},
				},
				{
					count: null,
					country: {
						name: 'Puerto Rico',
						region: 'North America',
						isoCode: 'PR',
					},
				},
			];
			isRegionsLoading.value = false;

			// apollo.watchQuery({
			// 	query: gql`
			// 		query lendMenuData {
			// 			lend {
			// 				loanChannels(popular: true, applyMinLoanCount: true, limit: 50) {
			// 					values {
			// 						id
			// 						name
			// 						url
			// 					}
			// 				}
			// 			}
			// 		}
			// 	`,
			// }).subscribe({
			// 	next: ({ data }) => {
			// 		categories.value = data?.lend?.loanChannels?.values ?? [];
			// 		isChannelsLoading.value = false;
			// 	},
			// });

			categories.value = [
				{
					id: 8,
					name: 'Agriculture',
					url: 'https://www.development.kiva.org/lend/agriculture',
					__typename: 'LoanChannel',
				},
				{
					id: 4,
					name: 'Education',
					url: 'https://www.development.kiva.org/lend/education',
					__typename: 'LoanChannel',
				},
				{
					id: 32,
					name: 'Refugees and IDPs',
					url: 'https://www.development.kiva.org/lend/refugees-and-i-d-ps',
					__typename: 'LoanChannel',
				},
				{
					id: 18,
					name: 'Eco-friendly',
					url: 'https://www.development.kiva.org/lend/eco-friendly',
					__typename: 'LoanChannel',
				},
				{
					id: 28,
					name: 'Kiva U.S.',
					url: 'https://www.development.kiva.org/lend/kiva-u-s',
					__typename: 'LoanChannel',
				},
				{
					id: 23,
					name: 'Livestock',
					url: 'https://www.development.kiva.org/lend/livestock',
					__typename: 'LoanChannel',
				},
				{
					id: 29,
					name: 'Arts',
					url: 'https://www.development.kiva.org/lend/arts',
					__typename: 'LoanChannel',
				},
				{
					id: 5,
					name: 'Women',
					url: 'https://www.development.kiva.org/lend/women',
					__typename: 'LoanChannel',
				},
				{
					id: 3,
					name: 'Ending soon',
					url: 'https://www.development.kiva.org/lend/ending-soon',
					__typename: 'LoanChannel',
				},
				{
					id: 26,
					name: 'Single parents',
					url: 'https://www.development.kiva.org/lend/single-parents',
					__typename: 'LoanChannel',
				},
				{
					id: 25,
					name: 'Health',
					url: 'https://www.development.kiva.org/lend/health',
					__typename: 'LoanChannel',
				},
				{
					id: 33,
					name: 'Mission-driven orgs',
					url: 'https://www.development.kiva.org/lend/mission-driven-orgs',
					__typename: 'LoanChannel',
				},
				{
					id: 12,
					name: 'Food',
					url: 'https://www.development.kiva.org/lend/food',
					__typename: 'LoanChannel',
				},
				{
					id: 31,
					name: 'Water and sanitation',
					url: 'https://www.development.kiva.org/lend/water-and-sanitation',
					__typename: 'LoanChannel',
				},
				{
					id: 7,
					name: 'Conflict zones',
					url: 'https://www.development.kiva.org/lend/conflict-zones',
					__typename: 'LoanChannel',
				},
				{
					id: 11,
					name: 'Short-term loans',
					url: 'https://www.development.kiva.org/lend/short-term-loans',
					__typename: 'LoanChannel',
				},
				{
					id: 155,
					name: 'Matched loans',
					url: 'https://www.development.kiva.org/lend/matched-loans',
					__typename: 'LoanChannel',
				},
			];
			isChannelsLoading.value = false;

			if (hasUserId.value) {
				const { data } = await apollo.query({
					query: gql`
						query lendMenuPrivateData($userId: Int!) {
							lend {
								loans(userId: $userId, limit: 0) {
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
			userId,
			isChannelsLoading,
			isRegionsLoading,
			savedSearches,
			favoritesCount,
		};
	},
};
</script>
