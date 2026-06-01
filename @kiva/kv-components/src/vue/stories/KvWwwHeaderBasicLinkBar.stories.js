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

export const LoggedInNoAvatar = Template.bind({});
LoggedInNoAvatar.args = {
	loggedIn: true,
	balance: 25.75,
	lenderName: 'John Doe',
	// Legacy placeholder filename → KvUserAvatar falls back to the lender's initial.
	lenderImageUrl: 'https://www.kiva.org/img/s100/726677.webp',
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
