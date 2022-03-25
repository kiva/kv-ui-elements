import { render, fireEvent } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import KvButton from '../../../../vue/KvButton.vue';
import KvCarousel from '../../../../vue/KvCarousel.vue';
import addVueRouter from '../../utils/addVueRouter';

describe('KvCarousel', () => {
	it('has no automated accessibility violations', async () => {
		const { container } = render(KvCarousel);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it('verifies reInit method when called by a ref', async () => {
		const {
			getByRole,
			getAllByRole,
			getByText,
			getByTestId,
		} = render({
			components: {
				KvButton,
				KvCarousel,
			},
			template: `
				<div data-testid="carousel-container">
					<kv-carousel
						ref="myCarouselRef"
						style="max-width: 400px;"
						@change="onCarouselChange"
						@interact-carousel="onCarouselInteraction"
					>
						<template #slide1>
							<img  data-testid="slide1" src="https://via.placeholder.com/300x220/A0D2DB/000000" class="tw-w-full">
						</template>
						<template #slide2>
							<img data-testid="slide2" src="https://via.placeholder.com/300x220/C6ECAE/000000" class="tw-w-full">
						</template>
						<template #slide3>
							<img data-testid="slide3" src="https://via.placeholder.com/300x220/96d4b3/000000" class="tw-w-full">
						</template>
						<template #slide4>
							<img data-testid="slide4" src="https://via.placeholder.com/300x220/726DA8/000000" class="tw-w-full">
						</template>
					</kv-carousel>
					<kv-button @click.native.prevent="goToNextSlide()" role="nextSlideButton">Next slide</kv-button>
					<p>Slide index is {{ selectedIndexCheck }}</p>
				</div>
			`,
			data() {
				return { selectedIndexCheck: null };
			},
			methods: {
				onCarouselChange(currentIndex) {
					console.log('onCarouselChange event index', currentIndex);
					console.log('onCarouselChange ref index', this?.$refs?.myCarouselRef?.currentIndex);
					// this.selectedIndexCheck = currentIndex;
					this.selectedIndexCheck = this?.$refs?.myCarouselRef?.currentIndex;
					console.log('onCarouselChange index after update', this.selectedIndexCheck);
				},
				onCarouselInteraction(interactionType) {
					console.log('interactionType', interactionType);
					console.log('interactionType ref index', this?.$refs?.myCarouselRef?.currentIndex);
					console.log('interactionType index after update', this.selectedIndexCheck);
				},
				goToNextSlide() {
					console.log('goToNextSlide ref index', this?.$refs?.myCarouselRef?.currentIndex);
					this?.$refs?.myCarouselRef?.goToSlide(1);
					console.log('goToNextSlide index after update', this.selectedIndexCheck);
				},
			},
		}, addVueRouter());

		// // check for our elements
		expect(getByRole('nextSlideButton')).toBeDefined();
		expect(getAllByRole('group').length).toBe(4);
		expect(getByTestId('slide1')).toBeVisible();

		// // Click third tab and expect the third panel to be visible
		await fireEvent.click(getByText('Next slide'));
		expect(getByTestId('slide2')).toBeVisible();

		// Test updating of property from emitted event
		// expect the selected index value to be set to our new slide index
		// expect(getByText('Slide index is 2')).toBeVisible();
		// expect(getByText('First Panel')).not.toBeVisible();
		// expect(getByText('Third Panel')).toBeVisible();
		// // Test access and updating of property ref
		// // expect the selected index value to be set to our new tab index
		// expect(getByText('Tab index is 2')).toBeVisible();

		// // click the button to test our ref method
		await userEvent.click(getByText('Show next slide'));
		expect(getByTestId('slide3')).toBeVisible();
		expect(getByText('Slide index is 3')).toBeVisible();
		// expect(getByText('Third Panel')).not.toBeVisible();
		// expect(getByText('First Panel')).toBeVisible();
		// // Test access and updating of property ref
		// // expect the selected index value to be set to our new tab index
		// expect(getByText('Tab index is 0')).toBeVisible();
	});
});
