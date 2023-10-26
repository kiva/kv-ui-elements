<template>
	<nav class="tw--mt-0.5 tw-pb-0.5 tw-flex tw-flex-col tw-items-start lg:tw-items-end tw-font-medium">
		<a
			class="tw-py-1.5 tw-cursor-pointer tw-inline-flex tw-gap-0.5"
		>
			<span>Portfolio</span>
			<span class="tw-text-secondary">|</span>
			<span class="tw-text-eco-green-3">{{ balance }}</span>
		</a>
		<a
			class="tw-py-1.5 tw-cursor-pointer"
		>
			My Teams
		</a>
		<a
			class="tw-py-1.5 tw-cursor-pointer"
		>
			Donations
		</a>
		<a
			class="tw-py-1.5 tw-cursor-pointer"
		>
			Settings
		</a>
		<a
			class="tw-py-1.5 tw-cursor-pointer"
		>
			Sign out
		</a>
	</nav>
</template>

<script>
export default {
	props: {
		balance: {
			type: Number,
			default: 0,
		},
	},
};
</script>
