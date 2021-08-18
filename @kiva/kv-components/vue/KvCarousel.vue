<template>
	<section
		ref="KvCarousel"
		class="tw-overflow-hidden tw-w-full"
		aria-label="carousel"
	>
		<!-- Carousel Content -->
		<div
			class="tw-flex"
			@click.capture="onCarouselContainerClick"
		>
			<kv-carousel-slide
				v-for="index in numberOfSlides"
				:key="index"
				:aria-label="`slide ${index} of ${numberOfSlides}`"
				:aria-current="true ? currentIndex + 1 === index : false"
				:aria-hidden="ariaHidden(index)"
				:tab-index="ariaHidden(index) ? '-1' : false"
				:class="multipleSlidesVisible ? 'tw-mx-2 last:tw-mr-0 first:tw-ml-0' : 'tw-w-full'"
			>
				<slot
					:name="`slide`+index"
				></slot>
			</kv-carousel-slide>
		</div>
		<!-- Carousel Controls -->
		<div
			class="tw-flex
			tw-justify-between md:tw-justify-center tw-items-center
			tw-mt-4 tw-w-full"
		>
			<button
				class="tw-text-gray-800 disabled:tw-text-gray-300
					tw-rounded-full
					tw-border-2 tw-border-text-gray-800
					tw-h-4 tw-w-4
					tw-flex tw-items-center tw-justify-center"
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
				{{ currentIndex + 1 }}/{{ slideIndicatorList.length }}
			</div>
			<button
				class="tw-text-gray-800 disabled:tw-text-gray-300
					tw-rounded-full
					tw-border-2 tw-border-text-gray-800
					tw-h-4 tw-w-4
					tw-flex tw-items-center tw-justify-center"
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
import EmblaCarousel from 'embla-carousel';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { throttle } from '../utils/throttle';

import KvMaterialIcon from './KvMaterialIcon.vue';
import KvCarouselSlide from './KvCarouselSlide.vue';

export default {
	components: {
		KvMaterialIcon,
		KvCarouselSlide,
	},
	props: {
		/**
		 * Should multiple slides be visible at a time.
		 * Used to set margin left/right for an individual carousel slide.
		 * */
		multipleSlidesVisible: {
			type: Boolean,
			default: false,
		},
		/**
		 * Number of slides the carousel contains
		 * */
		numberOfSlides: {
			type: Number,
			default: 0,
			required: true,
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
	},
	data() {
		return {
			mdiChevronLeft,
			mdiChevronRight,
			embla: null,
			slides: [],
			currentIndex: 0,
		};
	},
	computed: {
		nextIndex() {
			const nextSlideIndex = this.currentIndex + 1;
			if (nextSlideIndex < this.slides.length) {
				return nextSlideIndex;
			}
			return 0;
		},
		previousIndex() {
			const previousSlideIndex = this.currentIndex - 1;
			if (previousSlideIndex >= 0) {
				return previousSlideIndex;
			}
			return this.slides.length - 1;
		},
		slideIndicatorList() {
			return this.embla ? this.embla.scrollSnapList() : 0;
		},
	},
	mounted() {
		// initialize Embla
		this.embla = EmblaCarousel(this.$refs.KvCarousel, {
			loop: true,
			containScroll: 'trimSnaps',
			inViewThreshold: 0.1,
			...this.emblaOptions,
		});

		if (this.slidesToScroll === 'visible') {
			this.reInitVisible();

			this.embla.on(
				'resize',
				throttle(() => {
					this.embla.reInit({
						slidesToScroll: this.embla.slidesInView(true).length,
						inViewThreshold: 0.1,
					});
				}, 250),
			);
		}

		// get slide components
		this.slides = this.embla.slideNodes();

		this.embla.on('select', () => {
			this.currentIndex = this.embla.selectedScrollSnap();

			/**
			 * The index of the slide that the carousel has changed to
			 * @event change
			 * @type {Event}
			 */
			this.$emit('change', this.currentIndex);
		});
	},
	beforeDestroy() {
		// clean up event listeners
		this.embla.off('select');
		this.embla.destroy();
	},
	methods: {
		async handleUserInteraction(index, interactionType) {
			if (index !== null && typeof index !== 'undefined') {
				await this.$nextTick(); // wait for embla.
				this.goToSlide(index);
			}
			/**
			 * Fires when the user interacts with the carousel.
			 * Contains the interaction type (swipe-left, click-left-arrow, etc.)
			 * @event interact-carousel
			 * @type {Event}
			 */
			this.$emit('interact-carousel', interactionType);
		},
		/**
		 * Jump to a specific slide index
		 *
		 * @param {Number} num Index of slide to show
		 * @public This is a public method
		 */
		goToSlide(index) {
			this.embla.scrollTo(index);
			this.intervalTimerCurrentTime = 0;
		},
		/**
		 * Reinitialize the carousel.
		 * Used after adding slides dynamically.
		 *
		 * @public This is a public method
		 */
		reInit() {
			this.embla.reInit();
			if (this.slidesToScroll === 'visible') {
				this.reInitVisible();
			}
			this.slides = this.embla.slideNodes();
			this.$forceUpdate(); // force a re-render so embla.canScrollNext() gets called in the template
		},
		reInitVisible() {
			const slidesInView = this.embla.slidesInView(true).length;
			if (slidesInView) {
				this.embla.reInit({
					slidesToScroll: slidesInView,
					inViewThreshold: 0.1,
				});
			}
		},
		onCarouselContainerClick(e) {
			// If we're dragging, block click handlers within slides
			if (this.embla && !this.embla.clickAllowed()) {
				e.preventDefault();
				e.stopPropagation();
			}
		},
		ariaHidden(index) {
			// index starts at 1, embla starts at 0
			if (this.embla) {
				return !this.embla.slidesInView(true).includes(index - 1);
			}
			return false;
		},
	},
};
</script>

<style scoped>
</style>
