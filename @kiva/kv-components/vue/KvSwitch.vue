<template>
	<div>
		<label
			class="tw-inline-flex tw-gap-2 tw-items-center"
			:class="{ 'tw-opacity-low': disabled }"
		>
			<input
				ref="switchRef"
				class="tw-sr-only tw-peer"
				type="checkbox"
				role="switch"
				:aria-checked="checked"
				:value="value"
				:disabled="disabled"
				@change.prevent="onChange"
			>

			<div
				class="
					tw-w-7 tw-h-4 tw-rounded-full tw-relative tw-overflow-hidden
					peer-focus-visible:tw-ring-2 peer-focus-visible:tw-ring-action
					tw-bg-gray-300 peer-checked:tw-bg-action
					tw-transition-all tw-ease-in-out
				"
			>
			</div>
			<div
				class="
						tw-flex-shrink-0 tw-w-3 tw-h-3
						tw-absolute tw-m-0.5
						tw-rounded-full
						tw-bg-white
						tw-transform tw-transition-all tw-ease-in-out
						peer-checked:tw-translate-x-3
					"
			></div>
			<div class="tw-flex-1 peer-focus-visible:tw-ring-2 peer-focus-visible:tw-ring-action">
				<slot></slot>
			</div>
		</label>
	</div>
</template>

<script>
/* eslint-disable max-len */
/**
 * KvSwitch
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Switch_role
 * https://headlessui.dev/react/switch#labels
 * https://scottaohara.github.io/a11y_styled_form_controls/src/checkbox--switch/
 *
 *
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
		focus() {
			this.$refs.switchRef.focus();
		},
		blur() {
			this.$refs.switchRef.blur();
		},
	},
};
</script>
