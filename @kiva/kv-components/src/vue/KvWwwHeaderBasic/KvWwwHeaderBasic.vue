<template>
	<kv-theme-provider
		tag="div"
		class="tw-bg-primary"
	>
		<nav
			ref="navRef"
			class="tw-font-medium tw-relative"
			:style="{ minHeight: MIN_HEADER_HEIGHT }"
		>
			<kv-page-container>
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
						:app-origin="resolvedAppOrigin"
						:search-suggestions="effectiveSuggestions"
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
				:style="{ top: navHeight }"
				@touchstart="handleOverlayClick"
			>
				<div
					ref="menuPanelRef"
					class="tw-bg-primary tw-overflow-y-auto"
					:class="menuPanelClass"
					:style="{
						...menuPosition,
						maxHeight: !isMobileMenuActive ? `calc(100dvh - ${navHeight})` : 'auto',
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
						:trustee-id="trusteeId"
						:most-recent-borrowed-loan-id="mostRecentBorrowedLoanId"
						:my-dashboard-url="myDashboardUrl"
						:show-m-g-upsell-link="showMGUpsellLink"
						:is-mobile="isMobile"
						:countries-not-lent-to-url="countriesNotLentToUrl"
						:use-mobile-mega-menu="true"
						:app-origin="resolvedAppOrigin"
						:search-suggestions="effectiveSuggestions"
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
	ref, computed, onMounted, onBeforeUnmount, watch, nextTick,
} from 'vue';
import type { CSSProperties } from 'vue';
import { gql } from '@apollo/client/core';
import KvThemeProvider from '#components/KvThemeProvider.vue';
import KvPageContainer from '#components/KvPageContainer.vue';
import { useBreakpoints } from '#utils/useBreakpoints';
import { useHeaderBasicMenuState } from '#utils/useHeaderBasicMenuState';
import type { SearchSuggestion } from '#utils/typeaheadSearchEngine';
import LinkBar from './LinkBar.vue';

// `min-height` initial — the tablet two-row layout grows the nav vertically, so the actual
// rendered height is measured at runtime (see navHeight + ResizeObserver below). Used to size
// the dropdown overlay's `top` and the panel's `max-height`.
const MIN_HEADER_HEIGHT = '4rem';

// Loan search-suggestion dataset for the header search bar. Fetched on demand via the exposed
// loadSearchSuggestions(apollo) method (mirrors KvLendMenu's loadMenuData paradigm); the host
// wires it to @load-search-data and still owns navigation on @search-submit.
const LOAN_SEARCH_SUGGESTIONS_QUERY = gql`
	query loanSearchSuggestions {
		lend {
			loanSearchSuggestions {
				group
				label
				query
			}
		}
	}
`;

// Public instance shape of the active drawer menu (e.g. KvLendMenu exposes onLoad).
interface MenuInstance {
	$options?: { name?: string };
	// eslint-disable-next-line no-unused-vars
	onLoad?(apollo: unknown): void;
}

// Minimal shape of the Apollo client the host passes in; only `query` is used here.
interface ApolloClientLike {
	// eslint-disable-next-line no-unused-vars
	query(options: unknown): Promise<{ data?: unknown }>;
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
		searchSuggestions: { type: Array as () => SearchSuggestion[], default: () => [] },
		trusteeId: { type: Number, default: null },
		mostRecentBorrowedLoanId: { type: Number, default: null },
	},
	emits: ['load-lend-menu-data', 'load-search-data', 'search-submit'],
	setup(props, { emit }) {
		const { isMobile, checkIsMobile } = useBreakpoints();
		const {
			menuOpen, menuComponent, menuItem, menuPosition, setMenu, markMounted, pinMenuOpen,
		} = useHeaderBasicMenuState();

		const menuComponentInstance = ref<MenuInstance | null>(null);
		const menuPanelRef = ref<HTMLElement | null>(null);
		const navRef = ref<HTMLElement | null>(null);
		const navHeight = ref<string>(MIN_HEADER_HEIGHT);
		const avatarTriggerCenterX = ref<number | null>(null);
		const linksVisible = ref(true);
		// appOrigin override falls back to the page origin (resolved after mount; SSR-safe because
		// search navigation is client-side). Hosts may stop passing :app-origin with no behavior change.
		const resolvedAppOrigin = ref(props.appOrigin);
		let navResizeObserver: ResizeObserver | null = null;

		const fetchedSuggestions = ref<SearchSuggestion[]>([]);
		let searchDataRequested = false;

		// Prefer fetched suggestions once loaded; otherwise fall back to the host-passed prop so
		// the header keeps working for hosts that haven't moved to loadSearchSuggestions yet.
		const effectiveSuggestions = computed<SearchSuggestion[]>(
			() => (fetchedSuggestions.value.length ? fetchedSuggestions.value : props.searchSuggestions),
		);

		const isMobileMenuActive = computed(() => menuComponentInstance.value?.$options?.name === 'MobileMenu');
		const isMyKivaMenuActive = computed(() => menuComponentInstance.value?.$options?.name === 'MyKivaMenu');
		const isAboutMenuActive = computed(() => menuComponentInstance.value?.$options?.name === 'AboutMenu');

		// Hamburger = full-screen drawer; MyKiva/About = constrained dropdowns that get a tertiary
		// border at md+ so the panel reads as a contained card; the nav itself no longer draws a
		// bottom border (the host owns it). Lend mega menu stays borderless.
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
		// apollo stays `unknown` here: loadMenuData only forwards the opaque client to the active
		// menu's onLoad; unlike loadSearchSuggestions it never calls query() on it directly.
		function loadMenuData(apollo: unknown): void {
			menuComponentInstance.value?.onLoad?.(apollo);
		}

		// Exposed so hosts can trigger the search-suggestion fetch (matches loadMenuData). Run-once.
		async function loadSearchSuggestions(apollo: ApolloClientLike): Promise<void> {
			if (searchDataRequested) return;
			searchDataRequested = true;
			try {
				const { data } = await apollo.query({ query: LOAN_SEARCH_SUGGESTIONS_QUERY });
				const raw = (data as { lend?: { loanSearchSuggestions?: Array<SearchSuggestion | null> } })
					?.lend?.loanSearchSuggestions ?? [];
				fetchedSuggestions.value = raw
					.filter((s): s is SearchSuggestion => !!s)
					.map((s) => ({ group: s.group ?? '', label: s.label ?? '', query: s.query ?? undefined }));
			} catch {
				// Reset the run-once guard so a later focus can retry; the searchSuggestions prop
				// fallback keeps the search bar working in the meantime.
				searchDataRequested = false;
			}
		}

		function handleOverlayClick(): void {
			if (!isMobileMenuActive.value) {
				setMenu();
			}
		}

		onMounted(() => {
			if (!props.appOrigin && typeof window !== 'undefined') {
				resolvedAppOrigin.value = window.location.origin;
			}
			checkIsMobile();
			markMounted();
			// Track the rendered nav height so the dropdown overlay drops below the actual nav
			// (4rem at mobile/desktop, ≈7rem at tablet because of the wrapped search row).
			if (navRef.value && typeof ResizeObserver !== 'undefined') {
				navResizeObserver = new ResizeObserver(() => {
					if (navRef.value) {
						navHeight.value = `${navRef.value.offsetHeight}px`;
					}
				});
				navResizeObserver.observe(navRef.value);
			}
		});

		onBeforeUnmount(() => {
			navResizeObserver?.disconnect();
			navResizeObserver = null;
		});

		return {
			MIN_HEADER_HEIGHT,
			navHeight,
			navRef,
			linksVisible,
			resolvedAppOrigin,
			effectiveSuggestions,
			isMobile,
			menuOpen,
			menuComponent,
			menuItem,
			menuPosition,
			isMobileMenuActive,
			menuPanelClass,
			menuComponentInstance,
			menuPanelRef,
			pinMenuOpen,
			setMenu,
			onItemHover,
			handleOverlayClick,
			emitLendMenuEvent,
			loadMenuData,
			loadSearchSuggestions,
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
