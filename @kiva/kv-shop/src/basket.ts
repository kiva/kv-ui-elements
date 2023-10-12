import { gql } from '@apollo/client/core';
import { parseShopError } from './shopError';

// TODO: could be moved to shared file or separate package
export const getCookieValue = (name: string) => {
	if (typeof document !== undefined) {
		// From: https://stackoverflow.com/a/25490531
		return decodeURIComponent(document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`)?.pop() || '');
	}
};
export const setCookieValue = (name: string, value: string, options = '') => {
	document.cookie = `${name}=${encodeURIComponent(value)};${options}`;
};

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
