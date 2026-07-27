import {
	getTransactorFlagsFromCookies,
	getUserType,
	getUserTypeFromCookies,
	recordTransactorSignals,
	HAS_LENT_BEFORE_COOKIE,
	HAS_DEPOSIT_BEFORE_COOKIE,
	trackFBAddToCart,
	trackFBCustomEvent,
	trackFBEvent,
	trackFBPageView,
	trackFBTransaction,
	trackPageView,
	trackTransaction,
	type TransactionData,
} from '../index';

describe('@kiva/kv-analytics facebook pixel', () => {
	let fbq: jest.Mock;

	beforeEach(() => {
		fbq = jest.fn();
		(window as any).fbq = fbq;
		// isolate the facebook path — leave gtag/snowplow/optimizely unset
		delete (window as any).gtag;
		delete (window as any).snowplow;
		delete (window as any).optimizely;
	});

	afterEach(() => {
		jest.clearAllMocks();
		delete (window as any).fbq;
	});

	describe('trackFBCustomEvent', () => {
		it('fires a custom event with params', () => {
			trackFBCustomEvent('givingFundCreated', { fundId: 'abc' });
			expect(fbq).toHaveBeenCalledWith('trackCustom', 'givingFundCreated', { fundId: 'abc' });
		});

		it('does not throw and does not fire when fbq is unavailable', () => {
			delete (window as any).fbq;
			expect(() => trackFBCustomEvent('x')).not.toThrow();
			expect(fbq).not.toHaveBeenCalled();
		});
	});

	describe('trackFBEvent', () => {
		it('fires a standard event with params', () => {
			trackFBEvent('Donate', { value: 10, currency: 'USD' });
			expect(fbq).toHaveBeenCalledWith('track', 'Donate', { value: 10, currency: 'USD' });
		});

		it('does not throw and does not fire when fbq is unavailable', () => {
			delete (window as any).fbq;
			expect(() => trackFBEvent('Donate')).not.toThrow();
			expect(fbq).not.toHaveBeenCalled();
		});
	});

	describe('trackFBPageView', () => {
		it('fires a PageView segmented by user_type when given', () => {
			trackFBPageView('transactor');
			expect(fbq).toHaveBeenCalledWith('track', 'PageView', { user_type: 'transactor' });
		});

		it('fires a bare PageView when no user_type is given', () => {
			trackFBPageView();
			expect(fbq).toHaveBeenCalledWith('track', 'PageView', undefined);
		});

		it('does not throw and does not fire when fbq is unavailable', () => {
			delete (window as any).fbq;
			expect(() => trackFBPageView('non-transactor')).not.toThrow();
			expect(fbq).not.toHaveBeenCalled();
		});
	});

	describe('getUserType', () => {
		it('returns transactor when the flag is true', () => {
			expect(getUserType(true)).toBe('transactor');
		});

		it('returns non-transactor when the flag is false', () => {
			expect(getUserType(false)).toBe('non-transactor');
		});
	});

	describe('getTransactorFlagsFromCookies', () => {
		it('reads both cookies, treating only the exact string "true" as true', () => {
			const cookies: Record<string, string> = { kvu_lb: 'true', kvu_db: 'false' };
			expect(getTransactorFlagsFromCookies((name) => cookies[name])).toEqual({
				hasLentBefore: true,
				hasDepositBefore: false,
			});
		});

		it('defaults to false when a cookie is unset', () => {
			expect(getTransactorFlagsFromCookies(() => undefined)).toEqual({
				hasLentBefore: false,
				hasDepositBefore: false,
			});
		});
	});

	describe('getUserTypeFromCookies', () => {
		it('returns transactor when either cookie is "true"', () => {
			expect(getUserTypeFromCookies((name) => (name === 'kvu_db' ? 'true' : 'false'))).toBe('transactor');
		});

		it('returns non-transactor when neither cookie is "true"', () => {
			expect(getUserTypeFromCookies(() => 'false')).toBe('non-transactor');
		});
	});

	describe('recordTransactorSignals', () => {
		const cookieAccess = (initial: Record<string, string> = {}) => {
			const store: Record<string, string> = { ...initial };
			return {
				store,
				get: (name: string) => store[name],
				set: jest.fn((name: string, value: string) => { store[name] = value; }),
			};
		};

		it('sets both flags from a receipt that proves them', () => {
			const cookies = cookieAccess();
			const result = recordTransactorSignals(cookies, { hasLoans: true, hasDeposit: true });

			expect(result).toEqual({ hasLentBefore: true, hasDepositBefore: true });
			expect(cookies.set).toHaveBeenCalledWith(HAS_LENT_BEFORE_COOKIE, 'true');
			expect(cookies.set).toHaveBeenCalledWith(HAS_DEPOSIT_BEFORE_COOKIE, 'true');
		});

		it('never clears a flag an earlier transaction already set', () => {
			// established lender makes a credit-funded, donation-only checkout: this receipt has no
			// loans and no deposit, but that says nothing about their history
			const cookies = cookieAccess({
				[HAS_LENT_BEFORE_COOKIE]: 'true',
				[HAS_DEPOSIT_BEFORE_COOKIE]: 'true',
			});
			const result = recordTransactorSignals(cookies, { hasLoans: false, hasDeposit: false });

			expect(result).toEqual({ hasLentBefore: true, hasDepositBefore: true });
			expect(cookies.set).toHaveBeenCalledWith(HAS_LENT_BEFORE_COOKIE, 'true');
		});

		it('leaves both false for a visitor whose receipt proves neither', () => {
			const cookies = cookieAccess();
			const result = recordTransactorSignals(cookies, { hasLoans: false, hasDeposit: false });

			expect(result).toEqual({ hasLentBefore: false, hasDepositBefore: false });
		});

		it('writes no cookie at all when the receipt proves neither flag', () => {
			// a receipt-derived 'false' is a *present* value, so it would satisfy the consumer fast
			// path that skips the authoritative lifetime query and pin a new donation-only visitor
			// to non-transactor for the cookie's whole life. Absent means "ask again".
			const cookies = cookieAccess();
			recordTransactorSignals(cookies, { hasLoans: false, hasDeposit: false });

			expect(cookies.set).not.toHaveBeenCalled();
			expect(cookies.store).toEqual({});
		});

		it('does not overwrite an authoritative false with nothing, nor promote it', () => {
			// the lifetime query legitimately writes 'false'; a receipt proving nothing must leave it
			const cookies = cookieAccess({
				[HAS_LENT_BEFORE_COOKIE]: 'false',
				[HAS_DEPOSIT_BEFORE_COOKIE]: 'false',
			});
			recordTransactorSignals(cookies, { hasLoans: false, hasDeposit: false });

			expect(cookies.set).not.toHaveBeenCalled();
			expect(cookies.store[HAS_LENT_BEFORE_COOKIE]).toBe('false');
		});

		it('only writes the flag the receipt actually proves', () => {
			const cookies = cookieAccess();
			recordTransactorSignals(cookies, { hasLoans: false, hasDeposit: true });

			expect(cookies.set).toHaveBeenCalledWith(HAS_DEPOSIT_BEFORE_COOKIE, 'true');
			expect(cookies.set).not.toHaveBeenCalledWith(HAS_LENT_BEFORE_COOKIE, expect.anything());
		});

		it('merges each flag independently', () => {
			const cookies = cookieAccess({ [HAS_LENT_BEFORE_COOKIE]: 'true' });
			const result = recordTransactorSignals(cookies, { hasLoans: false, hasDeposit: true });

			expect(result).toEqual({ hasLentBefore: true, hasDepositBefore: true });
		});

		it('writes a format getTransactorFlagsFromCookies reads back', () => {
			const cookies = cookieAccess();
			recordTransactorSignals(cookies, { hasLoans: true, hasDeposit: false });

			expect(getTransactorFlagsFromCookies(cookies.get)).toEqual({
				hasLentBefore: true,
				hasDepositBefore: false,
			});
		});
	});

	describe('trackFBAddToCart', () => {
		it('fires AddToCart with the given content_category', () => {
			trackFBAddToCart('Kiva Card');
			expect(fbq).toHaveBeenCalledWith('track', 'AddToCart', { content_category: 'Kiva Card' });
		});

		it('does not throw and does not fire when fbq is unavailable', () => {
			delete (window as any).fbq;
			expect(() => trackFBAddToCart('Loan')).not.toThrow();
			expect(fbq).not.toHaveBeenCalled();
		});

		it('includes value + currency when a positive value is provided', () => {
			trackFBAddToCart('Loan', 25);
			expect(fbq).toHaveBeenCalledWith('track', 'AddToCart', {
				content_category: 'Loan',
				value: 25,
				currency: 'USD',
			});
		});

		it('coerces a numeric-string value and omits the value when it is not positive', () => {
			trackFBAddToCart('Kiva Card', '50');
			expect(fbq).toHaveBeenCalledWith('track', 'AddToCart', {
				content_category: 'Kiva Card',
				value: 50,
				currency: 'USD',
			});
			fbq.mockClear();
			// zero / invalid amounts fall back to a bare AddToCart rather than value: 0
			trackFBAddToCart('Loan', 0);
			expect(fbq).toHaveBeenCalledWith('track', 'AddToCart', { content_category: 'Loan' });
		});

		it('does not throw when fbq itself throws', () => {
			(window as any).fbq = () => { throw new Error('boom'); };
			expect(() => trackFBAddToCart('Loan', 25)).not.toThrow();
		});
	});

	let txCounter = 0;
	// unique id per call so each test's transaction data is distinct
	const nextTxId = () => {
		txCounter += 1;
		return `tx-${txCounter}`;
	};
	const baseTransaction = (overrides: Partial<TransactionData> = {}): TransactionData => ({
		transactionId: nextTxId(),
		loans: [],
		loanCount: 0,
		loanTotal: '0',
		donations: [],
		donationTotal: '0',
		isTip: false,
		isUserEdited: false,
		kivaCards: [],
		kivaCardCount: 0,
		kivaCardTotal: '0',
		itemTotal: '25.00',
		depositTotal: '0',
		kivaCreditAppliedTotal: '0',
		paymentType: 'cc',
		isFTD: false,
		...overrides,
	});

	describe('Purchase value', () => {
		it('sends a numeric value coerced from itemTotal', () => {
			trackTransaction(baseTransaction({ itemTotal: '25.00' }));
			expect(fbq).toHaveBeenCalledWith('track', 'Purchase', {
				currency: 'USD',
				value: 25,
				content_type: 'ReturningLender',
			});
		});

		it('does not send Purchase when itemTotal is an empty string', () => {
			trackTransaction(baseTransaction({ itemTotal: '' }));
			expect(fbq).not.toHaveBeenCalledWith('track', 'Purchase', expect.anything());
		});

		it('does not send Purchase when itemTotal is undefined', () => {
			trackTransaction(baseTransaction({ itemTotal: undefined as unknown as string }));
			expect(fbq).not.toHaveBeenCalledWith('track', 'Purchase', expect.anything());
		});

		it('still fires firstTimeDepositorTransaction when Purchase is skipped, without a 0 value', () => {
			trackTransaction(baseTransaction({ isFTD: true, itemTotal: '' }));
			expect(fbq).not.toHaveBeenCalledWith('track', 'Purchase', expect.anything());
			// the count signal still fires, but omitting value/currency is the whole point of
			// skipping Purchase — sending value: 0 here would dilute it just the same
			expect(fbq).toHaveBeenCalledWith('trackCustom', 'firstTimeDepositorTransaction', {
				itemTotal: 0,
			});
		});

		it('omits value/currency on transactionContainsKivaCards when the card total is unusable', () => {
			trackTransaction(baseTransaction({
				kivaCards: [{ id: '1' }],
				kivaCardTotal: null as unknown as string,
			}));
			expect(fbq).toHaveBeenCalledWith('trackCustom', 'transactionContainsKivaCards', {
				kivaCardTotal: null,
			});
		});
	});

	describe('trackTransaction guards', () => {
		it('fires nothing when transactionId is empty', () => {
			trackTransaction(baseTransaction({ transactionId: '' }));
			expect(fbq).not.toHaveBeenCalled();
		});

		it('still sends a transaction with a blank transactionId', () => {
			// a missing transactionId must not suppress the conversion
			trackFBTransaction(baseTransaction({ transactionId: '', itemTotal: '15.00' }));
			expect(fbq).toHaveBeenCalledWith('track', 'Purchase', expect.objectContaining({ value: 15 }));
		});
	});

	describe('trackFBTransaction (direct, Meta-only)', () => {
		it('fires a Meta Purchase from transaction data without the trackTransaction orchestrator', () => {
			trackFBTransaction(baseTransaction({ itemTotal: '30', isFTD: false }));
			expect(fbq).toHaveBeenCalledWith('track', 'Purchase', {
				currency: 'USD',
				value: 30,
				content_type: 'ReturningLender',
			});
		});
	});

	describe('Purchase content_type', () => {
		it('marks a known returning lender', () => {
			trackTransaction(baseTransaction({ isFTD: false, itemTotal: '25' }));
			expect(fbq).toHaveBeenCalledWith('track', 'Purchase', {
				currency: 'USD',
				value: 25,
				content_type: 'ReturningLender',
			});
		});

		it('omits content_type when FTD status is unknown (e.g. guest checkout)', () => {
			trackTransaction(baseTransaction({
				isFTD: undefined as unknown as boolean,
				itemTotal: '25',
			}));
			expect(fbq).toHaveBeenCalledWith('track', 'Purchase', {
				currency: 'USD',
				value: 25,
			});
		});
	});

	describe('custom conversion events', () => {
		it('sends value + currency on transactionContainsKivaCards', () => {
			trackTransaction(baseTransaction({
				kivaCards: [{ id: 1 }],
				kivaCardCount: 1,
				kivaCardTotal: '50',
			}));
			// standard value+currency added; legacy kivaCardTotal kept for backward compatibility
			expect(fbq).toHaveBeenCalledWith('trackCustom', 'transactionContainsKivaCards', expect.objectContaining({
				kivaCardTotal: '50',
				value: 50,
				currency: 'USD',
			}));
		});

		it('does not fire transactionContainsKivaCards when there are no kiva cards', () => {
			trackTransaction(baseTransaction({ kivaCards: [] }));
			expect(fbq).not.toHaveBeenCalledWith('trackCustom', 'transactionContainsKivaCards', expect.anything());
		});

		it('sends value + currency on firstTimeDepositorTransaction and FTD Purchase content_type', () => {
			trackTransaction(baseTransaction({ isFTD: true, itemTotal: '100' }));
			// standard value+currency added; legacy itemTotal kept for backward compatibility
			expect(fbq).toHaveBeenCalledWith('trackCustom', 'firstTimeDepositorTransaction', expect.objectContaining({
				itemTotal: 100,
				value: 100,
				currency: 'USD',
			}));
			expect(fbq).toHaveBeenCalledWith('track', 'Purchase', {
				currency: 'USD',
				value: 100,
				content_type: 'FirstTimeDepositor',
			});
		});
	});

	describe('trackPageView', () => {
		it('never fires a fb PageView — the Meta pixel is fired separately by callers', () => {
			trackPageView('https://www.kiva.org/', '');
			expect(fbq).not.toHaveBeenCalled();
		});
	});

	describe('Meta pixel availability', () => {
		it('does not throw when the pixel is unavailable, and sends once it arrives', () => {
			const tx = baseTransaction({ itemTotal: '25.00' });
			delete (window as any).fbq;

			// Ad-blocked / consent-gated / pixel not yet loaded: nothing to send to
			expect(() => trackFBTransaction(tx)).not.toThrow();

			// Pixel arrives later — the same transaction is still sendable
			(window as any).fbq = fbq;
			trackFBTransaction(tx);
			expect(fbq.mock.calls.filter((call) => call[0] === 'track' && call[1] === 'Purchase'))
				.toHaveLength(1);
		});

		it('does not throw when window.optimizely is null', () => {
			// typeof null === 'object', so a naive guard would treat this as loaded and throw on .push
			(window as any).optimizely = null;
			(window as any).gtag = jest.fn();
			expect(() => trackTransaction(baseTransaction({ itemTotal: '25.00', loanTotal: '25.00' })))
				.not.toThrow();
			expect(fbq).toHaveBeenCalledWith('track', 'Purchase', expect.anything());
		});

		it('fires GA and Optimizely alongside Meta', () => {
			// loanTotal drives the Optimizely revenue event; itemTotal alone would push nothing
			const tx = baseTransaction({ itemTotal: '25.00', loanTotal: '25.00' });
			const gtag = jest.fn();
			(window as any).gtag = gtag;
			(window as any).optimizely = { push: jest.fn() };

			trackTransaction(tx);

			expect(fbq).toHaveBeenCalledWith('track', 'Purchase', expect.anything());
			expect(gtag).toHaveBeenCalled();
			expect((window as any).optimizely.push).toHaveBeenCalled();
		});
	});
});
