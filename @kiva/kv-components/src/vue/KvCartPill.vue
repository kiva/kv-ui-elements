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
		milestonesNumber: {
			type: Number,
			default: 1,
		},
		isCloseNextMilestone: {
			type: Boolean,
			default: false,
		},
	},
	setup(props) {
		const {
			borrowerName,
			milestonesNumber,
			isCloseNextMilestone,
		} = toRefs(props);

		const pillCopy = computed(() => {
			if (isCloseNextMilestone.value) {
				return 'You’re close to your next milestone!';
			}

			const milestonesCopy = milestonesNumber.value > 1
				? `${milestonesNumber.value} of your milestones`
				: 'your next milestone';

			return borrowerName.value
				? `Supporting ${borrowerName.value} will hit ${milestonesCopy}!`
				: 'Supporting this loan achieves a milestone!';
		});

		return {
			pillCopy,
		};
	},
};
</script>
