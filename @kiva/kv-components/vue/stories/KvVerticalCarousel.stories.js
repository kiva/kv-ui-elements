import KvVerticalCarousel from '../KvVerticalCarousel.vue';
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
			<img src="https://placehold.co/336x252/${randomHexColor(index)}/000000" class="tw-w-full tw-rounded tw-mb-2">
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
		<img src="https://placehold.co/400x150/${randomHexColor(1)}/000000">
	</template>
	<template #slide2>
		<img src="https://placehold.co/400x150/${randomHexColor(2)}/000000">
	</template>
	<template #slide3>
		<img src="https://placehold.co/400x150/${randomHexColor(3)}/000000">
	</template>
	<template #slide4>
		<img src="https://placehold.co/400x150/${randomHexColor(4)}/000000">
	</template>
`;

export default {
	title: 'KvVerticalCarousel',
	component: KvVerticalCarousel,
};

export const Default = () => ({
	components: {
		KvVerticalCarousel,
	},
	template: `
		<div style="width: 400px;">
			<kv-vertical-carousel height-style="310px" class="tw-w-full">
				${defaultCarouselSlides}
			</kv-vertical-carousel>
		</div>
	`,
});

export const LoopFalse = () => ({
	components: {
		KvVerticalCarousel,
	},
	template: `
		<div style="width: 400px;">
			<kv-vertical-carousel height-style="400px" class="tw-w-full">
				${defaultCarouselSlides}
			</kv-vertical-carousel>
		</div>
	`,
});

export const MultipleLoanCards = () => ({
	components: {
		KvVerticalCarousel,
		KvButton,
	},
	template: `
		<kv-vertical-carousel
			:embla-options="{ loop: false }"
			:multiple-slides-visible="true"
			style="max-width: 600px;"
			height-style="510px"
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
		</kv-vertical-carousel>
	`,
});

export const CustomStartIndex = () => ({
	components: {
		KvVerticalCarousel,
		KvButton,
	},
	template: `
		<kv-vertical-carousel
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
		</kv-vertical-carousel>
	`,
});
