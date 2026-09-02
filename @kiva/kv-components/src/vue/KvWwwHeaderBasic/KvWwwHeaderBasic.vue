<template>
	<kv-theme-provider
		tag="div"
		class="tw-bg-primary"
	>
		<nav
			class="tw-font-medium tw-relative"
			:style="{ minHeight: MIN_HEADER_HEIGHT }"
		>
			<kv-page-container>
				<transition name="header-fade">
					<link-bar
						v-show="linksVisible"
						ref="linkBarRef"
						:logged-in="loggedIn"
						:basket-count="basketCount"
						:balance="balance"
						:user-id="userId"
						:is-borrower="isBorrower"
						:is-trustee="isTrustee"
						:trustee-id="trusteeId"
						:most-recent-borrowed-loan-id="mostRecentBorrowedLoanId"
						:lender-name="lenderName"
						:lender-image-url="lenderImageUrl"
						:is-user-data-loading="isUserDataLoading"
						:is-basket-data-loading="isBasketDataLoading"
						:use-esi-avatar="useEsiAvatar"
						:show-m-g-upsell-link="showMGUpsellLink"
						:login-url="loginUrl"
						:my-dashboard-url="myDashboardUrl"
						:countries-not-lent-to-url="countriesNotLentToUrl"
						:app-origin="resolvedAppOrigin"
						:search-suggestions="effectiveSuggestions"
						:is-mobile="isMobile"
						@load-lend-menu-data="$emit('load-lend-menu-data')"
						@load-search-data="$emit('load-search-data')"
						@search-submit="$emit('search-submit', $event)"
						@login-click="$emit('login-click', $event)"
					/>
				</transition>
			</kv-page-container>
		</nav>
	</kv-theme-provider>
</template>

<script lang="ts">
import { ref, computed, onMounted } from 'vue';
import { gql } from '@apollo/client/core';
import KvThemeProvider from '#components/KvThemeProvider.vue';
import KvPageContainer from '#components/KvPageContainer.vue';
import { useBreakpoints } from '#utils/useBreakpoints';
import type { SearchSuggestion } from '#utils/typeaheadSearchEngine';
import LinkBar from './LinkBar.vue';

// Initial nav min-height; the rendered height is measured into --nav-height after mount.
const MIN_HEADER_HEIGHT = '4rem';

// Loan search-suggestion dataset for the header search bar. Fetched on demand via the exposed
// loadSearchSuggestions(apollo) method (mirrors KvLendMenu's loadMenuData paradigm); the host
// wires it to @load-search-data and still owns navigation on @search-submit.
const LOAN_SEARCH_SUGGESTIONS_QUERY = gql`
	query loanSearchSuggestions {
		lend {
			loanSearchSuggestions {
				group
				label
				query
			}
		}
	}
`;

// Public instance shape of the link bar (it exposes loadMenuData for the Lend menu's data fetch).
interface LinkBarInstance {
	// eslint-disable-next-line no-unused-vars
	loadMenuData?(apollo: unknown): void;
}

// Minimal shape of the Apollo client the host passes in; only `query` is used here.
interface ApolloClientLike {
	// eslint-disable-next-line no-unused-vars
	query(options: unknown): Promise<{ data?: unknown }>;
}

/**
 * Presentational global site header (Q4 2026 Figma desktop + KvWwwHeader mobile drawer paradigm).
 * Props in, events out: `load-lend-menu-data`, `load-search-data`, `search-submit`, `login-click`.
 *
 * `login-click` carries the native MouseEvent from the Log in link. Hosts whose login is not a plain
 * navigation can call preventDefault() on it and run their own flow; hosts that ignore the event
 * navigate to `loginUrl` unchanged.
 */
export default {
	name: 'KvWwwHeaderBasic',
	components: {
		KvThemeProvider, KvPageContainer, LinkBar,
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
		// Only for hosts whose ESI emits --user-avatar; without it the avatar renders an empty image.
		useEsiAvatar: { type: Boolean, default: false },
		showMGUpsellLink: { type: Boolean, default: false },
		loginUrl: { type: String, default: '/ui-login' },
		myDashboardUrl: { type: String, default: '/mykiva' },
		countriesNotLentToUrl: { type: String, default: '/lend/countries-not-lent' },
		appOrigin: { type: String, default: '' },
		searchSuggestions: { type: Array as () => SearchSuggestion[], default: () => [] },
		trusteeId: { type: Number, default: null },
		mostRecentBorrowedLoanId: { type: Number, default: null },
	},
	emits: ['load-lend-menu-data', 'load-search-data', 'search-submit', 'login-click'],
	setup(props) {
		const { isMobile, checkIsMobile } = useBreakpoints();

		const linkBarRef = ref<LinkBarInstance | null>(null);
		const linksVisible = ref(true);
		// appOrigin override falls back to the page origin (resolved after mount; SSR-safe because
		// search navigation is client-side). Hosts may stop passing :app-origin with no behavior change.
		const resolvedAppOrigin = ref(props.appOrigin);

		const fetchedSuggestions = ref<SearchSuggestion[]>([]);
		let searchDataRequested = false;

		// Prefer fetched suggestions once loaded; otherwise fall back to the host-passed prop so
		// the header keeps working for hosts that haven't moved to loadSearchSuggestions yet.
		const effectiveSuggestions = computed<SearchSuggestion[]>(
			() => (fetchedSuggestions.value.length ? fetchedSuggestions.value : props.searchSuggestions),
		);

		// Exposed so hosts can trigger the active menu's data fetch (matches KvWwwHeader's loadMenuData).
		// apollo stays `unknown` here: loadMenuData only forwards the opaque client to the Lend menu's
		// onLoad; unlike loadSearchSuggestions it never calls query() on it directly.
		function loadMenuData(apollo: unknown): void {
			linkBarRef.value?.loadMenuData?.(apollo);
		}

		// Exposed so hosts can trigger the search-suggestion fetch (matches loadMenuData). Run-once.
		async function loadSearchSuggestions(apollo: ApolloClientLike): Promise<void> {
			if (searchDataRequested) return;
			searchDataRequested = true;
			try {
				const { data } = await apollo.query({ query: LOAN_SEARCH_SUGGESTIONS_QUERY });
				const raw = (data as { lend?: { loanSearchSuggestions?: Array<SearchSuggestion | null> } })
					?.lend?.loanSearchSuggestions ?? [];
				fetchedSuggestions.value = raw
					.filter((s): s is SearchSuggestion => !!s)
					.map((s) => ({ group: s.group ?? '', label: s.label ?? '', query: s.query ?? undefined }));
			} catch {
				// Reset the run-once guard so a later focus can retry; the searchSuggestions prop
				// fallback keeps the search bar working in the meantime.
				searchDataRequested = false;
			}
		}

		onMounted(() => {
			if (!props.appOrigin && typeof window !== 'undefined') {
				resolvedAppOrigin.value = window.location.origin;
			}
			checkIsMobile();
		});

		return {
			MIN_HEADER_HEIGHT,
			linkBarRef,
			linksVisible,
			resolvedAppOrigin,
			effectiveSuggestions,
			isMobile,
			loadMenuData,
			loadSearchSuggestions,
		};
	},
};
</script>

<style lang="postcss" scoped>
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
