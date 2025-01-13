<template>
	<kv-button @click="addToBasket">
		{{ buttonText }}
	</kv-button>
</template>

<script>
import KvButton from '#components/KvButton';

export default {
	name: 'KvLendAmountButton',
	components: {
		KvButton,
	},
	props: {
		loanId: {
			type: Number,
			default: null,
		},
		showNow: {
			type: Boolean,
			default: false,
		},
		amountLeft: {
			type: [Number, String],
			default: 20,
		},
		completeLoan: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		amountValue() {
			return parseFloat(this.amountLeft).toFixed();
		},
		buttonText() {
			let str = '';

			if (this.completeLoan) {
				str = `Complete loan for $${this.amountValue}`;
			} else {
				str = `Lend $${this.amountValue}`;
				if (this.showNow) {
					str += ' now';
				}
			}

			return str;
		},
	},
	methods: {
		addToBasket(event) {
			this.$kvTrackEvent(
				'Lending',
				'Add to basket (Partial Share)',
				'lend-button-click',
				this.loanId,
				this.amountLeft,
			);
			this.$emit('add-to-basket', event);
		},
	},
};
</script>
