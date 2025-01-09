<template>
	<div class="tw-whitespace-nowrap">
		<!-- Continue to checkout button -->
		<kv-ui-button
			v-if="isInBasket"
			variant="secondary"
			class="tw-inline-flex tw-flex-1"
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
				:class="{'tw-flex-col tw-gap-1 md:tw-flex-row md:tw-justify-between': showPresetAmounts}"
				:disabled="isAdding"
				data-testid="bp-lend-cta-select-and-button"
			>
				<div
					v-if="showPresetAmounts"
					class="tw-flex tw-gap-1"
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
							{{ priceOption !== 'Other' ? `$${priceOption}` : priceOption }}
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
						'tw-hidden': isAdding && showPresetAmounts
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
import { mdiChevronRight } from '@mdi/js';
import KvLendAmountButton from './KvLendAmountButton.vue';
import KvUiSelect from './KvSelect.vue';
import KvUiButton from './KvButton.vue';
import KvMaterialIcon from './KvMaterialIcon.vue';
import { getLendCtaSelectedOption, getDropdownPriceArray } from '../utils/loanUtils';

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
			default: 'Checkout now',
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
				this.loan?.unreservedAmount,
				this.userBalance,
				this.fiveDollarsSelected,
			),
			selectedDropdownOption: 'Other',
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
		unreservedAmount() {
			return this.loan?.unreservedAmount ?? '';
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
			extraDropdownPrices.unshift('Other');

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
			return this.showPresetAmounts ? 'Continue to basket' : this.secondaryButtonText;
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
				&& this.isAmountLessThan25(this.unreservedAmount));
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
			return this.selectedDropdownOption !== 'Other';
		},
		showFilteredDropdown() {
			return this.presetDropdownPrices.length > 1;
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
				this.selectedOption = 'Other';
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
	@apply tw-border-eco-green-4;
}
</style>
