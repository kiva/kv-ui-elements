<template>
	<transition
		enter-active-class="tw-transition-opacity tw-duration-300"
		leave-active-class="tw-transition-opacity tw-duration-300"
		enter-class="tw-opacity-0"
		enter-to-class="tw-opacity-full"
		leave-class="tw-opacity-full"
		leave-to-class="tw-opacity-0"
	>
		<!-- the screen -->
		<div
			v-show="visible"
			class="
				tw-bg-gray-800 tw-bg-opacity-low
				tw-z-modal
				tw-fixed
				tw-inset-0
			"
			:class="{'tw-min-h-screen' : variant === 'lightbox'}"
			@click.stop.prevent="hide"
		>
			<focus-lock
				v-if="visible"
				class="kv-lightbox__focus-lock"
				:return-focus="true"
			>
				<div
					class="
						tw-flex
						tw-absolute
						tw-inset-0
						md:tw-px-2
					"
				>
					<!-- the lightbox itself -->
					<div
						ref="kvLightbox"
						tabindex="-1"
						data-test="kv-lightbox"
						class="
							tw-bg-white
							tw-rounded-t md:tw-rounded
							tw-min-h-half-screen md:tw-min-h-0 tw-max-h-full
							tw-flex tw-flex-col
							tw-mx-auto md:tw-my-auto
						"
						:class="{
							'tw-mt-auto md:tw-my-auto ' : variant === 'lightbox',
							'tw-my-auto ' : variant === 'alert',
						}"
						style="max-width: 55.55rem"
						aria-modal="true"
						:aria-label="title ? 'lightbox-title' : null"
						:role="{
							'dialog' : variant === 'lightbox',
							'alertDialog' : variant === 'alert',
						}"
						@click.stop
					>
						<!-- header -->
						<div
							class="
								tw-flex
								tw-p-2.5 md:tw-px-4 md:tw-pt-4 md:tw-pb-3.5
							"
						>
							<h2
								v-if="title"
								class="tw-text-h3 tw-flex-1"
							>
								{{ title }}
							</h2>
							<button
								v-if="!preventClose"
								class="
									tw-grid tw-content-center tw-justify-center
									tw-ml-auto
									tw-w-6 tw-h-6 tw--m-2
									hover:tw-text-action-700
								"
								@click.stop.prevent="hide"
							>
								<kv-material-icon
									class="tw-w-3 tw-h-3"
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
			</focus-lock>
		</div>
	</transition>
</template>

<script>
/**
 * Alert or a lightbox
 *
 * Accesibility: https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal
 * - [x] Tab and Shift + Tab do not move focus outside the dialog
 * - [x] focus is initially set on the first focusable element.
 * - [x] focus is returned to the element that opened the dialog
 * + [x] role = dialog || alertDialog
 * + [x] aria-label is the title of the dialog
 * - [x] Adds aria-hidden=true to all elements other than this dialog when open.
 *
 * Printing
 * - [x] Only prints the contents of the lightbox when open
 */

import { mdiClose } from '@mdi/js';

import FocusLock from 'vue-focus-lock';
import { hideOthers } from 'aria-hidden';
import { lockScroll, unlockScroll } from '../utils/scrollLock';

import KvMaterialIcon from './KvMaterialIcon.vue';

const lockPrintSingleEl = (el) => {
	if (typeof window !== 'undefined' && el) {
		document.body.classList.add('print:tw-invisible', 'print:tw-overflow-hidden');
		el.classList.add('print:tw-visible', 'print:tw-overflow-auto');
	}
};

const unlockPrintSingleEl = (el) => {
	if (typeof window !== 'undefined' && el) {
		document.body.classList.remove('print:tw-invisible', 'print:tw-overflow-hidden');
		el.classList.remove('print:tw-visible', 'print:tw-overflow-auto');
	}
};

export default {
	components: {
		FocusLock,
		KvMaterialIcon,
	},
	props: {
		/**
		 * Whether the dialog is open or not
		 * */
		visible: {
			type: Boolean,
			default: false,
		},
		/**
		 * Appearance and role of the lightbox
		 * @values lightbox, alert
		 * */
		variant: {
			type: String,
			default: 'lightbox',
		},
		/**
		 * The title of the dialog
		 * */
		title: {
			type: String,
			default: '',
		},
		/**
		 * User is prevented from closing the dialog
		 * */
		preventClose: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			mdiClose,
			hideOthers() {}, // reference to aria-hide function
		};
	},
	watch: {
		visible() {
			if (this.visible) {
				this.show();
			} else {
				this.hide();
			}
		},
	},
	beforeDestroy() {
		this.hide();
	},
	methods: {
		show() {
			if (this.visible) {
				document.addEventListener('keyup', this.onKeyUp);

				this.$nextTick(() => {
					const lightboxBodyRef = this.$refs.kvLightboxBody;
					if (lightboxBodyRef) {
						this.hideOthers = hideOthers(lightboxBodyRef);
						lockPrintSingleEl(lightboxBodyRef);
					}
					lockScroll();
				});
			}
		},
		hide() {
			if (!this.preventClose) {
				// scroll any content inside the lightbox back to top
				const lightboxBodyRef = this.$refs.kvLightboxBody;
				if (lightboxBodyRef) {
					lightboxBodyRef.scrollTop = 0;
					unlockPrintSingleEl(lightboxBodyRef);
				}
				unlockScroll();
				if (this.hideOthers) {
					this.hideOthers();
				}

				/**
				 * Triggered when the lightbox is closed
				 * @event lightbox-closed
				 * @type {Event}
				*/
				this.$emit('lightbox-closed');
			}
		},
		onKeyUp(e) {
			if (e.key === 'Escape') {
				this.hide();
			}
		},
	},
};
</script>
