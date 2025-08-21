<template>
	<kv-theme-provider
		tag="div"
		class="tw-border-b tw-border-tertiary"
	>
		<nav
			class="
				header-margins
				tw-relative
				tw-py-1 tw-px-1.5
				tw-font-medium
			"
			style="height: 3.75rem;"
		>
			<!-- link bar -->
			<transition
				name="header-fade"
			>
				<kv-header-link-bar
					v-show="linksVisible"
					:logged-in="loggedIn"
					:basket-count="basketCount"
					:login-url="loginUrl"
					:open-menu-item="menuComponent"
					:my-dashboard-url="myDashboardUrl"
					:lender-name="lenderName"
					:lender-image-url="lenderImageUrl"
					:is-mobile="isMobile"
					@item-hover="onHover"
				/>
			</transition>
			<!-- logo -->
			<a
				v-kv-track-event="['TopNav', 'click-Logo']"
				href="/"
				class="
					tw-px-1 tw-py-2
					tw-cursor-pointer
					tw-absolute
					tw-top-1/2 tw-left-1/2
					tw--translate-y-1/2 tw--translate-x-1/2
					tw-transition-all tw-duration-300
				"
			>
				<kv-header-logo />
			</a>
		</nav>
		<!-- menu drawer -->
		<transition
			name="header-fade"
		>
			<div
				v-show="menuOpen"
				class="
					tw-absolute tw-z-modal
					tw-h-full tw-inset-x-0
					tw-bg-eco-green-4
					bg-opacity-50 tw-min-h-screen
				"
				style="top: 3.75rem;"
			>
				<div
					class="tw-bg-primary"
					:style="menuPosition"
					@mouseover="onHover(activeHeaderItem, menuComponent)"
					@mouseout="onHover()"
				>
					<div class="header-margins tw-px-2.5">
						<component
							:is="menuComponent"
							ref="menuComponentInstance"
							:logged-in="loggedIn"
							:login-url="loginUrl"
							:user-id="userId"
							:balance="balance"
							:is-borrower="isBorrower"
							:is-trustee="isTrustee"
							:my-dashboard-url="myDashboardUrl"
							@load-lend-menu-data="emitLendMenuEvent"
						/>
					</div>
				</div>
			</div>
		</transition>
	</kv-theme-provider>
</template>

<script>
import { ref, shallowRef } from 'vue';
import KvHeaderLinkBar from './KvWwwHeader/KvHeaderLinkBar.vue';
import KvHeaderLogo from './KvWwwHeader/KvHeaderLogo.vue';
import KvThemeProvider from './KvThemeProvider.vue';

export default {
	components: {
		KvHeaderLinkBar,
		KvHeaderLogo,
		KvThemeProvider,
	},
	props: {
		loggedIn: {
			type: Boolean,
			default: false,
		},
		basketCount: {
			type: Number,
			default: 0,
		},
		loginUrl: {
			type: String,
			default: '/ui-login',
		},
		balance: {
			type: Number,
			default: 0,
		},
		isBorrower: {
			type: Boolean,
			default: false,
		},
		isTrustee: {
			type: Boolean,
			default: false,
		},
		userId: {
			type: Number,
			default: null,
		},
		myDashboardUrl: {
			type: String,
			default: '/mykiva',
		},
		lenderName: {
			type: String,
			default: '',
		},
		lenderImageUrl: {
			type: String,
			default: '',
		},
		isMobile: {
			type: Boolean,
			default: false,
		},
	},
	emits: [
		'load-lend-menu-data',
	],
	setup(props, { emit }) {
		const linksVisible = ref(true);
		const activeHeaderItem = ref(null);
		const menuOpen = ref(false);
		const menuComponent = shallowRef(null);
		const menuComponentInstance = ref(null);
		const menuPosition = ref({ left: 0, position: 'relative' });

		let menuCloseTimeout;

		const onHover = (item, menu, targetPosition) => {
			// if menu, open menu, and clear timeout
			// if no menu and menu open, start close menu timeout
			if (menu) {
				clearTimeout(menuCloseTimeout);
				// Avoid calculate menuPosition when hovering over the menu
				if (menuComponent.value !== menu) {
					menuPosition.value = { left: 0, position: 'relative' };
				}
				menuComponent.value = menu;
				menuOpen.value = true;

				if (targetPosition) {
					menuPosition.value = {
						...targetPosition,
						position: 'absolute',
					};
				}
			} else if (menuOpen.value) {
				menuCloseTimeout = setTimeout(() => {
					menuOpen.value = false;
					menuComponent.value = null;
				}, 200);
			}
		};

		const loadMenuData = (apollo) => {
			menuComponentInstance.value?.onLoad(apollo);
		};

		// This event will be used as a signal to call loadMenuData
		const emitLendMenuEvent = () => {
			emit('load-lend-menu-data');
		};

		return {
			emitLendMenuEvent,

			linksVisible,
			menuOpen,

			onHover,
			loadMenuData,

			activeHeaderItem,
			menuComponent,
			menuComponentInstance,
			menuPosition,
		};
	},
};
</script>

<style lang="postcss" scoped>
.header-margins {
	margin: 0 auto;
	max-width: 1400px;
}

.header-fade-enter-active {
	@apply tw-transition-opacity tw-duration-300;
}
.header-fade-leave-active {
	@apply tw-transition-opacity tw-duration-100;
}
.header-fade-enter,
.header-fade-leave-to {
	@apply tw-opacity-0;
}
.header-fade-leave,
.header-fade-enter-to {
	@apply tw-opacity-full;
}

.bg-opacity-50 {
	background-color: rgba(var(--bg-action-highlight), 0.5);
}
</style>
