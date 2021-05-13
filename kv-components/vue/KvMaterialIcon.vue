<template>
	<span
		class="inline-flex"
		aria-hidden="true"
		role="img"
	>
		<svg
			class="w-full h-full fill-current"
			width="24"
			height="24"
			viewBox="0 0 24 24"
		>
			<path :d="icon" />
		</svg>
	</span>
</template>

<script>
export default {
	props: {
		/**
		 * SVG path data passed in from an imported @mdi/js module.
		 * E.g., import { mdiAccount } from '@mdi/js'; <kv-material-icon :icon="mdiAccount" />
		 * */
		icon: {
			type: String,
			default: '',
		},
	},
};
</script>
