import KvWwwHeaderBasicLinkBar from '../KvWwwHeaderBasic/LinkBar.vue';

export default {
	title: 'Page Frame/KvWwwHeaderBasicLinkBar',
	component: KvWwwHeaderBasicLinkBar,
	argTypes: {
		loggedIn: { control: { type: 'boolean' } },
		basketCount: { control: { type: 'number' } },
		balance: { control: { type: 'number' } },
		isBorrower: { control: { type: 'boolean' } },
		isTrustee: { control: { type: 'boolean' } },
		lenderName: { control: { type: 'text' } },
		lenderImageUrl: { control: { type: 'text' } },
		isUserDataLoading: { control: { type: 'boolean' } },
		isBasketDataLoading: { control: { type: 'boolean' } },
		useEsiAvatar: { control: { type: 'boolean' } },
	},
};

const Template = (args) => ({
	components: { KvWwwHeaderBasicLinkBar },
	provide: {
		$kvTrackEvent: (category, action, label) => {
			// eslint-disable-next-line no-console
			console.log(`${category}, ${action}, ${label}`);
		},
	},
	setup() {
		return { args };
	},
	// tw-relative anchors the mobile (absolute, centered) logo; resize below 734px for the mobile bar.
	template: '<div class="tw-relative" :style="args.cssVars"><kv-www-header-basic-link-bar v-bind="args" /></div>',
});

export const Default = Template.bind({});
Default.args = {};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
	loggedIn: true,
	balance: 25.75,
	lenderName: 'John Doe',
	lenderImageUrl: 'https://www.kiva.org/img/s100/26e15431f51b540f31cd9f011cc54f31.webp',
};

export const LoggedInDefaultAvatarImage = Template.bind({});
LoggedInDefaultAvatarImage.args = {
	loggedIn: true,
	balance: 25.75,
	lenderName: 'John Doe',
	// A monolith-era default filename is not a custom image, so the avatar icon wins over it.
	lenderImageUrl: 'https://www.kiva.org/img/s100/726677.webp',
};

export const LoggedInNoAvatar = Template.bind({});
LoggedInNoAvatar.args = {
	loggedIn: true,
	balance: 25.75,
	lenderName: 'John Doe',
	lenderImageUrl: '',
};

export const LoggedInWithBasket = Template.bind({});
LoggedInWithBasket.args = {
	loggedIn: true,
	basketCount: 3,
	balance: 25.75,
	lenderName: 'John Doe',
	lenderImageUrl: 'https://www.kiva.org/img/s100/26e15431f51b540f31cd9f011cc54f31.webp',
};

export const UserDataLoading = Template.bind({});
UserDataLoading.args = {
	loggedIn: true,
	isUserDataLoading: true,
};

export const BasketDataLoading = Template.bind({});
BasketDataLoading.args = {
	loggedIn: true,
	isBasketDataLoading: true,
};

export const AllDataLoading = Template.bind({});
AllDataLoading.args = {
	loggedIn: true,
	isUserDataLoading: true,
	isBasketDataLoading: true,
};

export const EsiEmptyBasketSuppressed = Template.bind({});
EsiEmptyBasketSuppressed.args = {
	loggedIn: false,
	isBasketDataLoading: true,
	cssVars: { '--basket-display': 'none' },
};

export const EsiLoggedOutOnStaleShell = Template.bind({});
EsiLoggedOutOnStaleShell.args = {
	loggedIn: true,
	isUserDataLoading: true,
	cssVars: { '--user-loading-display': 'none' },
};
EsiLoggedOutOnStaleShell.parameters = {
	docs: {
		description: {
			story: `A CDN shell filled by a logged-in visitor, served to someone ESI knows is logged out.
			\`--user-loading-display: none\` suppresses the balance and avatar cluster, which is what this
			story exists to prove.

			**Expect no auth affordance at all here — no cluster, and no Log in link.** That is correct,
			not a gap in the story. Log in is \`v-if="!loggedIn"\`, and \`loggedIn\` is the stale cache hint,
			still true; Borrow drops out for the same reason. Hydration corrects it a moment later, when
			\`headerData\` returns \`my: null\`.

			Revealing Log in here would mean always rendering it and gating it on a variable, inverting the
			emit-only-\`none\` convention: default it visible and every genuinely logged-in visitor sees Log
			in until hydration. Considered and rejected as decision D4 — a stale-true login hint would
			withhold the login affordance from someone who needs it. The alternative to suppressing the
			cluster is showing this visitor a stranger's balance, so an empty moment is the better of the
			two states available before hydration.

			Mostly a cms-page-server state: CPS bridges \`--user-loading-display\` from
			\`--header-balance-display\`, emitted only in its logged-out branch. In \`ui\` the bridge is live
			on \`/ui-site-map\` alone.`,
		},
	},
};

export const EsiAvatarReal = Template.bind({});
EsiAvatarReal.args = {
	loggedIn: true,
	isUserDataLoading: true,
	useEsiAvatar: true,
	cssVars: {
		'--user-avatar-legacy-display': 'none',
		'--user-avatar': 'url(https://www.kiva.org/img/s100/26e15431f51b540f31cd9f011cc54f31.webp) / "Lender avatar via CSS"',
	},
};

export const EsiAvatarIcon = Template.bind({});
EsiAvatarIcon.args = {
	loggedIn: true,
	isUserDataLoading: true,
	useEsiAvatar: true,
	cssVars: { '--user-avatar-display': 'none' },
};
