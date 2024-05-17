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

			const result = await applyPromoCredit(apollo as any);

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

			const result = await applyPromoCredit(apollo as any);

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

			const result = await applyPromoCredit(apollo as any);

			expect(result).toBe(false);
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

			const result = await removePromoCredit(apollo as any);

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

			const result = await removePromoCredit(apollo as any);

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

			const result = await removePromoCredit(apollo as any);

			expect(result).toBe(false);
		});
	});
});
