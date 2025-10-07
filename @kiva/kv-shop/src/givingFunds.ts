import { gql, type ApolloClient } from '@apollo/client/core';
import { getVisitorID } from './util/visitorId';
import { ShopError, parseShopError } from './shopError';

export const addGivingFundMutation = gql`
	mutation AddGivingFund($fund: GivingFundInput!) {
		addGivingFund(fund: $fund) {
			id
		}
	}
`;

export interface AddGivingFundData {
	addGivingFund: {
		id: string,
	} | null,
}

export interface AddGivingFundOptions {
	apollo: ApolloClient<any>,
	userId?: string,
	fundTarget: string,
}

export async function addGivingFund({
	apollo,
	fundTarget,
	userId,
}: AddGivingFundOptions) {
	// call mutation, return AddGivingFundData type
	const result = await apollo.mutate({
		mutation: addGivingFundMutation,
		variables: {
			fund: {
				userId,
				target: fundTarget,
				visitorId: getVisitorID(),
			},
		},
	});
	if (result.errors) {
		const errors = result.errors.map((error) => parseShopError(error));
		// return the first error
		throw errors[0];
	}

	return result.data?.addGivingFund;
}
