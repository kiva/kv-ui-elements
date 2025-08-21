<template>
	<a
		:ref="refName"
		class="
			tw-px-1.5 tw-py-1 tw-mx-1
			tw-no-underline hover:tw-no-underline
			tw-text-primary hover:tw-text-action
			tw-items-center tw-rounded tw-cursor-pointer
		"
		:href="href"
		:class="computedClass"
		@mouseover="handleMouseOver"
		@mouseout="handleMouseOver"
	>
		<slot></slot>
		<KvMaterialIcon
			class="tw-inline tw-w-3 tw-ml-0.5 tw-transition-transform tw-duration-300"
			:class="{'tw-rotate-180' : openMenuItem === menuComponent}"
			:icon="dropdownIcon"
		/>
	</a>
</template>

<script>
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
	],
	setup(props, { emit }) {
		const { proxy } = getCurrentInstance();

		const computedClass = computed(() => {
			return [
				props.baseClass,
				{ 'tw-text-tertiary': props.openMenuItem && props.openMenuItem !== props.menuComponent },
			];
		});

		const handleMouseOver = () => {
			let linkPos = null;
			if (props.sendLinkPosition) {
				const linkEl = proxy.$refs[props.refName];
				if (linkEl) {
					const linkRect = linkEl.getBoundingClientRect();
					const centerX = linkRect?.left + linkRect?.width / 2;
					linkPos = {
						left: `${centerX}px`,
						transform: 'translateX(-50%)',
						borderRadius: '0px 0px 8px 8px',
					};
				}
			}

			emit('on-hover', props.refName, props.menuComponent, linkPos);
		};
		return {
			computedClass,
			handleMouseOver,
		};
	},
};
</script>
