<template>
	<div class="tw-whitespace-nowrap">
		<kv-cart-pill
			v-if="showPill && showPresetAmounts"
			:borrower-name="loanName"
			class="!tw-w-full tw-justify-center tw-pb-2"
		>
			<template #icon>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="25"
					height="24"
					viewBox="0 0 25 24"
					fill="none"
					class="tw-min-w-3"
				>
					<mask
						id="mask0_5025_974"
						style="mask-type:alpha"
						maskUnits="userSpaceOnUse"
						x="0"
						y="0"
						width="25"
						height="24"
					>
						<rect
							x="0.5"
							width="24"
							height="24"
							fill="#D9D9D9"
						/>
					</mask>
					<g mask="url(#mask0_5025_974)">
						<!-- eslint-disable max-len -->
						<path
							d="M12.5001 21L9.1251 22.125C9.00843 22.1583 8.9001 22.1833 8.8001 22.2C8.7001 22.2167 8.6001 22.225 8.5001 22.225C7.96676 22.225 7.5001 22.0375 7.1001 21.6625C6.7001 21.2875 6.5001 20.8083 6.5001 20.225V14.775L3.9001 10.55C3.8001 10.3833 3.7251 10.2125 3.6751 10.0375C3.6251 9.8625 3.6001 9.68333 3.6001 9.5C3.6001 9.31667 3.6251 9.1375 3.6751 8.9625C3.7251 8.7875 3.8001 8.61667 3.9001 8.45L7.3001 2.95C7.48343 2.65 7.7251 2.41667 8.0251 2.25C8.3251 2.08333 8.6501 2 9.0001 2H16.0001C16.3501 2 16.6751 2.08333 16.9751 2.25C17.2751 2.41667 17.5168 2.65 17.7001 2.95L21.1001 8.45C21.2001 8.61667 21.2751 8.7875 21.3251 8.9625C21.3751 9.1375 21.4001 9.31667 21.4001 9.5C21.4001 9.68333 21.3751 9.8625 21.3251 10.0375C21.2751 10.2125 21.2001 10.3833 21.1001 10.55L18.5001 14.775V20.225C18.5001 20.8083 18.3001 21.2875 17.9001 21.6625C17.5001 22.0375 17.0334 22.225 16.5001 22.225C16.4001 22.225 16.3001 22.2167 16.2001 22.2C16.1001 22.1833 15.9918 22.1583 15.8751 22.125L12.5001 21ZM9.0001 15H16.0001L19.4001 9.5L16.0001 4H9.0001L5.6001 9.5L9.0001 15ZM11.4501 10.75L14.9751 7.2C15.1584 7 15.3876 6.90417 15.6626 6.9125C15.9376 6.92083 16.1751 7.01667 16.3751 7.2C16.5751 7.4 16.6793 7.6375 16.6876 7.9125C16.6959 8.1875 16.6001 8.425 16.4001 8.625L12.1501 12.875C11.9501 13.075 11.7168 13.175 11.4501 13.175C11.1834 13.175 10.9501 13.075 10.7501 12.875L8.6251 10.75C8.4251 10.55 8.3251 10.3125 8.3251 10.0375C8.3251 9.7625 8.4251 9.525 8.6251 9.325C8.8251 9.125 9.0626 9.025 9.3376 9.025C9.6126 9.025 9.8501 9.125 10.0501 9.325L11.4501 10.75Z"
							fill="#757575"
						/>
						<!-- eslint-enable max-len -->
					</g>
				</svg>
			</template>
		</kv-cart-pill>

		<!-- Continue to checkout button -->
		<kv-ui-button
			v-if="isInBasket"
			variant="secondary"
			class="tw-inline-flex tw-flex-1"
			:class="{ 'tw-w-full': showPresetAmounts }"
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

		<form
			v-else-if="useFormSubmit"
			class="tw-w-full tw-flex"
			@submit.prevent="addToBasket"
		>
			<fieldset
				class="tw-w-full tw-flex"
				:class="{
					'tw-flex-col md:tw-flex-row md:tw-justify-between': showPresetAmounts,
					'tw-gap-1.5': showPresetAmounts && !isLendAmountButton
				}"
				:disabled="isAdding"
				data-testid="bp-lend-cta-select-and-button"
			>
				<div
					v-if="showPresetAmounts && !isAdding"
					class="tw-flex tw-gap-1 lg:tw-gap-2"
					:class="{'tw-flex-wrap md:tw-flex-nowrap': enableHugeAmount}"
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
						class="tw-min-w-12 tw-rounded filtered-dropdown"
						:class="{
							'unselected-dropdown': !selectedDropdown,
							'selected-dropdown': selectedDropdown,
							'tw-w-full': enableHugeAmount
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
						'lendButtonWrapper': hideShowLendDropdown && !showPresetAmounts,
						'tw-hidden': hideLendButton,
					}"
				>
					<kv-ui-button
						v-if="lendButtonVisibility && !isLessThan25"
						key="lendButton"
						class="tw-inline-flex tw-flex-1"
						:class="{'tw-w-full': showPresetAmounts }"
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
					:amount-left="unreservedAmount"
					:is-adding="isAdding"
					@add-to-basket="addToBasket"
				/>

				<!-- Adding to basket button -->
				<kv-ui-button
					v-if="!isLoading && isAdding"
					class="tw-inline-flex tw-flex-1"
				>
					Adding to basket
				</kv-ui-button>
			</fieldset>
		</form>
	</div>
</template>

<script>
import gql from 'graphql-tag';
import { mdiChevronRight } from '@mdi/js';
import { getLendCtaSelectedOption, getDropdownPriceArray } from '../utils/loanUtils';
import KvLendAmountButton from './KvLendAmountButton.vue';
import KvUiSelect from './KvSelect.vue';
import KvUiButton from './KvButton.vue';
import KvMaterialIcon from './KvMaterialIcon.vue';
import KvCartPill from './KvCartPill.vue';

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
		KvCartPill,
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
		enableHugeAmount: {
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
		showPresetAmounts: {
			type: Boolean,
			default: false,
		},
		kvTrackCategory: {
			type: String,
			default: 'Lending',
		},
		showPill: {
			type: Boolean,
			default: false,
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
			// Limit price options
			return getDropdownPriceArray(
				this.unreservedAmount,
				this.isCompleteLoanActive,
				minAmount,
				this.enableFiveDollarsNotes,
				this.enableHugeAmount,
				this.isVisitor,
			);
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
			return ((this.lendButtonVisibility || this.state === 'lent-to')
				&& this.isAmountLessThan25(this.unreservedAmount))
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
	@apply tw-rounded tw-border-2 tw-font-medium tw-cursor-pointer;
}

.unselected-dropdown :deep(select) {
	@apply tw-border-gray-400;
}

.selected-dropdown :deep(select) {
	@apply tw-border-eco-green-4;
}

.preset-option :deep(span.tw-w-full:first-child) {
	@apply tw-border-2 tw-border-gray-400;
}

.selected-option :deep(span.tw-w-full:first-child) {
	@apply tw-border-action;
}
</style>
