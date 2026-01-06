<template>
	<button
		ref="buttonRef"
		:disabled="disabled"
		class="tw-flex tw-items-center tw-justify-center tw-min-w-5.5 tw-min-h-5.5 tw-bg-transparent"
		:class="{
			'tw-opacity-low tw-cursor-default': disabled,
		}"
		@click="onClick"
	>
		<span
			class="tw-bg-primary tw-flex tw-items-center tw-justify-center"
			:class="[
				borderClass,
				radiusClass,
				{
					'tw-w-4 tw-h-4': size === 'small',
					'tw-w-5 tw-h-5': size === 'medium',
					'tw-w-6 tw-h-6': size === 'large',
				}
			]"
		>
			<kv-material-icon
				:icon="icon"
				:class="iconClass"
			/>
		</span>
	</button>
</template>

<script lang="ts">
import {
	ref,
} from 'vue';
import { mdiDotsVertical } from '@mdi/js';
import KvMaterialIcon from './KvMaterialIcon.vue';

export default {
	name: 'KvIconButton',
	components: {
		KvMaterialIcon,
	},
	props: {
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
			type: String,
			default: 'large',
			validator(value: string) {
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
	},
	emits: [
		'click',
	],
	setup(props, { emit }) {
		const buttonRef = ref(null);

		const onClick = (event) => {
			if (!props.disabled) {
				emit('click', event);
			}
		};

		return {
			buttonRef,
			onClick,
		};
	},
};
</script>
