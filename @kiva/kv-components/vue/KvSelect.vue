<template>
	<div class="tw-inline-flex">
		<div class="tw-relative tw-w-full">
			<!-- eslint-disable max-len -->
			<select
				:id="id"
				:disabled="disabled"
				:value="value"
				class="
					tw-text-base tw-appearance-none
					tw-w-full tw-h-6 tw-pr-4 tw-pl-2
					tw-border tw-border-gray-300 tw-bg-none
					tw-rounded-sm
					focus-visible:tw-outline-none focus-visible:tw-ring-inset focus-visible:tw-ring-2 focus-visible:tw-ring-action focus-visible:tw-border-white"
				:class="{ 'tw-opacity-low': disabled }"
				@change="onChange"
			>
				<!-- eslint-enable max-len -->
				<slot></slot>
			</select>
			<kv-material-icon
				:icon="mdiChevronDown"
				class="tw-absolute tw-right-0 tw-pt-1.5 tw-pr-1 tw-pointer-events-none"
				:class="{ 'tw-opacity-low': disabled }"
			/>
		</div>
	</div>
</template>

<script>
import { mdiChevronDown } from '@mdi/js';
import KvMaterialIcon from './KvMaterialIcon.vue';

export default {
	components: {
		KvMaterialIcon,
	},
	// v-model will change when select value updates
	model: {
		prop: 'value',
		event: 'change',
	},
	props: {
		/**
		 * Unique id to connect label and select
		 * */
		id: {
			type: String,
			required: true,
		},
		/**
		 * Initial selected value
		 * */
		value: {
			type: [Number, String],
			default: 0,
		},
		/**
		 * Use if select is disabled
		 * */
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			mdiChevronDown,
		};
	},
	methods: {
		onChange(event) {
			/**
			* The value that the select has changed to
			* @event change
			* @type {Event}
			*/
			this.$emit('change', event.target.value);
		},
	},
};
</script>
