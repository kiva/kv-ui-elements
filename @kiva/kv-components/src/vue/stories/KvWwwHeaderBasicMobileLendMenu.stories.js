import MobileLendMenu from '../KvWwwHeaderBasic/MobileLendMenu/MobileLendMenu.vue';
import KvThemeProvider from '../KvThemeProvider.vue';

// Sample data that mirrors the shape KvLendMenu (data owner) emits to the panels.
const sampleCategories = [
	'Agriculture', 'Arts', 'Conflict zones', 'Eco-friendly', 'Education', 'Ending soon',
	'Food', 'Health', 'Kiva U.S.', 'Livestock', 'Matched loans', 'Short-term loans',
	'Single parents', 'Social Enterprises', 'Water and sanitation', 'Women',
].map((name) => ({ name, url: `/lend-by-category/${name.toLowerCase().replace(/[^a-z]+/g, '-')}` }));

// Region/country shape matches KvLendMenu.computed.regions (name + sorted countries with counts).
const sampleRegions = [
	{
		name: 'North America',
		countries: [
			{ isoCode: 'us', name: 'United States', count: 32 },
			{ isoCode: 'mx', name: 'Mexico', count: 14 },
		],
	},
	{
		name: 'Central America',
		countries: [
			{ isoCode: 'gt', name: 'Guatemala', count: 56 },
			{ isoCode: 'hn', name: 'Honduras', count: 28 },
			{ isoCode: 'sv', name: 'El Salvador', count: 21 },
			{ isoCode: 'ni', name: 'Nicaragua', count: 17 },
		],
	},
	{
		name: 'South America',
		countries: [
			{ isoCode: 'pe', name: 'Peru', count: 73 },
			{ isoCode: 'co', name: 'Colombia', count: 41 },
			{ isoCode: 'ec', name: 'Ecuador', count: 29 },
			{ isoCode: 'bo', name: 'Bolivia', count: 18 },
		],
	},
	{
		name: 'Africa',
		countries: [
			{ isoCode: 'ke', name: 'Kenya', count: 87 },
			{ isoCode: 'ug', name: 'Uganda', count: 41 },
			{ isoCode: 'rw', name: 'Rwanda', count: 33 },
			{ isoCode: 'tz', name: 'Tanzania', count: 24 },
			{ isoCode: 'sn', name: 'Senegal', count: 12 },
		],
	},
	{
		name: 'Eastern Europe',
		countries: [
			{ isoCode: 'md', name: 'Moldova', count: 19 },
			{ isoCode: 'ge', name: 'Georgia', count: 11 },
			{ isoCode: 'am', name: 'Armenia', count: 7 },
		],
	},
	{
		name: 'Middle East',
		countries: [
			{ isoCode: 'jo', name: 'Jordan', count: 23 },
			{ isoCode: 'lb', name: 'Lebanon', count: 14 },
			{ isoCode: 'pa', name: 'Palestine', count: 8 },
		],
	},
	{
		name: 'Asia',
		countries: [
			{ isoCode: 'ph', name: 'Philippines', count: 64 },
			{ isoCode: 'kh', name: 'Cambodia', count: 39 },
			{ isoCode: 'vn', name: 'Vietnam', count: 22 },
			{ isoCode: 'tj', name: 'Tajikistan', count: 16 },
		],
	},
	{
		name: 'Oceania',
		countries: [
			{ isoCode: 'sb', name: 'Solomon Islands', count: 5 },
			{ isoCode: 'ws', name: 'Samoa', count: 3 },
		],
	},
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

const sampleSavedSearches = [
	{ id: 1, name: 'Coffee farmers in Peru', url: '/lend/filter?country=70&sector=1' },
	{ id: 2, name: 'Women-led businesses in Kenya', url: '/lend/filter?country=42&gender=female' },
	{ id: 3, name: 'Education loans, short-term', url: '/lend/filter?sector=8&loanLimit=8' },
];

export default {
	title: 'Page Frame/KvWwwHeaderBasicMobileLendMenu',
	component: MobileLendMenu,
	argTypes: {
		userId: { control: { type: 'number' } },
		favorites: { control: { type: 'number' } },
		isChannelsLoading: { control: { type: 'boolean' } },
		isRegionsLoading: { control: { type: 'boolean' } },
	},
};

const Template = (args) => ({
	components: { MobileLendMenu, KvThemeProvider },
	provide: {
		$kvTrackEvent: (category, action, label) => {
			// eslint-disable-next-line no-console
			console.log(`${category}, ${action}, ${label}`);
		},
	},
	setup() {
		return { args };
	},
	methods: {
		onSubmit(payload) {
			// eslint-disable-next-line no-console
			console.log('search-submit', payload);
		},
	},
	// KvThemeProvider sets the CSS custom properties that tw-text-primary / tw-bg-primary resolve
	// against — without it, panel text reads as unstyled and the search popover background is
	// transparent. Min-height gives the absolute search popover room to render below the input.
	template: `
		<kv-theme-provider tag="div">
			<div
				class="tw-max-w-[24rem] tw-min-h-[40rem] tw-border tw-border-tertiary tw-rounded-sm tw-bg-primary"
			>
				<mobile-lend-menu v-bind="args" @search-submit="onSubmit" />
			</div>
		</kv-theme-provider>
	`,
});

export const LoggedOut = Template.bind({});
LoggedOut.args = {
	categories: sampleCategories,
	regions: sampleRegions,
	searchSuggestions: sampleSearchSuggestions,
	appOrigin: 'https://www.kiva.org',
};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
	categories: sampleCategories,
	regions: sampleRegions,
	searchSuggestions: sampleSearchSuggestions,
	appOrigin: 'https://www.kiva.org',
	userId: 12345,
	favorites: 8,
	searches: sampleSavedSearches,
};

export const Loading = Template.bind({});
Loading.args = {
	isChannelsLoading: true,
	isRegionsLoading: true,
	searchSuggestions: sampleSearchSuggestions,
	appOrigin: 'https://www.kiva.org',
};
