<template>
	<div
		v-if="!!variation"
		class="tw-text-small tw-font-medium tw-pt-0.5"
		:class="{ 'tw-line-clamp-1': !isMultipleMatch }"
		style="color: #CE4A00;"
	>
		<template v-if="isMultipleMatch">
			{{ totalMatchRatio }}x match by&#160;<span
				:id="`matching-orgs-${loan.id}`"
				class="tw-underline tw-decoration-dotted tw-cursor-pointer"
			>{{ multiMatchingOrgs.length }} organizations</span>
			<kv-tooltip
				:controller="`matching-orgs-${loan.id}`"
				max-width="320px"
			>
				<p class="tw-whitespace-nowrap tw-pb-0.5">
					Your contribution is matched by {{ multiMatchingOrgs.length }} partners
				</p>
				<hr class="tw-border-caution-highlight tw-py-0.5">
				<p
					v-for="org in multiMatchingOrgs"
					:key="org.managedAccountId"
					class="tw-m-0"
				>
					{{ org.ratio }}:1 matching by {{ orgDisplayName(org) }}
				</p>
			</kv-tooltip>
		</template>
		<template v-else>
			{{ tagText }}
			<kv-countdown-timer
				v-if="variation === 'ending-soon'"
				:deadline="deadline"
			/>
		</template>
	</div>
</template>

<script lang="ts">
import { parseISO } from 'date-fns';
import gql from 'graphql-tag';
import { getLoanTagVariation, LOAN_TAG_VARIATION as VARIATION } from '../utils/loanTag';
import KvCountdownTimer from './KvCountdownTimer.vue';
import KvTooltip from './KvTooltip.vue';

export const KV_LOAN_TAG_FRAGMENT = gql`
	fragment KvLoanTag on LoanBasic {
		id
		loanFundraisingInfo {
			id
			fundedAmount
			reservedAmount
		}
		loanAmount
		matchRatio
		matchingText
		simultaneousMatching {
			managedAccountId
			displayName
			ratio
		}
		plannedExpirationDate
		... on LoanPartner {
			partnerName
		}
	}
`;

export default {
	name: 'KvLoanTag',
	components: {
		KvCountdownTimer,
		KvTooltip,
	},
	props: {
		loan: {
			type: Object,
			required: true,
		},
		enableMultiMatching: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		deadline() {
			return parseISO(this.loan?.plannedExpirationDate);
		},
		multiMatchingOrgs() {
			return this.loan?.simultaneousMatching ?? [];
		},
		isMultipleMatch() {
			return this.enableMultiMatching && this.multiMatchingOrgs.length > 1;
		},
		totalMatchRatio() {
			// Base match of 1x plus each organization's individual match ratio.
			// e.g. 3 orgs each with ratio 1 => 1 + (1 + 1 + 1) = 4x
			return this.multiMatchingOrgs.reduce((sum, org) => sum + org.ratio, 1);
		},
		variation() {
			return getLoanTagVariation(this.loan, this.enableMultiMatching);
		},
		tagText() {
			switch (this.variation) {
				case VARIATION.lseLoan: return 'High community impact';
				case VARIATION.almostFunded: return 'Almost funded';
				case VARIATION.matchedLoan: {
					if (this.enableMultiMatching && this.multiMatchingOrgs.length === 1) {
						const org = this.multiMatchingOrgs[0];
						return `${org.ratio + 1}x matching by ${this.orgDisplayName(org)}`;
					}
					return `${this.matchRatio + 1}x matching by ${this.loan?.matchingText}`;
				}
				default: return 'Ending soon: ';
			}
		},
		matchRatio() {
			return this.loan?.matchRatio;
		},
	},
	methods: {
		orgDisplayName(org: { displayName?: string | null }) {
			return org.displayName && org.displayName !== 'Anonymous' ? org.displayName : 'a Kiva supporter';
		},
	},
};
</script>
