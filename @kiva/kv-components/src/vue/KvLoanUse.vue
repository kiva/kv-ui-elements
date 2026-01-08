<!-- eslint-disable vue/no-v-html -->
<template>
	<p
		class="tw-line-clamp-4 tw-cursor-pointer"
		v-html="loanUse"
	></p>
</template>

<script>
import gql from 'graphql-tag';
import numeral from 'numeral';

const DIRECT = 'direct';

export const KV_LOAN_USE_FRAGMENT = gql`
	fragment KvLoanUse on LoanBasic {
		id
		anonymizationLevel
		use
		loanAmount
		status
		borrowerCount
		name
		distributionModel
		whySpecial
	}
`;

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
		hideLoanAmount: {
			type: Boolean,
			default: false,
		},
		boldName: {
			type: Boolean,
			default: false,
		},
		country: {
			type: String,
			default: '',
		},
		useIndicativeHelpText: {
			type: Boolean,
			default: false,
		},
		showReadMore: {
			type: Boolean,
			default: false,
		},
		truncateWordsNumber: {
			type: Number,
			default: 0,
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
		nameSpan() {
			if (!this.boldName) {
				return `<span class="data-hj-suppress">${this.name}</span>`;
			}
			// boldName is true
			if (this.country) {
				return `<span class="data-hj-suppress tw-font-medium">${this.name} in ${this.country}</span>`;
			}
			// Bold name only
			return `<span class="data-hj-suppress tw-font-medium">${this.name}</span>`;
		},
		loanUse() {
			if (this.anonymizationLevel === 'full' || this.use.length === 0) {
				return 'For the borrower\'s privacy, this loan has been made anonymous.';
			}

			if (this.hideLoanAmount) {
				const helpVerb = this.useIndicativeHelpText ? this.helpLanguage : 'Help';
				const capitalizedHelpVerb = helpVerb.charAt(0).toUpperCase() + helpVerb.slice(1);
				let useString = `${capitalizedHelpVerb} ${this.nameSpan} `
					+ `${this.use.charAt(0).toLowerCase() + this.use.slice(1)} `
				+ `${this.whySpecialSentence}`;

				if (this.showReadMore) {
					const truncatedUse = this.truncateByWords(useString);
					useString = `${truncatedUse} `
					+ '<span class=" tw-text-action tw-underline">read more</span>';
				}

				return useString;
			}

			const isGroup = this.borrowerCount > 1;

			let useString = `${numeral(this.loanAmount).format('$0,0')} `
				+ `${this.isDirect ? 'to' : this.helpLanguage} `
				+ `${isGroup ? 'a member of ' : ''}`
				+ `${this.nameSpan} `
				+ `${this.isDirect ? `${this.helpLanguage} ` : ''}`
				+ `${this.use.charAt(0).toLowerCase() + this.use.slice(1)}`
				+ `${this.whySpecialSentence}`;

			if (this.showReadMore) {
				const truncatedUse = this.truncateByWords(useString);
				useString = `${truncatedUse} `
					+ '<span class=" tw-text-action tw-underline">read more</span>';
			}

			return useString;
		},
	},
	methods: {
		truncateByWords(str) {
			if (!str || this.truncateWordsNumber <= 0) return '';
			const words = str.trim().split(' ');
			const truncatedWords = words.slice(0, this.truncateWordsNumber);
			let result = truncatedWords.join(' ');

			if (words.length > this.truncateWordsNumber) {
				result += '...';
			}

			return result;
		},
	},
};
</script>
