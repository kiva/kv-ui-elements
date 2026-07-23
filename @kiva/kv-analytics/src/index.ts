import SimpleQueue from './SimpleQueue';

declare global {
	interface Window {
		gtag: any;
		snowplow: any;
		fbq: any;
		optimizely: any;
		dataLayer: any;
	}
}

export interface TransactionData {
	transactionId: string,
	loans: any[],
	loanCount: number,
	loanTotal: string,
	donations: any[],
	donationTotal: string,
	isTip: boolean,
	isUserEdited: boolean,
	kivaCards: any[],
	kivaCardCount: number,
	kivaCardTotal: string,
	itemTotal: string,
	depositTotal: string,
	kivaCreditAppliedTotal: string,
	paymentType: string,
	isFTD: boolean,
}

let snowplowLoaded = false;
let gtagLoaded = false;
let fbLoaded = false;
let optimizelyLoaded = false;
const queue = new SimpleQueue<() => void>();
// Transaction ids already tracked this session — guards against a Purchase (and its GA/Optimizely
// counterparts) firing twice for one order via a double-submit, retry, or component re-mount.
const trackedTransactionIds = new Set<string>();

function inBrowser() {
	return typeof window !== 'undefined';
}

function checkLibrariesLoaded() {
	if (!inBrowser()) {
		return false;
	}
	gtagLoaded = typeof window.gtag === 'function';
	snowplowLoaded = typeof window.snowplow === 'function';
	fbLoaded = typeof window.fbq === 'function';
	optimizelyLoaded = typeof window.optimizely === 'object';

	if (gtagLoaded && snowplowLoaded) {
		return true;
	}
	return false;
}

async function waitOnLibraries() {
	// wait for libraries to load, no longer than 5 seconds
	return new Promise((resolve) => {
		let interval;
		const timeout = setTimeout(() => {
			clearInterval(interval);
			resolve(false);
		}, 5000);

		interval = setInterval(() => {
			if (checkLibrariesLoaded()) {
				clearTimeout(timeout);
				clearInterval(interval);
				resolve(true);
			}
		}, 100);
	});
}

// Best-effort Meta pixel call: no-ops when fbq is absent (SSR, ad-blocked, consent-gated) and never
// throws into the caller even if a broken/blocked fbq shim throws when invoked.
function fireFbq(...args: unknown[]) {
	if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
		try {
			window.fbq(...args);
		} catch {
			// Swallow — analytics must never break the caller's flow
		}
	}
}

// https://developers.facebook.com/docs/facebook-pixel/implementation/conversion-tracking#tracking-custom-events
export function trackFBCustomEvent(eventName: string, params?: Record<string, unknown>) {
	fireFbq('trackCustom', eventName, params);
}

// Fire a Meta *standard* event (https://developers.facebook.com/docs/meta-pixel/reference#standard-events).
// Use for named Meta events (Purchase, Lead, CompleteRegistration, Donate, …); use trackFBCustomEvent for custom names.
export function trackFBEvent(eventName: string, params?: Record<string, unknown>) {
	fireFbq('track', eventName, params);
}

// https://developers.facebook.com/docs/meta-pixel/reference#standard-events
export function trackFBAddToCart(contentCategory: string, value?: number | string | null, currency = 'USD') {
	const numericValue = Number(value);
	// Only attach value/currency for a positive amount — a missing/zero value would send
	// value: 0 and dilute value-based optimization, so fall back to a bare AddToCart.
	const params = Number.isFinite(numericValue) && numericValue > 0
		? { content_category: contentCategory, value: numericValue, currency }
		: { content_category: contentCategory };
	fireFbq('track', 'AddToCart', params);
}

// User segmentation for the Meta PageView `user_type` param. Maps a transactor flag to the Meta
// vocabulary; the caller owns what counts as a transactor (at Kiva: has ever lent or deposited).
export type UserType = 'transactor' | 'non-transactor';

export function getUserType(isTransactor: boolean): UserType {
	return isTransactor ? 'transactor' : 'non-transactor';
}

/**
 * Names of the session cookies tracking whether a user has ever lent (`kvu_lb`) or deposited
 * (`kvu_db`). Written elsewhere as the raw string `'true'`/`'false'`.
 */
export const HAS_LENT_BEFORE_COOKIE = 'kvu_lb';
export const HAS_DEPOSIT_BEFORE_COOKIE = 'kvu_db';

/**
 * Reads the transactor-signal cookies and returns them as booleans.
 *
 * The caller passes a cookie getter, for example:
 * - cms-page-server `useCookie(name).value`
 * - ui `cookieStore.get(name)`
 *
 * @param getCookie Returns a cookie's raw string value (or nullish when unset).
 * @returns `hasLentBefore` / `hasDepositBefore`, each `true` only when the cookie is exactly `'true'`.
 */
export function getTransactorFlagsFromCookies(
	getCookie: (name: string) => string | null | undefined,
): { hasLentBefore: boolean; hasDepositBefore: boolean } {
	return {
		hasLentBefore: getCookie(HAS_LENT_BEFORE_COOKIE) === 'true',
		hasDepositBefore: getCookie(HAS_DEPOSIT_BEFORE_COOKIE) === 'true',
	};
}

/**
 * Resolves the Meta `user_type` segment straight from the transactor cookies — a transactor has
 * ever lent OR deposited.
 *
 * @param getCookie Returns a cookie's raw string value (or nullish when unset).
 * @returns `transactor` / `non-transactor`. See {@link getUserType}.
 */
export function getUserTypeFromCookies(
	getCookie: (name: string) => string | null | undefined,
): UserType {
	const { hasLentBefore, hasDepositBefore } = getTransactorFlagsFromCookies(getCookie);
	return getUserType(hasLentBefore || hasDepositBefore);
}

function trackSnowplowEvent(eventData) {
	checkLibrariesLoaded();
	if (!snowplowLoaded) return false;

	// In case there is a problem with the tracking event ensure that the callback gets called after 500ms
	let callbackCalled = false;
	const callbackTimeout = setTimeout(() => {
		if (!callbackCalled) {
			callbackCalled = true;
			eventData.callback({ error: 'timeout' });
		}
	}, 500);

	// Snowplow API
	/* eslint-disable max-len */
	// https://docs.snowplowanalytics.com/docs/collecting-data/collecting-from-own-applications/javascript-tracker/tracking-specific-events/#tracking-custom-structured-events
	// https://docs.snowplowanalytics.com/docs/collecting-data/collecting-from-own-applications/javascript-tracker/tracking-specific-events/#callback-after-track-2-15-0
	/* eslint-eable max-len */
	// snowplow('trackStructEvent', 'category', 'action', 'label', 'property', 'value', context, timestamp, afterTrack);
	window.snowplow(
		'trackStructEvent',
		eventData.category,
		eventData.action,
		eventData.eventLabel,
		eventData.eventProperty,
		eventData.eventValue,
		undefined,
		undefined,
		(payload) => {
			if (!callbackCalled) {
				callbackCalled = true;
				clearTimeout(callbackTimeout);
				eventData.callback({ payload });
			}
		},
	);
}

// Meta-only transaction tracking. Exported for completion paths (e.g. express checkout) that need
// the Purchase pixel without the GA/Optimizely channels the full trackTransaction fires.
export function trackFBTransaction(transactionData: TransactionData) {
	const itemTotal = Number(transactionData.itemTotal) || 0;
	// Skip Purchase when there's no valid amount — better to omit than report a $0/invalid-value
	// purchase that would dilute value-based optimization. (The FTD/Kiva-Card events below are
	// count signals, so they still fire.)
	if (itemTotal > 0) {
		const purchase: Record<string, unknown> = {
			currency: 'USD',
			value: itemTotal,
		};
		// Only assert content_type when FTD status is actually known. For guest checkouts the
		// FTD lookup returns no value, and defaulting to 'ReturningLender' would be a false claim.
		if (typeof transactionData.isFTD === 'boolean') {
			purchase.content_type = transactionData.isFTD ? 'FirstTimeDepositor' : 'ReturningLender';
		}
		fireFbq('track', 'Purchase', purchase);
	}

	// signify transaction has kiva cards — send standard value + currency.
	// The `kivaCardTotal`/`itemTotal` keys are kept alongside for backward compatibility
	// (Meta ignores them for value).
	if (transactionData.kivaCards && transactionData.kivaCards.length) {
		trackFBCustomEvent(
			'transactionContainsKivaCards',
			{
				kivaCardTotal: transactionData.kivaCardTotal,
				value: Number(transactionData.kivaCardTotal) || 0,
				currency: 'USD',
			},
		);
	}
	// signify transaction ftd status — send standard value + currency
	if (transactionData.isFTD) {
		trackFBCustomEvent(
			'firstTimeDepositorTransaction',
			{
				itemTotal,
				value: itemTotal,
				currency: 'USD',
			},
		);
	}
}

function trackGATransaction(transactionData: TransactionData) {
	// push to dataLayer
	if (typeof window.dataLayer === 'object') {
		window.dataLayer.push({
			event: 'setTransactionData',
			...transactionData,
		});
	}

	// Add each purchased item to the tracker
	const allItems = transactionData.loans
		.concat(transactionData.donations)
		.concat(transactionData.kivaCards);

	// Setup purchased items
	const purchasedItems = allItems.map((item) => {
		return {
			id: item.id,
			name: item.__typename, // eslint-disable-line
			price: item.price,
			quantity: 1,
		};
	});

	// Post transaction information to GA
	window.gtag('event', 'purchase', {
		transaction_id: transactionData.transactionId,
		value: transactionData.itemTotal,
		currency: 'USD',
		items: purchasedItems,
		non_interaction: true,
	});
}

function trackOPTransaction(transactionData: TransactionData) {
	if (Number(transactionData.depositTotal) > 0) {
		window.optimizely.push({
			type: 'event',
			eventName: 'deposit',
			tags: {
				revenue: Number(transactionData.depositTotal) * 100,
				deposit_amount: transactionData.depositTotal,
			},
		});
	}

	if (Number(transactionData.loanTotal) > 0) {
		window.optimizely.push({
			type: 'event',
			eventName: 'loan_share_purchase',
			tags: {
				revenue: Number(transactionData.loanTotal) * 100,
				loan_share_purchase_amount: transactionData.loanTotal,
			},
		});
	}

	if (Number(transactionData.donationTotal) > 0) {
		window.optimizely.push({
			type: 'event',
			eventName: 'donation',
			tags: {
				revenue: Number(transactionData.donationTotal) * 100,
				donation_amount: transactionData.donationTotal,
			},
		});
	}
}

export function fireQueuedEvents() {
	checkLibrariesLoaded();

	while (!queue.isEmpty()) {
		const method = queue.remove();
		if (inBrowser() && method) {
			// Wrapping the event call in a setTimeout ensures that this while loop
			// completes before the event functions are called. This is needed because
			// the event functions can add more events to this queue, and we only want
			// to process this queue once.
			window.setTimeout(() => {
				method();
			});
		}
	}
}

export async function initAnalytics(userId?: string|number, gaId?: string) {
	if (!inBrowser()) return false;

	// Wait for libraries to load
	const librariesLoaded = await waitOnLibraries();

	if (librariesLoaded) {
		// Setup Global Snowplow
		if (snowplowLoaded && userId) {
			window.snowplow('setUserId', userId);
		}
		// Setup Global GA Data
		if (userId && gtagLoaded && gaId) {
			window.gtag('config', gaId, {
				user_id: userId,
				dimension1: userId,
				send_page_view: false,
			});
		}
		// set id on dataLayer
		if (userId && typeof window.dataLayer === 'object') {
			window.dataLayer.push({
				kvuid: userId,
			});
		}

		// Fire any queued events
		fireQueuedEvents();

		return true;
	}

	return false;
}

export function trackEvent(
	category: string,
	action: string,
	label?: string,
	property?: string,
	value?: string,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	callback: (err: any) => void = () => {},
) {
	const eventLabel = (label !== undefined && label !== null) ? String(label) : undefined;
	const eventValue = (value !== undefined && value !== null) ? parseInt(value, 10) : undefined;
	const eventProperty = (property !== undefined && property !== null) ? String(property) : undefined;

	// Attempt gtag event
	if (gtagLoaded) {
		window.gtag('event', String(action), {
			event_category: String(category),
			event_label: eventLabel,
			value: eventValue,
		});
	}

	// Attempt Snowplow event
	const eventCall = () => {
		trackSnowplowEvent({
			category,
			action,
			eventLabel,
			eventProperty,
			eventValue,
			callback,
		});
	};
	if (snowplowLoaded) {
		eventCall();
	} else {
		callback({ error: 'not loaded' });
		// add missed snowplow event to queue
		queue.add(eventCall);
	}

	return true;
}

export function trackSelfDescribingEvent(eventData) {
	// the data passed into this should be a JSON object similar to the following
	// and should be defined by a schema in github.com/kiva/snowplow/tree/master/conf
	// {
	//     schema: 'https://raw.githubusercontent.com/kiva/...',
	//     data: {
	//         "loanId": 654321,
	//         "amount": 500,
	//			...
	//     }
	// });
	const eventCall = () => {
		window.snowplow('trackSelfDescribingEvent', eventData);
	};
	if (snowplowLoaded) {
		eventCall();
	} else {
		// add missed snowplow event to queue
		queue.add(eventCall);
	}

	return true;
}

export function trackPageView(to: any, from: any, userType?: UserType) {
	if (!inBrowser()) return false;
	checkLibrariesLoaded();

	let toUrl = typeof to === 'string' ? to : window.location.href;
	let fromUrl = typeof from === 'string' ? from : document.referrer;

	// update urls for async page changes
	if (to && to.matched && to.matched.length) {
		toUrl = window.location.origin + to.fullPath;
	}
	if (from && from.matched && from.matched.length) {
		fromUrl = window.location.origin + from.fullPath;
	}

	// Snowplow pageview
	if (snowplowLoaded) {
		// - snowplow seems to know better than the path rewriting performed by vue-router
		window.snowplow('setCustomUrl', toUrl);
		// set referrer for async page transitions
		if (from && from.matched && from.path !== '') {
			window.snowplow('setReferrerUrl', fromUrl); // asyncFromUrl
		}
		window.snowplow('trackPageView');
	}

	// Google Analytics gtag.js pageview
	if (gtagLoaded) {
		let gaPath = `${window.location.pathname}${window.location.search || ''}`;
		if (to && to.matched && to.matched.length) {
			gaPath = to.fullPath;
		}
		window.gtag('event', 'page_view', {
			page_path: gaPath,
		});
	}

	// facebook pixel pageview
	if (userType) {
		fireFbq('track', 'PageView', { user_type: userType });
	} else {
		fireFbq('track', 'PageView');
	}
}

export function trackTransaction(transactionData: TransactionData) {
	checkLibrariesLoaded();
	// Nothing to track
	if (!transactionData.transactionId) {
		return false;
	}

	// Only track a given transaction once
	const transactionKey = String(transactionData.transactionId);
	if (trackedTransactionIds.has(transactionKey)) {
		return false;
	}
	trackedTransactionIds.add(transactionKey);

	if (fbLoaded) {
		trackFBTransaction(transactionData);
	}
	if (gtagLoaded) {
		trackGATransaction(transactionData);
	}
	if (optimizelyLoaded) {
		trackOPTransaction(transactionData);
	}
}
