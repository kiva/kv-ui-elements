<template>
	<div>
		<label
			class="tw-inline-flex tw-items-center"
			:class="{ 'tw-opacity-low': disabled }"
			:for="uuid"
		>
			<input
				v-bind="$attrs"
				:id="uuid"
				:ref="checkboxRef"
				class="tw-peer tw-appearance-none tw-w-max"
				type="checkbox"
				:checked="isChecked"
				:value="value"
				:disabled="disabled"
				@change.prevent="onChange"
			>
			<!-- checkbox square background -->
			<div
				class="
					tw-w-3 tw-h-3 tw-mr-2
					tw-flex-shrink-0
					tw-rounded-sm
					tw-border
					tw-flex tw-justify-center tw-items-center tw-overflow-hidden
					tw-transition-all tw-duration-100
					peer-focus-visible:tw-ring-2 peer-focus-visible:tw-ring-action"
				:class="{
					'tw-bg-white' : !isChecked,
					'tw-bg-action' : isChecked,
					'tw-border-secondary' : !isChecked && valid,
					'tw-border-action' : isChecked && valid,
					'tw-border-danger' : !valid,
				}"
			>
				<!-- checkbox icon  -->
				<svg
					v-if="isChecked"
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
			<!-- label -->
			<div class="tw-flex-1 peer-focus-visible:tw-ring-2 peer-focus-visible:tw-ring-action">
				<slot></slot>
			</div>
		</label>
	</div>
</template>

<script>
import { nanoid } from 'nanoid';
import {
	onMounted,
	ref,
	toRefs,
	watch,
} from 'vue-demi';

/**
 * Use as you would an <input type="checkbox" />
 * Does not handle 'indeterminate' state at this time.
*/

export default {
	inheritAttrs: false,

	model: {
		prop: 'checked',
		event: 'change',
	},

	props: {
		/**
		 * Whether the checkbox is checked or not
		 * */
		checked: {
			type: [Boolean, Array],
			default: false,
		},
		/**
		 * Prevents the checkbox from being toggled or focused
		 * */
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * Value of the checkbox if v-model is an array
		 * */
		value: {
			type: [String, Boolean],
			default: '',
		},
		/**
		 * When set to false, visually indicates to the user that the contents of the input need
		 * to be changed
		 * */
		valid: {
			type: Boolean,
			default: true,
		},
	},
	emits: [
		'change',
		'update:modelValue',
	],
	setup(props, { emit }) {
		const {
			checked,
			value,
		} = toRefs(props);

		const uuid = ref(`kvc-${nanoid(10)}`);
		const isChecked = ref(false);
		const checkboxRef = ref(null);

		const onChange = (event) => {
			const inputChecked = event.target.checked;
			let checkboxValue;

			if (Array.isArray(checked.value)) {
				// if the model is an array, add or remove our value from it
				if (inputChecked) {
					checkboxValue = [...checked.value, event.target.value];
				} else {
					checkboxValue = checked.value.filter((item) => item !== value.value);
				}
			} else {
				checkboxValue = inputChecked;
			}

			// emit the change event to update the model
			emit('change', checkboxValue);
			emit('update:modelValue', checkboxValue);
		};

		const setChecked = () => {
			if (Array.isArray(checked.value)) {
				// if the model is array like <kv-checkbox v-model="['item1', 'item2']" value="item1">
				isChecked.value = checked.value.includes(value.value);
			} else {
				// else it's a boolean like <kv-checkbox v-model="true">
				isChecked.value = checked.value;
			}
		};

		const focus = () => {
			checkboxRef.focus();
		};

		const blur = () => {
			checkboxRef.blur();
		};

		watch(checked, () => setChecked());
		onMounted(() => {
			setChecked();
			uuid.value = `kvc-${nanoid(10)}`;
		});

		return {
			uuid,
			isChecked,
			checkboxRef,
			onChange,
			setChecked,
			focus,
			blur,
		};
	},
};

</script>
