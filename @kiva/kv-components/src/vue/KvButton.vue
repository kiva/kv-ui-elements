<template>
	<component
		:is="tag"
		ref="buttonRef"
		:to="to"
		:type="computedType"
		:disabled="isDisabled"
		class="tw-no-underline hover:tw-no-underline focus:tw-no-underline tw-inline-block"
		:class="{
			'tw-opacity-low': state === 'disabled',
			'tw-pointer-events-none': state === 'loading' || isDisabled
		}"
		@click="onClick"
	>
		<!-- eslint-disable max-len -->
		<span
			ref="buttonInnerRef"
			class="tw-inline-flex tw-w-full tw-justify-center tw-items-center tw-rounded
				tw-min-h-6 tw-relative tw-overflow-hidden tw-border tw-font-medium tw-text-center"
			:class="computedClass"
		>
			<!-- eslint-enable max-len -->
			<template v-if="state === 'loading'">
				<kv-loading-spinner
					class="tw-absolute tw-w-full tw-text-center tw-z-0"
					:color="loadingColor"
				/>
			</template>
			<span
				class="tw-py-1 tw-px-3 tw-z-10"
				:class="{ 'tw-invisible': state === 'loading' }"
			>
				<slot></slot>
			</span>
		</span>
	</component>
</template>

<script>
import {
	computed,
	onMounted,
	ref,
	toRefs,
	watch,
} from 'vue';
import KvLoadingSpinner from './KvLoadingSpinner.vue';

export default {
	components: {
		KvLoadingSpinner,
	},
	props: {
		/**
		 * Use if linking to a Vue route
		 */
		to: {
			type: [String, Object],
			default: null,
		},
		/**
		 * Use if linking to an external link or old-stack page
		 */
		href: {
			type: String,
			default: null,
		},
		/**
		 * The behavior of the button when used in an HTML form.
		 * `button (default), submit, reset`
		 */
		type: {
			type: String,
			default: 'button',
			validator(value) {
				return ['button', 'submit', 'reset'].includes(value);
			},
		},
		/**
		 * Appearance of the button
		 * `primary (default), secondary, danger, link, ghost`
		 */
		variant: {
			type: String,
			default: 'primary',
			validator(value) {
				return ['primary', 'secondary', 'link', 'ghost', 'danger', 'caution'].includes(value);
			},
		},
		/**
		 * State of the button
		 * `'' (default), active, disabled, loading`
		 */
		state: {
			type: String,
			default: '',
			validator(value) {
				return ['', 'active', 'disabled', 'loading'].includes(value);
			},
		},
	},
	emits: [
		'click',
	],
	setup(props, { emit }) {
		const {
			to,
			href,
			type,
			variant,
			state,
		} = toRefs(props);

		const loadingColor = computed(() => {
			switch (variant.value) {
				case 'secondary':
				case 'caution':
					return 'black';
				case 'ghost':
					return 'brand';
				default:
					return 'white';
			}
		});

		const computedClass = computed(() => {
			let classes = '';
			switch (variant.value) {
				case 'primary':
				default:
					classes = 'tw-text-primary-inverse';
					if (state.value === 'active') {
						classes = `${classes} tw-bg-action-highlight tw-border-action-highlight`;
					} else {
						// eslint-disable-next-line max-len
						classes = `${classes} tw-bg-action hover:tw-bg-action-highlight tw-border-action hover:tw-border-action-highlight`;
					}
					break;
				case 'secondary':
					classes = 'tw-text-action-highlight';
					if (state.value === 'active') {
						classes = `${classes} tw-bg-secondary`;
					} else {
						// eslint-disable-next-line max-len
						classes = `${classes} tw-bg-primary hover:tw-bg-secondary tw-border-action-highlight`;
					}
					break;
				case 'danger':
					classes = 'tw-text-danger';
					if (state.value === 'active') {
						classes = `${classes} tw-bg-danger-highlight tw-border-danger-highlight`;
					} else {
						// eslint-disable-next-line max-len
						classes = `${classes} tw-bg-danger hover:tw-bg-danger-highlight tw-border-danger hover:tw-border-danger-highlight`;
					}
					break;
				case 'link':
					classes = 'tw-bg-primary-inverse tw-text-primary-inverse';
					if (state.value === 'active') {
						classes = `${classes} tw-border-secondary tw-bg-action`;
					} else {
						classes = `${classes} tw-border-action-highlight hover:tw-border-action hover:tw-bg-action`;
					}
					break;
				case 'ghost':
					classes = 'tw-text-primary tw-border-transparent';
					if (state.value === 'active') {
						classes = `${classes} tw-bg-secondary`;
					} else {
						classes = `${classes} tw-bg-primary hover:tw-bg-secondary`;
					}
					break;
				case 'caution':
					classes = 'tw-text-caution';
					if (state.value === 'active') {
						classes = `${classes} tw-bg-caution-highlight tw-border-caution-highlight`;
					} else {
						// eslint-disable-next-line max-len
						classes = `${classes} tw-bg-caution hover:tw-bg-caution-highlight tw-border-caution hover:tw-border-caution-highlight`;
					}
					break;
			}
			return classes;
		});

		const isDisabled = computed(() => state.value === 'disabled' || state.value === 'loading');

		const tag = computed(() => {
			if (to.value) {
				return 'router-link';
			}
			if (href.value) {
				return 'a';
			}
			return 'button';
		});

		const computedType = computed(() => {
			if (to.value || href.value) {
				return null;
			}
			return type.value;
		});

		const buttonRef = ref(null);
		const buttonInnerRef = ref(null);

		const createRipple = (event) => {
			// build an element to animate
			const blipEl = document.createElement('span');
			blipEl.classList = `
				tw-absolute
				tw-inline-block
				tw-h-2
				tw-w-2
				tw-rounded-full
				tw-transform
				tw--translate-x-1/2
				tw--translate-y-1/2
				tw-opacity-0
				tw-animate-ripple
				motion-reduce:tw-animate-none
			`;
			blipEl.dataset.testid = 'ripple'; // for accessing in tests

			// some variants shouldn't have a white blip
			const darkBlipVariants = ['secondary', 'ghost'];
			const blipBgColor = darkBlipVariants.includes(variant.value) ? 'tw-bg-tertiary' : 'tw-bg-primary';
			blipEl.classList.add(blipBgColor);

			// position the blip where the pointer click is or center it if keyboard
			const fromClick = event.detail !== 0; // determine if click came from pointer or keyboard
			const { clientX, clientY } = event;

			if (buttonRef.value) {
				const {
					offsetLeft, offsetTop, offsetWidth, offsetHeight,
				} = buttonRef.value;
				let blipX;
				let blipY;
				if (fromClick) {
					blipX = `${clientX - offsetLeft}px`;
					blipY = `${clientY - offsetTop}px`;
				} else {
					blipX = `${offsetWidth / 2}px`;
					blipY = `${offsetHeight / 2}px`;
				}
				blipEl.style.setProperty('left', blipX);
				blipEl.style.setProperty('top', blipY);

				// append the blip to the button, remove it when the animation is done
				buttonInnerRef.value.appendChild(blipEl);
				blipEl.addEventListener('animationend', function animationComplete() {
					buttonInnerRef.value.removeChild(blipEl);
					blipEl.removeEventListener('animationend', animationComplete);
				});
			}
		};

		const onClick = (event) => {
			// Pass-through native click event to parent while adding ripple effect
			emit('click', event);
			createRipple(event);
		};

		const setHref = () => {
			// if the component is a router-link, router-link will set the href
			// if the href is passed as a prop, use that instead
			if (href.value) {
				buttonRef.value.href = href.value;
			}
		};
		watch(href, () => setHref());
		onMounted(() => setHref());

		return {
			buttonRef,
			buttonInnerRef,
			computedClass,
			computedType,
			isDisabled,
			loadingColor,
			onClick,
			tag,
		};
	},
};
</script>
