<template>
	<div>
		<label
			:v-if="id"
			:for="id"
			class="block uppercase text-small"
		>
			{{ label }}
		</label>
		<select
			:id="id"
			:disabled="disabled"
			:width="width"
			:class="`${id ? 'mt-2' : ''} text-base h-6 pl-1 border border-gray-300 rounded-sm`"
			@change="onChange"
		>
			<slot></slot>
		</select>
	</div>
</template>

<script>
export default {
	props: {
		// icon: {
		//   type: String,
		//   default: "",
		// },
		label: {
			type: String,
			default: '',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		id: {
			type: String,
			required: false,
			default: '',
		},
		width: {
			// string due to class being set with tailwinds class
			type: String,
			default: '',
		},
	},
	data() {
		return {
			inputValue: null,
		};
	},
	methods: {
		onChange(event) {
			// emit a vue event and prevent native event
			// so we don't have to write @click.native in our templates
			event.preventDefault();
			this.$emit('change', event);
			console.log('onChange triggered.');
		},
	},
};
</script>
