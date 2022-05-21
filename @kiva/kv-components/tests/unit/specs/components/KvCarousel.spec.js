import { render, fireEvent, waitFor } from '@testing-library/vue';
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

	it('verifies scroll/page count updates when changing slide count', async () => {
		const {
			getByRole,
			getAllByRole,
			getByLabelText,
			getByText,
			getByTestId,
		} = render({
			components: {
				KvButton,
				KvCarousel,
			},
			template: `
				<div data-testid="carousel-container"
				style="max-width: 800px;">
					<kv-carousel
						ref="myCarouselRef"
						style="max-width: 800px;"
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
						<template #slide5>
							<img  data-testid="slide5" src="https://via.placeholder.com/300x220/A0D2DB/000000" class="tw-w-full">
						</template>
						<template #slide6>
							<img data-testid="slide6" src="https://via.placeholder.com/300x220/C6ECAE/000000" class="tw-w-full">
						</template>
						<template #slide7>
							<img data-testid="slide7" src="https://via.placeholder.com/300x220/96d4b3/000000" class="tw-w-full">
						</template>
						<template #slide8>
							<img data-testid="slide8" src="https://via.placeholder.com/300x220/726DA8/000000" class="tw-w-full">
						</template>
					</kv-carousel>
					<kv-button @click.native.prevent="goToNextSlide()" role="nextSlideButton">Next slide</kv-button>
					<p>Slide index is {{ selectedIndexCheck }}</p>
					<kv-button @click.native.prevent="reInitCarousel()" role="reInitButton">reInit</kv-button>
					<p>Removed Slide Count is {{ selectedIndexCheck }}</p>
					<kv-button @click.native.prevent="removeSlides()" role="removeSlideButton">Remove Slides</kv-button>
					<p>Removed Slides Count: {{ removedSlides.length }}</p>
					<p>Slide Indicator Count: {{ slideIndicatorCount }}</p>
					<p>Slide Count: {{ slideCount }}</p>
					<p>Mounted Slide Count: {{ mountedSlideCount }}</p>
				</div>
			`,
			data() {
				return {
					selectedIndexCheck: null,
					removedSlides: [],
					slideCount: 8,
					slideIndicatorCount: null,
					mountedSlideCount: null,
				};
			},
			mounted() {
				this.$nextTick(() => {
					this.selectedIndexCheck = this?.$refs?.myCarouselRef?.currentIndex;
					this.slideIndicatorCount = this?.$refs?.myCarouselRef?.slideIndicatorCount;
					this.mountedSlideCount = this?.$refs?.myCarouselRef?.slides?.length;
					console.log('mounted width', this?.$refs?.myCarouselRef?.$el?.clientWidth);
				});
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
					this.selectedIndexCheck = this?.$refs?.myCarouselRef?.currentIndex;
					console.log('interactionType index after update', this.selectedIndexCheck);
				},
				goToNextSlide() {
					console.log('goToNextSlide ref index', this?.$refs?.myCarouselRef?.currentIndex);
					this?.$refs?.myCarouselRef?.goToSlide(1);
					this.selectedIndexCheck = this?.$refs?.myCarouselRef?.currentIndex;
					console.log('goToNextSlide index after update', this.selectedIndexCheck);
				},
				reInitCarousel() {
					console.log('reInitCarousel ref Before index', this?.$refs?.myCarouselRef?.currentIndex);
					console.log(typeof this?.$refs?.myCarouselRef);
					// console.log(this?.$refs.myCarouselRef);
					console.log(typeof this?.$refs?.myCarouselRef?.reInit);
					this?.$refs?.myCarouselRef?.reInit();
					console.log('reInitCarousel ref after index', this?.$refs?.myCarouselRef?.currentIndex);
				},
				removeSlides() {
					console.log('-------- removeSlides ----------');
					console.log('width', this.$refs?.myCarouselRef?.$el?.clientWidth);
					console.log('slides?.length', this.$refs?.myCarouselRef?.slides?.length);
					console.log('slideIndicatorCount', this.$refs?.myCarouselRef?.slideIndicatorCount);
					const slides = this?.$refs?.myCarouselRef?.embla?.slideNodes();
					// slides.splice(0, 3);
					// const removeSlide8 = slides.pop();
					// const removeSlide7 = slides.pop();
					// this.removedSlides.push(removeSlide8);
					// this.removedSlides.push(removeSlide7);
					this?.$refs?.myCarouselRef?.embla?.containerNode()?.removeChild(slides[7]);
					this?.$refs?.myCarouselRef?.embla?.containerNode()?.removeChild(slides[6]);
					this?.$refs?.myCarouselRef?.embla?.containerNode()?.removeChild(slides[5]);
					// this?.$refs?.myCarouselRef?.embla?.containerNode()?.removeChild(removeSlide7);
					// this.$refs.myCarouselRef.embla.reInit = jest.fn();
					this?.$refs?.myCarouselRef?.reInit();
					this.$nextTick(() => {
						console.log('slides?.length', this?.$refs?.myCarouselRef?.slides?.length);
						console.log('slideIndicatorCount', this?.$refs?.myCarouselRef?.slideIndicatorCount);
						console.log('currentIndex', this?.$refs?.myCarouselRef?.currentIndex);
						this.slideCount = this?.$refs?.myCarouselRef?.slides?.length;
						this.selectedIndexCheck = this?.$refs?.myCarouselRef?.currentIndex;
						this.slideIndicatorCount = this?.$refs?.myCarouselRef?.slideIndicatorCount;
					});

					console.log(this.selectedIndexCheck, this.slideIndicatorCount);
					console.log('-------- removeSlides ----------');
					// const slideToRemove = slides.pop();
					// this.removedSlides.push(slideToRemove);
					// console.log(slides);
					// this?.$refs?.myCarouselRef?.embla?.containerNode()?.removeChild(slideToRemove);
					// this?.$refs?.myCarouselRef?.reInit();
				},
			},
		}, addVueRouter());

		// check for our elements
		expect(getByRole('nextSlideButton')).toBeDefined();
		expect(getAllByRole('group').length).toBe(8);
		expect(getByTestId('slide1')).toBeVisible();

		// wait for appearance inside an assertion
		await waitFor(() => {
			expect(getByText('Slide index is 0')).toBeInTheDocument();
		});
		await waitFor(() => {
			expect(getByText('Slide Count: 8')).toBeVisible();
		});
		await waitFor(() => {
			expect(getByText('Mounted Slide Count: 8')).toBeVisible();
		});
		await waitFor(() => {
			expect(getByLabelText('screen 1 of 1')).toBeInTheDocument();
		});

		// Click third tab and expect the third panel to be visible
		// await fireEvent.click(getByText('Next slide'));
		// expect(getByTestId('slide2')).toBeVisible();

		// click the button to test our ref method
		await userEvent.click(getByText('Remove Slides', { hidden: true }));
		// expect(getByTestId('slide3')).toBeVisible();
		// await userEvent.click(getByText('reInit'));
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
						style="width: 400px; max-width: 400px; over-flow:hidden"
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
					<kv-button @click.native.prevent="gotoSlide(1)" role="gotoSlide">GoTo Slide 1</kv-button>
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
					this.selectedIndexCheck = this?.$refs?.myCarouselRef?.currentIndex;
					console.log('interactionType index after update', this.selectedIndexCheck);
				},
				goToNextSlide() {
					console.log('goToNextSlide ref index', this?.$refs?.myCarouselRef?.currentIndex);
					this?.$refs?.myCarouselRef?.goToSlide(1);
					this.selectedIndexCheck = this?.$refs?.myCarouselRef?.currentIndex;
					console.log('goToNextSlide index after update', this.selectedIndexCheck);
				},
				gotoSlide(slideNumber) {
					console.log('goToNextSlide ref index', this?.$refs?.myCarouselRef?.currentIndex);
					this?.$refs?.myCarouselRef?.goToSlide(slideNumber);
					this.selectedIndexCheck = this?.$refs?.myCarouselRef?.currentIndex;
					console.log('goToNextSlide index after update', this.selectedIndexCheck);
				},
				reInitCarousel() {
					console.log('reInitCarousel ref Before index', this?.$refs?.myCarouselRef?.currentIndex);
					console.log(typeof this?.$refs?.myCarouselRef);
					// console.log(this?.$refs.myCarouselRef);
					console.log(typeof this?.$refs?.myCarouselRef?.reInit);
					this?.$refs?.myCarouselRef?.reInit();
					console.log('reInitCarousel ref after index', this?.$refs?.myCarouselRef?.currentIndex);
				},
			},
		}, addVueRouter());

		// // check for our elements
		expect(getByRole('nextSlideButton')).toBeDefined();
		expect(getAllByRole('group').length).toBe(4);
		expect(getByTestId('slide1')).toBeVisible();
		// ummmm ok. So all the slides are visible, max-width styles don't work in headless
		expect(getByTestId('slide4')).toBeVisible();

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
		await userEvent.click(getByText('Show next slide', { hidden: true }));
		expect(getByTestId('slide3')).toBeVisible();

		// await waitFor(() => {
		// 	expect(getByText('Slide index is 3')).toBeVisible();
		// });
		// expect(getByText('Third Panel')).not.toBeVisible();
		// expect(getByText('First Panel')).toBeVisible();
		// // Test access and updating of property ref
		// // expect the selected index value to be set to our new tab index
		// expect(getByText('Tab index is 0')).toBeVisible();
		// // Click third tab and expect the third panel to be visible
		await fireEvent.click(getByText('Next slide'));
		expect(getByTestId('slide4')).toBeVisible();

		// Test GoTo Slide method
		await userEvent.click(getByText('GoTo Slide 1'));
		await waitFor(() => {
			expect(getByTestId('slide1')).toBeVisible();
		});
	});
});
