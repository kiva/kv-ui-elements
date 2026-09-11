<template>
	<div
		:class="classes"
		:style="styles"
	>
		<label
			class="tw-inline-flex tw-gap-2 tw-items-center tw-relative hover:tw-cursor-pointer"
			:class="{ 'tw-opacity-low': disabled }"
			:for="uuid"
		>
			<input
				:id="uuid"
				v-bind="inputAttrs"
				ref="switchRef"
				class="tw-sr-only tw-peer"
				type="checkbox"
				role="switch"
				:checked="modelValue"
				:disabled="disabled"
				v-on="inputListeners"
				@change.prevent="onChange"
			>
			<!-- switch background -->
			<div
				class="
					tw-rounded-full tw-relative tw-overflow-hidden
					peer-focus-visible:tw-ring-2 peer-focus-visible:tw-ring-action
					tw-bg-tertiary peer-checked:tw-bg-action
					tw-transition-all tw-ease-in-out
				"
				:class="trackSizeClasses"
			>
			</div>
			<!-- switch inner circle -->
			<div
				class="
						tw-flex-shrink-0
						tw-absolute tw-m-0.5 tw-top-0
						tw-rounded-full
						tw-bg-white
						tw-transform tw-transition-all tw-ease-in-out
					"
				:class="knobSizeClasses"
			></div>
			<!-- label -->
			<div class="tw-flex-1 peer-focus-visible:tw-ring-2 peer-focus-visible:tw-ring-action">
				<slot></slot>
			</div>
		</label>
	</div>
</template>

<script lang="ts">
import {
	computed,
	ref,
	onMounted,
} from 'vue';
import { nanoid } from 'nanoid';
import { useAttrs } from '../utils/attrs';

const emits = [
	'update:modelValue',
];

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
		/**
		 * Size of the switch.
		 * `default` renders a 56x32px track (`tw-w-7 tw-h-4`) with a 24px
		 * knob (`tw-w-3 tw-h-3`) travelling 24px when checked.
		 * `small` renders a 48x28px track (`tw-w-6 tw-h-3.5`) with a 20px
		 * knob (`tw-w-2.5 tw-h-2.5`) travelling 20px when checked.
		 */
		size: {
			type: String,
			default: 'default',
			validator(value: string) {
				return ['default', 'small'].includes(value);
			},
		},
	},
	emits,
	setup(props, context) {
		const { emit } = context;
		const uuid = ref(`kvs-${nanoid(10)}`);
		const switchRef = ref(null);

		const {
			classes,
			styles,
			inputAttrs,
			inputListeners,
		} = useAttrs(context, emits);

		const trackSizeClasses = computed(() => (props.size === 'small'
			? 'tw-w-6 tw-h-3.5'
			: 'tw-w-7 tw-h-4'));

		// The knob travel is the track width minus the knob and its margins,
		// so it shrinks along with the track
		const knobSizeClasses = computed(() => (props.size === 'small'
			? 'tw-w-2.5 tw-h-2.5 peer-checked:tw-translate-x-2.5'
			: 'tw-w-3 tw-h-3 peer-checked:tw-translate-x-3'));

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
			classes,
			styles,
			inputAttrs,
			inputListeners,
			trackSizeClasses,
			knobSizeClasses,
		};
	},
};
</script>
