<template>
	<div
		class="tw-h-full tw-flex tw-items-center tw-gap-0.5 md:tw-gap-2 lg:tw-gap-2.5"
		@touchstart="handleEmptySpaceClick"
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
			@touchstart.stop="handleTouchStart('menuButton', KvHeaderMobileMenu)"
		>
			<kv-material-icon :icon="mdiMenu" />
		</button>
		<!-- lend -->
		<KvHeaderDropdownLink
			v-kv-track-event="['TopNav', 'click-Lend']"
			class="tw-py-1"
			ref-name="lendButton"
			:href="lendUrl"
			:menu-component="KvLendMenu"
			:open-menu-item="openMenuItem"
			:dropdown-icon="mdiChevronDown"
			base-class="tw-inline-flex md:tw-border md:tw-rounded-md tw-px-1.5 tw-py-0.5"
			@on-hover="handleOnHover"
			@mouseleave="handleMouseOut('lendButton')"
			@touchstart.stop="handleTouchStart('lendButton', KvLendMenu)"
		>
			Lend
		</KvHeaderDropdownLink>
		<!-- Take Action -->
		<KvHeaderDropdownLink
			v-kv-track-event="['TopNav', 'click-take-action']"
			ref-name="takeActionButton"
			base-class="tw-hidden md:tw-inline-flex tw-py-1"
			:menu-component="KvHeaderTakeActionMenu"
			:open-menu-item="openMenuItem"
			:dropdown-icon="mdiChevronDown"
			send-link-position
			@on-hover="handleOnHover"
			@mouseleave="handleMouseOut('takeActionButton')"
			@user-tap="handleTouchStart"
		>
			Take action
		</KvHeaderDropdownLink>
		<!-- about (lg) -->
		<KvHeaderDropdownLink
			ref-name="aboutUsLink"
			data-testid="header-about"
			base-class="tw-hidden md:tw-inline-flex tw-py-1"
			:menu-component="KvHeaderAboutMenu"
			:open-menu-item="openMenuItem"
			:dropdown-icon="mdiChevronDown"
			send-link-position
			@on-hover="handleOnHover"
			@mouseleave="handleMouseOut('aboutUsLink')"
			@user-tap="handleTouchStart"
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
			class="header-link tw-relative md:!tw-mr-0 tw-flex tw-items-center tw-gap-0.5"
			:class="{'tw-text-tertiary': !!openMenuItem}"
			style="margin-right: 2px;"
			data-testid="header-basket"
		>
			<kv-icon-bag
				class="tw-w-3 tw-h-3 md:tw-w-3.5 md:tw-h-3.5 tw-pointer-events-none"
				:count="basketCount"
			/>
			<span class="tw-hidden md:tw-block">Basket</span>
		</a>
		<div
			class="md:tw-py-1"
			@mouseenter="handleOnHover(AVATAR_MENU_ID, KvHeaderMyKivaMenu, getAvatarMenuPosition())"
			@mouseleave="handleMouseOut(AVATAR_MENU_ID)"
			@touchstart.stop="handleTouchStart(AVATAR_MENU_ID)"
		>
			<div
				v-show="loggedIn"
				ref="avatar"
				class="tw-cursor-pointer tw-flex tw-items-center tw-gap-1 tw-bg-eco-green-1
					tw-rounded-md tw-py-0.5 md:tw-py-1 tw-px-1 md:tw-px-2"
			>
				<!-- avatar (sm, auth) -->
				<kv-material-icon
					v-if="isLegacyPlaceholderAvatar(avatarFilename) || !avatarFilename"
					:icon="mdiAccountCircle"
					class="tw-w-3"
				/>
				<KvUserAvatar
					v-else
					class="avatar"
					:lender-name="lenderName"
					:lender-image-url="lenderImageUrl"
					is-small
				/>
				<!-- balance (auth) -->
				<span class="tw-text-eco-green-4">
					{{ numeral(roundedBalance).format('$0') }}
				</span>
			</div>
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
	defineAsyncComponent, onMounted, ref, computed, onUnmounted, watch, inject,
} from 'vue';
import {
	mdiAccountCircle, mdiMenu, mdiChevronDown, mdiMagnify,
} from '@mdi/js';
import numeral from 'numeral';
import tokens from '@kiva/kv-tokens';
import KvMaterialIcon from '../KvMaterialIcon.vue';
import KvIconBag from '../KvIconBag.vue';
import KvHeaderDropdownLink from './KvHeaderDropdownLink.vue';
import KvUserAvatar from '../KvUserAvatar.vue';
import { throttle } from '../../utils/throttle';
import { isLegacyPlaceholderAvatar } from '../../utils/imageUtils';

const KvHeaderMobileMenu = defineAsyncComponent(() => import('./KvHeaderMobileMenu.vue'));
const KvHeaderMyKivaMenu = defineAsyncComponent(() => import('./KvHeaderMyKivaMenu.vue'));
const KvLendMenu = defineAsyncComponent(() => import('./LendMenu/KvLendMenu.vue'));
const KvHeaderTakeActionMenu = defineAsyncComponent(() => import('./KvHeaderTakeActionMenu.vue'));
const KvHeaderAboutMenu = defineAsyncComponent(() => import('./KvHeaderAboutMenu.vue'));

const AVATAR_MENU_WIDTH = 150;
const AVATAR_MENU_ID = 'avatar-menu';
const MOBILE_MENU_ITEM = 'menuButton';
const MOBILE_MENU_BASE_POS = { top: '-3.75rem', width: '100%' };
const LEND_MENU_ITEM = 'lendButton';

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

		const $kvTrackEvent = inject('$kvTrackEvent');

		const onHover = (item, menu, targetPosition = null) => {
			emit('item-hover', item, menu, targetPosition);
		};

		const handleOnHover = (item, menu, targetPosition = null) => {
			// Detect input method (mouse vs touch) instead of relying only on screen size
			if (!navigator.maxTouchPoints) {
				if (item === LEND_MENU_ITEM && openMenuId.value !== LEND_MENU_ITEM) {
					$kvTrackEvent(
						'TopNav',
						'hover-Lend-menu',
						'Lend',
					);
				}
				openMenuId.value = item;

				onHover(
					item,
					menu,
					item === MOBILE_MENU_ITEM && props.isMobile ? MOBILE_MENU_BASE_POS : targetPosition,
				);
			}
		};

		const handleMouseOut = (item) => {
			if (!navigator.maxTouchPoints && openMenuId.value === item) {
				openMenuId.value = null;
				onHover();
			}
		};

		const getAvatarMenuPosition = () => {
			const linkRect = avatar.value?.getBoundingClientRect();
			if (!linkRect) return null;

			const left = linkRect.left + linkRect.width / 2;
			const menuLeft = left - AVATAR_MENU_WIDTH / 2;
			const rightPosition = `${window.innerWidth - menuLeft - AVATAR_MENU_WIDTH}px`;
			const isMobile = window?.innerWidth < tokens.breakpoints.md;

			return {
				right: isMobile ? 0 : rightPosition,
			};
		};

		const handleAvatarMenuPosition = () => {
			openMenuId.value = AVATAR_MENU_ID;
			onHover(avatar.value, KvHeaderMyKivaMenu, getAvatarMenuPosition());
		};

		const handleTouchStart = (item, menu, targetPosition) => {
			if (item === LEND_MENU_ITEM && openMenuId.value !== LEND_MENU_ITEM) {
				$kvTrackEvent(
					'TopNav',
					'hover-Lend-menu',
					'Lend',
				);
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
					onHover(item, menu, targetPosition);
				}
			} else {
				openMenuId.value = null;
				onHover();
			}
		};

		const handleAvatarMenuPositionThrottled = throttle(() => {
			if (openMenuId.value === AVATAR_MENU_ID) {
				handleAvatarMenuPosition();
			}
		}, 100);

		const lendUrl = computed(() => {
			return !props.isMobile ? '/lend-by-category' : undefined;
		});

		const avatarFilename = computed(() => {
			return props.lenderImageUrl?.split('/').pop() ?? '';
		});

		const roundedBalance = computed(() => Math.floor(props.balance));

		const handleEmptySpaceClick = (event) => {
			// Only close if the click target is the container itself (not a child)
			if (event.target === event.currentTarget) {
				onHover();
			}
		};

		watch(
			() => props.isMobile,
			() => {
				if (openMenuId.value === AVATAR_MENU_ID) {
					handleAvatarMenuPosition();
				}
			},
		);

		watch(
			() => props.openMenuItem,
			(menuItem) => {
				if (!menuItem) {
					openMenuId.value = null;
				}
			},
		);

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
			avatarFilename,
			handleOnHover,
			handleTouchStart,
			handleMouseOut,
			handleAvatarMenuPosition,
			KvHeaderMobileMenu,
			KvHeaderMyKivaMenu,
			KvLendMenu,
			KvHeaderTakeActionMenu,
			KvHeaderAboutMenu,
			isLegacyPlaceholderAvatar,
			getAvatarMenuPosition,
			handleEmptySpaceClick,
			roundedBalance,
		};
	},
};
</script>

<style lang="postcss" scoped>
.header-link {
	@apply tw-py-2 tw-cursor-pointer tw-no-underline
		hover:tw-no-underline tw-text-primary hover:tw-text-action;
}

:deep(.avatar div:first-child) {
	@apply tw-flex;
}
</style>
