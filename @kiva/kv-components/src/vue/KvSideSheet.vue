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
			ref="sideSheetRef"
			class="tw-fixed tw-right-0 tw-transition-all tw-duration-300 tw-bg-white tw-overflow-y-auto"
			:class="{
				'tw-translate-x-full': !open,
				'tw-translate-x-0': open,
				'tw-h-full': $slots.controls,
			}"
			:style="sideSheetStyles"
		>
			<div
				class="tw-flex tw-flex-col tw-h-full"
				:style="modalStyles"
			>
				<div
					ref="headlineRef"
					class="tw-flex tw-justify-between tw-transition-opacity tw-duration-200
					tw-px-3 tw-py-2 tw-border-tertiary tw-gap-1.5"
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
						<h3 v-if="headline">
							{{ headline }}
						</h3>
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
					id="sidesheet-content"
					class="tw-overflow-y-auto tw-overscroll-y-contain"
					:style="{ height: contentHeight + 'px' }"
				>
					<div
						class="tw-px-2 tw-transition-opacity tw-duration-200"
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
					class="
						tw-absolute tw-bottom-0 tw-w-full
						tw-border-t tw-border-tertiary tw-bg-white
						tw-transition-opacity tw-duration-200"
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
	name: 'KvSideSheet',
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
		 * The headline of the side sheet
		 * */
		headline: {
			type: String,
			default: '',
		},
		/**
		 * The CSS width of the SideSheet, either as a string (e.g., '33.33%') or an object with
		 * breakpoint-specific widths (e.g., { default: '100%', lg: '50%' }). Supports responsive
		 * design with breakpoints: default, sm, md, lg, xl, 2xl
		 * */
		widthDimensions: {
			type: [String, Object],
			default: () => ({ default: '100%', md: '50%' }),
			validator: (value) => {
				if (typeof value === 'string') {
					return /^(\d+px|[\d.]+%|auto|inherit|initial)$/.test(value);
				}
				if (typeof value === 'object') {
					return Object.keys(value).every((key) => ['default', 'sm', 'md', 'lg', 'xl', '2xl'].includes(key)
						&& /^(\d+px|[\d.]+%|auto|inherit|initial)$/.test(value[key]));
				}
				return false;
			},
		},
		hideHeadlineBg: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['side-sheet-closed', 'go-to-link'],
	setup(props, { emit, slots }) {
		const {
			visible,
			kvTrackFunction,
			trackEventCategory,
			widthDimensions,
			hideHeadlineBg,
		} = toRefs(props);

		const open = ref(false);
		const modalStyles = ref({});
		const sideSheetRef = ref(null);
		const controlsRef = ref(null);
		const headlineRef = ref(null);
		const windowHeight = ref(null);
		const windowWidth = ref(null);

		const heights = reactive({
			headline: 0,
			controls: 0,
		});

		const contentHeight = computed(() => {
			const height = windowHeight.value
				- (hideHeadlineBg.value ? 0 : heights.headline)
				- heights.controls;
			return Math.max(height, 0);
		});

		// Compute animation width based on current viewport and widthDimensions
		const animationWidth = computed(() => {
			if (typeof widthDimensions.value === 'string') {
				return widthDimensions.value;
			}
			const breakpoints = {
				sm: 640,
				md: 768,
				lg: 1024,
				xl: 1280,
				'2xl': 1536,
			};
			const currentWidth = windowWidth.value || window.innerWidth;
			// Sort breakpoints from largest to smallest
			// Sort breakpoints from largest to smallest and find the first match
			const matchingBreakpoint = Object.keys(widthDimensions.value)
				.filter((key) => key !== 'default')
				.sort((a, b) => breakpoints[b] - breakpoints[a])
				.find((key) => currentWidth >= breakpoints[key]);
			// Return the matching breakpoint width or fallback to default
			return matchingBreakpoint
				? widthDimensions.value[matchingBreakpoint]
				: (widthDimensions.value.default || '100%');
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
			windowWidth.value = window.innerWidth;
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
			setTimeout(() => {
				emit('side-sheet-closed');
			}, 300); // Match transition duration
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
		}, { deep: true });

		// Use animationWidth for consistent width calculation
		const sideSheetStyles = computed(() => {
			return {
				width: animationWidth.value,
			};
		});

		// Watch for visibility changes (opening/closing)
		watch(visible, (newVisible) => {
			if (newVisible) {
				document.addEventListener('keyup', onKeyUp);

				// Clear any previous modal styles to ensure clean state
				modalStyles.value = {};

				setTimeout(() => {
					open.value = true;
					avoidBodyScroll();
					updateHeights();
				}, 10); // Reduced delay for smoother animation
			} else {
				open.value = false;
				avoidBodyScroll();
				document.removeEventListener('keyup', onKeyUp);
				modalStyles.value = {};
			}
		});

		// Watch width changes when component is open (resize without animation)
		watch(animationWidth, (newWidth) => {
			if (open.value && visible.value) {
				if (modalStyles.value && Object.keys(modalStyles.value).length > 0) {
					modalStyles.value = {
						...modalStyles.value,
						width: newWidth,
						transition: 'none', // No animation for resize
					};
					// Re-enable transitions after a brief moment for future animations
					setTimeout(() => {
						if (modalStyles.value && Object.keys(modalStyles.value).length > 0) {
							modalStyles.value = {
								...modalStyles.value,
								transition: 'all 0.3s ease-in-out',
							};
						}
					}, 50);
				}
			}
		});

		// Apply responsive styles using <style> block
		const applyResponsiveStyles = () => {
			if (typeof widthDimensions.value === 'object' && sideSheetRef.value) {
				const styleId = 'side-sheet-styles';
				let styleElement = document.getElementById(styleId);
				if (!styleElement) {
					styleElement = document.createElement('style');
					styleElement.id = styleId;
					document.head.appendChild(styleElement);
				}

				const breakpoints = {
					sm: '640px',
					md: '768px',
					lg: '1024px',
					xl: '1280px',
					'2xl': '1536px',
				};

				// Sort breakpoints from smallest to largest to ensure correct cascade
				const sortedBreakpoints = Object.keys(widthDimensions.value)
					.filter((key) => key !== 'default')
					.sort((a, b) => {
						const order = ['sm', 'md', 'lg', 'xl', '2xl'];
						return order.indexOf(a) - order.indexOf(b);
					});

				const cssRules = sortedBreakpoints
					.map((key) => `
						@media (min-width: ${breakpoints[key]}) {
							#side-sheet-${props.trackEventCategory || 'default'} {
								width: ${widthDimensions.value[key]} !important;
							}
						}
					`)
					.join('');

				styleElement.textContent = cssRules;
				sideSheetRef.value.id = `side-sheet-${props.trackEventCategory || 'default'}`;

				onUnmounted(() => {
					if (styleElement) {
						styleElement.remove();
					}
				});
			}
		};

		watch(widthDimensions, () => {
			if (open.value) {
				applyResponsiveStyles();
			}
		}, { immediate: true });

		watch(open, (newOpen) => {
			if (newOpen) {
				applyResponsiveStyles();
			}
		});

		return {
			closeSideSheet,
			contentHeight,
			controlsRef,
			headlineRef,
			sideSheetRef,
			sideSheetStyles,
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
