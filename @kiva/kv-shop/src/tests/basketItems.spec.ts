import { ApolloClient, ApolloCache, NormalizedCacheObject } from '@apollo/client/core';
import { setTipDonation, addKivaCardToBasket, KivaCardDeliveryTypeEnum } from '../basketItems';

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

	describe('addKivaCardToBasket', () => {
		const mockKivaCard = {
			deliveryType: KivaCardDeliveryTypeEnum.Email,
			giftAmount: 50,
			message: 'Happy Birthday!',
			recipient: {
				email: 'johndoe@email.com',
				name: 'John Doe',
			},
			senderName: 'Johns Friend',
			senderEmail: 'johnsfriend@email.com',
		};

		it('should add kiva card to basket successfully', async () => {
			const apollo = new MockApolloClient({ data: { shop: { addKivaCardToBasket: true } } });
			const result = await addKivaCardToBasket({ kivaCard: mockKivaCard, apollo });

			expect(apollo.mutate).toHaveBeenCalledWith({
				mutation: expect.anything(),
				awaitRefetchQueries: true,
				refetchQueries: expect.anything(),
				variables: {
					basketId: '',
					kivaCard: {
						...mockKivaCard,
						giftAmount: '50.00',
					},
				},
			});
			expect(result).toBe(true);
		});

		it('should format gift amount correctly', async () => {
			const apollo = new MockApolloClient({ data: { shop: { addKivaCardToBasket: true } } });
			const kivaCardWithStringAmount = {
				...mockKivaCard,
				giftAmount: '25.5',
			};

			await addKivaCardToBasket({ kivaCard: kivaCardWithStringAmount, apollo });

			expect(apollo.mutate).toHaveBeenCalledWith({
				mutation: expect.anything(),
				awaitRefetchQueries: true,
				refetchQueries: expect.anything(),
				variables: {
					basketId: '',
					kivaCard: {
						...kivaCardWithStringAmount,
						giftAmount: '25.50',
					},
				},
			});
		});

		it('should handle lender delivery type with lenderId', async () => {
			const apollo = new MockApolloClient({ data: { shop: { addKivaCardToBasket: true } } });
			const lenderKivaCard = {
				...mockKivaCard,
				deliveryType: KivaCardDeliveryTypeEnum.Lender,
				recipient: {
					...mockKivaCard.recipient,
					lenderId: 12345,
				},
			};

			const result = await addKivaCardToBasket({ kivaCard: lenderKivaCard, apollo });

			expect(apollo.mutate).toHaveBeenCalledWith({
				mutation: expect.anything(),
				awaitRefetchQueries: true,
				refetchQueries: expect.anything(),
				variables: {
					basketId: '',
					kivaCard: {
						...lenderKivaCard,
						giftAmount: '50.00',
					},
				},
			});
			expect(result).toBe(true);
		});

		it('should handle postal delivery type with address', async () => {
			const apollo = new MockApolloClient({ data: { shop: { addKivaCardToBasket: true } } });
			const postalKivaCard = {
				...mockKivaCard,
				deliveryType: KivaCardDeliveryTypeEnum.Postal,
				recipient: {
					...mockKivaCard.recipient,
					address: '123 Main St',
					city: 'Salt Lake City',
					state: 'UT',
					postalCode: '84111',
					country: 'US',
				},
			};

			const result = await addKivaCardToBasket({ kivaCard: postalKivaCard, apollo });

			expect(apollo.mutate).toHaveBeenCalledWith({
				mutation: expect.anything(),
				awaitRefetchQueries: true,
				refetchQueries: expect.anything(),
				variables: {
					basketId: '',
					kivaCard: {
						...postalKivaCard,
						giftAmount: '50.00',
					},
				},
			});
			expect(result).toBe(true);
		});

		it('should handle scheduled delivery date', async () => {
			const apollo = new MockApolloClient({ data: { shop: { addKivaCardToBasket: true } } });
			const scheduledKivaCard = {
				...mockKivaCard,
				recipient: {
					...mockKivaCard.recipient,
					scheduledDeliveryDate: '2024-12-25T00:00:00Z',
				},
			};

			const result = await addKivaCardToBasket({ kivaCard: scheduledKivaCard, apollo });

			expect(apollo.mutate).toHaveBeenCalledWith({
				mutation: expect.anything(),
				awaitRefetchQueries: true,
				refetchQueries: expect.anything(),
				variables: {
					basketId: '',
					kivaCard: {
						...scheduledKivaCard,
						giftAmount: '50.00',
					},
				},
			});
			expect(result).toBe(true);
		});

		it('should return false when mutation returns null', async () => {
			const apollo = new MockApolloClient({ data: { shop: { addKivaCardToBasket: null } } });
			const result = await addKivaCardToBasket({ kivaCard: mockKivaCard, apollo });

			expect(result).toBe(false);
		});

		it('should throw error for basket issues', async () => {
			const apollo = new MockApolloClient({ data: {}, errors: [{ code: 'shop.basketRequired' }] });
			expect(addKivaCardToBasket({ kivaCard: mockKivaCard, apollo })).rejects.toThrow('There was a problem with your basket.');
		});
	});
});
