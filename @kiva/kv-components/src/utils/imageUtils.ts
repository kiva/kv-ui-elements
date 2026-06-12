import Alea from './Alea';

/**
 * Determines if the users avatar is the default legacy placeholder image from the monolith.
 * The legacy avatars are found exclusively at the following urls:
 * <domain>/img/<size param>/726677.jpg
 * <domain>/img/<size param>/315726.jpg
 * for images from Fastly, urls, like: <domain>/img/s100/4d844ac2c0b77a8a522741b908ea5c32.jpg
 * are the default placeholder image.
 *
 * @param filename The filename of the avatar
 * @returns Whether the file is a legacy placeholder image
 */
export function isLegacyPlaceholderAvatar(filename: any): boolean {
	// if filename is empty or undefined, return false
	if (!filename) {
		return false;
	}
	// convert filename to string if it is a number
	let filenameCleaned = filename.toString();
	// remove file extension from filename if it exists
	if (filenameCleaned.includes('.')) {
		[filenameCleaned] = filenameCleaned.split('.');
	}
	const defaultProfileIds = ['726677', '315726', '4d844ac2c0b77a8a522741b908ea5c32'];
	return defaultProfileIds.includes(filenameCleaned);
}

/**
 * Returns a class string to style a user avatar
 * @returns Random user avatar class string
 */
export function randomizedUserAvatarClass(displayName = '') {
	const rng = Alea(displayName);
	const userCardStyleOptions = [
		{ color: 'tw-text-action', bg: 'tw-bg-brand-100' },
		{ color: 'tw-text-black', bg: 'tw-bg-brand-100' },
		{ color: 'tw-text-white', bg: 'tw-bg-action' },
		{ color: 'tw-text-brand-100', bg: 'tw-bg-action' },
		{ color: 'tw-text-primary-inverse', bg: 'tw-bg-action' },
		{ color: 'tw-text-white', bg: 'tw-bg-black' },
		{ color: 'tw-text-action', bg: 'tw-bg-black' },
	];
	const randomStyle = userCardStyleOptions[Math.floor(rng() * userCardStyleOptions.length)];
	return `${randomStyle.color} ${randomStyle.bg}`;
}

/**
 * Gets the url for a Kiva image hash
 *
 * @param param0.base The base URL of the image
 * @param param0.width The width of the image
 * @param param0.height The height of the image
 * @param param0.square The square size of the image (i.e. width and height are the same)
 * @param param0.faceZoom The face zoom level of the image, 1-100. Requires width, height or square to be set.
 * @param param0.hash The hash of the image
 * @param param0.format The file type of the image (default: jpg)
 * @returns The full url for the image
 */
export function getKivaImageUrl({
	base = '/img/',
	width,
	height,
	square,
	faceZoom,
	hash,
	format = 'jpg',
}: {
	base?: string;
	width?: number;
	height?: number;
	square?: number;
	faceZoom?: number;
	hash: string;
	format?: string;
}): string {
	if (!hash) {
		return '';
	}
	if (!width && !height && !square && !faceZoom) {
		return '';
	}

	let w = '';
	let h = '';
	if (width && height && width === height) {
		// if height and width are the same, use square param
		// eslint-disable-next-line no-param-reassign
		square = width;
	} else {
		// If width and height are different, use w and h
		w = width ? `w${Math.ceil(width)}` : '';
		h = height ? `h${Math.ceil(height)}` : '';
	}

	const s = square ? `s${Math.ceil(square)}` : '';
	const fz = faceZoom && (width || height || square) ? `fz${Math.ceil(faceZoom)}` : '';

	return `${base}${w}${h}${s}${fz}/${hash}.${format}`;
}

export const DEFAULT_ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

export interface ImageFileValidationOptions {
	maxSizeMb?: number;
	acceptedFileTypes?: string[];
}

export interface ImageFileValidationError {
	type: 'size' | 'format';
	message: string;
}

export interface ImageFileValidationResult {
	valid: boolean;
	error?: ImageFileValidationError;
}

/**
 * Validates an image File against a maximum size and an allow-list of MIME types.
 *
 * @param file The file to validate
 * @param options.maxSizeMb Maximum allowed size in megabytes (default 1)
 * @param options.acceptedFileTypes Allowed MIME types (default png/jpeg/jpg/gif)
 * @returns `{ valid: true }` or `{ valid: false, error: { type, message } }`
 */
export function validateImageFile(
	file: File,
	{
		maxSizeMb = 1,
		acceptedFileTypes = DEFAULT_ACCEPTED_IMAGE_TYPES,
	}: ImageFileValidationOptions = {},
): ImageFileValidationResult {
	if (file.size > maxSizeMb * 1024 * 1024) {
		return {
			valid: false,
			error: { type: 'size', message: `File size must be less than ${maxSizeMb}MB` },
		};
	}
	if (!acceptedFileTypes.includes(file.type)) {
		return {
			valid: false,
			error: { type: 'format', message: 'File format not supported' },
		};
	}
	return { valid: true };
}

export interface CropResizeOptions {
	aspectRatio?: number;
	maxDimension?: number;
}

/**
 * Reads an image File, center-crops it to the target aspect ratio, and resizes it onto a
 * canvas, returning the result as a data URL. Used to generate a preview thumbnail.
 *
 * @param file The image file
 * @param options.aspectRatio Target width / height (default 1 = square)
 * @param options.maxDimension Drives the canvas output resolution (default 1000); the output
 *   canvas is `2 * maxDimension` px wide (e.g. default 1000 → 2000px) for crisp HiDPI previews
 * @returns A Promise resolving to a data URL string
 */
export function cropResizeImageToDataUrl(
	file: File,
	{ aspectRatio = 1, maxDimension = 1000 }: CropResizeOptions = {},
): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onerror = () => reject(new Error('Failed to read file'));

		reader.onload = () => {
			const img = new Image();

			img.onerror = () => reject(new Error('Failed to read file'));

			img.onload = () => {
				const imageAspectRatio = img.naturalWidth / img.naturalHeight;

				let sourceX = 0;
				let sourceY = 0;
				let sourceWidth = img.naturalWidth;
				let sourceHeight = img.naturalHeight;

				if (imageAspectRatio > aspectRatio) {
					// Wider than target: crop horizontally, centered
					sourceWidth = img.naturalHeight * aspectRatio;
					sourceX = (img.naturalWidth - sourceWidth) / 2;
				} else if (imageAspectRatio < aspectRatio) {
					// Taller than target: crop vertically, centered
					sourceHeight = img.naturalWidth / aspectRatio;
					sourceY = (img.naturalHeight - sourceHeight) / 2;
				}

				const canvas = document.createElement('canvas');
				// 2x output for crisp HiDPI/retina previews (mirrors the original ImageUpload behavior)
				canvas.width = maxDimension * 2;
				canvas.height = canvas.width / aspectRatio;

				const ctx = canvas.getContext('2d');
				if (!ctx) {
					reject(new Error('Failed to process image'));
					return;
				}

				ctx.drawImage(
					img,
					sourceX,
					sourceY,
					sourceWidth,
					sourceHeight,
					0,
					0,
					canvas.width,
					canvas.height,
				);

				// Canvas can't encode GIF, so GIF previews resolve as PNG. Cosmetic only — the original File is what callers emit/upload.
				resolve(canvas.toDataURL(file.type));
			};

			img.src = reader.result as string;
		};

		reader.readAsDataURL(file);
	});
}
