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

	// The backend refuses basket edits while the lender's own checkout is running. Without a
	// mapping these fall through to 'An unknown error occurred.', which also discards the
	// original code, leaving consumers nothing to classify on.
	it.each([
		['checkout_in_progress'],
		['shop.checkoutInProgress'],
	])('should return the checkout in progress error for %s', (code) => {
		const error = {
			message: 'engineer placeholder copy',
			extensions: { code },
		};
		testParseShopError(
			error,
			code,
			'Your checkout is being processed, so your basket can\u2019t be changed right now. '
			+ 'Please wait a moment and refresh the page.',
		);
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
