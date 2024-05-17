import { getPromoFromBasket } from '../managedAccount';

const validPromoCampaignResponse = {
	data: {
		shop: {
			id: '123',
			promoCampaign: {
				id: '123',
				redemptionCode: '123',
			},
		},
	},
};

const emptyPromoCampaignResponse = {
	data: {
		shop: {
			id: '123',
			promoCampaign: null,
		},
	},
};

describe('managedAccount', () => {
	describe('getPromoFromBasket', () => {
		it('should return data if the mutation returns true', async () => {
			const apollo = {
				query: jest.fn().mockResolvedValue(validPromoCampaignResponse),
			};

			const result = await getPromoFromBasket(apollo as any);

			expect(result?.shop?.promoCampaign?.id).toBe('123');
		});

		it('should return null if no promoCampaign is found', async () => {
			const apollo = {
				query: jest.fn().mockResolvedValue(emptyPromoCampaignResponse),
			};

			const result = await getPromoFromBasket(apollo as any);

			expect(result?.shop?.promoCampaign).toBe(null);
		});
	});
});
