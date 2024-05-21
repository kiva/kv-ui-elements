import { getPromoFromBasket } from '../managedAccount';

const missingOptionsPromoCampaignResponse = {
	error: 'promoFundId or basketId variable required',
};

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
		it('should return error if no required options are passed', async () => {
			const apollo = {
				query: jest.fn().mockResolvedValue(missingOptionsPromoCampaignResponse),
			};
			const options = {};

			const result = await getPromoFromBasket(apollo as any, options as any);
			expect(result).toStrictEqual(missingOptionsPromoCampaignResponse);
		});

		it('should return data if the basketId is passed', async () => {
			const apollo = {
				query: jest.fn().mockResolvedValue(validPromoCampaignResponse),
			};
			const options = {
				variables: {
					basketId: '123',
				},
			};

			const result = await getPromoFromBasket(apollo as any, options as any);

			expect(result?.shop?.promoCampaign?.id).toBe('123');
		});

		it('should return data if the promoFundId is passed', async () => {
			const apollo = {
				query: jest.fn().mockResolvedValue(validPromoCampaignResponse),
			};
			const options = {
				variables: {
					promoFundId: '876',
				},
			};

			const result = await getPromoFromBasket(apollo as any, options as any);

			expect(result?.shop?.promoCampaign?.id).toBe('123');
		});

		it('should return null if no promoCampaign is found', async () => {
			const apollo = {
				query: jest.fn().mockResolvedValue(emptyPromoCampaignResponse),
			};
			const options = {
				variables: {
					basketId: '999',
				},
			};

			const result = await getPromoFromBasket(apollo as any, options as any);

			expect(result?.shop?.promoCampaign).toBe(null);
		});
	});
});
