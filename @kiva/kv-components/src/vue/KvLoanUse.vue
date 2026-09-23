<!-- eslint-disable vue/no-v-html -->
<template>
	<p
		class="kv-loan-use tw-line-clamp-4"
		:style="{ '--kv-loan-use-lines': maxLines }"
		v-html="loanUse"
	></p>
</template>

<script lang="ts">
import gql from 'graphql-tag';
import numeral from 'numeral';
import { truncateStringByWords } from '../utils/loanUtils';

const DIRECT = 'direct';
const READ_MORE_CLASS = 'kv-loan-use-read-more';
const ELLIPSIS = '\u2026';

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);
const lowerFirst = (value: string) => value.charAt(0).toLowerCase() + value.slice(1);

const overflows = (statement: HTMLElement) => statement.scrollHeight > statement.clientHeight + 1;

// The last run of text before the "read more" span: the tail of the use statement.
const findStatementTail = (statement: HTMLElement) => {
	const readMore = statement.querySelector(`.${READ_MORE_CLASS}`);
	let node = readMore ? readMore.previousSibling : statement.lastChild;
	while (node && !(node.nodeType === Node.TEXT_NODE && node.textContent?.trim())) {
		node = node.previousSibling;
	}
	return node;
};

// Drops words from the end of the statement until "… read more" fits inside the clamp.
// The full text is known to overflow when this is called.
const trimStatementToFit = (statement: HTMLElement) => {
	const tail = findStatementTail(statement);
	if (!tail) return;
	const text = tail.textContent ?? '';
	// The tail usually starts right after the name span; keep that space or "Pakistanbuy" appears.
	const leadingSpace = /^\s/.test(text) ? ' ' : '';
	const words = text.trim().split(/\s+/);
	const applyWordCount = (count: number) => {
		// Drop punctuation the ellipsis would otherwise follow ("thread,…"), keep a space before "read more".
		const kept = words.slice(0, count).join(' ').replace(/[,;:]$/, '');
		tail.textContent = `${leadingSpace}${kept}${ELLIPSIS} `;
	};
	let low = 1;
	let high = words.length - 1;
	let best = 1;
	while (low <= high) {
		const mid = Math.floor((low + high) / 2);
		applyWordCount(mid);
		if (overflows(statement)) {
			high = mid - 1;
		} else {
			best = mid;
			low = mid + 1;
		}
	}
	applyWordCount(best);
};

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
		 * Number of lines the statement is clamped to. With `showReadMore`, the statement is trimmed
		 * word by word after render so "… read more" always ends the last visible line.
		 */
		maxLines: {
			type: Number,
			default: 4,
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
		loanUse() {
			// Vue has just replaced the paragraph's markup with the full statement; fit it again.
			this.$nextTick(this.fitReadMore);
		},
	},
	mounted() {
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
			// hideBorrowerDetails never renders the link, so there is nothing to fit.
			if (!this.showReadMore || this.hideBorrowerDetails) return;
			const statement = this.$el as HTMLElement;
			// Hidden at the current breakpoint: nothing to measure until it is shown again.
			if (!statement || statement.clientHeight === 0) return;
			// Start from the full statement so a paragraph that gained room shows more of it again.
			statement.innerHTML = this.loanUse;
			if (overflows(statement)) {
				trimStatementToFit(statement);
			}
		},
	},
};
</script>

<style lang="postcss" scoped>
/* tw-line-clamp-4 supplies the box setup; the line count itself follows the prop. Consumers that
   force a count with an !important utility or a more specific ancestor rule keep winning. */
.kv-loan-use {
	-webkit-line-clamp: var(--kv-loan-use-lines);
	line-clamp: var(--kv-loan-use-lines);
}
</style>
