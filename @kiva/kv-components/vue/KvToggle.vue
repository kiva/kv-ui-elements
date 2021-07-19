<template>
	<div>
		<label
			class="tw-inline-flex tw-gap-3"
			:class="{ 'tw-opacity-low': disabled }"
		>
			<div class="tw-w-10 tw-h-6 tw-bg-gray-300 tw-rounded-full tw-relative">
				<input
					type="checkbox"
					class="tw-sr-only tw-peer"
					:disabled="disabled"
					@change.prevent="onChange"
				>
				<div
					class="
						tw-bg-gray-500 tw-w-6 tw-h-6 tw-rounded-full tw-flex-shrink-0
						peer-checked:tw-bg-action peer-checked:tw-translate-x-4
						tw-transform tw-transition-all tw-ease-in-out
					"
				></div>
				<div
					class="
						peer-focus-visible:tw-bg-danger
					"
				>peer</div>
			</div>
			<div class="tw-flex-1">
				<slot></slot>
			</div>
		</label>
	</div>
</template>

<script>
export default {
	// v-model will change when select value updates
	model: {
		prop: 'checked',
		event: 'change',
	},
	props: {
		checked: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		onChange(event) {
			this.$emit('change', event.target.checked);
		},
	},
};
</script>
