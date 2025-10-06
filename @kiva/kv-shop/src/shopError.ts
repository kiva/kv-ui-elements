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
	// Handle errors (`${code}: ${message}`) similar to:
	// INVALID_REQUEST: Exception while fetching data (/_entities[0]/doNoncePaymentDepositAndCheckout): Invalid request: TRANSACTION_PAYMENT_METHOD_NONCE_UNKNOWN: Unknown or expired payment_method_nonce.
	// INVALID_REQUEST: Exception while fetching data (/_entities[0]/doNoncePaymentDepositAndCheckout): Invalid request: ADDRESS_POSTAL_CODE_IS_TOO_LONG: Postal code may contain no more than 9 letter or number characters., ADDRESS_POSTAL_CODE_IS_TOO_LONG: Postal code may contain no more than 9 letter or number characters.
	if (errorMessage.includes('Invalid request: ')) {
		const finalError = errorMessage.split('Invalid request: ')[1]
			.split('., ')
			.map((e: string) => e.matchAll(/[A-Z_]+: (.*)/g))[0];
		const finalCode = finalError[1];
		const finalMessage = finalError[2];

		return new ShopError({
			code: `paymentMethod.${finalCode}`,
			original: error,
		}, finalMessage);
	}
	// Handle errors (`${code}: ${message}`) similar to:
	// insufficientFunds: Exception while fetching data (/_entities[0]/doNoncePaymentDepositAndCheckout): Insufficient funds for fund account xxxxxxx during loan purchase of xxxxxxx
	// undefined: Exception while fetching data (/_entities[0]/doNoncePaymentDepositAndCheckout): ShopException: There is not enough credit in the basket to complete this order:685003252
	if (errorCode === 'insufficientFunds' || errorMessage.includes('There is not enough credit')) {
		return new ShopError({
			code: 'shop.insufficientFunds',
			original: error,
		}, 'There is not enough money to complete the checkout. Please double-check the details and try again.');
	}

	// Giving Fund Errors
	// Handle errors (`${code}: ${message}`) similar to:
	// Exception while fetching data (/addGivingFund) : \"User 3480555 already has a Giving Fund with category WOMEN\""
	if (errorMessage.includes('already has a Giving Fund with category')) {
		return new ShopError({
			code: 'shop.givingfunds.duplicateFundCreation',
			original: error,
		}, 'You already have a giving fund supporting this group of people.');
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
