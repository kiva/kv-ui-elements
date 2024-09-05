<template>
	<div
		class="tw-flex tw-flex-col tw-bg-white tw-rounded tw-w-full tw-pb-2"
		:class="{ 'tw-pointer-events-none' : isLoading }"
		data-testid="loan-card"
		style="box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.38);"
		:style="{ minWidth: '230px', maxWidth: cardWidth }"
	>
		<div class="tw-grow">
			<div class="loan-card-active-hover">
				<!-- Borrower image -->
				<kv-loading-placeholder
					v-if="isLoading"
					class="tw-w-full tw-rounded-t"
					:style="{ height: '11rem' }"
				/>
				<div
					v-else
					:style="{ height: '11rem' }"
					class="tw-relative tw-overflow-hidden"
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
								tw-rounded-t
								borrower-image
							"
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
									tw-items-center
									!tw-capitalize
								"
								style="padding: 2px 6px;"
							>
								<kv-flag
									class="tw-ml-0.5 tw-mr-1"
									:country="countryCode"
									width-override="16px"
									hide-border
								/>
								{{ formattedLocation }}
							</p>
						</div>
					</component>

					<kv-loan-bookmark
						v-if="!isVisitor"
						:loan-id="loanId"
						:is-bookmarked="isBookmarked"
						class="loan-bookmark tw-absolute tw-right-1.5 tw-top-0"
						data-testid="loan-card-bookmark"
						@toggle-bookmark="$emit('toggle-bookmark')"
					/>
				</div>

				<!-- Loan name -->

				<kv-loading-placeholder
					v-if="isLoading || typeof loanCallouts === 'undefined'"
					class="tw-mt-1 tw-mx-auto"
					:style="{ width: '60%', height: '1.75rem', 'border-radius': '500rem' }"
				/>

				<component
					:is="tag"
					:to="readMorePath"
					:href="readMorePath"
					aria-label="Borrower name"
					@click.native="clickReadMore('Name', $event)"
				>
					<h3
						class="loan-card-name"
						:class="{ 'tw-text-center': borrowerName.length < 20 }"
						style="font-size: 28px;"
					>
						{{ borrowerName }}
					</h3>
				</component>

				<!-- Loan tag -->

				<div
					v-if="isLoading"
					class="tw-flex tw-justify-center tw-gap-2"
				>
					<kv-loading-placeholder
						v-if="isLoading || typeof loanCallouts === 'undefined'"
						class="tw-mt-0.5 tw-mb-1"
						:style="{ width: '20%', height: '1.65rem', 'border-radius': '500rem' }"
					/>
					<kv-loading-placeholder
						v-if="isLoading || typeof loanCallouts === 'undefined'"
						class="tw-mt-0.5 tw-mb-1"
						:style="{ width: '20%', height: '1.65rem', 'border-radius': '500rem' }"
					/>
					<kv-loading-placeholder
						v-if="isLoading || typeof loanCallouts === 'undefined'"
						class="tw-mt-0.5 tw-mb-1"
						:style="{ width: '20%', height: '1.65rem', 'border-radius': '500rem' }"
					/>
				</div>

				<component
					:is="tag"
					v-else
					:to="readMorePath"
					:href="readMorePath"
					class="tw-flex hover:tw-no-underline focus:tw-no-underline tw-justify-center"
					aria-label="Loan tag"
					@click.native="clickReadMore('Tag', $event)"
				>
					<kv-loan-callouts
						:callouts="loanCallouts"
						:add-bg-color="false"
						class="loan-callouts"
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
					<div
						class="tw-pt-0.5 tw-px-2"
						:class="{'tw-mb-1.5': !isLoading}"
					>
						<div
							v-if="isLoading"
							class="tw-w-full"
							style="height: 5.5rem;"
						>
							<div
								v-for="(_n, i) in [...Array(3)]"
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
								hide-loan-amount
								class="!tw-line-clamp-3"
							/>
						</div>
					</div>
				</component>
			</div>
		</div>

		<div class="tw-px-2">
			<!-- Fundraising -->
			<div
				v-if="!hasProgressData"
				class="tw-w-full tw-pr-1"
			>
				<div class="tw-flex tw-justify-between">
					<kv-loading-placeholder
						class="tw-mb-0.5"
						:style="{ width: '20%', height: '1.3rem' }"
					/>
					<kv-loading-placeholder
						class="tw-mb-0.5"
						:style="{ width: '20%', height: '1.3rem' }"
					/>
				</div>

				<kv-loading-placeholder
					class="tw-rounded"
					:style="{ width: '100%', height: '0.5rem' }"
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
						:amount-goal="`${loanAmount}`"
						:progress-percent="fundraisingPercent"
						class="tw-text-secondary"
					/>
				</component>
			</div>

			<!-- Loan Tag -->
			<kv-loading-placeholder
				v-if="isLoading"
				class="tw-rounded tw-mx-auto tw-mt-2"
				:style="{ width: '9rem', height: '1rem' }"
			/>

			<div
				v-else-if="isFunded"
				class="tw-bg-eco-green-1 tw-text-action tw-text-center tw-py-1.5"
				style="font-weight: bold; font-size: 13px; border-radius: 8px;"
			>
				🎉 Fully funded!
			</div>

			<kv-loan-tag
				v-else
				:loan="loan"
				:use-expanded-styles="true"
				style="font-size: 15px;"
				class="tw-text-center tw-pt-2"
			/>
		</div>
	</div>
</template>

<script>
import numeral from 'numeral';
import { loanCardComputedProperties, loanCardMethods } from '../utils/loanCard';
import KvLoanBookmark from './KvLoanBookmark.vue';
import KvLoanUse from './KvLoanUse.vue';
import KvBorrowerImage from './KvBorrowerImage.vue';
import KvLoanProgressGroup from './KvLoanProgressGroup.vue';
import KvLoanCallouts from './KvLoanCallouts.vue';
import KvLoanTag from './KvLoanTag.vue';
import KvMaterialIcon from './KvMaterialIcon.vue';
import KvLoadingPlaceholder from './KvLoadingPlaceholder.vue';
import KvFlag from './KvFlag.vue';

export default {
	name: 'KvIntroductionLoanCard',
	components: {
		KvBorrowerImage,
		KvLoadingPlaceholder,
		KvLoanUse,
		KvLoanProgressGroup,
		KvMaterialIcon,
		KvLoanTag,
		KvLoanCallouts,
		KvFlag,
		KvLoanBookmark,
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
		categoryPageName: {
			type: String,
			default: '',
		},
		customCallouts: {
			type: Array,
			default: () => ([]),
		},
		kvTrackFunction: {
			type: Function,
			required: true,
		},
		photoPath: {
			type: String,
			required: true,
		},
		errorMsg: {
			type: String,
			default: '',
		},
		externalLinks: {
			type: Boolean,
			default: false,
		},
		route: {
			type: Object,
			default: undefined,
		},
		useFullWidth: {
			type: Boolean,
			default: false,
		},
		isVisitor: {
			type: Boolean,
			default: true,
		},
		isBookmarked: {
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
			countryCode,
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
		} = loanCardComputedProperties(props, true);

		const {
			clickReadMore,
		} = loanCardMethods(props, emit);

		return {
			allDataLoaded,
			borrowerName,
			city,
			countryName,
			countryCode,
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
			return this.useFullWidth ? '100%' : '20.5rem';
		},
		imageAspectRatio() {
			return 5 / 8;
		},
		imageDefaultWidth() {
			return 480;
		},
		imageSizes() {
			return [
				{ width: this.imageDefaultWidth, viewSize: 375 },
			];
		},
		lendersNumber() {
			return this.loan?.lenders?.totalCount ?? 0;
		},
		amountLent() {
			const amount = this.loan?.loanFundraisingInfo?.fundedAmount ?? 0;
			return numeral(parseFloat(amount)).format('$0,0');
		},
		isFunded() {
			return this.loan?.status === 'funded' || parseFloat(this.unreservedAmount) === 0;
		},
	},
};
</script>

<style lang="postcss" scoped>
.loan-callouts >>> span {
	@apply !tw-bg-transparent tw-text-action;
}
.loan-card-use:hover,
.loan-card-use:focus {
	@apply tw-text-primary;
}
.loan-card-active-hover:hover .loan-card-use, .loan-card-active-hover:hover .loan-card-name {
	@apply tw-underline;
}
.loan-card-progress:hover,
.loan-card-progress:focus {
	@apply tw-no-underline;
}
.loan-card-name {
	@apply tw-pt-1 tw-px-3 tw-text-ellipsis tw-overflow-hidden tw-line-clamp-1 tw-cursor-pointer;
}
.loan-bookmark >>> button {
	@apply !tw-rounded-t-none;
}
</style>
