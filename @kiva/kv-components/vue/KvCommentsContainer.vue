<template>
	<kv-comments-add
		:user-image-url="userImageUrl"
		:user-display-name="userDisplayName"
	/>
</template>

<script>
import KvCommentsAdd from './KvCommentsAdd.vue';

export default {
	components: {
		KvCommentsAdd,
	},
	props: {
		/**
		 * The full URL for the user image
		 */
		userImageUrl: {
			type: String,
			default: '',
		},
		/**
		 * The name to display for the user
		 */
		userDisplayName: {
			type: String,
			default: '',
		},
	},
};
</script>
