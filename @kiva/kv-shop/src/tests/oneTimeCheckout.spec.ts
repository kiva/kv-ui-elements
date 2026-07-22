import { executeOneTimeCheckoutForGivingFund } from '../oneTimeCheckout';
import { addGivingFund, addCustomGivingFund } from '../givingFunds';
import { setTipDonation } from '../basketItems';
import { removeKivaCredit } from '../basketCredits';
import { pollForFinishedCheckout } from '../checkoutStatus';
import { validatePreCheckout } from '../validatePreCheckout';
import { callShopMutation, callShopQuery } from '../shopQueries';
import { getCheckoutTrackingData } from '../receipt';

jest.mock('../givingFunds', () => ({
	addGivingFund: jest.fn(),
	addCustomGivingFund: jest.fn(),
}));
jest.mock('../basketItems', () => ({ setTipDonation: jest.fn() }));
jest.mock('../basketCredits', () => ({ removeKivaCredit: jest.fn() }));
jest.mock('../checkoutStatus', () => ({ pollForFinishedCheckout: jest.fn() }));
jest.mock('../validatePreCheckout', () => ({ validatePreCheckout: jest.fn() }));
jest.mock('../shopQueries', () => ({ callShopMutation: jest.fn(), callShopQuery: jest.fn() }));
jest.mock('../receipt', () => ({ getCheckoutTrackingData: jest.fn() }));
jest.mock('../shopError', () => ({
	ShopError: class ShopError extends Error {},
	parseShopError: jest.fn((e) => e),
}));
jest.mock('@kiva/kv-analytics', () => ({ trackTransaction: jest.fn() }));
jest.mock('../util/poll', () => ({ wait: jest.fn().mockResolvedValue(undefined) }));
jest.mock('../util/visitorId', () => ({ getVisitorID: jest.fn(() => 'visitor-123') }));
jest.mock('../util/redirect', () => ({ redirectTo: jest.fn() }));

describe('oneTimeCheckout.ts', () => {
	describe('executeOneTimeCheckoutForGivingFund', () => {
		const mockedAddGivingFund = addGivingFund as jest.MockedFunction<typeof addGivingFund>;
		const mockedAddCustomGivingFund = addCustomGivingFund as jest.MockedFunction<typeof addCustomGivingFund>;
		const mockedSetTipDonation = setTipDonation as jest.MockedFunction<typeof setTipDonation>;
		const mockedRemoveKivaCredit = removeKivaCredit as jest.MockedFunction<typeof removeKivaCredit>;
		const mockedPoll = pollForFinishedCheckout as jest.MockedFunction<typeof pollForFinishedCheckout>;
		const mockedValidate = validatePreCheckout as jest.MockedFunction<typeof validatePreCheckout>;
		const mockedCallShopMutation = callShopMutation as jest.MockedFunction<typeof callShopMutation>;
		const mockedCallShopQuery = callShopQuery as jest.MockedFunction<typeof callShopQuery>;
		const mockedTracking = getCheckoutTrackingData as jest.MockedFunction<typeof getCheckoutTrackingData>;

		const apollo = {} as any;

		beforeEach(() => {
			jest.clearAllMocks();
			mockedValidate.mockResolvedValue(undefined as any);
			mockedSetTipDonation.mockResolvedValue({} as any);
			mockedRemoveKivaCredit.mockResolvedValue(undefined as any);
			// no kiva credit needed → credit checkout path
			mockedCallShopQuery.mockResolvedValue({
				shop: { basket: { totals: { creditAmountNeeded: '0' } } },
			} as any);
			mockedCallShopMutation.mockResolvedValue({ shop: { transactionId: 'txn-1' } } as any);
			mockedPoll.mockResolvedValue({
				data: { checkoutStatus: { receipt: { checkoutId: 'checkout-1' } } },
				errors: [],
			} as any);
			mockedTracking.mockResolvedValue({} as any);
		});

		it('creates a custom giving fund when savedSearchId is provided', async () => {
			mockedAddCustomGivingFund.mockResolvedValue({ id: 'custom-1' } as any);

			const result = await executeOneTimeCheckoutForGivingFund({
				amount: '25',
				apollo,
				savedSearchId: 'saved-search-1',
				name: 'My Custom Fund',
				userId: '789',
			});

			expect(mockedAddCustomGivingFund).toHaveBeenCalledWith({
				apollo,
				savedSearchId: 'saved-search-1',
				name: 'My Custom Fund',
				userId: '789',
			});
			expect(mockedAddGivingFund).not.toHaveBeenCalled();
			expect(result.data?.givingFund.id).toBe('custom-1');
		});

		it('creates a standard giving fund when fundTarget is provided (unchanged behavior)', async () => {
			mockedAddGivingFund.mockResolvedValue({ id: 'fund-1' } as any);

			const result = await executeOneTimeCheckoutForGivingFund({
				amount: '25',
				apollo,
				fundTarget: 'where-needed-most',
				userId: '789',
			});

			expect(mockedAddGivingFund).toHaveBeenCalledWith({
				apollo,
				fundTarget: 'where-needed-most',
				userId: '789',
			});
			expect(mockedAddCustomGivingFund).not.toHaveBeenCalled();
			expect(result.data?.givingFund.id).toBe('fund-1');
		});
	});
});
