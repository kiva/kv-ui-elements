<template>
	<nav class="tw--mt-0.5 tw-pb-0.5 tw-flex tw-flex-col tw-items-start lg:tw-items-end tw-font-medium">
		<kv-header-menu-link
			href=""
			class="tw-inline-flex tw-gap-0.5"
		>
			<span>Portfolio</span>
			<span class="tw-text-secondary">|</span>
			<span class="tw-text-eco-green-3">{{ balance }}</span>
		</kv-header-menu-link>
		<kv-header-menu-link
			href=""
		>
			My Teams
		</kv-header-menu-link>
		<kv-header-menu-link
			href=""
		>
			Donations
		</kv-header-menu-link>
		<kv-header-menu-link
			href=""
		>
			Settings
		</kv-header-menu-link>
		<kv-header-menu-link
			href=""
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
