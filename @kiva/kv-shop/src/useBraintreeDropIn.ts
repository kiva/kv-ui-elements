/* eslint-disable @typescript-eslint/ban-ts-comment */
import { gql } from '@apollo/client/core';
import numeral from 'numeral';
import { ref } from 'vue-demi';
import type { ApplePayPaymentRequest } from 'braintree-web';
import type { Dropin } from 'braintree-web-drop-in';
import { ShopError, parseShopError } from './shopError';

export type PaymentType = 'card' | 'paypal' | 'paypalCredit' | 'venmo' | 'applePay' | 'googlePay';
export type PayPalFlowType = 'checkout' | 'vault';

export const defaultPaymentTypes = ['paypal', 'card', 'applePay', 'googlePay'] as const;

/**
 * When logged in, get a Braintree client token authorizing Kiva for this user.
 *
 * @param apollo ApolloClient
 * @returns client token
 */
export async function getClientToken(apollo: any) {
	const { data, error, errors } = await apollo.query({
		query: gql`query getClientToken {
			shop {
				id
				getClientToken(useCustomerId: true)
			}
		}`,
	});

	if (error || errors.length) {
		throw parseShopError(error ?? errors[0]);
	}

	return data?.shop?.getClientToken;
}

export interface DropInInitOptions {
	amount: string|number,
	authToken: string,
	container: string|HTMLElement,
	googlePayMerchantId: string,
	paymentTypes?: PaymentType[],
	preselectVaultedPaymentMethod?: boolean,
	paypalFlow?: PayPalFlowType,
}

export default function useBraintreeDropIn() {
	let instance: Dropin;
	let formattedAmount = '';
	const paymentMethodRequestable = ref(false);

	function getApplePaymentRequest(amount: string): ApplePayPaymentRequest {
		// @ts-ignore
		return {
			countryCode: 'US',
			currencyCode: 'USD',
			// merchantCapabilities: ['supports3DS'], // TODO: confirm/update
			requiredBillingContactFields: ['postalAddress'],
			// supportedNetworks: ['amex', 'discover', 'interac', 'jcb', 'masterCard', 'visa'], // TODO: confirm/update
			total: {
				label: 'Kiva',
				amount,
			},
		};
	}

	function getGoogleTransactionInfo(amount: string): google.payments.api.TransactionInfo {
		return {
			totalPriceStatus: 'FINAL',
			totalPrice: amount,
			currencyCode: 'USD',
			countryCode: 'US',
		};
	}

	function initDropInActions() {
		// more info: https://developers.braintreepayments.com/guides/drop-in/customization/javascript/v3#events
		// https://braintree.github.io/braintree-web-drop-in/docs/current/Dropin.html#on

		// initial check for a "requestable" vaulted payment method
		if (instance.isPaymentMethodRequestable()) {
			paymentMethodRequestable.value = true;
		}

		// listen for "requestable" payment method (ex. completing PayPal signin)
		// eslint-disable-next-line no-unused-vars
		instance.on('paymentMethodRequestable', (event) => {
			// Returns event object { paymentMethodIsSelected, type}
			// TODO: add additional check for Postal Code validation during during new card input
			// From the Docs:
			// - If your Drop-in integration has the postal code field,
			// - it will be considered valid after 3 characters
			// - (some international postal codes are 3 characters in length).
			paymentMethodRequestable.value = true;
		});

		// listen for "non-requestable" payment method (ex. PayPal sign in flow)
		instance.on('noPaymentMethodRequestable', () => {
			// Returns nothing
			paymentMethodRequestable.value = false;
		});

		// listen for "selected" payment option (ex. completion of PayPal sign in)
		// could be useful later
		// instance.on('paymentOptionSelected', event => {
		// 	console.log('payment option selected - returns option');
		// 	console.log(event);
		// });
	}

	async function initDropIn({
		amount,
		authToken,
		container,
		googlePayMerchantId,
		paymentTypes = [...defaultPaymentTypes],
		preselectVaultedPaymentMethod = true,
		paypalFlow = 'checkout',
	}: DropInInitOptions) {
		formattedAmount = numeral(amount).format('0.00');
		const { default: DropIn } = await import('braintree-web-drop-in');

		try {
			instance = await (DropIn.create({
				authorization: authToken,
				container,
				dataCollector: {
					kount: true, // Required if Kount fraud data collection is enabled
				},
				// vaultManager: true, - Useful for testing and removing payment methods easily.
				paymentOptionPriority: paymentTypes,
				preselectVaultedPaymentMethod,
				card: {
					vault: {
						allowVaultCardOverride: true,
					},
				},
				paypal: {
					flow: paypalFlow,
					amount: formattedAmount,
					currency: 'USD',
					buttonStyle: {
						// @ts-ignore
						color: 'gold',
						// @ts-ignore
						shape: 'rect',
						// @ts-ignore
						size: 'responsive',
					},
				},
				googlePay: {
					googlePayVersion: 2,
					merchantId: googlePayMerchantId,
					transactionInfo: getGoogleTransactionInfo(formattedAmount),
					button: {
						allowedPaymentMethods: [{
							type: 'CARD',
							// @ts-ignore
							parameters: {
								// allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'], // TODO: confirm/update
								// allowedCardNetworks: ['AMEX', 'DISCOVER', 'INTERAC', 'JCB', 'MASTERCARD', 'VISA'], // TODO: confirm/update
								billingAddressRequired: true,
								billingAddressParameters: {
									format: 'FULL',
								},
							},
						}],
					},
				},
				applePay: {
					displayName: 'Kiva',
					paymentRequest: getApplePaymentRequest(formattedAmount),
				},
			}) as Promise<Dropin>);

			initDropInActions();
		} catch (e) {
			throw new ShopError({
				code: 'shop.braintreeDropinInitError',
				original: e,
			}, 'An Error has occured. Please refresh the page and try again.');
		}

		return instance;
	}

	async function requestPaymentMethod() {
		if (instance.isPaymentMethodRequestable()) {
			return instance.requestPaymentMethod();
		}
	}

	function updateAmount(amount: string|number) {
		const newAmount = numeral(amount).format('0.00');
		if (newAmount !== formattedAmount) {
			formattedAmount = newAmount;
			instance?.updateConfiguration('paypal', 'amount', formattedAmount);
			instance?.updateConfiguration('googlePay', 'transactionInfo', getGoogleTransactionInfo(formattedAmount));
			instance?.updateConfiguration?.('applePay', 'paymentRequest', getApplePaymentRequest(formattedAmount));
		}
	}

	return {
		initDropIn,
		paymentMethodRequestable,
		requestPaymentMethod,
		updateAmount,
	};
}
