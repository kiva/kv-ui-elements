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
				tw-bg-black
				tw-bg-opacity-[75%]
			"
			@click.stop.prevent="onScreenClick"
		>
			<div>
				<div
					class="
						tw-flex
						tw-absolute
						tw-inset-0
					"
					:class="{
						'md:tw-px-2' : variant === 'lightbox',
						'tw-px-2' : variant === 'alert',
					}"
				>
					<!-- the lightbox itself -->
					<div
						ref="kvLightbox"
						tabindex="-1"
						data-test="kv-lightbox"
						class="
							tw-bg-primary
							tw-flex tw-flex-col
							tw-mx-auto md:tw-my-auto

						"
						:class="{
							'tw-w-full md:tw-w-auto' : variant === 'lightbox',
							'tw-mt-auto md:tw-my-auto' : variant === 'lightbox',
							'tw-min-h-half-screen md:tw-min-h-0' : variant === 'lightbox',
							'tw-rounded-t md:tw-rounded' : variant === 'lightbox',
							'tw-my-auto tw-rounded' : variant === 'alert',
						}"
						style="max-width: 55.55rem; max-height: 90%"
						aria-modal="true"
						:aria-label="title ? title : null"
						:aria-describedby="variant === 'alert' ? 'kvLightboxBody' : null"
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
							<div class="tw-flex-grow">
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
									hover:tw-text-action-highlight
								"
								@click.stop="hide('close-x')"
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
							<slot></slot>
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
			</div>
		</div>
	</transition>
</template>

<script>
import {
	ref,
	toRefs,
	computed,
	nextTick,
	watch,
	onBeforeUnmount,
	onMounted,
} from 'vue';
import { mdiClose } from '@mdi/js';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { hideOthers as makePageInert } from 'aria-hidden';
import { lockScroll, unlockScroll } from '../utils/scrollLock';
import { lockPrintSingleEl, unlockPrintSingleEl } from '../utils/printing';

import KvMaterialIcon from './KvMaterialIcon.vue';

/**
 * Alert or a lightbox
 * Accessibility: https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal
 *
 * - [x] Tab and Shift + Tab do not move focus outside the dialog
 * - [x] focus is initially set on the first focusable element (close button).
 * - [x] focus is returned to the element that opened the dialog on close
 * - [x] role = dialog
 * - [x] aria-label is set to its title.
 * - [x] adds aria-hidden=true to all elements other than this dialog when open. - https://github.com/theKashey/vue-focus-lock/issues/16
 * - [x] scrolling only scrolls the lightbox contents, not the page itself

 * Alert dialog - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_alertdialog_role
 *
 * - [x] focus moves to the first non-destructive control, rather than the close button
 * - [x] role = alertDialog
 * - [x] aria-describedby is set to the id of the dialog body
 *
 * Printing
 *
 * - [x] Only prints the contents of the lightbox when open
 */

export default {
	components: {
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
			validator(value) {
				return ['lightbox', 'alert'].includes(value);
			},
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
		 * The dialog has no close X button, clicking the screen does not close,
		 * pressing ESC does not close.
		 * */
		preventClose: {
			type: Boolean,
			default: false,
		},
	},
	emits: [
		'lightbox-closed',
	],
	setup(props, { emit }) {
		const {
			visible,
			variant,
			preventClose,
		} = toRefs(props);

		const kvLightbox = ref(null);
		const kvLightboxBody = ref(null);
		const controlsRef = ref(null);
		const activateFocusTrap = ref(null);
		const deactivateFocusTrap = ref(null);

		// Ensure the lightbox ref isn't null
		nextTick(() => {
			const {
				activate,
				deactivate,
			} = useFocusTrap([
				kvLightbox.value, // This lightbox
				'[role="alert"]', // Any open toasts/alerts on the page
			], {
				allowOutsideClick: true, // allow clicking outside the lightbox to close it
			});
			activateFocusTrap.value = activate;
			deactivateFocusTrap.value = deactivate;
		});

		let makePageInertCallback = null;
		let onKeyUp = null;

		const role = computed(() => {
			if (variant.value === 'alert') {
				return 'alertdialog';
			}
			return 'dialog';
		});

		const hide = (closedBy = '') => {
			// scroll any content inside the lightbox back to top
			if (kvLightbox.value && kvLightboxBody.value) {
				deactivateFocusTrap.value?.();
				kvLightboxBody.value.scrollTop = 0;
				unlockPrintSingleEl(kvLightboxBody.value);
			}
			unlockScroll();
			if (makePageInertCallback) {
				makePageInertCallback();
				makePageInertCallback = null;
			}
			document.removeEventListener('keyup', onKeyUp);

			/**
			 * Triggered when the lightbox is closed
			 * @event lightbox-closed
			 * @type {Event}
			*/
			emit('lightbox-closed', { type: closedBy });
		};

		onKeyUp = (e) => {
			if (!!e && e.key === 'Escape' && !preventClose.value) {
				hide();
			}
		};

		const onScreenClick = () => {
			if (!preventClose.value) {
				hide('background-click');
			}
		};

		const show = () => {
			if (visible.value) {
				document.addEventListener('keyup', onKeyUp);

				nextTick(() => {
					if (kvLightbox.value && kvLightboxBody.value) {
						activateFocusTrap.value?.();
						makePageInertCallback = makePageInert(kvLightbox.value);
						lockPrintSingleEl(kvLightboxBody.value);
					}
					lockScroll();

					// alerts should send focus to the first actionable item in the controls
					if (variant.value === 'alert') {
						const firstControlEl = controlsRef.value.querySelector('button');
						if (firstControlEl) {
							firstControlEl.focus();
						}
					}
				});
			}
		};

		watch(visible, () => {
			if (visible.value) {
				show();
			} else {
				hide();
			}
		});

		onMounted(() => {
			if (visible.value) {
				show();
			}
		});

		onBeforeUnmount(() => hide());

		return {
			mdiClose,
			role,
			kvLightbox,
			kvLightboxBody,
			onKeyUp,
			onScreenClick,
			hide,
			show,
			controlsRef,
		};
	},
};
</script>
