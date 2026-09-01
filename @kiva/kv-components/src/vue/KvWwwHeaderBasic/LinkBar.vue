<template>
	<div
		ref="rootRef"
		class="link-bar tw-min-h-[4rem] tw-font-medium"
		:style="menuTimingVars"
	>
		<!-- hamburger → full-screen drawer (mobile only) -->
		<header-menu-group
			class="md:tw-hidden"
			panel-id="header-basic-menu-drawer"
			variant="drawer"
			@open="track('hover-Mobile-menu', 'Mobile')"
			@close="track('close-Mobile-menu', 'Mobile')"
		>
			<template #default="{ trigger }">
				<button
					v-bind="trigger"
					type="button"
					aria-label="Open menu"
					class="header-link menu-trigger link-bar__hamburger tw-inline-flex tw-p-0"
				>
					<kv-material-icon :icon="mdiMenu" />
				</button>
			</template>
			<template #panel="{ close }">
				<mobile-menu
					:logged-in="loggedIn"
					:login-url="loginUrl"
					:is-mobile="isMobile"
					@closing-menu="close"
				/>
			</template>
		</header-menu-group>
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
		<header-menu-group
			class="link-bar__lend"
			panel-id="header-basic-menu-lend"
			variant="full"
			@open="track('hover-Lend-menu', 'Lend')"
		>
			<template #default="{ trigger, toggle }">
				<a
					href="/lend-by-category"
					class="header-link tw-py-1"
					@touchstart.prevent="toggle"
				>Lend</a>
				<button
					v-bind="trigger"
					type="button"
					aria-label="Lend menu"
					class="menu-trigger tw-p-0 tw-py-1 tw-text-primary hover:tw-text-action"
				>
					<kv-material-icon
						class="chevron tw-block tw-w-3"
						:icon="mdiChevronDown"
					/>
				</button>
			</template>
			<template #panel>
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
			</template>
		</header-menu-group>
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
			<header-menu-group
				class="tw-hidden md:tw-flex"
				panel-id="header-basic-menu-about"
				variant="card"
				@open="track('hover-About-menu', 'About')"
			>
				<template #default="{ trigger }">
					<button
						v-bind="trigger"
						type="button"
						class="header-link menu-trigger tw-p-0 tw-py-1 tw-flex tw-items-center"
					>
						About
						<kv-material-icon
							class="chevron tw-inline tw-w-3 tw-ml-0.5"
							:icon="mdiChevronDown"
						/>
					</button>
				</template>
				<template #panel="{ close }">
					<about-menu
						:is-mobile="isMobile"
						@closing-menu="close"
					/>
				</template>
			</header-menu-group>
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
			<header-menu-group
				v-if="loggedIn"
				panel-id="header-basic-menu-my-kiva"
				variant="card"
				@open="track('hover-User-menu', 'User')"
			>
				<template #default="{ trigger }">
					<button
						v-bind="trigger"
						type="button"
						aria-label="My Kiva menu"
						data-testid="header-avatar-menu"
						class="menu-trigger tw-p-0 tw-py-1 tw-flex tw-items-center tw-gap-1 tw-cursor-pointer"
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
				</template>
				<template #panel="{ close }">
					<my-kiva-menu
						:logged-in="loggedIn"
						:user-id="userId"
						:is-borrower="isBorrower"
						:is-trustee="isTrustee"
						:trustee-id="trusteeId"
						:most-recent-borrowed-loan-id="mostRecentBorrowedLoanId"
						:my-dashboard-url="myDashboardUrl"
						:is-mobile="isMobile"
						@closing-menu="close"
					/>
				</template>
			</header-menu-group>
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
	ref, computed, inject, provide, defineAsyncComponent,
} from 'vue';
import { mdiMenu, mdiChevronDown, mdiBriefcase } from '@mdi/js';
import numeral from 'numeral';
import KvMaterialIcon from '#components/KvMaterialIcon.vue';
import KvUserAvatar from '#components/KvUserAvatar.vue';
import KvLoadingPlaceholder from '#components/KvLoadingPlaceholder.vue';
import KvButton from '#components/KvButton.vue';
import KvHeaderLogo from '#components/KvWwwHeader/KvHeaderLogo.vue';
import { PRIMARY_LINKS, type NavLink } from '#utils/headerNavLinks';
import { MENU_TIMING_VARS } from '#utils/headerMenuTiming';
import { useHeaderMenuState, HEADER_MENU_STATE } from '#utils/useHeaderMenuState';
import { useHeaderMenuPlacement, HEADER_MENU_PLACEMENT } from '#utils/useHeaderMenuPlacement';
import HeaderMenuGroup from './HeaderMenuGroup.vue';
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

export default {
	name: 'LinkBar',
	components: {
		KvMaterialIcon,
		KvUserAvatar,
		KvLoadingPlaceholder,
		KvButton,
		KvHeaderLogo,
		HeaderMenuGroup,
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

		provide(HEADER_MENU_STATE, useHeaderMenuState());
		provide(HEADER_MENU_PLACEMENT, useHeaderMenuPlacement(rootRef));

		// One TopNav analytics event per menu open (hover or explicit toggle), mirroring
		// KvWwwHeader/KvHeaderLinkBar's menuTrackingMap; the mobile drawer also tracks its close.
		function track(action: string, label: string): void {
			$kvTrackEvent('TopNav', action, label);
		}

		const visiblePrimaryLinks = computed(() => PRIMARY_LINKS.filter((link) => {
			if (link.visibility === 'visitor') return !props.loggedIn;
			if (link.visibility === 'loggedIn') return props.loggedIn;
			return true;
		}));

		const formattedBalance = computed(() => numeral(Math.floor(props.balance)).format('$0'));

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
			menuTimingVars: MENU_TIMING_VARS,
			visiblePrimaryLinks,
			formattedBalance,
			track,
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
	.link-bar__right {
		grid-area: right;
		align-self: stretch;
	}
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
 * The backdrop opens and closes on the same conditions and schedule as the menu panels
 * (see HeaderMenuGroup.vue); closed, it collapses to zero height.
 */
.backdrop {
	@apply tw-absolute tw-z-overlay;
	top: var(--nav-height, 4rem);
	inset-inline: 0;
	height: 0;
	background-color: rgba(var(--bg-action-highlight), 0.5);
	visibility: hidden;
	opacity: 0;
	transition:
		opacity var(--menu-close-fade) ease var(--menu-open-delay),
		visibility 0s calc(var(--menu-open-delay) + var(--menu-close-fade)),
		height 0s calc(var(--menu-open-delay) + var(--menu-close-fade));
}
.link-bar:has(.menu-group:hover, .menu-group > [aria-expanded="true"]) > .backdrop {
	visibility: visible;
	opacity: 1;
	height: 100vh;
	transition:
		opacity 300ms ease var(--menu-open-delay),
		visibility 0s var(--menu-open-delay),
		height 0s var(--menu-open-delay);
}

.chevron {
	@apply tw-transition-transform tw-duration-300;
}
.menu-group:is(:hover, :has(> [aria-expanded="true"])) .chevron {
	@apply tw-rotate-180;
}
</style>
