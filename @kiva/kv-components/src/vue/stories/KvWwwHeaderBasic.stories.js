import { ref } from 'vue';
import KvWwwHeaderBasic from '../KvWwwHeaderBasic/KvWwwHeaderBasic.vue';
import KvPageContainer from '../KvPageContainer.vue';

// ── Mock data ──────────────────────────────────────────────────────────────────
// KvLendMenu fetches categories/regions/saved-searches via Apollo when the host calls
// `header.loadMenuData(apollo)`. Storybook has no Apollo client, so we mock the surface area
// KvLendMenu touches (watchQuery + query) and return canned data. Lets the mobile Lend menu
// (Categories / Regions / MyKiva / Search) render with real-looking content.

// loanChannels.url is later rewritten by KvLendMenu's `replace('lend', 'lend-by-category')`, so
// these urls intentionally start with `/lend/…`.
const sampleLoanChannels = [
	'Agriculture', 'Arts', 'Conflict zones', 'Eco-friendly', 'Education', 'Ending soon',
	'Food', 'Health', 'Kiva U.S.', 'Livestock', 'Matched loans', 'Short-term loans',
	'Single parents', 'Social Enterprises', 'Water and sanitation', 'Women',
].map((name, i) => ({
	id: String(i + 1),
	name,
	url: `/lend/${name.toLowerCase().replace(/[^a-z]+/g, '-')}`,
}));

// countryFacets shape: { count, country: { name, region, isoCode } }. KvLendMenu groups by region.
const sampleCountryFacets = [
	['United States', 'North America', 'US', 32],
	['Mexico', 'North America', 'MX', 14],
	['Guatemala', 'Central America', 'GT', 56],
	['Honduras', 'Central America', 'HN', 28],
	['El Salvador', 'Central America', 'SV', 21],
	['Nicaragua', 'Central America', 'NI', 17],
	['Peru', 'South America', 'PE', 73],
	['Colombia', 'South America', 'CO', 41],
	['Ecuador', 'South America', 'EC', 29],
	['Bolivia', 'South America', 'BO', 18],
	['Kenya', 'Africa', 'KE', 87],
	['Uganda', 'Africa', 'UG', 41],
	['Rwanda', 'Africa', 'RW', 33],
	['Tanzania', 'Africa', 'TZ', 24],
	['Senegal', 'Africa', 'SN', 12],
	['Moldova', 'Eastern Europe', 'MD', 19],
	['Georgia', 'Eastern Europe', 'GE', 11],
	['Armenia', 'Eastern Europe', 'AM', 7],
	['Jordan', 'Middle East', 'JO', 23],
	['Lebanon', 'Middle East', 'LB', 14],
	['Palestine', 'Middle East', 'PA', 8],
	['Philippines', 'Asia', 'PH', 64],
	['Cambodia', 'Asia', 'KH', 39],
	['Vietnam', 'Asia', 'VN', 22],
	['Tajikistan', 'Asia', 'TJ', 16],
	['Solomon Islands', 'Oceania', 'SB', 5],
	['Samoa', 'Oceania', 'WS', 3],
].map(([name, region, isoCode, count]) => ({ count, country: { name, region, isoCode } }));

const sampleSavedSearches = [
	{ id: 1, name: 'Coffee farmers in Peru', url: '/lend/filter?country=70&sector=1' },
	{ id: 2, name: 'Women-led businesses in Kenya', url: '/lend/filter?country=42&gender=female' },
	{ id: 3, name: 'Education loans, short-term', url: '/lend/filter?sector=8&loanLimit=8' },
];

const sampleSearchSuggestions = [
	{ group: 'Countries and Territories', label: 'Peru', query: 'country=70' },
	{ group: 'Countries and Territories', label: 'Philippines', query: 'country=72' },
	{ group: 'Countries and Territories', label: 'Paraguay', query: 'country=71' },
	{ group: 'Sectors', label: 'Personal Use', query: 'sector=11' },
	{ group: 'Sectors', label: 'Education', query: 'sector=8' },
	{ group: 'Sectors', label: 'Agriculture', query: 'sector=1' },
	{ group: 'Sectors', label: 'Food', query: 'sector=9' },
];

// Minimal Apollo stand-in that satisfies the watchQuery/.subscribe and query/.then signatures
// used by KvLendMenu.onLoad. Branches on the GraphQL query body to return the right shape.
function createMockApollo({ favoritesTotal = 8, savedSearches = sampleSavedSearches } = {}) {
	return {
		watchQuery: ({ query }) => {
			const body = query?.loc?.source?.body ?? '';
			let data = {};
			if (body.includes('countryFacets')) {
				data = { lend: { countryFacets: sampleCountryFacets } };
			} else if (body.includes('loanChannels')) {
				data = { lend: { loanChannels: { values: sampleLoanChannels } } };
			}
			return {
				subscribe: ({ next }) => {
					// Microtask delay so the loading placeholders flash before content arrives.
					setTimeout(() => next({ data }), 0);
					return { unsubscribe: () => {} };
				},
			};
		},
		query: () => Promise.resolve({
			data: {
				lend: { loans: { totalCount: favoritesTotal } },
				my: { savedSearches: { values: savedSearches } },
			},
		}),
	};
}

export default {
	title: 'Page Frame/KvWwwHeaderBasic',
	component: KvWwwHeaderBasic,
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {
		loggedIn: { control: { type: 'boolean' } },
		basketCount: { control: { type: 'number' } },
		balance: { control: { type: 'number' } },
		userId: { control: { type: 'number' } },
		isBorrower: { control: { type: 'boolean' } },
		isTrustee: { control: { type: 'boolean' } },
		lenderName: { control: { type: 'text' } },
		lenderImageUrl: { control: { type: 'text' } },
		isBasketDataLoading: { control: { type: 'boolean' } },
		isUserDataLoading: { control: { type: 'boolean' } },
		showMGUpsellLink: { control: { type: 'boolean' } },
		loginUrl: { control: { type: 'text' } },
		myDashboardUrl: { control: { type: 'text' } },
		countriesNotLentToUrl: { control: { type: 'text' } },
		appOrigin: { control: { type: 'text' } },
		searchSuggestions: { control: { type: 'object' } },
	},
};

const story = (args) => {
	const template = (_args, { argTypes }) => ({
		props: Object.keys(argTypes),
		components: { KvWwwHeaderBasic, KvPageContainer },
		setup() {
			const headerRef = ref(null);
			const apollo = createMockApollo();
			function onLoadLendMenuData() {
				headerRef.value?.loadMenuData?.(apollo);
			}
			return {
				args: { ..._args }, headerRef, onLoadLendMenuData,
			};
		},
		provide: {
			$kvTrackEvent: (category, action, label) => {
				// eslint-disable-next-line no-console
				console.log(`${category}, ${action}, ${label}`);
			},
		},
		template: `
			<div class="tw-relative" :style="args.cssVars">
				<kv-www-header-basic
					ref="headerRef"
					v-bind="args"
					@load-lend-menu-data="onLoadLendMenuData"
				/>
				<kv-page-container>
					<p class="tw-py-2">Scroll content sits beneath the header. Hover Lend/About to open menus,
						focus search to trigger load-search-data, and resize below 734px for the mobile drawer.</p>
				</kv-page-container>
			</div>
		`,
	});
	template.args = args;
	return template;
};

export const Default = story({
	searchSuggestions: sampleSearchSuggestions,
	appOrigin: 'https://www.kiva.org',
});

export const LoggedIn = story({
	loggedIn: true,
	balance: 7,
	basketCount: 1,
	userId: 12345,
	lenderName: 'John Doe',
	lenderImageUrl: 'https://www.kiva.org/img/s100/26e15431f51b540f31cd9f011cc54f31.jpg',
	myDashboardUrl: '/mykiva',
	searchSuggestions: sampleSearchSuggestions,
	appOrigin: 'https://www.kiva.org',
});

export const LoadingUserData = story({
	loggedIn: true,
	userId: 12345,
	isUserDataLoading: true,
	isBasketDataLoading: true,
	searchSuggestions: sampleSearchSuggestions,
	appOrigin: 'https://www.kiva.org',
});

export const WithSearchSuggestions = story({
	searchSuggestions: sampleSearchSuggestions,
	appOrigin: 'https://www.kiva.org',
});
