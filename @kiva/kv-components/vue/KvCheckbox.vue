<template>
	<div>
		<label
			class="tw-inline-flex tw-gap-2"
			:class="{ 'tw-opacity-low': disabled }"
		>
			<input
				class="tw-sr-only"
				type="checkbox"
				:aria-checked="checked"
				:value="value"
				:disabled="disabled"
				@change.prevent="onChange"
			>
			<div
				class="
					tw-w-3 tw-h-3
					tw-rounded-sm
					tw-border
					tw-flex tw-justify-center
				"
				:class="{
					'tw-bg-white tw-border-gray-500' : !checked,
					'tw-bg-action tw-border-action' : checked
				}"
			>
				<svg
					v-if="checked"
					class="tw-w-1.5 tw-h-auto"
					viewBox="0 0 12 9"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<!-- eslint-disable max-len -->
					<path
						d="M3.99975 6.79988L1.66642 4.46655C1.40642 4.20655 0.993086 4.20655 0.733086 4.46655C0.473086 4.72655 0.473086 5.13988 0.733086 5.39988L3.52642 8.19322C3.78642 8.45322 4.20642 8.45322 4.46642 8.19322L11.5331 1.13322C11.7931 0.873216 11.7931 0.459883 11.5331 0.199883C11.2731 -0.0601172 10.8598 -0.0601172 10.5998 0.199883L3.99975 6.79988Z"
						fill="white"
					/>
					<!-- eslint-enable max-len -->
				</svg>
			</div>

			<div class="tw-flex-1">
				<slot></slot>
			</div>
		</label>
	</div>
</template>

<script>
/**
 * https://material-ui.com/components/radio-buttons/#radiogroup
 * https://headlessui.dev/vue/radio-group
*/

export default {
	// v-model will change when select value updates
	model: {
		prop: 'checked',
		event: 'change',
	},
	props: {
		value: {
			type: String,
			default: '',
		},
		checked: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * Visual state of this input
		 * @values '', valid, invalid
		 * */
		validationState: {
			type: String,
			default: '',
		},
	},
	methods: {
		onChange(event) {
			this.$emit('change', event.target.checked);
		},
	},
};
</script>
