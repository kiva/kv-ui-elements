<template>
	<button
		type="button"
		:disabled="disabled"
		:aria-pressed="toggleable ? modelValue : undefined"
		class="tw-flex tw-items-center tw-justify-center tw-min-w-5.5 tw-min-h-5.5 tw-bg-transparent"
		:class="{
			'tw-opacity-low tw-cursor-default': disabled,
		}"
		@click="onClick"
	>
		<span
			class="tw-flex tw-items-center tw-justify-center tw-transition-colors tw-duration-200"
			:class="[
				borderClass,
				radiusClass,
				backgroundClasses,
				{
					'tw-w-4 tw-h-4': size === 'small',
					'tw-w-5 tw-h-5': size === 'medium',
					'tw-w-6 tw-h-6': size === 'large',
				}
			]"
		>
			<kv-material-icon
				:icon="currentIcon"
				:class="currentIconClass"
			/>
		</span>
	</button>
</template>

<script setup lang="ts">
import {
	computed,
} from 'vue';
import type { PropType } from 'vue';
import { mdiDotsVertical } from '@mdi/js';
import KvMaterialIcon from './KvMaterialIcon.vue';

type ButtonSize = 'small' | 'medium' | 'large';

const props = defineProps({
	/**
	 * The Material Design Icon path from @mdi/js
	 */
	icon: {
		type: String,
		default: mdiDotsVertical,
	},
	/**
	 * Size of the visual button element (touch target is always 44px minimum)
	 * `small (16px), medium (20px), large (24px - default)`
	 */
	size: {
		type: String as PropType<ButtonSize>,
		default: 'large',
		validator(value: ButtonSize): boolean {
			return ['small', 'medium', 'large'].includes(value);
		},
	},
	/**
	 * Border classes to apply to the visual button element
	 */
	borderClass: {
		type: String,
		default: '',
	},
	/**
	 * Border radius classes to apply to the visual button element
	 */
	radiusClass: {
		type: String,
		default: 'tw-rounded-full',
	},
	/**
	 * Additional classes to apply to the icon
	 */
	iconClass: {
		type: String,
		default: '',
	},
	/**
	 * Whether the button is disabled
	 */
	disabled: {
		type: Boolean,
		default: false,
	},
	/**
	 * Default background color. Use 'bare' for no background, or any Tailwind bg class
	 * @example 'bare', 'tw-bg-gray-200', 'tw-bg-brand-500'
	 */
	defaultBackground: {
		type: String,
		default: 'bare',
	},
	/**
	 * Hover background color. Use 'bare' for no background, or any Tailwind bg class
	 * @example 'bare', 'hover:tw-bg-gray-200', 'hover:tw-bg-brand-500'
	 */
	hoverBackground: {
		type: String,
		default: 'hover:tw-bg-gray-200',
	},
	/**
	 * Active/pressed background color. Use 'bare' for no background, or any Tailwind bg class
	 * @example 'bare', 'active:tw-bg-gray-300', 'active:tw-bg-brand-600'
	 */
	activeBackground: {
		type: String,
		default: 'active:tw-bg-gray-300',
	},
	/**
	 * Whether the button acts as a toggle (on/off switch)
	 */
	toggleable: {
		type: Boolean,
		default: false,
	},
	/**
	 * The toggle state (for v-model support). Only used when toggleable is true.
	 */
	modelValue: {
		type: Boolean,
		default: false,
	},
	/**
	 * Icon to display when toggle is active/on. Only used when toggleable is true.
	 */
	activeIcon: {
		type: String,
		default: '',
	},
	/**
	 * Additional classes to apply to the icon when toggle is active. Only used when toggleable is true.
	 * @example 'tw-text-action', 'tw-text-brand-500'
	 */
	activeIconClass: {
		type: String,
		default: '',
	},
});

const emit = defineEmits(['click', 'update:modelValue']);

const onClick = (event: MouseEvent): void => {
	if (!props.disabled) {
		if (props.toggleable) {
			emit('update:modelValue', !props.modelValue);
		}
		emit('click', event);
	}
};

const currentIcon = computed((): string => {
	if (props.toggleable && props.modelValue && props.activeIcon) {
		return props.activeIcon;
	}
	return props.icon;
});

const currentIconClass = computed((): string => {
	if (props.toggleable && props.modelValue && props.activeIconClass) {
		return props.activeIconClass;
	}
	return props.iconClass;
});

const backgroundClasses = computed((): string[] => {
	const classes: string[] = [];

	// Default background
	if (props.defaultBackground !== 'bare') {
		classes.push(props.defaultBackground);
	}

	// Hover background
	if (props.hoverBackground !== 'bare') {
		classes.push(props.hoverBackground);
	}

	// Active background
	if (props.activeBackground !== 'bare') {
		classes.push(props.activeBackground);
	}

	return classes;
});
</script>
