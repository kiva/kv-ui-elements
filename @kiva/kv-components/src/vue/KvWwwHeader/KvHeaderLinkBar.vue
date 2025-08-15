<template>
	<div
		class="tw-h-full tw-flex tw-items-center"
	>
		<!-- avatar (sm, auth) -->
		<button
			v-if="loggedIn"
			ref="avatar"
			class="header-link lg:tw-order-last tw-inline-flex"
			:class="{
				'tw-text-tertiary': openMenuItem && openMenuItem !== KvHeaderMyKivaMenu
			}"
			@mouseover="onHover(avatar, KvHeaderMyKivaMenu)"
			@mouseout="onHover()"
		>
			<kv-material-icon
				:icon="mdiAccountCircle"
				class="tw-w-3"
			/>
		</button>
		<!-- lend -->
		<KvHeaderDropdownLink
			v-kv-track-event="['TopNav', 'click-Lend']"
			ref-name="lendButton"
			:href="'/lend-by-category'"
			:menu-component="KvLendMenu"
			:open-menu-item="openMenuItem"
			:on-hover="onHover"
			:dropdown-icon="mdiChevronDown"
			base-class="tw-border-2 tw-border-current tw-inline-flex"
		>
			Lend
			<span class="tw-hidden lg:tw-inline tw-ml-0.5">now</span>
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
		<!-- search icon -->
		<button
			ref="searchButton"
			v-kv-track-event="['TopNav', 'click-Search-toggle']"
			class="header-link tw-flex"
			:class="{
				'tw-text-tertiary': !!openMenuItem
			}"
			@click="openSearch"
		>
			<kv-material-icon
				class="tw-w-3 tw-h-3"
				:icon="mdiMagnify"
			/>
		</button>
		<!-- sign in (lg, no-auth) -->
		<a
			v-if="!loggedIn"
			ref="signInLink"
			v-kv-track-event="['TopNav', 'click-Sign-in']"
			:href="loginUrl"
			class="header-link tw-hidden lg:tw-block"
			:class="{'tw-text-tertiary': !!openMenuItem}"
		>
			Sign in
		</a>
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
	</div>
</template>

<script>
import { defineAsyncComponent, onMounted, ref } from 'vue';
import {
	mdiAccountCircle, mdiMenu, mdiChevronDown, mdiMagnify,
} from '@mdi/js';
import KvMaterialIcon from '../KvMaterialIcon.vue';
import KvIconBag from '../KvIconBag.vue';
import KvHeaderDropdownLink from './KvHeaderDropdownLink.vue';

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
	},
	emits: [
		'item-hover',
		'open-search',
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
		const searchButton = ref(null);
		const signInLink = ref(null);
		const menuButton = ref(null);

		const onHover = (item, menu) => {
			emit('item-hover', item, menu);
		};

		const openSearch = () => {
			emit('open-search', searchButton.value?.offsetLeft);
		};

		onMounted(() => {
			import('./KvHeaderMobileMenu.vue');
			import('./KvHeaderMyKivaMenu.vue');
			import('./LendMenu/KvLendMenu.vue');
			import('./KvHeaderTakeActionMenu.vue');
			import('./KvHeaderAboutMenu.vue');
		});

		return {
			mdiAccountCircle,
			mdiChevronDown,
			mdiMagnify,
			mdiMenu,

			onHover,
			openSearch,

			avatar,
			lendButton,
			aboutUsLink,
			partnerWithUsLink,
			borrowLink,
			supportKivaLink,
			basketLink,
			searchButton,
			signInLink,
			menuButton,

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
