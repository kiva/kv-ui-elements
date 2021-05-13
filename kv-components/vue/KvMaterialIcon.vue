<template>
	<component
		:is="iconFile"
		:decorative="true"
		title=""
		class="inline-flex"
	/>
</template>

<script>
/**
 * A light wrapper around vue-material-design-icons
 * Dynamically imports and displays icons listed at https://materialdesignicons.com/
 *
 * When using an icon without text, that isn't purely decorative,
 * make sure you add some screen-reader only text nearby. E.g.,
 * <button><kv-material-icon name="Close" /><span class="sr-only">Close Lightbox</span></button>
 */
export default {
	props: {
		/**
		 * Pascal case name of the Material Design icon. E.g., 'ArrowBottomLeft'
		 * */
		name: {
			type: String,
			default: '',
		},
	},
	computed: {
		iconFile() {
			if (this.name) {
				return () => import(`vue-material-design-icons/${this.name}.vue`);
			}
			return null;
		},
	},
};
</script>

<style>
/* needed to dig into the inner icon component so we can size it using our tailwind classes */
.material-design-icon__svg {
	width: 100%;
	height: 100%;
}
</style>
