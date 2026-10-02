import { effectScope, nextTick, ref } from 'vue';
import { trackMetaEvent } from '@kiva/kv-analytics';
import { useOneTimeCheckout } from '../useOneTimeCheckout';
import { executeOneTimeCheckout } from '../oneTimeCheckout';
import useBraintreeDropIn, { getClientToken } from '../useBraintreeDropIn';
import { watchBasketTotals } from '../basketTotals';

jest.mock('../oneTimeCheckout', () => ({
	executeOneTimeCheckout: jest.fn(),
}));

jest.mock('../useBraintreeDropIn', () => ({
	__esModule: true,
	default: jest.fn(() => ({ requestPaymentMethod: jest.fn() })),
	getClientToken: jest.fn(),
}));

jest.mock('../basketTotals', () => ({
	watchBasketTotals: jest.fn(),
}));

jest.mock('@kiva/kv-analytics', () => ({
	META_EVENTS: { EMAIL_SIGN_UP: 'emailSignUp' },
	trackMetaEvent: jest.fn(),
}));

const mockedCheckout = executeOneTimeCheckout as jest.Mock;
const mockedDropIn = useBraintreeDropIn as jest.Mock;
const mockedClientToken = getClientToken as jest.Mock;
const mockedWatchTotals = watchBasketTotals as jest.Mock;
const mockedTrackMeta = trackMetaEvent as jest.Mock;

// What the basket reports; each test sets it before opening.
const totals = { creditAmountNeeded: '25.00', creditAppliedTotal: '0.00' };

const apollo = {} as any;
const track = jest.fn();
const onComplete = jest.fn();
const onError = jest.fn();

// Runs the composable in an effect scope, as a component's setup would, so watchers and the
// dispose hook work without mounting anything.
const run = (overrides: Record<string, unknown> = {}) => {
	const visible = ref(true);
	const loading = ref(false);
	const isLoggedIn = ref(false);
	const scope = effectScope();
	const checkout = scope.run(() => useOneTimeCheckout({
		apollo,
		visible,
		loading,
		isLoggedIn,
		braintreeTokenKey: 'public-token',
		dropInName: 'test-drop-in',
		kvTrackFunction: track,
		category: 'upc',
		onComplete,
		onError,
		...overrides,
	}))!;
	return {
		checkout, scope, visible, loading, isLoggedIn,
	};
};

const flush = async () => {
	await nextTick();
	await Promise.resolve();
};

/* eslint-disable no-param-reassign */
const fillGuestFields = (checkout: ReturnType<typeof run>['checkout'], optIn = false) => {
	checkout.guestEmail.value = 'lender@example.com';
	checkout.termsAgreement.value = true;
	checkout.emailUpdates.value = optIn;
};
/* eslint-enable no-param-reassign */

beforeEach(() => {
	jest.clearAllMocks();
	totals.creditAmountNeeded = '25.00';
	totals.creditAppliedTotal = '0.00';
	mockedWatchTotals.mockImplementation(() => ({
		subscribe: ({ next }: { next: (r: unknown) => void }) => {
			next({ data: { shop: { basket: { totals: { ...totals } } } } });
			return { unsubscribe: jest.fn() };
		},
	}));
	mockedClientToken.mockResolvedValue('client-token');
	mockedCheckout.mockResolvedValue({ data: { checkoutStatus: { status: 'COMPLETED' } } });
});

describe('useOneTimeCheckout', () => {
	describe('totals', () => {
		it('reports the basket figures and that they have loaded', async () => {
			totals.creditAmountNeeded = '0.00';
			totals.creditAppliedTotal = '25.00';
			const { checkout } = run();
			await flush();
			expect(checkout.totalsLoaded.value).toBe(true);
			expect(checkout.amountDue.value).toBe(0);
			expect(checkout.creditApplied.value).toBe(25);
			expect(checkout.depositRequired.value).toBe(false);
		});

		it('reports totals as not loaded until the basket has answered', async () => {
			mockedWatchTotals.mockImplementation(() => ({ subscribe: () => ({ unsubscribe: jest.fn() }) }));
			const { checkout } = run();
			await flush();
			expect(checkout.totalsLoaded.value).toBe(false);
			expect(checkout.depositRequired.value).toBe(false);
		});

		it('watches the basket with cache-and-network so a fresh basket is re-read', async () => {
			run();
			await flush();
			expect(mockedWatchTotals).toHaveBeenCalledWith(apollo, { fetchPolicy: 'cache-and-network' });
		});

		it('reports the amount due for the drop-in when a deposit is due', async () => {
			const { checkout } = run();
			await flush();
			expect(checkout.depositRequired.value).toBe(true);
			expect(checkout.totalDue.value).toBe('25.00');
		});

		it('re-subscribes on refreshTotals', async () => {
			const unsubscribe = jest.fn();
			mockedWatchTotals.mockImplementation(() => ({ subscribe: () => ({ unsubscribe }) }));
			const { checkout } = run();
			await flush();
			checkout.refreshTotals();
			expect(unsubscribe).toHaveBeenCalledTimes(1);
			expect(mockedWatchTotals).toHaveBeenCalledTimes(2);
		});

		it('passes a totals error to the host', async () => {
			mockedWatchTotals.mockImplementation(() => ({
				subscribe: ({ error }: { error: (e: unknown) => void }) => {
					error(new Error('Basket unavailable'));
					return { unsubscribe: jest.fn() };
				},
			}));
			run();
			await flush();
			expect(onError).toHaveBeenCalledWith('Basket unavailable', expect.any(Error));
		});
	});

	describe('payment method token', () => {
		it('uses a customer client token for a signed-in lender', async () => {
			const { checkout } = run({ isLoggedIn: ref(true) });
			await flush();
			expect(mockedClientToken).toHaveBeenCalledWith(apollo);
			expect(checkout.dropInAuthToken.value).toBe('client-token');
		});

		it('uses the public key for a guest', async () => {
			const { checkout } = run();
			await flush();
			expect(mockedClientToken).not.toHaveBeenCalled();
			expect(checkout.dropInAuthToken.value).toBe('public-token');
		});
	});

	describe('submit', () => {
		it('checks a guest out with the email and opt-in and no drop-in, then reports completion', async () => {
			totals.creditAmountNeeded = '0.00';
			const { checkout } = run();
			await flush();
			fillGuestFields(checkout);
			await checkout.submit();

			const options = mockedCheckout.mock.calls[0][0];
			expect(options.emailAddress).toBe('lender@example.com');
			expect(options.emailOptIn).toBe(false);
			expect(options.deactivateRedirect).toBe(false);
			expect(options.braintree).toBeUndefined();
			expect(mockedDropIn).not.toHaveBeenCalled();
			expect(mockedTrackMeta).not.toHaveBeenCalled();
			expect(onComplete).toHaveBeenCalledWith({ data: { checkoutStatus: { status: 'COMPLETED' } } });
			expect(track).toHaveBeenCalledWith('upc', 'submit', 'lending-checkout-modal', '$0', undefined);
		});

		it('reports the email sign-up to Meta only when the guest opted in', async () => {
			totals.creditAmountNeeded = '0.00';
			const { checkout } = run();
			await flush();
			fillGuestFields(checkout, true);
			await checkout.submit();

			expect(mockedCheckout.mock.calls[0][0].emailOptIn).toBe(true);
			expect(mockedTrackMeta).toHaveBeenCalledWith('emailSignUp');
		});

		it('hands the drop-in and the valet inviter to kv-shop for a signed-in deposit', async () => {
			const inviter = { invitationUrl: 'https://kiva.org/invite', inviterId: 'kiva' };
			const { checkout } = run({
				isLoggedIn: ref(true), deactivateRedirect: true, valetInviter: inviter, dropInName: 'valet',
			});
			await flush();
			await checkout.submit();

			expect(mockedDropIn).toHaveBeenCalledWith('valet');
			const options = mockedCheckout.mock.calls[0][0];
			expect(options.braintree).toBeDefined();
			expect(options.valetInviter).toEqual(inviter);
			expect(options.deactivateRedirect).toBe(true);
			expect(options.emailAddress).toBeUndefined();
		});

		it('flags paying while the checkout runs and ignores a second submit', async () => {
			let finish: (value: unknown) => void = () => {};
			mockedCheckout.mockImplementation(() => new Promise((resolve) => { finish = resolve; }));
			const { checkout } = run({ isLoggedIn: ref(true) });
			await flush();

			const first = checkout.submit();
			expect(checkout.paying.value).toBe(true);
			await checkout.submit();
			expect(mockedCheckout).toHaveBeenCalledTimes(1);

			finish({ data: { checkoutStatus: { status: 'COMPLETED' } } });
			await first;
			expect(checkout.paying.value).toBe(false);
		});
	});

	describe('failures', () => {
		it('reports the validation failure with its code by default, so the host routes itself', async () => {
			totals.creditAmountNeeded = '0.00';
			mockedCheckout.mockRejectedValue({ code: 'shop.failedCheckoutValidation', message: 'must sign in' });
			const { checkout } = run();
			await flush();
			fillGuestFields(checkout);
			await checkout.submit();

			expect(onError).toHaveBeenCalledWith('must sign in', expect.objectContaining({ code: 'shop.failedCheckoutValidation' }));
			expect(onComplete).not.toHaveBeenCalled();
		});

		it('sends a guest whose email belongs to an account to the path the host asked for', async () => {
			totals.creditAmountNeeded = '0.00';
			mockedCheckout.mockRejectedValue({ code: 'shop.failedCheckoutValidation', message: 'must sign in' });
			const location = { href: '' };
			const original = window.location;
			Object.defineProperty(window, 'location', { value: location, writable: true, configurable: true });

			const { checkout } = run({ failedValidationRedirect: '/checkout' });
			await flush();
			fillGuestFields(checkout);
			await checkout.submit();

			expect(location.href).toBe('/checkout');
			expect(onError).not.toHaveBeenCalled();
			Object.defineProperty(window, 'location', { value: original, writable: true, configurable: true });
		});

		it('explains a missing payment method and tracks the failure', async () => {
			mockedCheckout.mockRejectedValue({ code: 'shop.dropinNoPaymentMethod', message: 'nope' });
			const { checkout } = run({ isLoggedIn: ref(true) });
			await flush();
			await checkout.submit();

			expect(onError.mock.calls[0][0]).toMatch(/payment information/);
			expect(track).toHaveBeenCalledWith('upc', 'fail', 'lending-checkout-modal', expect.any(String), '2500');
		});

		it('passes any other message through, with the error itself for branching', async () => {
			mockedCheckout.mockRejectedValue({ code: 'shop.unknown', message: 'Card declined', original: 'declined' });
			const { checkout } = run({ isLoggedIn: ref(true) });
			await flush();
			await checkout.submit();

			expect(onError).toHaveBeenCalledWith('Card declined', expect.objectContaining({ code: 'shop.unknown' }));
		});

		it('treats a checkout that came back without COMPLETED as a failure, not a success', async () => {
			mockedCheckout.mockResolvedValue({ data: { checkoutStatus: { status: 'FAILED', errorMessage: 'Card declined' } } });
			const { checkout } = run({ isLoggedIn: ref(true) });
			await flush();
			await checkout.submit();

			expect(onComplete).not.toHaveBeenCalled();
			expect(onError).toHaveBeenCalledWith('Card declined', expect.objectContaining({ code: 'shop.checkoutNotCompleted' }));
			expect(mockedTrackMeta).not.toHaveBeenCalled();
		});
	});

	describe('opening, loading and closing', () => {
		it('waits to watch the basket until the host has finished loading, but fetches the token at once', async () => {
			const loading = ref(true);
			const { checkout } = run({ loading, isLoggedIn: ref(true) });
			await flush();
			expect(mockedWatchTotals).not.toHaveBeenCalled();
			expect(checkout.dropInAuthToken.value).toBe('client-token');

			loading.value = false;
			await flush();
			expect(mockedWatchTotals).toHaveBeenCalledTimes(1);
		});

		it('stops watching the basket when closed and when the scope is disposed', async () => {
			const unsubscribe = jest.fn();
			mockedWatchTotals.mockImplementation(() => ({ subscribe: () => ({ unsubscribe }) }));
			const { visible, scope } = run();
			await flush();

			visible.value = false;
			await flush();
			expect(unsubscribe).toHaveBeenCalledTimes(1);

			visible.value = true;
			await flush();
			scope.stop();
			expect(unsubscribe).toHaveBeenCalledTimes(2);
		});
	});
});
