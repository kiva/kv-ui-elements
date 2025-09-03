<template>
	<div
		class="tw-h-full tw-flex tw-items-center tw-gap-0.5 md:tw-gap-1.5 lg:tw-gap-2.5"
	>
		<!-- 3-bar menu (sm) -->
		<button
			ref="menuButton"
			v-kv-track-event="openMenuItem === KvHeaderMobileMenu
				? ['TopNav', 'click-Hamburger-menu']
				: null"
			class="header-link tw-inline-flex md:tw-hidden"
			:class="{
				'tw-text-tertiary': openMenuItem && openMenuItem !== KvHeaderMobileMenu
			}"
			@mouseover="handleOnHover('menuButton', KvHeaderMobileMenu)"
			@mouseout="handleMouseOut('menuButton')"
			@touchstart="handleTouchStart('menuButton', KvHeaderMobileMenu)"
		>
			<kv-material-icon :icon="mdiMenu" />
		</button>
		<!-- lend -->
		<KvHeaderDropdownLink
			v-kv-track-event="['TopNav', 'click-Lend']"
			ref-name="lendButton"
			:href="lendUrl"
			:menu-component="KvLendMenu"
			:open-menu-item="openMenuItem"
			:dropdown-icon="mdiChevronDown"
			base-class="tw-inline-flex md:tw-border md:tw-rounded-md tw-px-1.5 tw-py-1"
			@on-hover="handleOnHover"
			@mouseout="handleMouseOut('lendButton')"
			@touchstart="handleTouchStart('lendButton', KvLendMenu)"
		>
			Lend
		</KvHeaderDropdownLink>
		<!-- Take Action -->
		<KvHeaderDropdownLink
			v-kv-track-event="['TopNav', 'click-TakeAction']"
			ref-name="takeActionButton"
			base-class="tw-hidden md:tw-inline-flex tw-py-2"
			:menu-component="KvHeaderTakeActionMenu"
			:open-menu-item="openMenuItem"
			:dropdown-icon="mdiChevronDown"
			send-link-position
			@on-hover="handleOnHover"
			@mouseout="handleMouseOut('takeActionButton')"
		>
			Take action
		</KvHeaderDropdownLink>
		<!-- about (lg) -->
		<KvHeaderDropdownLink
			v-kv-track-event="['TopNav', 'click-About']"
			ref-name="aboutUsLink"
			data-testid="header-about"
			base-class="tw-hidden md:tw-inline-flex tw-py-2"
			:menu-component="KvHeaderAboutMenu"
			:open-menu-item="openMenuItem"
			:dropdown-icon="mdiChevronDown"
			send-link-position
			@on-hover="handleOnHover"
			@mouseout="handleMouseOut('aboutUsLink')"
		>
			About
		</KvHeaderDropdownLink>
		<!-- logo spacer -->
		<div
			class="tw-flex-1 tw-h-full"
		></div>
		<!-- My dashboard -->
		<a
			v-if="loggedIn"
			ref="dashboardLink"
			v-kv-track-event="['TopNav', 'click-Dashboard']"
			:href="myDashboardUrl"
			class="header-link tw-hidden md:tw-block"
			:class="{'tw-text-tertiary': !!openMenuItem}"
		>
			My dashboard
		</a>
		<!-- basket (items) -->
		<a
			v-show="basketCount > 0"
			ref="basketLink"
			v-kv-track-event="['TopNav', 'click-Basket']"
			href="/basket"
			class="header-link tw-relative"
			:class="{'tw-text-tertiary': !!openMenuItem}"
			data-testid="header-basket"
		>
			<kv-icon-bag
				class="tw-w-3 tw-h-3 tw-pointer-events-none"
				:count="basketCount"
			/>
		</a>
		<div
			class="tw-cursor-pointer tw-flex tw-items-center tw-gap-1 tw-py-1.5"
			@mouseover="handleAvatarMenuPosition"
			@mouseout="handleMouseOut(AVATAR_MENU_ID)"
			@touchstart="handleTouchStart(AVATAR_MENU_ID)"
		>
			<span
				v-if="loggedIn"
				class="tw-bg-eco-green-1 tw-py-0.5 tw-px-1 tw-text-eco-green-4"
			>
				{{ numeral(balance).format('$0') }}
			</span>
			<!-- avatar (sm, auth) -->
			<KvUserAvatar
				v-if="loggedIn"
				ref="avatar"
				:lender-name="lenderName"
				:lender-image-url="lenderImageUrl"
				is-small
			/>
		</div>
		<!-- sign in (lg, no-auth) -->
		<a
			v-if="!loggedIn"
			ref="signInLink"
			v-kv-track-event="['TopNav', 'click-Sign-in']"
			:href="loginUrl"
			class="header-link"
			:class="{'tw-text-tertiary': !!openMenuItem}"
		>
			Sign in
		</a>
	</div>
</template>

<script>
import {
	defineAsyncComponent, onMounted, ref, computed, onUnmounted,
} from 'vue';
import {
	mdiAccountCircle, mdiMenu, mdiChevronDown, mdiMagnify,
} from '@mdi/js';
import numeral from 'numeral';
import KvMaterialIcon from '../KvMaterialIcon.vue';
import KvIconBag from '../KvIconBag.vue';
import KvHeaderDropdownLink from './KvHeaderDropdownLink.vue';
import KvUserAvatar from '../KvUserAvatar.vue';
import { throttle } from '../../utils/throttle';

const KvHeaderMobileMenu = defineAsyncComponent(() => import('./KvHeaderMobileMenu.vue'));
const KvHeaderMyKivaMenu = defineAsyncComponent(() => import('./KvHeaderMyKivaMenu.vue'));
const KvLendMenu = defineAsyncComponent(() => import('./LendMenu/KvLendMenu.vue'));
const KvHeaderTakeActionMenu = defineAsyncComponent(() => import('./KvHeaderTakeActionMenu.vue'));
const KvHeaderAboutMenu = defineAsyncComponent(() => import('./KvHeaderAboutMenu.vue'));

const AVATAR_MENU_WIDTH = 146;
const AVATAR_MENU_ID = 'avatar-menu';
const MOBILE_MENU_ITEM = 'menuButton';
const MOBILE_MENU_BASE_POS = { top: '-3.75rem', width: '100%' };

export default {
	components: {
		KvMaterialIcon,
		KvIconBag,
		KvHeaderDropdownLink,
		KvUserAvatar,
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
		openMenuItem: {
			type: [Object, Function],
			default: null,
		},
		loginUrl: {
			type: String,
			default: '/ui-login',
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
		balance: {
			type: Number,
			default: 0,
		},
	},
	emits: [
		'item-hover',
	],
	setup(props, { emit }) {
		// element references
		const avatar = ref(null);
		const lendButton = ref(null);
		const aboutUsLink = ref(null);
		const partnerWithUsLink = ref(null);
		const borrowLink = ref(null);
		const supportKivaLink = ref(null);
		const basketLink = ref(null);
		const signInLink = ref(null);
		const menuButton = ref(null);
		const openMenuId = ref(null);
		const userIsTapping = ref(false);

		const onHover = (item, menu, targetPosition = null) => {
			emit('item-hover', item, menu, targetPosition);
		};

		const handleOnHover = (item, menu, targetPosition = null) => {
			if (!props.isMobile) {
				onHover(
					item,
					menu,
					item === MOBILE_MENU_ITEM && props.isMobile ? MOBILE_MENU_BASE_POS : targetPosition,
				);
			}
		};

		const handleMouseOut = (item) => {
			if (!userIsTapping.value && openMenuId.value === item) {
				openMenuId.value = null;
				onHover();
			}
		};

		const getAvatarMenuPosition = () => {
			const linkRect = avatar.value?.userAvatar?.getBoundingClientRect();
			if (!linkRect) return null;

			const left = linkRect.left + linkRect.width / 2;
			const menuLeft = left - AVATAR_MENU_WIDTH / 2;
			const rightOverflow = menuLeft + AVATAR_MENU_WIDTH > window.innerWidth;

			return {
				...(rightOverflow ? { right: 0 } : { left: props.isMobile ? 0 : `${menuLeft}px` }),
				marginTop: '-2px', // Avoid closing avatar menu on header edge
				borderRadius: props.isMobile ? 'auto' : '0px 0px 8px 8px',
				width: props.isMobile ? '100%' : 'auto',
			};
		};

		const handleAvatarMenuPosition = () => {
			openMenuId.value = AVATAR_MENU_ID;
			onHover(avatar.value, KvHeaderMyKivaMenu, getAvatarMenuPosition());
		};

		const handleTouchStart = (item, menu) => {
			let tappingTimeout = null;
			userIsTapping.value = true;

			if (tappingTimeout) {
				clearTimeout(tappingTimeout);
			}

			// Handles the scenario when mobile menu is closed from main component
			if (openMenuId.value === MOBILE_MENU_ITEM) {
				openMenuId.value = null;
			}

			if (!openMenuId.value || openMenuId.value !== item) {
				openMenuId.value = item;
				if (item === AVATAR_MENU_ID) {
					handleAvatarMenuPosition();
				} else if (item === MOBILE_MENU_ITEM && props.isMobile) {
					onHover(item, menu, MOBILE_MENU_BASE_POS);
				} else {
					onHover(item, menu);
				}
			} else {
				openMenuId.value = null;
				onHover();
			}
			tappingTimeout = setTimeout(() => {
				userIsTapping.value = false;
			});
		};

		const handleAvatarMenuPositionThrottled = throttle(() => {
			if (openMenuId.value === AVATAR_MENU_ID) {
				handleAvatarMenuPosition();
			}
		}, 50);

		const lendUrl = computed(() => {
			return !props.isMobile ? '/lend-by-category' : undefined;
		});

		onMounted(() => {
			import('./KvHeaderMobileMenu.vue');
			import('./KvHeaderMyKivaMenu.vue');
			import('./LendMenu/KvLendMenu.vue');
			import('./KvHeaderTakeActionMenu.vue');
			import('./KvHeaderAboutMenu.vue');

			window.addEventListener('resize', handleAvatarMenuPositionThrottled);
		});

		onUnmounted(() => {
			window.removeEventListener('resize', handleAvatarMenuPositionThrottled);
		});

		return {
			AVATAR_MENU_ID,
			openMenuId,
			numeral,
			mdiAccountCircle,
			mdiChevronDown,
			mdiMagnify,
			mdiMenu,
			onHover,
			avatar,
			lendButton,
			aboutUsLink,
			partnerWithUsLink,
			borrowLink,
			supportKivaLink,
			basketLink,
			signInLink,
			menuButton,
			lendUrl,
			handleOnHover,
			handleTouchStart,
			handleMouseOut,
			handleAvatarMenuPosition,
			KvHeaderMobileMenu,
			KvHeaderMyKivaMenu,
			KvLendMenu,
			KvHeaderTakeActionMenu,
			KvHeaderAboutMenu,
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
