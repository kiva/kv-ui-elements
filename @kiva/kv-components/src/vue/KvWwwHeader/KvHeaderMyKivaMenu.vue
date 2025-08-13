<template>
	<nav class="tw--mt-0.5 tw-pb-0.5 tw-flex tw-flex-col tw-items-start lg:tw-items-end tw-font-medium">
		<kv-header-menu-link
			:href="myDashboardUrl"
			class="lg:tw-hidden"
		>
			My Dashboard
		</kv-header-menu-link>
		<kv-header-menu-link
			href="/portfolio"
			class="tw-inline-flex tw-gap-0.5"
		>
			<span>Portfolio</span>
			<span class="tw-text-secondary">|</span>
			<span class="tw-text-eco-green-3">{{ numeral(balance).format('$0') }}</span>
		</kv-header-menu-link>
		<kv-header-menu-link
			href="/teams/my-teams"
		>
			My Teams
		</kv-header-menu-link>
		<kv-header-menu-link
			href="/portfolio/donations"
		>
			Donations
		</kv-header-menu-link>
		<kv-header-menu-link
			href="/settings"
		>
			Settings
		</kv-header-menu-link>
		<kv-header-menu-link
			v-if="isBorrower"
			href="/my/borrower"
		>
			Borrower Dashboard
		</kv-header-menu-link>
		<kv-header-menu-link
			v-if="isTrustee"
			href="/my/trustee"
		>
			Trustee Dashboard
		</kv-header-menu-link>
		<kv-header-menu-link
			href="/ui-logout"
		>
			Sign out
		</kv-header-menu-link>
	</nav>
</template>

<script>
import numeral from 'numeral';
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
	setup() {
		return {
			numeral,
		};
	},
};
</script>
