import KvCarousel from '../KvCarousel.vue';
import KvCarouselSlide from '../KvCarouselSlide.vue';
import KvLoadingSpinner from '../KvLoadingSpinner.vue';
import KvButton from '../KvButton.vue';

const randomHexColor = () => Math.floor(Math.random() * 16777215).toString(16);

// This is not an actual loan card template, just a vague
// approximation to make testing in the stories nicer
const generateLoanCardTemplate = () => {
	const cardCopy = [
		'A loan of $5,450 helps a member to buy flour, eggs, lard, sugar, sweets and other...',
		'A loan of $1,125 helps to face the financial problem of covering tuition fees.',
		'A loan of $450 helps to purchase store goods for resale.',
	];

	return `
		<div style="width: 336px">
			<img src="https://via.placeholder.com/336x252/${randomHexColor()}/000000" class="tw-w-full tw-rounded tw-mb-2">
			<h3>Card Title</h3>
			<h4 class="tw-my-1">$${Math.floor(Math.random() * (10000 - 50) + 50)} to go</h4>
			<p class="tw-mt-1 tw-mb-9">${cardCopy[Math.floor(Math.random() * cardCopy.length)]}</p>
			<kv-button
				variant="primary"
			>
				Read more
			</kv-button>
		</div>`;
};

const defaultCarouselSlides = `
	<template #slide1>
		<img src="https://via.placeholder.com/300x220/${randomHexColor()}/000000" class="tw-w-full">
	</template>
	<template #slide2>
		<img src="https://via.placeholder.com/300x220/${randomHexColor()}/000000" class="tw-w-full">
	</template>
	<template #slide3>
		<img src="https://via.placeholder.com/300x220/${randomHexColor()}/000000" class="tw-w-full">
	</template>
	<template #slide4>
		<img src="https://via.placeholder.com/300x220/${randomHexColor()}/000000" class="tw-w-full">
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
		<kv-carousel style="max-width: 400px;" :number-of-slides="4">
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
		<kv-carousel style="max-width: 400px;" :embla-options="{ loop: false }" :number-of-slides="4">
			${defaultCarouselSlides}
		</kv-carousel>
	`,
});

export const MultipleLoanCards = () => ({
	components: {
		KvCarousel,
		KvCarouselSlide,
		KvButton,
	},
	template: `
		<kv-carousel
			:embla-options="{ loop: false }"
			:number-of-slides="5"
			:multiple-slides-visible="true"
			style="max-width: 600px;"
			class="tw-w-full"
		>
			<template #slide1>
				${generateLoanCardTemplate()}
			</template>
			<template #slide2>
				${generateLoanCardTemplate()}
			</template>
			<template #slide3>
				${generateLoanCardTemplate()}
			</template>
			<template #slide4>
				${generateLoanCardTemplate()}
			</template>
			<template #slide5>
				${generateLoanCardTemplate()}
			</template>
		</kv-carousel>
	`,
});

export const MultipleLoanCards2 = () => ({
	components: {
		KvCarousel,
		KvCarouselSlide,
		KvButton,
	},
	template: `
		<kv-carousel
			:embla-options="{ loop: false }"
			:number-of-slides="9"
			:multiple-slides-visible="true"
			slides-to-scroll="visible"
			style="max-width: 1072px;"
			class="tw-w-full"
		>
			<template #slide1>
				${generateLoanCardTemplate()}
			</template>
			<template #slide2>
				${generateLoanCardTemplate()}
			</template>
			<template #slide3>
				${generateLoanCardTemplate()}
			</template>
			<template #slide4>
				${generateLoanCardTemplate()}
			</template>
			<template #slide5>
				${generateLoanCardTemplate()}
			</template>
			<template #slide6>
				${generateLoanCardTemplate()}
			</template>
			<template #slide7>
				${generateLoanCardTemplate()}
			</template>
			<template #slide8>
				${generateLoanCardTemplate()}
			</template>
			<template #slide9>
				${generateLoanCardTemplate()}
			</template>
		</kv-carousel>
	`,
});

export const loadingLoanCardExample = () => ({
	components: {
		KvCarousel,
		KvCarouselSlide,
		KvLoadingSpinner,
		KvButton,
	},
	data() {
		return {
			loan2Loaded: false,
			loan3Loaded: false,
		};
	},
	template: `
		<kv-carousel
			:embla-options="{ loop: false }"
			:number-of-slides="3"
			:multiple-slides-visible="false"
			style="max-width: 336px;"
			@change="onCarouselSlideChange"
		>
			<template #slide1>
				${generateLoanCardTemplate()}
			</template>
			<template #slide2>
				<div style="width: 336px">
					<div v-if="loan2Loaded">
						Loan card goes here
					</div>
					<div v-else
						style="display: flex; align-items: center; justify-content: center; position: absolute; top: 0; bottom: 0; right: 0; left: 0;"
					>
						<kv-loading-spinner  color="black" size="small" />
					</div>
				</div>
			</template>
			<template #slide3>
			<div style="width: 336px">
				<div v-if="loan3Loaded">
					Loan card goes here
				</div>
				<div v-else
					style="display: flex; align-items: center; justify-content: center; position: absolute; top: 0; bottom: 0; right: 0; left: 0;"
				>
					<kv-loading-spinner  color="black" size="small" />
				</div>
			</div>
			</template>
		</kv-carousel>
	`,
	methods: {
		onCarouselSlideChange(slideIndex) {
			console.log(`carousel changed to slide: ${slideIndex}`);
			console.log('start fetching the next indexes loan data now');
		},
	},
});
