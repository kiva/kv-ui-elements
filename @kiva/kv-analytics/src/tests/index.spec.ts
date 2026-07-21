import {
	trackAddToCart,
	trackFBCustomEvent,
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

	describe('trackAddToCart', () => {
		it('fires AddToCart with the given content_category', () => {
			trackAddToCart('Kiva Card');
			expect(fbq).toHaveBeenCalledWith('track', 'AddToCart', { content_category: 'Kiva Card' });
		});

		it('does not throw and does not fire when fbq is unavailable', () => {
			delete (window as any).fbq;
			expect(() => trackAddToCart('Loan')).not.toThrow();
			expect(fbq).not.toHaveBeenCalled();
		});
	});

	const baseTransaction = (overrides: Partial<TransactionData> = {}): TransactionData => ({
		transactionId: 'tx-1',
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
	});
});
