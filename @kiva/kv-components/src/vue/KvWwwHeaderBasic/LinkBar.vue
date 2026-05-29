<template>
	<div
		class="link-bar tw-min-h-[4rem] tw-font-medium tw-relative"
		@touchstart="handleEmptySpaceClick"
	>
		<!-- hamburger (mobile only) -->
		<button
			type="button"
			aria-label="Open menu"
			class="header-link link-bar__hamburger tw-inline-flex md:tw-hidden"
			@mouseover="handleOnHover('menuButton', MobileMenu)"
			@touchstart.stop.prevent="handleTouchStart('menuButton', MobileMenu)"
		>
			<kv-material-icon :icon="mdiMenu" />
		</button>
		<!-- logo: absolutely centered on mobile; in-flow grid item at md+. -->
		<a
			href="/"
			aria-label="Kiva home"
			class="link-bar__logo tw-px-1 tw-py-2 tw-cursor-pointer"
			@click="onLogoClick"
		>
			<kv-header-logo />
		</a>
		<!-- Lend dropdown -->
		<kv-header-dropdown-link
			class="link-bar__lend"
			ref-name="lendButton"
			:href="lendUrl"
			:menu-component="KvLendMenu"
			:open-menu-item="lendOpenItem"
			:dropdown-icon="mdiChevronDown"
			base-class="tw-py-1"
			@on-hover="handleOnHover"
			@mouseleave="handleMouseOut('lendButton')"
			@user-tap="handleTouchStart"
		>
			Lend
		</kv-header-dropdown-link>
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
			<kv-header-dropdown-link
				ref-name="aboutLink"
				class="tw-hidden md:tw-block"
				:menu-component="AboutMenu"
				:open-menu-item="aboutOpenItem"
				:dropdown-icon="mdiChevronDown"
				base-class="tw-py-1"
				send-link-position
				@on-hover="handleOnHover"
				@mouseleave="handleMouseOut('aboutLink')"
				@user-tap="handleTouchStart"
			>
				About
			</kv-header-dropdown-link>
			<!-- Log in (visitor) -->
			<a
				v-if="!loggedIn"
				:href="loginUrl"
				class="header-link"
				data-testid="header-login"
				@click="onLoginClick"
			>Log in</a>
			<!-- basket (logged-in, when items present): count panel + label at md+, bag icon on mobile -->
			<a
				v-if="loggedIn"
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
				<span class="tw-flex md:tw-hidden tw-items-center">
					<kv-icon-bag
						class="tw-w-3 tw-h-3 tw-text-action tw-pointer-events-none"
						:count="isBasketDataLoading ? 0 : basketCount"
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
				ref="avatarMenu"
				class="tw-flex tw-items-center tw-gap-1 tw-cursor-pointer tw-py-1"
				@mouseenter="
					handleOnHover('avatarMenu', MyKivaMenu, getAvatarMenuPosition(), getAvatarTriggerCenterX())
				"
				@mouseleave="handleMouseOut('avatarMenu')"
				@touchstart.stop="
					handleTouchStart('avatarMenu', MyKivaMenu, getAvatarMenuPosition(), getAvatarTriggerCenterX())
				"
			>
				<div
					v-if="isUserDataLoading"
					class="tw-w-4 tw-h-3"
				>
					<kv-loading-placeholder />
				</div>
				<span
					v-else
					class="tw-text-eco-green-4"
				>{{ formattedBalance }}</span>
				<div
					v-if="isUserDataLoading"
					class="tw-w-3 tw-h-3 tw-rounded-full tw-overflow-hidden"
				>
					<kv-loading-placeholder />
				</div>
				<kv-user-avatar
					v-else
					class="tw-w-3 tw-h-3"
					:lender-name="lenderName"
					:lender-image-url="lenderImageUrl"
					is-small
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {
	ref, computed, inject, defineAsyncComponent,
} from 'vue';
import { mdiMenu, mdiChevronDown } from '@mdi/js';
import numeral from 'numeral';
import KvMaterialIcon from '#components/KvMaterialIcon.vue';
import KvIconBag from '#components/KvIconBag.vue';
import KvUserAvatar from '#components/KvUserAvatar.vue';
import KvLoadingPlaceholder from '#components/KvLoadingPlaceholder.vue';
import KvButton from '#components/KvButton.vue';
import KvHeaderLogo from '#components/KvWwwHeader/KvHeaderLogo.vue';
import KvHeaderDropdownLink from '#components/KvWwwHeader/KvHeaderDropdownLink.vue';
import { PRIMARY_LINKS, type NavLink } from '#utils/headerNavLinks';
import SearchBar from './SearchBar.vue';

interface TrackEvent {
	// eslint-disable-next-line no-unused-vars
	(category: string, action: string, label?: string, value?: number): void;
}

// Drawer/dropdown menus are async-loaded; they render in the orchestrator's overlay, not inline here.
const KvLendMenu = defineAsyncComponent(() => import('#components/KvWwwHeader/LendMenu/KvLendMenu.vue'));
const AboutMenu = defineAsyncComponent(() => import('./AboutMenu.vue'));
const MyKivaMenu = defineAsyncComponent(() => import('./MyKivaMenu.vue'));
const MobileMenu = defineAsyncComponent(() => import('./MobileMenu.vue'));

export default {
	name: 'LinkBar',
	components: {
		KvMaterialIcon,
		KvIconBag,
		KvUserAvatar,
		KvLoadingPlaceholder,
		KvButton,
		KvHeaderLogo,
		KvHeaderDropdownLink,
		SearchBar,
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
		isMobile: { type: Boolean, default: false },
		openMenuItem: { type: [Object, Function], default: null },
	},
	emits: ['item-hover', 'load-search-data', 'search-submit'],
	setup(props, { emit }) {
		const $kvTrackEvent = inject<TrackEvent>('$kvTrackEvent', () => {});
		const openItem = ref<string | null>(null);
		// Untyped ref (like KvHeaderLinkBar): keeps the heavy HTMLElement type out of the emitted .d.ts.
		const avatarMenu = ref(null);

		// Initial position for the MyKiva dropdown. Mobile pins to the viewport's right edge
		// (matches the legacy KvWwwHeader drawer). Desktop seeds the position with the avatar's
		// right edge — the orchestrator then re-centers the panel under the avatar after it
		// measures the rendered panel width (see KvWwwHeaderBasic.vue).
		function getAvatarMenuPosition(): { right: string } | null {
			const el = avatarMenu.value as HTMLElement | null;
			const rect = el?.getBoundingClientRect();
			if (!rect) return null;
			if (props.isMobile) return { right: '0' };
			return { right: `${window.innerWidth - rect.right}px` };
		}

		// Center-x of the avatar trigger in viewport coordinates. The orchestrator pairs this with
		// the rendered panel width to compute a `right` offset that anchors the panel directly
		// under the avatar. Returns null on mobile (mobile uses right:0 flush, no centering).
		function getAvatarTriggerCenterX(): number | null {
			if (props.isMobile) return null;
			const el = avatarMenu.value as HTMLElement | null;
			const rect = el?.getBoundingClientRect();
			return rect ? rect.left + rect.width / 2 : null;
		}

		const visiblePrimaryLinks = computed(() => PRIMARY_LINKS.filter((link) => {
			if (link.visibility === 'visitor') return !props.loggedIn;
			if (link.visibility === 'loggedIn') return props.loggedIn;
			return true;
		}));

		const lendUrl = computed(() => (!props.isMobile ? '/lend-by-category' : undefined));
		const formattedBalance = computed(() => numeral(Math.floor(props.balance)).format('$0'));

		// Disable sibling-link dimming entirely: each dropdown only ever sees its own
		// menuComponent as the open item. The dim path in KvHeaderDropdownLink fires when
		// `openMenuItem && openMenuItem !== menuComponent`, so by feeding each dropdown a
		// value that's either its own menu (when active) or null (otherwise), we keep the
		// chevron-rotate-when-active behavior while never tripping the dim class.
		const lendOpenItem = computed(() => (props.openMenuItem === KvLendMenu ? props.openMenuItem : null));
		const aboutOpenItem = computed(() => (props.openMenuItem === AboutMenu ? props.openMenuItem : null));

		function handleOnHover(
			item: string,
			menu: unknown,
			position: unknown = null,
			triggerCenterX: number | null = null,
		): void {
			// Touch devices open via tap (handleTouchStart) rather than hover.
			if (navigator.maxTouchPoints) return;
			openItem.value = item;
			emit('item-hover', item, menu, position, triggerCenterX);
		}

		function handleMouseOut(item: string): void {
			if (navigator.maxTouchPoints) return;
			if (openItem.value === item) {
				openItem.value = null;
				emit('item-hover');
			}
		}

		function handleTouchStart(
			item: string,
			menu: unknown,
			position: unknown = null,
			triggerCenterX: number | null = null,
		): void {
			if (openItem.value === item) {
				openItem.value = null;
				emit('item-hover');
			} else {
				openItem.value = item;
				emit('item-hover', item, menu, position, triggerCenterX);
			}
		}

		function handleEmptySpaceClick(event: Event): void {
			if (event.target === event.currentTarget) {
				emit('item-hover');
			}
		}

		function onPrimaryClick(link: NavLink): void {
			$kvTrackEvent(link.track[0], link.track[1]);
		}

		function onLoginClick(): void {
			$kvTrackEvent('TopNav', 'click-Log-in');
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
			KvLendMenu,
			AboutMenu,
			MyKivaMenu,
			MobileMenu,
			avatarMenu,
			getAvatarMenuPosition,
			getAvatarTriggerCenterX,
			visiblePrimaryLinks,
			lendUrl,
			formattedBalance,
			lendOpenItem,
			aboutOpenItem,
			handleOnHover,
			handleMouseOut,
			handleTouchStart,
			handleEmptySpaceClick,
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
</style>
