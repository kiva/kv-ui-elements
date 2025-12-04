<template>
	<span
		class="tw-inline-flex"
		aria-hidden="true"
		role="img"
	>
		<svg
			class="tw-w-full tw-h-full tw-fill-current"
			width="24"
			height="24"
			viewBox="0 0 24 24"
		>
			<path :d="icon" />
		</svg>
	</span>
</template>

<script lang="ts">
/**
 * This component takes path data as a prop from an imported @mdi/js module and
 * renders the icon as an SVG.
 *
 * Find your icon name from https://materialdesignicons.com/,
 * The module name to import will be 'mdiPascalCaseIconName'. `account-cowboy-hat` would be
 * `import { mdiAccountCowboyHat } from '@mdi/js'`;
 *
 * These icons do not announce to screenreaders. If you are using a non-decorative icon, be sure
 * to include screen reader text. E.g.,
 * `<button>
 * 	  <kv-material-icon :icon="mdiClose" />
 * 	  <span class="sr-only">Close modal</span>
 *  </button>`
 */

export default {
	props: {
		/**
		 * SVG path data passed in from an imported @mdi/js module.
		 * E.g., `import { mdiAccount } from '@mdi/js'; <kv-material-icon :icon="mdiAccount" />`
		 * */
		icon: {
			type: String,
			default: '',
		},
	},
};
</script>
