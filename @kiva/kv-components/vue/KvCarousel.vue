<template>
	<section
		ref="rootEl"
		class="tw-overflow-hidden tw-w-full"
		aria-label="carousel"
	>
		<!-- Carousel Content -->
		<div
			role="carousel"
			class="tw-flex tw-gap-x-4"
			@click.capture="onCarouselContainerClick"
		>
			<div
				v-for="(slotName, index) in componentSlotKeys"
				:key="index"
				class="tw-flex-none tw-relative"
				role="group"
				:aria-label="`slide ${index} of ${componentSlotKeys.length}`"
				:aria-current="true ? currentIndex + 1 === index : false"
				:aria-hidden="isAriaHidden(index)"
				:tab-index="isAriaHidden(index) ? '-1' : false"
				:class="{ 'tw-w-full': !multipleSlidesVisible || slideMaxWidth }"
				:style="slideMaxWidth ? `max-width:${slideMaxWidth}` :''"
			>
				<slot
					:name="slotName"
				></slot>
			</div>
		</div>
		<!-- Carousel Controls -->
		<div
			class="tw-flex
			tw-justify-between md:tw-justify-center tw-items-center
			tw-mt-4 tw-w-full"
		>
			<button
				class="tw-text-primary
					tw-rounded-full
					tw-border-2 tw-border-primary
					tw-h-4 tw-w-4
					tw-flex tw-items-center tw-justify-center
					disabled:tw-opacity-low disabled:tw-cursor-default"
				:disabled="embla && !embla.canScrollPrev()"
				@click="handleUserInteraction(previousIndex, 'click-left-arrow')"
			>
				<kv-material-icon
					class="tw-w-4"
					:icon="mdiChevronLeft"
				/>
				<span class="tw-sr-only">Show previous slide</span>
			</button>
			<div class="tw-mx-2 md:tw-mx-3 lg:tw-mx-4 tw-invisible md:tw-visible">
				{{ currentIndex + 1 }}/{{ slideIndicatorListLength() }}
			</div>
			<button
				class="tw-text-primary
					tw-rounded-full
					tw-border-2 tw-border-primary
					tw-h-4 tw-w-4
					tw-flex tw-items-center tw-justify-center
					disabled:tw-opacity-low disabled:tw-cursor-default"
				:disabled="embla && !embla.canScrollNext()"
				@click="handleUserInteraction(nextIndex, 'click-right-arrow')"
			>
				<kv-material-icon
					class="tw-w-4"
					:icon="mdiChevronRight"
				/>
				<span class="tw-sr-only">Show next slide</span>
			</button>
		</div>
	</section>
</template>

<script>
import {
	computed,
	onMounted,
	onUnmounted,
	ref,
	toRefs,
	nextTick,
	getCurrentInstance,
} from 'vue-demi';
import EmblaCarousel from 'embla-carousel';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { throttle } from '../utils/throttle';

import KvMaterialIcon from './KvMaterialIcon.vue';

export default {
	components: {
		KvMaterialIcon,
	},
	props: {
		/**
		 * Should multiple slides be visible at a time.
		 * If true, a width must be set for each individual
		 * carousel slide or slideMaxWidth must
		 * be used.
		 * */
		multipleSlidesVisible: {
			type: Boolean,
			default: false,
		},
		/**
		 * Options for the embla carousel - // https://davidcetinkaya.github.io/embla-carousel/api#options
		 * */
		emblaOptions: {
			type: Object,
			default() {
				return {};
			},
		},
		/**
		 * The type of logic to implement when deciding how many slides
		 * to scroll when pressing the next/prev button
		 * `visible, auto`
		 * */
		slidesToScroll: {
			type: String,
			default: 'auto',
			validator: (value) => ['visible', 'auto'].indexOf(value) !== -1,
		},
		/**
		 * CSS value and unit to set the max width on responsive slides.
		 * Slide will be responsive full width until the max width value
		 * is reached - example value: '32.5rem'
		 * */
		slideMaxWidth: {
			type: String,
			default: '',
		},
	},
	emits: [
		'change',
		'interact-carousel',
	],
	setup(props, { emit, slots }) {
		const {
			emblaOptions,
			slidesToScroll,
		} = toRefs(props);
		const rootEl = ref(null);
		const embla = ref(null);
		const slides = ref([]);
		const currentIndex = ref(0);

		const forceUpdate = () => {
			const instance = getCurrentInstance();
			instance.proxy.$forceUpdate();
		};

		const componentSlotKeys = computed(() => {
			const keys = Object.keys(slots);
			return keys;
		});

		const nextIndex = computed(() => {
			const nextSlideIndex = currentIndex.value + 1;
			if (nextSlideIndex < slides.value.length) {
				return nextSlideIndex;
			}
			return 0;
		});

		const previousIndex = computed(() => {
			const previousSlideIndex = currentIndex.value - 1;
			if (previousSlideIndex >= 0) {
				return previousSlideIndex;
			}
			return slides.value.length - 1;
		});

		/**
		 * Jump to a specific slide index
		 *
		 * @param {Number} num Index of slide to show
		 * @public This is a public method
		 */
		const goToSlide = (index) => {
			embla.value.scrollTo(index);
		};
		const handleUserInteraction = async (index, interactionType) => {
			if (index !== null && typeof index !== 'undefined') {
				await nextTick(); // wait for embla.
				goToSlide(index);
			}
			/**
			 * Fires when the user interacts with the carousel.
			 * Contains the interaction type (swipe-left, click-left-arrow, etc.)
			 * @event interact-carousel
			 * @type {Event}
			 */
			emit('interact-carousel', interactionType);
		};
		/**
		 * Reinitialize the carousel.
		 * Used after adding slides dynamically.
		 *
		 * @public This is a public method
		 */
		const reInitVisible = () => {
			const slidesInView = embla.value.slidesInView(true).length;
			if (slidesInView) {
				embla.value.reInit({
					slidesToScroll: slidesInView,
					inViewThreshold: 0.9,
				});
			}
		};
		const reInit = () => {
			embla.value.reInit();
			if (slidesToScroll.value === 'visible') {
				reInitVisible();
			}
			slides.value = embla.value.slideNodes();
			forceUpdate(); // force a re-render so embla.canScrollNext() gets called in the template
		};
		const onCarouselContainerClick = (e) => {
			// If we're dragging, block click handlers within slides
			if (embla.value && !embla.value.clickAllowed()) {
				e.preventDefault();
				e.stopPropagation();
			}
		};
		/**
		 * If the slide is not completely in view in the carousel
		 * it should be aria-hidden
		 *
		 * @param {Number} index The current index of the slide (starts at 1)
		 * @returns {Boolean}
		 */
		const isAriaHidden = (index) => {
			// Index starts at 1
			// Embla starts at 0
			if (embla.value) {
				return !embla.value.slidesInView(true).includes(index - 1);
			}
			return false;
		};
		/**
		 * Returns number of slides in the carousel
		 *
		 * @returns {Number}
		 */
		const slideIndicatorListLength = () => {
			const indicator = embla.value ? embla.value.scrollSnapList().length : 0;
			return indicator;
		};

		onMounted(async () => {
			getCurrentInstance();
			embla.value = EmblaCarousel(rootEl.value, {
				loop: true,
				containScroll: 'trimSnaps',
				inViewThreshold: 0.9,
				align: 'start',
				...emblaOptions.value,
			});

			if (slidesToScroll.value === 'visible') {
				reInitVisible();

				embla.value.on(
					'resize',
					throttle(() => {
						embla.value.reInit({
							slidesToScroll: embla.value.slidesInView(true).length,
							inViewThreshold: 0.9,
						});
						forceUpdate();
					}, 250),
				);
			}

			// get slide components
			slides.value = embla.value.slideNodes();

			embla.value.on('select', () => {
				currentIndex.value = embla.value.selectedScrollSnap();

				/**
				 * The index of the slide that the carousel has changed to
				 * @event change
				 * @type {Event}
				 */
				emit('change', currentIndex);
			});
		});

		onUnmounted(async () => {
			embla.value.off('select');
			embla.value.destroy();
		});

		return {
			rootEl,
			mdiChevronLeft,
			mdiChevronRight,
			embla,
			slides,
			currentIndex,
			componentSlotKeys,
			nextIndex,
			previousIndex,
			handleUserInteraction,
			goToSlide,
			reInit,
			reInitVisible,
			onCarouselContainerClick,
			isAriaHidden,
			slideIndicatorListLength,
		};
	},
};
</script>
