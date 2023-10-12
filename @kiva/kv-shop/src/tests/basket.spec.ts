import { getCookieValue, setCookieValue, hasBasketExpired } from '../basket';

describe('basket.ts', () => {
	it('encoded token', () => {
		setCookieValue('encoded', 'tests==', 'Max-Age=5;');
		expect(document.cookie).toEqual('encoded=tests%3D%3D');
		const cookieValue = getCookieValue('encoded');
		expect(cookieValue).toEqual('tests==');
	});

	describe('hasBasketExpired', () => {
		// helper function to test all three error formats
		const testHasBasketExpiredWithErrorCode = (code, expected) => {
			const error1 = {
				message: 'test error',
				code,
			};
			const error2 = {
				message: 'test error',
				extensions: {
					code,
				},
			};
			const error3 = {
				message: 'test error',
				name: code,
			};
			expect(hasBasketExpired(error1)).toBe(expected);
			expect(hasBasketExpired(error2)).toBe(expected);
			expect(hasBasketExpired(error3)).toBe(expected);
		};

		it('should return true for invalidBasketId', () => {
			testHasBasketExpiredWithErrorCode('shop.invalidBasketId', true);
		});

		it('should return true for basketRequired', () => {
			testHasBasketExpiredWithErrorCode('shop.basketRequired', true);
		});

		it('should return true for alreadyCheckedOut', () => {
			testHasBasketExpiredWithErrorCode('shop.alreadyCheckedOut', true);
		});

		it('should return false for other inputs', () => {
			testHasBasketExpiredWithErrorCode('shop.otherError', false);
			expect(hasBasketExpired('test error')).toBe(false);
			expect(hasBasketExpired({ message: 'test error' })).toBe(false);
			expect(hasBasketExpired({})).toBe(false);
			expect(hasBasketExpired(null)).toBe(false);
			expect(hasBasketExpired(undefined)).toBe(false);
			expect(hasBasketExpired(0)).toBe(false);
			expect(hasBasketExpired(1)).toBe(false);
			expect(hasBasketExpired('')).toBe(false);
			expect(hasBasketExpired(' ')).toBe(false);
		});
	});
});
