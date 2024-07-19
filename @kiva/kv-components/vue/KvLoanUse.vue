<!-- eslint-disable vue/no-v-html -->
<template>
	<p
		class="tw-line-clamp-4"
		v-html="loanUse"
	></p>
</template>

<script>
import numeral from 'numeral';

const DIRECT = 'direct';

export default {
	name: 'KvLoanUse',
	props: {
		anonymizationLevel: {
			type: String,
			default: 'none',
		},
		use: {
			type: String,
			default: '',
		},
		loanAmount: {
			type: String,
			default: '',
		},
		status: {
			type: String,
			default: '',
		},
		borrowerCount: {
			type: Number,
			default: 1,
		},
		name: {
			type: String,
			default: '',
		},
		distributionModel: {
			type: String,
			default: DIRECT,
		},
		whySpecial: {
			type: String,
			default: '',
		},
		avoidLoanAmount: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		helpLanguage() {
			if (this.status === 'fundraising' || this.status === 'inactive' || this.status === 'reviewed') {
				return 'helps';
			}
			return 'helped';
		},
		isDirect() {
			return this.distributionModel === DIRECT;
		},
		whySpecialSentence() {
			return this.whySpecial
				? ` This loan is special because ${this.whySpecial.charAt(0).toLowerCase() + this.whySpecial.slice(1)}`
				: '';
		},
		loanUse() {
			if (this.anonymizationLevel === 'full' || this.use.length === 0) {
				return 'For the borrower\'s privacy, this loan has been made anonymous.';
			}

			if (this.avoidLoanAmount) {
				return `Help <span class="data-hj-suppress">${this.name}</span> `
					+ `${this.use.charAt(0).toLowerCase() + this.use.slice(1)} `
				+ `${this.whySpecialSentence}`;
			}

			const isGroup = this.borrowerCount > 1;

			return `${numeral(this.loanAmount).format('$0,0')} `
				+ `${this.isDirect ? 'to' : this.helpLanguage} `
				+ `${isGroup ? 'a member of ' : ''}`
				+ `<span class="data-hj-suppress">${this.name}</span> `
				+ `${this.isDirect ? `${this.helpLanguage} ` : ''}`
				+ `${this.use.charAt(0).toLowerCase() + this.use.slice(1)}`
				+ `${this.whySpecialSentence}`;
		},
	},
};
</script>
