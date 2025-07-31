import { getCookieValue } from './cookie';

export function getVisitorID() {
	return getCookieValue('uiv');
}
