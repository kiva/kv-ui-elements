<template>
	<span v-if="timeLeft">
		{{ remainingHours }}h {{ timeLeft.minutes() }}m {{ timeLeft.seconds() }}s
	</span>
</template>

<script>
import {
	ref,
	toRefs,
	onBeforeUnmount,
	onMounted,
	computed,
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

		const remainingHours = computed(() => {
			return Math.floor(timeLeft.value.asHours());
		});

		onMounted(() => {
			timeLeft.value = moment.duration(msLeft.value > 0 ? msLeft.value : 0, 'milliseconds');

			if (timeLeft.value > 0) {
				const countdownInterval = 1000;

				interval.value = setInterval(() => {
					timeLeft.value = moment.duration(timeLeft.value - countdownInterval, 'milliseconds');

					if (timeLeft.value <= 0) {
						clearInterval(interval.value);
					}
				}, countdownInterval);
			}
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
