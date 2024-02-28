<template>
	<div>
		<KvCommentsListItem
			v-for="comment in comments.comment"
			:id="comment.id"
			:key="comment.id"
			:nest-level="1"
			:comment="comment"
			:is-liked="comment.is_liked"
			@[REPLY_COMMENT_EVENT]="handleClick"
			@[LIKE_COMMENT_EVENT]="handleClick"
		/>
	</div>
</template>

<script>

import KvCommentsListItem, { REPLY_COMMENT_EVENT, LIKE_COMMENT_EVENT } from './KvCommentsListItem.vue';

export default {
	components: { KvCommentsListItem },
	props: {
		/**
		 * Activity comments
		 */
		comments: {
			type: Object,
			default: () => {},
		},
	},
	setup(_props, { emit }) {
		const handleClick = (payload) => {
			emit(payload.reaction, { ...payload });
		};

		return {
			handleClick,
			REPLY_COMMENT_EVENT,
			LIKE_COMMENT_EVENT,
		};
	},
};
</script>
