import { gql, type ApolloClient } from '@apollo/client/core';
import { getCookieValue, setCookieValue } from './util/cookie';
import { parseShopError } from './shopError';

export function getBasketID() {
	return getCookieValue('kvbskt');
}

export function setBasketID(basketId) {
	setCookieValue('kvbskt', basketId, 'path=/;secure;');
}

async function createBasketHelper(apollo: ApolloClient<any>) {
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

let activeBasketCreationQuery = null;
export async function createBasket(apollo: ApolloClient<any>) {
	// Only allow one basket creation query at a time
	if (activeBasketCreationQuery) {
		return activeBasketCreationQuery;
	}
	// Create a new basket
	activeBasketCreationQuery = createBasketHelper(apollo);
	return activeBasketCreationQuery;
}

export function hasBasketExpired(error) {
	const errorCode = error?.code ?? error?.extensions?.code ?? error?.name ?? '';
	return ['shop.invalidBasketId', 'shop.basketRequired', 'shop.alreadyCheckedOut'].includes(errorCode);
}
