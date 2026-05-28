<template>
	<kv-theme-provider
		tag="div"
		class="tw-bg-primary"
	>
		<nav
			class="tw-font-medium tw-relative tw-border-b tw-border-tertiary"
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
						@item-hover="onItemHover"
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
					ref="menuPanelRef"
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
						:use-mobile-mega-menu="true"
						:app-origin="appOrigin"
						:search-suggestions="searchSuggestions"
						@load-lend-menu-data="emitLendMenuEvent"
						@load-search-data="$emit('load-search-data')"
						@search-submit="$emit('search-submit', $event)"
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
	ref, computed, onMounted, watch, nextTick,
} from 'vue';
import type { CSSProperties } from 'vue';
import KvThemeProvider from '#components/KvThemeProvider.vue';
import KvPageContainer from '#components/KvPageContainer.vue';
import { useBreakpoints } from '#utils/useBreakpoints';
import { useHeaderBasicMenuState } from '#utils/useHeaderBasicMenuState';
import LinkBar from './LinkBar.vue';

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
		const { isMobile, checkIsMobile } = useBreakpoints();
		const {
			menuOpen, menuComponent, menuItem, menuPosition, setMenu, markMounted,
		} = useHeaderBasicMenuState();

		const menuComponentInstance = ref<MenuInstance | null>(null);
		const menuPanelRef = ref<HTMLElement | null>(null);
		const avatarTriggerCenterX = ref<number | null>(null);
		const linksVisible = ref(true);

		const isMobileMenuActive = computed(() => menuComponentInstance.value?.$options?.name === 'MobileMenu');
		const isMyKivaMenuActive = computed(() => menuComponentInstance.value?.$options?.name === 'MyKivaMenu');
		const isAboutMenuActive = computed(() => menuComponentInstance.value?.$options?.name === 'AboutMenu');

		// Hamburger = full-screen drawer; MyKiva/About = constrained dropdowns that get a tertiary
		// border at md+ so the panel reads as a contained card flush with the nav-bar bottom border
		// (matches the legacy KvWwwHeader). Lend mega menu stays borderless.
		const menuPanelClass = computed(() => {
			if (isMobileMenuActive.value) return 'tw-w-full tw-min-h-dvh tw-rounded-none';
			if (isMyKivaMenuActive.value) return 'tw-w-auto tw-rounded-b tw-border tw-border-t-0 tw-border-tertiary';
			if (isAboutMenuActive.value) {
				return 'tw-w-full md:tw-w-auto tw-rounded-none !tw-rounded-b '
					+ 'md:tw-border md:tw-border-t-0 md:tw-border-tertiary';
			}
			return 'tw-w-full md:tw-w-auto tw-rounded-none !md:tw-rounded-b';
		});

		// LinkBar forwards the avatar's center-x as a 4th arg when opening MyKiva so we can
		// re-anchor the dropdown directly under the trigger once the panel renders. For every
		// other menu, triggerCenterX is null and the position passes through unchanged.
		function onItemHover(
			item?: string,
			menu?: unknown,
			position?: CSSProperties,
			triggerCenterX: number | null = null,
		): void {
			avatarTriggerCenterX.value = triggerCenterX;
			setMenu(item, menu, position);
		}

		// Once MyKiva mounts, measure the rendered panel and recompute `right` so the panel's
		// center sits under the avatar's center. `Math.max(0, …)` keeps the right edge inside
		// the viewport when the avatar is so close to the right that strict centering would
		// overflow — in that case the panel right-aligns to the viewport like the mobile drawer.
		watch(isMyKivaMenuActive, async (active) => {
			if (!active || avatarTriggerCenterX.value == null) return;
			await nextTick();
			const panel = menuPanelRef.value;
			if (!panel) return;
			const panelWidth = panel.offsetWidth;
			const center = avatarTriggerCenterX.value;
			const rightPx = Math.max(0, window.innerWidth - (center + panelWidth / 2));
			menuPosition.value = { right: `${rightPx}px`, position: 'absolute' };
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
			menuPanelRef,
			setMenu,
			onItemHover,
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
