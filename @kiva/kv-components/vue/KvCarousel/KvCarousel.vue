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
			:class="{
				'tw-mx-auto aside-controls-content': asideControls,
				'circle-carousel': inCircle
			}"
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
				:class="{ 'tw-w-full': !multipleSlidesVisible || slideMaxWidth, 'circle-slide': inCircle }"
				:style="slideMaxWidth ? `max-width:${slideMaxWidth}` :''"
			>
				<slot
					:name="slotName"
				></slot>
			</div>
		</div>
		<!-- Carousel Controls -->
		<div
			v-if="slideIndicatorCount > 1 && !isDotted"
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
					:icon="asideControls? mdiArrowLeft : mdiChevronLeft"
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
					:icon="asideControls ? mdiArrowRight : mdiChevronRight"
				/>
				<span class="tw-sr-only">Show next slide</span>
			</button>
		</div>
		<!-- Dotted Controls -->
		<div
			v-else-if="slideIndicatorCount > 1"
			class="kv-carousel__controls tw-flex tw-justify-center tw-items-center tw-gap-1.5 tw-mt-4 tw-w-full"
		>
			<button
				v-for="slide in slideIndicatorCount"
				:key="slide"
				@click="goToSlide(slide - 1)"
			>
				<div
					class="tw-rounded-full tw-border tw-transition tw-duration-500 tw-ease-in-out"
					:class="[
						{ 'tw-bg-black tw-border-black tw-h-1.5 tw-w-1.5': currentIndex === slide - 1 },
						{ 'tw-bg-tertiary tw-border-tertiary tw-h-1 tw-w-1': currentIndex !== slide - 1 }
					]"
				>
				</div>
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
	mdiChevronLeft,
	mdiChevronRight,
	mdiArrowLeft,
	mdiArrowRight,
} from '@mdi/js';
import { carouselUtil } from '../../utils/carousels';

import KvMaterialIcon from '../KvMaterialIcon';

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
		 * Options for the autoplay plugin - // https://www.embla-carousel.com/plugins/autoplay/#options
		 * */
		autoplayOptions: {
			type: Object,
			default() {
				return {};
			},
		},
		/**
		 * Enable fade plugin - // https://www.embla-carousel.com/plugins/fade/
		 * */
		fadeEnabled: {
			type: Boolean,
			default: false,
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
		/**
		 * Dotted controls version of the carousel
		 * */
		isDotted: {
			type: Boolean,
			default: false,
		},
		/**
		 * Enables carousel slides to have a circle effect
		 * */
		inCircle: {
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
			componentSlotKeys,
			currentIndex,
			embla,
			goToSlide,
			handleUserInteraction,
			isAriaHidden,
			isAutoplaying,
			nextIndex,
			previousIndex,
			reInit,
			reInitVisible,
			rootEl,
			slideIndicatorCount,
			slideIndicatorListLength,
			slides,
			toggleAutoPlay,
		} = carouselUtil(props, { emit, slots });

		return {
			componentSlotKeys,
			currentIndex,
			embla,
			goToSlide,
			handleUserInteraction,
			isAriaHidden,
			isAutoplaying,
			mdiArrowLeft,
			mdiArrowRight,
			mdiChevronLeft,
			mdiChevronRight,
			nextIndex,
			previousIndex,
			reInit,
			reInitVisible,
			rootEl,
			slideIndicatorCount,
			slideIndicatorListLength,
			slides,
			toggleAutoPlay,
		};
	},
};
</script>

<style lang="postcss" scoped>
.aside-controls-content {
	@screen lg {
		width: 82%;
	}
}

.circle-slide {
	width: auto;
}

.circle-slide.is-selected {
	opacity: 1;
	transform: scale(1.2);
	max-width: 300px;
}

.circle-slide:not(.is-selected) {
	opacity: 0.5;
	transform: scale(0.7);
}

.circle-carousel {
	margin: 0 auto;
}
</style>
