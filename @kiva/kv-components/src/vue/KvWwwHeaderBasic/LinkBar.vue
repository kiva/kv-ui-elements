<template>
	<div
		ref="rootRef"
		class="link-bar tw-min-h-[4rem] tw-font-medium"
	>
		<!-- hamburger → full-screen drawer (mobile only) -->
		<div
			class="menu-group tw-flex tw-items-center md:tw-hidden"
			v-on="menuGroupEvents('menuButton')"
		>
			<button
				ref="menuButtonTrigger"
				type="button"
				aria-label="Open menu"
				:aria-expanded="isExpanded('menuButton')"
				:aria-controls="approached.menuButton ? 'header-basic-menu-drawer' : undefined"
				class="header-link menu-trigger link-bar__hamburger tw-inline-flex tw-p-0"
				@click="toggleExpanded('menuButton')"
				@touchstart.prevent="toggleExpanded('menuButton')"
			>
				<kv-material-icon :icon="mdiMenu" />
			</button>
			<div
				v-if="approached.menuButton"
				id="header-basic-menu-drawer"
				class="menu-panel menu-panel--full menu-panel--drawer"
			>
				<mobile-menu
					:logged-in="loggedIn"
					:login-url="loginUrl"
					:is-mobile="isMobile"
					@closing-menu="clearExpanded"
				/>
			</div>
		</div>
		<!-- logo: absolutely centered on mobile; in-flow grid item at md+. -->
		<a
			href="/"
			aria-label="Kiva home"
			class="link-bar__logo tw-px-1 tw-py-2 tw-cursor-pointer"
			@click="onLogoClick"
		>
			<kv-header-logo />
		</a>
		<!-- Lend link + disclosure chevron + mega menu -->
		<div
			class="menu-group link-bar__lend tw-flex tw-items-center"
			v-on="menuGroupEvents('lendButton')"
		>
			<a
				href="/lend-by-category"
				class="header-link tw-py-1"
				@touchstart.prevent="toggleExpanded('lendButton')"
			>Lend</a>
			<button
				ref="lendButtonTrigger"
				type="button"
				aria-label="Lend menu"
				:aria-expanded="isExpanded('lendButton')"
				:aria-controls="approached.lendButton ? 'header-basic-menu-lend' : undefined"
				class="menu-trigger tw-p-0 tw-py-1 tw-text-primary hover:tw-text-action"
				@click="toggleExpanded('lendButton')"
				@touchstart.prevent="toggleExpanded('lendButton')"
			>
				<kv-material-icon
					class="chevron tw-block tw-w-3"
					:icon="mdiChevronDown"
				/>
			</button>
			<div
				v-if="approached.lendButton"
				id="header-basic-menu-lend"
				class="menu-panel menu-panel--full"
			>
				<kv-lend-menu
					ref="lendMenuInstance"
					:user-id="userId"
					:show-m-g-upsell-link="showMGUpsellLink"
					:countries-not-lent-to-url="countriesNotLentToUrl"
					:use-mobile-mega-menu="true"
					:search-suggestions="searchSuggestions"
					:app-origin="appOrigin"
					@load-lend-menu-data="$emit('load-lend-menu-data')"
					@load-search-data="$emit('load-search-data')"
					@search-submit="$emit('search-submit', $event)"
				/>
			</div>
		</div>
		<!-- search: hidden at mobile; own full-width row at md; inline at lg+. -->
		<search-bar
			class="link-bar__search tw-min-w-0 tw-hidden md:tw-block"
			:search-suggestions="searchSuggestions"
			:app-origin="appOrigin"
			:is-mobile="isMobile"
			@load-search-data="$emit('load-search-data')"
			@search-submit="$emit('search-submit', $event)"
		/>
		<!-- right cluster: every right-of-center nav item (no changes to per-item visibility). -->
		<div
			class="link-bar__right tw-flex tw-items-center tw-justify-end
				tw-ml-auto md:tw-ml-0
				tw-gap-1 md:tw-gap-2 lg:tw-gap-2.5"
		>
			<!-- primary text links: Partner (always), Borrow (visitor) — desktop only -->
			<a
				v-for="link in visiblePrimaryLinks"
				:key="link.id"
				:href="link.href"
				class="header-link tw-hidden md:tw-block"
				:data-testid="`header-link-${link.id}`"
				@click="onPrimaryClick(link)"
			>{{ link.label }}</a>
			<!-- About dropdown (md+) -->
			<div
				class="menu-group tw-hidden md:tw-flex md:tw-items-center"
				v-on="menuGroupEvents('aboutLink')"
			>
				<button
					ref="aboutLinkTrigger"
					type="button"
					:aria-expanded="isExpanded('aboutLink')"
					:aria-controls="approached.aboutLink ? 'header-basic-menu-about' : undefined"
					class="header-link menu-trigger tw-p-0 tw-py-1 tw-flex tw-items-center"
					@click="toggleExpanded('aboutLink')"
					@touchstart.prevent="toggleExpanded('aboutLink')"
				>
					About
					<kv-material-icon
						class="chevron tw-inline tw-w-3 tw-ml-0.5"
						:icon="mdiChevronDown"
					/>
				</button>
				<div
					v-if="approached.aboutLink"
					id="header-basic-menu-about"
					class="menu-panel menu-panel--card"
				>
					<about-menu
						:is-mobile="isMobile"
						@closing-menu="clearExpanded"
					/>
				</div>
			</div>
			<!-- Log in (visitor) -->
			<a
				v-if="!loggedIn"
				:href="loginUrl"
				class="header-link"
				data-testid="header-login"
				@click="onLoginClick"
			>Log in</a>
			<!-- basket (when items present, logged in or out): count panel + label at md+, bag icon on mobile -->
			<a
				v-show="basketCount > 0 || isBasketDataLoading"
				href="/basket"
				class="header-link tw-flex tw-items-center"
				data-testid="header-basket"
				@click="onBasketClick"
			>
				<span class="tw-hidden md:tw-flex tw-items-center">
					<span
						class="tw-bg-secondary tw-rounded-xs tw-py-0.5 tw-px-1 tw-mr-1 tw-leading-none"
					>{{ basketCount }}</span>
					Basket
				</span>
				<span class="tw-relative tw-flex md:tw-hidden tw-items-center tw-text-eco-green-4">
					<span
						v-if="!isBasketDataLoading"
						class="tw-absolute tw-w-4 tw-h-4 tw-pt-0.5 tw-flex tw-items-center tw-justify-center
							tw-text-white tw-text-small tw-font-medium tw-pointer-events-none"
					>{{ basketCount }}</span>
					<kv-material-icon
						:icon="mdiBriefcase"
						class="tw-w-4 tw-h-4 tw-pointer-events-none"
					/>
					<span class="tw-sr-only">Basket</span>
				</span>
			</a>
			<!-- Support Kiva (md+) -->
			<div class="tw-hidden md:tw-block">
				<kv-button
					variant="secondary"
					href="/donate/supportus"
					class="tw-whitespace-nowrap"
					data-testid="header-support-kiva"
					@click="onSupportKivaClick"
				>
					Support Kiva
				</kv-button>
			</div>
			<!-- balance + avatar → MyKiva menu (logged-in) -->
			<div
				v-if="loggedIn"
				class="menu-group tw-flex tw-items-center"
				v-on="menuGroupEvents('avatarMenu')"
			>
				<button
					ref="avatarMenuTrigger"
					type="button"
					aria-label="My Kiva menu"
					:aria-expanded="isExpanded('avatarMenu')"
					:aria-controls="approached.avatarMenu ? 'header-basic-menu-my-kiva' : undefined"
					data-testid="header-avatar-menu"
					class="menu-trigger tw-p-0 tw-py-1 tw-flex tw-items-center tw-gap-1 tw-cursor-pointer"
					@click="toggleExpanded('avatarMenu')"
					@touchstart.prevent="toggleExpanded('avatarMenu')"
				>
					<span
						v-if="isUserDataLoading"
						class="tw-block tw-w-4 tw-h-3"
					>
						<kv-loading-placeholder />
					</span>
					<span
						v-else
						class="tw-text-eco-green-4"
					>{{ formattedBalance }}</span>
					<span
						v-if="isUserDataLoading"
						class="tw-block tw-w-3 tw-h-3 tw-rounded-full tw-overflow-hidden"
					>
						<kv-loading-placeholder />
					</span>
					<kv-user-avatar
						v-else
						class="tw-w-3 tw-h-3"
						:lender-name="lenderName"
						:lender-image-url="lenderImageUrl"
						is-small
					/>
				</button>
				<div
					v-if="approached.avatarMenu"
					id="header-basic-menu-my-kiva"
					class="menu-panel menu-panel--card"
				>
					<my-kiva-menu
						:logged-in="loggedIn"
						:user-id="userId"
						:is-borrower="isBorrower"
						:is-trustee="isTrustee"
						:trustee-id="trusteeId"
						:most-recent-borrowed-loan-id="mostRecentBorrowedLoanId"
						:my-dashboard-url="myDashboardUrl"
						:is-mobile="isMobile"
						@closing-menu="clearExpanded"
					/>
				</div>
			</div>
		</div>
		<!-- page-dimming backdrop -->
		<div
			class="backdrop"
			aria-hidden="true"
		></div>
	</div>
</template>

<script lang="ts">
import {
	ref, reactive, computed, inject, watch, nextTick, onMounted, onBeforeUnmount, defineAsyncComponent,
} from 'vue';
import type { Ref } from 'vue';
import { mdiMenu, mdiChevronDown, mdiBriefcase } from '@mdi/js';
import numeral from 'numeral';
import KvMaterialIcon from '#components/KvMaterialIcon.vue';
import KvUserAvatar from '#components/KvUserAvatar.vue';
import KvLoadingPlaceholder from '#components/KvLoadingPlaceholder.vue';
import KvButton from '#components/KvButton.vue';
import KvHeaderLogo from '#components/KvWwwHeader/KvHeaderLogo.vue';
import { PRIMARY_LINKS, type NavLink } from '#utils/headerNavLinks';
import SearchBar from './SearchBar.vue';

interface TrackEvent {
	// eslint-disable-next-line no-unused-vars
	(category: string, action: string, label?: string, value?: number): void;
}

// Public instance shape of the Lend menu (KvLendMenu exposes onLoad for its data fetch).
interface LendMenuInstance {
	// eslint-disable-next-line no-unused-vars
	onLoad?(apollo: unknown): void;
}

// Menu panels are async-loaded and mounted lazily on first approach of their menu group.
const KvLendMenu = defineAsyncComponent(() => import('#components/KvWwwHeader/LendMenu/KvLendMenu.vue'));
const AboutMenu = defineAsyncComponent(() => import('./AboutMenu.vue'));
const MyKivaMenu = defineAsyncComponent(() => import('./MyKivaMenu.vue'));
const MobileMenu = defineAsyncComponent(() => import('./MobileMenu.vue'));

// Shared by the CSS transition delays (via v-bind below) and the hover-intent analytics timer:
// hover opens after this delay, and closing holds through the same grace before fading.
const MENU_OPEN_DELAY_MS = 100;
// Duration of the closing fade; the panels hide once the close grace plus this fade have elapsed.
const MENU_CLOSE_FADE_MS = 100;

export default {
	name: 'LinkBar',
	components: {
		KvMaterialIcon,
		KvUserAvatar,
		KvLoadingPlaceholder,
		KvButton,
		KvHeaderLogo,
		SearchBar,
		KvLendMenu,
		AboutMenu,
		MyKivaMenu,
		MobileMenu,
	},
	props: {
		loggedIn: { type: Boolean, default: false },
		basketCount: { type: Number, default: 0 },
		balance: { type: Number, default: 0 },
		userId: { type: Number, default: null },
		isBorrower: { type: Boolean, default: false },
		isTrustee: { type: Boolean, default: false },
		trusteeId: { type: Number, default: null },
		mostRecentBorrowedLoanId: { type: Number, default: null },
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
		isMobile: { type: Boolean, default: false },
	},
	emits: ['load-lend-menu-data', 'load-search-data', 'search-submit', 'login-click'],
	setup(props, { emit }) {
		const $kvTrackEvent = inject<TrackEvent>('$kvTrackEvent', () => {});

		const rootRef = ref<HTMLElement | null>(null);
		const lendMenuInstance = ref<LendMenuInstance | null>(null);

		// Which trigger, if any, is explicitly open. Its only rendered form is the aria-expanded
		// binding on the trigger buttons; the stylesheet selects on that attribute to show panels.
		const expandedItem = ref<string | null>(null);

		// Menu groups whose panel has been mounted (first pointerenter/focusin/touchstart on the group).
		const approached = reactive<Record<string, boolean>>({
			menuButton: false,
			lendButton: false,
			aboutLink: false,
			avatarMenu: false,
		});

		const menuButtonTrigger = ref<HTMLElement | null>(null);
		const lendButtonTrigger = ref<HTMLElement | null>(null);
		const aboutLinkTrigger = ref<HTMLElement | null>(null);
		const avatarMenuTrigger = ref<HTMLElement | null>(null);
		const triggerRefs: Record<string, Ref<HTMLElement | null>> = {
			menuButton: menuButtonTrigger,
			lendButton: lendButtonTrigger,
			aboutLink: aboutLinkTrigger,
			avatarMenu: avatarMenuTrigger,
		};

		const menuOpenDelay = `${MENU_OPEN_DELAY_MS}ms`;
		const menuCloseFade = `${MENU_CLOSE_FADE_MS}ms`;

		const visiblePrimaryLinks = computed(() => PRIMARY_LINKS.filter((link) => {
			if (link.visibility === 'visitor') return !props.loggedIn;
			if (link.visibility === 'loggedIn') return props.loggedIn;
			return true;
		}));

		const formattedBalance = computed(() => numeral(Math.floor(props.balance)).format('$0'));

		// One TopNav analytics event per menu, mirroring KvWwwHeader/KvHeaderLinkBar's menuTrackingMap.
		// Fired on the open transition (hover or explicit toggle) of each dropdown/drawer. The Lend
		// entry reproduces the legacy host's onLendMenuShow event ('hover-Lend-menu', 'Lend').
		const menuOpenTracking: Record<string, { action: string; label: string }> = {
			menuButton: { action: 'hover-Mobile-menu', label: 'Mobile' },
			lendButton: { action: 'hover-Lend-menu', label: 'Lend' },
			aboutLink: { action: 'hover-About-menu', label: 'About' },
			avatarMenu: { action: 'hover-User-menu', label: 'User' },
		};

		// Close-side counterpart. Only the mobile drawer tracks an explicit close today; the hover
		// dropdowns close implicitly on mouseleave and have no close event in the legacy header.
		const menuCloseTracking: Record<string, { action: string; label: string }> = {
			menuButton: { action: 'close-Mobile-menu', label: 'Mobile' },
		};

		// Open-tracking dedupe flags: set when a group's open has been counted, cleared on hover-out
		// and on every close path.
		const counted: Record<string, boolean> = {
			menuButton: false,
			lendButton: false,
			aboutLink: false,
			avatarMenu: false,
		};
		const hoverTimers: Record<string, ReturnType<typeof setTimeout> | undefined> = {};

		function trackMenuOpenOnce(id: string): void {
			if (counted[id]) return;
			counted[id] = true;
			const tracking = menuOpenTracking[id];
			if (tracking) $kvTrackEvent('TopNav', tracking.action, tracking.label);
		}

		function trackMenuClose(id: string): void {
			const tracking = menuCloseTracking[id];
			if (tracking) $kvTrackEvent('TopNav', tracking.action, tracking.label);
		}

		function isExpanded(id: string): 'true' | 'false' {
			return expandedItem.value === id ? 'true' : 'false';
		}

		function clearExpanded(): void {
			if (!expandedItem.value) return;
			counted[expandedItem.value] = false;
			expandedItem.value = null;
		}

		function toggleExpanded(id: string): void {
			if (expandedItem.value === id) {
				trackMenuClose(id);
				clearExpanded();
			} else {
				if (expandedItem.value) counted[expandedItem.value] = false;
				trackMenuOpenOnce(id);
				expandedItem.value = id;
			}
		}

		// Taps anywhere but a menu panel dismiss the open menu; taps inside a menu group are left
		// to that group's trigger toggle.
		function onDocumentTouchStart(event: Event): void {
			if (!expandedItem.value) return;
			const target = event.target instanceof Element ? event.target : null;
			const within = target?.closest('.menu-panel, .menu-group');
			if (within && rootRef.value?.contains(within)) return;
			clearExpanded();
		}

		function approachGroup(id: string): void {
			approached[id] = true;
		}

		// Hover opens are counted by a per-group timer matching the CSS open delay; leaving the
		// group before it fires cancels the count, and leaving at all re-arms it. Hovering a group
		// also clears any other group's explicitly-expanded state.
		function onGroupMouseEnter(id: string): void {
			if (expandedItem.value && expandedItem.value !== id) clearExpanded();
			clearTimeout(hoverTimers[id]);
			hoverTimers[id] = setTimeout(() => {
				if (expandedItem.value !== id) trackMenuOpenOnce(id);
			}, MENU_OPEN_DELAY_MS);
		}

		function onGroupMouseLeave(id: string): void {
			clearTimeout(hoverTimers[id]);
			hoverTimers[id] = undefined;
			if (expandedItem.value !== id) counted[id] = false;
		}

		function onGroupKeydown(id: string, event: KeyboardEvent): void {
			if (event.key !== 'Escape' || expandedItem.value !== id) return;
			clearExpanded();
			triggerRefs[id]?.value?.focus();
		}

		function onGroupFocusOut(id: string, event: FocusEvent): void {
			const group = event.currentTarget as HTMLElement;
			if (event.relatedTarget instanceof Node && group.contains(event.relatedTarget)) return;
			if (expandedItem.value === id) clearExpanded();
		}

		function menuGroupEvents(id: string) {
			return {
				pointerenter: () => approachGroup(id),
				focusin: () => approachGroup(id),
				touchstart: () => approachGroup(id),
				mouseenter: () => onGroupMouseEnter(id),
				mouseleave: () => onGroupMouseLeave(id),
				keydown: (event: KeyboardEvent) => onGroupKeydown(id, event),
				focusout: (event: FocusEvent) => onGroupFocusOut(id, event),
			};
		}

		// Placement pass: writes --nav-height on the bar and --trigger-gap-left/right plus
		// --trigger-width on each menu group, measured against the nav (the bar's offset parent).
		// The stylesheet's panel placement and hover-bridge rules consume these.
		let placementObserver: ResizeObserver | null = null;

		function measurePlacement(): void {
			const root = rootRef.value;
			const nav = root?.offsetParent;
			if (!root || !(nav instanceof HTMLElement)) return;
			const navRect = nav.getBoundingClientRect();
			root.style.setProperty('--nav-height', `${navRect.height}px`);
			root.querySelectorAll<HTMLElement>('.menu-group').forEach((group) => {
				const rect = group.getBoundingClientRect();
				const centerX = rect.left + rect.width / 2;
				group.style.setProperty('--trigger-gap-left', `${centerX - navRect.left}px`);
				group.style.setProperty('--trigger-gap-right', `${navRect.right - centerX}px`);
				group.style.setProperty('--trigger-width', `${rect.width}px`);
			});
		}

		function observePlacement(): void {
			if (!placementObserver) return;
			const root = rootRef.value;
			const nav = root?.offsetParent;
			if (!root || !(nav instanceof HTMLElement)) return;
			placementObserver.disconnect();
			placementObserver.observe(nav);
			const rightCluster = root.querySelector('.link-bar__right');
			if (rightCluster) placementObserver.observe(rightCluster);
			root.querySelectorAll('.menu-group').forEach((group) => placementObserver?.observe(group));
		}

		// loggedIn toggles the avatar group in and out of the DOM; re-collect the observed groups
		// when it changes.
		watch(() => props.loggedIn, async () => {
			await nextTick();
			observePlacement();
			measurePlacement();
		});

		onMounted(() => {
			if (typeof ResizeObserver !== 'undefined') {
				placementObserver = new ResizeObserver(measurePlacement);
				observePlacement();
			}
			measurePlacement();
			document.addEventListener('touchstart', onDocumentTouchStart);
		});

		onBeforeUnmount(() => {
			placementObserver?.disconnect();
			placementObserver = null;
			document.removeEventListener('touchstart', onDocumentTouchStart);
			Object.values(hoverTimers).forEach((timer) => clearTimeout(timer));
		});

		// Exposed for the orchestrator's loadMenuData: forwards the opaque apollo client to the
		// mounted Lend menu's onLoad. No-ops until the Lend panel has been approached.
		function loadMenuData(apollo: unknown): void {
			lendMenuInstance.value?.onLoad?.(apollo);
		}

		function onPrimaryClick(link: NavLink): void {
			$kvTrackEvent(link.track[0], link.track[1]);
		}

		// The anchor keeps its href so no-JS, middle-click and open-in-new-tab still work. Hosts whose
		// login is not a plain navigation (e.g. an Auth0 SPA flow) listen for `login-click` and call
		// preventDefault() on the native event; hosts that don't listen navigate to loginUrl as before.
		function onLoginClick(event: MouseEvent): void {
			$kvTrackEvent('TopNav', 'click-Log-in');
			emit('login-click', event);
		}

		function onBasketClick(): void {
			$kvTrackEvent('TopNav', 'click-Basket');
		}

		function onSupportKivaClick(): void {
			$kvTrackEvent('TopNav', 'click-Support-Kiva');
		}

		function onLogoClick(): void {
			$kvTrackEvent('TopNav', 'click-Logo');
		}

		return {
			mdiMenu,
			mdiChevronDown,
			mdiBriefcase,
			rootRef,
			lendMenuInstance,
			menuButtonTrigger,
			lendButtonTrigger,
			aboutLinkTrigger,
			avatarMenuTrigger,
			approached,
			menuOpenDelay,
			menuCloseFade,
			visiblePrimaryLinks,
			formattedBalance,
			isExpanded,
			clearExpanded,
			toggleExpanded,
			menuGroupEvents,
			loadMenuData,
			onPrimaryClick,
			onLoginClick,
			onBasketClick,
			onSupportKivaClick,
			onLogoClick,
		};
	},
};
</script>

<style lang="postcss" scoped>
/*
 * Layout — CSS Grid named template areas (matches cms-page-server/header/Full.vue and
 * ui/WwwFrame/TheHeader.vue). One layout DOM, three responsive states:
 *  - Mobile (< md): hamburger + absolutely-centered logo + right cluster. Search is hidden
 *    here (lives inside the mobile Lend Search tab).
 *  - Tablet (md ≤ vw < lg): logo (left) + Lend + right cluster on the top row, full-width
 *    search row beneath. Logo uses 1fr to push Lend + right cluster to the right.
 *  - Desktop (≥ lg): single row with inline search (auto auto 1fr auto).
 *
 * The bar and the menu groups carry no position: every .menu-panel, the .backdrop and the
 * mobile logo position against the nav, the same box the placement variables (--nav-height,
 * --trigger-gap-left/right, --trigger-width) measure against.
 */
.link-bar {
	@apply tw-flex tw-items-center tw-gap-1;
}
.link-bar__logo {
	@apply tw-absolute tw-top-1/2 tw-left-1/2 tw--translate-x-1/2 tw--translate-y-1/2
		tw-transition-all tw-duration-300;
}

@screen md {
	.link-bar {
		@apply tw-grid tw-gap-x-2;
		grid-template-areas: "logo lend right" "search search search";
		grid-template-columns: 1fr auto auto;
		grid-template-rows: 4rem auto;
		row-gap: theme('spacing.1');
	}
	.link-bar__right,
	.menu-group {
		align-self: stretch;
	}
	/* Hover bridge: an invisible strip, the trigger's width, from the trigger row's bottom edge to the nav's. */
	.menu-group:hover::after {
		content: '';
		@apply tw-absolute;
		top: 4rem;
		height: calc(var(--nav-height, 4rem) - 4rem);
		left: calc(var(--trigger-gap-left, 0px) - var(--trigger-width, 0px) / 2);
		width: var(--trigger-width, 0px);
	}
	.link-bar__logo {
		@apply tw-static tw-translate-x-0 tw-translate-y-0;
		grid-area: logo;
		justify-self: start;
	}
	.link-bar__lend { grid-area: lend; }
	.link-bar__search {
		grid-area: search;
		@apply tw-mb-1;
	}
	.link-bar__right { grid-area: right; }
}

@screen lg {
	.link-bar {
		@apply tw-gap-x-2.5;
		grid-template-areas: "logo lend search right";
		grid-template-columns: auto auto 1fr auto;
		grid-template-rows: 4rem;
	}
	.link-bar__search {
		@apply tw-mb-0;
	}
}

.header-link {
	@apply tw-py-2 tw-cursor-pointer tw-no-underline
		hover:tw-no-underline tw-text-primary hover:tw-text-action;
}

.menu-trigger {
	border: 0;
	background: none;
	font: inherit;
	@apply tw-cursor-pointer;
}

/*
 * Menu open state: a panel and the backdrop show while a group is hovered or while a trigger
 * carries aria-expanded="true". Opening waits out the shared delay, then fades in; closing holds
 * through the same delay, fades over the close-fade duration, then hides and collapses. The
 * :hover and :has() open conditions live in separate rules: an engine that cannot parse one
 * selector list drops only that rule.
 */
.menu-panel,
.backdrop {
	@apply tw-absolute;
	top: var(--nav-height, 4rem);
	visibility: hidden;
	opacity: 0;
	transition:
		opacity v-bind(menuCloseFade) ease v-bind(menuOpenDelay),
		visibility 0s calc(v-bind(menuOpenDelay) + v-bind(menuCloseFade)),
		height 0s calc(v-bind(menuOpenDelay) + v-bind(menuCloseFade)),
		max-height 0s calc(v-bind(menuOpenDelay) + v-bind(menuCloseFade)),
		min-height 0s calc(v-bind(menuOpenDelay) + v-bind(menuCloseFade));
}
.menu-group:hover > .menu-panel,
.link-bar:has(.menu-group:hover) > .backdrop {
	visibility: visible;
	opacity: 1;
	transition:
		opacity 300ms ease v-bind(menuOpenDelay),
		visibility 0s v-bind(menuOpenDelay),
		height 0s v-bind(menuOpenDelay),
		max-height 0s v-bind(menuOpenDelay),
		min-height 0s v-bind(menuOpenDelay);
}
.menu-group:has(> [aria-expanded="true"]) > .menu-panel,
.link-bar:has(.menu-group > [aria-expanded="true"]) > .backdrop {
	visibility: visible;
	opacity: 1;
	transition:
		opacity 300ms ease v-bind(menuOpenDelay),
		visibility 0s v-bind(menuOpenDelay),
		height 0s v-bind(menuOpenDelay),
		max-height 0s v-bind(menuOpenDelay),
		min-height 0s v-bind(menuOpenDelay);
}

/*
 * Closed panels and the closed backdrop collapse to zero height, keeping them out of the page's
 * scrollable overflow; the open rules below restore their sizes.
 */
.menu-panel {
	@apply tw-bg-primary tw-overflow-y-auto tw-z-modal;
	max-height: 0;
}
.menu-group:hover > .menu-panel,
.menu-group:has(> [aria-expanded="true"]) > .menu-panel {
	max-height: calc(100dvh - var(--nav-height, 4rem));
}
.menu-panel--full {
	inset-inline: 0;
}
/*
 * Card panels center under their trigger and clamp flush to whichever nav edge centering would
 * cross; the 50% resolves against the panel's own width.
 */
.menu-panel--card {
	@apply tw-rounded-b tw-border tw-border-t-0 tw-border-tertiary;
	right: var(--trigger-gap-right, 0px);
	translate: clamp(calc(100% - var(--trigger-gap-left, 0px)), 50%, var(--trigger-gap-right, 0px)) 0;
	max-width: 100%;
}
.menu-panel--drawer {
	@apply tw-rounded-none;
}
.menu-group:hover > .menu-panel--drawer,
.menu-group:has(> [aria-expanded="true"]) > .menu-panel--drawer {
	max-height: none;
	min-height: 100dvh;
}

.backdrop {
	@apply tw-z-overlay;
	inset-inline: 0;
	height: 0;
	background-color: rgba(var(--bg-action-highlight), 0.5);
}
.link-bar:has(.menu-group:hover) > .backdrop,
.link-bar:has(.menu-group > [aria-expanded="true"]) > .backdrop {
	height: 100vh;
}

.chevron {
	@apply tw-transition-transform tw-duration-300;
}
.menu-group:hover .chevron {
	@apply tw-rotate-180;
}
.menu-group:has(> [aria-expanded="true"]) .chevron {
	@apply tw-rotate-180;
}
</style>
