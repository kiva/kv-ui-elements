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
				:class="{'tw-flex-col tw-gap-1': showPresetAmounts}"
				:disabled="isAdding"
				data-testid="bp-lend-cta-select-and-button"
			>
				<div
					v-if="showPresetAmounts"
					class="tw-flex tw-gap-1"
				>
					<template v-if="!showUnreservedAmountOnly">
						<kv-ui-button
							v-for="option in defaultAmountOptions"
							:key="option"
							:state="`${ unreservedAmount < option ? 'disabled' : ''}`"
							variant="secondary"
							class="tw-inline-flex tw-flex-1 preset-option"
							:class="{'selected-option': selectedButtonOption === option }"
							data-testid="bp-lend-cta-lend-button"
							type="submit"
							@click="selectedButtonOption = option"
						>
							${{ option }}
						</kv-ui-button>
						<kv-ui-select
							v-if="hideShowLendDropdown"
							:id="`LoanAmountDropdown_${loanId}`"
							v-model="selectedOption"
							:disabled="unreservedAmount <= defaultAmountOptions[2]"
							class="tw-min-w-12 tw-rounded filtered-dropdown"
							:class="{'unselected-dropdown': !selectedDropdown, 'selected-dropdown': selectedDropdown}"
							aria-label="Lend amount"
							@update:modelValue="trackLendAmountSelection"
							@click.native.stop="clickDropdown"
						>
							<option
								v-for="priceOption in presetDropdownPrices"
								:key="priceOption"
								:value="priceOption"
							>
								{{ isNaN(priceOption) ? priceOption : `$${priceOption}` }}
							</option>
						</kv-ui-select>
					</template>
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
				<div :class="{ 'lendButtonWrapper': hideShowLendDropdown && !showPresetAmounts}">
					<kv-ui-button
						v-if="lendButtonVisibility && !isLessThan25 && !showUnreservedAmountOnly"
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
					v-if="isLendAmountButton && !enableFiveDollarsNotes || showUnreservedAmountOnly"
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
	},
	data() {
		return {
			mdiChevronRight,
			selectedOption: this.showPresetAmounts ? 'Other' : getLendCtaSelectedOption(
				this.getCookie,
				this.setCookie,
				this.enableFiveDollarsNotes,
				this.route?.query?.utm_campaign,
				this.loan?.unreservedAmount,
				this.userBalance,
				this.fiveDollarsSelected,
			),
			defaultAmountOptions: [25, 50, 75],
			selectedButtonOption: getLendCtaSelectedOption(
				this.getCookie,
				this.setCookie,
				this.enableFiveDollarsNotes,
				this.route?.query?.utm_campaign,
				this.loan?.unreservedAmount,
				this.userBalance,
				this.fiveDollarsSelected,
			),
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
		presetDropdownPrices() {
			const extraDropdownPrices = this.prices.slice(this.defaultAmountOptions.length);
			extraDropdownPrices.unshift('Other');

			return extraDropdownPrices;
		},
		ctaButtonText() {
			if (this.showPresetAmounts) {
				return this.loan?.borrowerCount > 1 ? 'Support' : `Support ${this.loan?.name}`;
			}
			if (this.isCompleteLoanActive) {
				return this.primaryButtonText || 'Lend';
			}
			switch (this.state) {
				case 'loading':
					return 'Loading...';
				case 'refunded':
				case 'expired':
				default:
					return this.primaryButtonText || 'Lend';
			}
		},
		loanInBasketButtonText() {
			return this.secondaryButtonText;
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
			if (this.showPresetAmounts && this.selectedButtonOption) {
				return this.showUnreservedAmountOnly ? this.unreservedAmount : this.selectedButtonOption;
			}
			return this.isLessThan25 ? this.unreservedAmount : this.selectedOption;
		},
		showLendAgain() {
			return this.isLentTo && !this.isLessThan25;
		},
		selectedDropdown() {
			return !this.selectedButtonOption;
		},
		showUnreservedAmountOnly() {
			return this.showPresetAmounts && (this.unreservedAmount > 25 && this.unreservedAmount % 25 !== 0);
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
				'Lending',
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
				this.selectedButtonOption = null;
			}

			this.kvTrackFunction(
				'Lending',
				'Modify lend amount',
				selectedDollarAmount,
				this.loanId,
				this.loanId,
			);
		},
		clickDropdown() {
			this.kvTrackFunction('Lending', 'click-Modify loan amount', 'open dialog', this.loanId, this.loanId);
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
		handleCheckout() {
			this.kvTrackFunction(
				'Lending',
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
.amountDropdownWrapper >>> select {
	border-radius: 14px 0 0 14px;
}

.lend-again >>> span {
	@apply tw-px-0;
}

.lend-again >>> span {
	@apply tw-px-1;
}

.lendButtonWrapper >>> span:first-child {
	border-radius: 0 14px 14px 0;
}

.filtered-dropdown >>> select {
	@apply tw-rounded tw-border-2 tw-font-medium;
}

.unselected-dropdown >>> select {
	@apply tw-border-gray-400;
}

.selected-dropdown >>> select {
	@apply tw-border-eco-green-4;
}

.preset-option >>> span.tw-w-full:first-child {
	@apply tw-border-2 tw-border-gray-400;
}

.selected-option >>> span.tw-w-full:first-child {
	@apply tw-border-eco-green-4;
}
</style>
