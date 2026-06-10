<template>
	<nav
		class="tw-flex tw-flex-col tw-items-start tw-font-medium tw-mt-0.5 tw-pb-1 tw-px-2"
	>
		<kv-header-menu-link
			:href="myDashboardUrl"
			class="md:tw-hidden"
			@click="onLinkClick('click-Dashboard')"
		>
			My Dashboard
		</kv-header-menu-link>
		<template v-if="isBorrower">
			<kv-header-menu-link
				href="/my/borrower"
				@click="onLinkClick('click-Portfolio-My borrower dashboard')"
			>
				My borrower dashboard
			</kv-header-menu-link>
			<template v-if="mostRecentBorrowedLoanId !== null">
				<kv-header-menu-link
					:href="`/lend/${mostRecentBorrowedLoanId}`"
					@click="onLinkClick('click-Portfolio-My loan page')"
				>
					My loan page
				</kv-header-menu-link>
				<kv-header-menu-link
					:href="`/lend-classic/${mostRecentBorrowedLoanId}#loanComments`"
					@click="onLinkClick('click-Portfolio-My Conversations')"
				>
					My conversations
				</kv-header-menu-link>
			</template>
		</template>
		<template v-if="isTrustee">
			<template v-if="!isBorrower">
				<kv-header-menu-link
					:href="trusteeLoansUrl"
					@click="onLinkClick('click-Portfolio-My Trustee loans')"
				>
					My Trustee loans
				</kv-header-menu-link>
				<kv-header-menu-link
					:href="`/trustees/${trusteeId}`"
					@click="onLinkClick('click-Portfolio-My public Trustee page')"
				>
					My public Trustee page
				</kv-header-menu-link>
			</template>
			<kv-header-menu-link
				href="/my/trustee"
				@click="onLinkClick('click-Portfolio-My Trustee dashboard')"
			>
				My Trustee dashboard
			</kv-header-menu-link>
		</template>
		<kv-header-menu-link
			href="/portfolio"
			@click="onLinkClick('click-Portfolio-Portfolio')"
		>
			Portfolio
		</kv-header-menu-link>
		<kv-header-menu-link
			href="/teams/my-teams"
			@click="onLinkClick('click-Portfolio-My teams')"
		>
			My Teams
		</kv-header-menu-link>
		<kv-header-menu-link
			href="/portfolio/donations"
			@click="onLinkClick('click-Portfolio-Donations')"
		>
			Donations
		</kv-header-menu-link>
		<kv-header-menu-link
			href="/settings"
			@click="onLinkClick('click-Portfolio-Settings')"
		>
			Settings
		</kv-header-menu-link>
		<kv-header-menu-link
			href="/ui-logout"
			class="tw-border-t tw-border-secondary tw-w-full"
			@click="onLinkClick('click-Portfolio-Sign out')"
		>
			Sign out
		</kv-header-menu-link>
	</nav>
</template>

<script lang="ts">
import { computed, inject } from 'vue';
import KvHeaderMenuLink from '#components/KvWwwHeader/KvHeaderMenuLink.vue';

interface TrackEvent {
	// eslint-disable-next-line no-unused-vars
	(category: string, action: string, label?: string, value?: number): void;
}

export default {
	name: 'MyKivaMenu',
	components: { KvHeaderMenuLink },
	props: {
		// Accepts the orchestrator's user props; loggedIn/userId are part of the shared menu contract.
		loggedIn: {
			type: Boolean,
			default: false,
		},
		userId: {
			type: Number,
			default: null,
		},
		isBorrower: {
			type: Boolean,
			default: false,
		},
		isTrustee: {
			type: Boolean,
			default: false,
		},
		trusteeId: {
			type: Number,
			default: null,
		},
		mostRecentBorrowedLoanId: {
			type: Number,
			default: null,
		},
		myDashboardUrl: {
			type: String,
			default: '/mykiva',
		},
		isMobile: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['closing-menu'],
	setup(props, { emit }) {
		const $kvTrackEvent = inject<TrackEvent>('$kvTrackEvent', () => {});

		// Matches the legacy ui/TheHeader trusteeLoansUrl: fundraising loans for this trustee, newest first.
		const trusteeLoansUrl = computed(
			() => `/lend?trustee=${props.trusteeId}&status=fundraising&sortBy=newest`,
		);

		function onLinkClick(action: string): void {
			$kvTrackEvent('TopNav', action);
			emit('closing-menu');
		}

		return { trusteeLoansUrl, onLinkClick };
	},
};
</script>

<style lang="postcss" scoped>
/*
 * Apply tw-py-1 to anchors to match the cms-page-server / ui dropdown rhythm.
 * Scoped :deep beats the utility class on the anchor by attribute-selector specificity.
 */
:deep(a) {
	@apply tw-py-1;
}
</style>
