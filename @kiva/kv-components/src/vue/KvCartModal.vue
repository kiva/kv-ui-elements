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
			class="screen"
			@click.stop.prevent="onScreenClick"
		>
			<div>
				<div
					class="container"
				>
					<div
						ref="kvCartModal"
						tabindex="-1"
						data-test="kv-cart-modal"
						class="modal"
						aria-modal="true"
						aria-label="Added to basket"
						@click.stop
						@mouseenter="clearAutomaticClose()"
						@mouseleave="setAutomaticClose()"
					>
						<!-- header -->
						<div class="tw-flex tw-pt-2 tw-px-2.5">
							<div
								class="tw-flex tw-flex-grow tw-gap-1 tw-items-center tw-pb-2"
							>
								<!-- header -->
								<slot name="header">
									<kv-material-icon
										class="tw-w-3.5 tw-h-3.5 tw-text-brand"
										:icon="mdiCheckCircle"
									/>
									<p class="tw-flex-1 tw-font-medium tw-text-center">
										Added to basket
									</p>
								</slot>
								<button
									v-if="!preventClose"
									class="
										tw-grid tw-content-center tw-justify-center
										tw-ml-auto
										tw-w-6 tw-h-6 tw--m-2
										hover:tw-text-action-highlight
									"
									@click.stop="hide('x-button')"
								>
									<kv-material-icon
										class="tw-w-3.5 tw-h-3.5"
										:icon="mdiClose"
									/>
									<span class="tw-sr-only">Close</span>
								</button>
							</div>
						</div>

						<!-- body -->
						<div
							id="kvCartModalBody"
							ref="kvCartModalBody"
							class="tw-flex tw-gap-2"
						>
							<!--@slot content -->
							<slot name="content"></slot>
						</div>

						<!-- controls -->
						<div
							ref="controlsRef"
							class="
								tw-flex-shrink-0 tw-flex tw-justify-end tw-gap-x-2.5
								tw-px-2.5 tw-pb-2 tw-flex-col tw-gap-1
							"
						>
							<kv-button
								class="tw-w-full"
								@click="handleClick(
									showCategoryOption ? 'support-another' : 'view-basket'
								)"
							>
								{{ ctaText }}
							</kv-button>

							<button
								v-if="showCategoryOption"
								class="tw-text-action tw-pt-1.5 tw-font-medium"
								@click="handleClick('view-basket')"
							>
								No thanks, go to basket ({{ basketCount }})
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
import {
	ref,
	toRefs,
	computed,
	nextTick,
	watch,
	onBeforeUnmount,
	onMounted,
} from 'vue';
import { mdiClose, mdiCheckCircle } from '@mdi/js';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { hideOthers as makePageInert } from 'aria-hidden';
import { lockScroll, unlockScroll } from '../utils/scrollLock';
import { lockPrintSingleEl, unlockPrintSingleEl } from '../utils/printing';
import KvButton from './KvButton.vue';
import KvMaterialIcon from './KvMaterialIcon.vue';

/**
 * Based on KvLightbox functionality
 * */

export default {
	components: {
		KvMaterialIcon,
		KvButton,
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
		 * The dialog has no close X button, clicking the screen does not close,
		 * pressing ESC does not close.
		 * */
		preventClose: {
			type: Boolean,
			default: false,
		},
		/**
		 * The number of loans in the basket
		 * */
		basketCount: {
			type: Number,
			default: 0,
		},
		/**
		 * Category name for the CTA button
		 * */
		categoryName: {
			type: String,
			default: '',
		},
	},
	emits: [
		'cart-modal-closed',
	],
	setup(props, { emit }) {
		const {
			visible,
			preventClose,
		} = toRefs(props);

		const kvCartModal = ref(null);
		const kvCartModalBody = ref(null);
		const controlsRef = ref(null);
		const timeoutId = ref();

		const trapElements = computed(() => [
			kvCartModal.value, // This cart modal
		]);

		const showCategoryOption = computed(() => !!props.categoryName);

		const ctaText = computed(() => {
			if (showCategoryOption.value) {
				return `Support another ${props.categoryName}`;
			}
			return `View basket (${props.basketCount})`;
		});

		const {
			activate: activateFocusTrap,
			deactivate: deactivateFocusTrap,
		} = useFocusTrap(trapElements, {
			allowOutsideClick: true, // allow clicking outside the cart modal to close it
		});

		let makePageInertCallback = null;
		let onKeyUp = null;

		const hide = (closedBy = '') => {
			// scroll any content inside the cart modal back to top
			if (kvCartModal.value && kvCartModalBody.value) {
				deactivateFocusTrap();
				kvCartModalBody.value.scrollTop = 0;
				unlockPrintSingleEl(kvCartModalBody.value);
			}
			unlockScroll();
			if (makePageInertCallback) {
				makePageInertCallback();
				makePageInertCallback = null;
			}
			document.removeEventListener('keyup', onKeyUp);

			/**
			 * Triggered when the cart modal is closed
			 * @event cart-modal-closed
			 * @type {Event}
			*/
			emit('cart-modal-closed', { type: closedBy });
		};

		onKeyUp = (e) => {
			if (!!e && e.key === 'Escape' && !preventClose.value) {
				hide();
			}
		};

		const onScreenClick = () => {
			if (!preventClose.value) {
				hide('background');
			}
		};

		const show = () => {
			if (visible.value) {
				document.addEventListener('keyup', onKeyUp);

				nextTick(() => {
					if (kvCartModal.value && kvCartModalBody.value) {
						activateFocusTrap();
						makePageInertCallback = makePageInert(kvCartModal.value);
						lockPrintSingleEl(kvCartModalBody.value);
					}
					lockScroll();
				});
			}
		};

		const handleClick = (cta) => {
			hide(cta);
		};

		const setAutomaticClose = () => {
			if (!preventClose.value) {
				timeoutId.value = setTimeout(() => {
					// Automatically close the cart modal after 10 seconds
					emit('cart-modal-closed', { type: 'time' });
				}, 10000);
			}
		};

		const clearAutomaticClose = () => {
			if (!preventClose.value) {
				clearTimeout(timeoutId.value);
			}
		};

		watch(visible, () => {
			if (visible.value) {
				show();
				setAutomaticClose();
			} else {
				hide();
			}
		});

		onMounted(() => {
			if (visible.value) {
				show();
				setAutomaticClose();
			}
		});

		onBeforeUnmount(() => hide());

		return {
			mdiClose,
			mdiCheckCircle,
			onKeyUp,
			onScreenClick,
			hide,
			show,
			controlsRef,
			handleClick,
			clearAutomaticClose,
			setAutomaticClose,
			ctaText,
			showCategoryOption,
		};
	},
};
</script>

<style lang="postcss" scoped>
.screen {
	@apply tw-z-modal tw-fixed tw-inset-0;
	background-color: rgb(0, 0, 0, 0.2);
}

.modal {
	@apply tw-bg-primary md:tw-absolute md:tw-right-0 tw-w-full tw-rounded-b;
	max-height: 90%;
}

.container {
	@apply tw-absolute tw-inset-0;
}

@screen md {
	.modal {
		max-width: 24.5rem;
	}
}

</style>
