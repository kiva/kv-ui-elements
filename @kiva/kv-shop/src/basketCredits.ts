import type { ApolloClient } from '@apollo/client/core';
import { gql } from '@apollo/client/core';
import { callShopMutation } from './shopQueries';

export interface ApplyKivaCreditData {
	shop: {
		id: string,
		addCreditByType: boolean,
	} | null,
}

export async function applyKivaCredit(apollo: ApolloClient<any>): Promise<boolean> {
	const data = await callShopMutation<ApplyKivaCreditData>(apollo, {
		awaitRefetchQueries: true,
		mutation: gql`mutation applyKivaCredit($basketId: String) {
			shop (basketId: $basketId) {
				id
				addCreditByType(creditType: kiva_credit)
			}
		}`,
	});

	return !!data?.shop?.addCreditByType;
}

export interface RemoveKivaCreditData {
	shop: {
		id: string,
		removeCreditByType: boolean,
	} | null,
}

export async function removeKivaCredit(apollo: ApolloClient<any>): Promise<boolean> {
	const data = await callShopMutation<RemoveKivaCreditData>(apollo, {
		awaitRefetchQueries: true,
		mutation: gql`mutation removeKivaCredit($basketId: String) {
			shop (basketId: $basketId) {
				id
				removeCreditByType(creditType: kiva_credit)
			}
		}`,
	});

	return !!data?.shop?.removeCreditByType;
}
