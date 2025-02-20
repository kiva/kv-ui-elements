import { gql, type ApolloClient } from '@apollo/client';
import { watchShopQuery } from './shopQueries';

export const basketTotalsQuery = gql`query basketTotals($basketId: String) {
	shop (basketId: $basketId) {
		id
		basket {
			id
			totals {
				bonusAppliedTotal
				bonusAvailableTotal
				creditAmountNeeded
				creditAppliedTotal
				creditAvailableTotal
				donationTotal
				itemTotal
				freeTrialAppliedTotal
				freeTrialAvailableTotal
				loanReservationTotal
				kivaCardTotal
				kivaCreditAppliedTotal
				kivaCreditAvailableTotal
				kivaCreditRemaining
				kivaCreditToReapply
				redemptionCodeAppliedTotal
				redemptionCodeAvailableTotal
				universalCodeAppliedTotal
				universalCodeAvailableTotal
			}
		}
	}
}`;

export interface BasketTotalsData {
	shop: {
		id: string,
		basket: {
			id: string,
			totals: {
				bonusAppliedTotal: string,
				bonusAvailableTotal: string,
				creditAmountNeeded: string,
				creditAppliedTotal: string,
				creditAvailableTotal: string,
				donationTotal: string,
				itemTotal: string,
				freeTrialAppliedTotal: string,
				freeTrialAvailableTotal: string,
				loanReservationTotal: string,
				kivaCardTotal: string,
				kivaCreditAppliedTotal: string,
				kivaCreditAvailableTotal: string,
				kivaCreditRemaining: string,
				kivaCreditToReapply: string,
				redemptionCodeAppliedTotal: string,
				redemptionCodeAvailableTotal: string,
				universalCodeAppliedTotal: string,
				universalCodeAvailableTotal: string,
			} | null,
		} | null,
	} | null,
}

export function watchBasketTotals(apollo: ApolloClient<any>) {
	return watchShopQuery<BasketTotalsData>(apollo, {
		query: basketTotalsQuery,
	});
}
