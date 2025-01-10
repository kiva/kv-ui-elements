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
import { mdiBookmarkOutline, mdiBookmark } from '@mdi/js';
import KvMaterialIcon from '../KvMaterialIcon';

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
