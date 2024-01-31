<template>
	<div>
		<kv-comments-add
			:user-image-url="userImageUrl"
			:user-display-name="userDisplayName"
			@add-comment="comment"
		/>
		<kv-comments-list
			v-if="comments"
			:comments="comments"
			@[REPLY_COMMENT_EVENT]="comment"
			@[LIKE_COMMENT_EVENT]="comment"
		/>
	</div>
</template>

<script>
import KvCommentsAdd from './KvCommentsAdd.vue';
import KvCommentsList from './KvCommentsList.vue';
import { REPLY_COMMENT_EVENT, LIKE_COMMENT_EVENT } from './KvCommentsListItem.vue';

export const ADD_COMMENT_EVENT = 'add-comment';

export default {
	components: {
		KvCommentsAdd,
		KvCommentsList,
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
		/**
		 * Activity comments
		 */
		comments: {
			type: Object,
			default: () => {},
		},
	},
	setup(_props, { emit }) {
		const comment = (commentValue) => {
			emit(ADD_COMMENT_EVENT, commentValue);
			emit(REPLY_COMMENT_EVENT, commentValue);
			emit(LIKE_COMMENT_EVENT, commentValue);
		};

		return {
			comment,

			REPLY_COMMENT_EVENT,
			LIKE_COMMENT_EVENT,
		};
	},
};
</script>
