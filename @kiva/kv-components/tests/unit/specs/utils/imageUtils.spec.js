import {
	getKivaImageUrl,
	isLegacyPlaceholderAvatar,
	randomizedUserAvatarClass,
} from '#utils/imageUtils';

describe('imageUtils.ts', () => {
	describe('getKivaImageUrl', () => {
		it('should return empty if no hash', () => {
			expect(getKivaImageUrl({ width: 5, height: 6 })).toBe('');
		});

		it('should return empty if both dimensions are 0', () => {
			expect(getKivaImageUrl({ width: 0, height: 0 })).toBe('');
		});

		it('should return webp URL when requested', () => {
			expect(getKivaImageUrl({
				base: 'www.kiva.org/', width: 5, height: 6, hash: 'asd', type: 'webp',
			})).toBe('www.kiva.org/w5h6/asd.webp');
		});

		it('should return jpg URL by default', () => {
			expect(getKivaImageUrl({
				base: 'www.kiva.org/', width: 5, height: 6, hash: 'asd',
			})).toBe('www.kiva.org/w5h6/asd.jpg');
		});
	});

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

		it('should return same classes for same displayName', () => {
			expect(randomizedUserAvatarClass('test')).toBe(randomizedUserAvatarClass('test'));
			expect(randomizedUserAvatarClass('test2')).toBe(randomizedUserAvatarClass('test2'));
			expect(randomizedUserAvatarClass('Lender')).toBe(randomizedUserAvatarClass('Lender'));
		});
	});
});
