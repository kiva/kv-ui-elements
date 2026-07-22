import {
	getUserType,
	trackFBAddToCart,
	trackFBCustomEvent,
	trackFBEvent,
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

	describe('getUserType', () => {
		it('returns transactor when the flag is true', () => {
			expect(getUserType(true)).toBe('transactor');
		});

		it('returns non-transactor when the flag is false', () => {
			expect(getUserType(false)).toBe('non-transactor');
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
	// unique id per call so the once-per-transaction dedup guard doesn't bleed across tests
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

		it('still fires firstTimeDepositorTransaction when Purchase is skipped for an empty amount', () => {
			trackTransaction(baseTransaction({ isFTD: true, itemTotal: '' }));
			expect(fbq).not.toHaveBeenCalledWith('track', 'Purchase', expect.anything());
			expect(fbq).toHaveBeenCalledWith('trackCustom', 'firstTimeDepositorTransaction', expect.objectContaining({
				value: 0,
				currency: 'USD',
			}));
		});
	});

	describe('trackTransaction guards', () => {
		it('fires nothing when transactionId is empty', () => {
			trackTransaction(baseTransaction({ transactionId: '' }));
			expect(fbq).not.toHaveBeenCalled();
		});

		it('tracks a given transactionId only once (no duplicate Purchase on re-invocation)', () => {
			const tx = baseTransaction({ itemTotal: '25.00' });
			trackTransaction(tx);
			trackTransaction(tx);
			const purchaseCalls = fbq.mock.calls.filter(
				(call) => call[0] === 'track' && call[1] === 'Purchase',
			);
			expect(purchaseCalls).toHaveLength(1);
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

	describe('trackPageView user_type', () => {
		it('includes user_type when provided', () => {
			trackPageView('https://www.kiva.org/', '', 'transactor');
			expect(fbq).toHaveBeenCalledWith('track', 'PageView', { user_type: 'transactor' });
		});

		it('sends a bare PageView when user_type is omitted', () => {
			trackPageView('https://www.kiva.org/', '');
			expect(fbq).toHaveBeenCalledWith('track', 'PageView');
		});

		it('does not fire the fb PageView when skipFb is set', () => {
			trackPageView('https://www.kiva.org/', '', 'transactor', true);
			expect(fbq).not.toHaveBeenCalled();
		});
	});
});
