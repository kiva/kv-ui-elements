import { gql, type ApolloClient } from '@apollo/client/core';
import { callShopMutation } from './shopQueries';
import { getVisitorID } from './util/visitorId';

import parseSPCookie from './util/parseSPCookie';

export const trackTransactionMutation = gql`
	mutation trackTransaction(
		$campaign: String,
		$campaignContent: String,
		$medium: String,
		$snowplowUserId: String,
		$snowplowSessionId: String,
		$source: String,
		$transactionId: Int!,
		$visitorId: String
	) {
		shop {
			id
			trackTransaction(
				campaign: $campaign
				campaignContent: $campaignContent
				medium: $medium
				snowplowUserId: $snowplowUserId
				snowplowSessionId: $snowplowSessionId
				source: $source
				transactionId: $transactionId
				visitorId: $visitorId
			)
		}
	}
`;

export interface TrackTransactionData {
	shop: {
		id: string,
		trackTransaction: boolean,
	} | null,
}

export interface TrackTransactionOptions {
	apollo: ApolloClient<any>,
	transactionId: string,
}

export async function trackTransactionEvent({
	apollo,
	transactionId,
}: TrackTransactionOptions) {
	if (!transactionId) {
		// exit if missing transaction id
		return false;
	}

	// NOTE: GA tracking removed due to __utmz cookie deprecation

	// get tracking data from snowplow cookie
	const { snowplowUserId, snowplowSessionId } = parseSPCookie();

	const data = await callShopMutation<TrackTransactionData>(apollo, {
		mutation: trackTransactionMutation,
		variables: {
			campaign: null,
			campaignContent: null,
			medium: null,
			snowplowSessionId,
			snowplowUserId,
			source: null,
			transactionId,
			visitorId: getVisitorID() || null,
		},
	}, 0);
	// return whether tracking was successful
	return !!data?.shop?.trackTransaction;
}
