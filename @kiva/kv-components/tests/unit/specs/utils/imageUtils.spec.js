import {
	getKivaImageUrl,
	isLegacyPlaceholderAvatar,
	randomizedUserAvatarClass,
} from '#utils/imageUtils';

describe('imageUtils.ts', () => {
	describe('getKivaImageUrl', () => {
		it('returns empty if no hash', () => {
			expect(getKivaImageUrl({ width: 5, height: 6 })).toBe('');
		});

		it('returns empty if both dimensions are 0', () => {
			expect(getKivaImageUrl({ width: 0, height: 0 })).toBe('');
		});

		it('returns webp URL when requested', () => {
			expect(getKivaImageUrl({
				width: 5,
				height: 6,
				hash: 'asd',
				format: 'webp',
			})).toBe('/img/w5h6/asd.webp');
		});

		it('returns jpg URL by default', () => {
			expect(getKivaImageUrl({
				width: 5,
				height: 6,
				hash: 'asd',
			})).toBe('/img/w5h6/asd.jpg');
		});

		it('returns URL with only width', () => {
			expect(getKivaImageUrl({ width: 5, hash: 'asd' })).toBe('/img/w5/asd.jpg');
		});

		it('returns URL with only height', () => {
			expect(getKivaImageUrl({ height: 6, hash: 'asd' })).toBe('/img/h6/asd.jpg');
		});

		it('returns URL with only square', () => {
			expect(getKivaImageUrl({ square: 7, hash: 'asd' })).toBe('/img/s7/asd.jpg');
		});

		it('returns URL with square when width and height are the same', () => {
			expect(getKivaImageUrl({ width: 5, height: 5, hash: 'asd' })).toBe('/img/s5/asd.jpg');
		});

		it('returns URL with faceZoom when width, height or square are provided', () => {
			expect(getKivaImageUrl({ faceZoom: 1, width: 5, hash: 'asd' })).toBe('/img/w5fz1/asd.jpg');
			expect(getKivaImageUrl({ faceZoom: 1, height: 6, hash: 'asd' })).toBe('/img/h6fz1/asd.jpg');
			expect(getKivaImageUrl({ faceZoom: 1, square: 7, hash: 'asd' })).toBe('/img/s7fz1/asd.jpg');
		});

		it('returns URL with custom base path', () => {
			expect(getKivaImageUrl({
				base: 'www.kiva.org/',
				square: 4,
				hash: 'asd',
			})).toBe('www.kiva.org/s4/asd.jpg');
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
