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

// https://developers.facebook.com/docs/facebook-pixel/implementation/conversion-tracking#tracking-custom-events
function trackFBCustomEvent(eventName: string, eventData?: any) {
	if (fbLoaded) {
		window.fbq('trackCustom', eventName, eventData);
	}
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

function trackFBTransaction(transactionData: TransactionData) {
	const itemTotal = transactionData.itemTotal || '';
	if (typeof window.fbq !== 'undefined' && typeof itemTotal !== 'undefined') {
		window.fbq('track', 'Purchase', {
			currency: 'USD',
			value: itemTotal,
			content_type: transactionData.isFTD ? 'FirstTimeDepositor' : 'ReturningLender',
		});
	}

	// signify transaction has kiva cards
	if (transactionData.kivaCards && transactionData.kivaCards.length) {
		trackFBCustomEvent(
			'transactionContainsKivaCards',
			{
				kivaCardTotal: transactionData.kivaCardTotal,
			},
		);
	}
	// signifiy transaction ftd status
	if (transactionData.isFTD && typeof itemTotal !== 'undefined') {
		trackFBCustomEvent(
			'firstTimeDepositorTransaction',
			{
				itemTotal,
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

	// facebook pixel pageview
	if (fbLoaded) {
		// we used to pass a user_type but it's always empty across the site
		// { user_type: '???'}
		window.fbq('track', 'PageView');
	}
}

export function trackTransaction(transactionData: TransactionData) {
	checkLibrariesLoaded();
	// Nothing to track
	if (!transactionData.transactionId) {
		return false;
	}

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
