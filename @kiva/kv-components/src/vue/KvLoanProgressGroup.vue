<template>
	<figure>
		<div :class="{'tw-flex tw-justify-between': amountGoal}">
			<h4
				class="tw-lowercase tw-mb-0.5"
				:class="{ 'progress-group-amount-low': amountLow}"
			>
				{{ fundingText }}
			</h4>
			<h4
				v-if="amountGoal"
				class="tw-lowercase tw-mb-0.5"
			>
				{{ goalText }}
			</h4>
		</div>
		<kv-progress-bar
			aria-label="Percent the loan has funded"
			:value="progressPercent * 100"
		/>
	</figure>
</template>

<script lang="ts">
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
		amountGoal: {
			type: String,
			default: '',
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
		numeralGoal() {
			return numeral(this.amountGoal);
		},
		goalText() {
			if (!this.numeralGoal.value()) return '';
			const formattedGoal = this.numeralGoal.format('$0,0[.]00');
			return `${formattedGoal} goal`;
		},
	},
};
</script>

<style lang="postcss" scoped>
.progress-group-amount-low {
	color: #CE4A00;
}
</style>
