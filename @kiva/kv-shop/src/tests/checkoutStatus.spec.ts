import { getCheckoutStatus, pollForFinishedCheckout } from '../checkoutStatus';

describe('checkoutStatus', () => {
	describe('getCheckoutStatus', () => {
		it('should return the checkout status', async () => {
			const apollo = {
				query: jest.fn().mockResolvedValue({
					data: {
						checkoutStatus: {
							basketId: '123',
							errorCode: '123',
							errorMessage: '123',
							receipt: {
								checkoutId: '123',
							},
							requestedAt: '123',
							status: '123',
							transactionId: '123',
							updatedAt: '123',
						},
					},
				}),
			};

			const result = await getCheckoutStatus({
				apollo: apollo as any,
				transactionSagaId: '123',
				visitorId: '123',
			});

			expect(result).toEqual({
				data: {
					checkoutStatus: {
						basketId: '123',
						errorCode: '123',
						errorMessage: '123',
						receipt: {
							checkoutId: '123',
						},
						requestedAt: '123',
						status: '123',
						transactionId: '123',
						updatedAt: '123',
					},
				},
			});
		});
	});

	describe('pollForFinishedCheckout', () => {
		it('should return the checkout status', async () => {
			const apollo = {
				query: jest.fn().mockResolvedValue({
					data: {
						checkoutStatus: {
							basketId: '123',
							errorCode: '123',
							errorMessage: '123',
							receipt: {
								checkoutId: '123',
							},
							requestedAt: '123',
							status: '123',
							transactionId: '123',
							updatedAt: '123',
						},
					},
				}),
			};

			const result = await pollForFinishedCheckout({
				apollo: apollo as any,
				transactionSagaId: '123',
				visitorId: '123',
			});

			expect(result).toEqual({
				data: {
					checkoutStatus: {
						basketId: '123',
						errorCode: '123',
						errorMessage: '123',
						receipt: {
							checkoutId: '123',
						},
						requestedAt: '123',
						status: '123',
						transactionId: '123',
						updatedAt: '123',
					},
				},
			});
		});
	});
});
