import type { ApolloClient } from '@apollo/client/core';
import type { Dropin } from 'braintree-web-drop-in';
import { gql } from '@apollo/client/core';
import numeral from 'numeral';
import { pollForFinishedCheckout } from './checkoutStatus';
import { parseShopError } from './shopError';
import { callShopMutation, callShopQuery } from './shopQueries';
import { validatePreCheckout } from './validatePreCheckout';
import getVisitorID from './util/visitorId';

interface CreditAmountNeededData {
	shop: {
		id: string,
		basket: {
			id: string,
			totals: {
				creditAmountNeeded: string,
			} | null,
		} | null,
	} | null,
}

async function creditAmountNeeded(apollo: ApolloClient<any>): Promise<string|null> {
	const data = await callShopQuery<CreditAmountNeededData>(apollo, {
		query: gql`
			query creditAmountNeeded($basketId: String) {
				shop (basketId: $basketId) {
					id
					basket {
						id
						totals {
							creditAmountNeeded
						}
					}
				}
			}
		`,
	}, 0);
	return data?.shop?.basket?.totals?.creditAmountNeeded;
}

const creditCheckoutMutation = gql`
	mutation creditCheckout(
		$basketId: String,
		$visitorId: String
	) {
		shop (basketId: $basketId) {
			id
			transactionId: checkoutAsync (visitorId: $visitorId)
		}
	}
`;

const depositCheckoutMutation = gql`
	mutation depositCheckout(
		$basketId: String,
		$amount: Money!,
		$nonce: String!,
		$savePaymentMethod: Boolean,
		$deviceData: String,
		$visitorId: String
	) {
		shop (basketId: $basketId) {
			id
			transactionId: doNoncePaymentDepositAndCheckoutAsync(
				amount: $amount,
				nonce: $nonce,
				savePaymentMethod: $savePaymentMethod,
				deviceData: $deviceData,
				visitorId: $visitorId
			)
		}
	}
`;

interface CheckoutData {
	shop: {
		id: string,
		transactionId: string,
	} | null,
}

function creditCheckout(apollo: ApolloClient<any>) {
	return callShopMutation<CheckoutData>(apollo, {
		mutation: creditCheckoutMutation,
		variables: {
			visitorId: getVisitorID(),
		},
	}, 0);
}

interface DepositCheckoutOptions {
	apollo: ApolloClient<any>,
	braintree: Dropin,
	amount: string,
}

async function depositCheckout({
	apollo,
	braintree,
	amount,
}: DepositCheckoutOptions) {
	// TODO: handle thrown braintree errors
	const { nonce, deviceData } = await braintree.requestPaymentMethod();
	// TODO: need to also track paymentType from above
	return callShopMutation<CheckoutData>(apollo, {
		mutation: depositCheckoutMutation,
		variables: {
			nonce,
			amount,
			savePaymentMethod: false, // save payment methods handled by braintree drop in UI
			deviceData,
			visitorId: getVisitorID(),
		},
	}, 0);
}

export interface OneTimeCheckoutOptions {
	apollo: ApolloClient<any>,
	braintree: Dropin,
	emailAddress?: string,
	emailOptIn?: boolean,
}

export async function executeOneTimeCheckout({
	apollo,
	braintree,
	emailAddress,
	emailOptIn,
}: OneTimeCheckoutOptions) {
	// check that basket is ready (check form validation?)

	// do pre-checkout validation
	// TODO: promo guest checkout validation
	await validatePreCheckout({
		apollo,
		emailAddress,
		emailOptIn,
	});
	// TODO: tracking for validation errors?

	const creditNeeded = await creditAmountNeeded(apollo);
	const creditRequired = numeral(creditNeeded).value() > 0;

	// initiate async checkout
	const data = creditRequired ? await depositCheckout({
		apollo,
		braintree,
		amount: creditNeeded,
	}) : await creditCheckout(apollo);
	const transactionId = data?.shop?.transactionId;

	// TODO: so much tracking

	// wait on checkout to complete
	const result = await pollForFinishedCheckout({
		apollo,
		transactionSagaId: transactionId,
		timeout: 300000, // five minutes
	});

	// handle errors
	if (result.errors?.length) {
		// TODO: tracking?
		throw parseShopError(result.errors[0]);
	}

	// TODO: redirect needs to handle challenge completion parameters

	// redirect to thanks page
	window.location.href = `/checkout/post-purchase?kiva_transaction_id=${transactionId}`;
}
