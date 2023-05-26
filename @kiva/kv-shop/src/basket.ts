// TODO: could be moved to shared file or separate package
export const getCookieValue = (name: string) => {
	if (typeof document !== undefined) {
		// From: https://stackoverflow.com/a/25490531
		return decodeURIComponent(document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`)?.pop() || '');
	}
};

export function getBasketID() {
	return getCookieValue('kvbskt');
}

export function setBasketID(basketId: string) {
	// TODO
}
