<template>
	<span v-if="timeLeft">
		{{ remainingHours }}h {{ timeLeft.minutes }}m {{ timeLeft.seconds }}s
	</span>
</template>

<script lang="ts">
import {
	ref,
	toRefs,
	onBeforeUnmount,
	onMounted,
} from 'vue';
import { differenceInHours, intervalToDuration, isBefore } from 'date-fns';

export default {
	props: {
		deadline: {
			type: Date,
			required: true,
		},
	},
	setup(props) {
		const { deadline } = toRefs(props);

		const interval = ref(null);
		const timeLeft = ref(null);
		const remainingHours = ref(null);

		const setTimeLeft = () => {
			const now = new Date();
			if (isBefore(now, deadline.value)) {
				timeLeft.value = intervalToDuration({ start: now, end: deadline.value });
				remainingHours.value = differenceInHours(deadline.value, now);
			} else {
				timeLeft.value = { minutes: 0, seconds: 0 };
				remainingHours.value = 0;
			}
		};

		onMounted(() => {
			setTimeLeft();

			interval.value = setInterval(() => {
				setTimeLeft();
				if (!timeLeft.value) {
					clearInterval(interval.value);
				}
			}, 1000);
		});

		onBeforeUnmount(() => {
			if (interval.value) {
				clearInterval(interval.value);
			}
		});

		return { timeLeft, remainingHours };
	},
};
</script>
