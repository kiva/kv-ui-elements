export interface ShopErrorOptions {
	code: string,
	original?: object,
}

export class ShopError extends Error {
	code: string;

	original?: object;

	errors?: Array<ShopError>;

	constructor({ code, original }: ShopErrorOptions, ...params) {
		super(...params);

		// Maintains proper stack trace for where our error was thrown (only available on V8)
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ShopError);
		}

		this.name = 'ShopError';
		this.code = code;
		this.original = original;
	}

	aggregateErrors(errors: Array<ShopError>) {
		this.errors = errors;
	}
}

export function parseShopError(error: any) {
	if (error instanceof ShopError) {
		return error;
	}

	const errorCode = error?.code ?? error?.extensions?.code ?? error?.name ?? '';
	const errorMessage = typeof error === 'string' ? error : error?.message ?? '';

	// Handle errors (`${code}: ${message}`) similar to:
	// invalidMethodParameter: paymentMethod.create (findOrCreatePaymentMethodFromNonce) request was not made due to validation errors: Credit card type is not accepted by this merchant account.
	// invalidMethodParameter: paymentMethod.create (findOrCreatePaymentMethodFromNonce) request was not made due to validation errors: Cannot use a paymentMethodNonce more than once.
	if (errorCode === 'invalidMethodParameter' && errorMessage.includes('paymentMethod.create')) {
		return new ShopError({
			code: 'paymentMethod.create.invalidMethodParameter',
			original: error,
		}, 'There was a problem validating your payment information. Please double-check the details and try again.');
	}
	// Handle errors with shop.invalidBasketId or shop.basketRequired codes
	if (
		errorCode === 'shop.invalidBasketId'
		|| errorCode === 'shop.basketRequired'
		|| errorCode === 'shop.alreadyCheckedOut'
	) {
		return new ShopError({
			code: errorCode,
			original: error,
		}, 'There was a problem with your basket. Please, refresh the page and try again.');
	}

	// These errors have well-formed messages and just need to be passed through
	if (
		errorCode === 'donationAmountTooLarge'
	) {
		return new ShopError({
			code: errorCode,
			original: error,
		}, errorMessage);
	}

	// TODO: Handle errors (`${code}: ${message}`) similar to ...

	// All other errors are treated as unknown
	return new ShopError({
		code: 'shop.unknown',
		original: error,
	}, 'An unknown error occurred.');
}
