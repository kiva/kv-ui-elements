<template>
	<div>
		<label
			class="tw-inline-flex tw-gap-2"
			:class="{ 'tw-opacity-low': disabled }"
		>
			<input
				class="tw-sr-only tw-peer"
				type="radio"
				:aria-checked="isChecked"
				:checked="isChecked"
				:name="name"
				:value="value"
				:disabled="disabled"
				v-on="inputListeners"
				@change.prevent="onChange"
			>
			<div
				class="
					tw-w-3 tw-h-3
					tw-rounded-full
					tw-border
					tw-flex-shrink-0
					tw-overflow-hidden
					tw-flex tw-justify-center tw-items-center tw-overflow-hidden
					tw-transition-all tw-duration-100
					peer-focus-visible:tw-ring-2 peer-focus-visible:tw-ring-action
				"
				:class="{
					'tw-border-gray-500' : !isChecked,
					'tw-border-action' : isChecked
				}"
				style="line-height: 0;"
			>

				<div
					v-if="isChecked"
					class="tw-rounded-full tw-w-2 tw-h-2 tw-bg-action"
					style="line-height: 0;"
				></div>
			</div>

			<div class="tw-flex-1 peer-focus-visible:tw-ring-2 peer-focus-visible:tw-ring-action">
				<slot></slot>
			</div>
		</label>
	</div>
</template>

<script>
/* eslint-disable max-len */
/**
 * Use as you would an <input type="radio" />
 * https://material-ui.com/components/radio-buttons/#radiogroup
 * https://headlessui.dev/vue/radio-group
 *
 * [] The radio buttons are contained in or owned by an element with role radiogroup.
 * [] Each radio button element has role radio.
 * [] If a radio button is checked, the radio element has aria-checked set to true. If it is not checked, it has aria-checked set to false.
 * [] Each radio element is labelled by its content, has a visible label referenced by aria-labelledby, or has a label specified with aria-label.
 * [] The radiogroup element has a visible label referenced by aria-labelledby or has a label specified with aria-label.
 * [] If elements providing additional information about either the radio group or each radio button are present, those elements are referenced by the radiogroup element or radio elements with the aria-describedby property.
 *
*/

/**
 * @usage:
 *
 *   <KvRadio value="foo" v-model="someDataValue">Label for foo</KvRadio>
 *   <KvRadio value="bar" v-model="someDataValue">Label for bar</KvRadio>
 *   <KvRadio value="baz" v-model="someDataValue">Label for baz</KvRadio>
 *
 * or
 *
 *   <KvRadio value="foo" name="myGroupName" @change="val => someDataValue = val" checked="true" />Label for foo</KvRadio>
 *   <KvRadio value="bar" name="myGroupName" @change="val => someDataValue = val" />Label for bar</KvRadio>
 *   <KvRadio value="baz" name="myGroupName" @change="val => someDataValue = val" />Label for baz</KvRadio>
 *
*/
/* eslint-enable max-len */

export default {
	// v-model will change when select value updates
	model: {
		prop: 'modelValue',
		event: 'change',
	},
	props: {
		checked: {
			type: Boolean,
			default: false,
		},
		value: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			default: '',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		modelValue: {
			type: String,
			default: '',
		},
	},
	computed: {
		isChecked() {
			return this.checked || this.modelValue === this.value;
		},
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
			this.$emit('change', event.target.value);
		},
	},
};
</script>
