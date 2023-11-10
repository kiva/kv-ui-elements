import { gql } from '@apollo/client/core';
import { getCookieValue, setCookieValue } from './util/cookie';
import { parseShopError } from './shopError';

export function getBasketID() {
	return getCookieValue('kvbskt');
}

export function setBasketID(basketId) {
	setCookieValue('kvbskt', basketId, 'path=/;secure;');
}

export async function createBasket(apollo) {
	try {
		return apollo.mutate({
			mutation: gql`mutation createNewBasketForUser { shop { id createBasket } }`,
		}).then(({ data }) => {
			const newBasketId = data.shop?.createBasket ?? null;
			if (newBasketId) {
				setBasketID(newBasketId);
			}
		});
	} catch (error) {
		throw parseShopError(error);
	}
}

export function hasBasketExpired(error) {
	const errorCode = error?.code ?? error?.extensions?.code ?? error?.name ?? '';
	return ['shop.invalidBasketId', 'shop.basketRequired', 'shop.alreadyCheckedOut'].includes(errorCode);
}
