<template>
	<select
		:id="id"
		:disabled="isDisabled"
		class="text-base h-6 pl-1 border border-gray-300 rounded-sm"
		@change="onChange"
	>
		<slot></slot>
	</select>
</template>

<script>
export default {
	props: {
		/**
		 * Use if select is disabled
		 * */
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * Unique id to connect label and select
		 * */
		id: {
			type: String,
			required: true,
			default: '',
		},
		/**
		 * Appearance of the select
		 * `default`
		 * */
		variant: {
			type: String,
			default: 'default',
			validator(value) {
				return ['default'].includes(value);
			},
		},
		/**
		 * State of the select
		 * `'' (default), disabled`
		 * */
		state: {
			type: String,
			default: '',
			validator(value) {
				return ['', 'disabled'].includes(value);
			},
		},
	},
	computed: {
		isDisabled() {
			return this.state === 'disabled';
		},
	},
	methods: {
		onChange(event) {
			// emit a vue event and prevent native event
			// so we don't have to write @click.native in our templates
			this.$emit('change', event);
			console.log('onChange triggered.');
		},
	},
};
</script>
