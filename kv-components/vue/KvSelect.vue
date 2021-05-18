<template>
	<select
		:id="id"
		:disabled="disabled"
		class="text-base h-6 pl-1 border border-gray-300 rounded-sm"
		:class="{ 'opacity-low': disabled }"
		@change="onChange"
	>
		<slot></slot>
	</select>
</template>

<script>
export default {
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
	},
	methods: {
		onChange(event) {
			// emit a vue event
			this.$emit('change', event);
		},
	},
};
</script>
