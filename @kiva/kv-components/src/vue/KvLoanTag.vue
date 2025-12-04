<template>
	<div
		v-if="!!variation"
		class="tw-text-small tw-font-medium tw-pt-0.5 tw-line-clamp-1"
		:style="{ color: tagColor }"
	>
		{{ tagText }}
		<kv-countdown-timer
			v-if="variation === 'ending-soon'"
			:deadline="deadline"
		/>
	</div>
</template>

<script lang="ts">
import { differenceInDays, parseISO } from 'date-fns';
import gql from 'graphql-tag';
import numeral from 'numeral';
import KvCountdownTimer from './KvCountdownTimer.vue';

const LSE_LOAN_KEY = 'N/A';

const VARIATION = {
	almostFunded: 'almost-funded',
	endingSoon: 'ending-soon',
	matchedLoan: 'matched-loan',
	lseLoan: 'lse-loan',
};

export const KV_LOAN_TAG_FRAGMENT = gql`
	fragment KvLoanTag on LoanBasic {
		id
		loanFundraisingInfo {
			id
			fundedAmount
			reservedAmount
		}
		loanAmount
		matchRatio
		matchingText
		plannedExpirationDate
		... on LoanPartner {
			partnerName
		}
	}
`;

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
	computed: {
		deadline() {
			return parseISO(this.loan?.plannedExpirationDate);
		},
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
				return VARIATION.matchedLoan;
			} if (this.isLseLoan) {
				return VARIATION.lseLoan;
			} if (differenceInDays(parseISO(this.loan?.plannedExpirationDate), Date.now()) <= 3) {
				return VARIATION.endingSoon;
			} if (this.amountLeft < 100 && this.amountLeft >= 0) {
				return VARIATION.almostFunded;
			}
			return null;
		},
		tagText() {
			switch (this.variation) {
				case VARIATION.lseLoan: return `${this.useExpandedStyles ? '⚡ ' : ''}High community impact`;
				case VARIATION.almostFunded: return `${this.useExpandedStyles ? '💸 ' : ''}Almost funded`;
				// eslint-disable-next-line max-len
				case VARIATION.matchedLoan: return `${this.useExpandedStyles ? '🤝 ' : ''}${this.matchRatio + 1}x matching by ${this.loan?.matchingText}`;
				default: return `${this.useExpandedStyles ? '⏰ ' : ''}Ending soon: `;
			}
		},
		tagColor() {
			if (this.useExpandedStyles) {
				switch (this.variation) {
					case VARIATION.almostFunded: return '#AF741C';
					case VARIATION.endingSoon: return '#CE2626';
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
