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
				tw-absolute
				tw-inset-0
				tw-bg-black
				tw-bg-opacity-[75%]
			"
			@click.stop.prevent="onScreenClick"
		>
			<div>
				<div
					class="
						tw-absolute
						tw-inset-0
						md:tw-px-2
					"
				>
					<div
						ref="kvCartModal"
						tabindex="-1"
						data-test="kv-cart-modal"
						class="
							tw-bg-primary
							md:tw-absolute
							md:tw-right-0
							tw-w-full md:tw-w-auto
							tw-rounded-b
						"
						style="max-width: 30rem; max-height: 90%"
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
									<h3	class="tw-text-h3 tw-flex-1">
										Added to Basket
									</h3>
								</slot>
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
						</div>

						<!-- body -->
						<div
							id="kvCartModalBody"
							ref="kvCartModalBody"
							class="
								tw-flex
								tw-gap-2
								tw-px-2.5 md:tw-px-4
							"
							style="height: 3.75rem;"
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
							<div class="tw-flex tw-items-center tw-justify-between tw-w-full">
								<div class="tw-flex tw-flex-col tw-h-full tw-justify-between">
									<p>{{ borrowerName }}</p>
									<p class="tw-p-1 tw-text-center tw-rounded tw-bg-secondary tw-text-h5">
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
								tw-p-2.5 md:tw-px-4 md:tw-pb-4
							"
						>
							<kv-button
								class="tw-w-full"
								href="/checkout"
							>
								View basket ({{ basketCount }})
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
 */

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
		basketCount: {
			type: Number,
			default: 0,
		},
		addedLoan: {
			type: Object,
			default: () => ({}),
		},
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
			'[role="alert"]', // Any open toasts/alerts on the page
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
				hide('background-click');
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
					// Automatically close the cart modal after 5 seconds
					emit('cart-modal-closed', { type: 'time' });
				}, 5000);
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

			borrowerName,
			borrowerImage,
			borrowerCountry,
			amount,
		};
	},
};
</script>

<style lang="postcss" scoped>
.loan-image {
	width: 3.75rem;
}
</style>
