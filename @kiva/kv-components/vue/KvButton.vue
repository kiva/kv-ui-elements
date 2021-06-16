<template>
	<component
		:is="tag"
		ref="buttonRef"
		:to="to"
		:href="href"
		:type="type"
		:disabled="isDisabled"
		class="hover:tw-no-underline"
		:class="{
			'tw-opacity-low': state === 'disabled',
			'tw-pointer-events-none': state === 'loading' || isDisabled
		}"
		@click="onClick"
	>
		<!-- eslint-disable max-len -->
		<span
			ref="buttonInnerRef"
			class="tw-inline-flex tw-w-full tw-justify-center tw-items-center tw-rounded
				tw-min-h-6 tw-relative tw-overflow-hidden tw-border tw-font-medium"
			:class="{
				'tw-bg-action hover:tw-bg-action-700 tw-text-white tw-border-action hover:tw-border-action-700'
					: variant === 'primary',
				'tw-bg-white hover:tw-bg-gray-100 tw-text-gray-800 tw-border-gray-500 hover:tw-border-gray-800'
					: variant === 'secondary',
				'tw-bg-danger hover:tw-bg-danger-700 tw-text-white tw-border-danger hover:tw-border-danger-700'
					: variant === 'danger',
				'tw-bg-gray-800 tw-hover:bg-gray-500 tw-text-white tw-border-gray-800 hover:tw-border-gray-500'
					: variant === 'link',
				'tw-bg-white hover:tw-bg-gray-light tw-text-gray-800 tw-border-white hover:tw-bg-gray-100'
					: variant === 'ghost',
			}"
		>
			<!-- eslint-enable max-len -->
			<template v-if="state === 'loading'">
				<kv-loading-spinner
					class="tw-absolute tw-w-full tw-text-center tw--mx-4 tw-z-0"
					:color="loadingColor"
				/>
			</template>
			<span
				class="tw-py-1 tw-px-3 tw-z-10"
				:class="{ 'tw-invisible': state === 'loading' }"
			>
				<slot></slot>
			</span>
		</span>
	</component>
</template>

<script>
import KvLoadingSpinner from './KvLoadingSpinner.vue';

export default {
	components: {
		KvLoadingSpinner,
	},
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
		 * The behavior of the button when used in an HTML form.
		 * `button (default), submit, reset`
		 * */
		type: {
			type: String,
			default: 'button',
			validator(value) {
				return ['button', 'submit', 'reset'].includes(value);
			},
		},
		/**
		 * Appearance of the button
		 * `primary (default), secondary, danger, link, ghost`
		 * */
		variant: {
			type: String,
			default: 'primary',
			validator(value) {
				return ['primary', 'secondary', 'link', 'ghost', 'danger'].includes(value);
			},
		},
		/**
		 * State of the button
		 * `'' (default), disabled, loading`
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
		loadingColor() {
			switch (this.variant) {
				case 'secondary':
					return 'black';
				case 'ghost':
					return 'brand';
				default:
					return 'white';
			}
		},
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
		onClick(event) {
			// emit a vue event and prevent native event
			// so we don't have to write @click.native in our templates
			if (this.tag === 'button' && this.type !== 'submit') {
				event.preventDefault();
				this.$emit('click', event);
			}

			this.createRipple(event);
		},
		createRipple(event) {
			const { buttonRef, buttonInnerRef } = this.$refs;

			// build an element to animate
			const blipEl = document.createElement('span');
			blipEl.classList = `
				absolute
				inline-block
				h-2 w-2
				rounded-full
				transform
				-translate-x-1/2
				-translate-y-1/2
				opacity-0
				animate-ripple
				motion-reduce:animate-none
			`;

			// some variants shouldn't have a white blip
			const darkBlipVariants = ['secondary', 'ghost'];
			const blipBgColor = darkBlipVariants.includes(this.variant) ? 'bg-gray-300' : 'bg-white';
			blipEl.classList.add(blipBgColor);

			// position the blip where the pointer click is or center it if keyboard
			const fromClick = event.detail !== 0; // determine if click came from pointer or keyboard
			const { clientX, clientY } = event;
			const {
				offsetLeft, offsetTop, offsetWidth, offsetHeight,
			} = buttonRef;
			let blipX;
			let blipY;
			if (fromClick) {
				blipX = `${clientX - offsetLeft}px`;
				blipY = `${clientY - offsetTop}px`;
			} else {
				blipX = `${offsetWidth / 2}px`;
				blipY = `${offsetHeight / 2}px`;
			}
			blipEl.style.setProperty('left', blipX);
			blipEl.style.setProperty('top', blipY);

			// append the blip to the button, remove it when the animation is done
			buttonInnerRef.appendChild(blipEl);
			blipEl.addEventListener('animationend', function animationComplete() {
				buttonInnerRef.removeChild(blipEl);
				blipEl.removeEventListener('animationend', animationComplete);
			});
		},
	},
};
</script>