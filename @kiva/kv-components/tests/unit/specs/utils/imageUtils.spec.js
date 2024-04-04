import { isLegacyPlaceholderAvatar, randomizedUserAvatarClass } from '../../../../utils/imageUtils';

describe('imageUtils.ts', () => {
	describe('isLegacyPlaceholderAvatar', () => {
		it('should return true when filename is default kiva user avatar.', () => {
			expect(isLegacyPlaceholderAvatar('726677.jpg')).toBe(true);
			expect(isLegacyPlaceholderAvatar('315726.jpg')).toBe(true);
			expect(isLegacyPlaceholderAvatar('4d844ac2c0b77a8a522741b908ea5c32.jpg')).toBe(true);
			expect(isLegacyPlaceholderAvatar('726677.png')).toBe(true);
			expect(isLegacyPlaceholderAvatar('315726.gif')).toBe(true);
			expect(isLegacyPlaceholderAvatar('4d844ac2c0b77a8a522741b908ea5c32.png')).toBe(true);
		});

		it('should return false when filename is not default kiva user avatar.', () => {
			expect(isLegacyPlaceholderAvatar('')).toBe(false);
			expect(isLegacyPlaceholderAvatar('test')).toBe(false);
			expect(isLegacyPlaceholderAvatar('123abc.jpg')).toBe(false);
		});
	});

	describe('randomizedUserAvatarClass', () => {
		it('should return random classes', () => {
			const class1 = randomizedUserAvatarClass();

			expect(class1).toContain('tw-text-');
			expect(class1).toContain('tw-bg-');
		});
	});
});
