import { gql } from '@apollo/client/core';

// TODO: get (and maybe set) basket and visitor cookies

export interface OneTimeCheckoutOptions {
	apollo: any,
	basketId: string,
	visitorId: string|null|undefined,
}

export async function executeOneTimeCheckout({ apollo }: OneTimeCheckoutOptions) {
	// check that basket is ready

	// check that bt transactions are enabled

	// do pre-checkout validation
	// handle errors

	// if credit required
	// request payment method

	// initiate async checkout (choose mutation based on credit required or not)
	// wait on checkout to complete (separate method for this)
	// handle errors

	// redirect to thanks or just resolve?
}

export interface WaitOnTransactionOptions {
	apollo: any
	transactionId: string
}

export async function waitOnTransaction({ apollo, transactionId }: WaitOnTransactionOptions) {
	// TODO: get visitor ID
	// poll transaction status and resolve when complete
	const result = await apollo.query({
		query: gql`
			query checkoutStatus($transactionId: String!, $visitorId: string) {
				checkoutStatus(transactionId: $transactionId, visitorId: $visitorId) {
					errorCode
					errorMessage
					status
					transactionId
				}
			}
		`,
		variables: {
			transactionId,
		},
	});
}
