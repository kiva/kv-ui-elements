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
		customMessage: {
			type: String,
			default: '',
		},
	},
	setup(props) {
		const {
			borrowerName,
			milestonesNumber,
			isCloseNextMilestone,
		} = toRefs(props);

		const pillCopy = computed(() => {
			if (props.customMessage) {
				return props.customMessage;
			}

			if (isCloseNextMilestone.value) {
				return 'You’re close to your next achievement!';
			}

			const milestonesCopy = milestonesNumber.value > 1
				? `${milestonesNumber.value} achievements`
				: 'your next achievement';

			return borrowerName.value
				? `Supporting ${borrowerName.value} will reach ${milestonesCopy}!`
				: 'Supporting this loan reaches an achievement!';
		});

		return {
			pillCopy,
		};
	},
};
</script>
