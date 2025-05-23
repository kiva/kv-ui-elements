<template>
	<div
		v-if="visible"
		class="tw-block lg:tw-mt-0 tw-fixed tw-inset-0
            tw-bg-black tw-transition-all md:tw-duration-150 tw-z-modal"
		:class="{
			'tw-bg-opacity-0 tw-delay-300': !open,
			'tw-bg-opacity-low': open,
		}"
		@click.self="closeSideSheet"
	>
		<div
			class="tw-fixed tw-right-0 tw-transition-all tw-duration-300 tw-bg-white tw-overflow-y-auto"
			:class="{
				'tw-w-0 tw-delay-200 tw-opacity-0': !open,
				'lg:tw-w-1/2 tw-w-full tw-opacity-full': open,
				'tw-h-full': $slots.controls,
			}"
		>
			<div
				class="tw-flex tw-flex-col tw-h-full"
				:style="modalStyles"
			>
				<div
					ref="headlineRef"
					class="tw-flex tw-justify-between tw-transition-opacity tw-duration-500 tw-delay-200
					tw-px-3 tw-py-2 tw-border-tertiary"
					:class="{
						'tw-opacity-0': !open,
						'tw-opacity-full': open,
						'tw-border-b': showHeadlineBorder
					}"
				>
					<div class="tw-flex tw-gap-1.5">
						<button
							v-if="showBackButton"
							class="hover:tw-text-action-highlight tw-flex tw-items-center tw-justify-center"
							@click="closeSideSheet"
						>
							<kv-material-icon
								class="tw-w-3 tw-h-3"
								:icon="mdiArrowLeft"
							/>
						</button>
						<h2 v-if="headline">
							{{ headline }}
						</h2>
					</div>
					<div class="tw-flex tw-gap-1.5">
						<button
							v-if="showGoToLink"
							class="hover:tw-text-action-highlight tw-flex tw-items-center tw-justify-center"
							@click="goToLink"
						>
							<kv-material-icon
								class="tw-w-3 tw-h-3"
								:icon="mdiExportVariant"
							/>
						</button>
						<button
							class="hover:tw-text-action-highlight tw-flex tw-items-center tw-justify-center"
							@click="closeSideSheet"
						>
							<kv-material-icon
								class="tw-w-3 tw-h-3"
								:icon="mdiClose"
							/>
						</button>
					</div>
				</div>
				<div
					class="tw-overflow-y-auto tw-overscroll-y-contain"
					:style="{ height: contentHeight + 'px' }"
				>
					<div
						class="tw-p-2 tw-transition-opacity tw-duration-500 tw-delay-200"
						:class="{
							'tw-opacity-0': !open,
							'tw-opacity-full': open,
						}"
					>
						<slot></slot>
					</div>
				</div>
				<div
					v-if="$slots.controls"
					ref="controlsRef"
					class="tw-absolute tw-bottom-0 tw-w-full tw-border-t tw-border-tertiary tw-bg-white"
					:class="{
						'tw-opacity-0': !open,
						'tw-opacity-full': open,
					}"
					style="z-index: 999"
				>
					<slot name="controls"></slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {
	onMounted,
	onUnmounted,
	ref,
	reactive,
	toRefs,
	watch,
	computed,
	nextTick,
} from 'vue';
import {
	mdiArrowLeft, mdiClose, mdiExportVariant,
} from '@mdi/js';
import KvMaterialIcon from './KvMaterialIcon.vue';

export default {
	components: {
		KvMaterialIcon,
	},
	props: {
		/**
		 * Whether the side sheet is open or not
		 * */
		visible: {
			type: Boolean,
			default: false,
		},
		/**
		 * Show the back button
		 * */
		showBackButton: {
			type: Boolean,
			default: false,
		},
		/**
		 * Show the go to link button
		 * */
		showGoToLink: {
			type: Boolean,
			default: false,
		},
		/**
		 * Show the border of the headline section
		 * */
		showHeadlineBorder: {
			type: Boolean,
			default: true,
		},
		/**
		 * Tracking event function
		 * */
		kvTrackFunction: {
			type: Function,
			default: () => ({}),
		},
		/**
		 * Tracking event category
		 * */
		trackEventCategory: {
			type: String,
			default: '',
		},
		/**
		 * Source element position for expand animation
		 * */
		animationSourceElement: {
			type: Object,
			default: () => ({}),
		},
		/**
		 * The headline of the side sheet
		 * */
		headline: {
			type: String,
			default: '',
		},
	},
	emits: ['side-sheet-closed', 'go-to-link'],
	setup(props, { emit, slots }) {
		const {
			visible,
			kvTrackFunction,
			trackEventCategory,
			animationSourceElement,
		} = toRefs(props);

		const open = ref(false);
		const initialStyles = ref({});
		const modalStyles = ref({});
		const controlsRef = ref(null);
		const headlineRef = ref(null);
		const windowHeight = ref(window.innerHeight);

		const heights = reactive({
			headline: 0,
			controls: 0,
		});

		const contentHeight = computed(() => {
			const height = windowHeight.value - heights.headline - heights.controls;
			return Math.max(height, 0);
		});

		// Debounce function to limit rapid ResizeObserver calls
		const debounce = (fn, delay) => {
			let timeout;
			return (...args) => {
				clearTimeout(timeout);
				timeout = setTimeout(() => fn(...args), delay);
			};
		};

		const updateHeights = () => {
			windowHeight.value = window.innerHeight;
			setTimeout(() => {
				nextTick(() => {
					if (headlineRef.value) {
						const headlineRect = headlineRef.value.getBoundingClientRect();
						heights.headline = headlineRect.height;
					} else {
						heights.headline = 0;
					}
					if (slots.controls?.() && controlsRef.value) {
						const controlsRect = controlsRef.value.getBoundingClientRect();
						heights.controls = controlsRect.height;
					} else {
						heights.controls = 0;
					}
				});
			}, 300); // Small delay to ensure DOM is fully styled
		};

		const debouncedUpdateHeights = debounce(updateHeights, 100);

		const avoidBodyScroll = () => {
			const bodyClasses = 'tw-overflow-hidden';
			if (open.value) {
				document.body.classList.add(bodyClasses);
			} else {
				document.body.classList.remove(bodyClasses);
			}
		};

		const closeSideSheet = () => {
			open.value = false;
			avoidBodyScroll();
			kvTrackFunction.value(trackEventCategory.value, 'click', 'side-sheet-closed');
			if (animationSourceElement.value) {
				modalStyles.value = {
					...initialStyles.value,
					transition: 'all 0.5s ease-in-out',
				};
			}
			setTimeout(() => {
				emit('side-sheet-closed');
			}, 700);
			// eslint-disable-next-line no-use-before-define
			document.removeEventListener('keyup', onKeyUp);
		};

		const goToLink = () => {
			emit('go-to-link');
		};

		const onKeyUp = (e) => {
			if (e?.key === 'Escape') {
				closeSideSheet();
			}
		};

		// Set up resize listeners
		onMounted(() => {
			setTimeout(() => {
				updateHeights();
			}, 100);
			if (controlsRef.value) {
				const controlsObserver = new ResizeObserver(debouncedUpdateHeights);
				controlsObserver.observe(controlsRef.value);
				onUnmounted(() => controlsObserver.disconnect());
			}
			if (headlineRef.value) {
				const headlineObserver = new ResizeObserver(debouncedUpdateHeights);
				headlineObserver.observe(headlineRef.value);
				onUnmounted(() => headlineObserver.disconnect());
			}
			window.addEventListener('resize', debouncedUpdateHeights);
			onUnmounted(() => window.removeEventListener('resize', debouncedUpdateHeights));
		});

		// Watch for slot content changes deeply
		watch(() => slots.controls?.(), () => {
			setTimeout(() => {
				updateHeights();
			}, 100);
		}, { deep: true, immediate: true });

		// Watch for visibility changes to re-measure
		watch(visible, (newVisible) => {
			if (newVisible) {
				document.addEventListener('keyup', onKeyUp);
				setTimeout(() => {
					open.value = true;
					avoidBodyScroll();
					updateHeights(); // Re-measure when side sheet opens
				}, 100);

				const rect = animationSourceElement.value?.getBoundingClientRect();
				const top = rect?.top ?? 0;
				const left = rect?.left ?? 0;
				const width = rect?.width ?? 0;
				const height = rect?.height ?? 0;

				if (top || left || width || height) {
					initialStyles.value = {
						position: 'fixed',
						top: `${top}px`,
						width: `${width}px`,
						height: `${height}px`,
					};

					modalStyles.value = {
						...initialStyles.value,
						transition: 'none',
					};

					setTimeout(() => {
						modalStyles.value = {
							top: '0',
							width: '100%',
							height: '100%',
							transition: 'all 0.5s ease-in-out',
						};
					}, 10);
				} else {
					modalStyles.value = {};
				}
			} else {
				open.value = false;
				avoidBodyScroll();
				document.removeEventListener('keyup', onKeyUp);
			}
		});

		return {
			closeSideSheet,
			contentHeight,
			controlsRef,
			headlineRef,
			goToLink,
			mdiArrowLeft,
			mdiClose,
			mdiExportVariant,
			modalStyles,
			open,
		};
	},
};
</script>
