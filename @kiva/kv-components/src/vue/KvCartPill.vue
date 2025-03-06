<template>
	<div
		class="tw-w-max tw-flex tw-items-center tw-gap-1 tw-px-1 tw-py-0.5 tw-rounded"
		:class="{
			'tw-text-small tw-bg-secondary': showBg,
		}"
	>
		<slot name="icon"></slot>
		<p class="tw-text-wrap">
			{{ pillCopy }}
		</p>
	</div>
</template>

<script>

import {
	toRefs,
	computed,
} from 'vue';

export default {
	props: {
		borrowerName: {
			type: String,
			default: '',
		},
		showBg: {
			type: Boolean,
			default: false,
		},
	},
	setup(props) {
		const {
			borrowerName,
		} = toRefs(props);

		const pillCopy = computed(() => {
			return borrowerName.value
				? `Supporting ${borrowerName.value} will hit your next milestone!`
				: 'Supporting this loan achieves a milestone!';
		});

		return {
			pillCopy,
		};
	},
};
</script>
