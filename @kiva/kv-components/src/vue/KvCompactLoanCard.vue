<template>
	<div class="tw-flex tw-flex-col tw-items-start tw-gap-3 tw-w-full">
		<!-- Cards Grid -->
		<div class="tw-flex tw-items-start tw-gap-3 tw-w-full">
			<div
				class="tw-flex tw-flex-col tw-items-start tw-justify-between tw-p-1
				tw-bg-white tw-rounded-md tw-shadow-lg tw-w-80"
			>
				<div class="tw-flex tw-flex-col tw-items-start tw-w-full">
					<!-- Image and Content -->
					<div class="tw-flex tw-items-center tw-gap-2 tw-w-full">
						<div class="tw-flex-shrink-0 tw-overflow-hidden">
							<kv-borrower-image
								class="tw-bg-black tw-rounded-md"
								style="width: 100px; height: 100px; object-fit: cover;"
								:alt="`Photo of ${borrowerName}`"
								:aspect-ratio="1"
								:default-image="{ width: 200, faceZoom: 50 }"
								:hash="imageHash"
								:images="[{ width: 200, faceZoom: 50 }]"
								:photo-path="photoPath"
							/>
						</div>
						<div class="tw-flex tw-flex-col tw-items-start tw-gap-1 tw-flex-1">
							<component
								:is="tag"
								:to="readMorePath"
								:href="readMorePath"
								class="tw-flex tw-no-underline hover:tw-no-underline focus:tw-no-underline"
								aria-label="Loan tag"
								@click.native="clickReadMore('Tag', $event)"
							>
								<kv-loan-tag
									v-if="showTags && !isLoading"
									:loan="loan"
								/>
							</component>
							<div
								v-if="isLoading"
								class="tw-w-full"
								style="height: 5.5rem;"
							>
								<div
									v-for="(_n, i) in [...Array(4)]"
									:key="i"
									class="tw-h-2 tw-mb-1"
								>
									<kv-loading-placeholder />
								</div>
							</div>
							<div v-else>
								<kv-loan-use
									:use="loanUse"
									:loan-amount="loanAmount"
									:status="loanStatus"
									:borrower-count="loanBorrowerCount"
									:name="borrowerName"
									:distribution-model="distributionModel"
									class="tw-text-xs tw-leading-tight tw-px-1"
								/>
							</div>
						</div>
					</div>

					<!-- Pills -->
					<kv-loading-placeholder
						v-if="isLoading || typeof loanCallouts === 'undefined'"
						class="tw-mt-1.5 tw-mb-1"
						:style="{ width: '60%', height: '1.75rem', 'border-radius': '500rem' }"
					/>

					<kv-loan-callouts
						v-else
						:callouts="loanCallouts"
						class="tw-mt-1.5"
						@click="$emit('jump-filter-page', $event)"
					/>
				</div>

				<!-- Progress and CTA Section -->
				<div class="tw-flex tw-items-end tw-gap-2 tw-w-full tw-mt-1">
					<!-- Loading State -->
					<template v-if="!hasProgressData">
						<div class="tw-flex-1">
							<kv-loading-placeholder
								class="tw-mb-0.5"
								:style="{ width: '11rem', height: '1.3rem' }"
							/>
							<kv-loading-placeholder
								class="tw-rounded"
								:style="{ width: '100%', height: '0.5rem' }"
							/>
						</div>
						<kv-loading-placeholder
							v-if="!allDataLoaded"
							class="tw-rounded tw-flex-shrink-0"
							:style="{ width: '8rem', height: '2.5rem' }"
						/>
					</template>

					<!-- Loaded State -->
					<template v-else>
						<!-- Progress Section: takes remaining space -->
						<div class="tw-flex-1 tw-min-w-0">
							<component
								:is="tag"
								v-if="sharesAvailable"
								:to="readMorePath"
								:href="readMorePath"
								class="loan-card-progress tw-no-underline tw-block"
								aria-label="Loan progress"
								@click.native="clickReadMore('Progress', $event)"
							>
								<kv-loan-progress-group
									id="loanProgress"
									:money-left="unreservedAmount"
									:progress-percent="fundraisingPercent"
									class="tw-text-black"
								/>
							</component>
						</div>

						<!-- CTA Section: fixed width, aligned right -->
						<div class="tw-flex-shrink-0">
							<kv-lend-cta
								:loan="loan"
								:unreserved-amount="unreservedAmount"
								:basket-items="basketItems"
								:is-loading="isLoading"
								:is-adding="isAdding"
								:enable-five-dollars-notes="enableFiveDollarsNotes"
								:five-dollars-selected="fiveDollarsSelected"
								:kv-track-function="kvTrackFunction"
								:show-view-loan="showViewLoan"
								:custom-loan-details="customLoanDetails"
								:external-links="externalLinks"
								:route="route"
								:user-balance="userBalance"
								:get-cookie="getCookie"
								:set-cookie="setCookie"
								:is-visitor="isVisitor"
								:primary-button-text="primaryButtonText"
								:secondary-button-text="secondaryButtonText"
								:secondary-button-handler="secondaryButtonHandler"
								@add-to-basket="$emit('add-to-basket', $event)"
								@show-loan-details="clickReadMore('ViewLoan', $event)"
								@remove-from-basket="$emit('remove-from-basket', $event)"
							/>
						</div>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import gql from 'graphql-tag';
import numeral from 'numeral';
import { mdiMapMarker, mdiHome } from '@mdi/js';
import {
	loanCardComputedProperties,
	loanCardMethods,
	LOAN_CALLOUTS_FRAGMENT,
	LOAN_GEOCODE_FRAGMENT,
	LOAN_PROGRESS_FRAGMENT,
} from '../utils/loanCard';
import KvLoanUse, { KV_LOAN_USE_FRAGMENT } from './KvLoanUse.vue';
import KvBorrowerImage from './KvBorrowerImage.vue';
import KvLoanCallouts from './KvLoanCallouts.vue';
import KvLendCta, { KV_LEND_CTA_FRAGMENT, KV_LEND_CTA_USER_FRAGMENT } from './KvLendCta.vue';
import KvLoanBookmark, { KV_LOAN_BOOKMARK_FRAGMENT } from './KvLoanBookmark.vue';
import KvLoanProgressGroup from './KvLoanProgressGroup.vue';
import KvLoanTag, { KV_LOAN_TAG_FRAGMENT } from './KvLoanTag.vue';
import KvMaterialIcon from './KvMaterialIcon.vue';
import KvLoadingPlaceholder from './KvLoadingPlaceholder.vue';
import KvLoanTeamPick from './KvLoanTeamPick.vue';

// Use this fragment to get the necessary public data for this loan card
export const KV_COMPACT_LOAN_CARD_FRAGMENT = gql`
	fragment KvCompactLoanCard on LoanBasic {
		id
		image {
			id
			hash
		}
		lenders(limit: 0) {
			totalCount
		}
		loanFundraisingInfo {
			id
			fundedAmount
		}
		name
		...KvLendCta
		...KvLoanTag
		...KvLoanUse
		...LoanCallouts
		...LoanGeocode
		...LoanProgress
	}
	${KV_LEND_CTA_FRAGMENT}
	${KV_LOAN_TAG_FRAGMENT}
	${KV_LOAN_USE_FRAGMENT}
	${LOAN_CALLOUTS_FRAGMENT}
	${LOAN_GEOCODE_FRAGMENT}
	${LOAN_PROGRESS_FRAGMENT}
`;

// Use this fragment to get the necessary private/user data for this loan card
export const KV_COMPACT_LOAN_CARD_USER_FRAGMENT = gql`
	fragment KvCompactLoanCardUser on LoanBasic {
		id
		...KvLendCtaUser
		...KvLoanBookmark
	}
	${KV_LEND_CTA_USER_FRAGMENT}
	${KV_LOAN_BOOKMARK_FRAGMENT}
`;

export default {
	name: 'KvCompactLoanCard',
	components: {
		KvBorrowerImage,
		KvLoadingPlaceholder,
		KvLoanUse,
		KvMaterialIcon,
		KvLendCta,
		KvLoanTag,
		KvLoanCallouts,
		KvLoanBookmark,
		KvLoanTeamPick,
		KvLoanProgressGroup,
	},
	props: {
		loanId: {
			type: Number,
			default: undefined,
		},
		loan: {
			type: Object,
			default: null,
		},
		customLoanDetails: {
			type: Boolean,
			default: false,
		},
		showTags: {
			type: Boolean,
			default: true,
		},
		categoryPageName: {
			type: String,
			default: '',
		},
		enableFiveDollarsNotes: {
			type: Boolean,
			default: false,
		},
		isAdding: {
			type: Boolean,
			default: false,
		},
		isVisitor: {
			type: Boolean,
			default: true,
		},
		basketItems: {
			type: Array,
			default: () => ([]),
		},
		isBookmarked: {
			type: Boolean,
			default: false,
		},
		kvTrackFunction: {
			type: Function,
			required: true,
		},
		photoPath: {
			type: String,
			required: true,
		},
		showViewLoan: {
			type: Boolean,
			default: false,
		},
		externalLinks: {
			type: Boolean,
			default: false,
		},
		route: {
			type: Object,
			default: undefined,
		},
		userBalance: {
			type: String,
			default: undefined,
		},
		getCookie: {
			type: Function,
			default: undefined,
		},
		setCookie: {
			type: Function,
			default: undefined,
		},
		fiveDollarsSelected: {
			type: Boolean,
			default: false,
		},
		customCallouts: {
			type: Array,
			default: () => ([]),
		},
		isTeamPick: {
			type: Boolean,
			default: false,
		},
		primaryButtonText: {
			type: String,
			default: 'Lend',
		},
		secondaryButtonHandler: {
			type: Function,
			default: undefined,
		},
		secondaryButtonText: {
			type: String,
			default: 'Checkout now',
		},
		showContributors: {
			type: Boolean,
			default: false,
		},
		customHref: {
			type: String,
			default: '',
		},
	},
	setup(props, { emit }) {
		const {
			allDataLoaded,
			borrowerName,
			city,
			countryName,
			distributionModel,
			formattedLocation,
			fundraisingPercent,
			hasProgressData,
			imageHash,
			isLoading,
			loanAmount,
			loanBorrowerCount,
			loanCallouts,
			loanStatus,
			loanUse,
			readMorePath,
			state,
			tag,
			unreservedAmount,
			sharesAvailable,
		} = loanCardComputedProperties(props);

		const {
			clickReadMore,
		} = loanCardMethods(props, emit);

		return {
			allDataLoaded,
			borrowerName,
			city,
			countryName,
			distributionModel,
			formattedLocation,
			fundraisingPercent,
			hasProgressData,
			imageHash,
			isLoading,
			loanAmount,
			loanBorrowerCount,
			loanCallouts,
			loanStatus,
			loanUse,
			mdiMapMarker,
			mdiHome,
			readMorePath,
			state,
			tag,
			unreservedAmount,
			sharesAvailable,
			clickReadMore,
		};
	},
	computed: {
		displayPills() {
			// Show first 2 callouts as pills
			return this.loanCallouts.slice(0, 2);
		},
		lendersNumber() {
			return this.loan?.lenders?.totalCount ?? 0;
		},
		amountLent() {
			const amount = this.loan?.loanFundraisingInfo?.fundedAmount ?? 0;
			return numeral(amount).format('$0,0');
		},
	},
};
</script>

<style lang="postcss" scoped>
/** Shared with KvWideLoanCard */
.loan-card-use:hover,
.loan-card-use:focus {
	@apply tw-text-primary;
}
.loan-card-active-hover:hover .loan-card-use {
	@apply tw-underline;
}
.loan-card-progress:hover,
.loan-card-progress:focus {
	@apply tw-no-underline;
}
</style>
