<template>
	<div
		class="tw-flex tw-items-center tw-gap-1 tw-py-0.5 tw-px-1 tw-shadow-lg tw-rounded-xs tw-bg-white"
	>
		<KvUserAvatar
			:lender-image-url="lenderImageUrl"
			:lender-name="lenderName"
			is-small
			class="activity-avatar"
		/>
		<p class="tw-text-base tw-whitespace-nowrap">
			<span class="data-hj-suppress">{{ lenderName }}</span> contributed
		</p>
	</div>
</template>

<script lang="ts">
import { computed, toRefs } from 'vue';
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

		return {
			lenderImageUrl,
			lenderName,
		};
	},
};
</script>

<style scoped lang="postcss">
.activity-avatar, .activity-avatar :deep(img), .activity-avatar :deep(div) {
    @apply tw-w-4 tw-h-4;
}
</style>
