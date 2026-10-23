import {
	ApolloClient, ApolloLink, InMemoryCache, Observable, gql,
} from '@apollo/client/core';
import { getCheckoutTrackingData } from '../receipt';

jest.mock('../util/visitorId', () => ({ getVisitorID: jest.fn(() => 'visitor-123') }));

// What the API returns for a guest's `my`, given the apps' errorPolicy: 'all'
const guestLookup = {
	data: { my: null },
	errors: [{ message: 'You must be authenticated', extensions: { code: 'api.authenticationRequired' } }],
};

function mockApollo({ ftdLookup, depositTotal }: { ftdLookup: () => Promise<any>, depositTotal: string }) {
	return {
		query: jest.fn(({ query }) => {
			const operation = query.definitions[0].name.value;
			if (operation === 'ftdStatus') {
				return ftdLookup();
			}
			return Promise.resolve({
				data: { shop: { receipt: { totals: { depositTotals: { depositTotal } } } } },
			});
		}),
		watchQuery: jest.fn(() => ({
			subscribe: ({ next }) => next({
				data: { shop: { receipt: { items: { totalCount: 0, values: [] } } } },
			}),
		})),
	} as any;
}

describe('getCheckoutTrackingData FTD status', () => {
	afterEach(() => {
		document.cookie = 'kvu_db=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
	});

	it('uses the account FTD status for a logged-in user', async () => {
		const apollo = mockApollo({
			ftdLookup: () => Promise.resolve({ data: { my: { id: 1, userAccount: { id: 1, isFirstTimeDepositor: false } } } }),
			depositTotal: '5.00',
		});
		const data = await getCheckoutTrackingData(apollo, '123', 'card');
		expect(data.isFTD).toBe(false);
	});

	it('applies the guest rule when the lookup says the user is not authenticated', async () => {
		const apollo = mockApollo({ ftdLookup: () => Promise.resolve(guestLookup), depositTotal: '5.00' });
		const data = await getCheckoutTrackingData(apollo, '123', 'card');
		expect(data.isFTD).toBe(true);
	});

	it('reads the deposited-before cookie for a guest', async () => {
		document.cookie = 'kvu_db=true';
		const apollo = mockApollo({ ftdLookup: () => Promise.resolve(guestLookup), depositTotal: '5.00' });
		const data = await getCheckoutTrackingData(apollo, '123', 'card');
		expect(data.isFTD).toBeUndefined();
	});

	it('leaves FTD unknown when the lookup fails for a logged-in user', async () => {
		const apollo = mockApollo({
			ftdLookup: () => Promise.resolve({
				data: { my: null },
				errors: [{ message: 'Internal error', extensions: { code: 'api.error' } }],
			}),
			depositTotal: '5.00',
		});
		const data = await getCheckoutTrackingData(apollo, '123', 'card');
		expect(data.isFTD).toBeUndefined();
	});

	// A real client and cache, answering each operation the way the API answers a guest
	function guestApolloClient(defaultErrorPolicy: 'none' | 'all') {
		const requests: string[] = [];
		const responses = {
			hostPage: guestLookup,
			ftdStatus: guestLookup,
			receiptTotals: {
				data: {
					shop: {
						id: 'shop',
						receipt: {
							id: 'receipt',
							totals: {
								loanReservationTotal: '25.00',
								donationTotal: '0.00',
								kivaCardTotal: '0.00',
								itemTotal: '25.00',
								kivaCreditAppliedTotal: '0.00',
								depositTotals: { depositTotal: '5.00' },
							},
						},
					},
				},
			},
			receiptItems: {
				data: {
					shop: {
						id: 'shop',
						receipt: { id: 'receipt', items: { totalCount: 0, values: [] } },
					},
				},
			},
		};
		const apollo = new ApolloClient({
			cache: new InMemoryCache({ addTypename: false }),
			link: new ApolloLink((operation) => {
				requests.push(operation.operationName);
				return Observable.of(responses[operation.operationName]);
			}),
			defaultOptions: {
				query: { errorPolicy: defaultErrorPolicy },
				watchQuery: { errorPolicy: defaultErrorPolicy },
			},
		});
		return { apollo, requests };
	}

	it('sees a guest\'s authentication error even when the client throws errors by default', async () => {
		const { apollo } = guestApolloClient('none');
		const data = await getCheckoutTrackingData(apollo, '123', 'card');
		expect(data.isFTD).toBe(true);
	});

	// Host pages query `my` before checkout, which caches a guest's `my` as null without the error
	it('sees a guest\'s authentication error when the page already cached their `my`', async () => {
		const { apollo, requests } = guestApolloClient('all');
		await apollo.query({ query: gql`query hostPage { my { id } }` });

		const data = await getCheckoutTrackingData(apollo, '123', 'card');

		expect(requests.filter((name) => name === 'ftdStatus')).toHaveLength(1);
		expect(data.isFTD).toBe(true);
	});

	it('still returns tracking data when the lookup throws', async () => {
		const apollo = mockApollo({ ftdLookup: () => Promise.reject(new Error('Network error')), depositTotal: '5.00' });
		const data = await getCheckoutTrackingData(apollo, '123', 'card');
		expect(data.isFTD).toBeUndefined();
	});
});
