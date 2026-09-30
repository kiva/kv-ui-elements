/** @jest-environment-options {"url": "https://localhost/"} */
import {
	ApolloClient,
	ApolloLink,
	InMemoryCache,
	Observable,
	gql,
	type ErrorPolicy,
	type FetchResult,
	type Operation,
} from '@apollo/client/core';
import { setBasketID } from '../basket';
import { callShopMutation, watchShopQuery } from '../shopQueries';

const updateLoanReservation = gql`mutation updateLoanReservation($basketId: String) { shop { id } }`;

const basketItems = gql`query basketItems($basketId: String) { shop { id basket(basketId: $basketId) { id } } }`;

function expiredBasketResult() {
	return { data: null, errors: [{ code: 'shop.invalidBasketId' }] };
}

function createBasketResult(basketId: string) {
	return { data: { shop: { id: 'shop', createBasket: basketId } } };
}

function basketItemsResult(basketId: string) {
	return { data: { shop: { id: 'shop', basket: { id: basketId } } } };
}

function basketItemsErrorResult(code: string) {
	return {
		data: { shop: { id: 'shop', basket: null } },
		errors: [{ message: 'basket error', extensions: { code } }],
	};
}

function makeShopClient(errorPolicy: ErrorPolicy, respond: (operation: Operation) => FetchResult) {
	return new ApolloClient({
		cache: new InMemoryCache(),
		link: new ApolloLink((operation) => new Observable((observer) => {
			observer.next(respond(operation));
			observer.complete();
		})),
		defaultOptions: { watchQuery: { errorPolicy } },
	});
}

async function watchBasketItemsUntilDelivery(apollo: ApolloClient<any>) {
	let subscription;
	const delivery = await new Promise<{ result?: any, error?: any }>((resolve) => {
		subscription = watchShopQuery(apollo, { query: basketItems, fetchPolicy: 'network-only' }).subscribe({
			next: (result) => resolve({ result }),
			error: (error) => resolve({ error }),
		});
	});
	subscription.unsubscribe();
	return delivery;
}

describe('shopQueries.ts', () => {
	describe('callShopMutation', () => {
		it('creates a new basket for each expired basket retry', async () => {
			const mutate = jest.fn()
				.mockResolvedValueOnce(expiredBasketResult())
				.mockResolvedValueOnce(createBasketResult('basket-1'))
				.mockResolvedValueOnce(expiredBasketResult())
				.mockResolvedValueOnce(createBasketResult('basket-2'))
				.mockResolvedValueOnce({ data: { shop: { id: 'shop' } } });
			const apollo = { mutate } as unknown as ApolloClient<any>;

			const data = await callShopMutation(apollo, { mutation: updateLoanReservation });

			const reservationBasketIds = mutate.mock.calls
				.filter(([options]) => options.mutation === updateLoanReservation)
				.map(([options]) => options.variables.basketId);
			expect(mutate).toHaveBeenCalledTimes(5);
			expect(reservationBasketIds).toEqual(['', 'basket-1', 'basket-2']);
			expect(data).toEqual({ shop: { id: 'shop' } });
		});
	});

	describe('watchShopQuery', () => {
		it('creates a new basket and refetches when an expired basket error reaches next', async () => {
			setBasketID('expired-basket');
			const basketItemsIds = [];
			const apollo = makeShopClient('all', (operation) => {
				if (operation.operationName === 'createNewBasketForUser') {
					return createBasketResult('basket-1');
				}
				basketItemsIds.push(operation.variables.basketId);
				return operation.variables.basketId === 'basket-1'
					? basketItemsResult('basket-1')
					: basketItemsErrorResult('shop.invalidBasketId');
			});

			const { result, error } = await watchBasketItemsUntilDelivery(apollo);

			expect(basketItemsIds).toEqual(['expired-basket', 'basket-1']);
			expect(result.data).toEqual(basketItemsResult('basket-1').data);
			expect(error).toBeUndefined();
		});

		it('passes the parsed basket error to error once retries are exhausted', async () => {
			setBasketID('expired-basket');
			let basketCount = 0;
			const basketItemsIds = [];
			const apollo = makeShopClient('all', (operation) => {
				if (operation.operationName === 'createNewBasketForUser') {
					basketCount += 1;
					return createBasketResult(`basket-${basketCount}`);
				}
				basketItemsIds.push(operation.variables.basketId);
				return basketItemsErrorResult('shop.invalidBasketId');
			});

			const { result, error } = await watchBasketItemsUntilDelivery(apollo);

			expect(basketItemsIds).toEqual(['expired-basket', 'basket-1', 'basket-2']);
			expect(result).toBeUndefined();
			expect(error.name).toBe('ShopError');
			expect(error.code).toBe('shop.invalidBasketId');
		});

		it('passes results with non-basket errors to next unchanged', async () => {
			setBasketID('basket-1');
			const operationNames = [];
			const apollo = makeShopClient('all', (operation) => {
				operationNames.push(operation.operationName);
				return basketItemsErrorResult('shop.otherError');
			});

			const { result, error } = await watchBasketItemsUntilDelivery(apollo);

			expect(operationNames).toEqual(['basketItems']);
			expect(result.errors[0].extensions.code).toBe('shop.otherError');
			expect(error).toBeUndefined();
		});

		it.each(['all', 'none'] as ErrorPolicy[])(
			'passes the parsed error to error when a new basket cannot be created with errorPolicy %s',
			async (errorPolicy) => {
				setBasketID('expired-basket');
				const apollo = makeShopClient(errorPolicy, (operation) => {
					if (operation.operationName === 'createNewBasketForUser') {
						return { errors: [{ message: 'create basket failed' }] };
					}
					return basketItemsErrorResult('shop.invalidBasketId');
				});

				const { result, error } = await watchBasketItemsUntilDelivery(apollo);

				expect(result).toBeUndefined();
				expect(error.name).toBe('ShopError');
				expect(error.original.message).toBe('create basket failed');
			},
		);
	});
});
