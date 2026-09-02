<template>
	<kv-popper
		ref="popperRef"
		:controller="controller"
		:popper-modifiers="popperModifiers"
		:popper-placement="placement"
		:persistent="!!$slots.action"
		transition-type="kvfastfade"
		class="tooltip-pane tw-absolute tw-rounded tw-z-popover"
		:class="paneClass"
		@hide="handleKvPopperVisibility(false)"
		@show="handleKvPopperVisibility(true)"
	>
		<div
			class="tw-p-2.5"
			:style="{ maxWidth }"
		>
			<div
				v-if="$slots.title"
				class="tw-font-medium tw-mb-1.5"
			>
				<slot name="title"></slot>
			</div>
			<div>
				<slot></slot>
			</div>
			<div
				v-if="$slots.action"
				class="tooltip-action tw-mt-1.5"
				:class="{ 'tooltip-action--dark': resolvedVariant === 'dark' }"
				:style="defaultTheme"
			>
				<slot
					name="action"
					:close="dismiss"
				></slot>
			</div>
		</div>
		<div
			class="tooltip-arrow tw-absolute tw-w-0 tw-h-0 tw-border-solid"
			x-arrow=""
		></div>
	</kv-popper>
</template>

<script lang="ts">
import {
	ref,
	toRefs,
	computed,
	watch,
	PropType,
} from 'vue';
import { defaultTheme } from '@kiva/kv-tokens';
import KvPopper from './KvPopper.vue';

const VARIANTS = ['light', 'dark'];

const DEPRECATED_THEMES = {
	default: 'light',
	ecoGreenLight: 'light',
	ecoGreenDark: 'dark',
	ecoLightMarigold: 'light',
	ecoStoneLight: 'light',
};

export default {
	name: 'KvTooltip',
	components: {
		KvPopper,
	},
	props: {
		controller: {
			type: [String, Object as PropType<HTMLElement>],
			validator(value: string | HTMLElement) {
				if (typeof value === 'string') return true;
				if (typeof window !== 'undefined'
					&& 'HTMLElement' in window
					&& value instanceof HTMLElement) return true;
				return false;
			},
			required: true,
		},
		maxWidth: {
			type: String,
			default: '250px',
		},
		modifiers: {
			type: Object,
			default: () => ({}),
		},
		placement: {
			type: String,
			default: 'top',
		},
		showTooltip: {
			type: Boolean,
			default: false,
		},
		/**
		 * Fixed neutral color of the tooltip. Defaults to `light`.
		 * Use `dark` over light surfaces and `light` over dark surfaces.
		 */
		variant: {
			type: String,
			default: undefined,
			validator(value: string) {
				return value === undefined || VARIANTS.indexOf(value) !== -1;
			},
		},
		/**
		 * @deprecated Use `variant` instead. Themed tooltips are being removed:
		 * `ecoGreenDark` maps to `dark`, every other value maps to `light`.
		 */
		theme: {
			type: String,
			default: undefined,
			validator(value: string) {
				return Object.keys(DEPRECATED_THEMES).indexOf(value) !== -1;
			},
		},
	},
	emits: ['tool-tip-visible', 'dismiss'],
	setup(props, { emit }) {
		const {
			modifiers,
			showTooltip,
			theme,
			variant,
		} = toRefs(props);

		const popperModifiers = computed(() => ({
			...modifiers.value,
			preventOverflow: {
				...modifiers.value.preventOverflow,
				padding: 10,
			},
		}));

		const popperRef = ref(null);

		const getControllerElement = (): HTMLElement | null => {
			if (typeof props.controller === 'string') {
				return document.getElementById(props.controller);
			}
			return props.controller;
		};

		const handleKvPopperVisibility = (isShowing) => {
			emit('tool-tip-visible', isShowing);
		};

		const triggerHover = (enter = true) => {
			const element = getControllerElement();
			if (element) {
				const eventType = enter ? 'mouseover' : 'mouseout';
				element.dispatchEvent(new MouseEvent(eventType, { bubbles: true }));
			}
		};

		// Ends the current viewing, not the tooltip: hovering the controller brings it back.
		// A one-time hint listens for `dismiss` and stops rendering it.
		const dismiss = () => {
			popperRef.value?.dismiss();
			emit('dismiss');
		};

		const resolvedVariant = computed(() => {
			if (variant.value) return variant.value;
			if (theme.value) return DEPRECATED_THEMES[theme.value];
			return 'light';
		});

		const paneClass = computed(() => (resolvedVariant.value === 'dark'
			? 'tooltip-pane--dark tw-bg-gray-800 tw-text-white'
			: 'tooltip-pane--light tw-bg-white tw-text-gray-800'));

		watch(showTooltip, (show) => {
			if (show) {
				triggerHover(true);
			} else {
				triggerHover(false);
			}
		});

		return {
			defaultTheme,
			dismiss,
			handleKvPopperVisibility,
			paneClass,
			popperModifiers,
			popperRef,
			resolvedVariant,
			triggerHover,
		};
	},
};
</script>

<style lang="postcss" scoped>
.tooltip-pane,
.tooltip-arrow {
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.tooltip-arrow {
	@apply tw-m-1;
}

.tooltip-pane--light .tooltip-arrow {
	border-color: theme('colors.white');
}

.tooltip-pane--dark .tooltip-arrow {
	border-color: theme('colors.gray.800');
}

/* KvTextLink resolves against --text-action, which the pinned default theme sets to a
   green only legible on the light chip. */
.tooltip-action--dark :deep(.tw-text-link) {
	color: theme('colors.eco-green.2');
}

.tooltip-action--dark :deep(.tw-text-link:hover),
.tooltip-action--dark :deep(.tw-text-link:focus) {
	color: theme('colors.white');
}

/* Top Tooltip Arrow appears on Bottom */
.tooltip-pane[x-placement^="top"] {
	@apply tw-mb-1;
}

.tooltip-pane[x-placement^="top"] .tooltip-arrow {
	border-width: 8px 8px 0 8px;
	border-left-color: transparent;
	border-right-color: transparent;
	border-bottom-color: transparent;
	left: calc(50% - 8px);
	@apply -tw-bottom-1 tw-mt-0 tw-mb-0;
}

/* Bottom Tooltip Arrow appears on Top */
.tooltip-pane[x-placement^="bottom"] {
	@apply tw-mt-1;
}

.tooltip-pane[x-placement^="bottom"] .tooltip-arrow {
	border-width: 0 8px 8px 8px;
	border-left-color: transparent;
	border-right-color: transparent;
	border-top-color: transparent;
	left: calc(50% - 8px);
	@apply -tw-top-1 tw-mb-0 tw-mt-0;
}

/* Right Side Tooltip, Arrow appears on Left */
.tooltip-pane[x-placement^="right"] {
	@apply tw-ml-1;
}

.tooltip-pane[x-placement^="right"] .tooltip-arrow {
	border-width: 8px 8px 8px 0;
	border-left-color: transparent;
	border-top-color: transparent;
	border-bottom-color: transparent;
	top: calc(50% - 8px);
	@apply -tw-left-1 tw-ml-0 tw-mr-0;
}

/* Left Side Tooltip, Arrow appears on Right */
.tooltip-pane[x-placement^="left"] {
	@apply tw-mr-1;
}

.tooltip-pane[x-placement^="left"] .tooltip-arrow {
	border-width: 8px 0 8px 8px;
	border-top-color: transparent;
	border-right-color: transparent;
	border-bottom-color: transparent;
	top: calc(50% - 8px);
	@apply -tw-right-1 tw-ml-0 tw-mr-0;
}
</style>
