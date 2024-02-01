<template>
	<div>
		<kv-comments-add
			:user-image-url="userImageUrl"
			:user-display-name="userDisplayName"
			@add-comment="comment"
		/>
	</div>
</template>

<script>
import KvCommentsAdd from './KvCommentsAdd.vue';

export const ADD_COMMENT_EVENT = 'add-comment';

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
	setup(_props, { emit }) {
		const comment = (commentValue) => {
			emit(ADD_COMMENT_EVENT, commentValue);
		};
		return {
			comment,
		};
	},
};
</script>
