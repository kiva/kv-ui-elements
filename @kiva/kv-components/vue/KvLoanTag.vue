<template>
	<div
		v-if="!!variation && timeLeft >= 0"
		class="tw-text-small tw-font-medium tw-pt-0.5 tw-line-clamp-1"
		style="color: #CE4A00;"
	>
		{{ tagText }}
		<span v-if="variation === 'ending-soon' && isMounted">
			{{ timeLeft.hours() }}h {{ timeLeft.minutes() }}m {{ timeLeft.seconds() }}s
		</span>
	</div>
</template>

<script>
import { differenceInDays, parseISO } from 'date-fns';
import numeral from 'numeral';
import moment from 'moment';

export default {
	name: 'KvLoanTag',
	props: {
		loan: {
			type: Object,
			required: true,
		},
		kvTrackFunction: {
			type: Function,
			required: true,
		},
	},
	data() {
		const msLeft = parseISO(this.loan?.plannedExpirationDate).getTime() - new Date().getTime();

		return {
			interval: null,
			isMounted: false,
			timeLeft: moment.duration(msLeft > 0 ? msLeft : 0, 'milliseconds'),
		};
	},
	computed: {
		amountLeft() {
			const loanFundraisingInfo = this.loan?.loanFundraisingInfo ?? { fundedAmount: 0, reservedAmount: 0 };
			const { fundedAmount, reservedAmount } = loanFundraisingInfo;
			return numeral(this.loan?.loanAmount).subtract(fundedAmount).subtract(reservedAmount).value();
		},
		variation() {
			if (differenceInDays(parseISO(this.loan?.plannedExpirationDate), Date.now()) <= 3) {
				return 'ending-soon';
			} if (this.amountLeft < 100 && this.amountLeft >= 0) {
				return 'almost-funded';
			} if (this.loan?.matchingText) {
				return 'matched-loan';
			}
			return null;
		},
		tagText() {
			switch (this.variation) {
				case 'almost-funded': return 'Almost funded';
				case 'matched-loan': return `${this.matchRatio + 1}x matching by ${this.loan?.matchingText}`;
				default: return 'Ending soon: ';
			}
		},
		matchRatio() {
			return this.loan?.matchRatio;
		},
	},
	mounted() {
		this.isMounted = true;

		const countdownInterval = 1000;

		this.interval = setInterval(() => {
			this.timeLeft = moment.duration(this.timeLeft - countdownInterval, 'milliseconds');

			if (this.timeLeft < 0) {
				clearInterval(this.interval);
			}
		}, countdownInterval);
	},
	onBeforeDestroy() {
		clearInterval(this.interval);
	},
	methods: {
		transform(props) {
			Object.entries(props).forEach(([key, value]) => {
				// Adds leading zero
				if (value < 10) {
					// eslint-disable-next-line no-param-reassign
					props[key] = `0${value}`;
				} else {
					// eslint-disable-next-line no-param-reassign
					props[key] = value;
				}
			});

			// Adds days to hours
			// eslint-disable-next-line radix, no-param-reassign
			props.hours = parseInt(props.hours) + parseInt(props.days) * 24;
			return props;
		},
	},
};
</script>
