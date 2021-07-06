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
				tw-z-modal
				tw-fixed
				tw-inset-0
			"
			style="background-color: rgba(33,33,33,0.75)"
			:class="{'tw-min-h-screen' : variant === 'lightbox'}"
			@click.stop.prevent="onScreenClick"
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
						:aria-label="title ? title : null"
						aria-describedby="kvLightboxBody"
						:role="role"
						@click.stop
					>
						<!-- header -->
						<div
							class="
								tw-flex
								tw-p-2.5 md:tw-px-4 md:tw-pt-4 md:tw-pb-3.5
							"
						>
							<div>
								<!-- @slot header -->
								<slot name="header">
									<h2	class="tw-text-h3 tw-flex-1">
										{{ title }}
									</h2>
								</slot>
							</div>
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
							id="kvLightboxBody"
							ref="kvLightboxBody"
							class="
								tw-flex-1
								tw-px-2.5 md:tw-px-4
								tw-pb-2.5 md:tw-pb-4
								tw-overflow-auto
							"
						>
							<!-- @slot default -->
							<slot>Lightbox body</slot>
						</div>
						<!-- controls -->
						<div
							v-if="$slots.controls"
							ref="controlsRef"
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

import { mdiClose } from '@mdi/js';
import FocusLock from 'vue-focus-lock';
import { hideOthers } from 'aria-hidden';
import { lockScroll, unlockScroll } from '../utils/scrollLock';
import { lockPrintSingleEl, unlockPrintSingleEl } from '../utils/printing';

import KvMaterialIcon from './KvMaterialIcon.vue';

/**
 * Alert or a lightbox
 * Accesibility: https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal
 *
 * - [x] Tab and Shift + Tab do not move focus outside the dialog
 * - [x] focus is initially set on the first focusable element (close button).
 * - [x] focus is returned to the element that opened the dialog on close
 * - [x] role = dialog
 * - [x] aria-label is set to its title.
 * - [x] aria-describedby is set to the id of the dialog body
 * - [x] adds aria-hidden=true to all elements other than this dialog when open.
 * - [x] scrolling only scrolls the lightbox contents, not the page itself

 * Alert dialog - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_alertdialog_role
 *
 * - [x] focus moves to the first non-destructive control, rather than the close button
 * - [x] role = alertDialog
 *
 * Printing
 *
 * - [x] Only prints the contents of the lightbox when open
 * TODO: ensure purge doesn't remove these classes
 * 'print:tw-invisible',
 * 'print:tw-visible',
 * 'print:tw-overflow-auto',
 * 'print:tw-overflow-hidden',
 */

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
		 * The title of the dialog which describes the dialog to screenreaders, and if no
		 * content is in the `header` slot, will be displayed at the top of the lightbox.
		 * */
		title: {
			type: String,
			required: true,
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
	computed: {
		role() {
			if (this.variant === 'alert') {
				return 'alertdialog';
			}
			return 'dialog';
		},
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

					// alerts should send focus to the first actionable item in the controls
					if (this.variant === 'alert') {
						const firstControlEl = this.$refs.controlsRef.querySelector('button');
						if (firstControlEl) {
							firstControlEl.focus();
						}
					}
				});
			}
		},
		hide() {
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
		},
		onScreenClick() {
			if (!this.preventClose) {
				this.hide();
			}
		},
		onKeyUp(e) {
			if (e.key === 'Escape' && !this.preventClose) {
				this.hide();
			}
		},
	},
};
</script>
