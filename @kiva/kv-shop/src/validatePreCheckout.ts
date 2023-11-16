import type { ApolloClient } from '@apollo/client/core';
import { gql } from '@apollo/client/core';
import { callShopMutation } from './shopQueries';
import getVisitorID from './util/visitorId';
import { ShopError, parseShopError } from './shopError';

export const validatePreCheckoutMutation = gql`
	mutation validatePreCheckout($basketId: String, $email: String, $visitorId: String, $emailOptIn: Boolean) {
	shop (basketId: $basketId) {
		id
		validatePreCheckout (email: $email, visitorId: $visitorId, emailOptIn: $emailOptIn) {
			error
			success
			value
		}
	}
}`;

export interface ValidatePreCheckoutData {
	shop: {
		id: string,
		validatePreCheckout: Array<{
			error: string,
			success: boolean,
			value: string,
		}>,
	} | null,
}

export interface ValidatePreCheckoutOptions {
	apollo: ApolloClient<any>,
	emailAddress?: string,
	emailOptIn?: boolean,
}

export async function validatePreCheckout({
	apollo,
	emailAddress,
	emailOptIn,
}: ValidatePreCheckoutOptions) {
	const data = await callShopMutation<ValidatePreCheckoutData>(apollo, {
		mutation: validatePreCheckoutMutation,
		variables: {
			visitorId: getVisitorID(),
			email: emailAddress,
			emailOptIn,
		},
	}, 0);
	const results = data?.shop?.validatePreCheckout;
	const errors = results.filter(({ success }) => !success).map((result) => parseShopError(result));
	if (errors.length) {
		const aggregate = new ShopError({ code: 'shop.failedCheckoutValidation' });
		aggregate.aggregateErrors(errors);
		throw aggregate;
	}
}
