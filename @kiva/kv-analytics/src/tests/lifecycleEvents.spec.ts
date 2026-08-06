import {
	LIFECYCLE_STAGES,
	RE_ENGAGEMENT_EVENTS,
	getReEngagementEvent,
	trackReEngagementEvent,
	trackFBTransaction,
	type TransactionData,
} from '../index';

describe('@kiva/kv-analytics lifecycle events', () => {
	let fbq: jest.Mock;

	beforeEach(() => {
		fbq = jest.fn();
		(window as any).fbq = fbq;
	});

	afterEach(() => {
		jest.clearAllMocks();
		delete (window as any).fbq;
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

	describe('LIFECYCLE_STAGES', () => {
		it('defines the nine stages from the lifecycle stages doc', () => {
			expect(LIFECYCLE_STAGES).toEqual({
				REGISTERED: 'registered',
				UNCONVERTED_90: 'unconverted90',
				UNCONVERTED_180: 'unconverted180',
				NEW: 'new',
				ENGAGED: 'engaged',
				IDLE_90: 'idle90',
				IDLE_180: 'idle180',
				IDLE_365: 'idle365',
				LAPSED_CHURNED: 'lapsedChurned',
			});
		});
	});

	describe('RE_ENGAGEMENT_EVENTS', () => {
		it('defines the two custom Meta event names', () => {
			expect(RE_ENGAGEMENT_EVENTS).toEqual({
				IDLE: 'idleLenderReEngaged',
				LAPSED: 'lapsedLenderReEngaged',
			});
		});
	});

	describe('getReEngagementEvent', () => {
		it('maps lapsedChurned to the lapsed event', () => {
			expect(getReEngagementEvent(LIFECYCLE_STAGES.LAPSED_CHURNED)).toBe('lapsedLenderReEngaged');
		});

		it.each([
			[LIFECYCLE_STAGES.IDLE_90],
			[LIFECYCLE_STAGES.IDLE_180],
			[LIFECYCLE_STAGES.IDLE_365],
		])('maps %s to the idle event', (stage) => {
			expect(getReEngagementEvent(stage)).toBe('idleLenderReEngaged');
		});

		it.each([
			[LIFECYCLE_STAGES.REGISTERED],
			[LIFECYCLE_STAGES.UNCONVERTED_90],
			[LIFECYCLE_STAGES.UNCONVERTED_180],
			[LIFECYCLE_STAGES.NEW],
			[LIFECYCLE_STAGES.ENGAGED],
			[null],
			[undefined],
			['bogus'],
		])('returns null for non-qualifying stage %p', (stage) => {
			expect(getReEngagementEvent(stage)).toBeNull();
		});
	});

	describe('trackReEngagementEvent', () => {
		const qualifyingTransaction = (overrides: Partial<TransactionData> = {}) => baseTransaction({
			loans: [{ id: 1 }],
			loanCount: 1,
			loanTotal: '25.00',
			itemTotal: '30.00',
			lifecycleStage: LIFECYCLE_STAGES.LAPSED_CHURNED,
			daysSinceLastLoan: 800,
			reEngagementEvent: RE_ENGAGEMENT_EVENTS.LAPSED,
			...overrides,
		});

		it('fires the resolved event with the transaction and lifecycle values and returns true', () => {
			const result = trackReEngagementEvent(qualifyingTransaction());
			expect(result).toBe(true);
			expect(fbq).toHaveBeenCalledTimes(1);
			expect(fbq).toHaveBeenCalledWith('trackCustom', 'lapsedLenderReEngaged', {
				loanTotal: '25.00',
				itemTotal: '30.00',
				lifecycleStage: 'lapsedChurned',
				daysSinceLastLoan: 800,
			});
		});

		it('does not fire when the transaction contains no loans', () => {
			// deposits, donations or Kiva Cards on their own do not move a lender out of
			// idle or churned, so they are not re-engagement
			const result = trackReEngagementEvent(qualifyingTransaction({ loans: [], loanCount: 0 }));
			expect(result).toBe(false);
			expect(fbq).not.toHaveBeenCalled();
		});

		it('does not fire when no re-engagement event was resolved', () => {
			const result = trackReEngagementEvent(qualifyingTransaction({ reEngagementEvent: null }));
			expect(result).toBe(false);
			expect(fbq).not.toHaveBeenCalled();
		});

		it('does not fire for a transaction without lifecycle data (e.g. guest checkout)', () => {
			const result = trackReEngagementEvent(baseTransaction({ loans: [{ id: 1 }], loanCount: 1 }));
			expect(result).toBe(false);
			expect(fbq).not.toHaveBeenCalled();
		});

		it('does not throw when fbq is unavailable', () => {
			delete (window as any).fbq;
			expect(() => trackReEngagementEvent(qualifyingTransaction())).not.toThrow();
		});
	});

	// Purchase deliberately carries no lifecycle data. Consumers already put lifecycleStage on
	// transactionData, so adding it to the payload here would change an existing conversion event
	// for any app that merely upgrades the package without changing its own code.
	describe('Purchase', () => {
		it('is unchanged by the presence of lifecycle data', () => {
			trackFBTransaction(baseTransaction({
				itemTotal: '25.00',
				lifecycleStage: LIFECYCLE_STAGES.ENGAGED,
			}));
			expect(fbq).toHaveBeenCalledWith('track', 'Purchase', {
				currency: 'USD',
				value: 25,
				content_type: 'ReturningLender',
			});
		});
	});
});
