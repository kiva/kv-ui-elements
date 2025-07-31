import { isBasketVerified, VerificationState } from '../basketVerification';

describe('basketVerification', () => {
	describe('isBasketVerified', () => {
		it('should return true if the state is VERIFIED', () => {
			expect(isBasketVerified(VerificationState.VERIFIED)).toBe(true);
		});

		it('should return true if the state is NOT_NEEDED', () => {
			expect(isBasketVerified(VerificationState.NOT_NEEDED)).toBe(true);
		});

		it('should return false if the state is PENDING', () => {
			expect(isBasketVerified(VerificationState.PENDING)).toBe(false);
		});

		it('should return false if the state is REQUIRED', () => {
			expect(isBasketVerified(VerificationState.REQUIRED)).toBe(false);
		});

		it('should return false if the state is MAY_BE_NEEDED', () => {
			expect(isBasketVerified(VerificationState.MAY_BE_NEEDED)).toBe(false);
		});
	});
});
