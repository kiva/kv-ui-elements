<template>
	<nav class="tw--mt-0.5 tw-pb-0.5 tw-flex tw-flex-col tw-items-start lg:tw-items-end tw-font-medium">
		<kv-header-menu-link
			href="/portfolio"
			class="tw-inline-flex tw-gap-0.5"
		>
			<span>Portfolio</span>
			<span class="tw-text-secondary">|</span>
			<span class="tw-text-eco-green-3">{{ balance }}</span>
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
			href="/ui-logout"
		>
			Sign out
		</kv-header-menu-link>
	</nav>
</template>

<script>
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
	},
};
</script>
