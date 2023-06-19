import { ApolloClient, ApolloCache, NormalizedCacheObject } from '@apollo/client/core';
import { setTipDonation } from '../basketItems';

// TODO: Add remaining test cases MARS-436
class MockApolloClient<TCacheShape extends NormalizedCacheObject> extends ApolloClient<TCacheShape> {
	constructor() {
		super({ cache: {} as ApolloCache<TCacheShape> });
	}

	mutate = jest.fn().mockResolvedValue(Promise.resolve({
		data: {
			shop: {
				updateDonation: jest.fn(),
			},
		},
	}));
}

describe('basketItem.ts', () => {
	it('should set tip donation', async () => {
		const mockClient = new MockApolloClient<NormalizedCacheObject>();
		const payload = { amount: 25, apollo: mockClient };
		await setTipDonation(payload);
		expect(mockClient.mutate).toHaveBeenCalled();
	});
});
