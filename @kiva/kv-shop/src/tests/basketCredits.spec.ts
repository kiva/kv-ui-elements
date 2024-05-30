import {
	applyKivaCredit,
	applyPromoCredit,
	removeKivaCredit,
	removePromoCredit,
} from '../basketCredits';

describe('basketCredits', () => {
	describe('applyKivaCredit', () => {
		it('should return true if the mutation returns true', async () => {
			const apollo = {
				mutate: jest.fn().mockResolvedValue({
					data: {
						shop: {
							id: '123',
							addCreditByType: true,
						},
					},
				}),
			};

			const result = await applyKivaCredit(apollo as any);

			expect(result).toBe(true);
		});

		it('should return false if the mutation returns false', async () => {
			const apollo = {
				mutate: jest.fn().mockResolvedValue({
					data: {
						shop: {
							id: '123',
							addCreditByType: false,
						},
					},
				}),
			};

			const result = await applyKivaCredit(apollo as any);

			expect(result).toBe(false);
		});

		it('should return false if the mutation returns null', async () => {
			const apollo = {
				mutate: jest.fn().mockResolvedValue({
					data: {
						shop: null,
					},
				}),
			};

			const result = await applyKivaCredit(apollo as any);

			expect(result).toBe(false);
		});
	});

	describe('removeKivaCredit', () => {
		it('should return true if the mutation returns true', async () => {
			const apollo = {
				mutate: jest.fn().mockResolvedValue({
					data: {
						shop: {
							id: '123',
							removeCreditByType: true,
						},
					},
				}),
			};

			const result = await removeKivaCredit(apollo as any);

			expect(result).toBe(true);
		});

		it('should return false if the mutation returns false', async () => {
			const apollo = {
				mutate: jest.fn().mockResolvedValue({
					data: {
						shop: {
							id: '123',
							removeCreditByType: false,
						},
					},
				}),
			};

			const result = await removeKivaCredit(apollo as any);

			expect(result).toBe(false);
		});

		it('should return false if the mutation returns null', async () => {
			const apollo = {
				mutate: jest.fn().mockResolvedValue({
					data: {
						shop: null,
					},
				}),
			};

			const result = await removeKivaCredit(apollo as any);

			expect(result).toBe(false);
		});
	});

	describe('applyPromoCredit', () => {
		const applyPromoCreditResponse = {
			data: {
				shop: {
					id: '123',
					addCreditByType: true,
				},
			},
		};

		const options = {
			variables: {
				creditType: 'universal_code',
				redemptionCode: '123',
			},
		};

		it('should return shop data', async () => {
			const apollo = {
				mutate: jest.fn().mockResolvedValue(applyPromoCreditResponse),
			};
			const result = await applyPromoCredit(apollo as any, options as any);
			expect(result).toEqual(applyPromoCreditResponse.data);
		});

		const missingParamResponse = {
			errors: [
				{
					message: 'Missing require parameter.',
					extensions: { code: 'upc.missing_parameter' },
				},
			],
		};

		it('should return error for missing parameters', async () => {
			const apollo = {
				mutate: jest.fn(),
			};
			const optionsWithMissingParams = {
				variables: {},
			};
			const result = await applyPromoCredit(apollo as any, optionsWithMissingParams as any);
			expect(result).toEqual(missingParamResponse);
		});
	});

	describe('removePromoCredit', () => {
		it('should return true if the mutation returns true', async () => {
			const apollo = {
				mutate: jest.fn().mockResolvedValue({
					data: {
						shop: {
							id: '123',
							removeCreditByType: true,
						},
					},
				}),
			};

			const options = {
				variables: {
					creditType: 'universal_code',
					redemptionCode: '123',
				},
			};

			const result = await removePromoCredit(apollo as any, options as any);

			expect(result).toBe(true);
		});

		it('should return false if the mutation returns false', async () => {
			const apollo = {
				mutate: jest.fn().mockResolvedValue({
					data: {
						shop: {
							id: '123',
							removeCreditByType: false,
						},
					},
				}),
			};

			const options = {};

			const result = await removePromoCredit(apollo as any, options as any);

			expect(result).toBe(false);
		});

		it('should return false if the mutation returns null', async () => {
			const apollo = {
				mutate: jest.fn().mockResolvedValue({
					data: {
						shop: null,
					},
				}),
			};

			const options = {};

			const result = await removePromoCredit(apollo as any, options as any);

			expect(result).toBe(false);
		});

		it('should return false if the mutation variables are missing', async () => {
			const apollo = {
				mutate: jest.fn().mockResolvedValue({
					data: {
						shop: null,
					},
				}),
			};

			const options = {};

			const result = await removePromoCredit(apollo as any, options as any);

			expect(result).toBe(false);
		});
	});
});
