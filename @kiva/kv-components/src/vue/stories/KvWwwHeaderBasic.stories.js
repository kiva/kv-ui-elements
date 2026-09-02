import { ref } from 'vue';
import { userEvent, waitFor, within } from 'storybook/test'; // eslint-disable-line import/no-extraneous-dependencies
import KvWwwHeaderBasic from '../KvWwwHeaderBasic/KvWwwHeaderBasic.vue';
import KvPageContainer from '../KvPageContainer.vue';

// ── Mock data ──────────────────────────────────────────────────────────────────
// KvLendMenu fetches categories/regions/saved-searches via Apollo when the host calls
// `header.loadMenuData(apollo)`. Storybook has no Apollo client, so we mock the surface area
// KvLendMenu touches (watchQuery + query) and return canned data. Lets the mobile Lend menu
// (Categories / Regions / MyKiva / Search) render with real-looking content.

// The names, ids and server-side order below mirror what `browsingCategories` returns on dev.
// Category url is later rewritten by KvLendMenu's `replace('lend', 'lend-by-category')`, so these
// urls intentionally start with `/lend/…` rather than the absolute urls the real field returns.
const sampleCategories = [
	['41062ad7-9584-470c-bcf8-9b9fddc1e783', 'Agriculture', 'agriculture'],
	['7c25e6b5-8919-4916-ad8a-d624474141ef', 'Education', 'education'],
	['04d3fe55-280e-487c-92e5-47fdd62d11ed', 'Refugees and IDPs', 'refugees-and-i-d-ps'],
	['ad99c36e-720f-4b7d-87ac-bc7541f7b63f', 'Eco-friendly', 'eco-friendly'],
	['18df676d-db88-47db-a733-c346514787d9', 'Kiva U.S.', 'kiva-u-s'],
	['8506e950-a279-4a00-9649-b68534bec512', 'Livestock', 'livestock'],
	['e54a756c-b2b0-41e7-919b-aab8ec7e3cc4', 'Arts', 'arts'],
	['82d2a4cc-e3f3-4d9b-a9da-9ced331bb59b', 'Ending soon', 'ending-soon'],
	['e57c64a5-2edb-4bd0-8b21-833d9b748e2a', 'Women', 'women'],
	['b0cad297-4915-4ec2-a9ea-74ce828394e7', 'Single parents', 'single-parents'],
	['5d0e030b-d5f6-4b8c-bd1c-0df901fb365d', 'Health', 'health'],
	['8559feb6-44cd-4165-b909-a3652c36ca78', 'Food', 'food'],
	['b9784bb1-ca9a-4f9a-acb0-2c142ab2ab80', 'Water and sanitation', 'water-and-sanitation'],
	['e895e77c-dc80-4052-9e92-874e9ebbbd20', 'Conflict zones', 'conflict-zones'],
	['98c96462-61d9-4c5c-82a1-259c5b4f349c', 'Social Enterprises', 'social-enterprises'],
	['077c95c1-9381-45f4-9f81-0b5c6180a22c', 'Short-term loans', 'short-term-loans'],
	['5b43ab35-56ca-483e-8468-4f78a57dfcac', 'Matched loans', 'matched-loans'],
].map(([id, name, slug]) => ({ id, name, url: `/lend/${slug}` }));

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
			} else if (body.includes('browsingCategories')) {
				data = { browsingCategories: { values: sampleCategories } };
			}
			return {
				subscribe: ({ next }) => {
					// Microtask delay so the loading placeholders flash before content arrives.
					setTimeout(() => next({ data }), 0);
					return { unsubscribe: () => {} };
				},
			};
		},
		query: ({ query } = {}) => {
			const body = query?.loc?.source?.body ?? '';
			if (body.includes('loanSearchSuggestions')) {
				return Promise.resolve({
					data: { lend: { loanSearchSuggestions: sampleSearchSuggestions } },
				});
			}
			return Promise.resolve({
				data: {
					lend: { loans: { totalCount: favoritesTotal } },
					my: { savedSearches: { values: savedSearches } },
				},
			});
		},
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
		trusteeId: { control: { type: 'number' } },
		mostRecentBorrowedLoanId: { control: { type: 'number' } },
		lenderName: { control: { type: 'text' } },
		lenderImageUrl: { control: { type: 'text' } },
		isBasketDataLoading: { control: { type: 'boolean' } },
		isUserDataLoading: { control: { type: 'boolean' } },
		useEsiAvatar: { control: { type: 'boolean' } },
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
			function onLoadSearchData() {
				// apollo comes from the story's own scope; the load-search-data event carries no payload.
				headerRef.value?.loadSearchSuggestions?.(apollo);
			}
			return {
				args: { ..._args }, headerRef, onLoadLendMenuData, onLoadSearchData,
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
					@load-search-data="onLoadSearchData"
				/>
				<kv-page-container>
					<p class="tw-py-2">Scroll content sits beneath the header. Three breakpoint states to exercise:
						mobile (&lt; 734px) shows the hamburger drawer and tabbed Lend mega menu;
						tablet (734–991px) shows a two-row layout with search on its own full-width row and
						the legacy KvLendListMenu;
						desktop (≥ 992px) is a single row with inline search and the KvLendMegaMenu.</p>
				</kv-page-container>

				<kv-page-container>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam molestie tellus quis auctor luctus. Fusce consequat sit amet tortor sit amet euismod. Proin finibus blandit tortor scelerisque facilisis. Duis in euismod justo. Nam efficitur eu metus quis cursus. Duis a ligula nisi. Duis ligula eros, pharetra interdum malesuada vitae, feugiat quis ligula. Fusce non vestibulum elit, sed vehicula augue. Sed tellus dui, vestibulum in gravida eget, gravida a arcu. Duis sed sapien cursus velit bibendum auctor non a eros. Donec libero odio, fermentum faucibus justo vel, efficitur malesuada velit. Morbi odio ligula, congue id odio in, ornare bibendum turpis. Nunc consectetur imperdiet rutrum. Ut posuere turpis ac lacinia finibus. Proin velit arcu, ultrices vitae lacinia quis, tincidunt at justo.</p>
					<br>
					<p>Morbi volutpat eget enim eu tristique. Suspendisse potenti. Vivamus mollis purus magna, nec suscipit purus tempor id. Nulla porta ipsum sit amet sollicitudin accumsan. Cras pulvinar fringilla ullamcorper. Praesent sit amet sapien metus. Morbi volutpat tortor sed eros mattis ultricies. Duis convallis finibus lacus, a tempus felis pretium in. Ut eu est sem. Ut auctor ullamcorper dignissim. Praesent quis ullamcorper dui, ac sodales mi. Nullam volutpat augue vulputate congue suscipit. Praesent consectetur sem libero, id pharetra urna porttitor nec. Praesent vitae orci neque. Nam a diam orci.</p>
					<br>
					<p>Integer ultrices eros non libero volutpat congue. Mauris tortor sapien, eleifend sed tortor id, interdum laoreet purus. Quisque eget velit eget odio aliquet iaculis. Nam sagittis enim sit amet tellus euismod, vitae semper odio ullamcorper. Vestibulum vel placerat mauris. Nunc vitae orci ut felis euismod semper. Nunc eget luctus turpis. Integer semper, libero eu cursus imperdiet, purus nisl interdum leo, vitae tempor ipsum arcu a elit. Phasellus interdum bibendum dui, sed sagittis massa. Integer orci leo, sollicitudin quis tellus at, pellentesque egestas enim. Donec consectetur diam rhoncus justo venenatis facilisis. Ut sapien nisl, posuere vitae vulputate vel, aliquam vitae ex. Ut imperdiet sagittis mollis. Quisque urna dolor, viverra eu posuere ac, iaculis malesuada ex. Suspendisse id volutpat risus.</p>
					<br>
					<p>Suspendisse porta eget lectus ac aliquet. In diam tellus, fermentum ac lacus egestas, pharetra eleifend mi. Aliquam arcu libero, dictum at commodo non, laoreet eu nibh. Aliquam blandit fermentum mi vel lacinia. Quisque varius libero in tempus viverra. Quisque vel felis velit. In dapibus magna eu venenatis imperdiet. Pellentesque interdum hendrerit enim et eleifend. Integer vitae quam vitae tortor ornare finibus ut nec lacus. Morbi at orci lacus.</p>
					<br>
					<p>Nunc efficitur accumsan finibus. Pellentesque fermentum dui in tincidunt hendrerit. Integer faucibus sit amet nunc id faucibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin congue nisi eget neque suscipit, sit amet sagittis orci tempus. Maecenas porttitor ipsum in commodo rhoncus. Etiam condimentum euismod nulla sit amet vestibulum.</p>
					<br>
					<p>Vivamus non lobortis massa. Vivamus condimentum ligula et dolor venenatis dictum. Praesent pharetra libero ipsum, vel gravida lectus dictum eget. Vivamus lobortis elementum ante eget sodales. Suspendisse fermentum faucibus porta. Quisque finibus arcu commodo justo lobortis, et dignissim libero laoreet. Integer id diam augue. Mauris finibus consectetur leo, nec lobortis ligula facilisis scelerisque. Maecenas aliquet id nisi non fermentum. Phasellus quis erat imperdiet, molestie elit ac, fringilla quam. Praesent ut nulla nec nibh luctus tempor.</p>
					<p>Suspendisse potenti. Cras sed cursus neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse placerat ac ligula ut rhoncus. Fusce mollis, metus vitae laoreet condimentum, augue justo dignissim leo, in vestibulum neque justo a arcu. Aliquam vestibulum tempus faucibus. Aliquam at nisl ligula. Integer dui sem, tempus et volutpat ut, pulvinar id tortor. Integer in nisl at nunc accumsan fermentum venenatis a felis. Morbi tincidunt dictum malesuada. Fusce non mauris eget nulla fermentum mollis vitae eget diam. Sed efficitur justo eget elit semper lacinia. Donec nibh metus, condimentum sit amet sapien at, pellentesque faucibus enim. Pellentesque enim diam, scelerisque id consequat nec, mollis eu libero. In semper elementum dolor ut vehicula.</p>
					<p>Phasellus dapibus, purus a aliquet ullamcorper, mi ante malesuada nunc, tempor iaculis arcu metus nec risus. Maecenas ullamcorper velit eget bibendum euismod. Aliquam pretium varius arcu luctus molestie. Mauris metus elit, sollicitudin vitae ipsum a, molestie ornare diam. Nulla facilisi. Ut at interdum libero. Sed feugiat, dolor in porttitor ultrices, mauris dui pulvinar ligula, ultrices egestas leo felis non mi. Nullam ligula nibh, fringilla ac metus sit amet, egestas mollis nunc. Fusce vulputate tempor semper. Integer rutrum volutpat metus, et porttitor eros euismod sit amet. Vestibulum finibus, nisl efficitur pretium maximus, massa velit posuere nulla, vehicula facilisis eros justo in arcu. Sed imperdiet justo varius ligula egestas, eget elementum massa feugiat. Pellentesque eu mauris tellus. Donec eu risus id quam malesuada facilisis. Vestibulum nibh elit, pellentesque in lacinia sed, fringilla sed est. Suspendisse vulputate lacus purus, quis dapibus libero hendrerit eu.</p>
					<p>Donec eu dignissim risus. Donec vestibulum erat non mollis efficitur. Fusce justo leo, cursus vel tristique a, consectetur sed ligula. Vivamus egestas leo sed nisi ultricies, eu pharetra mauris hendrerit. Duis quis vulputate est. Quisque fringilla finibus diam, at laoreet tellus tincidunt ut. Praesent rhoncus, sem ut condimentum ultrices, sem arcu condimentum velit, eget gravida lorem felis vitae est.</p>
					<p>Etiam ut fermentum enim, ac dignissim lorem. Mauris pretium posuere nisl in accumsan. Ut sollicitudin aliquet sem ac tempor. Mauris ac sagittis odio. Duis in pulvinar sapien. Nulla ut dui vel lorem feugiat finibus non non quam. Etiam vitae velit vel elit bibendum vulputate. Nulla placerat purus eu tincidunt tincidunt. Praesent non porttitor velit. Nam eu egestas tellus. Quisque iaculis arcu sem, quis sodales libero molestie eget. Phasellus efficitur, purus posuere rutrum tristique, urna urna aliquet odio, vel tincidunt odio justo ac turpis. Pellentesque nec dui nec tellus consectetur dapibus nec non sapien.</p>
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

// Same loading state as LoadingUserData, but opted into the ESI avatar — so the pair is the proof
// that useEsiAvatar reaches LinkBar through this component. It did not until CIT-5084; the prop was
// declared on the child only, and the ESI stories all lived on KvWwwHeaderBasicLinkBar, which is why
// nothing showed the gap. Compare the two: grey circle here, the lender's avatar there.
const ESI_AVATAR = 'url(https://www.kiva.org/img/s100/26e15431f51b540f31cd9f011cc54f31.webp)';

export const EsiAvatarLoading = story({
	loggedIn: true,
	userId: 12345,
	isUserDataLoading: true,
	useEsiAvatar: true,
	cssVars: {
		'--user-avatar-legacy-display': 'none',
		'--user-avatar': `${ESI_AVATAR} / "Lender avatar via CSS"`,
	},
	searchSuggestions: sampleSearchSuggestions,
	appOrigin: 'https://www.kiva.org',
});

export const WithSearchSuggestions = story({
	searchSuggestions: sampleSearchSuggestions,
	appOrigin: 'https://www.kiva.org',
});

export const Borrower = story({
	loggedIn: true,
	balance: 7,
	userId: 12345,
	lenderName: 'John Doe',
	lenderImageUrl: 'https://www.kiva.org/img/s100/26e15431f51b540f31cd9f011cc54f31.jpg',
	isBorrower: true,
	mostRecentBorrowedLoanId: 2599133,
	searchSuggestions: sampleSearchSuggestions,
	appOrigin: 'https://www.kiva.org',
});

export const Trustee = story({
	loggedIn: true,
	balance: 7,
	userId: 12345,
	lenderName: 'John Doe',
	lenderImageUrl: 'https://www.kiva.org/img/s100/26e15431f51b540f31cd9f011cc54f31.jpg',
	isTrustee: true,
	trusteeId: 4321,
	searchSuggestions: sampleSearchSuggestions,
	appOrigin: 'https://www.kiva.org',
});

export const TrusteeAndBorrower = story({
	loggedIn: true,
	balance: 7,
	userId: 12345,
	lenderName: 'John Doe',
	lenderImageUrl: 'https://www.kiva.org/img/s100/26e15431f51b540f31cd9f011cc54f31.jpg',
	isBorrower: true,
	mostRecentBorrowedLoanId: 2599133,
	isTrustee: true,
	trusteeId: 4321,
	searchSuggestions: sampleSearchSuggestions,
	appOrigin: 'https://www.kiva.org',
});

// appOrigin intentionally omitted: the header derives it from window.location.origin on mount.
export const WindowDerivedOrigin = story({
	loggedIn: true,
	balance: 7,
	userId: 12345,
	lenderName: 'John Doe',
	lenderImageUrl: 'https://www.kiva.org/img/s100/26e15431f51b540f31cd9f011cc54f31.jpg',
	searchSuggestions: sampleSearchSuggestions,
});

// ── Open-menu stories ──────────────────────────────────────────────────────────
// Each play clicks a trigger and waits for its identified panel to render the given text, so the
// Chromatic snapshot captures the menu open in place.
const openMenuPlay = (getTrigger, panelSelector, readyText) => async ({ canvasElement }) => {
	await userEvent.click(getTrigger(within(canvasElement)));
	await waitFor(() => {
		const panel = canvasElement.querySelector(panelSelector);
		if (!panel?.textContent?.includes(readyText)) throw new Error(`${panelSelector} not ready`);
	});
};

export const LendMenuOpen = story({
	searchSuggestions: sampleSearchSuggestions,
	appOrigin: 'https://www.kiva.org',
});
LendMenuOpen.play = openMenuPlay(
	(canvas) => canvas.getByLabelText('Lend menu'),
	'#header-basic-menu-lend',
	'Agriculture',
);

export const AboutMenuOpen = story({
	searchSuggestions: sampleSearchSuggestions,
	appOrigin: 'https://www.kiva.org',
});
AboutMenuOpen.play = openMenuPlay(
	(canvas) => canvas.getByRole('button', { name: /about/i }),
	'#header-basic-menu-about',
	'How Kiva works',
);

export const MyKivaMenuOpen = story({
	loggedIn: true,
	balance: 7,
	basketCount: 1,
	userId: 12345,
	lenderName: 'John Doe',
	lenderImageUrl: 'https://www.kiva.org/img/s100/26e15431f51b540f31cd9f011cc54f31.jpg',
	searchSuggestions: sampleSearchSuggestions,
	appOrigin: 'https://www.kiva.org',
});
MyKivaMenuOpen.play = openMenuPlay(
	(canvas) => canvas.getByLabelText('My Kiva menu'),
	'#header-basic-menu-my-kiva',
	'Portfolio',
);

export const MobileDrawerOpen = story({
	searchSuggestions: sampleSearchSuggestions,
	appOrigin: 'https://www.kiva.org',
});
MobileDrawerOpen.parameters = {
	viewport: { defaultViewport: 'mobile1' },
	chromatic: { viewports: [375] },
};
MobileDrawerOpen.play = openMenuPlay(
	(canvas) => canvas.getByLabelText('Open menu'),
	'#header-basic-menu-drawer',
	'Partner with us',
);
