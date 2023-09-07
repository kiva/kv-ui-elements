import { parseShopError, ShopError } from '../shopError';

describe('shopError.ts', () => {
	it('should return unknown error', () => {
		const error = {
			message: 'test error',
		};

		const invalidShopError = new ShopError({
			code: 'shop.unknown',
			original: error,
		}, 'An unknown error occurred.');

		expect(parseShopError(error)).toStrictEqual(invalidShopError);
	});

	it('should return invalid basket error', () => {
		const error = {
			message: 'test error',
			code: 'shop.invalidBasketId',
		};

		const invalidBasketError = new ShopError({
			code: 'shop.invalidBasketId',
			original: error,
		}, 'There was a problem with your basket. Please, refresh the page and try again.');

		expect(parseShopError(error)).toStrictEqual(invalidBasketError);
	});
});
