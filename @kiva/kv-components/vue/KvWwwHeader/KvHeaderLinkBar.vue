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
		<a
			ref="lendButton"
			href="/lend-by-category"
			class="
				tw-px-1.5 tw-py-1 tw-mx-1
				tw-border-2
				tw-text-eco-green-3 tw-border-current
				hover:tw-no-underline
				tw-inline-flex tw-items-baseline
			"
			:class="{
				'tw-text-tertiary': openMenuItem && openMenuItem !== KvLendMenu,
			}"
			style="border-radius: 1rem;"
			@mouseover="onHover(lendButton, KvLendMenu)"
			@mouseout="onHover()"
		>
			Lend
			<span class="tw-hidden lg:tw-inline tw-ml-0.5">now</span>
			<kv-icon-chevron
				class="tw-hidden md:tw-inline tw-w-1.5 tw-ml-1.5 tw-transition-transform tw-duration-300"
				:class="{'tw-rotate-180' : openMenuItem === KvLendMenu}"
			/>
		</a>
		<!-- about us (lg) -->
		<a
			ref="aboutUsLink"
			href="/about"
			class="header-link tw-hidden lg:tw-block"
			:class="{'tw-text-tertiary': !!openMenuItem }"
		>
			About us
		</a>
		<!-- partner with us (lg) -->
		<a
			ref="partnerWithUsLink"
			href="/about/partner-with-us"
			class="header-link tw-hidden lg:tw-block"
			:class="{'tw-text-tertiary': !!openMenuItem}"
		>
			Partner with us
		</a>
		<!-- logo spacer -->
		<div
			class="tw-flex-1 tw-h-full"
		></div>
		<!-- borrow (lg, no-auth) -->
		<a
			v-if="!loggedIn"
			ref="borrowLink"
			href="/borrow"
			class="header-link tw-hidden lg:tw-block"
			:class="{'tw-text-tertiary': !!openMenuItem}"
		>
			Borrow
		</a>
		<!-- support kiva (lg) -->
		<a
			ref="supportKivaLink"
			href="/donate/supportus"
			class="header-link tw-hidden lg:tw-block"
			:class="{'tw-text-tertiary': !!openMenuItem}"
		>
			Support Kiva
		</a>
		<!-- basket (items) -->
		<a
			v-if="basketCount > 0"
			ref="basketLink"
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
			class="header-link"
			:class="{
				'tw-text-tertiary': !!openMenuItem
			}"
			@click="openSearch"
		>
			<kv-icon-search class="tw-w-3 tw-h-3" />
		</button>
		<!-- sign in (lg, no-auth) -->
		<a
			v-if="!loggedIn"
			ref="signInLink"
			:href="loginUrl"
			class="header-link tw-hidden lg:tw-block"
			:class="{'tw-text-tertiary': !!openMenuItem}"
		>
			Sign in
		</a>
		<!-- 3-bar menu (sm) -->
		<button
			ref="menuButton"
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
import {
	defineAsyncComponent,
	ref,
} from 'vue-demi';
import { mdiAccountCircle, mdiMenu } from '@mdi/js';
import KvIconBag from '../KvIconBag.vue';
import KvIconChevron from '../KvIconChevron.vue';
import KvIconSearch from '../KvIconSearch.vue';
import KvMaterialIcon from '../KvMaterialIcon.vue';

const KvHeaderMobileMenu = defineAsyncComponent(() => import('./KvHeaderMobileMenu.vue'));
const KvHeaderMyKivaMenu = defineAsyncComponent(() => import('./KvHeaderMyKivaMenu.vue'));
const KvLendMenu = defineAsyncComponent(() => import('./LendMenu/KvLendMenu.vue'));

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
		openMenuItem: {
			type: [Object, Function],
			default: null,
		},
		loginUrl: {
			type: String,
			default: '/ui-login',
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
	@apply tw-px-1 lg:tw-px-2.5 tw-py-2 tw-cursor-pointer hover:tw-no-underline hover:tw-text-action-highlight;
}
</style>
