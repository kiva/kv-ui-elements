import { gql, type ApolloClient } from '@apollo/client/core';
import numeral from 'numeral';
import { callShopMutation } from './shopQueries';

export interface SetTipDonationOptions {
	amount: string | number,
	metadata?: string | null,
	apollo: ApolloClient<any>,
}

export interface SetTipDonationData {
	shop: {
		id: string,
		updateDonation: {
			id: string,
			price: string,
			isTip: boolean,
			metadata: string | null,
		} | null,
	} | null,
}

export async function setTipDonation({ amount, apollo, metadata }: SetTipDonationOptions) {
	const donationAmount = numeral(amount).format('0.00');
	const data = await callShopMutation<SetTipDonationData>(apollo, {
		awaitRefetchQueries: true,
		mutation: gql`mutation setTipDonation($price: Money!, $basketId: String, $metadata: String) {
			shop (basketId: $basketId) {
				id
				updateDonation (donation: {
					price: $price,
					isTip: true,
					metadata: $metadata,
				})
				{
					basketItemType
					id
					isTip
					isUserEdited
					metadata {
						campaignId
					}
					price
				}
			}
		}`,
		variables: { price: donationAmount, metadata },
	});

	return data?.shop?.updateDonation;
}

// eslint-disable-next-line no-shadow
export enum KivaCardDeliveryTypeEnum {
	Email = 'email',
	Lender = 'lender',
	Postal = 'postal',
	Print = 'print'
}

export interface KivaCardRecipientInput {
	email?: string;
	name?: string;
	address?: string;
	city?: string;
	state?: string;
	postalCode?: string;
	country?: string;
	lenderId?: string | number;
	scheduledDeliveryDate?: string;
}

export interface KivaCardInput {
	deliveryType: KivaCardDeliveryTypeEnum;
	giftAmount: string | number;
	message?: string | null;
	recipient: KivaCardRecipientInput;
	senderEmail?: string | null;
	senderName?: string | null;
	giftsPerRecipient?: number | null;
}

export interface AddKivaCardToBasketOptions {
	kivaCard: KivaCardInput,
	apollo: ApolloClient<any>,
}

export interface AddKivaCardToBasketData {
	shop: {
		id: string,
		addKivaCardToBasket: boolean | null,
	} | null,
}

export async function addKivaCardToBasket({ kivaCard, apollo }: AddKivaCardToBasketOptions) {
	const giftAmount = numeral(kivaCard.giftAmount).format('0.00');
	const data = await callShopMutation<AddKivaCardToBasketData>(apollo, {
		awaitRefetchQueries: true,
		mutation: gql`mutation AddKivaCardToBasket($kivaCard: KivaCardInput!, $basketId: String) {
			shop (basketId: $basketId) {
				id
				addKivaCardToBasket(kivaCard: $kivaCard)
			}
		}`,
		variables: {
			kivaCard: {
				...kivaCard,
				giftAmount,
			},
		},
	});

	return data?.shop?.addKivaCardToBasket ?? false;
}
