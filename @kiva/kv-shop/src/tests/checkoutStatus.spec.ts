// eslint-disable-next-line max-classes-per-file
import { ApolloClient, ApolloCache, NormalizedCacheObject } from '@apollo/client/core';
import { getCheckoutStatus, pollForCheckoutStatus } from '../checkoutStatus';

const successfulCheckoutStatus = {
	data: {
		checkoutStatus: {
			status: 'COMPLETED',
			errorCode: null,
			errorMessage: null,
			receipt: {
				checkoutId: '123',
			},
		},
	},
};

const pendingCheckoutStatus = {
	data: {
		checkoutStatus: {
			status: 'STARTED',
			errorCode: null,
			errorMessage: null,
		},
	},
};

const unknownTransactionIdError = {
	errors: [
		{
			message: "The field at path '/checkoutStatus/status' was declared as a non null type, but the code involved in retrieving data has wrongly returned a null value.  The graphql specification requires that the parent field be set to null, or if that is non nullable that it bubble up null to its parent and so on. The non-nullable type is 'CheckoutStatusEnum' within parent type 'CheckoutStatus'",
			extensions: {
				code: 'DOWNSTREAM_SERVICE_ERROR',
				serviceName: 'checkout-orchestrator-service',
				exception: {
					message: "The field at path '/checkoutStatus/status' was declared as a non null type, but the code involved in retrieving data has wrongly returned a null value.  The graphql specification requires that the parent field be set to null, or if that is non nullable that it bubble up null to its parent and so on. The non-nullable type is 'CheckoutStatusEnum' within parent type 'CheckoutStatus'",
					path: [
						'checkoutStatus',
						'status',
					],
					stacktrace: [
						"GraphQLError: The field at path '/checkoutStatus/status' was declared as a non null type, but the code involved in retrieving data has wrongly returned a null value.  The graphql specification requires that the parent field be set to null, or if that is non nullable that it bubble up null to its parent and so on. The non-nullable type is 'CheckoutStatusEnum' within parent type 'CheckoutStatus'",
						'    at downstreamServiceError (/app/node_modules/@apollo/gateway/dist/executeQueryPlan.js:354:12)',
						'    at /app/node_modules/@apollo/gateway/dist/executeQueryPlan.js:237:59',
						'    at Array.map (<anonymous>)',
						'    at sendOperation (/app/node_modules/@apollo/gateway/dist/executeQueryPlan.js:237:44)',
						'    at runMicrotasks (<anonymous>)',
						'    at processTicksAndRejections (internal/process/task_queues.js:97:5)',
						'    at async /app/node_modules/@apollo/gateway/dist/executeQueryPlan.js:166:49',
						'    at async executeNode (/app/node_modules/@apollo/gateway/dist/executeQueryPlan.js:129:17)',
						'    at async /app/node_modules/@apollo/gateway/dist/executeQueryPlan.js:29:35',
						'    at async /app/node_modules/@apollo/gateway/dist/index.js:105:38',
					],
				},
			},
		},
	],
	data: null,
};

class MockApolloClient<TCacheShape extends NormalizedCacheObject> extends ApolloClient<TCacheShape> {
	constructor(private readonly data) {
		super({ cache: {} as ApolloCache<TCacheShape> });
	}

	query = jest.fn().mockResolvedValue(Promise.resolve(this.data));
	// {
	// 	data: this.data,
	// 	// data: {
	// 	// 	checkoutStatus: successfulCheckoutStatus,
	// 	// },
	// }));
}

class MockApolloClientSequenced<TCacheShape extends NormalizedCacheObject> extends ApolloClient<TCacheShape> {
	constructor(private readonly data) {
		super({ cache: {} as ApolloCache<TCacheShape> });
	}

	query = jest.fn();
}

describe('loanChannelUtils.js', () => {
	describe('getCheckoutStatus', () => {
		it('should throw an error if apollo or the transaction id does not exist', async () => {
			const mockClient = new MockApolloClient<NormalizedCacheObject>(unknownTransactionIdError);

			await expect(getCheckoutStatus({
				apollo: undefined,
				transactionSagaId: '123',
			})).rejects.toThrow('Apollo instance missing');

			await expect(getCheckoutStatus({
				apollo: mockClient,
				transactionSagaId: undefined,
			})).rejects.toThrow('Missing transactionSagaId');
		});

		it('should return an errors array when the transactionid is unknown', async () => {
			// const operation = jest.fn().mockResolvedValue(true);
			const mockClient = new MockApolloClient<NormalizedCacheObject>(unknownTransactionIdError);

			const statusQuery = await getCheckoutStatus({
				apollo: mockClient,
				transactionSagaId: '123',
			});

			expect(statusQuery?.errors?.length).toBeGreaterThan(0);
			expect(statusQuery?.data).toBe(null);

			expect(mockClient.query).toHaveBeenCalled();
		});
	});

	describe('pollForCheckoutStatus', () => {
		jest.useFakeTimers();
		jest.spyOn(global, 'setTimeout');

		it('should throw an error if apollo or the transaction id does not exist', async () => {
			const mockClient = new MockApolloClient<NormalizedCacheObject>({
				data: {
					checkoutStatus: null,
				},
			});

			await expect(pollForCheckoutStatus({
				apollo: undefined,
				transactionSagaId: '123',
			})).rejects.toThrow('Apollo instance missing');

			await expect(pollForCheckoutStatus({
				apollo: mockClient,
				transactionSagaId: undefined,
			})).rejects.toThrow('Missing transactionSagaId');
		});

		it('should succeed when immediate query is complete', async () => {
			// const operation = jest.fn().mockResolvedValue(true);
			const mockClient = new MockApolloClient<NormalizedCacheObject>(successfulCheckoutStatus);

			const statusQuery = await pollForCheckoutStatus({
				apollo: mockClient,
				transactionSagaId: '123',
			});
			console.log(statusQuery);
			expect(statusQuery).toBe(successfulCheckoutStatus);

			expect(mockClient.query).toHaveBeenCalled();
		});

		it('should retry if the operation initially fails', async () => {
			// const operation = jest.fn()
			// 	.mockResolvedValueOnce(false)
			// 	.mockResolvedValueOnce(true);

			const mockClient = new MockApolloClientSequenced<NormalizedCacheObject>(successfulCheckoutStatus);
			mockClient.query.mockResolvedValueOnce(Promise.resolve(pendingCheckoutStatus)).mockResolvedValue(Promise.resolve(successfulCheckoutStatus));

			await expect(pollForCheckoutStatus({
				apollo: mockClient,
				transactionSagaId: '123',
				interval: 1000,
				timeout: 5000,
			}));
			// .resolves.toBe(successfulCheckoutStatus);
			// expect(setTimeout).toHaveBeenCalledTimes(1);

			expect(mockClient.query).toHaveBeenCalledTimes(2);
		});

		// it('should throw an error if the polling times out', async () => {
		// 	// const operation = jest.fn().mockResolvedValue(false);

		// 	const mockClient = new MockApolloClient<NormalizedCacheObject>(null);
		// 	mockClient.query.mockReturnValueOnce(pendingCheckoutStatus).mockReturnValueOnce(pendingCheckoutStatus).mockReturnValueOnce(pendingCheckoutStatus).mockReturnValue(successfulCheckoutStatus);

		// 	await expect(pollForCheckoutStatus({
		// 		apollo: mockClient,
		// 		transactionSagaId: '123',
		// 		interval: 1000,
		// 		timeout: 2000,
		// 	})).rejects.toThrow('Polling timed out');

		// 	expect(mockClient.query).toHaveBeenCalled();
		// 	expect(mockClient.query).toHaveBeenCalledTimes(3);
		// });
	});
});
