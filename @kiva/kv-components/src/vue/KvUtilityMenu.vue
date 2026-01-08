<template>
	<div
		class="tw-relative utility-menu-wrapper"
		:class="[
			{
				'tw-w-4 tw-h-4': buttonSize === 'small',
				'tw-w-5 tw-h-5': buttonSize === 'medium',
				'tw-w-6 tw-h-6': buttonSize === 'large',
			}
		]"
	>
		<button
			ref="menuAnchor"
			v-kv-track-event="[analyticsCategory, 'click', 'utility-menu']"
			class="
				tw-absolute
				tw-bg-white
				tw-flex tw-items-center tw-justify-center
				menu-trigger"
			:class="[
				buttonBorderClass,
				buttonRadiusClass,
				{
					'tw-w-4 tw-h-4': buttonSize === 'small',
					'tw-w-5 tw-h-5': buttonSize === 'medium',
					'tw-w-6 tw-h-6': buttonSize === 'large',
				}
			]"
			@click.stop="handleMenuAnchorClick"
		>
			<KvMaterialIcon
				:icon="icon"
			/>
		</button>
		<div
			v-show="menuOpen"
			ref="optionsMenu"
			class="
				tw-absolute
				tw-bg-white
				tw-z-1
				tw-shadow-lg
				vertical-menu"
			:class="[
				menuBorderClass,
				menuRadiusClass,
				{
					'tw-right-0': menuPosition === 'right-aligned',
				}
			]"
			:style="`width: 236px; top: ${buttonSize === 'small' ? '2.5rem' : '3.5rem'};`"
		>
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
import {
	onBeforeUnmount,
	onMounted,
	ref,
} from 'vue';
import { mdiDotsVertical } from '@mdi/js';
import KvMaterialIcon from './KvMaterialIcon.vue';

export default {
	name: 'KvUtilityMenu',
	components: {
		KvMaterialIcon,
	},
	props: {
		analyticsCategory: {
			type: String,
			default: 'event-tracking',
		},
		buttonBorderClass: {
			type: String,
			default: '',
		},
		buttonRadiusClass: {
			type: String,
			default: 'tw-rounded',
		},
		buttonSize: {
			type: String,
			default: 'large',
			validator(value: string) {
				return [
					'small', 'medium', 'large',
				].includes(value);
			},
		},
		icon: {
			type: String,
			default: mdiDotsVertical,
		},
		menuBorderClass: {
			type: String,
			default: 'tw-border tw-border-tertiary',
		},
		menuRadiusClass: {
			type: String,
			default: 'tw-rounded',
		},
		menuPosition: {
			type: String,
			default: 'left-aligned',
			validator(value: string) {
				return [
					'left-aligned',
					'right-aligned',
				].includes(value);
			},
		},
	},
	emits: [
		'kv-utility-menu-clicked',
	],
	setup(props, { emit }) {
		const menuAnchor = ref(null);
		const menuOpen = ref(false);
		const optionsMenu = ref(null);

		const handleMenuClickOutside = (event) => {
			if (menuAnchor.value && !menuAnchor.value.contains(event.target)) {
				menuOpen.value = false;
			}
		};

		const handleMenuAnchorClick = () => {
			menuOpen.value = !menuOpen.value;
			emit('kv-utility-menu-clicked', { open: menuOpen.value });
		};

		onMounted(() => {
			document.addEventListener('click', handleMenuClickOutside);
		});

		onBeforeUnmount(() => {
			document.removeEventListener('click', handleMenuClickOutside);
		});

		return {
			handleMenuClickOutside,
			handleMenuAnchorClick,
			mdiDotsVertical,
			menuAnchor,
			menuOpen,
			optionsMenu,
		};
	},
};
</script>
