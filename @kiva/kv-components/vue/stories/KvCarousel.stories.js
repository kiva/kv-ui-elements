import KvCarousel from '../KvCarousel.vue';
import KvCarouselSlide from '../KvCarouselSlide.vue';
import KvLoadingSpinner from '../KvLoadingSpinner.vue';

const defaultCarouselSlides = `
	<template #default>
		<kv-carousel-slide style="background-color: green;">
			<img src="https://via.placeholder.com/300x220/e8f0f6/000000" style="width: 100%;">
		</kv-carousel-slide>
		<kv-carousel-slide style="background-color: green;">
			<img src="https://via.placeholder.com/300x220/a87c7c/000000" style="width: 100%;">
		</kv-carousel-slide>
		<kv-carousel-slide style="background-color: green;">
			<img src="https://via.placeholder.com/300x220/f6dbb8/000000" style="width: 100%;">
		</kv-carousel-slide>
		<kv-carousel-slide style="background-color: green;">
			<img src="https://via.placeholder.com/300x220/b39696/000000" style="width: 100%;">
		</kv-carousel-slide>
	</template>
`;

export default {
	title: 'KvCarousel',
	component: KvCarousel,
};

export const Default = () => ({
	components: {
		KvCarousel,
		KvCarouselSlide,
	},
	template: `
		<kv-carousel style="max-width: 400px;">
			${defaultCarouselSlides}
		</kv-carousel>
	`,
});

export const LoopFalse = () => ({
	components: {
		KvCarousel,
		KvCarouselSlide,
	},
	template: `
		<kv-carousel style="max-width: 400px;" :embla-options="{ loop: false }">
			${defaultCarouselSlides}
		</kv-carousel>
	`,
});

export const MultipleLoanCards = () => ({
	components: {
		KvCarousel,
		KvCarouselSlide,
	},
	template: `
		<kv-carousel
			:embla-options="{ loop: false }"
			style="max-width: 400px;"
		>
			<kv-carousel-slide
				style="width: 15rem; margin-right: 1rem"
			>
				<img width="100%" src="https://p11.f2.n0.cdn.getcloudapp.com/items/X6uNbg4d/Image%202020-08-24%20at%205.07.14%20PM.png?source=viewer&v=3a6ddf2dda936b41b04674cffc556b8b" />
			</kv-carousel-slide>
			<kv-carousel-slide
				style="width: 15rem; margin-right: 1rem"
			>
				<img width="100%" src="https://p11.f2.n0.cdn.getcloudapp.com/items/X6uNbg4d/Image%202020-08-24%20at%205.07.14%20PM.png?source=viewer&v=3a6ddf2dda936b41b04674cffc556b8b" />
			</kv-carousel-slide>
			<kv-carousel-slide
				style="width: 15rem; margin-right: 1rem"
			>
				<img width="100%" src="https://p11.f2.n0.cdn.getcloudapp.com/items/X6uNbg4d/Image%202020-08-24%20at%205.07.14%20PM.png?source=viewer&v=3a6ddf2dda936b41b04674cffc556b8b" />
			</kv-carousel-slide>
			<kv-carousel-slide
				style="width: 15rem; margin-right: 1rem"
			>
				<img width="100%" src="https://p11.f2.n0.cdn.getcloudapp.com/items/X6uNbg4d/Image%202020-08-24%20at%205.07.14%20PM.png?source=viewer&v=3a6ddf2dda936b41b04674cffc556b8b" />
			</kv-carousel-slide>
			<kv-carousel-slide
				style="width: 15rem; margin-right: 1rem"
			>
				<img width="100%" src="https://p11.f2.n0.cdn.getcloudapp.com/items/X6uNbg4d/Image%202020-08-24%20at%205.07.14%20PM.png?source=viewer&v=3a6ddf2dda936b41b04674cffc556b8b" />
			</kv-carousel-slide>
		</kv-carousel>
	`,
});

export const MultipleLoanCards2 = () => ({
	components: {
		KvCarousel,
		KvCarouselSlide,
	},
	template: `
		<kv-carousel
			:embla-options="{ loop: false }"
			style="max-width: 1024px; width: 100%"
		>
			<kv-carousel-slide
				style="width: 20rem; margin-right: 2rem"
			>
				<img width="100%" src="https://p11.f2.n0.cdn.getcloudapp.com/items/X6uNbg4d/Image%202020-08-24%20at%205.07.14%20PM.png?source=viewer&v=3a6ddf2dda936b41b04674cffc556b8b" />
			</kv-carousel-slide>
			<kv-carousel-slide
				style="width: 20rem; margin-right: 2rem"
			>
				<img width="100%" src="https://p11.f2.n0.cdn.getcloudapp.com/items/X6uNbg4d/Image%202020-08-24%20at%205.07.14%20PM.png?source=viewer&v=3a6ddf2dda936b41b04674cffc556b8b" />
			</kv-carousel-slide>
			<kv-carousel-slide
				style="width: 20rem; margin-right: 2rem"
			>
				<img width="100%" src="https://p11.f2.n0.cdn.getcloudapp.com/items/X6uNbg4d/Image%202020-08-24%20at%205.07.14%20PM.png?source=viewer&v=3a6ddf2dda936b41b04674cffc556b8b" />
			</kv-carousel-slide>
		</kv-carousel>
	`,
});

export const loadingLoanCardExample = () => ({
	components: {
		KvCarousel,
		KvCarouselSlide,
		KvLoadingSpinner,
	},
	data() {
		return {
			loan2Loaded: false,
			loan3Loaded: false,
		};
	},
	template: `
		<kv-carousel
			style="max-width: 600px;"
			@change="onCarouselSlideChange"
		>
			<kv-carousel-slide style="width: 15rem; margin-right: 1rem"
			>
				<div>Prefetched Loan card goes here</div>
				<img src="https://p11.f2.n0.cdn.getcloudapp.com/items/X6uNbg4d/Image%202020-08-24%20at%205.07.14%20PM.png?source=viewer&v=3a6ddf2dda936b41b04674cffc556b8b" />
			</kv-carousel-slide>
			<kv-carousel-slide>
				<div v-if="loan2Loaded">
					Loan card goes here
				</div>
				<div v-else
					style="display: flex; align-items: center; justify-content: center; position: absolute; top: 0; bottom: 0; right: 0; left: 0;"
				>
					<kv-loading-spinner  color="black" size="small" />
				</div>
			</kv-carousel-slide>
			<kv-carousel-slide>
				<div v-if="loan3Loaded">
					Loan card goes here
				</div>
				<div v-else
					style="display: flex; align-items: center; justify-content: center; position: absolute; top: 0; bottom: 0; right: 0; left: 0;"
				>
					<kv-loading-spinner  color="black" size="small" />
				</div>
			</kv-carousel-slide>
		</kv-carousel>
	`,
	methods: {
		onCarouselSlideChange(slideIndex) {
			console.log(`carousel changed to slide: ${slideIndex}`);
			console.log('start fetching the next indexes loan data now');
		},
	},
});
