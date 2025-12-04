<template>
	<nav class="tw--mt-0.5 tw-pb-0.5 tw-flex tw-flex-col tw-items-start tw-font-medium tw-px-2.5">
		<kv-header-menu-link
			v-kv-track-event="['TopNav', 'click-Dashboard']"
			:href="myDashboardUrl"
			class="md:tw-hidden"
		>
			My Dashboard
		</kv-header-menu-link>
		<kv-header-menu-link
			v-kv-track-event="['TopNav', 'click-Portfolio-Portfolio']"
			href="/portfolio"
		>
			Portfolio
		</kv-header-menu-link>
		<kv-header-menu-link
			v-kv-track-event="['TopNav', 'click-Portfolio-My teams']"
			href="/teams/my-teams"
		>
			My Teams
		</kv-header-menu-link>
		<kv-header-menu-link
			v-kv-track-event="['TopNav', 'click-Portfolio-Donations']"
			href="/portfolio/donations"
		>
			Donations
		</kv-header-menu-link>
		<kv-header-menu-link
			v-kv-track-event="['TopNav', 'click-Portfolio-Settings']"
			href="/settings"
		>
			Settings
		</kv-header-menu-link>
		<kv-header-menu-link
			v-if="isBorrower"
			v-kv-track-event="['TopNav', 'click-Portfolio-My borrower dashboard']"
			href="/my/borrower"
		>
			Borrower Dashboard
		</kv-header-menu-link>
		<kv-header-menu-link
			v-if="isTrustee"
			v-kv-track-event="['TopNav', 'click-Portfolio-My Trustee dashboard']"
			href="/my/trustee"
		>
			Trustee Dashboard
		</kv-header-menu-link>
		<kv-header-menu-link
			v-kv-track-event="['TopNav', 'click-Portfolio-Sign out']"
			href="/ui-logout"
			class="tw-border-t tw-border-secondary tw-w-full"
		>
			Sign out
		</kv-header-menu-link>
	</nav>
</template>

<script lang="ts">
import KvHeaderMenuLink from './KvHeaderMenuLink.vue';

export default {
	components: {
		KvHeaderMenuLink,
	},
	props: {
		balance: {
			type: Number,
			default: 0,
		},
		isBorrower: {
			type: Boolean,
			default: false,
		},
		isTrustee: {
			type: Boolean,
			default: false,
		},
		myDashboardUrl: {
			type: String,
			default: '/mykiva',
		},
	},
};
</script>
