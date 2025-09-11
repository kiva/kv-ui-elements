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
export function isLegacyPlaceholderAvatar(filename) {
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
	const rng = new Alea(displayName);
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
 * @param {string} param0.base The base URL of the image
 * @param {number} param0.width The width of the image
 * @param {number} param0.height The height of the image
 * @param {string} param0.hash The hash of the image
 * @param {string} param0.type The file type of the image (default: jpg)
 * @returns The full url for the image
 */
export function getKivaImageUrl({
	base = '/',
	width,
	height,
	hash,
	type = 'jpg',
}) {
	if (!hash) {
		return '';
	}
	if (!width && !height) {
		return '';
	}
	const w = width ? `w${Math.ceil(width)}` : '';
	const h = height ? `h${Math.ceil(height)}` : '';
	return `${base}${w}${h}/${hash}.${type}`;
}
