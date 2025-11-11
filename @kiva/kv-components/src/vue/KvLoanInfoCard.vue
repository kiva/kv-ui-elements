<template>
	<div
		class="tw-flex tw-flex-col tw-bg-white tw-rounded tw-w-full tw-pb-1 tw-p-1"
		:class="{ 'tw-pointer-events-none' : isLoading }"
		data-testid="loan-card"
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
				</div>

				<component
					:is="tag"
					:to="readMorePath"
					:href="readMorePath"
					class="loan-card-use tw-no-underline tw-text-primary"
					aria-label="Loan use"
					@click.native="clickReadMore('Use', $event)"
				>
					<!-- Loan use  -->
					<div class="tw-mb-1.5 tw-pt-1">
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
								:hide-loan-amount="true"
								:loan-amount="loanAmount"
								:status="loanStatus"
								:borrower-count="loanBorrowerCount"
								:name="borrowerName"
								:distribution-model="distributionModel"
							/>
						</div>
					</div>
				</component>

				<component
					:is="tag"
					:to="readMorePath"
					:href="readMorePath"
					class="
						loan-card-learn-more
						tw-no-underline hover:tw-no-underline
						tw-font-medium
						tw-text-action hover:tw-text-action-highlight
					"
					:aria-label="primaryLinkText"
					@click.native="clickReadMore(primaryLinkText, $event)"
				>
					<!-- Learn More link  -->
					<div class="tw-mt-1">
						<div
							v-if="isLoading"
							class="tw-w-full"
							style="height: 1rem;"
						>
							<kv-loading-placeholder />
						</div>
						<div
							v-else
							@click.prevent="clickReadMore('ViewLoan', $event)"
						>
							{{ primaryLinkText }}
						</div>
					</div>
				</component>
			</div>
		</div>
	</div>
</template>

<script>
import gql from 'graphql-tag';
import {
	loanCardComputedProperties,
	loanCardMethods,
	LOAN_GEOCODE_FRAGMENT,
} from '../utils/loanCard';
import KvLoanUse, { KV_LOAN_USE_FRAGMENT } from './KvLoanUse.vue';
import KvBorrowerImage from './KvBorrowerImage.vue';
import KvMaterialIcon from './KvMaterialIcon.vue';
import KvLoadingPlaceholder from './KvLoadingPlaceholder.vue';

// Use this fragment to get the necessary public data for this loan card
export const KV_CLASSIC_LOAN_CARD_FRAGMENT = gql`
	fragment KvClassicLoanCard on LoanBasic {
		id
		gender
		image {
			id
			hash # for imageHash
		}
		name # for borrowerName
		...KvLoanUse
		...LoanGeocode
	}
	${KV_LOAN_USE_FRAGMENT}
	${LOAN_GEOCODE_FRAGMENT}
`;

export default {
	name: 'KvClassicLoanCard',
	components: {
		KvBorrowerImage,
		KvLoadingPlaceholder,
		KvLoanUse,
		KvMaterialIcon,
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
			default: true,
		},
		kvTrackFunction: {
			type: Function,
			required: true,
		},
		photoPath: {
			type: String,
			required: true,
		},
		externalLinks: {
			type: Boolean,
			default: false,
		},
		useFullWidth: {
			type: Boolean,
			default: false,
		},
		largeCard: {
			type: Boolean,
			default: false,
		},
		errorMsg: {
			type: String,
			default: '',
		},
		primaryLinkText: {
			type: String,
			default: 'Learn more',
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
			imageHash,
			isLoading,
			loanAmount,
			loanStatus,
			loanUse,
			mdiMapMarker,
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
			imageHash,
			isLoading,
			loanAmount,
			loanStatus,
			loanUse,
			mdiMapMarker,
			readMorePath,
			state,
			tag,
			unreservedAmount,
			sharesAvailable,
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
	},
};
</script>

<style lang="postcss" scoped>
/** Shared with KvWideLoanCard */
.loan-card-active-hover:hover {
	@apply tw-cursor-pointer;
}
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
