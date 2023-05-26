import { getCookieValue } from '../basket';

describe('basket.ts', () => {
	it('encoded token', () => {
		const encodedToken = encodeURIComponent('tests==');
		expect(encodedToken).toEqual('tests%3D%3D');
		document.cookie = `encoded=${encodedToken}; Max-Age=5;`;
		const decodedToken = getCookieValue('encoded');
		expect(decodedToken).toEqual('tests==');
	});
});
