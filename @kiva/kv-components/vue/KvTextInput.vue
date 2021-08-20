<template>
	<div class="tw-inline-flex">
		<div
			class="tw-relative tw-w-full "
			:class="{ 'tw-opacity-low': disabled }"
		>
			<input
				:id="id"
				ref="textInputRef"
				:type="type"
				class="
					tw-h-6 tw-w-full
					tw-px-2
					tw-border tw-border-gray-300 focus:tw-border-white
					tw-rounded-sm
					tw-appearance-none
					tw-text-base
					tw-bg-primary
					tw-placeholder-gray-300
					tw-ring-inset focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-action
				"
				:class="{
					'tw-pr-6 tw-bg-danger tw-border-danger-highlight tw-bg-opacity-low focus:tw-ring-danger-highlight' // eslint-disable-line max-len
						: !valid,
					'tw-bg-tertiary'
						: disabled,
					'tw-pl-6' : icon,
				}"
				:placeholder="placeholder"
				:value="value"
				:disabled="disabled"
				v-bind="$attrs"
				@input="onInput"
				v-on="inputListeners"
			>
			<kv-material-icon
				v-if="icon"
				:icon="icon"
				class="tw-absolute tw-top-1.5 tw-left-1.5 tw-pointer-events-none"
			/>
			<kv-material-icon
				v-if="!valid"
				:icon="mdiAlertCircleOutline"
				class="tw-absolute tw-top-1.5 tw-right-1.5 tw-pointer-events-none tw-text-danger"
			/>
			<div
				v-if="$slots.error"
				class="tw-text-danger tw-text-small tw-mt-1"
			>
				<!-- @slot Used in conjuction with the `valid` prop to tell the user what must be fixed -->
				<slot name="error"></slot>
			</div>
		</div>
	</div>
</template>

<script>
import { mdiAlertCircleOutline } from '@mdi/js';
import KvMaterialIcon from './KvMaterialIcon.vue';

/* eslint-disable max-len */

/**
 * Use as you would an `<input type="text" />`. Ensure you're using a label element for a11y.
 *
 * @usage
 * ```
 * <label for="input_id">Street Address</label>
 * <kv-text-input id="input_id" v-model="streetAddress" />
 *
 * or
 *
 * <label for="input_id">Street Address</label>
 * <kv-text-input id="input_id" :value="streetAddress" @input="(val) => streetAddress = val" />
 * ```
*/
/* eslint-enable max-len */

export default {
	components: {
		KvMaterialIcon,
	},
	inheritAttrs: false,
	// v-model will update when a different value is input
	model: {
		prop: 'value',
		event: 'input',
	},
	props: {
		/**
		 * Id of the input, used to associate the input with a <label> element.
		 * */
		id: {
			type: String,
			required: true,
		},
		/**
		 * Value of the text in the input. Used if you're not using the standard v-model bindings
		 * ```
		 * <kv-text-input :value="streetAddress" @input="(val) => streetAddress = val" />
		 * ```
		 * */
		value: {
			type: [String, Number, Boolean],
			default: null,
		},
		/**
		 * Text that appears in the form control when it has no value set
		 * Should not be used as a label, but rather an example.
		 * Bad: Enter an address   Good: 1234 E Cherry Lane
		 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefplaceholder
		 * */
		placeholder: {
			type: String,
			default: null,
		},
		/**
		 * Prevents the input from being edited or focused
		 * */
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * When set to false, visually indicates to the user that the contents of the input need
		 * to be changed
		 * */
		valid: {
			type: Boolean,
			default: true,
		},
		/*
		 * SVG path data passed in from an imported @mdi/js module.
		 * Displayed on the left hand side of the input
		 * ```
		 * import { mdiMagnify } from '@mdi/js';
		 * data() { return { mdiMagnify } };
		 * <kv-text-input :icon="mdiMagnify" />`
		 * ```
		 * */
		icon: {
			type: String,
			default: null,
		},
		/**
		 * Can be used to set show special keyboards for mobile users
		 * E.g., type="number" or type="tel"
		 * */
		type: {
			type: String,
			default: 'text',
		},
	},
	data() {
		return {
			mdiAlertCircleOutline,
		};
	},
	computed: {
		inputListeners() {
			return {
				// Pass through any listeners from the parent to the input element, like blur, focus, etc.
				// https://vuejs.org/v2/guide/components-custom-events.html#Binding-Native-Events-to-Components
				...this.$listeners,
				// ...except for the listener to the 'input' event which is emitted by this component
				input: () => {},
			};
		},
	},
	methods: {
		onInput(event) {
			/**
			* The value that is currently in the input
			* @event input
			* @type {Event}
			*/
			this.$emit('input', event.target.value);
		},
		focus() {
			this.$refs.textInputRef.focus();
		},
		blur() {
			this.$refs.textInputRef.blur();
		},
	},
};
</script>
