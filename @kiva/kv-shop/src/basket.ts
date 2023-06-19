import { gql } from '@apollo/client/core';
import { parseShopError } from './shopError';

// TODO: could be moved to shared file or separate package
export const getCookieValue = (name: string) => {
	if (typeof document !== undefined) {
		// From: https://stackoverflow.com/a/25490531
		return decodeURIComponent(document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`)?.pop() || '');
	}
};

export function getBasketID() {
	return getCookieValue('kvbskt');
}

export function setBasketID() {
	// TODO
}

export async function createBasket(apollo) {
	try {
		apollo.mutate({
			mutation: gql`mutation createNewBasketForUser { shop { id createBasket } }`,
		}).then(({ data }) => {
			const newBasketId = data.shop?.createBasket ?? null;
			if (newBasketId) {
				document.cookie = `kvbskt=${newBasketId}; path=/; secure=true;`;
			}
		});
	} catch (error) {
		throw parseShopError(error);
	}
}

export function hasBasketExpired(errorCode) {
	return ['shop.invalidBasketId', 'shop.basketRequired'].includes(errorCode);
}

export async function handleInvalidBasketForDonation({ donationAmount, navigateToCheckout = false, apollo }) {
	if (typeof window !== 'undefined' && typeof document !== 'undefined') {
		document.cookie = `kvbskt=; expires=${new Date(0).toUTCString()}; path=/;`;
		await createBasket(apollo);
		document.cookie = `kvatbamt=${JSON.stringify({ donationAmount, navigateToCheckout })}; path=/;`;
		window.location.reload();
	}
}
