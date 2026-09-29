/** @jest-environment-options {"url": "https://localhost/"} */
import { gql, type ApolloClient } from '@apollo/client/core';
import { callShopMutation } from '../shopQueries';

const updateLoanReservation = gql`mutation updateLoanReservation($basketId: String) { shop { id } }`;

function expiredBasketResult() {
	return { data: null, errors: [{ code: 'shop.invalidBasketId' }] };
}

function createBasketResult(basketId: string) {
	return { data: { shop: { id: 'shop', createBasket: basketId } } };
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
});
