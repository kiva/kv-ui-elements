<template>
	<figure>
		<h4
			class="tw-lowercase tw-mb-0.5"
			:class="{ 'progress-group-amount-low': amountLow, '!tw-text-secondary': introductionCard }"
		>
			{{ fundingText }}
		</h4>
		<kv-progress-bar
			aria-label="Percent the loan has funded"
			:value="progressPercent * 100"
		/>
	</figure>
</template>

<script>
import numeral from 'numeral';
import KvProgressBar from './KvProgressBar.vue';

export default {
	name: 'KvLoanProgressGroup',
	components: {
		KvProgressBar,
	},
	props: {
		moneyLeft: {
			type: String,
			default: '0.00',
		},
		progressPercent: {
			type: Number,
			default: 0,
		},
		introductionCard: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		numeralLeft() {
			return numeral(this.moneyLeft);
		},
		amountLow() {
			return this.numeralLeft.value() < 100;
		},
		fundingText() {
			if (!this.numeralLeft.value()) return 'funded!';
			const formattedMoneyLeft = this.numeralLeft.format('$0,0[.]00');
			const exclamationMark = this.amountLow ? '!' : '';
			return `${formattedMoneyLeft} to go${exclamationMark}`;
		},
	},
};
</script>

<style scoped>
.progress-group-amount-low {
	color: #CE4A00;
}
</style>
