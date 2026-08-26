<template>
	<a
		:ref="refName"
		class="
			tw-py-1 tw-no-underline hover:tw-no-underline
			tw-text-primary hover:tw-text-action
			tw-items-center tw-cursor-pointer
		"
		:href="href"
		@pointerenter="handlePointerEnter"
		@touchstart.prevent="handleTouchStart"
	>
		<div
			class="tw-flex tw-items-center"
			:class="computedClass"
		>
			<slot></slot>
			<KvMaterialIcon
				class="tw-inline tw-w-3 tw-ml-0.5 tw-transition-transform tw-duration-300"
				:class="{'tw-rotate-180' : openMenuItem === menuComponent}"
				:icon="dropdownIcon"
			/>
		</div>
	</a>
</template>

<script lang="ts">
import { computed, getCurrentInstance } from 'vue';
import KvMaterialIcon from '../KvMaterialIcon.vue';

export default {
	components: { KvMaterialIcon },
	props: {
		refName: {
			type: String,
			default: '',
		},
		href: {
			type: String,
			default: undefined,
		},
		menuComponent: {
			type: Object,
			default: () => ({}),
		},
		openMenuItem: {
			type: Object,
			default: () => ({}),
		},
		dropdownIcon: {
			type: String,
			default: '',
		},
		baseClass: {
			type: String,
			default: '',
		},
		sendLinkPosition: {
			type: Boolean,
			default: false,
		},
	},
	emits: [
		'on-hover',
		'user-tap',
	],
	setup(props, { emit }) {
		const { proxy } = getCurrentInstance();

		const computedClass = computed(() => {
			return [
				props.baseClass,
				{ 'tw-text-tertiary': props.openMenuItem && props.openMenuItem !== props.menuComponent },
			];
		});

		const getLinkPosition = () => {
			if (!props.sendLinkPosition) return null;
			const linkEl = proxy.$refs[props.refName] as HTMLElement;
			if (!linkEl) return null;
			const linkRect = linkEl.getBoundingClientRect();
			const centerX = linkRect.left + linkRect.width / 2;
			return {
				left: `${centerX}px`,
				transform: 'translateX(-50%)',
				borderRadius: '0px 0px 8px 8px',
			};
		};

		const handleTouchStart = () => {
			const linkPos = getLinkPosition();
			emit('user-tap', props.refName, props.menuComponent, linkPos);
		};

		// Only a real mouse opens a dropdown on hover. Browsers fire a compatibility mouseenter after
		// a tap, but that is a plain MouseEvent, so it never reaches a pointerenter listener — a tap
		// that just closed a menu can't be reopened by the synthetic event trailing it. Filtering
		// here keeps the emitted `on-hover` contract unchanged for both header hosts.
		const handlePointerEnter = (event: PointerEvent) => {
			if (event.pointerType !== 'mouse') return;
			const linkPos = getLinkPosition();
			emit('on-hover', props.refName, props.menuComponent, linkPos);
		};

		return {
			computedClass,
			handlePointerEnter,
			handleTouchStart,
		};
	},
};
</script>
