<template>
	<div
		class="tw-w-max tw-flex tw-items-center tw-gap-1 tw-px-1.5 tw-py-1"
		:class="[bgClass, roundedClass]"
	>
		<slot name="icon"></slot>
		<span
			class="tw-text-wrap tw-text-h5"
			style="padding-top: 0.15rem;"
		>
			<slot></slot>
		</span>
	</div>
</template>

<script>

export default {
	props: {
		bgClass: {
			type: String,
			default: '',
		},
		roundedClass: {
			type: String,
			default: '',
		},
	},
};
</script>
