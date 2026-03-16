import { addGivingFund, addGivingFundMutation } from '../givingFunds';
import { getVisitorID } from '../util/visitorId';
import { parseShopError } from '../shopError';

jest.mock('../util/visitorId', () => ({
	getVisitorID: jest.fn(),
}));

jest.mock('../shopError', () => ({
	parseShopError: jest.fn(),
}));

describe('givingFunds.ts', () => {
	describe('addGivingFund', () => {
		const mockedGetVisitorID = getVisitorID as jest.MockedFunction<typeof getVisitorID>;
		const mockedParseShopError = parseShopError as jest.MockedFunction<typeof parseShopError>;

		beforeEach(() => {
			jest.clearAllMocks();
			mockedGetVisitorID.mockReturnValue('visitor-123');
		});

		it('should call mutation and return addGivingFund data', async () => {
			const apollo = {
				mutate: jest.fn().mockResolvedValue({
					data: {
						addGivingFund: {
							id: 'fund-1',
						},
					},
				}),
			};

			const result = await addGivingFund({
				apollo: apollo as any,
				userId: 'user-123',
				fundTarget: 'where-needed-most',
			});

			expect(apollo.mutate).toHaveBeenCalledWith({
				mutation: addGivingFundMutation,
				variables: {
					fund: {
						userId: 'user-123',
						target: 'where-needed-most',
						visitorId: 'visitor-123',
					},
				},
			});
			expect(result).toStrictEqual({ id: 'fund-1' });
		});

		it('should include organizationId only when populated', async () => {
			const apollo = {
				mutate: jest.fn().mockResolvedValue({
					data: {
						addGivingFund: {
							id: 'fund-2',
						},
					},
				}),
			};

			await addGivingFund({
				apollo: apollo as any,
				userId: 'user-456',
				organizationId: 'org-123',
				fundTarget: 'women-entrepreneurs',
			});

			expect(apollo.mutate).toHaveBeenCalledWith({
				mutation: addGivingFundMutation,
				variables: {
					fund: {
						userId: 'user-456',
						organizationId: 'org-123',
						target: 'women-entrepreneurs',
						visitorId: 'visitor-123',
					},
				},
			});
		});

		it('should parse and throw the first error when mutation returns errors', async () => {
			const apolloError1 = { message: 'first error' };
			const apolloError2 = { message: 'second error' };
			const parsedError1 = new Error('parsed first');
			const parsedError2 = new Error('parsed second');
			const apollo = {
				mutate: jest.fn().mockResolvedValue({
					errors: [apolloError1, apolloError2],
				}),
			};

			mockedParseShopError
				.mockReturnValueOnce(parsedError1 as any)
				.mockReturnValueOnce(parsedError2 as any);

			await expect(addGivingFund({
				apollo: apollo as any,
				fundTarget: 'education',
			})).rejects.toBe(parsedError1);

			expect(mockedParseShopError).toHaveBeenCalledTimes(2);
			expect(mockedParseShopError).toHaveBeenNthCalledWith(1, apolloError1);
			expect(mockedParseShopError).toHaveBeenNthCalledWith(2, apolloError2);
		});
	});
});
