<template>
	<component
		:is="tag"
		ref="buttonRef"
		:to="to"
		:href="href"
		:type="type"
		:disabled="isDisabled"
		:class="{
			'opacity-low': state === 'disabled',
			'pointer-events-none': state === 'loading' || isDisabled
		}"
		@click="onClick"
	>
		<span
			ref="buttonInnerRef"
			class="inline-flex w-full justify-center items-center rounded
				min-h-6 relative overflow-hidden border font-medium"
			:class="{
				'bg-action hover:bg-action-700 text-white border-action hover:border-action-700'
					: variant === 'primary',
				'bg-white hover:bg-gray-100 text-gray-800 border-gray-500 hover:border-gray-800'
					: variant === 'secondary',
				'bg-danger hover:bg-danger-700 text-white border-danger hover:border-danger-700'
					: variant === 'danger',
				'bg-gray-800 hover:bg-gray-500 text-white border-gray-800 hover:border-gray-500'
					: variant === 'link',
				'bg-white hover:bg-gray-light text-gray-800 border-white hover:bg-gray-100'
					: variant === 'ghost',
			}"
		>
			<template v-if="state === 'loading'">
				<!-- TODO replace with kvloading element -->
				<span class="absolute w-full text-center -mx-4 z-0">🕣</span>
			</template>
			<span
				class="py-1 px-3 z-10"
				:class="{ 'invisible': state === 'loading' }"
			>
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
			const fromClick = event.detail === 1; // determine if click came from pointer or keyboard
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
