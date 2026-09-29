/** @jest-environment-options {"url": "https://localhost/"} */
import type { ApolloClient } from '@apollo/client/core';
import { createBasket, getBasketID, hasBasketExpired } from '../basket';

function makeApollo(mutate: jest.Mock) {
	return { mutate } as unknown as ApolloClient<any>;
}

function createBasketResult(basketId: string | null) {
	return { data: { shop: { id: 'shop', createBasket: basketId } } };
}

describe('basket.ts', () => {
	describe('createBasket', () => {
		it('returns the new basket ID and stores it in the basket cookie', async () => {
			const apollo = makeApollo(jest.fn().mockResolvedValue(createBasketResult('basket-1')));

			const basketId = await createBasket(apollo);

			expect(basketId).toBe('basket-1');
			expect(getBasketID()).toBe('basket-1');
		});

		it('creates another basket when called again after the first creation settles', async () => {
			const mutate = jest.fn()
				.mockResolvedValueOnce(createBasketResult('basket-1'))
				.mockResolvedValueOnce(createBasketResult('basket-2'));
			const apollo = makeApollo(mutate);

			const firstBasketId = await createBasket(apollo);
			const secondBasketId = await createBasket(apollo);

			expect(mutate).toHaveBeenCalledTimes(2);
			expect(firstBasketId).toBe('basket-1');
			expect(secondBasketId).toBe('basket-2');
			expect(getBasketID()).toBe('basket-2');
		});

		it('shares one basket creation between concurrent calls', async () => {
			const mutate = jest.fn().mockResolvedValue(createBasketResult('basket-1'));
			const apollo = makeApollo(mutate);

			const basketIds = await Promise.all([createBasket(apollo), createBasket(apollo)]);

			expect(mutate).toHaveBeenCalledTimes(1);
			expect(basketIds).toEqual(['basket-1', 'basket-1']);
		});

		it('creates a basket after a previous creation failed', async () => {
			const mutate = jest.fn()
				.mockResolvedValueOnce({
					...createBasketResult(null),
					errors: [{ code: 'api.graphqlError', extensions: { code: 'api.graphqlError' } }],
				})
				.mockResolvedValueOnce(createBasketResult('basket-2'));
			const apollo = makeApollo(mutate);

			const failedBasketId = await createBasket(apollo);
			const basketId = await createBasket(apollo);

			expect(mutate).toHaveBeenCalledTimes(2);
			expect(failedBasketId).toBeNull();
			expect(basketId).toBe('basket-2');
			expect(getBasketID()).toBe('basket-2');
		});

		it('returns null and keeps the basket cookie when no basket ID is returned', async () => {
			document.cookie = 'kvbskt=existing-basket;path=/;';
			const apollo = makeApollo(jest.fn().mockResolvedValue(createBasketResult(null)));

			const basketId = await createBasket(apollo);

			expect(basketId).toBeNull();
			expect(getBasketID()).toBe('existing-basket');
		});
	});

	describe('hasBasketExpired', () => {
		// helper function to test all three error formats
		const testHasBasketExpiredWithErrorCode = (code, expected) => {
			const error1 = {
				message: 'test error',
				code,
			};
			const error2 = {
				message: 'test error',
				extensions: {
					code,
				},
			};
			const error3 = {
				message: 'test error',
				name: code,
			};
			expect(hasBasketExpired(error1)).toBe(expected);
			expect(hasBasketExpired(error2)).toBe(expected);
			expect(hasBasketExpired(error3)).toBe(expected);
		};

		it('should return true for invalidBasketId', () => {
			testHasBasketExpiredWithErrorCode('shop.invalidBasketId', true);
		});

		it('should return true for basketRequired', () => {
			testHasBasketExpiredWithErrorCode('shop.basketRequired', true);
		});

		it('should return true for alreadyCheckedOut', () => {
			testHasBasketExpiredWithErrorCode('shop.alreadyCheckedOut', true);
		});

		// These must stay out of the expired list: it drives createBasket-and-retry in
		// callShopMutation/callShopQuery, and a locked basket is busy rather than broken.
		it('should return false for a checkout in progress', () => {
			testHasBasketExpiredWithErrorCode('checkout_in_progress', false);
			testHasBasketExpiredWithErrorCode('shop.checkoutInProgress', false);
		});

		it('should return false for other inputs', () => {
			testHasBasketExpiredWithErrorCode('shop.otherError', false);
			expect(hasBasketExpired('test error')).toBe(false);
			expect(hasBasketExpired({ message: 'test error' })).toBe(false);
			expect(hasBasketExpired({})).toBe(false);
			expect(hasBasketExpired(null)).toBe(false);
			expect(hasBasketExpired(undefined)).toBe(false);
			expect(hasBasketExpired(0)).toBe(false);
			expect(hasBasketExpired(1)).toBe(false);
			expect(hasBasketExpired('')).toBe(false);
			expect(hasBasketExpired(' ')).toBe(false);
		});
	});
});
