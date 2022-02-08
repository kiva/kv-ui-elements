<template>
	<div
		class="tw-inline-flex"
		:class="classes"
		:style="styles"
	>
		<div class="tw-relative tw-w-full">
			<!-- eslint-disable max-len -->
			<select
				:id="id"
				v-bind="inputAttrs"
				:disabled="disabled"
				:value="modelValue"
				class="tw-text-base tw-bg-primary tw-h-6 tw-pr-4 tw-pl-2 tw-border tw-border-tertiary tw-rounded-sm tw-appearance-none tw-w-full tw-ring-inset focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-action focus:tw-border-transparent"
				:class="{ 'tw-opacity-low': disabled }"
				@change="onChange"
			>
				<!-- eslint-enable max-len -->
				<slot></slot>
			</select>
			<kv-material-icon
				:icon="mdiChevronDown"
				class="tw-w-4 tw-absolute tw-top-0 tw-right-0 tw-pt-1.5 tw-pr-1 tw-pointer-events-none"
				:class="{ 'tw-opacity-low': disabled }"
			/>
		</div>
	</div>
</template>

<script>
import 'vue-demi';
import { mdiChevronDown } from '@mdi/js';
import KvMaterialIcon from './KvMaterialIcon.vue';
import { useAttrs } from '../utils/attrs';

const emits = [
	'change',
	'update:modelValue',
];

export default {
	components: {
		KvMaterialIcon,
	},
	// v-model will change when select value updates
	model: {
		prop: 'modelValue',
		event: 'update:modelValue',
	},
	props: {
		/**
		 * Unique id to connect label and select
		 * */
		id: {
			type: String,
			required: true,
			default: '',
		},
		/**
		 * Use if select is disabled
		 * */
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * modelValue prop
		 * */
		modelValue: {
			type: [Number, String],
			default: 0,
		},
	},
	emits,
	setup(props, context) {
		const { emit } = context;

		const {
			classes,
			styles,
			inputAttrs,
			inputListeners,
		} = useAttrs(context, emits);

		const onChange = (event) => {
			/**
			* The value that the select has changed to
			* @event change
			* @type {Event}
			*/
			emit('change', event.target.value);
			emit('update:modelValue', event.target.value);
		};
		return {
			mdiChevronDown,
			onChange,
			classes,
			styles,
			inputAttrs,
			inputListeners,
		};
	},
};
</script>
