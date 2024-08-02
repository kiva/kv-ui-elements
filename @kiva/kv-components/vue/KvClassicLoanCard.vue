<template>
	<div
		class="loan-card tw-flex tw-flex-col tw-bg-white tw-rounded tw-w-full tw-pb-1"
		:class="{ 'tw-p-1': !largeCard, 'tw-pointer-events-none' : isLoading }"
		style="box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);"
		:style="{ minWidth: '230px', maxWidth: cardWidth }"
	>
		<div class="tw-grow">
			<div class="loan-card-active-hover">
				<!-- Borrower image -->
				<kv-loading-placeholder
					v-if="isLoading"
					class="tw-mb-1 tw-w-full"
					:class="{ 'tw-rounded-t tw-rounded-b-none': largeCard, 'tw-rounded': !largeCard }"
					:style="{ height: '15rem' }"
				/>
				<div
					v-else
					class="tw-relative"
				>
					<component
						:is="tag"
						:to="readMorePath"
						:href="readMorePath"
						class="tw-flex"
						aria-label="Borrower image"
						@click.native="clickReadMore('Photo', $event)"
					>
						<kv-borrower-image
							class="
								tw-relative
								tw-w-full
								tw-bg-black
							"
							:class="{ 'tw-rounded-t': largeCard, 'tw-rounded': !largeCard }"
							:alt="`Photo of ${borrowerName}`"
							:aspect-ratio="imageAspectRatio"
							:default-image="{ width: imageDefaultWidth }"
							:hash="imageHash"
							:images="imageSizes"
							:photo-path="photoPath"
						/>

						<div v-if="countryName">
							<p
								class="
									tw-absolute
									tw-bottom-1
									tw-left-1
									tw-text-primary
									tw-bg-white
									tw-rounded
									tw-p-1
									tw-mb-0
									tw-mr-2
									tw-text-h4
									tw-inline-flex
									tw-items-center"
								style="padding: 2px 6px; text-transform: capitalize;"
							>
								<kv-material-icon
									class="tw-h-2 tw-w-2"
									:icon="mdiMapMarker"
								/>
								{{ formattedLocation }}
							</p>
						</div>
					</component>
					<kv-loan-team-pick
						v-if="isTeamPick"
						class="tw-absolute"
						:class="{ 'tw-right-6': !isVisitor, 'tw-right-0': isVisitor }"
						style="top: -6px;"
						data-testid="loan-card-teampick"
					/>
					<kv-loan-bookmark
						v-if="!isVisitor"
						:loan-id="loanId"
						:is-bookmarked="isBookmarked"
						class="tw-absolute tw-right-1"
						style="top: -6px;"
						data-testid="loan-card-bookmark"
						@toggle-bookmark="$emit('toggle-bookmark')"
					/>
				</div>

				<!-- Loan tag -->
				<component
					:is="tag"
					:to="readMorePath"
					:href="readMorePath"
					class="tw-flex hover:tw-no-underline focus:tw-no-underline"
					:class="{ 'tw-px-1': largeCard }"
					aria-label="Loan tag"
					@click.native="clickReadMore('Tag', $event)"
				>
					<kv-loan-tag
						v-if="showTags && !isLoading"
						:loan="loan"
					/>
				</component>

				<component
					:is="tag"
					:to="readMorePath"
					:href="readMorePath"
					class="loan-card-use tw-text-primary"
					aria-label="Loan use"
					@click.native="clickReadMore('Use', $event)"
				>
					<!-- Loan use  -->
					<div class="tw-mb-1.5 tw-pt-1">
						<div
							v-if="isLoading"
							class="tw-w-full"
							:class="{ 'tw-px-1': largeCard }"
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
								:class="{ 'tw-px-1': largeCard }"
							/>
						</div>
					</div>
				</component>
			</div>

			<!-- Loan call outs -->
			<kv-loading-placeholder
				v-if="isLoading || typeof loanCallouts === 'undefined'"
				class="tw-mt-1.5 tw-mb-1"
				:class="{ 'tw-mx-1': largeCard }"
				:style="{ width: '60%', height: '1.75rem', 'border-radius': '500rem' }"
			/>

			<kv-loan-callouts
				v-else
				:callouts="loanCallouts"
				class="tw-mt-1.5"
				:class="{ 'tw-px-1': largeCard }"
				@click="$emit('jump-filter-page', $event)"
			/>
		</div>

		<div
			class="tw-flex tw-justify-between tw-mt-2"
			:class="{ 'tw-px-1': largeCard }"
		>
			<!-- Fundraising -->
			<div
				v-if="!hasProgressData"
				class="tw-w-full tw-pt-1 tw-pr-1"
			>
				<kv-loading-placeholder
					class="tw-mb-0.5"
					:style="{ width: '70%', height: '1.3rem' }"
				/>

				<kv-loading-placeholder
					class="tw-rounded"
					:style="{ width: '70%', height: '0.5rem' }"
				/>
			</div>

			<div>
				<component
					:is="tag"
					v-if="unreservedAmount > 0"
					:to="readMorePath"
					:href="readMorePath"
					class="loan-card-progress tw-mt-1"
					aria-label="Loan progress"
					@click.native="clickReadMore('Progress', $event)"
				>
					<kv-loan-progress-group
						id="loanProgress"
						:money-left="`${unreservedAmount}`"
						:progress-percent="fundraisingPercent"
						class="tw-text-black"
					/>
				</component>
			</div>

			<!-- CTA Button -->
			<kv-loading-placeholder
				v-if="!allDataLoaded"
				class="tw-rounded tw-self-start"
				:style="{ width: '9rem', height: '3rem' }"
			/>

			<kv-lend-cta
				v-else
				:loan="loan"
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
				:enable-huge-amount="enableHugeAmount"
				:is-visitor="isVisitor"
				:primary-button-text="primaryButtonText"
				:secondary-button-text="secondaryButtonText"
				:secondary-button-handler="secondaryButtonHandler"
				class="tw-mt-auto"
				:class="{ 'tw-w-full' : unreservedAmount <= 0 }"
				@add-to-basket="$emit('add-to-basket', $event)"
				@show-loan-details="clickReadMore('ViewLoan', $event)"
				@remove-from-basket="$emit('remove-from-basket', $event)"
			/>
		</div>

		<div
			v-if="showContributors && lendersNumber && amountLent"
			class="tw-text-center tw-w-full tw-mt-1 tw-font-medium "
		>
			<p>
				{{ lendersNumber }} people contributed {{ amountLent }}
			</p>
		</div>

		<div
			v-if="combinedActivities.length > 0"
			class="tw-pt-1.5"
		>
			<hr class="tw-border-tertiary tw-mb-1 tw-w-5/6 tw-mx-auto">
			<KvLoanActivities
				:loan="loan"
				:combined-activities="combinedActivities"
				:kv-track-function="kvTrackFunction"
				:basket-items="basketItems"
				:is-adding="isAdding"
				:enable-five-dollars-notes="enableFiveDollarsNotes"
				:five-dollars-selected="fiveDollarsSelected"
				:show-view-loan="showViewLoan"
				:custom-loan-details="customLoanDetails"
				:external-links="externalLinks"
				:route="route"
				:user-balance="userBalance"
				:get-cookie="getCookie"
				:set-cookie="setCookie"
				:error-msg="errorMsg"
				:enable-huge-amount="enableHugeAmount"
				:is-visitor="isVisitor"
				@add-to-basket="$emit('add-to-basket', $event)"
			/>
		</div>
	</div>
</template>

<script>
import numeral from 'numeral';
import { loanCardComputedProperties, loanCardMethods } from '../utils/loanCard';

import KvLoanUse from './KvLoanUse.vue';
import KvBorrowerImage from './KvBorrowerImage.vue';
import KvLoanProgressGroup from './KvLoanProgressGroup.vue';
import KvLoanCallouts from './KvLoanCallouts.vue';
import KvLendCta from './KvLendCta.vue';
import KvLoanBookmark from './KvLoanBookmark.vue';
import KvLoanTag from './KvLoanTag.vue';
import KvMaterialIcon from './KvMaterialIcon.vue';
import KvLoadingPlaceholder from './KvLoadingPlaceholder.vue';
import KvLoanTeamPick from './KvLoanTeamPick.vue';
import KvLoanActivities from './KvLoanActivities.vue';

export default {
	name: 'KvClassicLoanCard',
	components: {
		KvBorrowerImage,
		KvLoadingPlaceholder,
		KvLoanUse,
		KvLoanProgressGroup,
		KvMaterialIcon,
		KvLendCta,
		KvLoanTag,
		KvLoanCallouts,
		KvLoanBookmark,
		KvLoanTeamPick,
		KvLoanActivities,
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
			default: false,
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
		useFullWidth: {
			type: Boolean,
			default: false,
		},
		largeCard: {
			type: Boolean,
			default: false,
		},
		isTeamPick: {
			type: Boolean,
			default: false,
		},
		combinedActivities: {
			type: Array,
			default: () => ([]),
		},
		errorMsg: {
			type: String,
			default: '',
		},
		enableHugeAmount: {
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
			mdiMapMarker,
			readMorePath,
			state,
			tag,
			unreservedAmount,
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
			readMorePath,
			state,
			tag,
			unreservedAmount,
			clickReadMore,
		};
	},
	computed: {
		cardWidth() {
			return this.useFullWidth ? '100%' : '374px';
		},
		imageAspectRatio() {
			if (this.largeCard) {
				return 5 / 8;
			}
			return 3 / 4;
		},
		imageDefaultWidth() {
			return this.largeCard ? 480 : 336;
		},
		imageSizes() {
			if (this.largeCard) {
				return [{ width: 480 }];
			}
			return [
				{ width: this.imageDefaultWidth, viewSize: 1024 },
				{ width: this.imageDefaultWidth, viewSize: 768 },
				{ width: 416, viewSize: 480 },
				{ width: 374, viewSize: 414 },
				{ width: 335, viewSize: 375 },
			];
		},
		lendersNumber() {
			return this.loan?.lenders?.totalCount ?? 0;
		},
		amountLent() {
			const amount = this.loan?.loanFundraisingInfo?.fundedAmount ?? 0;
			return numeral(parseFloat(amount)).format('$0,0');
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
