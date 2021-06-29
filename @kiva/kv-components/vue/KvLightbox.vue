<template>
	<transition
		enter-active-class="tw-transition-opacity tw-duration-300 tw-delay-300"
		leave-active-class="tw-transition-opacity tw-duration-300"
		enter-class="tw-opacity-0"
		enter-to-class="tw-opacity-full"
		leave-class="tw-opacity-full"
		leave-to-class="tw-opacity-0"
	>
		<!-- the screen -->
		<div
			v-show="isShown"
			class="
				tw-bg-gray-800 tw-bg-opacity-low
				md:tw-px-2
				tw-flex
				tw-z-modal
				tw-absolute
				tw-inset-0
			"
			:class="{'tw-min-h-screen' : variant === 'lightbox'}"
			@click.stop.prevent="closeLightbox"
		>
			<!-- the lightbox itself -->
			<div
				ref="kvLightbox"
				tabindex="-1"
				class="
						tw-bg-white
						tw-rounded-t md:tw-rounded
						tw-min-h-half-screen
						tw-max-h-full
						tw-flex tw-flex-col
						tw-mx-auto
						md:tw-my-auto
					"
				:class="{
					'tw-mt-auto md:tw-my-auto ' : variant === 'lightbox',
					'tw-my-auto ' : variant === 'dialog',
				}"
				style="max-width: 55.55rem"
				role="dialog"
				data-test="kv-lightbox"
				:aria-labelledby="title ? 'lightbox-title' : null"
				aria-modal="true"
				@click.stop
			>
				<!-- header -->
				<div
					class="
						tw-flex
						tw-p-2.5 md:tw-px-4 md:tw-pt-4 md:tw-pb-3.5
					"
					@pointerdown="onPointerDown"
					@pointermove="onPointerMove"
					@pointerup="onPointerUp"
				>
					<h2
						v-if="title"
						id="lightbox-title"
						class="tw-text-h3 tw-flex-1"
					>
						{{ title }}
					</h2>
					<button
						v-if="!preventClose"
						class="
							tw-flex tw-content-center
							tw-w-4 tw-h-4 tw-bg-brand-300
						"
						@click.stop.prevent="closeLightbox"
					>
						<kv-material-icon
							:icon="mdiClose"
						/>
						<span class="tw-sr-only">Close</span>
					</button>
				</div>
				<!-- body -->
				<div
					ref="kvLightboxBody"
					class="
						tw-flex-1
						tw-px-2.5 md:tw-px-4
						tw-overflow-auto
					"
				>
					<!-- @slot default -->
					<slot>Lightbox body</slot>
				</div>
				<!-- controls -->
				<div
					v-if="$slots.controls"
					class="
						tw-flex-shrink-0 tw-flex tw-justify-end tw-gap-x-2.5
						tw-p-2.5 md:tw-px-4 md:tw-pb-4 md:tw-pt-1
					"
				>
					<!-- @slot controls -->
					<slot name="controls"></slot>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import { mdiClose } from '@mdi/js';

// import FocusLock from 'vue-focus-lock';
import { lockScroll, unlockScroll } from '../utils/scrollLock';
import KvMaterialIcon from './KvMaterialIcon.vue';

export default {
	components: {
		// FocusLock,
		KvMaterialIcon,
	},
	props: {
		visible: {
			type: Boolean,
			default: false,
		},
		preventClose: {
			type: Boolean,
			default: false,
		},
		title: {
			type: String,
			default: '',
		},
		/**
		 * Appearance of the button
		 * @values lightbox, dialog
		 * */
		variant: {
			type: String,
			default: 'lightbox',
		},
	},
	data() {
		return {
			isShown: false,
			mdiClose,
		};
	},
	watch: {
		// Create and set our internal visibility property
		visible() {
			this.isShown = this.visible;
			this.init();
		},
	},
	mounted() {
		this.isShown = this.visible;
		this.init();
	},
	beforeDestroy() {
		this.closeLightbox();
	},
	methods: {
		init() {
			if (this.isShown) {
				document.addEventListener('keyup', this.onKeyUp);
				this.$nextTick(() => {
					this.$refs.kvLightbox.focus();
					lockScroll();
					document.body.classList.add('lightbox-open'); // used as a styling hook when printing
				});
			} else {
				document.removeEventListener('keyup', this.onKeyUp);
				unlockScroll();
				document.body.classList.remove('lightbox-open'); // used as a styling hook when printing
			}
		},
		show() {
			// prevent the body from scrolling
			lockScroll();
		},
		onKeyUp(e) {
			if (e.key === 'Escape') {
				this.closeLightbox();
			}
		},
		closeLightbox() {
			if (!this.preventClose) {
				// scroll any content inside the lightbox back to top
				this.$refs.kvLightboxBody.scrollTop = 0;

				// allow the body to scroll
				unlockScroll();

				// listen for this event in parent components
				// it gives notice of the lightbox being closed internally
				this.$emit('lightbox-closed');
				this.isShown = false;
			}
		},
		onPointerDown(e) {
			console.log(e);
		},
		onPointerUp(e) {
			console.log(e);
		},
		onPointerMove(e) {
			console.log(e);
		},
	},
};
</script>
