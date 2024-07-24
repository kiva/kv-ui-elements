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
					>
						<!-- header -->
						<div
							class="
								tw-flex
								tw-p-2.5 md:tw-px-4 md:tw-pt-4 md:tw-pb-3.5
							"
						>
							<div class="tw-flex tw-flex-grow tw-gap-1 tw-items-center">
								<!-- header -->
								<slot name="header">
									<kv-material-icon
										class="tw-w-4 tw-h-4 tw-text-brand"
										:icon="mdiCheckCircle"
									/>
									<p class="tw-flex-1 tw-font-medium">
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
										class="tw-w-3 tw-h-3"
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
							class="modal__body"
						>
							<div>
								<kv-borrower-image
									class="tw-rounded loan-image"
									:alt="borrowerImage.alt"
									:aspect-ratio="borrowerImage.aspectRatio"
									:default-image="borrowerImage.defaultImage"
									:hash="borrowerImage.hash"
									:images="borrowerImage.images"
									:photo-path="photoPath"
								/>
							</div>
							<div class="tw-flex tw-items-center tw-justify-between tw-w-full tw-gap-1">
								<div class="tw-flex tw-flex-col tw-h-full tw-justify-between">
									<p class="tw-overflow-hidden tw-text-ellipsis tw-line-clamp-1">
										{{ borrowerName }}
									</p>
									<p class="tw-p-1 tw-text-center tw-rounded tw-bg-secondary tw-text-h5 tw-w-max">
										{{ borrowerCountry }}
									</p>
								</div>
								<p> ${{ amount }}</p>
							</div>
						</div>

						<!-- controls -->
						<div
							ref="controlsRef"
							class="
								tw-flex-shrink-0 tw-flex tw-justify-end tw-gap-x-2.5
								tw-p-2.5 md:tw-px-4 md:tw-pb-4 tw-flex-col tw-gap-1
							"
						>
							<kv-button
								class="tw-w-full"
								@click="handleClick('view-basket')"
							>
								View basket ({{ basketCount }})
							</kv-button>
							<kv-button
								class="tw-w-full"
								variant="secondary"
								@click="handleClick('help-another-person')"
							>
								Help another person
							</kv-button>
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
} from 'vue-demi';
import { mdiClose, mdiCheckCircle } from '@mdi/js';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { hideOthers as makePageInert } from 'aria-hidden';
import { lockScroll, unlockScroll } from '../utils/scrollLock';
import { lockPrintSingleEl, unlockPrintSingleEl } from '../utils/printing';
import KvButton from './KvButton.vue';
import KvMaterialIcon from './KvMaterialIcon.vue';
import KvBorrowerImage from './KvBorrowerImage.vue';

/**
 * Based on KvLightbox functionality
 * */

export default {
	components: {
		KvMaterialIcon,
		KvButton,
		KvBorrowerImage,
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
		 * The loan added to the basket
		 * */
		addedLoan: {
			type: Object,
			default: () => ({}),
		},
		/**
		 * The photo path for the borrower image
		 * */
		photoPath: {
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
			addedLoan,
		} = toRefs(props);

		const kvCartModal = ref(null);
		const kvCartModalBody = ref(null);
		const controlsRef = ref(null);

		const trapElements = computed(() => [
			kvCartModal.value, // This cart modal
		]);
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

		const borrowerName = computed(() => {
			return addedLoan.value?.name ?? '';
		});
		const borrowerImage = computed(() => {
			return {
				alt: `Photo of ${borrowerName.value}`,
				aspectRatio: 1,
				defaultImage: { width: 300 },
				hash: addedLoan.value.imageHash,
				images: [
					{
						width: 300,
					},
				],
			};
		});
		const borrowerCountry = computed(() => {
			return addedLoan.value.country ?? '';
		});

		const amount = computed(() => {
			return addedLoan.value.amount ?? '';
		});

		const handleClick = (cta) => {
			hide(cta);
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
				setTimeout(() => {
					// Automatically close the cart modal after 10 seconds
					emit('cart-modal-closed', { type: 'time' });
				}, 10000);
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
			borrowerName,
			borrowerImage,
			borrowerCountry,
			amount,
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

.modal__body {
	@apply tw-flex tw-gap-2 tw-px-2.5 md:tw-px-4;
	height: 3.75rem;
}

.loan-image {
	width: 3.75rem;
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
