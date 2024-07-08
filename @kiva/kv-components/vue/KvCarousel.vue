<template>
	<section
		ref="rootEl"
		class="kv-carousel tw-overflow-hidden tw-w-full"
		:class="{ 'lg:tw-relative': asideControls }"
		aria-label="carousel"
	>
		<!-- Carousel Content -->
		<div
			class="tw-flex tw-gap-x-4"
			:class="{ 'tw-mx-auto aside-controls-content': asideControls }"
			@click.capture="onCarouselContainerClick"
		>
			<div
				v-for="(slotName, index) in componentSlotKeys"
				:key="index"
				class="tw-flex-none tw-relative"
				role="group"
				:aria-label="`slide ${index + 1} of ${componentSlotKeys.length}`"
				:aria-current="currentIndex === index ? 'true' : 'false'"
				:aria-hidden="isAriaHidden(index)? 'true' : 'false'"
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
			v-if="slideIndicatorCount > 1"
			class="kv-carousel__controls tw-flex
			tw-justify-between md:tw-justify-center tw-items-center
			tw-mt-4 tw-w-full"
			:class="{ 'lg:tw-hidden': asideControls }"
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
			<div
				:aria-label="`screen ${currentIndex + 1} of ${slideIndicatorCount}`"
				class="tw-mx-2 md:tw-mx-3 lg:tw-mx-4 tw-invisible md:tw-visible"
			>
				{{ currentIndex + 1 }}/{{ slideIndicatorCount }}
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
		<!-- Aside Buttons -->
		<template v-if="asideControls">
			<div
				class="tw-hidden lg:tw-flex tw-absolute tw-h-full tw-top-0 tw-items-center"
				style="background: linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%); width: 8%;"
			>
				<button
					class="tw-text-primary tw-bg-gray-100
						tw-rounded-full
						tw-h-6 tw-w-6 tw-ml-3
						tw-flex tw-items-center tw-justify-center
						disabled:tw-opacity-low disabled:tw-cursor-default"
					:disabled="embla && !embla.canScrollPrev()"
					@click="handleUserInteraction(previousIndex, 'click-left-arrow')"
				>
					<kv-material-icon
						class="tw-w-4"
						:icon="mdiArrowLeft"
					/>
					<span class="tw-sr-only">Show previous slide</span>
				</button>
			</div>
			<div
				class="tw-hidden lg:tw-flex tw-absolute tw-h-full
					tw-top-0 tw-right-0 tw-items-center tw-justify-end tw-w-16"
				style="background: linear-gradient(270deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%); width: 8%;"
			>
				<button
					class="tw-text-primary tw-bg-gray-100
						tw-rounded-full
						tw-h-6 tw-w-6 tw-mr-3
						tw-flex tw-items-center tw-justify-center
						disabled:tw-opacity-low disabled:tw-cursor-default"
					:disabled="embla && !embla.canScrollNext()"
					@click="handleUserInteraction(nextIndex, 'click-right-arrow')"
				>
					<kv-material-icon
						class="tw-w-4"
						:icon="mdiArrowRight"
					/>
					<span class="tw-sr-only">Show next slide</span>
				</button>
			</div>
		</template>
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
} from 'vue-demi';
import EmblaCarousel from 'embla-carousel';
import {
	mdiChevronLeft,
	mdiChevronRight,
	mdiArrowLeft,
	mdiArrowRight,
} from '@mdi/js';
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
		/**
		 * Aside controls version of the carousel
		 * */
		asideControls: {
			type: Boolean,
			default: false,
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
		const startIndex = emblaOptions.value?.startIndex ?? 0;
		const currentIndex = ref(startIndex);
		// The indicator count may differ from the slide count when multiple slides are in view
		const slideIndicatorCount = ref(0);

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
		 * Returns number of slides in the carousel
		 *
		 * @returns {Number}
		 */
		const slideIndicatorListLength = () => {
			const indicator = embla.value ? embla.value.scrollSnapList().length : 0;
			slideIndicatorCount.value = indicator;
			return indicator;
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
			slideIndicatorListLength();
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
		 * @param {Number} index The current index of the slide
		 * @returns {Boolean}
		 */
		const isAriaHidden = (index) => {
			if (embla.value) {
				return !embla.value.slidesInView(true).includes(index);
			}
			return false;
		};

		onMounted(async () => {
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
							slidesToScroll: embla.value.slidesInView(true).length || 'auto',
							inViewThreshold: 0.9,
						});
						slides.value = embla.value.slideNodes();
						slideIndicatorListLength();
					}, 250),
				);
			}

			// get slide components
			slides.value = embla.value.slideNodes();
			slideIndicatorListLength();

			embla.value.on('select', () => {
				currentIndex.value = embla.value.selectedScrollSnap();
				/**
				 * The index of the slide that the carousel has changed to
				 * @event change
				 * @type {Event}
				 */
				nextTick(() => {
					emit('change', currentIndex);
				});
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
			mdiArrowLeft,
			mdiArrowRight,
			embla,
			slides,
			currentIndex,
			componentSlotKeys,
			nextIndex,
			previousIndex,
			slideIndicatorCount,
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

<style scoped>
.aside-controls-content {
	@screen lg {
		width: 82%;
	}
}
</style>
