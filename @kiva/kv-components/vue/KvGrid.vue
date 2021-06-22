<template>
	<component
		:is="as"
		class="tw-grid tw-gap-2 md:tw-gap-3 lg:tw-gap-3.5"
	>
		<slot></slot>
	</component>
</template>

<script>
/**
 * A light wrapper around Tailwind's grid class, setting the gaps as specified by design.
 * To use, specify the number of columns as a tailwind class on this component.
 * e.g., `<kv-grid class="tw-grid-cols-6 md:tw-grid-cols-12"> grid children here... </kv-grid>`
 */
export default {
	props: {
		/**
		 * Element name of the grid container element.
		 * e.g., <kv-grid as="ul"><li>list item...  renders <ul><li>list item...
		 * */
		as: {
			type: String,
			default: 'div',
		},
	},
};
</script>
