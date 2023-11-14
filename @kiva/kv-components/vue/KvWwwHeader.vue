<template>
	<kv-theme-provider
		tag="header"
		:theme="ecoForestTheme"
		class="tw-bg-primary"
	>
		<nav
			class="
				header-margins
				tw-relative
				tw-py-1 tw-px-1.5
				tw-font-medium
				tw-h-7.5
			"
		>
			<!-- link bar -->
			<transition
				name="header-fade"
				@after-leave="afterLinksNotVisible"
			>
				<kv-header-link-bar
					v-show="linksVisible"
					:logged-in="loggedIn"
					:basket-count="basketCount"
					:login-url="loginUrl"
					:open-menu-item="menuComponent"
					@item-hover="onHover"
					@open-search="openSearch"
				/>
			</transition>
			<!-- logo -->
			<a
				href="/"
				class="
					tw-px-1 tw-py-2
					tw-cursor-pointer
					tw-absolute
					tw-top-1/2 tw-left-1/2
					tw--translate-y-1/2 tw--translate-x-1/2
					tw-transition-all tw-duration-300
				"
				:class="{
					'tw-opacity-0 md:tw-opacity-full md:tw-left-2.5 md:tw-translate-x-0': searchOpen,
				}"
			>
				<kv-header-logo />
			</a>
			<!-- search bar -->
			<transition
				name="header-fade"
				@after-enter="afterSearchOpen"
				@after-leave="afterSearchClosed"
			>
				<kv-header-search-bar
					v-show="searchOpen"
					ref="searchBar"
					class="
						tw-absolute
						tw-left-1/2 tw--translate-x-1/2
						tw-top-1/2 tw--translate-y-1/2
						tw-h-full tw-w-full
					"
					:style="{
						'max-width': '600px',
					}"
					@close-search="closeSearch"
				/>
			</transition>
		</nav>
		<transition
			name="header-fade"
			@after-enter="afterSearchOpen"
			@after-leave="afterSearchClosed"
		>
			<kv-header-search-suggestions v-if="searchOpen" />
		</transition>
		<!-- menu drawer -->
		<transition
			name="header-fade"
		>
			<div
				v-show="menuOpen || searchOpen"
				class="
					tw-absolute tw-z-modal
					tw-top-7.5 tw-inset-x-0 tw-bottom-0
					tw-bg-eco-green-4
					tw-bg-opacity-[50%]
				"
				@click="closeSearch"
			>
				<div
					class="tw-bg-primary tw-w-full"
					@mouseover="onHover(activeHeaderItem, menuComponent)"
					@mouseout="onHover()"
				>
					<div class="header-margins tw-px-2.5">
						<component
							:is="menuComponent"
							ref="menuComponentInstance"
							:logged-in="loggedIn"
							:login-url="loginUrl"
							@load-lend-menu-data="emitLendMenuEvent"
						/>
					</div>
				</div>
			</div>
		</transition>
	</kv-theme-provider>
</template>

<script>
import {
	ref,
} from 'vue-demi';
import {
	ecoForestTheme,
} from '@kiva/kv-tokens/configs/kivaColors.cjs';
import KvHeaderLinkBar from './KvWwwHeader/KvHeaderLinkBar.vue';
import KvHeaderLogo from './KvWwwHeader/KvHeaderLogo.vue';
import KvHeaderMobileMenu from './KvWwwHeader/KvHeaderMobileMenu.vue';
import KvHeaderSearchBar from './KvWwwHeader/KvHeaderSearchBar.vue';
import KvThemeProvider from './KvThemeProvider.vue';
import KvHeaderSearchSuggestions from './KvWwwHeader/KvHeaderSearchSuggestions.vue';

export default {
	components: {
		KvHeaderLinkBar,
		KvHeaderLogo,
		KvHeaderMobileMenu,
		KvHeaderSearchBar,
		KvThemeProvider,
		KvHeaderSearchSuggestions,
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
		loginUrl: {
			type: String,
			default: '/ui-login',
		},
	},
	emits: [
		'load-lend-menu-data',
	],
	setup(props, { emit }) {
		const linksVisible = ref(true);
		const searchBar = ref(null);
		const searchOpen = ref(false);
		const activeHeaderItem = ref(null);
		const menuOpen = ref(false);
		const menuComponent = ref(null);
		const menuComponentInstance = ref(null);

		let menuCloseTimeout;

		const onHover = (item, menu) => {
			// if menu, open menu, and clear timeout
			// if no menu and menu open, start close menu timeout
			if (menu) {
				clearTimeout(menuCloseTimeout);
				menuComponent.value = menu;
				menuOpen.value = true;
			} else if (menuOpen.value) {
				menuCloseTimeout = setTimeout(() => {
					menuOpen.value = false;
					menuComponent.value = null;
				}, 200);
			}
		};

		// Search bar opening animation sequence
		// 1. Fade out other header links
		const openSearch = () => {
			linksVisible.value = false;
		};
		// 2. Reveal search bar, expanding from origin point
		const afterLinksNotVisible = () => {
			searchOpen.value = true;
		};
		// 3. Focus search input
		const afterSearchOpen = () => {
			searchBar.value?.onOpen();
		};

		// Search bar closing animation sequence
		// 1. Hide search bar, collapsing to origin point
		const closeSearch = () => {
			searchOpen.value = false;
		};
		// 2. Fade in other header links
		const afterSearchClosed = () => {
			linksVisible.value = true;
		};

		const getSuggestions = (apollo) => {
			searchBar.value?.getSuggestions(apollo);
		};

		const loadMenuData = (apollo) => {
			menuComponentInstance.value?.onLoad(apollo);
		};

		// This event will be used as a signal to call loadMenuData
		const emitLendMenuEvent = () => {
			emit('load-lend-menu-data');
		};

		return {
			ecoForestTheme,

			afterLinksNotVisible,
			afterSearchClosed,
			afterSearchOpen,
			emitLendMenuEvent,

			linksVisible,
			searchOpen,
			menuOpen,

			onHover,
			openSearch,
			closeSearch,
			getSuggestions,
			loadMenuData,

			activeHeaderItem,
			searchBar,
			menuComponent,
		};
	},
};
</script>

<style lang="postcss" scoped>
.header-margins {
	margin: 0 auto;
	max-width: 1400px;
}

.header-fade-enter-active {
	@apply tw-transition-opacity tw-duration-300;
}
.header-fade-leave-active {
	@apply tw-transition-opacity tw-duration-100;
}
.header-fade-enter,
.header-fade-leave-to {
	@apply tw-opacity-0;
}
.header-fade-leave,
.header-fade-enter-to {
	@apply tw-opacity-full;
}
</style>
