<template>
	<div
		v-if="!!variation && timeLeftMs > 0"
		class="tw-text-small tw-font-medium tw-pt-0.5 tw-line-clamp-1"
		style="color: #CE4A00;"
	>
		{{ tagText }}
		<vue-countdown
			v-if="variation === 'ending-soon' && isMounted"
			:time="timeLeftMs"
			:emit-events="false"
			:transform="transform"
		>
			<template slot-scope="props">
				{{ props.hours }}h {{ props.minutes }}m {{ props.seconds }}s
			</template>
		</vue-countdown>
	</div>
</template>

<script>
import { differenceInDays, parseISO } from 'date-fns';
import VueCountdown from '@chenfengyuan/vue-countdown';
import numeral from 'numeral';

export default {
	name: 'KvLoanTag',
	components: {
		VueCountdown,
	},
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
		return {
			isMounted: false,
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
		timeLeftMs() {
			const msLeft = parseISO(this.loan?.plannedExpirationDate).getTime() - new Date().getTime();
			return msLeft > 0 ? msLeft : 0;
		},
		matchRatio() {
			return this.loan?.matchRatio;
		},
	},
	mounted() {
		this.isMounted = true;

		if (this.variation) {
			this.kvTrackFunction(
				'loan-card',
				'show',
				`tag-${this.variation}`,
			);
		}
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
