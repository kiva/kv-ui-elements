<template>
	<div>
		<label
			class="tw-inline-flex tw-gap-2"
			:class="{ 'tw-opacity-low': disabled }"
		>
			<input
				class="tw-sr-only tw-peer"
				type="checkbox"
				:aria-checked="checked"
				:checked="checked"
				:value="value"
				:disabled="disabled"
				v-bind="$attrs"
				v-on="inputListeners"
				@change.prevent="onChange"
			>

			<div
				class="
					tw-w-3 tw-h-3
					tw-flex-shrink-0
					tw-rounded-sm
					tw-border
					tw-flex tw-justify-center tw-items-center tw-overflow-hidden
					tw-transition-all tw-duration-100
					peer-focus-visible:tw-ring-2 peer-focus-visible:tw-ring-action
				"
				:class="{
					'tw-bg-white tw-border-gray-500' : !checked,
					'tw-bg-action tw-border-action' : checked
				}"
			>
				<transition
					enter-active-class="tw-transition tw-ease-out tw-duration-300"
					leave-active-class="tw-transition tw-ease-out tw-duration-300"
					enter-class="tw-scale-50"
					enter-to-class="tw-scale-100"
					leave-class="tw-scale-50"
					leave-to-class="tw-scale-100"
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
				</transition>
			</div>

			<div class="tw-flex-1 peer-focus-visible:tw-ring-2 peer-focus-visible:tw-ring-action">
				<slot></slot>
			</div>
		</label>
	</div>
</template>

<script>
/**
 * Use as you would an <input type="checkbox" />
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
	computed: {
		inputListeners() {
			return {
				// Pass through any listeners from the parent to the input element, like blur, focus, etc.
				// https://vuejs.org/v2/guide/components-custom-events.html#Binding-Native-Events-to-Components
				...this.$listeners,
				// ...except for the listener to the 'change' event which is emitted by this component
				change: () => {},
			};
		},
	},
	methods: {
		onChange(event) {
			this.$emit('change', event.target.checked);
		},
	},
};
</script>
