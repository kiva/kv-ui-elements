import { gql } from '@apollo/client/core';
import type { PaymentMethodPayload } from 'braintree-web-drop-in';
import { parseShopError, ShopError } from './shopError';

export async function checkSubscriptionStatus(apollo: any) {
	const { data: subsData } = await apollo.query({
		query: gql`query subscriptionStatus{
			my {
				id
				subscriptions {
					totalCount
				}
				autoDeposit {
					id
					isSubscriber
				}
			}
		}`,
	});
	if (!subsData?.my?.id) {
		throw new ShopError({ code: 'api.authenticationRequired' }, 'You must be logged in to continue.');
	}
	if ((subsData?.my?.subscriptions?.totalCount ?? 0) > 0 || subsData?.my?.autoDeposit?.isSubscriber) {
		// eslint-disable-next-line max-len
		throw new ShopError({ code: 'shop.subscriptionExists' }, 'You already have an existing Monthly Good subscription. Changes can be made in your subscription settings.');
	}
	if (subsData?.my?.autoDeposit?.id) {
		// eslint-disable-next-line max-len
		throw new ShopError({ code: 'shop.autoDepositExists' }, 'You already have existing Auto Deposit settings. Changes can be made in your subscription settings.');
	}
	return true;
}

export interface SubscriptionCheckoutOptions {
	amount: string,
	apollo: any,
	dayOfMonth?: number,
	donateAmount: string,
	paymentMethod: PaymentMethodPayload,
}

export async function executeNewSubscriptionCheckout({
	amount,
	apollo,
	dayOfMonth = (new Date()).getDate(),
	donateAmount,
	paymentMethod,
}: SubscriptionCheckoutOptions) {
	// check that amounts are properly formatted (e.g. 1000.00)
	const amountRegex = new RegExp(/^\d+\.\d{2}$/);
	if (!amountRegex.test(amount) || !amountRegex.test(donateAmount)) {
		throw new ShopError({
			code: 'api.invalidMethodParameter',
		}, 'Please check that the amount is correct and try again.');
	}

	// check eligibility
	await checkSubscriptionStatus(apollo);

	// get payment method details
	const { deviceData, nonce } = paymentMethod;

	// create auto deposit
	let data;
	let error;
	try {
		const result = await apollo.query({
			variables: {
				dayOfMonth,
				deviceData,
				nonce,
			},
			query: gql`mutation createAutoDepositSubscription(
				$nonce: String!,
				$deviceData: String,
				$amount: Money!,
				$donateAmount: Money!,
				$dayOfMonth: Int!
			) {
				my {
					createAutoDeposit (
						autoDeposit: {
							amount: $amount,
							donateAmount: $donateAmount,
							dayOfMonth: $dayOfMonth,
						},
						deviceData: $deviceData,
						paymentMethodNonce: $nonce
					) {
						id amount donateAmount dayOfMonth status
					}
				}
			}`,
		});

		if (result.error || result.errors.length) {
			error = result.error ?? result.errors[0];
		} else {
			data = result.data;
		}
	} catch (e) {
		error = e;
	}

	// handle errors
	if (error) {
		const parsed = parseShopError(error);

		if (parsed.code === 'shop.unknown') {
			throw new ShopError({
				code: 'shop.createAutoDepositError',
				original: parsed,
			}, 'There was a problem trying to setup your monthly deposit.');
		}

		throw parsed;
	}

	return data?.my?.createAutoDeposit;
}
