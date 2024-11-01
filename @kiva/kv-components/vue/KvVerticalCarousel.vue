<template>
	<div>
		<section
			ref="rootEl"
			aria-label="carousel"
			class="kv-carousel tw-overflow-hidden tw-relative"
		>
			<!-- Carousel Content -->
			<div
				class="tw-flex tw-flex-col tw-gap-y-1"
				:style="`height: ${heightStyle}`"
				@click.capture="onCarouselContainerClick"
			>
				<div
					v-for="(slotName, index) in componentSlotKeys"
					:key="index"
					role="group"
					:aria-label="`slide ${index + 1} of ${componentSlotKeys.length}`"
					:aria-current="currentIndex === index ? 'true' : 'false'"
					:aria-hidden="isAriaHidden(index)? 'true' : 'false'"
					:tab-index="isAriaHidden(index) ? '-1' : false"
				>
					<slot
						:name="slotName"
					></slot>
				</div>
			</div>
		</section>
		<!-- Carousel Controls -->
		<div
			class="kv-carousel__controls tw-flex
			tw-justify-between md:tw-justify-center tw-items-center tw-gap-2
			tw-mt-2 tw-w-full"
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
					:icon="mdiChevronUp"
				/>
				<span class="tw-sr-only">Show previous slide</span>
			</button>
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
					:icon="mdiChevronDown"
				/>
				<span class="tw-sr-only">Show next slide</span>
			</button>
		</div>
	</div>
</template>

<script>
import {
	mdiChevronUp,
	mdiChevronDown,
} from '@mdi/js';
import { carouselUtil } from '../utils/carousels';
import KvMaterialIcon from './KvMaterialIcon.vue';

export default {
	components: {
		KvMaterialIcon,
	},
	props: {
		/**
		 * Height style declaration of the vertical carousel.
		 * */
		heightStyle: {
			type: String,
			default: '400px;',
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
			nextIndex,
			onCarouselContainerClick,
			previousIndex,
			reInit,
			reInitVisible,
			rootEl,
			slideIndicatorCount,
			slides,
		} = carouselUtil(props, { emit, slots }, { axis: 'y' });

		return {
			componentSlotKeys,
			currentIndex,
			embla,
			goToSlide,
			handleUserInteraction,
			isAriaHidden,
			mdiChevronDown,
			mdiChevronUp,
			nextIndex,
			onCarouselContainerClick,
			previousIndex,
			reInit,
			reInitVisible,
			rootEl,
			slideIndicatorCount,
			slides,
		};
	},
};
</script>

<style scoped>
</style>
