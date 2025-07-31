export const getCookieValue = (name: string) => {
	if (typeof document !== undefined) {
		// From: https://stackoverflow.com/a/25490531
		return decodeURIComponent(document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`)?.pop() || '');
	}
};
export const setCookieValue = (name: string, value: string, options = '') => {
	if (typeof document !== undefined) {
		document.cookie = `${name}=${encodeURIComponent(value)};${options}`;
	}
};
