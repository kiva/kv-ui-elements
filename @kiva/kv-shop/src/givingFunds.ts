import { gql, type ApolloClient } from '@apollo/client/core';
import { getVisitorID } from './util/visitorId';
import { parseShopError } from './shopError';

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
	organizationId?: string,
	fundTarget: string,
}

export async function addGivingFund({
	apollo,
	fundTarget,
	userId,
	organizationId,
}: AddGivingFundOptions) {
	const fund = {
		userId,
		target: fundTarget,
		visitorId: getVisitorID(),
		...(organizationId ? { organizationId } : {}),
	};

	// call mutation, return AddGivingFundData type
	const result = await apollo.mutate({
		mutation: addGivingFundMutation,
		variables: {
			fund,
		},
	});
	if (result.errors) {
		const errors = result.errors.map((error) => parseShopError(error));
		// return the first error
		throw errors[0];
	}

	return result.data?.addGivingFund;
}
