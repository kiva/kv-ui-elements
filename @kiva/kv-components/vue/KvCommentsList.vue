<template>
	<div>
		<KvCommentsListItem
			v-for="comment in comments.comment"
			:id="comment.id"
			:key="comment.id"
			:nest-level="1"
			:comment="comment"
			:handle-click="handleClick"
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
	methods: {
		handleClick(payload) {
			if ([REPLY_COMMENT_EVENT, LIKE_COMMENT_EVENT].includes(payload.reaction)) {
				this.$emit(payload.reaction, { ...payload });
			}
		},
	},
};
</script>
