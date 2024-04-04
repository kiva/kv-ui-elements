<template>
	<div
		class="tw-flex tw-items-center tw-gap-1 tw-py-0.5 tw-px-1 tw-shadow-lg tw-rounded-sm tw-bg-white"
	>
		<KvUserAvatar
			:lender-image-url="lenderImageUrl"
			:lender-name="lenderName"
			is-small
			class="activity-avatar"
		/>
		<p class="tw-text-base tw-whitespace-nowrap">
			<span class="data-hj-suppress">{{ lenderName }}</span> contributed ${{ amountLent }}
		</p>
	</div>
</template>

<script>
import { computed, toRefs } from 'vue-demi';
import KvUserAvatar from './KvUserAvatar.vue';

export default {
	name: 'KvInlineActivityCard',
	components: {
		KvUserAvatar,
	},
	props: {
		/**
         * Activity data object
         */
		activity: {
			type: Object,
			default: () => ({}),
		},
	},
	setup(props) {
		const {
			activity,
		} = toRefs(props);

		const lenderName = computed(() => activity?.value?.lender?.name ?? '');
		const lenderImageUrl = computed(() => activity?.value?.lender?.image?.url ?? '');
		const amountLent = computed(() => {
			const amount = activity?.value?.amountLent ?? 0;
			return parseFloat(amount).toFixed();
		});

		return {
			lenderImageUrl,
			lenderName,
			amountLent,
		};
	},
};
</script>

<style scoped lang="postcss">
.activity-avatar, .activity-avatar >>> img, .activity-avatar >>> div {
    @apply tw-w-4 tw-h-4;
}
</style>
