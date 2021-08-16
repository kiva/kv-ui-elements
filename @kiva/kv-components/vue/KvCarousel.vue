<template>
	<div
		ref="KvCarousel"
		class="tw-overflow-hidden tw-w-full"
	>
		<!-- Carousel Content -->
		<div
			class="tw-flex"
			@click.capture="onCarouselContainerClick"
		>
			<slot></slot>
		</div>
		<!-- Carousel Controls -->
		<div
			class="tw-flex
			tw-justify-between md:tw-justify-center tw-items-center
			tw-mt-3 tw-w-full"
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
	</div>
</template>

<script>
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
			inViewThreshold: 0.9,
			...this.emblaOptions,
		});

		if (this.slidesToScroll === 'visible') {
			this.reInitVisible();

			this.embla.on(
				'resize',
				throttle(() => {
					this.embla.reInit({
						slidesToScroll: this.embla.slidesInView(true).length,
						inViewThreshold: 0.9,
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
					inViewThreshold: 0.9,
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
	},
};
</script>

<style scoped>
</style>
