import {
	META_EVENTS,
	trackMetaEvent,
	trackDonationMetaEvent,
} from '../index';

describe('metaEvents', () => {
	beforeEach(() => {
		window.fbq = jest.fn();
	});

	afterEach(() => {
		delete window.fbq;
	});

	describe('META_EVENTS', () => {
		it('defines the lender event names', () => {
			expect(META_EVENTS).toEqual({
				ACCOUNT_CREATED: 'accountCreated',
				DONATION: 'donation',
				EMAIL_SIGN_UP: 'emailSignUp',
				GIVING_FUND_CREATED: 'givingFundCreated',
				GIVING_FUND_STARTED: 'givingFundStarted',
				KIVA_CARD_REDEMPTION: 'kivaCardRedemption',
			});
		});
	});

	describe('trackMetaEvent', () => {
		it('fires a custom fbq event with the event data', () => {
			trackMetaEvent(META_EVENTS.EMAIL_SIGN_UP, { value: 1, currency: 'USD' });
			expect(window.fbq).toHaveBeenCalledTimes(1);
			expect(window.fbq).toHaveBeenCalledWith('trackCustom', 'emailSignUp', { value: 1, currency: 'USD' });
		});

		it('omits the params argument when there is no event data', () => {
			trackMetaEvent(META_EVENTS.ACCOUNT_CREATED);
			expect(window.fbq).toHaveBeenCalledTimes(1);
			expect(window.fbq).toHaveBeenCalledWith('trackCustom', 'accountCreated');
		});

		it('does not throw when fbq is unavailable', () => {
			delete window.fbq;
			expect(() => trackMetaEvent(META_EVENTS.ACCOUNT_CREATED)).not.toThrow();
		});
	});

	describe('trackDonationMetaEvent', () => {
		it('fires the donation event with value and currency and returns true', () => {
			const result = trackDonationMetaEvent(25);
			expect(result).toBe(true);
			expect(window.fbq).toHaveBeenCalledTimes(1);
			expect(window.fbq).toHaveBeenCalledWith('trackCustom', 'donation', {
				donationTotal: 25,
				value: 25,
				currency: 'USD',
			});
		});

		it('coerces a string amount to a numeric value', () => {
			const result = trackDonationMetaEvent('25.50');
			expect(result).toBe(true);
			expect(window.fbq).toHaveBeenCalledWith('trackCustom', 'donation', {
				donationTotal: '25.50',
				value: 25.5,
				currency: 'USD',
			});
		});

		it.each([
			[0],
			[-5],
			['abc'],
			[NaN],
			[Infinity],
			[null],
			[undefined],
		])('does not fire and returns false for invalid amount %p', (amount) => {
			const result = trackDonationMetaEvent(amount);
			expect(result).toBe(false);
			expect(window.fbq).not.toHaveBeenCalled();
		});
	});
});
