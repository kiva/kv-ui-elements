import { parseShopError, ShopError } from '../shopError';

// TODO: Add remaining test cases MARS-436
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

		const invalidShopError = new ShopError({
			code: 'shop.invalidBasketId',
			original: error,
		}, 'Something went wrong. Please, refresh the page and try again.');

		expect(parseShopError(error)).toStrictEqual(invalidShopError);
	});
});
