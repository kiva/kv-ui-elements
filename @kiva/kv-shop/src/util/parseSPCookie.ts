import { getCookieValue } from './cookie';

// Helper function to find the Snowplow cookie name
export const findSnowplowCookieName = (): string | null => {
	if (typeof document === 'undefined') {
		return null;
	}

	const cookies = document.cookie.split(';');
	const spCookieName = cookies
		.map((cookie) => cookie.trim().split('=')[0])
		.find((name) => name && name.indexOf('_sp_id') === 0);

	return spCookieName || null;
};

export default function parseSPCookie(): { snowplowUserId: string | null; snowplowSessionId: string | null } {
	// Find the cookie that has a name that starts with '_sp_id'
	const spCookieName = findSnowplowCookieName();

	// stub snowplow cookie data structure
	const spCookieData: { snowplowUserId: string | null; snowplowSessionId: string | null } = {
		snowplowUserId: null,
		snowplowSessionId: null,
	};

	if (!spCookieName) {
		// return an empty object if the cookie isn't present
		return spCookieData;
	}

	const spCookieValue = getCookieValue(spCookieName);

	if (!spCookieValue) {
		// return an empty object if the cookie value is empty
		return spCookieData;
	}

	// split the cookie to get the data
	const data = spCookieValue?.split('.') ?? [];

	// return the user id and sessionid if they were fetched, otherwise return an empty object
	if (data.length > 0) {
		// eslint-disable-next-line prefer-destructuring
		spCookieData.snowplowUserId = data?.[0] ?? null;
		spCookieData.snowplowSessionId = data?.[data.length - 1] ?? null;
	}

	return spCookieData;
}
