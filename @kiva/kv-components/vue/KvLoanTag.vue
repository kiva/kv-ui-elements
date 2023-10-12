<template>
	<div
		v-if="!!variation"
		class="tw-text-small tw-font-medium tw-pt-0.5 tw-line-clamp-1"
		style="color: #CE4A00;"
	>
		{{ tagText }}
		<kv-countdown-timer
			v-if="variation === 'ending-soon'"
			:ms-left="msLeft"
		/>
	</div>
</template>

<script>
import { differenceInDays, parseISO } from 'date-fns';
import numeral from 'numeral';
import KvCountdownTimer from './KvCountdownTimer.vue';

const LSE_LOAN_KEY = 'N/A';

export default {
	name: 'KvLoanTag',
	components: {
		KvCountdownTimer,
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
			interval: null,
			msLeft: parseISO(this.loan?.plannedExpirationDate).getTime() - new Date().getTime(),
		};
	},
	computed: {
		isLseLoan() {
			return this.loan?.partnerName?.toUpperCase().includes(LSE_LOAN_KEY) ?? false;
		},
		amountLeft() {
			const loanFundraisingInfo = this.loan?.loanFundraisingInfo ?? { fundedAmount: 0, reservedAmount: 0 };
			const { fundedAmount, reservedAmount } = loanFundraisingInfo;
			return numeral(this.loan?.loanAmount).subtract(fundedAmount).subtract(reservedAmount).value();
		},
		variation() {
			if (this.isLseLoan) {
				return 'lse-loan';
			} if (differenceInDays(parseISO(this.loan?.plannedExpirationDate), Date.now()) <= 3) {
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
				case 'lse-loan': return 'High community impact';
				case 'almost-funded': return 'Almost funded';
				case 'matched-loan': return `${this.matchRatio + 1}x matching by ${this.loan?.matchingText}`;
				default: return 'Ending soon: ';
			}
		},
		matchRatio() {
			return this.loan?.matchRatio;
		},
	},
};
</script>
