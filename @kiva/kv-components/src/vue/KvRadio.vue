<template>
	<div
		:class="classes"
		:style="styles"
	>
		<label
			class="tw-inline-flex tw-items-center tw-align-middle"
			:class="{ 'tw-opacity-low': disabled }"
			:for="uuid"
		>
			<input
				v-bind="inputAttrs"
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
import {
	computed,
	onMounted,
	ref,
	toRefs,
} from 'vue';
import { useAttrs } from '../utils/attrs';

const emits = [
	'change',
	'update:modelValue',
];

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
	model: {
		prop: 'modelValue',
		event: 'update:modelValue',
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
		modelValue: {
			type: [String, Number, Boolean],
			default: false,
		},
	},
	emits,
	setup(props, context) {
		const { emit } = context;
		const {
			value,
			checked,
			modelValue,
		} = toRefs(props);

		const uuid = ref(`kvr-${nanoid(10)}`);
		const radioRef = ref(null);

		const {
			classes,
			styles,
			inputAttrs,
			inputListeners,
		} = useAttrs(context, emits);

		const isChecked = computed(() => {
			if (typeof modelValue.value === typeof value.value) {
				return modelValue.value === value.value;
			}
			return Boolean(checked.value);
		});

		onMounted(() => {
			uuid.value = `kvr-${nanoid(10)}`;
		});

		const onChange = (event) => {
			emit('change', event.target.value);
			emit('update:modelValue', event.target.value);
		};

		const focus = () => radioRef.value.focus();

		const blur = () => radioRef.value.blur();

		return {
			uuid,
			isChecked,
			radioRef,
			onChange,
			focus,
			blur,
			classes,
			styles,
			inputAttrs,
			inputListeners,
		};
	},
};
</script>
