<template>
	<div>
		<KvCommentsListItem
			v-for="comment in comments.comment"
			:id="comment.id"
			:key="comment.id"
			:nest-level="1"
			:comment="comment"
			:user-image-url="userImageUrl"
			:user-display-name="userDisplayName"
			:user-public-id="userPublicId"
			:is-liked="comment.is_liked"
			class="tw-mb-2"
			@add-reaction="handleReaction"
		/>
	</div>
</template>

<script>

import KvCommentsListItem from './KvCommentsListItem.vue';
import { ADD_REACTION_EVENT } from './KvCommentsContainer.vue';

export default {
	name: 'KvCommentsList',
	components: { KvCommentsListItem },
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
			type: Object,
			default: () => {},
		},
	},
	emits: [ADD_REACTION_EVENT],
	setup(_props, { emit }) {
		const handleReaction = (payload) => {
			emit(ADD_REACTION_EVENT, payload);
		};

		return {
			handleReaction,
		};
	},
};
</script>
