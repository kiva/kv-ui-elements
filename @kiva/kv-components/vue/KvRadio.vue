<template>
	<div>
		<label
			class="tw-inline-flex tw-items-center tw-align-middle"
			:class="{ 'tw-opacity-low': disabled }"
			:for="uuid"
		>
			<input
				v-bind="$attrs"
				:id="uuid"
				ref="radioRef"
				class="tw-peer tw-appearance-none tw-w-max"
				type="radio"
				:checked="isChecked"
				:name="name"
				:value="value"
				:disabled="disabled"
				v-on="inputListeners"
				@change.prevent="onChange"
			>
			<div
				class="
					tw-w-3 tw-h-3 tw-mr-2
					tw-rounded-full
					tw-border
					tw-flex-shrink-0
					tw-overflow-hidden
					tw-flex tw-justify-center tw-items-center
					tw-transition-all tw-duration-100
					peer-focus-visible:tw-ring-2 peer-focus-visible:tw-ring-action
				"
				:class="{
					'tw-border-secondary' : !isChecked,
					'tw-border-action' : isChecked
				}"
			>
				<div
					v-if="isChecked"
					class="tw-rounded-full tw-bg-action"
					style="width: 0.75rem; height: 0.75rem;"
				></div>
			</div>

			<div class="tw-flex-1 peer-focus-visible:tw-ring-2 peer-focus-visible:tw-ring-action">
				<slot></slot>
			</div>
		</label>
	</div>
</template>

<script>
import { nanoid } from 'nanoid';

/* eslint-disable max-len */

/**
 * Use as you would an `<input type="radio" />`. Ensure you're using a fieldset and legend for a11y.
 *
 * @usage
 * ```
 * <fieldset>
 *   <legend>Choose an item</legend>
 *   <KvRadio value="foo" v-model="someDataValue">Label for foo</KvRadio>
 *   <KvRadio value="bar" v-model="someDataValue">Label for bar</KvRadio>
 *   <KvRadio value="baz" v-model="someDataValue">Label for baz</KvRadio>
 * </fieldset>
 *
 * or
 *
 * <fieldset>
 *   <legend>Choose an item</legend>
 *   <KvRadio value="foo" name="myGroupName" @change="(val) => someDataValue = val" :checked="someDataValue === 'foo'" />Label for foo</KvRadio>
 *   <KvRadio value="bar" name="myGroupName" @change="(val) => someDataValue = val" :checked="someDataValue === 'bar'" />Label for bar</KvRadio>
 *   <KvRadio value="baz" name="myGroupName" @change="(val) => someDataValue = val" :checked="someDataValue === 'baz'" />Label for baz</KvRadio>
 * </fieldset>
 * ```
*/
/* eslint-enable max-len */

export default {
	inheritAttrs: false,
	// v-model will update when the checked radio changes
	model: {
		prop: 'checked',
		event: 'change',
	},
	props: {
		/**
		 * Value of the input
		 * */
		value: {
			type: [String, Number, Boolean],
			required: true,
		},
		/**
		 * Prevents the radio from being toggled or focused
		 * */
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * Native name attribute. Used to group radios if you're not using v-model. E.g.,
		 * ```
		 *  <KvRadio name="cats">Tabby</KvRadio>
		 *  <KvRadio name="cats">Siamese</KvRadio>
		 *  <KvRadio name="dogs">Husky</KvRadio>
		 *  <KvRadio name="dogs">Boxer</KvRadio>
		 * ```
		 * */
		name: {
			type: String,
			default: '',
		},
		/**
		 * Native checked attribute. Used to select the radio if you're not using v-model E.g.,
		 * ```
		 *  <KvRadio value="foo" :checked="myModel === foo">Foo</KvRadio>
		 *  <KvRadio value="bar" :checked="myModel === bar">Bar</KvRadio>
		 * ```
		 * */
		checked: {
			type: [String, Number, Boolean],
			default: false,
		},
	},
	data() {
		return {
			uuid: `kvr-${nanoid(10)}`,
		};
	},
	computed: {
		isChecked() {
			if (typeof this.checked === typeof this.value) {
				return this.checked === this.value;
			}
			return Boolean(this.checked);
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
			/**
			 * triggers when the value changes
			 */
			this.$emit('change', event.target.value);
		},
		focus() {
			this.$refs.radioRef.focus();
		},
		blur() {
			this.$refs.radioRef.blur();
		},
	},
};
</script>
