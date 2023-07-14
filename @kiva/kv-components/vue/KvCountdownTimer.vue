<template>
	<span v-if="timeLeft">
		{{ timeLeft.hours() }}h {{ timeLeft.minutes() }}m {{ timeLeft.seconds() }}s
	</span>
</template>

<script>
import {
	ref,
	toRefs,
	onBeforeUnmount,
	onMounted,
} from 'vue-demi';
import moment from 'moment';

export default {
	props: {
		msLeft: {
			type: Number,
			required: true,
		},
	},
	setup(props) {
		const { msLeft } = toRefs(props);

		const interval = ref(null);
		const timeLeft = ref(null);

		onMounted(() => {
			timeLeft.value = moment.duration(msLeft.value > 0 ? msLeft.value : 0, 'milliseconds');

			const countdownInterval = 1000;

			interval.value = setInterval(() => {
				timeLeft.value = moment.duration(timeLeft.value - countdownInterval, 'milliseconds');

				if (timeLeft.value <= 0) {
					clearInterval(interval.value);
				}
			}, countdownInterval);
		});

		onBeforeUnmount(() => {
			clearInterval(interval.value);
		});

		return { timeLeft };
	},
};
</script>
