<template>
	<component
		:is="tag"
		:to="to"
		:href="href"
		:disabled="isDisabled"
		:class="{
			'opacity-low pointer-events-none': state === 'disabled',
			'pointer-events-none': state === 'loading'
		}"
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
			<template v-if="state === 'loading'">
				<span class="absolute w-full text-center -mx-4">kv-loading</span>
			</template>
			<span :class="{ 'invisible': state === 'loading' }">
				<slot></slot>
			</span>
		</span>
	</component>
</template>

<script>
export default {
	props: {
		/**
		 * Use if linking to a Vue route
		 * */
		to: {
			type: String,
			default: null,
		},
		/**
		 * Use if linking to an external link or old-stack page
		 * */
		href: {
			type: String,
			default: null,
		},
		/**
		 * Appearance of the button
		 * `primary (default), secondary, link, danger`
		 * */
		variant: {
			type: String,
			default: 'primary',
			validator(value) {
				return ['primary', 'secondary', 'link', 'danger'].includes(value);
			},
		},
		/**
		 * State of the button
		 * `'' (default), disabled, loading, active(?)`
		 * */
		state: {
			type: String,
			default: '',
			validator(value) {
				return ['', 'disabled', 'loading'].includes(value);
			},
		},
	},
	data() {
		return {};
	},
	computed: {
		isDisabled() {
			return this.state === 'disabled' || this.state === 'loading';
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
