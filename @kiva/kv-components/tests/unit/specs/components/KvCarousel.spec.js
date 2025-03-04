import { render } from '@testing-library/vue';
import { axe } from 'jest-axe';
import KvCarousel from '#components/KvCarousel.vue';

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

const defaultCarouselSlides = `
	<template #slide1>
		<img src="https://placehold.co/300x220/${randomHexColor(1)}/000000" alt="img1" class="tw-w-full">
	</template>
	<template #slide2>
		<img src="https://placehold.co/300x220/${randomHexColor(2)}/000000" alt="img2" class="tw-w-full">
	</template>
	<template #slide3>
		<img src="https://placehold.co/300x220/${randomHexColor(3)}/000000" alt="img3" class="tw-w-full">
	</template>
	<template #slide4>
		<img src="https://placehold.co/300x220/${randomHexColor(4)}/000000" alt="img4" class="tw-w-full">
	</template>
`;

// Mocking IntersectionObserver and ResizeObserver and matchMedia
// required for embla carousel
Object.defineProperty(window, 'IntersectionObserver', {
	writable: true,
	value: jest.fn().mockImplementation(() => ({
		observe: jest.fn(),
		unobserve: jest.fn(),
		disconnect: jest.fn(),
	})),
});

Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: jest.fn().mockImplementation((query) => ({
		matches: [].includes(query),
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
	})),
});

Object.defineProperty(window, 'ResizeObserver', {
	writable: true,
	value: jest.fn().mockImplementation(() => ({
		observe: jest.fn(),
		unobserve: jest.fn(),
		disconnect: jest.fn(),
	})),
});

describe('KvCarousel', () => {
	it('has no automated accessibility violations', async () => {
		const TestComponent = {
			template:
				`<kv-carousel style="max-width: 400px;">
					${defaultCarouselSlides}
				</kv-carousel>`,
			components: { KvCarousel },
		};
		const { container } = render(TestComponent);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
