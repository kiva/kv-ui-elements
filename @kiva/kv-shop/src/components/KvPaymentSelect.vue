<template>
	<div class="kv-payment-select tw-text-center">
		<div
			ref="container"
			class="data-hj-suppress"
			data-testid="braintree-drop-in"
		></div>
		<kv-loading-spinner
			v-if="updatingPaymentWrapper"
			class="tw-mb-2"
		/>
	</div>
</template>

<script lang="ts">
import {
	defineComponent, onMounted, ref, toRefs, watch,
} from 'vue-demi';
import KvLoadingSpinner from '@kiva/kv-components/vue/KvLoadingSpinner.vue';
import type { PropType } from 'vue-demi';
import useBraintreeDropIn, { defaultPaymentTypes } from '../useBraintreeDropIn';
import type { PayPalFlowType, PaymentType } from '../useBraintreeDropIn';

export default defineComponent({
	components: {
		KvLoadingSpinner,
	},
	props: {
		amount: {
			type: [String, Number],
			default: '',
		},
		/**
		 * Braintree authorization token.
		 */
		authToken: {
			type: String,
			required: true,
		},
		/**
		 * Braintree Drop In instance name.
		 */
		dropInName: {
			type: String,
			default: 'default',
		},
		/**
		 * Paypal flow options.
		 * Must be 'checkout' or 'vault'
		* */
		flow: {
			type: String as PropType<PayPalFlowType>,
			default: 'checkout',
		},
		/**
		 * Google Pay merchant ID
		 * Required if using the 'googlePay' option (which is on by default)
		 */
		googlePayMerchantId: {
			type: String,
			default: '',
		},
		/**
		 * Payment type options to be displayed.
		 * Also controls the order to display them in.
		 * All options in default order:
		 * ['card', 'paypal', 'paypalCredit', 'venmo', 'applePay', 'googlePay']
		* */
		paymentTypes: {
			type: Array as PropType<PaymentType[]>,
			default: () => defaultPaymentTypes,
		},
		/**
		 * Preselect Vaulted Payment Method
		 * Braintree option to preselect payment method
		* */
		preselectVaultedPaymentMethod: {
			type: Boolean,
			default: true,
		},
	},
	emits: ['transactions-enabled', 'error'],
	setup(props, { emit }) {
		const {
			amount,
			authToken,
			flow,
			googlePayMerchantId,
			paymentTypes,
			preselectVaultedPaymentMethod,
		} = toRefs(props);
		const container = ref<HTMLInputElement | null>(null);
		const updatingPaymentWrapper = ref(false);
		const {
			initDropIn,
			paymentMethodRequestable,
			requestPaymentMethod,
			updateAmount,
		} = useBraintreeDropIn(props.dropInName);

		watch(amount, (newValue) => {
			updateAmount(newValue);
		});

		watch(paymentMethodRequestable, (newValue) => {
			emit('transactions-enabled', newValue);
		}, { immediate: true });

		onMounted(async () => {
			// Checking innerHTML prevents BT error in the case this component gets initialized multiple times
			if (container.value?.innerHTML === '') {
				updatingPaymentWrapper.value = true;
				try {
					await initDropIn({
						amount: amount.value,
						authToken: authToken.value,
						container: container.value,
						googlePayMerchantId: googlePayMerchantId.value,
						paymentTypes: paymentTypes.value,
						preselectVaultedPaymentMethod: preselectVaultedPaymentMethod.value,
						paypalFlow: flow.value,
					});
				} catch (e) {
					if (e instanceof Error) {
						emit('error', e?.message);
					} else {
						emit('error', 'An error has occured. Please refresh the page and try again.');
					}
				} finally {
					updatingPaymentWrapper.value = false;
				}
			}
		});

		return {
			container,
			updatingPaymentWrapper,
			requestPaymentMethod,
		};
	},
});
</script>

<style lang="postcss">
/*
These styles over write the default Braintree Drop In styles.
Use [data-braintree-id=""] selectors whenever possible as
Braintree guarantees that these will not be easily changed.
*/

/* Main DropIn */
.kv-payment-select .braintree-dropin {
	font-family: inherit;
}

/* General Braintree errors, failed to process, etc */
.kv-payment-select [data-braintree-id="sheet-error"] {
	@apply tw-bg-white;
}

/* Various text styles */
.kv-payment-select .braintree-method__label,
.kv-payment-select .braintree-option__label,
.kv-payment-select .braintree-methods--active .braintree-method__label,
.kv-payment-select .braintree-method .braintree-method__label .braintree-method__label--small {
	@apply tw-text-primary tw-text-left tw-font-book;
}

/* Saved payment methods container */
/* List of vaulted cards */
.kv-payment-select [data-braintree-id="methods-container"] .braintree-method--active {
	@apply tw-border tw-border-brand tw-bg-secondary;
}
.kv-payment-select [data-braintree-id="methods-container"] .braintree-method__check {
	padding: 0.3125rem;
	height: 1.95rem;
	width: 1.95rem;
	margin-right: 0.25rem;
	@apply tw-bg-brand;
}

/* Payment method 'sheet' or main content area */
.kv-payment-select [data-braintree-id="paypal"],
.kv-payment-select [data-braintree-id="applePay"],
.kv-payment-select [data-braintree-id="googlePay"],
.kv-payment-select [data-braintree-id="card"] {
	border: 0;
}

/* Credit Card payment content */
/* Main payment method content - either button or form */
/* Classes for input fields. - Credit Card Only */
/* Payment Method Form wrapper */
.kv-payment-select [data-braintree-id="card"] .braintree-sheet__content.braintree-sheet__content--form {
	padding: 0;
}
/* Form error colors */
.kv-payment-select [data-braintree-id="card"] .braintree-sheet__content .braintree-form__field-error {
	@apply tw-text-danger tw-text-left tw-font-medium;
}
/* Remove extra left padding from form field/label wrapper */
.kv-payment-select [data-braintree-id="card"] .braintree-sheet__content .braintree-form__field-group {
	padding-left: 0;
	margin-bottom: 1.25rem;
}
/* Invalid form field */
.kv-payment-select [data-braintree-id="card"] .braintree-sheet__content
.braintree-form__field-group.braintree-form__field-group--has-error .braintree-form__hosted-field {
	@apply tw-bg-danger/[0.15] tw-border-danger tw-rounded-sm;
}
/* Form fields */
.kv-payment-select [data-braintree-id="card"] .braintree-sheet__content
.braintree-form__field-group:not(.braintree-form__field-group--has-error)
.braintree-form__field:not(.braintree-form__checkbox) .braintree-form__hosted-field {
	@apply tw-text-tertiary tw-bg-secondary tw-rounded-sm tw-border-secondary;
}
/* Help text next to form label. */
.kv-payment-select [data-braintree-id="card"] .braintree-sheet__content span.braintree-form__descriptor {
	display: none;
}
/* Exp, CVV, and Postal Code groups */
.kv-payment-select [data-braintree-id="card"]
.braintree-sheet__content [data-braintree-id="expiration-date-field-group"],
.kv-payment-select [data-braintree-id="card"]
.braintree-sheet__content [data-braintree-id="cvv-field-group"],
.kv-payment-select [data-braintree-id="card"]
.braintree-sheet__content [data-braintree-id="postal-code-field-group"] {
	width: 49%;
	flex-basis: auto;
	flex-grow: unset;
}

/* Credit Card icons in form header */
.kv-payment-select [data-braintree-id="card-view-icons"] {
	padding-bottom: 0;
}
.kv-payment-select [data-braintree-id="card-view-icons"] > div {
	padding: 0;
	border: 1px solid #f3f3f3;
	border-radius: 0.25rem;
	line-height: 0.6875 rem;
}

/* responsive paypal button */
/* prevents bug causing button to get slightly cut off in mobile */
.kv-payment-select [data-braintree-id="paypal-button"] {
	width: 99%;
}
@screen md {
	.kv-payment-select [data-braintree-id="paypal-button"] {
		width: 250px;
	}
}

/* Hides credit card icon in number field until credit card type is known */
.kv-payment-select [data-braintree-id="number-field-group"]:not(.braintree-form__field-group--card-type-known) svg {
	display: none;
}

/* Braintree Iframe is type number and inheriting some styles from kiva number input. */
.kv-payment-select iframe[type=number] {
	box-shadow: none;
	padding: 0;
	background-color: transparent;
}

/* Braintree section headings
'Choose a way to pay'
'Paying with Card'
'Other ways to pay' */
.kv-payment-select [data-braintree-id="choose-a-way-to-pay"],
.kv-payment-select [data-braintree-id="methods-label"],
.kv-payment-select [data-braintree-id="other-ways-to-pay"] {
	@apply tw-text-small tw-text-primary tw-text-tertiary tw-w-full;
}

/* Payment method container */
.kv-payment-select [data-braintree-id="sheet-container"] {
	@apply tw-bg-white;
}

/* Payment method form headers */
.kv-payment-select [data-braintree-id="paypal-sheet-header"],
.kv-payment-select [data-braintree-id="apple-pay-sheet-header"],
.kv-payment-select [data-braintree-id="google-pay-sheet-header"],
.kv-payment-select [data-braintree-id="card-sheet-header"] {
	/* bottom padding and bottom margin creates spacing around the BT loading indicator */
	@apply tw-bg-transparent tw-border-0 tw-p-0 tw-pb-1 tw-mb-1;
}

/* Payment Method logo in header */
.kv-payment-select [data-braintree-id="paypal-sheet-header"] .braintree-sheet__logo--header,
.kv-payment-select [data-braintree-id="apple-pay-sheet-header"] .braintree-sheet__logo--header,
.kv-payment-select [data-braintree-id="google-pay-sheet-header"] .braintree-sheet__logo--header,
.kv-payment-select [data-braintree-id="card-sheet-header"] .braintree-sheet__logo--header {
	@apply tw-hidden;
}

/* Moves credit card icons to new line. */
.kv-payment-select [data-braintree-id="paypal-sheet-header"] .braintree-sheet__header-label,
.kv-payment-select [data-braintree-id="apple-pay-sheet-header"] .braintree-sheet__header-label,
.kv-payment-select [data-braintree-id="google-pay-sheet-header"] .braintree-sheet__header-label,
.kv-payment-select [data-braintree-id="card-sheet-header"] .braintree-sheet__header-label {
	@apply tw-w-full;
}

/* Payment method form headers text
'Pay with card'
'Paypal'
'GooglePay'
'ApplePay' */
.kv-payment-select [data-braintree-id="paypal-sheet-header"] .braintree-sheet__text,
.kv-payment-select [data-braintree-id="apple-pay-sheet-header"] .braintree-sheet__text,
.kv-payment-select [data-braintree-id="google-pay-sheet-header"] .braintree-sheet__text,
.kv-payment-select [data-braintree-id="card-sheet-header"] .braintree-sheet__text,
.kv-payment-select [data-braintree-id="paypal-sheet-header"] .braintree-sheet__label,
.kv-payment-select [data-braintree-id="apple-pay-sheet-header"] .braintree-sheet__label,
.kv-payment-select [data-braintree-id="google-pay-sheet-header"] .braintree-sheet__label,
.kv-payment-select [data-braintree-id="card-sheet-header"] .braintree-sheet__label {
	@apply tw-ml-0 tw-text-h4 tw-text-primary tw-text-left;
}

/* Saved payment methods container
List of vaulted cards */
.kv-payment-select [data-braintree-id="upper-container"]::before {
	background-color: transparent;
}

.kv-payment-select [data-braintree-id="methods-container"] .braintree-method {
	@apply tw-border-solid tw-border-tertiary tw-w-full tw-border tw-p-2;
}

.kv-payment-select [data-braintree-id="methods-container"] .braintree-method:first-child {
	@apply tw-rounded-tr tw-rounded-tl tw-rounded-bl-none tw-rounded-br-none;
}

.kv-payment-select [data-braintree-id="methods-container"] .braintree-method:last-child {
	@apply tw-rounded-br tw-rounded-bl;
}

/* Payment Option buttons on initial UI */
.kv-payment-select [data-braintree-id="payment-options-container"] .braintree-option {
	@apply tw-border-solid tw-border-tertiary tw-w-full tw-border tw-border-b-0 tw-p-2;
}

.kv-payment-select [data-braintree-id="payment-options-container"] .braintree-option:first-child {
	@apply tw-rounded-tr tw-rounded-tl tw-rounded-bl-none tw-rounded-br-none;
}

.kv-payment-select [data-braintree-id="payment-options-container"] .braintree-option:last-child {
	@apply tw-rounded-br tw-rounded-bl tw-border-b;
}

/* 'Choose another way to pay' text */
.kv-payment-select [data-braintree-id="toggle"],
.kv-payment-select [data-braintree-id="toggle"]:hover {
	@apply tw-bg-transparent tw-text-h4 tw-text-link;
}

.kv-payment-select [data-braintree-id="toggle"] span,
.kv-payment-select [data-braintree-id="toggle"] span:focus,
.kv-payment-select [data-braintree-id="toggle"] span:hover {
	@apply tw-text-base tw-no-underline tw-border-0;
	@apply tw-font-medium;
}

/* Credit Card Payment Content
Form field labels */
.kv-payment-select [data-braintree-id="card"] .braintree-sheet__content .braintree-form__label {
	@apply tw-text-base;
	@apply tw-font-medium;
}
</style>
