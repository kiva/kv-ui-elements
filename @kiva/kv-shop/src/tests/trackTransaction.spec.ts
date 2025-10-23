import { trackTransactionEvent, trackTransactionMutation } from '../trackTransaction';
import { callShopMutation } from '../shopQueries';
import { getVisitorID } from '../util/visitorId';
import parseSPCookie from '../util/parseSPCookie';

// Mock the dependencies
jest.mock('../shopQueries', () => ({
	callShopMutation: jest.fn(),
}));

jest.mock('../util/visitorId', () => ({
	getVisitorID: jest.fn(),
}));

jest.mock('../util/parseSPCookie', () => ({
	__esModule: true,
	default: jest.fn(),
}));

const mockCallShopMutation = callShopMutation as jest.MockedFunction<typeof callShopMutation>;
const mockGetVisitorID = getVisitorID as jest.MockedFunction<typeof getVisitorID>;
const mockParseSPCookie = parseSPCookie as jest.MockedFunction<typeof parseSPCookie>;

describe('trackTransaction.ts', () => {
	let mockApollo: any;

	beforeEach(() => {
		// Reset all mocks before each test
		jest.clearAllMocks();

		// Mock Apollo client
		mockApollo = {
			mutate: jest.fn(),
			query: jest.fn(),
		};

		// Default mock implementations
		mockGetVisitorID.mockReturnValue('visitor-123');
		mockParseSPCookie.mockReturnValue({
			snowplowUserId: 'sp-user-456',
			snowplowSessionId: 'sp-session-789',
		});
	});

	describe('trackTransactionEvent', () => {
		describe('successful tracking', () => {
			beforeEach(() => {
				mockCallShopMutation.mockResolvedValue({
					shop: {
						id: 'shop-123',
						trackTransaction: true,
					},
				});
			});

			it('should track transaction with all data when Snowplow and visitor ID are available', async () => {
				const result = await trackTransactionEvent({
					apollo: mockApollo,
					transactionId: 123,
				});

				expect(result).toBe(true);
				expect(mockCallShopMutation).toHaveBeenCalledWith(
					mockApollo,
					{
						mutation: trackTransactionMutation,
						variables: {
							campaign: null,
							campaignContent: null,
							medium: null,
							snowplowSessionId: 'sp-session-789',
							snowplowUserId: 'sp-user-456',
							source: null,
							transactionId: 123,
							visitorId: 'visitor-123',
						},
					},
					0,
				);
			});

			it('should track transaction with null visitor ID when not available', async () => {
				mockGetVisitorID.mockReturnValue(undefined);

				const result = await trackTransactionEvent({
					apollo: mockApollo,
					transactionId: 456,
				});

				expect(result).toBe(true);
				expect(mockCallShopMutation).toHaveBeenCalledWith(
					mockApollo,
					expect.objectContaining({
						variables: expect.objectContaining({
							visitorId: null,
						}),
					}),
					0,
				);
			});

			it('should track transaction with null Snowplow data when cookie parsing fails', async () => {
				mockParseSPCookie.mockReturnValue({
					snowplowUserId: null,
					snowplowSessionId: null,
				});

				const result = await trackTransactionEvent({
					apollo: mockApollo,
					transactionId: 789,
				});

				expect(result).toBe(true);
				expect(mockCallShopMutation).toHaveBeenCalledWith(
					mockApollo,
					expect.objectContaining({
						variables: expect.objectContaining({
							snowplowSessionId: null,
							snowplowUserId: null,
						}),
					}),
					0,
				);
			});

			it('should call parseSPCookie and getVisitorID once per call', async () => {
				await trackTransactionEvent({
					apollo: mockApollo,
					transactionId: 999,
				});

				expect(mockParseSPCookie).toHaveBeenCalledTimes(1);
				expect(mockGetVisitorID).toHaveBeenCalledTimes(1);
			});

			it('should handle partial Snowplow data', async () => {
				mockParseSPCookie.mockReturnValue({
					snowplowUserId: 'sp-user-only',
					snowplowSessionId: null,
				});

				const result = await trackTransactionEvent({
					apollo: mockApollo,
					transactionId: 888,
				});

				expect(result).toBe(true);
				expect(mockCallShopMutation).toHaveBeenCalledWith(
					mockApollo,
					expect.objectContaining({
						variables: expect.objectContaining({
							snowplowUserId: 'sp-user-only',
							snowplowSessionId: null,
						}),
					}),
					0,
				);
			});
		});

		describe('error handling', () => {
			it('should return false when transactionId is zero', async () => {
				const result = await trackTransactionEvent({
					apollo: mockApollo,
					transactionId: 0,
				});

				expect(result).toBe(false);
				expect(mockCallShopMutation).not.toHaveBeenCalled();
			});

			it('should return false when transactionId is null', async () => {
				const result = await trackTransactionEvent({
					apollo: mockApollo,
					transactionId: null as any,
				});

				expect(result).toBe(false);
				expect(mockCallShopMutation).not.toHaveBeenCalled();
			});

			it('should return false when transactionId is undefined', async () => {
				const result = await trackTransactionEvent({
					apollo: mockApollo,
					transactionId: undefined as any,
				});

				expect(result).toBe(false);
				expect(mockCallShopMutation).not.toHaveBeenCalled();
			});

			it('should return false when shop mutation returns null', async () => {
				mockCallShopMutation.mockResolvedValue(null);

				const result = await trackTransactionEvent({
					apollo: mockApollo,
					transactionId: 123,
				});

				expect(result).toBe(false);
			});

			it('should return false when shop data is null', async () => {
				mockCallShopMutation.mockResolvedValue({
					shop: null,
				});

				const result = await trackTransactionEvent({
					apollo: mockApollo,
					transactionId: 123,
				});

				expect(result).toBe(false);
			});

			it('should return false when trackTransaction is null', async () => {
				mockCallShopMutation.mockResolvedValue({
					shop: {
						id: 'shop-123',
						trackTransaction: null,
					},
				});

				const result = await trackTransactionEvent({
					apollo: mockApollo,
					transactionId: 123,
				});

				expect(result).toBe(false);
			});

			it('should propagate errors from callShopMutation', async () => {
				const testError = new Error('Network error');
				mockCallShopMutation.mockRejectedValue(testError);

				await expect(trackTransactionEvent({
					apollo: mockApollo,
					transactionId: 123,
				})).rejects.toThrow('Network error');
			});

			it('should handle errors from parseSPCookie gracefully', async () => {
				mockParseSPCookie.mockImplementation(() => {
					throw new Error('Cookie parsing error');
				});

				await expect(trackTransactionEvent({
					apollo: mockApollo,
					transactionId: 123,
				})).rejects.toThrow('Cookie parsing error');
			});

			it('should handle errors from getVisitorID gracefully', async () => {
				mockGetVisitorID.mockImplementation(() => {
					throw new Error('Visitor ID error');
				});

				await expect(trackTransactionEvent({
					apollo: mockApollo,
					transactionId: 123,
				})).rejects.toThrow('Visitor ID error');
			});
		});

		describe('mutation parameters', () => {
			beforeEach(() => {
				mockCallShopMutation.mockResolvedValue({
					shop: {
						id: 'shop-123',
						trackTransaction: true,
					},
				});
			});

			it('should pass correct maxretries parameter', async () => {
				await trackTransactionEvent({
					apollo: mockApollo,
					transactionId: 123,
				});

				expect(mockCallShopMutation).toHaveBeenCalledWith(
					mockApollo,
					expect.any(Object),
					0, // maxretries should be 0
				);
			});

			it('should pass the correct mutation', async () => {
				await trackTransactionEvent({
					apollo: mockApollo,
					transactionId: 123,
				});

				expect(mockCallShopMutation).toHaveBeenCalledWith(
					mockApollo,
					expect.objectContaining({
						mutation: trackTransactionMutation,
					}),
					0,
				);
			});

			it('should set campaign-related fields to null (GA tracking removed)', async () => {
				await trackTransactionEvent({
					apollo: mockApollo,
					transactionId: 123,
				});

				expect(mockCallShopMutation).toHaveBeenCalledWith(
					mockApollo,
					expect.objectContaining({
						variables: expect.objectContaining({
							campaign: null,
							campaignContent: null,
							medium: null,
							source: null,
						}),
					}),
					0,
				);
			});

			it('should pass transactionId as number to mutation', async () => {
				await trackTransactionEvent({
					apollo: mockApollo,
					transactionId: 12345,
				});

				expect(mockCallShopMutation).toHaveBeenCalledWith(
					mockApollo,
					expect.objectContaining({
						variables: expect.objectContaining({
							transactionId: 12345,
						}),
					}),
					0,
				);
			});
		});

		describe('return value processing', () => {
			it('should return true when trackTransaction returns true', async () => {
				mockCallShopMutation.mockResolvedValue({
					shop: {
						id: 'shop-123',
						trackTransaction: true,
					},
				});

				const result = await trackTransactionEvent({
					apollo: mockApollo,
					transactionId: 123,
				});

				expect(result).toBe(true);
			});

			it('should return false when trackTransaction returns false', async () => {
				mockCallShopMutation.mockResolvedValue({
					shop: {
						id: 'shop-123',
						trackTransaction: false,
					},
				});

				const result = await trackTransactionEvent({
					apollo: mockApollo,
					transactionId: 123,
				});

				expect(result).toBe(false);
			});
		});
	});
});
