<template>
	<div>
		<label
			class="tw-inline-flex tw-gap-2 tw-items-center hover:tw-cursor-pointer"
			:class="{ 'tw-opacity-low': disabled }"
			:for="uuid"
		>
			<input
				:id="uuid"
				v-bind="$attrs"
				ref="switchRef"
				class="tw-sr-only tw-peer"
				type="checkbox"
				role="switch"
				:checked="modelValue"
				:disabled="disabled"
				@change.prevent="onChange"
			>
			<!-- switch background -->
			<div
				class="
					tw-w-7 tw-h-4 tw-rounded-full tw-relative tw-overflow-hidden
					peer-focus-visible:tw-ring-2 peer-focus-visible:tw-ring-action
					tw-bg-tertiary peer-checked:tw-bg-action
					tw-transition-all tw-ease-in-out
				"
			>
			</div>
			<!-- switch inner circle -->
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
			<!-- label -->
			<div class="tw-flex-1 peer-focus-visible:tw-ring-2 peer-focus-visible:tw-ring-action">
				<slot></slot>
			</div>
		</label>
	</div>
</template>

<script>
import {
	ref,
	onMounted,
} from 'vue-demi';
import { nanoid } from 'nanoid';

/**
 * KvSwitch
 * A visual treatment of a checkbox element for handling on/off states in UI.
 *
 * A11y considerations:
 *
 * - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Switch_role
 *
 * Prior art:
 *
 * - https://scottaohara.github.io/a11y_styled_form_controls/src/checkbox--switch/
 * - https://adrianroselli.com/2019/08/under-engineered-toggles-too.html
 * - https://headlessui.dev/react/switch#labels
 * - https://react-spectrum.adobe.com/react-spectrum/Switch.html
 *
*/
export default {
	inheritAttrs: false,
	// v-model will change when checked value changes
	model: {
		prop: 'modelValue',
		event: 'update:modelValue',
	},
	props: {
		/**
		 * Whether the switch is on or off
		 * */
		modelValue: {
			type: Boolean,
			default: false,
		},
		/**
		 * Prevents the switch from being toggled or focused
		 * */
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	emits: [
		'update:modelValue',
	],
	setup(props, { emit }) {
		const uuid = ref(`kvs-${nanoid(10)}`);
		const switchRef = ref(null);

		const onChange = (event) => {
			emit('update:modelValue', event.target.checked);
		};

		const focus = () => {
			switchRef.value.focus();
		};
		const blur = () => {
			switchRef.value.blur();
		};

		onMounted(() => {
			uuid.value = `kvs-${nanoid(10)}`;
		});

		return {
			uuid,
			onChange,
			focus,
			blur,
		};
	},
};
</script>
