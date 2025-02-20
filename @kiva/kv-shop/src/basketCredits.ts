import { gql, type ApolloClient, type MutationOptions } from '@apollo/client';
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

export interface ApplyPromoCreditData {
	shop: {
		id: string,
		addCreditByType: boolean,
	} | null,
}

export async function applyPromoCredit(
	apollo: ApolloClient<any>,
	options: MutationOptions<any>,
): Promise<any> {
	if (!options?.variables?.creditType || !options?.variables?.redemptionCode) {
		return Promise.resolve({
			errors:
			[
				{
					message: 'Missing required parameter.',
					extensions: { code: 'upc.missing_parameter' },
				},
			],
		});
	}
	const data = await callShopMutation<ApplyPromoCreditData>(apollo, {
		awaitRefetchQueries: true,
		fetchPolicy: options?.fetchPolicy ?? 'network-only',
		mutation: gql`mutation applyPromoCredit(
			$basketId: String,
			$creditType: CreditTypeEnum!,
			$redemptionCode: String
		) {
			shop (basketId: $basketId) {
				id
				addCreditByType(creditType: $creditType, redemptionCode: $redemptionCode)
			}
		}`,
		variables: { ...options?.variables },
	});

	return data;
}

export interface RemovePromoCreditData {
	shop: {
		id: string,
		removeCreditByType: boolean,
	} | null,
}

export async function removePromoCredit(
	apollo: ApolloClient<any>,
	options: MutationOptions<any>,
): Promise<boolean> {
	if (!options?.variables?.creditType && !options?.variables?.redemptionCode) {
		return Promise.resolve(false);
	}
	const data = await callShopMutation<RemovePromoCreditData>(apollo, {
		awaitRefetchQueries: true,
		fetchPolicy: options?.fetchPolicy ?? 'network-only',
		mutation: gql`mutation removePromoCredit(
			$basketId: String,
			$creditType: CreditTypeEnum!,
			$redemptionCode: String
		) {
			shop (basketId: $basketId) {
				id
				removeCreditByType(creditType: $creditType, redemptionCode: $redemptionCode)
			}
		}`,
		variables: { ...options?.variables },
	});

	return !!data?.shop?.removeCreditByType;
}
