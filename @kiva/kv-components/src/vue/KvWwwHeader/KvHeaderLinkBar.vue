<template>
	<div
		class="tw-h-full tw-flex tw-items-center"
	>
		<!-- 3-bar menu (sm) -->
		<button
			ref="menuButton"
			v-kv-track-event="openMenuItem === KvHeaderMobileMenu
				? ['TopNav', 'click-Hamburger-menu']
				: null"
			class="header-link tw-inline-flex lg:tw-hidden"
			:class="{
				'tw-text-tertiary': openMenuItem && openMenuItem !== KvHeaderMobileMenu
			}"
			@mouseover="onHover(menuButton, KvHeaderMobileMenu)"
			@mouseout="onHover()"
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
			:on-hover="onHover"
			:dropdown-icon="mdiChevronDown"
			base-class="tw-inline-flex"
		>
			Lend
		</KvHeaderDropdownLink>
		<!-- Take Action -->
		<KvHeaderDropdownLink
			v-kv-track-event="['TopNav', 'click-TakeAction']"
			ref-name="takeActionButton"
			base-class="tw-hidden lg:tw-inline-flex"
			:menu-component="KvHeaderTakeActionMenu"
			:open-menu-item="openMenuItem"
			:on-hover="onHover"
			:dropdown-icon="mdiChevronDown"
			send-link-position
		>
			Take action
		</KvHeaderDropdownLink>
		<!-- about (lg) -->
		<KvHeaderDropdownLink
			v-kv-track-event="['TopNav', 'click-About']"
			ref-name="aboutUsLink"
			base-class="tw-hidden lg:tw-inline-flex"
			:menu-component="KvHeaderAboutMenu"
			:open-menu-item="openMenuItem"
			:on-hover="onHover"
			:dropdown-icon="mdiChevronDown"
			send-link-position
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
			class="header-link tw-hidden lg:tw-block"
			:class="{'tw-text-tertiary': !!openMenuItem}"
		>
			My dashboard
		</a>
		<!-- basket (items) -->
		<a
			v-if="basketCount > 0"
			ref="basketLink"
			v-kv-track-event="['TopNav', 'click-Basket']"
			href="/basket"
			class="header-link tw-relative"
			:class="{'tw-text-tertiary': !!openMenuItem}"
		>
			<kv-icon-bag
				class="tw-w-3 tw-h-3 tw-pointer-events-none"
				:count="basketCount"
			/>
		</a>
		<div
			class="tw-cursor-pointer tw-flex tw-items-center tw-gap-1"
			@mouseover="handleAvatarMenuPosition"
			@mouseout="onHover()"
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

		const onHover = (item, menu, targetPosition = null) => {
			emit('item-hover', item, menu, targetPosition);
		};

		const handleAvatarMenuPosition = () => {
			const avatarMenuWidth = 118;
			const linkRect = avatar.value?.imageRef?.getBoundingClientRect();
			const left = linkRect?.left + linkRect?.width / 2;

			// Calculate the left edge of the menu
			let menuLeft = left - avatarMenuWidth / 2;

			// Prevent overflow on the right
			if (menuLeft + avatarMenuWidth > window.outerWidth) {
				menuLeft = window.outerWidth - avatarMenuWidth;
			}

			onHover(avatar.value, KvHeaderMyKivaMenu, {
				left: props.isMobile ? 0 : menuLeft,
				borderRadius: '0px 0px 8px 8px',
				width: `${props.isMobile ? '100%' : 'auto'}`,
			});
		};

		const handleAvatarMenuPositionThrottled = throttle(handleAvatarMenuPosition, 50);

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
	@apply tw-px-1 lg:tw-px-2.5 tw-py-2 tw-cursor-pointer tw-no-underline
		hover:tw-no-underline tw-text-primary hover:tw-text-action;
}
</style>
