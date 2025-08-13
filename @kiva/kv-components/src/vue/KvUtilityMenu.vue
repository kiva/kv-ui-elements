<template>
	<div class="tw-relative">
		<button
			ref="menuAnchor"
			v-kv-track-event="['`${analyticsCategory}`', 'click', 'utility-menu']"
			class="
				tw-absolute
				tw-bg-white
				tw-flex tw-items-center tw-justify-center
				menu-trigger"
			:class="[
				buttonBorderClass,
				buttonRadiusClass,
				buttonSize === 'small' ? 'tw-w-4 tw-h-4' : 'tw-w-6 tw-h-6',
			]"
			@click="handleMenuAnchorClick"
		>
			<KvMaterialIcon
				:icon="icon"
			/>
		</button>
		<div
			v-if="menuOpen"
			ref="optionsMenu"
			class="
				tw-absolute
				tw-rounded
				tw-border tw-border-tertiary
				tw-bg-white
				tw-z-1
				tw-shadow-lg
				vertical-menu"
			:class="[{
				'tw-right-0': menuPosition === 'right-aligned',
			}]"
			:style="`width: 236px; top: ${buttonSize === 'small' ? '2.5rem' : '3.5rem'};`"
		>
			<slot></slot>
		</div>
	</div>
</template>

<script>
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
			default: 'medium',
			validator(value) {
				return [
					'small', 'medium',
				].includes(value);
			},
		},
		iconType: {
			type: String,
			default: 'options',
			validator(value) {
				return [
					'options', 'edit',
				].includes(value);
			},
		},
		icon: {
			type: String,
			default: mdiDotsVertical,
		},
		menuPosition: {
			type: String,
			default: 'left-aligned',
			validator(value) {
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
			console.log('clicked outside', event.target, menuAnchor.value);
			const menuTrigger = document.querySelector('.menu-trigger');
			if (menuTrigger && !menuTrigger.contains(event.target)) {
				menuOpen.value = false;
			}
		};

		// eslint-disable-next-line no-unused-vars
		const handleMenuAnchorClick = (event) => {
			menuOpen.value = !menuOpen.value;
			emit('kv-utility-menu-clicked', { open: menuOpen.value });
			handleMenuClickOutside(event);
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

<style lang="postcss" scoped>
.small-menu-position {
	@apply tw-top-5;
}
.medium-menu-position {
	@apply tw-top-6.5;
}
</style>
