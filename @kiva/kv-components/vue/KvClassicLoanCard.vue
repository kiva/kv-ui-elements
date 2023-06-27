<template>
	<div
		class="tw-flex tw-flex-col tw-bg-white tw-rounded tw-w-full tw-pb-1"
		:class="{ 'tw-p-1': !largeCard }"
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
					@click="showLoanDetails"
				>
					<kv-loan-bookmark
						v-if="!isVisitor"
						:loan-id="loanId"
						:is-bookmarked="isBookmarked"
						class="tw-absolute tw-right-1 tw-z-2"
						style="top: -6px;"
						data-testid="loan-card-bookmark"
						@toggle-bookmark="$emit('toggle-bookmark')"
					/>
					<component
						:is="tag"
						:to="readMorePath"
						:href="readMorePath"
						class="tw-flex"
						aria-label="Borrower image"
						@click="clickReadMore('Photo')"
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

				<!-- Loan tag -->
				<component
					:is="tag"
					:to="readMorePath"
					:href="readMorePath"
					class="tw-flex hover:tw-no-underline focus:tw-no-underline"
					:class="{ 'tw-px-1': largeCard }"
					aria-label="Loan tag"
					@click="clickReadMore('Tag')"
				>
					<kv-loan-tag
						v-if="showTags && !isLoading"
						:loan="loan"
						:kv-track-function="kvTrackFunction"
					/>
				</component>

				<component
					:is="tag"
					:to="readMorePath"
					:href="readMorePath"
					class="loan-card-use tw-text-primary"
					:class="{ 'tw-pointer-events-none' : isLoading }"
					aria-label="Loan use"
					@click="clickReadMore('Use')"
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

			<component
				:is="tag"
				v-if="unreservedAmount > 0"
				:to="readMorePath"
				:href="readMorePath"
				class="loan-card-progress tw-mt-1"
				aria-label="Loan progress"
				@click="clickReadMore('Progress')"
			>
				<kv-loan-progress-group
					id="loanProgress"
					:money-left="unreservedAmount"
					:progress-percent="fundraisingPercent"
					class="tw-text-black"
				/>
			</component>

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
				:kv-track-function="kvTrackFunction"
				:show-view-loan="showViewLoan"
				:custom-loan-details="customLoanDetails"
				:external-links="externalLinks"
				:route="route"
				:user-balance="userBalance"
				:get-cookie="getCookie"
				:set-cookie="setCookie"
				class="tw-mt-auto"
				:class="{ 'tw-w-full' : unreservedAmount <= 0 }"
				@add-to-basket="$emit('add-to-basket', $event)"
				@show-loan-details="clickReadMore('ViewLoan')"
			/>
		</div>
	</div>
</template>

<script>
import { mdiMapMarker } from '@mdi/js';
import KvLoanUse from './KvLoanUse.vue';
import KvBorrowerImage from './KvBorrowerImage.vue';
import KvLoanProgressGroup from './KvLoanProgressGroup.vue';
import KvLoanCallouts from './KvLoanCallouts.vue';
import KvLendCta from './KvLendCta.vue';
import KvLoanBookmark from './KvLoanBookmark.vue';
import KvLoanTag from './KvLoanTag.vue';
import KvMaterialIcon from './KvMaterialIcon.vue';
import KvLoadingPlaceholder from './KvLoadingPlaceholder.vue';

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
		useFullWidth: {
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
		largeCard: {
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
	},
	data() {
		return {
			mdiMapMarker,
		};
	},
	computed: {
		tag() {
			return this.externalLinks ? 'a' : 'router-link';
		},
		readMorePath() {
			return this.customLoanDetails ? '' : `/lend/${this.loanId}`;
		},
		isLoading() {
			return !this.loanId || !this.loan;
		},
		cardWidth() {
			return this.useFullWidth ? '100%' : '374px';
		},
		borrowerName() {
			return this.loan?.name || '';
		},
		countryName() {
			return this.loan?.geocode?.country?.name || '';
		},
		city() {
			return this.loan?.geocode?.city || '';
		},
		state() {
			return this.loan?.geocode?.state || '';
		},
		distributionModel() {
			return this.loan?.distributionModel || '';
		},
		imageHash() {
			return this.loan?.image?.hash ?? '';
		},
		hasProgressData() {
			// Local resolver values for the progress bar load client-side
			return typeof this.loan?.unreservedAmount !== 'undefined'
				&& typeof this.loan?.fundraisingPercent !== 'undefined';
		},
		allDataLoaded() {
			return !this.isLoading && this.hasProgressData;
		},
		fundraisingPercent() {
			return this.loan?.fundraisingPercent ?? 0;
		},
		unreservedAmount() {
			return this.loan?.unreservedAmount ?? '0';
		},
		formattedLocation() {
			if (this.distributionModel === 'direct') {
				const formattedString = `${this.city}, ${this.state}, ${this.countryName}`;
				return formattedString;
			}
			if (this.countryName === 'Puerto Rico') {
				const formattedString = `${this.city}, PR`;
				return formattedString;
			}
			return this.countryName;
		},
		loanUse() {
			return this.loan?.use ?? '';
		},
		loanStatus() {
			return this.loan?.status ?? '';
		},
		loanAmount() {
			return this.loan?.loanAmount ?? '0';
		},
		loanBorrowerCount() {
			return this.loan?.borrowerCount ?? 0;
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
				{ width: 300 },
			];
		},
		loanCallouts() {
			const callouts = [];
			const activityName = this.loan?.activity?.name ?? '';
			const sectorName = this.loan?.sector?.name ?? '';
			const tags = this.loan?.tags?.filter((tag) => tag.charAt(0) === '#')
				.map((tag) => tag.substring(1)) ?? [];
			const themes = this.loan?.themes ?? [];
			const categories = {
				ecoFriendly: !!tags
					.filter((t) => t.toUpperCase() === 'ECO-FRIENDLY' || t.toUpperCase() === 'SUSTAINABLE AG').length,
				refugeesIdps: !!themes.filter((t) => t.toUpperCase() === 'REFUGEES/DISPLACED').length,
				singleParents: !!tags.filter((t) => t.toUpperCase() === 'SINGLE PARENT').length,
			};

			// P1 Category
			// Exp limited to: Eco-friendly, Refugees and IDPs, Single Parents
			if (!this.categoryPageName) {
				if (categories.ecoFriendly) {
					callouts.push('Eco-friendly');
				} else if (categories.refugeesIdps) {
					callouts.push('Refugees and IDPs');
				} else if (categories.singleParents) {
					callouts.push('Single Parent');
				}
			}

			// P2 Activity
			if (activityName && this.categoryPageName?.toUpperCase() !== activityName.toUpperCase()) {
				callouts.push(activityName);
			}

			// P3 Sector
			if (sectorName
				&& (activityName.toUpperCase() !== sectorName.toUpperCase())
				&& (sectorName.toUpperCase() !== this.categoryPageName?.toUpperCase())
				&& callouts.length < 2) {
				callouts.push(sectorName);
			}

			// P4 Tag
			if (!!tags.length && callouts.length < 2) {
				const position = Math.floor(Math.random() * tags.length);
				const tag = tags[position];
				if (!callouts.filter((c) => c.toUpperCase() === tag.toUpperCase()).length) {
					callouts.push(tag);
				}
			}

			// P5 Theme
			if (!!themes.length && callouts.length < 2) {
				const position = Math.floor(Math.random() * themes.length);
				const theme = themes[position];
				if (!callouts.filter((c) => c.toUpperCase() === theme.toUpperCase()).length) {
					callouts.push(theme);
				}
			}

			return callouts;
		},
	},
	methods: {
		showLoanDetails(e) {
			if (this.customLoanDetails) {
				e.preventDefault();
				this.$emit('show-loan-details');
			}
		},
		clickReadMore(target) {
			this.kvTrackFunction('Lending', 'click-Read more', target, this.loanId);
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
</style>
