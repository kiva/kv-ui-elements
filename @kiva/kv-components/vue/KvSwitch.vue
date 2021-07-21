<template>
	<div>
		<label
			class="tw-inline-flex tw-gap-3"
			:class="{ 'tw-opacity-low': disabled }"
		>
			<div class="tw-w-10 tw-h-6 tw-bg-gray-300 tw-rounded-full tw-relative">
				<input
					class="tw-sr-only tw-peer"
					type="checkbox"
					:aria-checked="checked"
					:value="value"
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
/* eslint-disable max-len */
/**
 * KvSwitch
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Switch_role
 * https://headlessui.dev/react/switch#labels
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
	},
};
</script>
