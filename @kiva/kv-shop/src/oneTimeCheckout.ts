import { gql, type ApolloClient } from '@apollo/client/core';
import { trackTransaction } from '@kiva/kv-analytics';
import numeral from 'numeral';
import type { DropInWrapper } from './useBraintreeDropIn';
import { pollForFinishedCheckout } from './checkoutStatus';
import { ShopError, parseShopError } from './shopError';
import { callShopMutation, callShopQuery } from './shopQueries';
import { validatePreCheckout } from './validatePreCheckout';
import { wait } from './util/poll';
import { getVisitorID } from './util/visitorId';
import { redirectTo } from './util/redirect';
import { getCheckoutTrackingData } from './receipt';
import { addGivingFund } from './givingFunds';
import { setTipDonation } from './basketItems';

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
		fetchPolicy: 'network-only',
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
	braintree: DropInWrapper,
	amount: string,
}

interface DepositCheckoutResult {
	paymentType: string,
	mutation: Promise<CheckoutData>,
}

async function depositCheckout({
	apollo,
	braintree,
	amount,
}: DepositCheckoutOptions): Promise<DepositCheckoutResult> {
	try {
		const paymentMethod = await braintree.requestPaymentMethod();
		if (!paymentMethod) {
			throw new ShopError(
				{ code: 'shop.dropinNoPaymentMethod' },
				'No payment method returned from braintree dropin',
			);
		}

		const { nonce, deviceData, type } = paymentMethod;
		return {
			paymentType: type,
			mutation: callShopMutation<CheckoutData>(apollo, {
				mutation: depositCheckoutMutation,
				variables: {
					nonce,
					amount,
					savePaymentMethod: false, // save payment methods handled by braintree drop in UI
					deviceData,
					visitorId: getVisitorID(),
				},
			}, 0),
		};
	} catch (e) {
		throw parseShopError(e);
	}
}

async function trackSuccess(
	apollo: ApolloClient<any>,
	checkoutId: string,
	paymentType: string,
) {
	try {
		// get transaction data
		const transactionData = await getCheckoutTrackingData(
			apollo,
			checkoutId,
			paymentType,
		);

		// track transaction
		trackTransaction(transactionData);

		// wait long enough for tracking to complete
		await wait(800);
	} catch (e) {
		// eslint-disable-next-line no-console
		console.error('Error tracking transaction', e);
		// TODO: send error to sentry
	}
}

export type ValetInviter = {
	inviterId: string,
	invitationUrl: string,
};

export interface OneTimeCheckoutOptions {
	apollo: ApolloClient<any>,
	braintree?: DropInWrapper,
	emailAddress?: string,
	emailOptIn?: boolean,
	valetInviter?: ValetInviter,
	deactivateRedirect?: boolean,
}

export async function executeOneTimeCheckout({
	apollo,
	braintree,
	emailAddress,
	emailOptIn,
	valetInviter,
	deactivateRedirect,
}: OneTimeCheckoutOptions) {
	// do pre-checkout validation
	// TODO: promo guest checkout validation
	await validatePreCheckout({
		apollo,
		emailAddress,
		emailOptIn,
		valetInviter,
	});

	const creditNeeded = await creditAmountNeeded(apollo);
	const creditRequired = numeral(creditNeeded).value() > 0;

	if (creditRequired && !braintree) {
		throw new ShopError({ code: 'shop.dropinRequired' }, 'Braintree dropin required for credit deposit checkout');
	}

	// initiate async checkout
	let data: CheckoutData;
	let paymentType = '';
	if (creditRequired) {
		const checkoutResult = await depositCheckout({
			apollo,
			braintree,
			amount: creditNeeded,
		});
		paymentType = checkoutResult.paymentType;
		data = await checkoutResult.mutation;
	} else {
		data = await creditCheckout(apollo);
	}
	const transactionId = data?.shop?.transactionId;

	// wait on checkout to complete
	const result = await pollForFinishedCheckout({
		apollo,
		transactionSagaId: transactionId,
		timeout: 300000, // five minutes
	});

	// handle errors
	if (result.errors?.length) {
		throw parseShopError(result.errors[0]);
	}

	// track success
	const checkoutId = result.data?.checkoutStatus?.receipt?.checkoutId;
	await trackSuccess(apollo, checkoutId, paymentType);

	// if redirect is deactivated, return transaction result
	if (deactivateRedirect) {
		return result;
	}

	// TODO: redirect needs to handle challenge completion parameters

	// redirect to thanks page
	let redirectUrl = `/checkout/post-purchase?kiva_transaction_id=${checkoutId}`;
	if (valetInviter?.inviterId) {
		redirectUrl += `&valet_inviter=${valetInviter.inviterId}`;
	}
	await redirectTo(redirectUrl);
}

export interface OneTimeCheckoutForGivingFundOptions {
	apollo: ApolloClient<any>,
	braintree?: DropInWrapper,
	emailAddress?: string,
	emailOptIn?: boolean,
	userId?: string,
	fundTarget: string,
	amount: string,
	visitorId?: string,
}

// Execute a one-time checkout for a giving fund
// This function handles the creation of a giving fund, pre-checkout validation, and the checkout process for a donation to that fund.
// It returns the result of the checkout process, which includes transaction details.
// pre-checkout validation must be performed before creating the giving fund to create a user record for visitors.
export async function executeOneTimeCheckoutForGivingFund({
	amount,
	apollo,
	braintree,
	emailAddress,
	emailOptIn,
	fundTarget,
	userId,
}: OneTimeCheckoutForGivingFundOptions) {
	// do pre-checkout validation
	await validatePreCheckout({
		apollo,
		emailAddress,
		emailOptIn,
	});

	// Create giving fund
	const givingFundResult = await addGivingFund({
		apollo,
		fundTarget,
		userId: userId ? `${userId}` : undefined,
	});

	const metadata = `campaignId: ${givingFundResult.id}`;

	await setTipDonation({
		amount,
		metadata,
		apollo,
	});

	const creditNeeded = await creditAmountNeeded(apollo);
	const creditRequired = numeral(creditNeeded).value() > 0;

	if (creditRequired && !braintree) {
		throw new ShopError({ code: 'shop.dropinRequired' }, 'Braintree dropin required for credit deposit checkout');
	}

	// initiate async checkout
	let data: CheckoutData;
	let paymentType = '';
	if (creditRequired) {
		const checkoutResult = await depositCheckout({
			apollo,
			braintree,
			amount: creditNeeded,
		});
		paymentType = checkoutResult.paymentType;
		data = await checkoutResult.mutation;
	} else {
		data = await creditCheckout(apollo);
	}
	const transactionId = data?.shop?.transactionId;

	// wait on checkout to complete
	const result = await pollForFinishedCheckout({
		apollo,
		transactionSagaId: transactionId,
		timeout: 300000, // five minutes
	});

	// handle errors
	if (result.errors?.length) {
		throw parseShopError(result.errors[0]);
	}

	// track success
	const checkoutId = result.data?.checkoutStatus?.receipt?.checkoutId;
	await trackSuccess(apollo, checkoutId, paymentType);

	// return transaction result
	return result;
}
