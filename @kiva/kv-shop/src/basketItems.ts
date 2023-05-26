import { gql } from '@apollo/client/core';
import numeral from 'numeral';
import { getBasketID } from './basket';
import { parseShopError } from './shopError';

export interface SetTipDonationOptions {
	amount: string | number,
	apollo: any,
}

export async function setTipDonation({ amount, apollo }: SetTipDonationOptions) {
	let data;
	let error;
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
				price: numeral(amount).format('0.00'),
				basketId: getBasketID(),
			},
		});
		if (result?.error || result?.errors?.length) {
			error = result?.error ?? result?.errors?.[0];
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
