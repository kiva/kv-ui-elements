import {
	computed,
	onScopeDispose,
	ref,
	toValue,
	watch,
	type MaybeRefOrGetter,
} from 'vue';
import type { ApolloClient } from '@apollo/client/core';
import numeral from 'numeral';
import useBraintreeDropIn, { getClientToken } from './useBraintreeDropIn';
import { watchBasketTotals } from './basketTotals';
import { executeOneTimeCheckout } from './oneTimeCheckout';
import type { OneTimeCheckoutOptions, ValetInviter } from './oneTimeCheckout';
import { ShopError } from './shopError';
import { trackGuestEmailSignUp } from './trackTransaction';

/**
 * Tracking callback shape, matching the `kvTrackFunction` prop kv-components expects:
 * (category, action, label, property, value)
 */
export type KvTrackFunction = (
	category: string,
	action: string,
	label?: string,
	property?: string,
	value?: string | number,
) => void;

export interface UseOneTimeCheckoutOptions {
	/** Apollo client used for the basket totals, the Braintree client token and the checkout. */
	apollo: ApolloClient<any>,
	/** The checkout lightbox is open. The token is fetched and the basket watched only while it is. */
	visible: MaybeRefOrGetter<boolean>,
	/** The host is still preparing the basket; the basket is not watched until this turns off. */
	loading?: MaybeRefOrGetter<boolean>,
	/** Signed-in lenders get a customer-scoped Braintree token; everyone else checks out as a guest. */
	isLoggedIn: MaybeRefOrGetter<boolean>,
	/** Public Braintree tokenization key, used for guests instead of a client token. */
	braintreeTokenKey?: string,
	/** Braintree drop-in instance name, as given to KvPaymentSelect. */
	dropInName: string,
	/** Valet invitation to record with the checkout, when the basket came from one. */
	valetInviter?: ValetInviter | null,
	/** Keep the visitor on the page after checkout instead of kv-shop's post-purchase redirect. */
	deactivateRedirect?: boolean,
	/**
	 * Optional path to send a guest whose email already belongs to an account. By default the
	 * checkout stays put and reports the `shop.failedCheckoutValidation` error, and the host routes.
	 */
	failedValidationRedirect?: string,
	/** Analytics callback and the category its events are filed under. */
	kvTrackFunction?: KvTrackFunction,
	category?: string,
	/** Called with the kv-shop result once the checkout status is COMPLETED. */
	onComplete?: (result: unknown) => void,
	/** Called with a message ready to show and the error itself, so the host can branch on its `code`. */
	onError?: (message: string, error: unknown) => void,
}

/**
 * The shop half of a one-time checkout, for a host that renders kv-components' KvCheckoutLightbox
 * with kv-shop's KvPaymentSelect in its payment slot. The basket decides what is owed, credit
 * already on the basket comes off the total, the drop-in is handed to kv-shop only when a deposit
 * is due, a checkout that does not come back COMPLETED is reported as an error, and the guest's
 * Meta sign-up event fires once the transaction carrying it completed.
 *
 * Returns the refs the lightbox props and v-models bind to, plus `submit` for its `submit` event
 * and `refreshTotals` for its `totals` slot.
 */
export function useOneTimeCheckout(options: UseOneTimeCheckoutOptions) {
	const {
		apollo,
		dropInName,
		braintreeTokenKey = '',
		valetInviter = null,
		deactivateRedirect = false,
		failedValidationRedirect = '',
		kvTrackFunction = () => {},
		category = 'basket',
		onComplete = () => {},
		onError = () => {},
	} = options;

	const track = (action: string, label?: string, property?: string, value?: string | number) => {
		kvTrackFunction(category, action, label, property, value);
	};

	// What is owed comes from the basket: credit already applied comes off the total, and kv-shop
	// chooses a credit-only or a deposit checkout from the same figure. Until the first totals
	// arrive nothing is known, so the host keeps its submit disabled.
	let totalsSubscription: { unsubscribe: () => void } | null = null;
	const amountDue = ref<number | null>(null);
	const creditApplied = ref(0);
	const totalsLoaded = computed(() => amountDue.value !== null);
	const depositRequired = computed(() => (amountDue.value ?? 0) > 0);
	const totalDue = computed(() => numeral(amountDue.value ?? 0).format('0.00'));

	const stopWatchingTotals = () => {
		totalsSubscription?.unsubscribe();
		totalsSubscription = null;
	};

	const refreshTotals = () => {
		stopWatchingTotals();
		// Re-read from the server after showing the cached figure: a basket mutation made before
		// the lightbox opened does not update the cached totals on its own.
		totalsSubscription = watchBasketTotals(apollo, { fetchPolicy: 'cache-and-network' }).subscribe({
			next: ({ data }) => {
				const totals = data?.shop?.basket?.totals;
				amountDue.value = numeral(totals?.creditAmountNeeded).value() ?? 0;
				creditApplied.value = numeral(totals?.creditAppliedTotal).value() ?? 0;
			},
			error: (e) => {
				onError(e?.message ?? 'Unable to load your basket totals.', e);
			},
		});
	};

	// Payment
	const paying = ref(false);
	const transactionsEnabled = ref(false);
	const dropInAuthToken = ref('');

	// Guest fields, bound to the lightbox's v-models; the lightbox validates them before `submit`.
	const guestEmail = ref('');
	const termsAgreement = ref(false);
	const emailUpdates = ref(false);

	const submit = async () => {
		if (paying.value) {
			return;
		}

		const isLoggedIn = toValue(options.isLoggedIn);
		paying.value = true;
		const amount = amountDue.value ?? 0;
		track('submit', 'lending-checkout-modal', numeral(amount).format('$0,0[.]00'));

		try {
			const checkoutOptions: OneTimeCheckoutOptions = {
				apollo,
				deactivateRedirect,
			};
			if (valetInviter) {
				checkoutOptions.valetInviter = valetInviter;
			}
			// kv-shop asks the drop-in for a payment method only when a deposit is due, and refuses
			// a deposit checkout without one, so the drop-in is handed over exactly when rendered.
			if (depositRequired.value) {
				checkoutOptions.braintree = useBraintreeDropIn(dropInName);
			}
			if (!isLoggedIn) {
				checkoutOptions.emailAddress = guestEmail.value.trim();
				checkoutOptions.emailOptIn = emailUpdates.value;
			}

			const result = await executeOneTimeCheckout(checkoutOptions);

			// kv-shop only throws on GraphQL errors; a declined card can come back cleanly with a
			// failed status, and that is not a success.
			const status = result?.data?.checkoutStatus;
			if (status?.status !== 'COMPLETED') {
				throw new ShopError(
					{ code: 'shop.checkoutNotCompleted' },
					status?.errorMessage || 'Checkout failed',
				);
			}
			// The sign-up only exists once the transaction carrying it completed.
			trackGuestEmailSignUp(isLoggedIn, emailUpdates.value);
			onComplete(result);
		} catch (e: any) {
			const msg = (e?.code === 'shop.unknown' ? e?.original : e?.message) ?? e;
			track('fail', 'lending-checkout-modal', JSON.stringify(msg), `${Math.round(amount * 100)}`);

			// A guest whose email belongs to an account has to sign in to pay for this basket.
			const canRedirect = failedValidationRedirect && typeof window !== 'undefined';
			if (e?.code === 'shop.failedCheckoutValidation' && canRedirect) {
				window.location.href = failedValidationRedirect;
				return;
			}

			if (e?.code === 'shop.dropinNoPaymentMethod') {
				onError(
					'There was a problem validating your payment information. '
						+ 'Please double-check the details and try again.',
					e,
				);
			} else if (e?.message && e?.code !== 'shop.dropinRequired') {
				onError(e.message, e);
			} else {
				onError('Something went wrong. Please, refresh the page and try again.', e);
			}
		} finally {
			paying.value = false;
		}
	};

	// The token is fetched as soon as the lightbox opens so the drop-in is ready by the time the
	// form shows; the basket is watched only once the host has finished preparing it.
	watch(() => toValue(options.visible), async (isVisible) => {
		if (!isVisible) return;
		if (toValue(options.isLoggedIn)) {
			dropInAuthToken.value = await getClientToken(apollo) ?? '';
		} else {
			dropInAuthToken.value = braintreeTokenKey;
		}
	}, { immediate: true });

	watch(() => toValue(options.visible) && !toValue(options.loading ?? false), (active) => {
		if (active) {
			refreshTotals();
		} else {
			stopWatchingTotals();
		}
	}, { immediate: true });

	onScopeDispose(stopWatchingTotals);

	return {
		amountDue,
		creditApplied,
		totalsLoaded,
		depositRequired,
		totalDue,
		dropInAuthToken,
		transactionsEnabled,
		paying,
		guestEmail,
		termsAgreement,
		emailUpdates,
		refreshTotals,
		submit,
	};
}
