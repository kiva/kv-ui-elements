<template>
	<div class="tw-grid tw-gap-x-2 md:tw-gap-x-3 lg:tw-gap-x-3.5">
		<slot></slot>
	</div>
</template>

<script>
/**
 * A light wrapper around Tailwind's grid class, setting the gaps as specified by design.
 * To use, specify the number of columns as a tailwind class on this component.
 * e.g., `<kv-grid class="tw-grid-cols-6 md:tw-grid-cols-12"> grid children here... </kv-grid>`
 */
export default {};
</script>
