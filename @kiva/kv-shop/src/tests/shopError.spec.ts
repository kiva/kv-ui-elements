import { parseShopError, ShopError } from '../shopError';

describe('shopError.ts', () => {
	const testParseShopError = (testError, expectedCode, expectedMessage) => {
		const expectedError = new ShopError({
			code: expectedCode,
			original: testError,
		}, expectedMessage);
		const parsedError = parseShopError(testError);
		expect(parsedError).toStrictEqual(expectedError);
	};

	it('should return unknown error', () => {
		const error = {
			message: 'test error',
		};
		testParseShopError(error, 'shop.unknown', 'An unknown error occurred.');
	});

	it('should return invalid basket error', () => {
		const error = {
			message: 'test error',
			code: 'shop.invalidBasketId',
		};
		testParseShopError(error, 'shop.invalidBasketId', 'There was a problem with your basket. Please, refresh the page and try again.');
	});

	it('should pass through over-max-donation error', () => {
		const error = {
			message: 'Test error message',
			extensions: {
				code: 'donationAmountTooLarge',
			},
		};
		testParseShopError(error, 'donationAmountTooLarge', 'Test error message');
	});
});
