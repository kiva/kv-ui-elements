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
			class="tw-flex tw-items-center tw-justify-center tw-transition-colors tw-duration-200 tw-rounded-full"
			:class="{
				'tw-w-4 tw-h-4': size === 'small',
				'tw-w-5 tw-h-5': size === 'medium',
				'tw-w-6 tw-h-6': size === 'large',
				'tw-bg-white hover:tw-bg-gray-100 active:tw-bg-gray-200': showBackground,
				'tw-border': showBorder,
				'tw-border-primary': showBorder && borderColor === 'primary',
				'tw-border-secondary': showBorder && borderColor === 'secondary',
				'tw-border-tertiary': showBorder && borderColor === 'tertiary',
			}"
		>
			<kv-material-icon
				:icon="currentIcon"
				:class="{
					'tw-w-2.5 tw-h-2.5': size === 'small',
				}"
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
type BorderColor = 'primary' | 'secondary' | 'tertiary';

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
	 * Whether to show a border on the button
	 */
	showBorder: {
		type: Boolean,
		default: false,
	},
	/**
	 * Border color variant. Only applies when showBorder is true.
	 * `primary, secondary, tertiary`
	 */
	borderColor: {
		type: String as PropType<BorderColor>,
		default: 'tertiary',
		validator(value: BorderColor): boolean {
			return ['primary', 'secondary', 'tertiary'].includes(value);
		},
	},
	/**
	 * Whether to show background on the button
	 * Applies white background with hover and active states
	 */
	showBackground: {
		type: Boolean,
		default: false,
	},
	/**
	 * Whether the button is disabled
	 */
	disabled: {
		type: Boolean,
		default: false,
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
</script>
