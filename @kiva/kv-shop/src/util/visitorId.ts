import { getCookieValue } from './cookie';

export default function getVisitorID() {
	return getCookieValue('uiv');
}
