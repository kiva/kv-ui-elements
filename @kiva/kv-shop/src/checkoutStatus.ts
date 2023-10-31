import { gql } from '@apollo/client/core';

export interface GetCheckoutStatusOptions {
	apollo: any | null | undefined
	transactionSagaId: string | null | undefined,
	visitorId?: string | null | undefined,
}

export interface CheckoutStatusQueryResult {
	data: {
		checkoutStatus: any
	} | null,
	errors?: any,
}

export async function getCheckoutStatus(
	{ apollo, transactionSagaId, visitorId }: GetCheckoutStatusOptions,
): Promise<CheckoutStatusQueryResult> {
	if (!apollo) {
		throw new Error('Apollo instance missing');
	}

	if (!transactionSagaId) {
		throw new Error('Missing transactionSagaId');
	}

	// const result = await apollo.query({
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
			visitorId,
		},
	});
	// return result;
}

export interface pollForCheckoutStatusOptions {
	apollo: any | null | undefined,
	transactionSagaId: string | null | undefined,
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
 * @param {Object} apollo Apollo Client instance
 * @param {Number} transactionId
 * @param {Number} interval How often to poll
 * @param {Number} timeout How long to allow polling to continue
 * @returns {Promise}
 */
export async function pollForCheckoutStatus({
	apollo = null,
	transactionSagaId = null,
	interval = 1000,
	timeout = 60000,
}: pollForCheckoutStatusOptions): Promise<CheckoutStatusQueryResult> {
	if (!apollo) {
		throw new Error('Apollo instance missing');
	}

	if (!transactionSagaId) {
		throw new Error('Missing transactionSagaId');
	}

	// establish endtime based on timeout
	const endTime = Date.now() + timeout;

	const checkStatus = async () => {
		console.log('time', Date.now(), endTime);
		console.log('polling for checkout status');
		// check for timeout
		if (Date.now() > endTime) {
			// 'Polling timed out'
			throw new Error('Polling timed out');
			Promise.reject(new Error('Polling timed out'));
		}
		// query checkoutStatus
		const result = await getCheckoutStatus({
			apollo,
			transactionSagaId,
		});
		console.log(result);
		// extract fields to check for a completed status or errors
		const { status, errorCode, errorMessage } = result?.data?.checkoutStatus;
		console.log(status, errorCode, errorMessage);
		// Check for completed status, or errors and return if present
		if (status === 'COMPLETED' || errorCode || errorMessage) {
			console.log('COMPLETED');
			return result;
		// eslint-disable-next-line no-else-return
		} else {
			console.log('checking again');
			checkStatus();
		}
		// Check again
		// console.log('checking again');
		// console.log(typeof checkStatus, checkStatus, interval);
		// setTimeout(() => checkStatus, interval);
		// return null;
	};

	return checkStatus();
}
