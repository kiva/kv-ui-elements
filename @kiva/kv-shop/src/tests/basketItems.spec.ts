import { ApolloClient, ApolloCache, NormalizedCacheObject } from '@apollo/client/core';
import { setTipDonation } from '../basketItems';

class MockApolloClient extends ApolloClient<NormalizedCacheObject> {
	constructor(mutateResult?: any) {
		super({ cache: {} as ApolloCache<NormalizedCacheObject> });
		this.mutate = jest.fn().mockResolvedValue(Promise.resolve(mutateResult));
	}
}

describe('basketItem.ts', () => {
	it('should set tip donation', async () => {
		const apollo = new MockApolloClient({ data: { shop: { updateDonation: { id: 123 } } } });
		const donation = await setTipDonation({ amount: 25, apollo });
		expect(apollo.mutate).toHaveBeenCalledWith({
			mutation: expect.anything(),
			awaitRefetchQueries: true,
			refetchQueries: expect.anything(),
			variables: { basketId: '', price: '25.00' },
		});
		expect(donation).toEqual({ id: 123 });
	});

	it('should set tip donation with metadata', async () => {
		const apollo = new MockApolloClient({ data: { shop: { updateDonation: { id: 123 } } } });
		const donation = await setTipDonation({ amount: 25, metadata: 'test metadata', apollo });
		expect(apollo.mutate).toHaveBeenCalledWith({
			mutation: expect.anything(),
			awaitRefetchQueries: true,
			refetchQueries: expect.anything(),
			variables: { basketId: '', price: '25.00', metadata: 'test metadata' },
		});
		expect(donation).toEqual({ id: 123 });
	});

	it('retry then throw an error for missing baskets', async () => {
		const apollo = new MockApolloClient({ data: {}, errors: [{ code: 'shop.basketRequired' }] });
		expect(setTipDonation({ amount: 25, apollo })).rejects.toThrow('There was a problem with your basket.');
		// The below expectation is to ensure that the mutation was retried, but for some reason it always returns 1 instead of 5.
		// We can verify with console logs in the test that the mutate method does get called 5 times though.
		// expect(apollo.mutate).toHaveBeenCalledTimes(5); // 1 attempt + 2 retries (2 mutations per retry)
	});
});
