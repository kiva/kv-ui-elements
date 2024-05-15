import KvCarousel from '../KvCarousel.vue';
import KvLoadingSpinner from '../KvLoadingSpinner.vue';
import KvButton from '../KvButton.vue';

const randomHexColor = (index) => {
	const defaultColor = '96d4b3';
	const colorArray = [
		'D5573B',
		'885053',
		'777DA7',
		'94C9A9',
		'C6ECAE',
		'C490D1',
		'A0D2DB',
		'7D8CC4',
		'726DA8',
	];
	return colorArray?.[index] || defaultColor;
};

// This is not an actual loan card template, just a vague
// approximation to make testing in the stories nicer
const generateLoanCardTemplate = (index) => {
	const amounts = [
		'100',
		'2,255',
		'50',
		'41,900',
	];
	const cardCopy = [
		'A loan of $5,450 helps a member to buy flour, eggs, lard, sugar, sweets and other...',
		'A loan of $1,125 helps to face the financial problem of covering tuition fees.',
		'A loan of $450 helps to purchase store goods for resale.',
	];

	return `
		<div style="width: 336px">
			<img src="https://via.placeholder.com/336x252/${randomHexColor(index)}/000000" class="tw-w-full tw-rounded tw-mb-2">
			<h3>Card Title</h3>
			<h4 class="tw-my-1">$${amounts?.[index] || amounts?.[1]} to go</h4>
			<p class="tw-mt-1 tw-mb-9">${cardCopy?.[index] || cardCopy?.[1]}</p>
			<kv-button
				variant="primary"
			>
				Read more
			</kv-button>
		</div>`;
};

const defaultCarouselSlides = `
	<template #slide1>
		<img src="https://via.placeholder.com/300x220/${randomHexColor(1)}/000000" class="tw-w-full">
	</template>
	<template #slide2>
		<img src="https://via.placeholder.com/300x220/${randomHexColor(2)}/000000" class="tw-w-full">
	</template>
	<template #slide3>
		<img src="https://via.placeholder.com/300x220/${randomHexColor(3)}/000000" class="tw-w-full">
	</template>
	<template #slide4>
		<img src="https://via.placeholder.com/300x220/${randomHexColor(4)}/000000" class="tw-w-full">
	</template>
`;

export default {
	title: 'KvCarousel',
	component: KvCarousel,
};

export const Default = () => ({
	components: {
		KvCarousel,
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
		KvButton,
	},
	template: `
		<kv-carousel
			:embla-options="{ loop: false }"
			:multiple-slides-visible="true"
			style="max-width: 600px;"
			class="tw-w-full"
		>
			<template #slide1>
				${generateLoanCardTemplate(1)}
			</template>
			<template #slide2>
				${generateLoanCardTemplate(2)}
			</template>
			<template #slide3>
				${generateLoanCardTemplate(3)}
			</template>
			<template #slide4>
				${generateLoanCardTemplate(4)}
			</template>
			<template #slide5>
				${generateLoanCardTemplate(5)}
			</template>
		</kv-carousel>
	`,
});

export const MultipleLoanCards2 = () => ({
	components: {
		KvCarousel,
		KvButton,
	},
	template: `
		<kv-carousel
			:embla-options="{ loop: false }"
			:multiple-slides-visible="true"
			slides-to-scroll="visible"
			style="max-width: 1072px;"
			class="tw-w-full"
		>
			<template #slide1>
				${generateLoanCardTemplate(1)}
			</template>
			<template #slide2>
				${generateLoanCardTemplate(2)}
			</template>
			<template #slide3>
				${generateLoanCardTemplate(3)}
			</template>
			<template #slide4>
				${generateLoanCardTemplate(4)}
			</template>
			<template #slide5>
				${generateLoanCardTemplate(5)}
			</template>
			<template #slide6>
				${generateLoanCardTemplate(6)}
			</template>
			<template #slide7>
				${generateLoanCardTemplate(7)}
			</template>
			<template #slide8>
				${generateLoanCardTemplate(8)}
			</template>
			<template #slide9>
				${generateLoanCardTemplate(9)}
			</template>
		</kv-carousel>
	`,
});

export const MultipleLoanCardsReInit = () => ({
	components: {
		KvCarousel,
		KvButton,
	},
	template: `
		<div data-testid="carousel-container">
			<kv-carousel
				ref="myCarouselRef"
				:multiple-slides-visible="true"
				slides-to-scroll="visible"
				style="max-width: 800px;"
			>
				<template #slide1>
					${generateLoanCardTemplate(1)}
				</template>
				<template #slide2>
					${generateLoanCardTemplate(2)}
				</template>
				<template #slide3>
					${generateLoanCardTemplate(3)}
				</template>
				<template #slide4>
					${generateLoanCardTemplate(4)}
				</template>
				<template #slide5>
					${generateLoanCardTemplate(5)}
				</template>
				<template #slide6>
					${generateLoanCardTemplate(6)}
				</template>
				<template #slide7>
					${generateLoanCardTemplate(7)}
				</template>
				<template #slide8>
					${generateLoanCardTemplate(8)}
				</template>
			</kv-carousel>
			<kv-button @click.native.prevent="removeSlide()" role="removeSlideButton">Remove Slide</kv-button>
			<p>Slide Count: {{ slideCount }} | Indicator Count: {{ slideIndicatorCount }} | Removed Slides: {{ removedSlides.length }}</p>
		</div>
	`,
	data() {
		return {
			removedSlides: [],
			slideCount: null,
			slideIndicatorCount: null,
		};
	},
	mounted() {
		this.$nextTick(() => {
			this.slideCount = this.$refs?.myCarouselRef?.slides?.length;
			this.slideIndicatorCount = this.$refs?.myCarouselRef?.slideIndicatorCount;
		});
	},
	methods: {
		removeSlide() {
			// Fetch slides + remove one
			const slides = this.$refs?.myCarouselRef?.embla?.slideNodes();
			const slideToRemove = slides.pop();
			this.removedSlides.push(slideToRemove);
			this.$refs?.myCarouselRef?.embla?.containerNode()?.removeChild(slideToRemove);
			// Call our component reInit method
			this.$refs?.myCarouselRef?.reInit();
			// Update values for reflection in story
			this.slideCount = this.$refs?.myCarouselRef?.slides?.length;
			this.selectedIndexCheck = this.$refs?.myCarouselRef?.currentIndex;
			this.slideIndicatorCount = this.$refs?.myCarouselRef?.slideIndicatorCount;
		},
	},
});

export const loadingLoanCardExample = () => ({
	components: {
		KvCarousel,
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
			:multiple-slides-visible="false"
			style="max-width: 336px;"
			@change="onCarouselSlideChange"
		>
			<template #slide1>
				${generateLoanCardTemplate(1)}
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

export const ResponsiveSlides = () => ({
	components: {
		KvCarousel,
		KvButton,
	},
	template: `
		<kv-carousel
			:embla-options="{ loop: false }"
			:multiple-slides-visible="true"
			slides-to-scroll="visible"
			style="max-width: 1072px;"
			class="tw-w-full"
			slide-max-width="32.5rem"
		>
			${defaultCarouselSlides}
		</kv-carousel>
	`,
});

export const CustomStartIndex = () => ({
	components: {
		KvCarousel,
		KvButton,
	},
	template: `
		<kv-carousel
			:embla-options="{ loop: false, align: 'center', startIndex: 1 }"
			:multiple-slides-visible="true"
			slides-to-scroll="visible"
			style="max-width: 1072px;"
		>
			<template #slide1>
				${generateLoanCardTemplate(1)}
			</template>
			<template #slide2>
				${generateLoanCardTemplate(2)}
			</template>
			<template #slide3>
				${generateLoanCardTemplate(3)}
			</template>
			<template #slide4>
				${generateLoanCardTemplate(4)}
			</template>
			<template #slide5>
				${generateLoanCardTemplate(5)}
			</template>
			<template #slide6>
				${generateLoanCardTemplate(6)}
			</template>
			<template #slide7>
				${generateLoanCardTemplate(7)}
			</template>
			<template #slide8>
				${generateLoanCardTemplate(8)}
			</template>
			<template #slide9>
				${generateLoanCardTemplate(9)}
			</template>
		</kv-carousel>
	`,
});
