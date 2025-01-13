<template>
	<div class="tw-flex tw-gap-x-0.5 tw-overflow-x-auto tw-py-2 tw-px-1 hide-scrollbar">
		<KvInlineActivityCard
			v-for="(activity, index) in activities"
			:key="index"
			:activity="activity"
		/>
	</div>
</template>

<script>
import KvInlineActivityCard from '#components/KvInlineActivityCard';

export default {
	name: 'KvInlineActivityFeed',
	components: { KvInlineActivityCard },
	props: {
		/**
         * Activities data array
         */
		activities: {
			type: Array,
			default: () => ([]),
		},
	},
};
</script>

<style scoped lang="postcss">
.hide-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
    @apply tw-hidden;
}
</style>
