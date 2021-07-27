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
 * https://www.w3.org/TR/wai-aria-practices-1.2/#checkbox
 * The checkbox has role checkbox.
 * The checkbox has an accessible label provided by one of the following:
 * Visible text content contained within the element with role checkbox.
 * A visible label referenced by the value of aria-labelledby set on the element with role checkbox.
 * aria-label set on the element with role checkbox.
 * When checked, the checkbox element has state aria-checked set to true.
 * When not checked, it has state aria-checked set to false.
 * When partially checked, it has state aria-checked set to mixed.
 * If a set of checkboxes is presented as a logical group with a visible label, the checkboxes are included in an element with role group that has the property aria-labelledby set to the ID of the element containing the label.
 * If the presentation includes additional descriptive static text relevant to a checkbox or checkbox group, the checkbox or checkbox group has the property aria-describedby set to the ID of the element containing the description.
 *
 *
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
