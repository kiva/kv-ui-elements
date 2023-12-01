/* eslint-disable no-underscore-dangle */
import type { ApolloClient, ApolloQueryResult } from '@apollo/client/core';
import type { TransactionData } from '@kiva/kv-analytics';
import { gql } from '@apollo/client/core';
import getVisitorID from './util/visitorId';

export async function getFTDStatus(apollo: ApolloClient<any>) {
	const result = await apollo.query({
		query: gql`
			query ftdStatus {
				my {
					id
					userAccount {
						id
						isFirstTimeDepositor
					}
				}
			}
		`,
	});
	return result.data?.my?.userAccount?.isFirstTimeDepositor ?? false;
}

interface ReceiptItem {
	id: string,
	price: string,
	__typename: string,
	isTip?: boolean,
	isUserEdited?: boolean,
}

interface ReceiptItemsData {
	shop: {
		id: string,
		receipt: {
			id: string,
			items: {
				totalCount: number,
				values: ReceiptItem[],
			} | null,
		} | null,
	} | null,
}

export async function getReceiptItems(apollo: ApolloClient<any>, checkoutId: string): Promise<ReceiptItem[]> {
	return new Promise((resolve, reject) => {
		const limit = 100;
		let offset = 0;
		const observer = apollo.watchQuery<ReceiptItemsData>({
			query: gql`
				query receiptItems($checkoutId: String, $visitorId: String, $limit: Int, $offset: Int) {
					shop {
						id
						receipt(checkoutId: $checkoutId, visitorId: $visitorId) {
							id
							items(limit: $limit, offset: $offset) {
								totalCount
								values {
									id
									price
									__typename

									... on Donation {
										id
										isTip
										isUserEdited
									}
								}
							}
						}
					}
				}
			`,
			variables: {
				checkoutId,
				visitorId: getVisitorID(),
				limit,
				offset,
			},
		});

		let items: ReceiptItem[] = [];
		const handleResult = async (result: ApolloQueryResult<ReceiptItemsData>) => {
			const total = result.data?.shop?.receipt?.items?.totalCount;
			items = items.concat(result.data?.shop?.receipt?.items?.values);
			if (total > offset + limit) {
				offset += limit;
				const nextResult = await observer.fetchMore({
					variables: {
						offset,
					},
				});
				try {
					handleResult(nextResult);
				} catch (e) {
					reject(e);
				}
			} else {
				resolve(items);
			}
		};

		observer.subscribe({
			next: handleResult,
			error: (error) => {
				reject(error);
			},
		});
	});
}

export async function getReceiptTotals(apollo: ApolloClient<any>, checkoutId: string) {
	const result = await apollo.query({
		query: gql`
			query receiptTotals($checkoutId: Int, $visitorId: String) {
				shop {
					id
					receipt(checkoutId: $checkoutId, visitorId: $visitorId) {
						id
						totals {
							loanReservationTotal
							donationTotal
							kivaCardTotal
							itemTotal
							kivaCreditAppliedTotal
							depositTotals {
								depositTotal
							}
						}
					}
				}
			}
		`,
		variables: {
			checkoutId,
			visitorId: getVisitorID(),
		},
	});
	return result.data?.shop?.receipt?.totals;
}

export async function getCheckoutTrackingData(
	apollo: ApolloClient<any>,
	checkoutId: string,
	paymentType: string,
): Promise<TransactionData> {
	const [isFTD, items, totals] = await Promise.all([
		getFTDStatus(apollo),
		getReceiptItems(apollo, checkoutId),
		getReceiptTotals(apollo, checkoutId),
	]);

	const loans = items.filter((item) => item.__typename === 'LoanReservation');
	const donations = items.filter((item) => item.__typename === 'Donation');
	const kivaCards = items.filter((item) => item.__typename === 'KivaCard');

	return {
		transactionId: checkoutId,
		itemTotal: totals.itemTotal,

		// Loan reservations
		loans,
		loanCount: loans.length,
		loanTotal: totals.loanReservationTotal,

		// Donations
		donations: donations.map(({ id, price, __typename }) => ({ id, price, __typename })),
		donationTotal: totals.donationTotal,
		isTip: donations.every((donation) => donation.isTip),
		isUserEdited: donations.some((donation) => donation.isUserEdited),

		// Kiva Cards
		kivaCards,
		kivaCardCount: kivaCards.length,
		kivaCardTotal: totals.kivaCardTotal,

		// Credit & deposit
		kivaCreditAppliedTotal: totals.kivaCreditAppliedTotal,
		depositTotal: totals.depositTotals?.depositTotal ?? '0.00',
		paymentType,
		isFTD,
	};
}
