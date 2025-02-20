import { gql, type ApolloClient } from '@apollo/client';
import { poll } from './util/poll';
import { getVisitorID } from './util/visitorId';

export interface GetCheckoutStatusOptions {
	apollo: ApolloClient<any>,
	transactionSagaId: string,
}

export interface CheckoutStatusQueryResult {
	data: {
		checkoutStatus: any
	} | null,
	errors?: any,
}

export async function getCheckoutStatus(
	{ apollo, transactionSagaId }: GetCheckoutStatusOptions,
): Promise<CheckoutStatusQueryResult> {
	return apollo.query({
		query: gql`
			query checkoutStatus($transactionId: String!, $visitorId: String) {
				checkoutStatus(transactionId: $transactionId, visitorId: $visitorId) {
					basketId
					errorCode
					errorMessage
					receipt {
						checkoutId
					}
					requestedAt
					status
					transactionId
					updatedAt
				}
			}
		`,
		variables: {
			transactionId: transactionSagaId,
			visitorId: getVisitorID(),
		},
		fetchPolicy: 'network-only',
	});
}

export interface PollForCheckoutStatusOptions extends GetCheckoutStatusOptions {
	interval?: number,
	timeout?: number,
}

/**
 * Poll the checkoutStatus endpoint until the checkout is complete
 * Note: We only operate on the COMPLETED or results with errors
 *
 * Possible status values:
 * - BASKET_MANIFEST
 * - BASKET_VALID
 * - CHECKOUT_FAILED
 * - CHECKOUT_RECORDED
 * - CHECKOUT_ROLLED_BACK
 * - COMPLETED
 * - CREDIT_ADDED
 * - DEPOSIT_RECORDED
 * - FAILED
 * - MANIFEST_FAILED
 * - RECORD_CHECKOUT_FAILED
 * - REQUEST_RECEIVED
 * - RESERVATIONS_COMPLETED
 * - STARTED
 * - TRANSIENT_PAYMENT_METHOD_CHARGED
 *
 * @param apollo Apollo Client instance
 * @param transactionId
 * @param interval How often to poll
 * @param timeout How long to allow polling to continue
 */
export async function pollForFinishedCheckout({
	apollo,
	transactionSagaId,
	interval = 1000,
	timeout = 60000,
}: PollForCheckoutStatusOptions) {
	return poll<CheckoutStatusQueryResult>(
		// function to poll
		() => getCheckoutStatus({
			apollo,
			transactionSagaId,
		}),
		// function to check for completed status
		(result: CheckoutStatusQueryResult) => {
			// extract fields to check for a completed status or errors
			const { status, errorCode, errorMessage } = result?.data?.checkoutStatus;
			// Check for completed status, or errors and return if present
			if (status === 'COMPLETED' || errorCode || errorMessage) {
				return true;
			}
			return false;
		},
		interval,
		timeout,
	);
}
