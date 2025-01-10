/* eslint-disable import/prefer-default-export */
import {
	computed,
	onMounted,
	onUnmounted,
	ref,
	toRefs,
	nextTick,
} from 'vue-demi';
import EmblaCarousel from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import { throttle } from './throttle';

export function carouselUtil(props, { emit, slots }, extraEmblaOptions) {
	const {
		autoplayOptions,
		fadeEnabled,
		emblaOptions,
		slidesToScroll,
	} = toRefs(props);
	const rootEl = ref(null);
	const embla = ref(null);
	const slides = ref([]);
	const isAutoplaying = ref(false);

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
		/** Stop autoplay on go to slide interaction */
		const autoplay = embla.value?.plugins()?.autoplay;
		if (autoplay) {
			autoplay.stop();
		}
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
	 * Start/Stop autoplay
	 *
	 * @public This is a public method
	 */
	const toggleAutoPlay = () => {
		const autoplay = embla.value?.plugins()?.autoplay;
		if (!autoplay) return;
		const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play;
		playOrStop();
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

	const combinedPluginOptions = computed(() => {
		const options = [];
		if (Object.keys(autoplayOptions.value).length !== 0) {
			options.push(Autoplay(autoplayOptions.value));
		}
		if (fadeEnabled.value) {
			options.push(Fade());
		}
		return options;
	});

	onMounted(async () => {
		embla.value = EmblaCarousel(rootEl.value, {
			loop: true,
			containScroll: 'trimSnaps',
			inViewThreshold: 0.9,
			align: 'start',
			...extraEmblaOptions,
			...emblaOptions.value,
		}, combinedPluginOptions.value);

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

		embla?.value?.on('select', () => {
			currentIndex.value = embla.value.selectedScrollSnap();

			/** After the select event, it is possible that embla will itself trigger a reinit.
			 * For example, if the act of selecting a slide causes it to change dimensions and the carousel
			 * needs to recalculate.
			 * When this reinit happens, autoplay settings will reset to the initial plugin options.
			 * Set playOnInit equal to the current state of autoplay to prevent this.
			*/
			const autoplay = embla.value?.plugins()?.autoplay;
			if (autoplay) {
				embla.value.plugins().autoplay.options.playOnInit = autoplay.isPlaying();
			}
			/**
			 * The index of the slide that the carousel has changed to
			 * @event change
			 * @type {Event}
			 */
			nextTick(() => {
				emit('change', currentIndex);
			});
		});

		embla?.value?.on('autoplay:play', () => {
			/**
			 * Fires when autoplay starts
			 * @event autoplay-play
			 * @type {Event}
			 */
			isAutoplaying.value = true;
		});

		embla?.value?.on('autoplay:stop', () => {
			/**
			 * Fires when autoplay starts
			 * @event autoplay-play
			 * @type {Event}
			 */
			isAutoplaying.value = false;
		});
	});

	onUnmounted(async () => {
		embla?.value?.off('select');
		embla?.value?.off('autoplay:play');
		embla?.value?.off('autoplay:stop');
		embla?.value?.destroy();
	});

	return {
		rootEl,
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
		isAriaHidden,
		isAutoplaying,
		slideIndicatorListLength,
		toggleAutoPlay,
	};
}
