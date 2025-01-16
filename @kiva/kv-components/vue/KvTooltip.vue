<template>
	<kv-theme-provider
		:theme="themeStyle"
		class="kv-tailwind"
	>
		<kv-popper
			:controller="controller"
			:popper-modifiers="popperModifiers"
			popper-placement="top"
			transition-type="kvfastfade"
			class="tooltip-pane tw-absolute tw-bg-primary tw-rounded tw-z-popover"
		>
			<div
				class="tw-p-2.5"
				style="max-width: 250px;"
			>
				<div
					v-if="$slots.title"
					class="tw-text-primary tw-font-medium tw-mb-1.5"
				>
					<slot name="title"></slot>
				</div>
				<div class="tw-text-primary">
					<slot></slot>
				</div>
			</div>
			<div
				class="tooltip-arrow tw-absolute tw-w-0 tw-h-0 tw-border-solid"
				x-arrow=""
			></div>
		</kv-popper>
	</kv-theme-provider>
</template>

<script>
import { ref, toRefs, computed } from 'vue-demi';
import {
	darkTheme,
	mintTheme,
} from '@kiva/kv-tokens/configs/kivaColors';
import KvPopper from './KvPopper.vue';
import KvThemeProvider from './KvThemeProvider.vue';

export default {
	name: 'KvTooltip',
	components: {
		KvPopper,
		KvThemeProvider,
	},
	// TODO: Add prop for tooltip placement, Currently defaults to 'top' but will flip to bottom when constrained
	props: {
		controller: {
			validator(value) {
				if (typeof value === 'string') return true;
				if (typeof window !== 'undefined'
					&& 'HTMLElement' in window
					&& value instanceof HTMLElement) return true;
				return false;
			},
			required: true,
		},
		theme: {
			type: String,
			default: 'default',
			validator(value) {
				// The value must match one of these strings
				return ['default', 'mint', 'dark'].indexOf(value) !== -1;
			},
		},
	},
	setup(props) {
		const {
			theme,
		} = toRefs(props);

		const popperModifiers = ref({
			preventOverflow: {
				padding: 10,
			},
		});

		const themeStyle = computed(() => {
			const themeMapper = {
				mint: mintTheme,
				dark: darkTheme,
			};
			return themeMapper[theme.value];
		});

		return {
			darkTheme,
			mintTheme,
			popperModifiers,
			themeStyle,
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
	@apply tw-border-white;
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

/* TODO: TWEAK Inner Arrow Styles for Left + Right Orientations */

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
