import { gql } from '@apollo/client/core';
import numeral from 'numeral';
import { getBasketID, hasBasketExpired, handleInvalidBasketForDonation } from './basket';
import { parseShopError } from './shopError';

export interface SetTipDonationOptions {
	amount: string | number,
	apollo: any,
}

export async function setTipDonation({ amount, apollo }: SetTipDonationOptions) {
	let data;
	let error;
	let hasFailedAddToBasket = false;
	const donationAmount = numeral(amount).format('0.00');
	try {
		const result = await apollo.mutate({
			mutation: gql`mutation setTipDonation($price: Money!, $basketId: String) {
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
			}`,
			variables: {
				price: donationAmount,
				basketId: getBasketID(),
			},
		});
		if (result?.error || result?.errors?.length) {
			error = result?.error ?? result?.errors?.[0];
			result?.errors?.forEach((err: any) => {
				if (hasBasketExpired(err?.extensions?.code)) {
					hasFailedAddToBasket = true;
					error = {
						...err,
						code: err?.extensions?.code,
					};
				}
			});

			if (hasFailedAddToBasket) {
				handleInvalidBasketForDonation({
					donationAmount,
					navigateToCheckout: true,
					apollo,
				});
			}
		} else {
			data = result?.data;
		}
	} catch (e) {
		error = e;
	}

	if (error) {
		throw parseShopError(error);
	}

	return data?.shop?.updateDonation;
}
