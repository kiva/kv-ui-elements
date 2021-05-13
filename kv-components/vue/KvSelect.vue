<template>
	<component
		:is="tag"
		v-bind="$attrs"
		class="text-base h-6 pl-1 border border-gray-300 rounded-sm"
		@click="onClick"
	>
		<slot></slot>
	</component>
</template>

<script>
export default {
	props: {
		// icon: {
		//   type: String,
		//   default: "",
		// },
	},
	data() {
		return {
			inputValue: null,
		};
	},
	computed: {
		// Maybe this tag is unnecessary and could just be
		// hardcoded to select on line 5?
		tag() {
			return 'select';
		},
	},
	methods: {
		onClick(e) {
			if (this.tag === 'select' && this.$attrs.type !== 'submit') {
				// emit a vue event and prevent native event
				// so we don't have to write @click.native in our templates
				e.preventDefault();
				this.$emit('click', e);
			}
		},
	},
};
</script>
