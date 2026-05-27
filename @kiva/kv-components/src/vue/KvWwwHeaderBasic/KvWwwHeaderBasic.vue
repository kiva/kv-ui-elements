<template>
	<kv-theme-provider
		tag="div"
		class="tw-bg-primary"
	>
		<nav
			class="tw-font-medium tw-relative"
			:style="{ height: HEADER_HEIGHT }"
		>
			<kv-page-container class="tw-h-full">
				<transition name="header-fade">
					<link-bar
						v-show="linksVisible"
						:logged-in="loggedIn"
						:basket-count="basketCount"
						:balance="balance"
						:user-id="userId"
						:is-borrower="isBorrower"
						:is-trustee="isTrustee"
						:lender-name="lenderName"
						:lender-image-url="lenderImageUrl"
						:is-user-data-loading="isUserDataLoading"
						:is-basket-data-loading="isBasketDataLoading"
						:show-m-g-upsell-link="showMGUpsellLink"
						:login-url="loginUrl"
						:my-dashboard-url="myDashboardUrl"
						:countries-not-lent-to-url="countriesNotLentToUrl"
						:app-origin="appOrigin"
						:search-suggestions="searchSuggestions"
						:is-mobile="isMobile"
						:open-menu-item="menuComponent"
						@item-hover="setMenu"
						@load-search-data="$emit('load-search-data')"
						@search-submit="$emit('search-submit', $event)"
					/>
				</transition>
			</kv-page-container>
		</nav>
		<transition name="header-fade">
			<div
				v-show="menuOpen"
				class="
					tw-absolute tw-z-modal tw-h-full tw-inset-x-0
					tw-bg-eco-green-4 bg-opacity-50 tw-min-h-screen
				"
				:style="{ top: HEADER_HEIGHT }"
				@touchstart="handleOverlayClick"
			>
				<div
					class="tw-bg-primary tw-overflow-y-auto"
					:class="menuPanelClass"
					:style="{
						...menuPosition,
						maxHeight: !isMobileMenuActive ? `calc(100dvh - ${HEADER_HEIGHT})` : 'auto',
					}"
					@mouseenter="setMenu(menuItem, menuComponent)"
					@mouseleave="setMenu()"
				>
					<component
						:is="menuComponent"
						ref="menuComponentInstance"
						:logged-in="loggedIn"
						:login-url="loginUrl"
						:user-id="userId"
						:is-borrower="isBorrower"
						:is-trustee="isTrustee"
						:my-dashboard-url="myDashboardUrl"
						:show-m-g-upsell-link="showMGUpsellLink"
						:is-mobile="isMobile"
						:countries-not-lent-to-url="countriesNotLentToUrl"
						@load-lend-menu-data="emitLendMenuEvent"
						@closing-menu="setMenu()"
						@touchstart.stop
					/>
				</div>
			</div>
		</transition>
	</kv-theme-provider>
</template>

<script lang="ts">
import {
	ref, computed, onMounted,
} from 'vue';
import KvThemeProvider from '#components/KvThemeProvider.vue';
import KvPageContainer from '#components/KvPageContainer.vue';
import LinkBar from './LinkBar.vue';
import { useHeaderBasicBreakpoint } from './composables/useHeaderBasicBreakpoint';
import { useHeaderBasicMenuState } from './composables/useHeaderBasicMenuState';

const HEADER_HEIGHT = '4rem';

// Public instance shape of the active drawer menu (e.g. KvLendMenu exposes onLoad).
interface MenuInstance {
	$options?: { name?: string };
	// eslint-disable-next-line no-unused-vars
	onLoad?(apollo: unknown): void;
}

/**
 * Presentational global site header (Q4 2026 Figma desktop + KvWwwHeader mobile drawer paradigm).
 * Props in, events out: `load-lend-menu-data`, `load-search-data`, `search-submit`.
 */
export default {
	name: 'KvWwwHeaderBasic',
	components: {
		KvThemeProvider, KvPageContainer, LinkBar,
	},
	props: {
		loggedIn: { type: Boolean, default: false },
		basketCount: { type: Number, default: 0 },
		balance: { type: Number, default: 0 },
		userId: { type: Number, default: null },
		isBorrower: { type: Boolean, default: false },
		isTrustee: { type: Boolean, default: false },
		lenderName: { type: String, default: '' },
		lenderImageUrl: { type: String, default: '' },
		isUserDataLoading: { type: Boolean, default: false },
		isBasketDataLoading: { type: Boolean, default: false },
		showMGUpsellLink: { type: Boolean, default: false },
		loginUrl: { type: String, default: '/ui-login' },
		myDashboardUrl: { type: String, default: '/mykiva' },
		countriesNotLentToUrl: { type: String, default: '/lend/countries-not-lent' },
		appOrigin: { type: String, default: '' },
		searchSuggestions: { type: Array, default: () => [] },
	},
	emits: ['load-lend-menu-data', 'load-search-data', 'search-submit'],
	setup(_props, { emit }) {
		const { isMobile, checkIsMobile } = useHeaderBasicBreakpoint();
		const {
			menuOpen, menuComponent, menuItem, menuPosition, setMenu, markMounted,
		} = useHeaderBasicMenuState();

		const menuComponentInstance = ref<MenuInstance | null>(null);
		const linksVisible = ref(true);

		const isMobileMenuActive = computed(() => menuComponentInstance.value?.$options?.name === 'MobileMenu');
		const isMyKivaMenuActive = computed(() => menuComponentInstance.value?.$options?.name === 'MyKivaMenu');

		// Hamburger = full-screen drawer; MyKiva = constrained dropdown on every breakpoint
		// (right-aligned to its trigger via menuPosition); Lend/About stay full-width on mobile, auto at md+.
		const menuPanelClass = computed(() => {
			if (isMobileMenuActive.value) return 'tw-w-full tw-min-h-dvh tw-rounded-none';
			if (isMyKivaMenuActive.value) return 'tw-w-auto tw-rounded-b-sm';
			return 'tw-w-full md:tw-w-auto tw-rounded-none md:tw-rounded-b-sm';
		});

		function emitLendMenuEvent(): void {
			emit('load-lend-menu-data');
		}

		// Exposed so hosts can trigger the active menu's data fetch (matches KvWwwHeader's loadMenuData).
		function loadMenuData(apollo: unknown): void {
			menuComponentInstance.value?.onLoad?.(apollo);
		}

		function handleOverlayClick(): void {
			if (!isMobileMenuActive.value) {
				setMenu();
			}
		}

		onMounted(() => {
			checkIsMobile();
			markMounted();
		});

		return {
			HEADER_HEIGHT,
			linksVisible,
			isMobile,
			menuOpen,
			menuComponent,
			menuItem,
			menuPosition,
			isMobileMenuActive,
			menuPanelClass,
			menuComponentInstance,
			setMenu,
			handleOverlayClick,
			emitLendMenuEvent,
			loadMenuData,
		};
	},
};
</script>

<style lang="postcss" scoped>
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
