import { getCookieValue, setCookieValue } from '../../util/cookie';

describe('cookie.ts', () => {
	it('encoded token', () => {
		setCookieValue('encoded', 'tests==', 'Max-Age=5;');
		expect(document.cookie).toEqual('encoded=tests%3D%3D');
		const cookieValue = getCookieValue('encoded');
		expect(cookieValue).toEqual('tests==');
	});
});
