<template>
	<div
		class="tw-h-full tw-flex tw-items-center tw-gap-1 md:tw-gap-2 lg:tw-gap-2.5"
		@touchstart="handleEmptySpaceClick"
	>
		<!-- hamburger (mobile only) -->
		<button
			type="button"
			aria-label="Open menu"
			class="header-link tw-inline-flex md:tw-hidden"
			@mouseover="handleOnHover('menuButton', MobileMenu)"
			@touchstart.stop.prevent="handleTouchStart('menuButton', MobileMenu)"
		>
			<kv-material-icon :icon="mdiMenu" />
		</button>
		<!-- logo: in-flow on the far left at md+ (Figma desktop), absolutely centered on mobile -->
		<a
			href="/"
			aria-label="Kiva home"
			class="
				tw-px-1 tw-py-2 tw-cursor-pointer
				tw-absolute tw-top-1/2 tw-left-1/2 tw--translate-x-1/2 tw--translate-y-1/2
				md:tw-static md:tw-translate-x-0 md:tw-translate-y-0
				tw-transition-all tw-duration-300
			"
			@click="onLogoClick"
		>
			<kv-header-logo />
		</a>
		<!-- Lend dropdown -->
		<kv-header-dropdown-link
			ref-name="lendButton"
			:href="lendUrl"
			:menu-component="KvLendMenu"
			:open-menu-item="openMenuItem"
			:dropdown-icon="mdiChevronDown"
			base-class="tw-py-1"
			@on-hover="handleOnHover"
			@mouseleave="handleMouseOut('lendButton')"
			@user-tap="handleTouchStart"
		>
			Lend
		</kv-header-dropdown-link>
		<!-- search (inline) -->
		<search-bar
			class="tw-flex-1 tw-min-w-0 tw-hidden md:tw-block"
			:search-suggestions="searchSuggestions"
			:app-origin="appOrigin"
			:is-mobile="isMobile"
			@load-search-data="$emit('load-search-data')"
			@search-submit="$emit('search-submit', $event)"
		/>
		<!-- spacer keeps the right-side cluster pinned right -->
		<div class="tw-flex-1"></div>
		<!-- primary text links: Partner (always), Borrow (visitor) -->
		<a
			v-for="link in visiblePrimaryLinks"
			:key="link.id"
			:href="link.href"
			class="header-link"
			:data-testid="`header-link-${link.id}`"
			@click="onPrimaryClick(link)"
		>{{ link.label }}</a>
		<!-- About dropdown -->
		<kv-header-dropdown-link
			ref-name="aboutLink"
			:menu-component="AboutMenu"
			:open-menu-item="openMenuItem"
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
		<!-- basket (logged-in, when items present) -->
		<a
			v-if="loggedIn"
			v-show="basketCount > 0 || isBasketDataLoading"
			href="/basket"
			class="header-link tw-flex tw-items-center tw-gap-0.5"
			data-testid="header-basket"
			@click="onBasketClick"
		>
			<kv-icon-bag
				class="tw-w-3 tw-h-3 tw-text-action tw-pointer-events-none"
				:count="isBasketDataLoading ? 0 : basketCount"
			/>
			<span class="tw-sr-only">Basket</span>
		</a>
		<!-- Support Kiva (always) -->
		<kv-button
			variant="secondary"
			href="/donate/supportus"
			class="tw-whitespace-nowrap"
			data-testid="header-support-kiva"
			@click="onSupportKivaClick"
		>
			Support Kiva
		</kv-button>
		<!-- balance + avatar → MyKiva menu (logged-in) -->
		<div
			v-if="loggedIn"
			class="tw-flex tw-items-center tw-gap-1 tw-cursor-pointer tw-py-1"
			@mouseenter="handleOnHover('avatarMenu', MyKivaMenu)"
			@mouseleave="handleMouseOut('avatarMenu')"
			@touchstart.stop="handleTouchStart('avatarMenu', MyKivaMenu)"
		>
			<span class="tw-text-eco-green-4">{{ formattedBalance }}</span>
			<kv-user-avatar
				class="tw-w-3 tw-h-3"
				:lender-name="lenderName"
				:lender-image-url="lenderImageUrl"
				:show-css-placeholder="isUserDataLoading"
				is-small
			/>
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
import KvButton from '#components/KvButton.vue';
import KvHeaderLogo from '#components/KvWwwHeader/KvHeaderLogo.vue';
import KvHeaderDropdownLink from '#components/KvWwwHeader/KvHeaderDropdownLink.vue';
import SearchBar from './SearchBar.vue';
import { PRIMARY_LINKS, type NavLink } from './utils/navLinks';

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
		KvMaterialIcon, KvIconBag, KvUserAvatar, KvButton, KvHeaderLogo, KvHeaderDropdownLink, SearchBar,
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

		const visiblePrimaryLinks = computed(() => PRIMARY_LINKS.filter((link) => {
			if (link.visibility === 'visitor') return !props.loggedIn;
			if (link.visibility === 'loggedIn') return props.loggedIn;
			return true;
		}));

		const lendUrl = computed(() => (!props.isMobile ? '/lend-by-category' : undefined));
		const formattedBalance = computed(() => numeral(Math.floor(props.balance)).format('$0'));

		function handleOnHover(item: string, menu: unknown, position: unknown = null): void {
			// Touch devices open via tap (handleTouchStart) rather than hover.
			if (navigator.maxTouchPoints) return;
			openItem.value = item;
			emit('item-hover', item, menu, position);
		}

		function handleMouseOut(item: string): void {
			if (navigator.maxTouchPoints) return;
			if (openItem.value === item) {
				openItem.value = null;
				emit('item-hover');
			}
		}

		function handleTouchStart(item: string, menu: unknown, position: unknown = null): void {
			if (openItem.value === item) {
				openItem.value = null;
				emit('item-hover');
			} else {
				openItem.value = item;
				emit('item-hover', item, menu, position);
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
			visiblePrimaryLinks,
			lendUrl,
			formattedBalance,
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
.header-link {
	@apply tw-py-2 tw-cursor-pointer tw-no-underline
		hover:tw-no-underline tw-text-primary hover:tw-text-action;
}
</style>
