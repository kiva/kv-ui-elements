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
	// Lifecycle data resolved by the consuming app before the transaction completes, since the
	// purchase itself is what moves a lender out of an idle or lapsed stage.
	lifecycleStage?: string | null,
	daysSinceLastLoan?: number | null,
	reEngagementEvent?: string | null,
}

/**
 * Read/write access to the transactor cookies, supplied by the consuming app:
 * - cookieStore: `{ get: (n) => cookieStore.get(n), set: (n, v) => cookieStore.set(n, v, { path: '/' }) }`
 * - Nuxt: `{ get: (n) => useCookie(n).value, set: (n, v) => { useCookie(n).value = v; } }`
 */
export interface TransactorCookieAccess {
	get: (name: string) => string | null | undefined;
	set: (name: string, value: string) => void;
}

/**
 * Values for Meta Pixel's `content_category` param on the AddToCart event — the `contentCategory`
 * argument passed to {@link trackFBAddToCart}.
 */
export const FB_CONTENT_CATEGORY_LOAN = 'Loan';
export const FB_CONTENT_CATEGORY_KIVA_CARD = 'Kiva Card';

/**
 * Names of the session cookies tracking whether a user has ever lent (`kvu_lb`) or deposited
 * (`kvu_db`). Written elsewhere as the raw string `'true'`/`'false'`.
 */
export const HAS_LENT_BEFORE_COOKIE = 'kvu_lb';
export const HAS_DEPOSIT_BEFORE_COOKIE = 'kvu_db';

let snowplowLoaded = false;
let gtagLoaded = false;
let optimizelyLoaded = false;
const queue = new SimpleQueue<() => void>();

function inBrowser() {
	return typeof window !== 'undefined';
}

function checkLibrariesLoaded() {
	if (!inBrowser()) {
		return false;
	}
	gtagLoaded = typeof window.gtag === 'function';
	snowplowLoaded = typeof window.snowplow === 'function';
	optimizelyLoaded = typeof window.optimizely?.push === 'function';

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

// Whether the Meta pixel is actually there to receive an event. False under SSR, ad blockers, and
// consent gating, and before the pixel snippet has finished loading.
function fbqAvailable() {
	return typeof window !== 'undefined' && typeof window.fbq === 'function';
}

// Best-effort Meta pixel call: no-ops when fbq is absent (SSR, ad-blocked, consent-gated) and never
// throws into the caller even if a broken/blocked fbq shim throws when invoked.
function fireFbq(...args: unknown[]) {
	if (fbqAvailable()) {
		try {
			window.fbq(...args);
		} catch {
			// Swallow — analytics must never break the caller's flow
		}
	}
}

// https://developers.facebook.com/docs/facebook-pixel/implementation/conversion-tracking#tracking-custom-events
export function trackFBCustomEvent(eventName: string, params?: Record<string, unknown>) {
	// Omit the params argument entirely when absent so fbq never receives an explicit undefined
	if (params === undefined) {
		fireFbq('trackCustom', eventName);
		return;
	}
	fireFbq('trackCustom', eventName, params);
}

// Fire a Meta *standard* event (https://developers.facebook.com/docs/meta-pixel/reference#standard-events).
// Use for named Meta events (Purchase, Lead, CompleteRegistration, Donate, …); use trackFBCustomEvent for custom names.
export function trackFBEvent(eventName: string, params?: Record<string, unknown>) {
	fireFbq('track', eventName, params);
}

// Meta's value-based optimization is diluted by `value: 0`, so attach value/currency only for a
// positive amount and let the event stand as a bare count signal otherwise.
function valueParams(amount?: number | string | null, currency = 'USD') {
	const numericValue = Number(amount);
	return Number.isFinite(numericValue) && numericValue > 0
		? { value: numericValue, currency }
		: {};
}

// https://developers.facebook.com/docs/meta-pixel/reference#standard-events
export function trackFBAddToCart(contentCategory: string, value?: number | string | null, currency = 'USD') {
	fireFbq('track', 'AddToCart', {
		content_category: contentCategory,
		...valueParams(value, currency),
	});
}

/**
 * Custom Meta pixel event names for key lender actions. Fire these through {@link trackMetaEvent}
 * so every consuming app emits the same names.
 */
export const META_EVENTS = {
	ACCOUNT_CREATED: 'accountCreated',
	DONATION: 'donation',
	EMAIL_SIGN_UP: 'emailSignUp',
	GIVING_FUND_CREATED: 'givingFundCreated',
	GIVING_FUND_STARTED: 'givingFundStarted',
	KIVA_CARD_REDEMPTION: 'kivaCardRedemption',
} as const;

/**
 * Fires a custom Meta pixel event (see {@link META_EVENTS}). When there is no event data the
 * params argument is omitted entirely rather than passed as undefined.
 */
export function trackMetaEvent(eventName: string, eventData?: Record<string, unknown> | null) {
	if (eventData == null) {
		trackFBCustomEvent(eventName);
		return;
	}
	trackFBCustomEvent(eventName, eventData);
}

/**
 * Fires the {@link META_EVENTS} DONATION event for a completed donation.
 *
 * @param donationTotal The donation amount; the event only fires for a finite, positive amount.
 * @returns Whether the event fired.
 */
export function trackDonationMetaEvent(donationTotal?: number | string | null): boolean {
	const params = valueParams(donationTotal);
	if (!('value' in params)) {
		return false;
	}
	trackMetaEvent(META_EVENTS.DONATION, {
		donationTotal,
		...params,
	});
	return true;
}

/**
 * Lender lifecycle stages, fired as the `lifecycleStage` param on Meta events.
 *
 * Mirrored from the internal "Lifecycle stages" doc, which is owned by analytics and is the
 * source of truth. If the stages change there, they must be changed here too.
 */
export const LIFECYCLE_STAGES = {
	REGISTERED: 'registered',
	UNCONVERTED_90: 'unconverted90',
	UNCONVERTED_180: 'unconverted180',
	NEW: 'new',
	ENGAGED: 'engaged',
	IDLE_90: 'idle90',
	IDLE_180: 'idle180',
	IDLE_365: 'idle365',
	LAPSED_CHURNED: 'lapsedChurned',
} as const;

/**
 * Custom Meta events fired when a disengaged lender completes a checkout containing a loan
 * purchase. Fired through {@link trackReEngagementEvent}.
 */
export const RE_ENGAGEMENT_EVENTS = {
	IDLE: 'idleLenderReEngaged',
	LAPSED: 'lapsedLenderReEngaged',
} as const;

/**
 * The re-engagement event a stage qualifies for, if any.
 *
 * IDLE_90 sits in the "Active" lifecycle phase while IDLE_180 and IDLE_365 sit in "Idle". The
 * requirement says stages containing "idle", so all three are included. Drop the IDLE_90 entry
 * if marketing scopes it to the Idle phase.
 */
const RE_ENGAGEMENT_BY_STAGE: Record<string, string> = {
	[LIFECYCLE_STAGES.LAPSED_CHURNED]: RE_ENGAGEMENT_EVENTS.LAPSED,
	[LIFECYCLE_STAGES.IDLE_365]: RE_ENGAGEMENT_EVENTS.IDLE,
	[LIFECYCLE_STAGES.IDLE_180]: RE_ENGAGEMENT_EVENTS.IDLE,
	[LIFECYCLE_STAGES.IDLE_90]: RE_ENGAGEMENT_EVENTS.IDLE,
};

/**
 * @param stage A {@link LIFECYCLE_STAGES} value
 * @returns The re-engagement event name for this stage, if any
 */
export function getReEngagementEvent(stage?: string | null): string | null {
	return (stage && RE_ENGAGEMENT_BY_STAGE[stage]) || null;
}

/**
 * Fires the re-engagement Meta event for a completed transaction, if it qualifies. Only a loan
 * purchase moves a lender out of an idle or lapsed stage, so the event fires only when the
 * transaction contains loans and the consuming app resolved a `reEngagementEvent` (from the
 * lifecycle stage measured immediately before the transaction — see {@link getReEngagementEvent}).
 *
 * Kept separate from {@link trackFBTransaction} so consumers control when this fires and apps
 * with an existing inline firing block cannot double-fire while migrating.
 *
 * @returns Whether the event fired.
 */
export function trackReEngagementEvent(transactionData: TransactionData): boolean {
	const {
		reEngagementEvent,
		lifecycleStage,
		daysSinceLastLoan,
		loanTotal,
		itemTotal,
		loans,
	} = transactionData;
	if (!reEngagementEvent || !loans?.length) {
		return false;
	}
	trackFBCustomEvent(reEngagementEvent, {
		loanTotal,
		itemTotal,
		lifecycleStage,
		daysSinceLastLoan,
	});
	return true;
}

// User segmentation for the Meta PageView `user_type` param. Maps a transactor flag to the Meta
// vocabulary; the caller owns what counts as a transactor (at Kiva: has ever lent or deposited).
export type UserType = 'transactor' | 'non-transactor';

export function getUserType(isTransactor: boolean): UserType {
	return isTransactor ? 'transactor' : 'non-transactor';
}

/**
 * Fires the Meta (Facebook) PageView pixel, optionally segmented by `user_type`.
 *
 * @param userType Optional Meta `user_type` segment (`transactor` / `non-transactor`).
 */
export function trackFBPageView(userType?: UserType) {
	fireFbq('track', 'PageView', userType ? { user_type: userType } : undefined);
}

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

/**
 * The two cookies track whether the user has EVER lent or deposited, and feed the Meta `user_type`
 * segment. This function only ever turns a flag ON: it writes `'true'` when either the existing
 * cookie or this transaction says so, and otherwise leaves the cookie alone. It never writes `'false'`.
 *
 * @param cookies Read/write access to the two cookies. See {@link TransactorCookieAccess}.
 * @param signals What THIS transaction proves — `hasLoans`, `hasDeposit`.
 * @returns The updated flags, so callers need not re-read the cookies on the same tick.
 */
export function recordTransactorSignals(
	cookies: TransactorCookieAccess,
	{ hasLoans, hasDeposit }: { hasLoans: boolean; hasDeposit: boolean },
): { hasLentBefore: boolean; hasDepositBefore: boolean } {
	const existing = getTransactorFlagsFromCookies(cookies.get);
	const hasLentBefore = existing.hasLentBefore || hasLoans;
	const hasDepositBefore = existing.hasDepositBefore || hasDeposit;

	if (hasLentBefore) {
		cookies.set(HAS_LENT_BEFORE_COOKIE, 'true');
	}
	if (hasDepositBefore) {
		cookies.set(HAS_DEPOSIT_BEFORE_COOKIE, 'true');
	}

	return { hasLentBefore, hasDepositBefore };
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
	/* eslint-enable max-len */
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

/**
 * Meta transaction tracking. Called by {@link trackTransaction}, and exported for completion paths
 * (e.g. express checkout) that need the Purchase pixel without the GA/Optimizely channels.
 *
 * @param transactionData The completed transaction.
 */
export function trackFBTransaction(transactionData: TransactionData) {
	if (!fbqAvailable()) {
		return;
	}

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

	// Signify transaction has kiva cards — send standard value + currency when the amount is usable.
	// The `kivaCardTotal`/`itemTotal` keys are kept alongside for backward compatibility
	// (Meta ignores them for value).
	if (transactionData.kivaCards && transactionData.kivaCards.length) {
		trackFBCustomEvent(
			'transactionContainsKivaCards',
			{
				kivaCardTotal: transactionData.kivaCardTotal,
				...valueParams(transactionData.kivaCardTotal),
			},
		);
	}
	// signify transaction ftd status — send standard value + currency when the amount is usable
	if (transactionData.isFTD) {
		trackFBCustomEvent(
			'firstTimeDepositorTransaction',
			{
				itemTotal,
				...valueParams(itemTotal),
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

/**
 * Fires a page view to Snowplow and Google Analytics.
 *
 * @param to Destination — a route object (uses `fullPath`) or a URL string. Falls back to
 *   `window.location.href` when omitted.
 * @param from Referrer — a route object or a URL string. Falls back to `document.referrer`; the
 *   Snowplow referrer is only set for matched route transitions.
 * @returns `false` when called outside the browser; otherwise `undefined`.
 */
export function trackPageView(to: any, from: any) {
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
}

export function trackTransaction(transactionData: TransactionData) {
	checkLibrariesLoaded();
	// Nothing to track
	if (!transactionData.transactionId) {
		return false;
	}

	trackFBTransaction(transactionData);
	if (gtagLoaded) {
		trackGATransaction(transactionData);
	}
	if (optimizelyLoaded) {
		trackOPTransaction(transactionData);
	}
}
