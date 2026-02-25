import KvHeaderLinkBar from '../KvWwwHeader/KvHeaderLinkBar.vue';

export default {
	title: 'Page Frame/KvHeaderLinkBar',
	component: KvHeaderLinkBar,
};

const Template = (args) => ({
	components: { KvHeaderLinkBar },
	provide: {
		$kvTrackEvent: (category, action, label) => {
			// eslint-disable-next-line no-console
			console.log(`${category}, ${action}, ${label}`);
		},
	},
	setup() {
		return { args };
	},
	template: '<div :style="args.cssVars"><KvHeaderLinkBar v-bind="args" /></div>',
});

export const Default = Template.bind({});
Default.args = {};

export const WithBasket = Template.bind({});
WithBasket.args = {
	basketCount: 3,
};

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

export const BasketDataLoadingNoCount = Template.bind({});
BasketDataLoadingNoCount.args = {
	isBasketDataLoading: true,
	cssVars: {
		'--basket-display': 'none',
	},
};

export const BasketDataLoadingWithCount = Template.bind({});
BasketDataLoadingWithCount.args = {
	isBasketDataLoading: true,
	basketCount: 0,
};

export const UserDataLoadingNoAvatar = Template.bind({});
UserDataLoadingNoAvatar.args = {
	loggedIn: true,
	isUserDataLoading: true,
	cssVars: {
		'--user-avatar-display': 'none',
	},
};

export const UserDataLoadingWithAvatar = Template.bind({});
UserDataLoadingWithAvatar.args = {
	loggedIn: true,
	isUserDataLoading: true,
	cssVars: {
		'--user-avatar-legacy-display': 'none',
		'--user-avatar': 'url(https://www.kiva.org/img/s100/26e15431f51b540f31cd9f011cc54f31.webp) / "Lender avatar via CSS"',
	},
};

export const AllDataLoading = Template.bind({});
AllDataLoading.args = {
	loggedIn: true,
	isBasketDataLoading: true,
	isUserDataLoading: true,
	cssVars: {
		'--user-avatar-legacy-display': 'none',
		'--user-avatar': 'url(https://www.kiva.org/img/s100/26e15431f51b540f31cd9f011cc54f31.webp) / "Lender avatar via CSS"',
	},
};
