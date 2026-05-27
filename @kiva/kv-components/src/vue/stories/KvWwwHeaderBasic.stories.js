import KvWwwHeaderBasic from '../KvWwwHeaderBasic/KvWwwHeaderBasic.vue';
import KvPageContainer from '../KvPageContainer.vue';

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
		setup() { return { args: { ..._args } }; },
		provide: {
			$kvTrackEvent: (category, action, label) => {
				// eslint-disable-next-line no-console
				console.log(`${category}, ${action}, ${label}`);
			},
		},
		template: `
			<div class="tw-relative" :style="args.cssVars">
				<kv-www-header-basic v-bind="args" />
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

export const Default = story();

export const LoggedIn = story({
	loggedIn: true,
	balance: 7,
	basketCount: 1,
	lenderName: 'John Doe',
	lenderImageUrl: 'https://www.kiva.org/img/s100/26e15431f51b540f31cd9f011cc54f31.jpg',
	myDashboardUrl: '/mykiva',
});

export const LoadingUserData = story({
	loggedIn: true,
	isUserDataLoading: true,
	isBasketDataLoading: true,
});

export const WithSearchSuggestions = story({
	searchSuggestions: [
		{ group: 'Countries and Territories', label: 'Philippines', query: 'country=29' },
		{ group: 'Countries and Territories', label: 'Peru', query: 'country=70' },
		{ group: 'Sectors', label: 'Agriculture', query: 'sector=1' },
	],
});
