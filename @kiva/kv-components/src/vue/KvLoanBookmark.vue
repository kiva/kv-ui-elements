<template>
	<div>
		<button
			style="border-radius: 8px; padding: 3px;"
			class="tw-cursor-pointer tw-font-medium tw-bg-white tw-flex tw-justify-center"
			@click="$emit('toggle-bookmark')"
		>
			<kv-material-icon
				class="tw-w-3"
				:class="{ 'tw-text-black': !isBookmarked, 'tw-text-marigold': isBookmarked }"
				:icon="`${!isBookmarked ? mdiBookmarkOutline : mdiBookmark}`"
			/>
		</button>
	</div>
</template>

<script>
import gql from 'graphql-tag';
import { mdiBookmarkOutline, mdiBookmark } from '@mdi/js';
import KvMaterialIcon from './KvMaterialIcon.vue';

// Only use this fragment for logged-in user queries
export const KV_LOAN_BOOKMARK_FRAGMENT = gql`
	fragment KvLoanBookmark on LoanBasic {
		id
		userProperties {
			favorited
		}
	}
`;

export default {
	name: 'KvLoanBookmark',
	components: {
		KvMaterialIcon,
	},
	props: {
		isBookmarked: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			mdiBookmarkOutline,
			mdiBookmark,
		};
	},
};
</script>
