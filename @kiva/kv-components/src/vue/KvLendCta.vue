<template>
	<div class="tw-whitespace-nowrap">
		<!-- Basket button -->
		<kv-ui-button
			v-if="isInBasket"
			variant="secondary"
			class="tw-inline-flex tw-flex-1 tw-w-full"
			data-testid="bp-lend-cta-checkout-button"
			:to="!externalLinks ? '/basket' : undefined"
			:href="externalLinks ? '/basket' : undefined"
			@click.native="clickSecondaryButton($event)"
		>
			{{ loanInBasketButtonText }}
		</kv-ui-button>

		<!-- Refunded, allSharesReserved button -->
		<kv-ui-button
			v-else-if="showNonActionableLoanButton"
			class="tw-inline-flex tw-flex-1"
		>
			{{ ctaButtonText }}
		</kv-ui-button>

		<!-- Funded / expired -->
		<div
			v-else-if="isFunded"
			class="tw-w-full tw-text-center tw-rounded tw-p-2"
			style="background: #f1f1f1;"
		>
			This loan was just funded! 🎉
		</div>

		<kv-ui-button
			v-else-if="showViewLoan"
			:state="`${allSharesReserved ? 'disabled' : ''}`"
			:to="!externalLinks ? readMorePath : undefined"
			:href="externalLinks ? readMorePath : undefined"
			class="tw-mb-0"
			@click="$emit('show-loan-details', $event)"
		>
			<span class="tw-flex">
				View loan
				<kv-material-icon
					class="tw-w-3 tw-h-3 tw-align-middle"
					:icon="mdiChevronRight"
				/>
			</span>
		</kv-ui-button>

		<!-- Lend (form submit) -->
		<form
			v-else-if="useFormSubmit"
			class="tw-w-full tw-flex"
			@submit.prevent="addToBasket"
		>
			<!-- ===== MOBILE-ONLY  ===== -->
			<div class="md:tw-hidden tw-w-full">
				<fieldset
					class="tw-w-full tw-min-w-0"
					:disabled="isAdding"
					data-testid="bp-lend-cta-select-and-button-mobile"
				>
					<!-- Show preset buttons and dropdown only when not adding -->
					<template v-if="!isAdding">
						<!-- Row 1: Preset buttons -->
						<div class="tw-flex tw-gap-1 lg:tw-gap-2">
							<template v-if="!isLendAmountButton">
								<kv-ui-button
									v-for="option in presetButtonsPrices"
									:key="'m-'+option"
									variant="secondary"
									class="preset-option tw-basis-0 tw-flex-1 tw-min-w-0"
									:class="{ 'selected-option': selectedOption == option }"
									data-testid="bp-lend-cta-lend-button-mobile"
									@click="clickPresetButton(option)"
								>
									${{ option }}
								</kv-ui-button>
							</template>
							<!-- Only show the dropdown inline if viewport > 325px -->
							<kv-ui-select
								v-if="showFilteredDropdown && viewportWidth > 325"
								:id="`LoanAmountDropdownMobile_${loanId}`"
								v-model="selectedDropdownOption"
								class="filtered-dropdown tw-rounded tw-w-auto tw-flex-none mobile-other-dd tw-min-w-max"
								:class="{
									'unselected-dropdown': !selectedDropdown,
									'selected-dropdown': selectedDropdown,
								}"
								aria-label="Lend amount"
								@update:modelValue="trackLendAmountSelection"
								@click.native.stop="clickDropdown"
							>
								<option
									v-for="priceOption in presetDropdownPrices"
									:key="'m-'+priceOption"
									:value="priceOption"
								>
									{{ priceOption !== OTHER_OPTION ? `$${priceOption}` : priceOption }}
								</option>
							</kv-ui-select>
						</div>
						<!-- Row 2: For ≤325px, show dropdown + CTA inline here -->
						<div
							v-if="viewportWidth <= 325"
							class="tw-flex tw-gap-1 tw-mt-1"
						>
							<kv-ui-select
								v-if="showFilteredDropdown"
								:id="`LoanAmountDropdownMobile_${loanId}`"
								v-model="selectedDropdownOption"
								class="filtered-dropdown tw-rounded tw-w-auto tw-flex-none mobile-other-dd"
								:class="{
									'unselected-dropdown': !selectedDropdown,
									'selected-dropdown': selectedDropdown,
								}"
								aria-label="Lend amount"
								style="min-width: 90px; max-width: 110px;"
								@update:modelValue="trackLendAmountSelection"
								@click.native.stop="clickDropdown"
							>
								<option
									v-for="priceOption in presetDropdownPrices"
									:key="'m-'+priceOption"
									:value="priceOption"
								>
									{{ priceOption !== OTHER_OPTION ? `$${priceOption}` : priceOption }}
								</option>
							</kv-ui-select>
							<kv-ui-button
								v-if="lendButtonVisibility && !isLessThan25 && !hideLendButton"
								key="lendButtonMobile"
								class="button-ellipsis tw-flex-1"
								data-testid="bp-lend-cta-lend-button-mobile"
								type="submit"
							>
								{{ ctaButtonText }}
							</kv-ui-button>
						</div>
						<!-- Row 2: CTA button (full width) for >325px -->
						<div
							v-else
							class="tw-mt-1 mobile-cta-row"
						>
							<kv-ui-button
								v-if="lendButtonVisibility && !isLessThan25 && !hideLendButton"
								key="lendButtonMobile"
								class="button-ellipsis tw-w-full"
								data-testid="bp-lend-cta-lend-button-mobile"
								type="submit"
							>
								{{ ctaButtonText }}
							</kv-ui-button>
						</div>
					</template>

					<!-- Adding to basket state (mobile) -->
					<kv-ui-button
						v-if="!isLoading && isAdding"
						class="tw-inline-flex tw-flex-1 tw-w-full"
					>
						Adding to basket
					</kv-ui-button>

					<!-- Stranded loans (mobile) -->
					<kv-lend-amount-button
						v-if="isLendAmountButton && !enableFiveDollarsNotes"
						class="tw-w-full"
						:loan-id="loanId"
						:show-now="false"
						:amount-left="amountForLendAmountButton"
						:is-adding="isAdding"
						@add-to-basket="addToBasket"
					/>
				</fieldset>
			</div>
			<!-- ===== END MOBILE-ONLY ===== -->

			<!-- ===== DESKTOP/TABLET (original) ===== -->
			<div class="tw-hidden md:tw-block tw-w-full">
				<fieldset
					class="tw-w-full tw-flex"
					:class="{
						'tw-flex-col md:tw-flex-row md:tw-justify-between tw-min-w-0': showPresetAmounts,
						'tw-gap-1.5': showPresetAmounts && !isLendAmountButton
					}"
					:disabled="isAdding"
					data-testid="bp-lend-cta-select-and-button"
				>
					<div
						v-if="showPresetAmounts && !isAdding"
						class="tw-flex tw-gap-1 lg:tw-gap-2 tw-flex-wrap md:tw-flex-nowrap"
					>
						<template v-if="!isLendAmountButton">
							<kv-ui-button
								v-for="option in presetButtonsPrices"
								:key="option"
								variant="secondary"
								class="tw-inline-flex tw-flex-1 preset-option tw-w-8"
								:class="{'selected-option': selectedOption == option }"
								data-testid="bp-lend-cta-lend-button"
								@click="clickPresetButton(option)"
							>
								${{ option }}
							</kv-ui-button>
						</template>
						<kv-ui-select
							v-if="showFilteredDropdown"
							:id="`LoanAmountDropdown_${loanId}`"
							v-model="selectedDropdownOption"
							class="tw-min-w-12 tw-rounded filtered-dropdown tw-w-full"
							:class="{
								'unselected-dropdown': !selectedDropdown,
								'selected-dropdown': selectedDropdown,
							}"
							aria-label="Lend amount"
							@update:modelValue="trackLendAmountSelection"
							@click.native.stop="clickDropdown"
						>
							<option
								v-for="priceOption in presetDropdownPrices"
								:key="priceOption"
								:value="priceOption"
							>
								{{ priceOption !== OTHER_OPTION ? `$${priceOption}` : priceOption }}
							</option>
						</kv-ui-select>
					</div>

					<div
						v-else-if="!showPresetAmounts"
						class="amountDropdownWrapper"
					>
						<kv-ui-select
							v-if="hideShowLendDropdown && !isLessThan25"
							:id="`LoanAmountDropdown_${loanId}`"
							v-model="selectedOption"
							class="tw-min-w-12"
							style="border-radius: 14px 0 0 14px;"
							aria-label="Lend amount"
							@update:modelValue="trackLendAmountSelection"
							@click.native.stop="clickDropdown"
						>
							<option
								v-for="priceOption in prices"
								:key="priceOption"
								:value="priceOption"
							>
								${{ priceOption }}
							</option>
						</kv-ui-select>
					</div>

					<!-- Lend button -->
					<div
						:class="{
							'tw-min-w-0': showPresetAmounts,
							'lendButtonWrapper': hideShowLendDropdown && !showPresetAmounts,
							'tw-hidden': hideLendButton,
						}"
					>
						<kv-ui-button
							v-if="lendButtonVisibility && !isLessThan25"
							key="lendButton"
							class="tw-inline-flex tw-flex-1"
							:class="{ 'button-ellipsis tw-w-full': showPresetAmounts }"
							data-testid="bp-lend-cta-lend-button"
							type="submit"
						>
							{{ ctaButtonText }}
						</kv-ui-button>

						<!-- Lend again/lent previously button -->
						<kv-ui-button
							v-else-if="showLendAgain"
							key="lendAgainButton"
							class="lend-again"
							:class="{'tw-w-full': showPresetAmounts }"
							data-testid="bp-lend-cta-lend-again-button"
							type="submit"
						>
							{{ primaryButtonText || 'Lend' }} again
						</kv-ui-button>
					</div>

					<!-- Stranded loans -->
					<kv-lend-amount-button
						v-if="isLendAmountButton && !enableFiveDollarsNotes"
						class="tw-w-full"
						:loan-id="loanId"
						:show-now="false"
						:amount-left="amountForLendAmountButton"
						:is-adding="isAdding"
						@add-to-basket="addToBasket"
					/>

					<!-- Adding to basket -->
					<kv-ui-button
						v-if="!isLoading && isAdding"
						class="tw-inline-flex tw-flex-1"
					>
						Adding to basket
					</kv-ui-button>
				</fieldset>
			</div>
			<!-- ===== END DESKTOP/TABLET ===== -->
		</form>
	</div>
</template>

<script>
import gql from 'graphql-tag';
import { mdiChevronRight } from '@mdi/js';
import { throttle } from '../utils/throttle';
import { getLendCtaSelectedOption, getDropdownPriceArray } from '../utils/loanUtils';
import KvLendAmountButton from './KvLendAmountButton.vue';
import KvUiSelect from './KvSelect.vue';
import KvUiButton from './KvButton.vue';
import KvMaterialIcon from './KvMaterialIcon.vue';

const OTHER_OPTION = 'Other';

// Use this fragment to get the necessary public data for this component
export const KV_LEND_CTA_FRAGMENT = gql`
    fragment KvLendCta on LoanBasic {
        id
        name
        status
        minNoteSize
    }
`;

// Use this fragment to get the necessary private/user data for this component
export const KV_LEND_CTA_USER_FRAGMENT = gql`
    fragment KvLendCtaUser on LoanBasic {
        id
        userProperties {
            lentTo
        }
    }
`;

export default {
	name: 'KvLendCta',
	components: {
		KvLendAmountButton,
		KvUiButton,
		KvUiSelect,
		KvMaterialIcon,
	},
	props: {
		loan: {
			type: Object,
			default: () => ({}),
		},
		unreservedAmount: {
			type: String,
			default: '',
		},
		basketItems: {
			type: Array,
			default: () => ([]),
		},
		isLoading: {
			type: Boolean,
			default: true,
		},
		isAdding: {
			type: Boolean,
			default: false,
		},
		enableFiveDollarsNotes: {
			type: Boolean,
			default: false,
		},
		kvTrackFunction: {
			type: Function,
			required: true,
		},
		showViewLoan: {
			type: Boolean,
			default: false,
		},
		customLoanDetails: {
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
		isVisitor: {
			type: Boolean,
			default: true,
		},
		primaryButtonText: {
			type: String,
			default: 'Lend',
		},
		secondaryButtonText: {
			type: String,
			default: undefined,
		},
		secondaryButtonHandler: {
			type: Function,
			default: undefined,
		},
		/**
         * Hide preset buttons under this amount when
         * showPresetAmounts is true
         * */
		maxAmount: {
			type: String,
			default: '',
		},
		showPresetAmounts: {
			type: Boolean,
			default: false,
		},
		kvTrackCategory: {
			type: String,
			default: 'Lending',
		},
	},
	data() {
		return {
			mdiChevronRight,
			defaultAmountOptions: [25, 50, 75],
			selectedOption: getLendCtaSelectedOption(
				this.getCookie,
				this.setCookie,
				this.enableFiveDollarsNotes,
				this.route?.query?.utm_campaign,
				this.unreservedAmount,
				this.userBalance,
				this.fiveDollarsSelected,
			),
			selectedDropdownOption: OTHER_OPTION,
			OTHER_OPTION,
			// SSR-safe viewport width initialization
			viewportWidth: typeof window !== 'undefined' ? window.innerWidth : 1024,
			resizeHandler: undefined,
		};
	},
	computed: {
		readMorePath() {
			return this.customLoanDetails ? '' : `/lend/${this.loanId}`;
		},
		loanId() {
			return this.loan?.id;
		},
		status() {
			return this.loan?.status ?? '';
		},
		minNoteSize() {
			return this.loan?.minNoteSize ?? '';
		},
		lentPreviously() {
			return this.loan?.userProperties?.lentTo ?? false;
		},
		isInBasket() {
			return this.basketItems
			// eslint-disable-next-line no-underscore-dangle
				?.some((item) => item.__typename === 'LoanReservation' && item.id === this.loanId) ?? false;
		},
		prices() {
			// We don't want to open up $5 loan shares for loans with more than $25 at this time
			// If we wanted to show this interface on loans with less than 25 remaining they would see the selector
			const minAmount = parseFloat(this.unreservedAmount < 25 ? this.minNoteSize : 25);

			const priceArray = getDropdownPriceArray(
				this.unreservedAmount,
				this.isCompleteLoanActive,
				minAmount,
				this.enableFiveDollarsNotes,
				this.isVisitor,
			);
			// Limit price options based on the maxAmount
			if (this.maxAmount) {
				return priceArray.filter((price) => parseFloat(price) <= parseFloat(this.maxAmount));
			}
			return priceArray;
		},
		presetButtonsPrices() {
			const prices = this.prices.slice(0, 3);

			// Show only one extra option as button
			if (this.prices.length === 4) {
				prices.push(this.prices[3]);
			}

			return prices;
		},
		presetDropdownPrices() {
			// Hide dropdown if there is only one option
			if (this.prices.length === 4) {
				return [];
			}

			const extraDropdownPrices = this.prices.slice(this.defaultAmountOptions.length);
			extraDropdownPrices.unshift(OTHER_OPTION);

			return extraDropdownPrices;
		},
		loanName() {
			return this.loan?.name ?? '';
		},
		presetAmountCtaButtonText() {
			return this.loan?.borrowerCount > 1 ? 'Support' : `Support ${this.loanName}`;
		},
		defaultCtaButtonText() {
			if (this.showPresetAmounts) return this.presetAmountCtaButtonText;
			return this.primaryButtonText || 'Lend';
		},
		ctaButtonText() {
			switch (this.state) {
				case 'loading':
					return 'Loading...';
				case 'refunded':
				case 'expired':
				default:
					return this.defaultCtaButtonText;
			}
		},
		loanInBasketButtonText() {
			if (this.secondaryButtonText) {
				return this.secondaryButtonText;
			}

			return this.showPresetAmounts ? 'Continue to basket' : 'Checkout now';
		},
		useFormSubmit() {
			if (this.hideShowLendDropdown
                || this.lendButtonVisibility
                || this.showLendAgain
                || this.state === 'lent-to'
                || this.isAdding) {
				return true;
			}
			return false;
		},
		state() {
			if (this.isLoading) {
				return 'loading';
			}
			if (this.isAdding) {
				return 'adding';
			}
			if (this.isInBasket) {
				return 'basketed';
			}
			if (this.status === 'funded' || this.status === 'refunded' || this.status === 'expired') {
				return this.status;
			}
			if (this.allSharesReserved) {
				return 'fully-reserved';
			}
			if (this.lentPreviously) {
				return 'lent-to';
			}
			return 'lend';
		},
		lendButtonVisibility() {
			return this.state === 'lend' || this.state === 'loading';
		},
		showNonActionableLoanButton() {
			return this.state === 'refunded'
                || this.state === 'expired';
		},
		hideShowLendDropdown() {
			return this.state === 'lend' || this.state === 'lent-to';
		},
		allSharesReserved() {
			if (parseFloat(this.unreservedAmount) === 0) {
				return true;
			}
			return false;
		},
		isLessThan25() {
			// For $5 dollars notes we need to show the dropdown
			if (this.enableFiveDollarsNotes) return false;
			return this.isAmountLessThan25(this.unreservedAmount);
		},
		isLentTo() {
			return this.state === 'lent-to';
		},
		isCompleteLoanActive() {
			return (this.isAmountLessThan25(this.unreservedAmount)
                || this.isAmountBetween25And500(this.unreservedAmount));
		},
		isLendAmountButton() {
			const amountToUse = this.maxAmount ? this.maxAmount : this.unreservedAmount;
			return ((this.lendButtonVisibility || this.state === 'lent-to')
                && this.isAmountLessThan25(amountToUse))
                || (this.showPresetAmounts && this.presetButtonsPrices.length === 1 && !this.isAdding);
		},
		isFunded() {
			return this.state === 'funded' || this.state === 'fully-reserved';
		},
		amountToLend() {
			if (this.selectedDropdown) {
				return this.selectedDropdownOption;
			}
			return this.isLessThan25 ? this.unreservedAmount : this.selectedOption;
		},
		amountForLendAmountButton() {
			if (this.maxAmount && parseFloat(this.maxAmount) === 25) {
				// return whichever amount is less either maxAmount or unreservedAmount
				return Math.min(parseFloat(this.maxAmount), parseFloat(this.unreservedAmount));
			}
			return this.unreservedAmount;
		},
		showLendAgain() {
			return this.isLentTo && !this.isLessThan25;
		},
		selectedDropdown() {
			return this.selectedDropdownOption !== OTHER_OPTION;
		},
		showFilteredDropdown() {
			return this.presetDropdownPrices.length > 1;
		},
		hideLendButton() {
			return this.showPresetAmounts && (this.isAdding || this.presetButtonsPrices.length === 1);
		},
	},
	watch: {
		unreservedAmount(newValue, previousValue) {
			if (newValue !== previousValue && previousValue === '') {
				this.selectedOption = getLendCtaSelectedOption(
					this.getCookie,
					this.setCookie,
					this.enableFiveDollarsNotes,
					this.route?.query?.utm_campaign,
					newValue,
					this.userBalance,
					this.fiveDollarsSelected,
					this.showPresetAmounts,
				);
			}

			if (this.showPresetAmounts) {
				this.selectedOption = OTHER_OPTION;
			}
		},
	},
	mounted() {
		if (typeof window !== 'undefined') {
			this.viewportWidth = window.innerWidth;
			this.resizeHandler = throttle(() => {
				this.viewportWidth = window.innerWidth;
			}, 50);

			window.addEventListener('resize', this.resizeHandler);
		}
	},
	beforeDestroy() {
		if (this.resizeHandler && typeof window !== 'undefined') {
			window.removeEventListener('resize', this.resizeHandler);
		}
	},
	methods: {
		async addToBasket() {
			this.kvTrackFunction(
				this.kvTrackCategory,
				'Add to basket',
				this.showLendAgain ? 'Lend again' : 'lend-button-click',
				this.loanId,
				this.amountToLend,
			);
			this.$emit('add-to-basket', this.amountToLend);
		},
		isAmountLessThan25(unreservedAmount) {
			return unreservedAmount < 25 && unreservedAmount > 0;
		},
		isAmountBetween25And50(unreservedAmount) {
			return unreservedAmount <= 50 && unreservedAmount > 25;
		},
		isAmountBetween25And500(unreservedAmount) {
			return unreservedAmount < 500 && unreservedAmount >= 25;
		},
		trackLendAmountSelection(selectedDollarAmount) {
			if (this.showPresetAmounts) {
				this.selectedOption = null;
			}

			this.kvTrackFunction(
				this.kvTrackCategory,
				'Modify lend amount',
				selectedDollarAmount,
				this.loanId,
				this.loanId,
			);
		},
		clickDropdown() {
			this.kvTrackFunction(
				this.kvTrackCategory, 'click-Modify loan amount', 'open dialog', this.loanId, this.loanId,
			);
		},
		clickSecondaryButton(event) {
			if (this.secondaryButtonHandler) {
				event.preventDefault();
				event.stopPropagation();
				// Custom secondary button behavior
				this.secondaryButtonHandler();
			} else {
				// Default secondary button behavior
				this.handleCheckout();
			}
		},
		clickPresetButton(selectedDollarAmount) {
			this.kvTrackFunction(
				this.kvTrackCategory, 'Modify lend amount', selectedDollarAmount, this.loanId, this.loanId,
			);
			this.selectedOption = selectedDollarAmount;
			this.selectedDropdownOption = OTHER_OPTION;
		},
		handleCheckout() {
			this.kvTrackFunction(
				this.kvTrackCategory,
				'click-Continue-to-checkout',
				'Continue to checkout',
				this.loanId,
				this.loanId,
			);
		},
	},
};
</script>

<style lang="postcss" scoped>
.amountDropdownWrapper :deep(select) {
    border-radius: 14px 0 0 14px;
}

.lend-again :deep(span) {
    @apply tw-px-0;
}

.lend-again :deep(span) {
    @apply tw-px-1;
}

.lendButtonWrapper :deep(span:first-child) {
    border-radius: 0 14px 14px 0;
}

.filtered-dropdown :deep(select) {
    @apply tw-rounded tw-border-2 tw-font-medium tw-cursor-pointer tw-whitespace-nowrap;
}

.unselected-dropdown :deep(select) {
    @apply tw-border-gray-400;
}

.preset-option :deep(span.tw-w-full:first-child) {
    @apply tw-border-2 tw-border-gray-400;
}

.selected-dropdown :deep(select), .selected-option :deep(span.tw-w-full:first-child) {
    @apply tw-border-action tw-bg-secondary;
}

/* CTA label truncates; allows sharing row if needed elsewhere */
.button-ellipsis :deep(span > span) {
    @apply tw-min-w-0 tw-text-ellipsis tw-overflow-hidden tw-whitespace-nowrap;
}

@media (max-width: 325px) {
    [data-testid="bp-lend-cta-select-and-button-mobile"] > div.tw-flex {
        @apply tw-flex-wrap;
    }

    .mobile-other-dd {
        flex: 0 0 100px !important;
        min-width: 100px !important;
        max-width: 100px !important;
        width: 100px !important;
    }

    .button-ellipsis {
        flex: 1 1 0%;
        min-width: 0;
    }
}
</style>
