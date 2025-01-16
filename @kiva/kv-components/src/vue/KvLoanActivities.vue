<template>
	<div
		v-if="combinedActivities.length > 0"
		class="loan-activity"
	>
		<div class="tw-flex tw-justify-center lg:tw-px-0">
			<KvActivityRow
				:activity="singleActivity"
			/>
		</div>
		<div class="tw-flex tw-justify-center tw-mt-1 tw-text-small">
			<span v-if="lendersNumber && amountLent">
				{{ lendersNumber }} lenders lent {{ amountLent }}. &nbsp;
			</span>
			<button
				class="tw-text-action hover:tw-underline"
				@click="showActivityModal"
			>
				See all activity
			</button>
		</div>
		<KvLightbox
			title="Activity Feed Modal"
			:visible="lightboxOpen"
			@lightbox-closed="closeLightbox"
		>
			<template #header>
				<h2 class="tw-text-h3 tw-flex-1 data-hj-suppress">
					{{ modalTitle }}
				</h2>
			</template>
			<div class="tw-overflow-x-hidden tw-px-2 tw-pb-1">
				<div
					v-for="activity in combinedActivities"
					:key="activity.key"
					class="md:tw-px-8 lg:tw-px-14 tw-mt-4"
				>
					<h4 class="tw-text-center tw-text-h4">
						{{ formattedDate(activity.key) }}
					</h4>
					<div class="tw-flex tw-flex-col tw-gap-y-1">
						<KvActivityRow
							v-for="(act, index) in activity.data"
							:key="index"
							:activity="act"
						/>
					</div>
				</div>
			</div>
			<div>
				<p
					v-if="errorMsg"
					class="tw-mt-1 tw-text-small tw-text-danger"
				>
					{{ errorMsg }}
				</p>
				<div class="tw-flex tw-justify-end tw-mt-4 tw-pb-2.5 md:tw-pb-4">
					<KvLendCta
						:loan="loan"
						:is-loading="false"
						:kv-track-function="kvTrackFunction"
						:get-cookie="getCookie"
						:set-cookie="setCookie"
						:user-balance="userBalance"
						:basket-items="basketItems"
						:route="route"
						:is-adding="isAdding"
						:enable-huge-amount="enableHugeAmount"
						:is-visitor="isVisitor"
						:enable-five-dollars-notes="enableFiveDollarsNotes"
						@add-to-basket="$emit('add-to-basket', $event)"
					/>
				</div>
			</div>
		</KvLightbox>
	</div>
</template>

<script>
import { computed, ref, toRefs } from 'vue';
import numeral from 'numeral';
import { format } from 'date-fns';
import KvActivityRow from './KvActivityRow.vue';
import KvLightbox from './KvLightbox.vue';
import KvLendCta from './KvLendCta.vue';

export default {
	name: 'KvLoanActivities',
	components: {
		KvActivityRow,
		KvLightbox,
		KvLendCta,
	},
	props: {
		/**
		 * loan object coming from parent component
		 */
		loan: {
			type: Object,
			default: () => ({}),
		},
		/**
		 * loan combined activities coming from parent component
		 */
		combinedActivities: {
			type: Array,
			default: () => ([]),
		},
		/**
		 * isAdding flag coming from parent add to basket method
		 */
		isAdding: {
			type: Boolean,
			default: false,
		},
		/**
		 * basketItems array coming from parent component
		 */
		basketItems: {
			type: Array,
			default: () => ([]),
		},
		/**
		 * userBalance string coming from parent component
		 */
		userBalance: {
			type: String,
			default: undefined,
		},
		/**
		 * errorMsg string coming from parent add to basket method
		 */
		errorMsg: {
			type: String,
			default: undefined,
		},
		/**
		 * kvTrackFunction function to track events from LendCta component
		 */
		kvTrackFunction: {
			type: Function,
			required: true,
		},
		/**
		 * getCookie function for LendCta component
		 */
		getCookie: {
			type: Function,
			default: undefined,
		},
		/**
		 * setCookie function for LendCta component
		 */
		setCookie: {
			type: Function,
			default: undefined,
		},
		/**
		 * route object for LendCta component
		 */
		route: {
			type: Object,
			default: undefined,
		},
		enableFiveDollarsNotes: {
			type: Boolean,
			default: false,
		},
		enableHugeAmount: {
			type: Boolean,
			default: false,
		},
		isVisitor: {
			type: Boolean,
			default: true,
		},
	},
	emits: [
		'add-to-basket',
	],
	setup(props) {
		const {
			loan,
			combinedActivities,
			kvTrackFunction,
		} = toRefs(props);

		const lightboxOpen = ref(false);

		const modalTitle = computed(() => `Activity for ${loan.value?.name}`);

		const lendersNumber = computed(() => loan.value?.lenders?.totalCount ?? 0);

		const amountLent = computed(() => {
			const amount = loan.value?.loanFundraisingInfo?.fundedAmount ?? 0;
			return numeral(parseFloat(amount)).format('$0,0');
		});

		const singleActivity = computed(() => {
			const singleAct = combinedActivities.value.find((activity) => {
				return activity.data.some((element) => {
					return element.type === 'LendingAction';
				});
			});

			return singleAct?.data[0] ?? {};
		});

		const formattedDate = (date) => {
			const dateObj = new Date(date);
			return format(dateObj, 'MMM d, yyyy');
		};
		const showActivityModal = () => {
			kvTrackFunction.value('loan-card', 'click', 'see-all-activity');
			lightboxOpen.value = true;
		};
		const closeLightbox = () => {
			lightboxOpen.value = false;
		};

		return {
			lightboxOpen,
			modalTitle,
			formattedDate,
			showActivityModal,
			closeLightbox,
			singleActivity,
			lendersNumber,
			amountLent,
		};
	},
};
</script>

<style scoped lang="postcss">
.loan-activity :deep(#kvLightboxBody) {
	@apply tw-flex tw-flex-col tw-px-0 tw-pb-0;
}

.loan-activity :deep(div > div > div > div > div:first-child) {
	box-shadow: var(--kiva-box-shadow);
}

.loan-activity :deep(div > div > div > div > div:first-child > div),
.loan-activity :deep(#kvLightboxBody div) {
	box-shadow: none;
}

.loan-activity :deep(#kvLightboxBody > div:first-child) {
	@apply tw-px-4;
}

.loan-activity :deep([role=dialog]) {
	min-width: 840px;
	max-width: 840px !important;

	@media (max-width: calc(840px + 2rem)) {
		min-width: 100%;
		max-width: 100% !important;
	}
}

.loan-activity :deep(#kvLightboxBody > div:nth-child(2)) {
	@apply tw-px-4;

	box-shadow: var(--kiva-negative-box-shadow);
}
</style>
