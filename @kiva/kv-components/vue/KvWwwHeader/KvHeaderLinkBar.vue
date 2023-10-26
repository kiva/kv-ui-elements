<template>
	<div
		class="tw-h-full tw-flex tw-items-center"
		@mouseout="onHover()"
	>
		<!-- avatar (sm, auth) -->
		<button
			v-if="loggedIn"
			ref="avatar"
			class="header-link lg:tw-order-last tw-inline-flex"
			:class="{
				'tw-text-action': !hoveredItem || hoveredItem === avatar,
				'tw-text-tertiary': hoveredItem && hoveredItem !== avatar
			}"
			@mouseover="onHover(avatar, KvHeaderMyKivaMenu)"
		>
			<kv-material-icon
				:icon="mdiAccountCircle"
				class="tw-w-3"
			/>
		</button>
		<!-- lend -->
		<a
			ref="lendButton"
			class="
				tw-px-1.5 tw-py-1 tw-mx-1
				tw-border-2 tw-rounded
				tw-text-eco-green-3 tw-border-current
				hover:tw-no-underline
				tw-inline-flex tw-items-baseline
			"
			:class="{'tw-text-tertiary': hoveredItem && hoveredItem !== lendButton}"
			@mouseover="onHover(lendButton, KvLendMenu)"
		>
			Lend
			<span class="tw-hidden lg:tw-inline tw-ml-0.5">now</span>
			<kv-icon-chevron class="tw-w-1.5 tw-ml-1.5" />
		</a>
		<!-- about us (lg) -->
		<a
			ref="aboutUsLink"
			class="header-link tw-hidden lg:tw-block"
			:class="{'tw-text-tertiary': hoveredItem && hoveredItem !== aboutUsLink}"
			@mouseover="onHover(aboutUsLink)"
		>
			About us
		</a>
		<!-- partner with us (lg) -->
		<a
			ref="partnerWithUsLink"
			class="header-link tw-hidden lg:tw-block"
			:class="{'tw-text-tertiary': hoveredItem && hoveredItem !== partnerWithUsLink}"
			@mouseover="onHover(partnerWithUsLink)"
		>
			Partner with us
		</a>
		<!-- logo spacer -->
		<div
			class="tw-flex-1 tw-h-full"
			@mouseover="onHover()"
		></div>
		<!-- borrow (lg, no-auth) -->
		<a
			v-if="!loggedIn"
			ref="borrowLink"
			class="header-link tw-hidden lg:tw-block"
			:class="{'tw-text-tertiary': hoveredItem && hoveredItem !== borrowLink}"
			@mouseover="onHover(borrowLink)"
		>
			Borrow
		</a>
		<!-- support kiva (lg) -->
		<a
			ref="supportKivaLink"
			class="header-link tw-hidden lg:tw-block"
			:class="{'tw-text-tertiary': hoveredItem && hoveredItem !== supportKivaLink}"
			@mouseover="onHover(supportKivaLink)"
		>
			Support Kiva
		</a>
		<!-- basket (items) -->
		<a
			v-if="basketCount > 0"
			ref="basketLink"
			class="header-link tw-relative"
			:class="{'tw-text-tertiary': hoveredItem && hoveredItem !== basketLink}"
			@mouseover="onHover(basketLink)"
		>
			<kv-icon-bag
				class="tw-w-3 tw-h-3 tw-pointer-events-none"
				:count="basketCount"
			/>
		</a>
		<!-- search icon -->
		<button
			ref="searchButton"
			class="header-link"
			:class="{
				'tw-text-action': !hoveredItem || hoveredItem === searchButton,
				'tw-text-tertiary': hoveredItem && hoveredItem !== searchButton
			}"
			@click="openSearch"
			@mouseover="onHover(searchButton)"
		>
			<kv-icon-search class="tw-w-3 tw-h-3" />
		</button>
		<!-- sign in (lg, no-auth) -->
		<a
			v-if="!loggedIn"
			ref="signInLink"
			class="header-link tw-hidden lg:tw-block"
			:class="{'tw-text-tertiary': hoveredItem && hoveredItem !== signInLink}"
			@mouseover="onHover(signInLink)"
		>
			Sign in
		</a>
		<!-- 3-bar menu (sm) -->
		<button
			ref="menuButton"
			class="header-link tw-inline-flex lg:tw-hidden"
			:class="{
				'tw-text-action': !hoveredItem || hoveredItem === menuButton,
				'tw-text-tertiary': hoveredItem && hoveredItem !== menuButton
			}"
			@mouseover="onHover(menuButton, KvHeaderMobileMenu)"
		>
			<kv-material-icon :icon="mdiMenu" />
		</button>
	</div>
</template>

<script>
import {
	ref,
} from 'vue-demi';
import { mdiAccountCircle, mdiMenu } from '@mdi/js';
import KvIconBag from '../KvIconBag.vue';
import KvIconChevron from '../KvIconChevron.vue';
import KvIconSearch from '../KvIconSearch.vue';
import KvMaterialIcon from '../KvMaterialIcon.vue';

const KvHeaderMobileMenu = () => import('./KvHeaderMobileMenu.vue');
const KvHeaderMyKivaMenu = () => import('./KvHeaderMyKivaMenu.vue');
const KvLendMenu = () => import('./LendMenu/KvLendMenu.vue');

export default {
	components: {
		KvIconBag,
		KvIconChevron,
		KvIconSearch,
		KvMaterialIcon,
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
		hoveredItem: {
			type: Element,
			default: null,
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

		return {
			mdiAccountCircle,
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
		};
	},
};
</script>

<style lang="postcss" scoped>
.header-link {
	@apply tw-px-1 tw-py-2 tw-cursor-pointer hover:tw-no-underline hover:tw-text-action;
}
</style>
