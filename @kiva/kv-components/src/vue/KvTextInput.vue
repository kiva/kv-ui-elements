<template>
	<div
		class="tw-inline-flex"
		:class="classes"
		:style="styles"
	>
		<div
			class="tw-relative tw-w-full "
			:class="{ 'tw-opacity-low': disabled }"
		>
			<!-- eslint-disable max-len -->
			<input
				:id="id"
				ref="textInputRef"
				:type="type"
				class="
					tw-h-6 tw-w-full
					tw-px-2
					tw-border
					tw-rounded-sm
					tw-appearance-none
					tw-text-base
					tw-ring-inset
					focus:tw-outline-none focus:tw-ring-2 focus:tw-border-transparent
				"
				:class="{
					'tw-bg-primary'
						: valid && !disabled,
					'tw-border-tertiary focus:tw-ring-action'
						: valid,
					'tw-pr-6 tw-bg-danger-highlight tw-border-danger focus:tw-ring-danger-highlight'
						: !valid,
					'tw-bg-tertiary'
						: disabled,
					'tw-pl-6' : icon,
				}"
				:placeholder="placeholder"
				:disabled="disabled"
				v-bind="inputAttrs"
				:value="modelValue"
				v-on="inputListeners"
				@input="onInput"
			>
			<!-- eslint-enable max-len -->
			<kv-material-icon
				v-if="icon"
				:icon="icon"
				class="tw-w-3 tw-h-3 tw-absolute tw-top-1.5 tw-left-1.5 tw-pointer-events-none"
			/>
			<kv-material-icon
				v-if="!valid"
				:icon="mdiAlertCircleOutline"
				class="tw-w-3 tw-h-3 tw-absolute tw-top-1.5 tw-right-1.5
				tw-pointer-events-none tw-text-danger"
			/>
			<button
				v-show="canClear && valid && !!inputText"
				type="button"
				class="tw-absolute tw-top-1.5 tw-right-1.5"
				@click="clearInput"
			>
				<span class="tw-sr-only">clear input</span>
				<kv-material-icon
					class="tw-w-3 tw-h-3"
					:icon="mdiClose"
				/>
			</button>
			<div
				v-if="$slots.error"
				class="tw-text-danger-highlight tw-text-small tw-font-medium tw-mt-1"
			>
				<!-- @slot Used in conjuction with the `valid` prop to tell the user what must be fixed -->
				<slot name="error"></slot>
			</div>
		</div>
	</div>
</template>

<script>
import {
	ref,
	toRefs,
} from 'vue';
import { mdiAlertCircleOutline, mdiClose } from '@mdi/js';
import { useAttrs } from '../utils/attrs';
import KvMaterialIcon from './KvMaterialIcon.vue';

const emits = [
	'input',
	'update:modelValue',
];
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
		prop: 'modelValue',
		event: 'update:modelValue',
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
		modelValue: {
			type: [String, Number, Boolean],
			default: '',
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
		/**
		 * When set to true, adds a button positioned to the right edge of the input containing an “X”
		 * */
		canClear: {
			type: Boolean,
			default: false,
		},
	},
	emits,
	setup(props, context) {
		const { emit } = context;
		const {
			modelValue,
		} = toRefs(props);

		const textInputRef = ref(null);
		const inputText = ref(modelValue.value);

		const {
			classes,
			styles,
			inputAttrs,
			inputListeners,
		} = useAttrs(context, emits);

		const onInput = (event) => {
			/**
			* The value that is currently in the input
			* @event input
			* @type {Event}
			*/
			inputText.value = event.target.value;
			emit('input', event.target.value);
			emit('update:modelValue', event.target.value);
		};

		const focus = () => {
			textInputRef.value.focus();
		};

		const blur = () => {
			textInputRef.value.blur();
		};

		const clearInput = () => {
			inputText.value = '';
			emit('input', '');
			emit('update:modelValue', '');
		};

		return {
			mdiAlertCircleOutline,
			mdiClose,
			onInput,
			focus,
			blur,
			clearInput,
			inputText,
			classes,
			styles,
			inputAttrs,
			inputListeners,
			textInputRef,
		};
	},
};
</script>
