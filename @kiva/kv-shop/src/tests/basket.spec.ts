import { getCookieValue, handleInvalidBasketForDonation } from '../basket';

describe('basket.ts', () => {
	it('encoded token', () => {
		const encodedToken = encodeURIComponent('tests==');
		expect(encodedToken).toEqual('tests%3D%3D');
		document.cookie = `encoded=${encodedToken}; Max-Age=5;`;
		const decodedToken = getCookieValue('encoded');
		expect(decodedToken).toEqual('tests==');
	});

	it('should save donation amount on cookie', async () => {
		Object.defineProperty(window, 'location', {
			value: {
				reload: jest.fn(),
			},
		});
		const donationAmount = 35;
		const apollo = {
			mutate: jest.fn().mockResolvedValue(Promise.resolve({
				data: {
					shop: null,
				},
			})),
		};

		await handleInvalidBasketForDonation({ donationAmount, apollo });
		const donation = JSON.parse(getCookieValue('kvatbamt') ?? '');
		expect(donation).toStrictEqual({ donationAmount: 35.00, navigateToCheckout: false });
	});
});
