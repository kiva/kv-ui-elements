import { gql, ApolloClient, DocumentNode } from '@apollo/client/core';
import numeral from 'numeral';
import { getBasketID, hasBasketExpired, createBasket } from './basket';
import { ShopError, parseShopError } from './shopError';

/**
 * Call a shop mutation with a basketId, creating a new basket if necessary.
 */
async function callShopMutation(
	apollo: ApolloClient<any>,
	mutation: DocumentNode,
	variables: Record<string, any>,
	maxretries = 2,
) {
	try {
		const result = await apollo.mutate({
			mutation,
			variables: {
				...variables,
				basketId: getBasketID(),
			},
		});
		if (result?.errors?.length) {
			// Retry recoverable basket expired errors
			const basketErrors = result?.errors.filter((err) => hasBasketExpired(err));
			if (basketErrors.length) {
				// Create a new basket and retry if retries remain
				if (maxretries > 0) {
					await createBasket(apollo);
					return callShopMutation(apollo, mutation, variables, maxretries - 1);
				}
				// Fail on basket expired errors if no retries remain
				throw basketErrors[0];
			}

			// Fail on non-recoverable errors
			const otherErrors = result?.errors?.filter((err) => !hasBasketExpired(err));
			if (otherErrors.length) {
				throw otherErrors[0];
			}
		}
		// Return successful result data
		return result?.data;
	} catch (e) {
		// Parse and throw on non-recoverable errors
		if (e instanceof ShopError) {
			throw e;
		}
		throw parseShopError(e);
	}
}

export interface SetTipDonationOptions {
	amount: string | number,
	apollo: ApolloClient<any>,
}

export async function setTipDonation({ amount, apollo }: SetTipDonationOptions) {
	const donationAmount = numeral(amount).format('0.00');
	const data = await callShopMutation(apollo, gql`mutation setTipDonation($price: Money!, $basketId: String) {
		shop (basketId: $basketId) {
			id
			updateDonation (donation: {
				price: $price,
				isTip: true
			})
			{
				id
				price
				isTip
			}
		}
	}`, { price: donationAmount });

	return data?.shop?.updateDonation;
}
