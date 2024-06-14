import { gql, type ApolloClient } from '@apollo/client/core/core.cjs';
import numeral from 'numeral';
import { callShopMutation } from './shopQueries';

export interface SetTipDonationOptions {
	amount: string | number,
	apollo: ApolloClient<any>,
}

export interface SetTipDonationData {
	shop: {
		id: string,
		updateDonation: {
			id: string,
			price: string,
			isTip: boolean,
		} | null,
	} | null,
}

export async function setTipDonation({ amount, apollo }: SetTipDonationOptions) {
	const donationAmount = numeral(amount).format('0.00');
	const data = await callShopMutation<SetTipDonationData>(apollo, {
		awaitRefetchQueries: true,
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
		variables: { price: donationAmount },
	});

	return data?.shop?.updateDonation;
}
