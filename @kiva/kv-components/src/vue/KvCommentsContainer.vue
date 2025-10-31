<template>
	<div>
		<kv-comments-add
			v-if="userPublicId"
			:user-image-url="userImageUrl"
			:user-display-name="userDisplayName"
			@add-comment="handleReaction"
		/>
		<kv-comments-list
			v-if="comments"
			:user-image-url="userImageUrl"
			:user-display-name="userDisplayName"
			:user-public-id="userPublicId"
			:comments="comments"
			@add-reaction="handleReaction"
		/>
	</div>
</template>

<script lang="ts">
import KvCommentsAdd from './KvCommentsAdd.vue';
import KvCommentsList, { Comment } from './KvCommentsList.vue';

export const ADD_COMMENT_EVENT = 'add-comment';
export const ADD_REACTION_EVENT = 'add-reaction';

export default {
	name: 'KvCommentsContainer',
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
		 * The ID for the user
		 */
		userPublicId: {
			type: String,
			default: '',
		},
		/**
		 * Activity comments
		 */
		comments: {
			type: Array as () => Comment[],
			default: () => ([]),
		},
	},
	emits: [ADD_REACTION_EVENT],
	setup(_props, { emit }) {
		const handleReaction = (reactionPayload) => {
			let payload;
			if (reactionPayload.value === undefined) {
				payload = {
					reaction: ADD_COMMENT_EVENT,
					id: null,
					isChild: false,
					value: reactionPayload,
				};
			} else {
				payload = reactionPayload;
			}
			emit(ADD_REACTION_EVENT, payload);
		};
		return {
			handleReaction,
		};
	},
};
</script>
