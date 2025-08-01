import {
	isBetween25And50,
	isLessThan25,
	getLendCtaSelectedOption,
	getDropdownPriceArray,
	ERL_COOKIE_NAME,
	TOP_UP_CAMPAIGN,
	BASE_CAMPAIGN,
} from '#utils/loanUtils';

describe('loanUtils', () => {
	describe('isBetween25And50', () => {
		it('should handle empty string', () => {
			expect(isBetween25And50('')).toBe(false);
			expect(isBetween25And50(undefined)).toBe(false);
			expect(isBetween25And50(null)).toBe(false);
		});

		it('should return false for number below 25', () => {
			expect(isBetween25And50('3')).toBe(false);
		});

		it('should return false for 25', () => {
			expect(isBetween25And50('25')).toBe(false);
		});

		it('should return true for number between 25 and 50', () => {
			expect(isBetween25And50('30')).toBe(true);
		});

		it('should return true for 50', () => {
			expect(isBetween25And50('50')).toBe(true);
		});

		it('should return false for number above 50', () => {
			expect(isBetween25And50('100')).toBe(false);
		});
	});

	describe('isLessThan25', () => {
		it('should handle empty string', () => {
			expect(isLessThan25('')).toBe(false);
			expect(isLessThan25(undefined)).toBe(false);
			expect(isLessThan25(null)).toBe(false);
		});

		it('should return false for number below 0', () => {
			expect(isLessThan25('-1')).toBe(false);
		});

		it('should return false for 0', () => {
			expect(isLessThan25('0')).toBe(false);
		});

		it('should return true for number below 25', () => {
			expect(isLessThan25('3')).toBe(true);
		});

		it('should return false for 25', () => {
			expect(isLessThan25('25')).toBe(false);
		});

		it('should return true for number above 25', () => {
			expect(isLessThan25('30')).toBe(false);
		});
	});

	describe('getLendCtaSelectedOption', () => {
		let mockCookieStoreGet;
		let mockCookieStoreSet;
		const mockTomorrow = new Date(2023, 1, 2);

		beforeEach(() => {
			mockCookieStoreGet = jest.fn();
			mockCookieStoreSet = jest.fn();
			jest.useFakeTimers('modern');
			jest.setSystemTime(new Date(2023, 1, 1));
		});

		afterEach(() => {
			jest.clearAllMocks();
			jest.useRealTimers();
		});

		it('should handle unreserved amount greater than $50 without campaign', () => {
			const result = getLendCtaSelectedOption(
				mockCookieStoreGet,
				mockCookieStoreSet,
				true,
				undefined,
				'75.00',
				'0.00',
			);

			expect(result).toBe('25');
			expect(mockCookieStoreGet).toHaveBeenCalledWith(ERL_COOKIE_NAME);
			expect(mockCookieStoreSet).toHaveBeenCalledTimes(0);
		});

		it('should handle unreserved amount between $25 and $50 without $5 notes', () => {
			const result = getLendCtaSelectedOption(
				mockCookieStoreGet,
				mockCookieStoreSet,
				true,
				undefined,
				'45.00',
				'0.00',
			);

			expect(result).toBe('45');
			expect(mockCookieStoreGet).toHaveBeenCalledWith(ERL_COOKIE_NAME);
			expect(mockCookieStoreSet).toHaveBeenCalledTimes(0);
		});

		it('should handle unreserved amount less than $25 without $5 notes', () => {
			const result = getLendCtaSelectedOption(
				mockCookieStoreGet,
				mockCookieStoreSet,
				true,
				undefined,
				'15.00',
				'0.00',
			);

			expect(result).toBe('15');
			expect(mockCookieStoreGet).toHaveBeenCalledWith(ERL_COOKIE_NAME);
			expect(mockCookieStoreSet).toHaveBeenCalledTimes(0);
		});

		it('should handle $5 notes ERL top up campaign without existing cookie', () => {
			const result = getLendCtaSelectedOption(
				mockCookieStoreGet,
				mockCookieStoreSet,
				true,
				TOP_UP_CAMPAIGN,
				'15.00',
				'0.00',
			);

			expect(result).toBe('5');
			expect(mockCookieStoreGet).toHaveBeenCalledWith(ERL_COOKIE_NAME);
			expect(mockCookieStoreSet).toHaveBeenCalledWith(
				ERL_COOKIE_NAME,
				TOP_UP_CAMPAIGN,
				{ expires: mockTomorrow },
			);
		});

		it('should handle $5 notes ERL base campaign without existing cookie', () => {
			const result = getLendCtaSelectedOption(
				mockCookieStoreGet,
				mockCookieStoreSet,
				true,
				BASE_CAMPAIGN,
				'15.00',
				'10.00',
			);

			expect(result).toBe('10');
			expect(mockCookieStoreGet).toHaveBeenCalledWith(ERL_COOKIE_NAME);
			expect(mockCookieStoreSet).toHaveBeenCalledWith(
				ERL_COOKIE_NAME,
				BASE_CAMPAIGN,
				{ expires: mockTomorrow },
			);
		});

		it('should handle $5 notes ERL base campaign max $25', () => {
			const result = getLendCtaSelectedOption(
				mockCookieStoreGet,
				mockCookieStoreSet,
				true,
				BASE_CAMPAIGN,
				'75.00',
				'50.00',
			);

			expect(result).toBe('25');
			expect(mockCookieStoreGet).toHaveBeenCalledWith(ERL_COOKIE_NAME);
			expect(mockCookieStoreSet).toHaveBeenCalledWith(
				ERL_COOKIE_NAME,
				BASE_CAMPAIGN,
				{ expires: mockTomorrow },
			);
		});

		it('should handle $5 notes ERL base campaign default to $5 with no balance', () => {
			const result = getLendCtaSelectedOption(
				mockCookieStoreGet,
				mockCookieStoreSet,
				true,
				BASE_CAMPAIGN,
				'15.00',
				'0.00',
			);

			expect(result).toBe('5');
			expect(mockCookieStoreGet).toHaveBeenCalledWith(ERL_COOKIE_NAME);
			expect(mockCookieStoreSet).toHaveBeenCalledWith(
				ERL_COOKIE_NAME,
				BASE_CAMPAIGN,
				{ expires: mockTomorrow },
			);
		});

		it('should handle $5 notes ERL base campaign default to unreserved amount when not enough', () => {
			const result = getLendCtaSelectedOption(
				mockCookieStoreGet,
				mockCookieStoreSet,
				true,
				BASE_CAMPAIGN,
				'5.00',
				'15.00',
			);

			expect(result).toBe('5');
			expect(mockCookieStoreGet).toHaveBeenCalledWith(ERL_COOKIE_NAME);
			expect(mockCookieStoreSet).toHaveBeenCalledWith(
				ERL_COOKIE_NAME,
				BASE_CAMPAIGN,
				{ expires: mockTomorrow },
			);
		});

		it('should handle $5 notes ERL top up campaign with existing cookie', () => {
			mockCookieStoreGet.mockReturnValue(TOP_UP_CAMPAIGN);

			const result = getLendCtaSelectedOption(
				mockCookieStoreGet,
				mockCookieStoreSet,
				true,
				undefined,
				'15.00',
				'0.00',
			);

			expect(result).toBe('5');
			expect(mockCookieStoreGet).toHaveBeenCalledWith(ERL_COOKIE_NAME);
			expect(mockCookieStoreSet).toHaveBeenCalledTimes(0);
		});

		it('should handle $5 notes ERL base campaign with existing cookie', () => {
			mockCookieStoreGet.mockReturnValue(BASE_CAMPAIGN);

			const result = getLendCtaSelectedOption(
				mockCookieStoreGet,
				mockCookieStoreSet,
				true,
				undefined,
				'15.00',
				'15.00',
			);

			expect(result).toBe('15');
			expect(mockCookieStoreGet).toHaveBeenCalledWith(ERL_COOKIE_NAME);
			expect(mockCookieStoreSet).toHaveBeenCalledTimes(0);
		});

		it('should handle $5 notes ERL campaign use partial string match', () => {
			const result = getLendCtaSelectedOption(
				mockCookieStoreGet,
				mockCookieStoreSet,
				true,
				`asd${TOP_UP_CAMPAIGN}asd`,
				'15.00',
				'0.00',
			);

			expect(result).toBe('5');
			expect(mockCookieStoreGet).toHaveBeenCalledWith(ERL_COOKIE_NAME);
			expect(mockCookieStoreSet).toHaveBeenCalledWith(
				ERL_COOKIE_NAME,
				TOP_UP_CAMPAIGN,
				{ expires: mockTomorrow },
			);
		});

		it('should handle $5 notes ERL campaign use case insensitive match', () => {
			const result = getLendCtaSelectedOption(
				mockCookieStoreGet,
				mockCookieStoreSet,
				true,
				`asd${TOP_UP_CAMPAIGN.toLowerCase()}asd`,
				'15.00',
				'0.00',
			);

			expect(result).toBe('5');
			expect(mockCookieStoreGet).toHaveBeenCalledWith(ERL_COOKIE_NAME);
			expect(mockCookieStoreSet).toHaveBeenCalledWith(
				ERL_COOKIE_NAME,
				TOP_UP_CAMPAIGN,
				{ expires: mockTomorrow },
			);
		});

		it('should handle $5 notes ERL campaign with undefined balance', () => {
			mockCookieStoreGet.mockReturnValue(BASE_CAMPAIGN);

			const result = getLendCtaSelectedOption(
				mockCookieStoreGet,
				mockCookieStoreSet,
				true,
				undefined,
				'100.00',
				undefined,
			);

			expect(result).toBe('25');
			expect(mockCookieStoreGet).toHaveBeenCalledTimes(0);
			expect(mockCookieStoreSet).toHaveBeenCalledTimes(0);
		});
	});

	describe('getDropdownPriceArray', () => {
		it('should return less than 25', () => {
			const result = getDropdownPriceArray('15.00', true, 15);

			expect(result).toEqual(['15']);
		});

		it('should return non-25 increments', () => {
			const result = getDropdownPriceArray('30.00', true);

			expect(result).toEqual(['25', '30']);
		});

		it('should return dropdown values', () => {
			const result = getDropdownPriceArray('100.00');

			expect(result).toEqual(['25', '50', '75', '100']);
		});

		it('should return huge dropdown values between 500 and 1000', () => {
			const result = getDropdownPriceArray('650.00', false, 25, false, false);

			expect(result).toEqual([
				'25',
				'50',
				'75',
				'100',
				'125',
				'150',
				'175',
				'200',
				'225',
				'250',
				'275',
				'300',
				'325',
				'350',
				'375',
				'400',
				'425',
				'450',
				'475',
				'500',
				'600',
				'650',
			]);
		});

		it('should return huge dropdown values up to 10,000', () => {
			const result = getDropdownPriceArray('11000.00', false, 25, false, false);

			expect(result).toEqual([
				'25',
				'50',
				'75',
				'100',
				'125',
				'150',
				'175',
				'200',
				'225',
				'250',
				'275',
				'300',
				'325',
				'350',
				'375',
				'400',
				'425',
				'450',
				'475',
				'500',
				'600',
				'700',
				'800',
				'900',
				'1,000',
				'2,000',
				'3,000',
				'4,000',
				'5,000',
				'6,000',
				'7,000',
				'8,000',
				'9,000',
				'10,000',
			]);
		});

		it('should return not huge dropdown values for visitor', () => {
			const result = getDropdownPriceArray('650.00', false, 25, false, true);

			expect(result).toEqual([
				'25',
				'50',
				'75',
				'100',
				'125',
				'150',
				'175',
				'200',
				'225',
				'250',
				'275',
				'300',
				'325',
				'350',
				'375',
				'400',
				'425',
				'450',
				'475',
				'500',
			]);
		});

		it('should return 5 dollar notes', () => {
			const result = getDropdownPriceArray('30.00', true, 25, true);

			expect(result).toEqual(['5', '10', '15', '20', '25', '30']);
		});
	});
});
