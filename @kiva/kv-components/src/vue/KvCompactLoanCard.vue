<template>
	<div
		class="tw-flex tw-flex-col tw-items-start tw-justify-between tw-p-1
        tw-bg-white tw-rounded-md tw-shadow-lg tw-w-full"
		:class="{'tw-relative': showCloseButton, '!tw-p-1.5': showLightView }"
	>
		<button
			v-if="showCloseButton"
			class="tw-absolute tw--top-1 tw--right-1 tw-p-0.5 tw-bg-white tw-rounded-full
				tw-w-2.5 tw-h-2.5 tw-flex tw-items-center tw-justify-center tw-cursor-pointer tw-drop-shadow-sm"
			@click="handleCloseButton"
		>
			<kv-material-icon
				:icon="mdiClose"
				class="tw-w-1.5 tw-h-1.5"
			/>
		</button>
		<div class="tw-flex tw-flex-col tw-items-start tw-w-full">
			<!-- Image and Content -->
			<div
				class="tw-flex tw-items-start tw-gap-2 tw-w-full loan-card-active-hover"
				:class="{ '!tw-gap-1': showLightView }"
				:style="customStyle"
			>
				<div class="tw-flex-shrink-0 tw-overflow-hidden">
					<component
						:is="tag"
						:to="readMorePath"
						:href="readMorePath"
						:target="externalLinksNewTab ? '_blank' : undefined"
						:rel="externalLinksNewTab ? 'noopener noreferrer' : undefined"
						class="tw-flex"
						aria-label="Borrower image"
						@click="clickReadMore('Photo', $event)"
					>
						<kv-borrower-image
							class="tw-bg-gray-300 tw-rounded-md tw-object-cover"
							:class="{ '!tw-w-7.5 !tw-h-7.5': showLightView }"
							style="width: 100px; height: 100px;"
							:alt="`Photo of ${borrowerName}`"
							:aspect-ratio="1"
							:default-image="{ width: 200, faceZoom: 50 }"
							:hash="imageHash"
							:images="[{ width: 200, faceZoom: 50 }]"
							:photo-path="photoPath"
						/>
					</component>
				</div>
				<div class="tw-flex tw-flex-col tw-items-start tw-gap-1 tw-flex-1 tw-min-w-0">
					<div
						v-if="businessName"
						class="tw-mb-0.5 tw-w-full"
					>
						<component
							:is="tag"
							:to="readMorePath"
							:href="readMorePath"
							:target="externalLinksNewTab ? '_blank' : undefined"
							:rel="externalLinksNewTab ? 'noopener noreferrer' : undefined"
							class="tw-no-underline hover:tw-underline focus:tw-no-underline"
							aria-label="Business name"
							@click="clickReadMore('Business', $event)"
						>
							<h3 class="tw-text-primary !tw-font-medium tw-text-base tw-leading-normal tw-truncate">
								{{ businessName }}
							</h3>
						</component>
						<a
							v-if="website"
							:href="formattedWebsite"
							target="_blank"
							class="tw-flex tw-items-center tw-gap-0.5 tw-text-secondary tw-text-small tw-font-light
							tw-leading-normal tw-no-underline hover:tw-underline"
							@click.stop="trackWebsiteClick"
						>
							<kv-material-icon
								:icon="mdiLink"
								class="tw-w-2 tw-h-2"
							/>
							<span class="tw-truncate">{{ website }}</span>
						</a>
					</div>

					<component
						:is="tag"
						:to="readMorePath"
						:href="readMorePath"
						:target="externalLinksNewTab ? '_blank' : undefined"
						:rel="externalLinksNewTab ? 'noopener noreferrer' : undefined"
						class="tw-flex tw-no-underline hover:tw-no-underline focus:tw-no-underline -tw-mt-1"
						aria-label="Loan tag"
						@click="clickReadMore('Tag', $event)"
					>
						<kv-loan-tag
							v-if="showTags && !isLoading"
							:loan="loan"
						/>
					</component>
					<component
						:is="tag"
						v-if="showLoanUse"
						:to="readMorePath"
						:href="readMorePath"
						:target="externalLinksNewTab ? '_blank' : undefined"
						:rel="externalLinksNewTab ? 'noopener noreferrer' : undefined"
						class="loan-card-use tw-no-underline tw-text-primary tw-block tw-w-full"
						aria-label="Loan use"
						@click="clickReadMore('Use', $event)"
					>
						<div
							v-if="isLoading"
							class="loan-card-use-text tw-w-full tw-overflow-hidden"
						>
							<div
								v-for="(_n, i) in [...Array(loanUseLoadingRows)]"
								:key="i"
								class="tw-h-2 tw-mb-1"
							>
								<kv-loading-placeholder />
							</div>
						</div>
						<div
							v-else
							class="loan-card-use-text tw-w-full tw-overflow-hidden"
							:class="{ '!tw--mt-1': showTags && loan.matchingText && showLightView }"
						>
							<kv-loan-use
								:use="loanUse"
								:loan-amount="loanAmount"
								:status="loanStatus"
								:borrower-count="loanBorrowerCount"
								:name="borrowerName"
								:distribution-model="distributionModel"
								:bold-name="true"
								:country="formattedLocation"
								:show-read-more="showLightView"
								:truncate-words-number="truncateWordsNumber"
								class="tw-text-small tw-leading-tight"
							/>
						</div>
					</component>
				</div>
			</div>

			<!-- Pills -->
			<kv-loading-placeholder
				v-if="isLoading || typeof loanCallouts === 'undefined'"
				class="tw-mt-1.5 tw-mb-1 tw-rounded-full"
				:style="{ width: '60%', height: '1.5rem' }"
			/>

			<kv-loan-callouts
				v-else
				:callouts="loanCallouts"
				class="tw-mt-1.5"
				@click="$emit('jump-filter-page', $event)"
			/>
		</div>

		<!-- Progress and CTA Section -->
		<div
			class="tw-flex tw-items-center tw-justify-between tw-w-full tw-mt-1"
			:class="
				{ 'tw-gap-1': sharesAvailable }
			"
		>
			<!-- Loading State -->
			<template v-if="!hasProgressData">
				<div class="tw-flex-1 tw-min-w-0 tw-mr-1">
					<kv-loading-placeholder
						class="tw-mb-0.5"
						:style="{ width: '100%', maxWidth: '11rem', height: '1rem' }"
					/>
					<kv-loading-placeholder
						class="tw-rounded"
						:style="{ width: '100%', maxWidth: '11rem', height: '0.5rem' }"
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
						:target="externalLinksNewTab ? '_blank' : undefined"
						:rel="externalLinksNewTab ? 'noopener noreferrer' : undefined"
						class="loan-card-progress tw-no-underline tw-block"
						aria-label="Loan progress"
						@click="clickReadMore('Progress', $event)"
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
				<button
					v-if="showLightView"
					class="tw-ml-2"
					@click="clickReadMore('View', $event)"
				>
					<span
						class="tw-p-1 tw-rounded-l-sm tw-border tw-border-gray-100 tw-border-r-0"
					>
						${{ customAmountLent }}
					</span>
					<span
						class="tw-bg-gray-100 tw-px-1.5 tw-py-1 tw-rounded-r-sm tw-border tw-border-gray-100
							tw-text-action tw-font-medium hover:tw-underline tw-text-center tw-cursor-pointer"
					>
						View
					</span>
				</button>
				<div
					v-else
					class="tw-flex-shrink-0 loan-card-cta"
					:class="{ 'tw-w-full': !sharesAvailable }"
					style="height: 40px;"
				>
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
</template>

<script lang="ts">
import gql from 'graphql-tag';
import numeral from 'numeral';
import { computed, type PropType } from 'vue';
import {
	mdiMapMarker, mdiHome, mdiLink, mdiClose,
} from '@mdi/js';
import {
	loanCardComputedProperties,
	loanCardMethods,
	LOAN_CALLOUTS_FRAGMENT,
	LOAN_GEOCODE_FRAGMENT,
	LOAN_PROGRESS_FRAGMENT,
} from '../utils/loanCard';
import { type GetCookieFn, type SetCookieFn } from '../utils/loanUtils';
import KvLoanUse, { KV_LOAN_USE_FRAGMENT } from './KvLoanUse.vue';
import KvBorrowerImage from './KvBorrowerImage.vue';
import KvLoanCallouts from './KvLoanCallouts.vue';
import KvLendCta, { KV_LEND_CTA_FRAGMENT, KV_LEND_CTA_USER_FRAGMENT } from './KvLendCta.vue';
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
	}
	${KV_LEND_CTA_USER_FRAGMENT}
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
		externalLinksNewTab: {
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
			type: Function as PropType<GetCookieFn>,
			default: undefined,
		},
		setCookie: {
			type: Function as PropType<SetCookieFn>,
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
		businessName: {
			type: String,
			default: '',
		},
		website: {
			type: String,
			default: '',
		},
		showLoanUse: {
			type: Boolean,
			default: true,
		},
		showLightView: {
			type: Boolean,
			default: false,
		},
		truncateWordsNumber: {
			type: Number,
			default: 0,
		},
		showCloseButton: {
			type: Boolean,
			default: false,
		},
		customAmountLent: {
			type: String,
			default: '25',
		},
	},
	emits: [
		'close-button',
		'jump-filter-page',
		'add-to-basket',
		'remove-from-basket',
	],
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

		const formattedWebsite = computed(() => {
			if (!props.website) {
				return '';
			}
			const url = props.website.trim();
			if (url.startsWith('http://') || url.startsWith('https://')) {
				return url;
			}
			return `https://${url}`;
		});

		const customStyle = computed(() => {
			const height = props.showLightView ? 'auto' : '6.75rem';
			const maxHeight = props.showLightView ? 'none' : '6.75rem';

			return { height, maxHeight };
		});

		const loanUseLoadingRows = computed(() => {
			return props.showLightView ? 3 : 4;
		});

		const trackWebsiteClick = () => {
			props.kvTrackFunction('Lending', 'click-Business Website', 'Website', props.loanId);
		};

		const handleCloseButton = (event) => {
			emit('close-button', event);
		};

		return {
			allDataLoaded,
			borrowerName,
			city,
			countryName,
			distributionModel,
			formattedLocation,
			formattedWebsite,
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
			mdiLink,
			mdiClose,
			readMorePath,
			state,
			tag,
			unreservedAmount,
			sharesAvailable,
			customStyle,
			loanUseLoadingRows,
			clickReadMore,
			trackWebsiteClick,
			handleCloseButton,
		};
	},
	computed: {
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

.loan-card-use-text :deep(p) {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    line-clamp: 4;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Override CTA component height to match Figma */
.loan-card-cta :deep(form),
.loan-card-cta :deep(fieldset),
.loan-card-cta :deep(.tw-w-full),
.loan-card-cta :deep(button) {
    height: 40px !important;
    max-height: 40px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
}

.loan-card-cta :deep(.tw-inline-flex) {
    height: 40px !important;
    max-height: 40px !important;
    min-height: 40px !important;
}
</style>
