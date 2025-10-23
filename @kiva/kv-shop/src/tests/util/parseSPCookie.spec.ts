import parseSPCookie, { findSnowplowCookieName } from '../../util/parseSPCookie';
import { setCookieValue } from '../../util/cookie';

const testRawDocumentCookie = 'OptanonConsent=isIABGlobal=false&datestamp=Fri+Oct+17+2025+15%3A23%3A27+GMT-0700+(Pacific+Daylight+Time)&version=202210.1.0&hosts=&landingPath=NotLandingPage&groups=C0001%3A1%2CC0003%3A1%2CC0002%3A1%2CC0004%3A1&AwaitingReconsent=false; _gcl_au=1.1.803879418.1760566979; _ga_26X0Q3XCDC=GS2.1.s1760566979$o1$g1$t1760568338$j60$l0$h0; _ga=GA1.2.1747379136.1760566980; uiv=47eb7931-8912-4c3a-9eff-561e58ae4c50;  _ga_H5G83RKW61=GS2.1.s1760642862$o3$g1$t1760642886$j36$l0$h0; kvgdpr=opted_out=true&pii_opted_out=true&viewed=true&viewed_date=1554150438; kvu_lb=false; kvu_db=true; mykivaredirectv2=true; opt_in_comms=a; kvutm_medium_email=true; kvbskt=sqBHGHtXNZcD4OLR3K4p1Q%3D%3D; OptanonConsent=isIABGlobal=false&datestamp=Tue+Oct+21+2025+14%3A53%3A03+GMT-0700+(Pacific+Daylight+Time)&version=202210.1.0&hosts=&landingPath=NotLandingPage&groups=C0001%3A1%2CC0003%3A1%2CC0002%3A1%2CC0004%3A1&AwaitingReconsent=false; _sp_id.6d5c=a131d1f2-8c08-4302-b844-cc4c9268abdd.1760566976.14.1761083599.1761070047.43c75bc2-830e-4f25-961e-bce2045d3df0';

describe('parseSPCookie.ts', () => {
	// Helper to mock document.cookie
	const mockDocumentCookie = (cookieString: string) => {
		Object.defineProperty(document, 'cookie', {
			writable: true,
			value: cookieString,
		});
	};

	beforeEach(() => {
		// Clear document.cookie before each test
		mockDocumentCookie('');
	});

	describe('findSnowplowCookieName', () => {
		it('should find Snowplow cookie from testRawDocumentCookie', () => {
			mockDocumentCookie(testRawDocumentCookie);

			const result = findSnowplowCookieName();

			expect(result).toBe('_sp_id.6d5c');
		});

		it('should return null when no Snowplow cookie exists', () => {
			mockDocumentCookie('other_cookie=value; _ga=GA1.2.123456');

			const result = findSnowplowCookieName();

			expect(result).toBeNull();
		});

		it('should return null when document is undefined', () => {
			const originalDocument = global.document;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(global as any).document = undefined;

			const result = findSnowplowCookieName();

			expect(result).toBeNull();

			// Restore document
			global.document = originalDocument;
		});

		it('should find first Snowplow cookie when multiple exist', () => {
			mockDocumentCookie('_sp_id.first=value1; _sp_id.second=value2');

			const result = findSnowplowCookieName();

			expect(result).toBe('_sp_id.first');
		});
	});

	describe('parseSPCookie', () => {
		it('should parse Snowplow cookie from testRawDocumentCookie', () => {
			mockDocumentCookie(testRawDocumentCookie);

			const result = parseSPCookie();

			expect(result).toEqual({
				snowplowUserId: 'a131d1f2-8c08-4302-b844-cc4c9268abdd',
				snowplowSessionId: '43c75bc2-830e-4f25-961e-bce2045d3df0',
			});
		});

		it('should return empty object when no Snowplow cookie exists', () => {
			mockDocumentCookie('other_cookie=value; _ga=GA1.2.123456');

			const result = parseSPCookie();

			expect(result).toEqual({});
		});

		it('should return empty object when Snowplow cookie has no value', () => {
			mockDocumentCookie('_sp_id.test=');

			const result = parseSPCookie();

			expect(result).toEqual({});
		});

		it('should handle single segment cookie', () => {
			setCookieValue('_sp_id.single', 'onlysegment');

			const result = parseSPCookie();

			expect(result).toEqual({
				snowplowUserId: 'onlysegment',
				snowplowSessionId: 'onlysegment',
			});
		});

		it('should handle multi-segment cookie correctly', () => {
			setCookieValue('_sp_id.multi', 'first.second.third.fourth.last');

			const result = parseSPCookie();

			expect(result).toEqual({
				snowplowUserId: 'first',
				snowplowSessionId: 'last',
			});
		});

		it('should handle encoded cookie values', () => {
			setCookieValue('_sp_id.encoded', 'user id.session-id');

			const result = parseSPCookie();

			expect(result).toEqual({
				snowplowUserId: 'user id',
				snowplowSessionId: 'session-id',
			});
		});
	});
});
