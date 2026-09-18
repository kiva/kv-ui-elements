<!-- eslint-disable vue/no-v-html -->
<template>
	<p
		class="tw-line-clamp-4"
		v-html="loanUse"
	></p>
</template>

<script lang="ts">
import gql from 'graphql-tag';
import numeral from 'numeral';
import { truncateStringByWords } from '../utils/loanUtils';

const DIRECT = 'direct';

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);
const lowerFirst = (value: string) => value.charAt(0).toLowerCase() + value.slice(1);

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
		// Unlike hideLoanAmount, this drops the name and country too and never shows a read-more link.
		hideBorrowerDetails: {
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
				? ` This loan is special because ${lowerFirst(this.whySpecial)}`
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

			if (this.hideBorrowerDetails) {
				return `${capitalize(this.helpLanguage)} ${lowerFirst(this.use)}${this.whySpecialSentence}`;
			}

			if (this.hideLoanAmount) {
				const helpVerb = this.useIndicativeHelpText ? this.helpLanguage : 'Help';
				let useString = `${capitalize(helpVerb)} ${this.nameSpan} `
					+ `${lowerFirst(this.use)} `
				+ `${this.whySpecialSentence}`;

				if (this.showReadMore) {
					const truncatedUse = truncateStringByWords(useString, this.truncateWordsNumber);
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
				+ `${lowerFirst(this.use)}`
				+ `${this.whySpecialSentence}`;

			if (this.showReadMore) {
				const truncatedUse = truncateStringByWords(useString, this.truncateWordsNumber);
				useString = `${truncatedUse} `
					+ '<span class=" tw-text-action tw-underline">read more</span>';
			}

			return useString;
		},
	},
};
</script>
