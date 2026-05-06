<template>
	<article
		class="tw-flex tw-flex-col tw-bg-white tw-rounded-md tw-shadow-lg tw-w-full
			tw-p-1.5"
		:class="{
			'tw-pointer-events-none': isLoading,
		}"
		data-testid="loan-use-card"
		:aria-busy="isLoading ? 'true' : 'false'"
	>
		<div class="tw-flex tw-items-start tw-gap-1.5 md:tw-gap-2.5">
			<kv-loading-placeholder
				v-if="isLoading"
				class="!tw-w-7.5 !tw-h-7.5 md:!tw-w-12.5 md:!tw-h-12.5 tw-rounded-sm tw-flex-shrink-0"
			/>
			<component
				:is="linkTag"
				v-else
				v-bind="loanLinkAttrs"
				class="tw-flex tw-flex-shrink-0 tw-w-7.5 md:tw-w-12.5"
				aria-label="Borrower image"
				@click="clickReadMore('Photo', $event)"
			>
				<kv-borrower-image
					class="tw-bg-gray-300 tw-rounded-sm tw-object-cover tw-bg-clip-content
						tw-w-7.5 tw-h-7.5 md:tw-w-12.5 md:tw-h-12.5"
					:alt="`Photo of ${borrowerName}`"
					:aspect-ratio="1"
					:default-image="{ width: 200, faceZoom: 50 }"
					:hash="imageHash"
					:images="[{ width: 200, faceZoom: 50 }]"
					:photo-path="photoPath"
				/>
			</component>

			<div class="tw-flex tw-flex-col tw-min-w-0 tw-flex-1">
				<template v-if="isLoading">
					<kv-loading-placeholder
						v-for="row in 3"
						:key="row"
						class="tw-mb-0.5 md:!tw-mb-1.5 !tw-w-full !tw-h-2 md:!tw-h-3"
					/>
				</template>
				<div
					v-else
					class="tw-text-primary"
				>
					<component
						:is="linkTag"
						v-bind="loanLinkAttrs"
						class="tw-no-underline hover:tw-no-underline focus:tw-no-underline"
						aria-label="Loan tag"
						@click="clickReadMore('Tag', $event)"
					>
						<kv-loan-tag
							v-if="showTags && !isLoading"
							class="tw-mb-1 !tw-font-medium"
							:loan="loan"
						/>
					</component>
					<p
						class="tw-text-small tw-mb-0 tw-leading-normal"
						style="line-height: 150%;"
						:title="statementTitle"
						data-testid="loan-use-statement"
					>
						<span>{{ loanUsePrefixStart }}</span>
						<span class="tw-font-medium">{{ borrowerNameWithCountry }}</span>
						<span>{{ loanUsePrefixEnd }}</span>
						<span>{{ visibleUseStatement }}</span>
					</p>
				</div>
			</div>
		</div>

		<div
			v-if="isLoading || typeof loanCallouts === 'undefined'"
			class="tw-flex tw-gap-1.5 tw-mt-1.5"
		>
			<kv-loading-placeholder
				v-for="placeholder in 2"
				:key="placeholder"
				class="tw-mt-2 tw-rounded-full"
				:style="{ width: '20%', height: '1.5rem' }"
			/>
		</div>
		<kv-loan-callouts
			v-else-if="loanCallouts.length"
			:callouts="loanCallouts"
			class="tw-mt-1.5 loan-callouts"
			@click="$emit('jump-filter-page', $event)"
		/>

		<div class="tw-flex tw-items-end tw-justify-between tw-gap-2 tw-mt-1">
			<div
				class="tw-flex-1 tw-min-w-0"
				style="max-width: 6.5rem;"
			>
				<template v-if="!hasProgressData">
					<kv-loading-placeholder
						class="tw-mb-0.5"
						:style="{ width: '70%', maxWidth: '11rem', height: '1.25rem' }"
					/>
					<kv-loading-placeholder
						class="tw-rounded"
						:style="{ width: '70%', maxWidth: '11rem', height: '0.5rem' }"
					/>
				</template>
				<kv-loan-progress-group
					v-else
					:money-left="unreservedAmount"
					:progress-percent="fundraisingPercent"
					class="tw-text-black"
				/>
			</div>
			<kv-loading-placeholder
				v-if="!allDataLoaded"
				class="tw-rounded tw-flex-shrink-0"
				:style="{ width: '8rem', height: '2.5rem' }"
			/>
			<div
				v-else
				class="tw-min-w-12"
			>
				<kv-select
					:id="`LoanUseCardAmountDropdown_${loan?.id ?? loanId}`"
					v-model="selectedAmount"
					aria-label="Lend amount"
					:disabled="!amountOptions.length"
					class="amount-dropdown"
					@update:modelValue="handleSelectedAmount"
				>
					<option
						v-for="amount in amountOptions"
						:key="amount"
						:value="amount"
					>
						${{ amount }}
					</option>
				</kv-select>
			</div>
		</div>
	</article>
</template>

<script lang="ts">
import numeral from 'numeral';
import {
	computed,
	ref,
	watch,
	type PropType,
} from 'vue';
import {
	loanCardComputedProperties,
	loanCardMethods,
} from '../utils/loanCard';
import {
	getDropdownPriceArray,
	getLendCtaSelectedOption,
	type GetCookieFn,
	type SetCookieFn,
} from '../utils/loanUtils';
import KvBorrowerImage from './KvBorrowerImage.vue';
import KvLoanCallouts from './KvLoanCallouts.vue';
import KvLoanProgressGroup from './KvLoanProgressGroup.vue';
import KvLoanTag from './KvLoanTag.vue';
import KvLoadingPlaceholder from './KvLoadingPlaceholder.vue';
import KvSelect from './KvSelect.vue';

const MAX_USE_STATEMENT_LENGTH = 200;
const ELLIPSIS = '...';

const normalizeUse = (use: string) => {
	if (!use.length) return '';
	return use.charAt(0).toLowerCase() + use.slice(1);
};

const truncateText = (value: string, maxLength: number) => {
	if (maxLength <= 0) return '';
	if (value.length <= maxLength) return value;
	if (maxLength <= ELLIPSIS.length) return ELLIPSIS.slice(0, maxLength);
	return `${value.slice(0, maxLength - ELLIPSIS.length).trimEnd()}${ELLIPSIS}`;
};

export default {
	name: 'KvLoanUseCard',
	components: {
		KvBorrowerImage,
		KvLoanCallouts,
		KvLoanProgressGroup,
		KvLoanTag,
		KvLoadingPlaceholder,
		KvSelect,
	},
	props: {
		/**
		 * Loan data used to render borrower, image, use statement, callouts, and progress.
		 */
		loan: {
			type: Object,
			default: undefined,
		},
		/**
		 * Required by the shared loan-card helpers for loading state, links, callout ordering, and tracking.
		 */
		loanId: {
			type: Number,
			default: undefined,
		},
		/**
		 * Base path used by KvBorrowerImage to resolve loan images.
		 */
		photoPath: {
			type: String,
			required: true,
		},
		/**
		 * Show the standard loan callout pills below the use statement.
		 */
		showCallouts: {
			type: Boolean,
			default: true,
		},
		/**
		 * Show the loan tag.
		 */
		showTags: {
			type: Boolean,
			default: true,
		},
		/**
		 * Current category page, used by shared callout logic to avoid duplicate labels.
		 */
		categoryPageName: {
			type: String,
			default: '',
		},
		/**
		 * Extra callout labels appended by the shared loan-card helper.
		 */
		customCallouts: {
			type: Array as PropType<string[]>,
			default: () => [],
		},
		/**
		 * Prevent default navigation and emit show-loan-details when borrower links are clicked.
		 */
		customLoanDetails: {
			type: Boolean,
			default: false,
		},
		/**
		 * Override the default /lend/:loanId borrower link when rendering external links.
		 */
		customHref: {
			type: String,
			default: '',
		},
		/**
		 * Render borrower links as anchors instead of router links.
		 */
		externalLinks: {
			type: Boolean,
			default: false,
		},
		/**
		 * Open external borrower links in a new tab.
		 */
		externalLinksNewTab: {
			type: Boolean,
			default: false,
		},
		/**
		 * Analytics callback used by the shared loan-card helper and amount dropdown.
		 */
		kvTrackFunction: {
			type: Function,
			default: () => {},
		},
		/**
		 * Include $5 note options when supported by the current lending context.
		 */
		enableFiveDollarsNotes: {
			type: Boolean,
			default: false,
		},
		/**
		 * Visitor state used to determine available lend amount options.
		 */
		isVisitor: {
			type: Boolean,
			default: true,
		},
		/**
		 * Current route data used to seed the default lend amount.
		 */
		route: {
			type: Object,
			default: undefined,
		},
		/**
		 * User balance used to choose the default lend amount when available.
		 */
		userBalance: {
			type: String,
			default: undefined,
		},
		/**
		 * Cookie getter used by lend amount selection utilities.
		 */
		getCookie: {
			type: Function as PropType<GetCookieFn>,
			default: undefined,
		},
		/**
		 * Cookie setter used by lend amount selection utilities.
		 */
		setCookie: {
			type: Function as PropType<SetCookieFn>,
			default: undefined,
		},
		/**
		 * Prefer a $5 lend amount when the current lending context allows it.
		 */
		fiveDollarsSelected: {
			type: Boolean,
			default: false,
		},
	},
	emits: [
		'jump-filter-page',
		'show-loan-details',
		'update:selected-amount',
	],
	setup(props, { emit }) {
		const {
			allDataLoaded,
			borrowerName,
			distributionModel,
			formattedLocation,
			fundraisingPercent,
			hasProgressData,
			imageHash,
			isLoading,
			loanAmount,
			loanBorrowerCount,
			loanCallouts: sharedLoanCallouts,
			loanStatus,
			loanUse,
			readMorePath,
			tag,
			unreservedAmount,
		} = loanCardComputedProperties(props);

		const { clickReadMore: sharedClickReadMore } = loanCardMethods(props, emit);

		const selectedAmount = ref('');
		const linkTag = computed(() => tag.value);

		const loanLinkAttrs = computed(() => {
			if (props.externalLinks) {
				return {
					href: readMorePath.value,
					target: props.externalLinksNewTab ? '_blank' : undefined,
					rel: props.externalLinksNewTab ? 'noopener noreferrer' : undefined,
				};
			}
			return { to: readMorePath.value };
		});

		const helpLanguage = computed(() => {
			if (['fundraising', 'inactive', 'reviewed'].includes(loanStatus.value)) return 'helps';
			return 'helped';
		});

		const borrowerNameWithCountry = computed(() => {
			const location = formattedLocation.value;
			return location ? `${borrowerName.value} in ${location}` : borrowerName.value;
		});

		const showLoanUsePrefix = computed(() => {
			if (props.loan?.anonymizationLevel === 'full' || !loanUse.value.length) return '';
			return borrowerNameWithCountry.value;
		});

		const loanUsePrefixStart = computed(() => {
			if (!showLoanUsePrefix.value) return '';
			const isDirect = distributionModel.value === 'direct';
			const isGroup = loanBorrowerCount.value > 1;
			const parts = [
				numeral(loanAmount.value).format('$0,0'),
				isDirect ? 'to' : helpLanguage.value,
				isGroup ? 'a member of' : '',
			].filter(Boolean);

			return `${parts.join(' ')} `;
		});

		const loanUsePrefixEnd = computed(() => {
			if (!showLoanUsePrefix.value) return '';
			return distributionModel.value === 'direct' ? ` ${helpLanguage.value} ` : ' ';
		});

		const loanUsePrefix = computed(() => {
			if (!showLoanUsePrefix.value) return '';
			return `${loanUsePrefixStart.value}${borrowerNameWithCountry.value}${loanUsePrefixEnd.value}`;
		});

		const rawUseStatement = computed(() => {
			if (props.loan?.anonymizationLevel === 'full' || !loanUse.value.length) {
				return 'For the borrower\'s privacy, this loan has been made anonymous.';
			}

			const whySpecialSentence = props.loan?.whySpecial
				? ` This loan is special because ${normalizeUse(props.loan.whySpecial)}`
				: '';

			return `${normalizeUse(loanUse.value)}${whySpecialSentence}`;
		});

		const fullLoanUseStatement = computed(() => `${loanUsePrefix.value}${rawUseStatement.value}`);

		const isStatementTruncated = computed(() => {
			return fullLoanUseStatement.value.length > MAX_USE_STATEMENT_LENGTH;
		});

		const visibleUseStatement = computed(() => {
			return truncateText(
				rawUseStatement.value,
				MAX_USE_STATEMENT_LENGTH - loanUsePrefix.value.length,
			);
		});

		const statementTitle = computed(() => {
			return isStatementTruncated.value ? fullLoanUseStatement.value : undefined;
		});

		const loanCallouts = computed(() => {
			if (!props.showCallouts) return [];
			return sharedLoanCallouts.value.slice(0, 2);
		});

		const minNoteSize = computed(() => props.loan?.minNoteSize ?? 25);
		const isCompleteLoanActive = computed(() => {
			const amountLeft = parseFloat(unreservedAmount.value);
			return amountLeft > 0 && amountLeft <= 500;
		});
		const amountOptions = computed(() => {
			const amountLeft = parseFloat(unreservedAmount.value);
			if (!amountLeft) return [];

			const minAmount = amountLeft < 25 ? parseFloat(`${minNoteSize.value}`) : 25;
			return getDropdownPriceArray(
				unreservedAmount.value,
				isCompleteLoanActive.value,
				minAmount,
				props.enableFiveDollarsNotes,
				props.isVisitor,
			);
		});

		watch(amountOptions, (options) => {
			if (!options.length) {
				selectedAmount.value = '';
				return;
			}

			const defaultAmount = getLendCtaSelectedOption(
				props.getCookie,
				props.setCookie,
				props.enableFiveDollarsNotes,
				props.route?.query?.utm_campaign,
				unreservedAmount.value,
				props.userBalance ? parseFloat(props.userBalance) : undefined,
				props.fiveDollarsSelected,
			);
			selectedAmount.value = options.includes(defaultAmount) ? defaultAmount : options[0];
		}, { immediate: true });

		const handleSelectedAmount = (amount: string) => {
			selectedAmount.value = amount;
			emit('update:selected-amount', amount);
			props.kvTrackFunction('Lending', 'Modify lend amount', amount, props.loanId ?? props.loan?.id);
		};

		const clickReadMore = (target: string, event: Event) => {
			sharedClickReadMore(target, event);
		};

		return {
			allDataLoaded,
			borrowerName,
			formattedLocation,
			fundraisingPercent,
			hasProgressData,
			imageHash,
			amountOptions,
			isLoading,
			linkTag,
			loanCallouts,
			loanLinkAttrs,
			loanUsePrefixEnd,
			loanUsePrefixStart,
			borrowerNameWithCountry,
			selectedAmount,
			statementTitle,
			unreservedAmount,
			visibleUseStatement,
			clickReadMore,
			handleSelectedAmount,
		};
	},
};
</script>

<style lang="postcss" scoped>

:deep(.loan-callouts span) {
    @apply tw-font-medium;
}

:deep(.amount-dropdown select) {
    @apply tw-h-4;
}

</style>
