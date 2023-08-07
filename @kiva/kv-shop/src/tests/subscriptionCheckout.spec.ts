import { ApolloClient, ApolloCache, NormalizedCacheObject } from '@apollo/client/core';
import { checkSubscriptionStatus, executeNewSubscriptionCheckout } from '../subscriptionCheckout';

class MockApolloClient<TCacheShape extends NormalizedCacheObject> extends ApolloClient<TCacheShape> {
	constructor(private readonly data) {
		super({ cache: {} as ApolloCache<TCacheShape> });
	}

	query = jest.fn().mockResolvedValue(Promise.resolve({
		data: this.data,
	}));

	mutate = jest.fn().mockResolvedValue(Promise.resolve({
		data: {
			my: {
				createAutoDeposit: {
					id: 1,
				},
			},
		},
	}));
}

const allowedUser = {
	my: {
		id: 1,
		subscriptions: {
			totalCount: 0,
		},
		autoDeposit: {
			id: null,
			isSubscriber: false,
		},
	},
};

describe('subscriptionCheckout.ts', () => {
	it('should throw an error if id does not exist', async () => {
		const mockClient = new MockApolloClient<NormalizedCacheObject>({
			my: {
				id: null,
			},
		});
		await expect(checkSubscriptionStatus(mockClient)).rejects.toThrow('You must be logged in to continue.');
		expect(mockClient.query).toHaveBeenCalled();
	});

	it('should throw an error if user has an existing Monthly Good subscription', async () => {
		const mockClient = new MockApolloClient<NormalizedCacheObject>({
			my: {
				id: 1,
				subscriptions: {
					totalCount: 10,
				},
				autoDeposit: {
					isSubscriber: false,
				},
			},
		});
		await expect(checkSubscriptionStatus(mockClient)).rejects.toThrow('You already have an existing Monthly Good subscription. Changes can be made in your subscription settings.');
	});

	it('should throw an error if user has an Auto Deposit setting', async () => {
		const mockClient = new MockApolloClient<NormalizedCacheObject>({
			my: {
				id: 1,
				subscriptions: {
					totalCount: 0,
				},
				autoDeposit: {
					id: 1234,
					isSubscriber: false,
				},
			},
		});
		await expect(checkSubscriptionStatus(mockClient)).rejects.toThrow('You already have existing Auto Deposit settings. Changes can be made in your subscription settings.');
	});

	it('should return true if the user is allowed to use the Monthly Good subscription checkout', async () => {
		const mockClient = new MockApolloClient<NormalizedCacheObject>(allowedUser);
		await expect(checkSubscriptionStatus(mockClient)).toBeTruthy();
	});

	it('shoud execute new subscription checkout', async () => {
		const creditCardValue: 'CreditCard' | 'DebitCard' = 'CreditCard';
		const yesValue: 'Yes' | 'No' | 'Unknown' = 'Yes';

		const mockClient = new MockApolloClient<NormalizedCacheObject>(allowedUser);
		let amount = '20';
		const dayOfMonth = (new Date()).getDate();
		let donateAmount = '20';
		const paymentMethod = {
			nonce: '12',
			details: {
				bin: 'string',
				cardType: 'type',
				expirationMonth: 'test',
				expirationYear: 'test',
				cardholderName: 'test',
				lastFour: '1234',
				lastTwo: '34',
			},
			type: creditCardValue,
			binData: {
				commercial: 'test',
				countryOfIssuance: 'pe',
				debit: yesValue,
				durbinRegulated: yesValue,
				healthcare: yesValue,
				issuingBank: '1234',
				payroll: yesValue,
				prepaid: yesValue,
				productId: '1234',
			},
			vaulted: undefined,
			deviceData: undefined,
			liabilityShifted: undefined,
			liabilityShiftPossible: undefined,
			threeDSecureInfo: undefined,
		};

		// Error due to amount or donateAmount values are badly formatted
		await expect(executeNewSubscriptionCheckout({
			amount,
			apollo: mockClient,
			dayOfMonth,
			donateAmount,
			paymentMethod,
		})).rejects.toThrow('Please check that the amount is correct and try again.');

		amount = '20.00';
		donateAmount = '20.00';
		const result = await executeNewSubscriptionCheckout({
			amount,
			apollo: mockClient,
			dayOfMonth,
			donateAmount,
			paymentMethod,
		});

		expect(result).toStrictEqual({ id: 1 });
	});
});
