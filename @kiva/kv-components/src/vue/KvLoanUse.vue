<!-- eslint-disable vue/no-v-html -->
<template>
	<p
		class="tw-line-clamp-4"
		:class="{ 'kv-loan-use-lines': hasMaxLines }"
		:style="hasMaxLines ? { '--kv-loan-use-lines': maxLines } : undefined"
		v-html="loanUse"
	></p>
</template>

<script lang="ts">
import gql from 'graphql-tag';
import numeral from 'numeral';
import { truncateStringByWords } from '../utils/loanUtils';
import { READ_MORE_CLASS, fitStatement } from '../utils/loanUseFit';

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
		/**
		 * Opt-in line cap. Unset, the statement keeps the plain 4-line CSS clamp and none of the fit
		 * logic runs. Set, the clamp follows this number and, with `showReadMore`, a statement that runs
		 * past the cap is trimmed word by word after render so "… read more" ends the last visible line;
		 * one that fills the cap on its own is shown whole without the link.
		 */
		maxLines: {
			type: Number,
			default: null,
			validator: (value: number | null) => value === null || value > 0, // 0 would hide the whole statement
		},
	},
	computed: {
		hasMaxLines() {
			return this.maxLines !== null;
		},
		// The fit only applies to an opted-in cap with a link to fit; hideBorrowerDetails never renders one.
		fitsReadMore() {
			return this.hasMaxLines && this.showReadMore && !this.hideBorrowerDetails;
		},
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
					+ `<span class="${READ_MORE_CLASS} tw-text-action tw-underline">read more</span>`;
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
					+ `<span class="${READ_MORE_CLASS} tw-text-action tw-underline">read more</span>`;
			}

			return useString;
		},
	},
	watch: {
		loanUse: {
			// Runs after Vue has written the full statement to the DOM but within the same flush, so the
			// fitted text is in place before the browser paints.
			handler() {
				this.fitReadMore();
			},
			flush: 'post',
		},
	},
	mounted() {
		if (!this.fitsReadMore) return;
		if (typeof ResizeObserver === 'undefined') {
			this.fitReadMore();
			return;
		}
		// ResizeObserver reports the initial size on observe, so the first fit runs from there.
		this.resizeObserver = new ResizeObserver(() => this.fitReadMore());
		this.resizeObserver.observe(this.$el);
	},
	beforeUnmount() {
		this.resizeObserver?.disconnect();
	},
	methods: {
		fitReadMore() {
			if (!this.fitsReadMore) return;
			const statement = this.$el as HTMLElement;
			// Hidden at the current breakpoint: nothing to measure until it is shown again.
			if (!statement || statement.clientHeight === 0) return;
			// Starts from the full statement so a paragraph that gained room shows more of it again.
			fitStatement(statement, this.loanUse);
		},
	},
};
</script>

<style lang="postcss" scoped>
/* Only present when maxLines is set: tw-line-clamp-4 supplies the box setup and the line count follows
   the prop. Consumers that force a count with an !important utility or a more specific ancestor rule
   keep winning. */
.kv-loan-use-lines {
	-webkit-line-clamp: var(--kv-loan-use-lines);
	line-clamp: var(--kv-loan-use-lines);
}
</style>
