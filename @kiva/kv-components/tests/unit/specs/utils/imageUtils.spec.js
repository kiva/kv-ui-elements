import {
	getKivaImageUrl,
	isLegacyPlaceholderAvatar,
	randomizedUserAvatarClass,
	validateImageFile,
	cropResizeImageToDataUrl,
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

describe('validateImageFile', () => {
	it('accepts a valid file within the size and type limits', () => {
		const file = new File(['x'], 'photo.png', { type: 'image/png' });
		expect(validateImageFile(file, { maxSizeMb: 1 })).toEqual({ valid: true });
	});

	it('rejects a file larger than maxSizeMb with a size error', () => {
		const big = new File([new ArrayBuffer(2 * 1024 * 1024)], 'big.png', { type: 'image/png' });
		expect(validateImageFile(big, { maxSizeMb: 1 })).toEqual({
			valid: false,
			error: { type: 'size', message: 'File size must be less than 1MB' },
		});
	});

	it('rejects a disallowed file type with a format error', () => {
		const file = new File(['x'], 'notes.txt', { type: 'text/plain' });
		expect(validateImageFile(file)).toEqual({
			valid: false,
			error: { type: 'format', message: 'File format not supported' },
		});
	});

	it('honors a custom acceptedFileTypes list', () => {
		const gif = new File(['x'], 'a.gif', { type: 'image/gif' });
		expect(validateImageFile(gif, { acceptedFileTypes: ['image/png'] }).valid).toBe(false);
		expect(validateImageFile(gif, { acceptedFileTypes: ['image/gif'] }).valid).toBe(true);
	});
});

describe('cropResizeImageToDataUrl', () => {
	let originalImage;
	let drawImageMock;
	let mockNaturalWidth;
	let mockNaturalHeight;

	beforeEach(() => {
		mockNaturalWidth = 200;
		mockNaturalHeight = 100;

		originalImage = global.Image;
		// An image whose `onload` fires as soon as `src` is set.
		// naturalWidth/naturalHeight are set from module-level variables in the constructor so
		// each test can configure them before the Promise resolves.
		global.Image = class {
			constructor() {
				this.naturalWidth = mockNaturalWidth;
				this.naturalHeight = mockNaturalHeight;
				this.onload = null;
				this.onerror = null;
			}

			set src(_value) {
				Promise.resolve().then(() => { if (this.onload) this.onload(); });
			}
		};

		drawImageMock = jest.fn();
		jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({ drawImage: drawImageMock });
		jest.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue('data:image/png;base64,cropped');
	});

	afterEach(() => {
		global.Image = originalImage;
		jest.restoreAllMocks();
	});

	it('resolves with the canvas data URL', async () => {
		const file = new File(['x'], 'a.png', { type: 'image/png' });
		await expect(cropResizeImageToDataUrl(file, { aspectRatio: 1, maxDimension: 100 }))
			.resolves.toBe('data:image/png;base64,cropped');
	});

	it('center-crops a wide image to the target square and sizes the canvas from maxDimension', async () => {
		const file = new File(['x'], 'a.png', { type: 'image/png' });
		await cropResizeImageToDataUrl(file, { aspectRatio: 1, maxDimension: 100 });
		// 200x100 source, square target => sourceWidth=100, sourceX=50; canvas = 200x200
		expect(drawImageMock).toHaveBeenCalledWith(
			expect.anything(),
			50,
			0,
			100,
			100,
			0,
			0,
			200,
			200,
		);
	});

	it('center-crops a tall/portrait image to the target square', async () => {
		mockNaturalWidth = 100;
		mockNaturalHeight = 200;

		const file = new File(['x'], 'a.png', { type: 'image/png' });
		await cropResizeImageToDataUrl(file, { aspectRatio: 1, maxDimension: 100 });
		// 100x200 source, square target => sourceHeight=100, sourceY=50, sourceX=0, sourceWidth=100; canvas=200x200
		expect(drawImageMock).toHaveBeenCalledWith(
			expect.anything(),
			0,
			50,
			100,
			100,
			0,
			0,
			200,
			200,
		);
	});

	it('does not crop when source already matches the target aspect ratio', async () => {
		mockNaturalWidth = 200;
		mockNaturalHeight = 200;

		const file = new File(['x'], 'a.png', { type: 'image/png' });
		await cropResizeImageToDataUrl(file, { aspectRatio: 1, maxDimension: 100 });
		// 200x200 source, square target => no crop; canvas=200x200
		expect(drawImageMock).toHaveBeenCalledWith(
			expect.anything(),
			0,
			0,
			200,
			200,
			0,
			0,
			200,
			200,
		);
	});

	it('rejects when a 2d context cannot be obtained', async () => {
		HTMLCanvasElement.prototype.getContext.mockReturnValue(null);
		const file = new File(['x'], 'a.png', { type: 'image/png' });
		await expect(cropResizeImageToDataUrl(file)).rejects.toThrow('Failed to process image');
	});
});
