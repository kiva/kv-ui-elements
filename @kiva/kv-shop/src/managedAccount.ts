import type { ApolloClient } from '@apollo/client/core';
import { gql } from '@apollo/client/core';
import { callShopQuery } from './shopQueries';

interface ShopPromoCampaignData {
	shop: {
		id: string,
		promoCampaign: {
			promoFund: {
				id: number,
				displayName: string,
				displayDescription: string,
				promoPrice: string,
			},
			promoGroup: {
				id: number,
				type: string,
				teamId: number,
			},
			managedAccount: {
				managementType: string,
				audience: string,
				allowDonations: string,
				sendKivaNewsletter: string,
				id: number,
				isEmployee: boolean,
				formId: string,
				pageId: string,
				loanSearchCriteria: {
					filters: {
						cityState: [string],
						country: [string],
						currencyLossPossible: boolean,
						dafEligible: boolean,
						distributionModel: any | string,
						excludeNonRated: boolean,
						expiringSoon: boolean,
						gender: any | string,
						hasResearchScore: boolean,
						isGroup: boolean,
						lenderFavorite: number,
						loanLimit: number,
						loanTags: [number],
						isMatched: boolean,
						sector: [number],
						status: any | string,
						theme: [string],
					},
					sortBy: any | string | null,
				} | any | null,
			} | any | null,
		} | any | null,
	} | null,
}

export async function getPromoFromBasket(apollo: ApolloClient<any>): Promise<ShopPromoCampaignData|null> {
	const data = await callShopQuery<ShopPromoCampaignData>(apollo, {
		query: gql`
			query promoCampaign($basketId: String, $promoFundId: String) {
				shop (basketId: $basketId) {
					id
					promoCampaign (promoFundId: $promoFundId) {
						promoFund {
							id
							displayName
							displayDescription
							promoPrice
						}
						promoGroup {
							id
							type
							teamId
						}
						managedAccount {
							managementType
							audience
							allowDonations
							sendKivaNewsletter
							id
							isEmployee
							formId
							pageId
							loanSearchCriteria {
								filters {
									cityState
									country
									currencyLossPossible
									dafEligible
									distributionModel
									status
									excludeNonRated
									expiringSoon
									gender
									hasResearchScore
									isGroup
									lenderFavorite
									loanLimit
									isMatched
									sector
									loanTags
									theme
								}
								sortBy
							}
						}
					}
				}
			}
		`,
		fetchPolicy: 'network-only',
	}, 0);
	return data;
}