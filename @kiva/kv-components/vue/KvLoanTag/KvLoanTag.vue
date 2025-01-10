<template>
	<div
		v-if="!!variation"
		class="tw-text-small tw-font-medium tw-pt-0.5 tw-line-clamp-1"
		:style="{ color: tagColor }"
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
import KvCountdownTimer from '../KvCountdownTimer';

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
		useExpandedStyles: {
			type: Boolean,
			default: false,
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
			if (this.loan?.matchingText) {
				return 'matched-loan';
			} if (this.isLseLoan) {
				return 'lse-loan';
			} if (differenceInDays(parseISO(this.loan?.plannedExpirationDate), Date.now()) <= 3) {
				return 'ending-soon';
			} if (this.amountLeft < 100 && this.amountLeft >= 0) {
				return 'almost-funded';
			}
			return null;
		},
		tagText() {
			switch (this.variation) {
				case 'lse-loan': return `${this.useExpandedStyles ? '⚡ ' : ''}High community impact`;
				case 'almost-funded': return `${this.useExpandedStyles ? '💸 ' : ''}Almost funded`;
				// eslint-disable-next-line max-len
				case 'matched-loan': return `${this.useExpandedStyles ? '🤝 ' : ''}${this.matchRatio + 1}x matching by ${this.loan?.matchingText}`;
				default: return `${this.useExpandedStyles ? '⏰ ' : ''}Ending soon: `;
			}
		},
		tagColor() {
			if (this.useExpandedStyles) {
				switch (this.variation) {
					case 'almost-funded': return '#AF741C';
					case 'ending-soon': return '#CE2626';
					default: return '#2B7C5F';
				}
			}
			return '#CE4A00';
		},
		matchRatio() {
			return this.loan?.matchRatio;
		},
	},
};
</script>
