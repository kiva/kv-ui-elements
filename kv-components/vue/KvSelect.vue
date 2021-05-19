<template>
	<div class="inline-flex">
		<div class="relative w-full">
			<select
				:id="id"
				:disabled="disabled"
				:value="value"
				class="text-base h-6 pr-4 pl-1 border border-gray-300 rounded-sm appearance-none w-full"
				:class="{ 'opacity-low': disabled }"
				@change="onChange"
			>
				<slot></slot>
			</select>
			<kv-material-icon
				:icon="mdiChevronUp"
				class="absolute right-0 pt-1.5 pr-1 pointer-events-none"
				:class="{ 'opacity-low': disabled }"
			/>
		</div>
	</div>
</template>

<script>
import { mdiChevronUp } from '@mdi/js';
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
			default: '',
		},
		/**
		 * Initial selected value
		 * */
		value: {
			type: String,
			default: '',
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
			mdiChevronUp,
		};
	},
	methods: {
		onChange(event) {
			// emit a vue event
			this.$emit('change', event.target.value);
		},
	},
};
</script>
