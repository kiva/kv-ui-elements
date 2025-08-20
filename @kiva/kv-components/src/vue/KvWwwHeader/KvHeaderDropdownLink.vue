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
		:style="style"
		@mouseover="onHover(refName, menuComponent)"
		@mouseout="onHover()"
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
import { computed } from 'vue';
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
		onHover: {
			type: Function,
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
	},
	setup(props) {
		const computedClass = computed(() => {
			return [
				props.baseClass,
				{ 'tw-text-tertiary': props.openMenuItem && props.openMenuItem !== props.menuComponent },
			];
		});

		return {
			computedClass,
		};
	},
};
</script>
