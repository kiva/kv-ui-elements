<template>
	<component
		:is="tag"
		:to="to"
		:href="href"
		:disabled="isDisabled"
		:class="{ 'opacity-low pointer-events-none': disabled, 'pointer-events-none': loading }"
		@click="onClick"
	>
		<span
			class="inline-flex rounded px-4 py-3 relative"
			:class="{
				'bg-green hover:bg-green-110 text-white': variant === 'primary',
				'bg-white hover:bg-gray-light text-black border':
					variant === 'secondary',
				'bg-black hover:bg-gray-darkest text-white border': variant === 'link',
				'bg-red hover:bg-red-dark text-white': variant === 'danger',
			}"
		>
			<template v-if="loading">
				<span class="absolute w-full text-center -mx-4">kv-loading</span>
			</template>
			<span :class="{ 'invisible': loading }">
				<slot></slot>
			</span>
		</span>
	</component>
</template>

<script>
export default {
	props: {
		to: {
			type: String,
			default: null,
		},
		href: {
			type: String,
			default: null,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * Appearance of the button
		 * `primary (default), secondary, link, danger`
		 * */
		variant: {
			type: String,
			default: 'primary',
			validator(value) {
				return ['primary', 'secondary', 'link', 'danger'].indexOf(value) !== -1;
			},
		},
		loading: {
			type: Boolean,
			default: false,
		},
		// icon: {
		//   type: String,
		//   default: "",
		// },
	},
	data() {
		return {};
	},
	computed: {
		isDisabled() {
			return this.disabled || this.loading;
		},
		tag() {
			if (this.to) {
				return 'router-link';
			}
			if (this.href) {
				return 'a';
			}
			return 'button';
		},
	},
	methods: {
		onClick(e) {
			if (this.tag === 'button' && this.$attrs.type !== 'submit') {
				// emit a vue event and prevent native event
				// so we don't have to write @click.native in our templates
				e.preventDefault();
				this.$emit('click', e);
			}
		},
	},
};
</script>
