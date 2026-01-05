<template>
	<div>
		<KvCommentsListItem
			v-for="comment in comments"
			:id="comment.id"
			:key="comment.id"
			:comment="comment"
			:user-image-url="userImageUrl"
			:user-display-name="userDisplayName"
			:user-public-id="userPublicId"
			:is-liked="comment.is_liked"
			class="tw-mb-2 tw-not-prose"
			@add-reaction="handleReaction"
		/>
	</div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import KvCommentsListItem from './KvCommentsListItem.vue';

export interface Comment {
	id: string | number;
	// eslint-disable-next-line camelcase
	is_liked: boolean;
	[key: string]: any;
}

const ADD_REACTION_EVENT = 'add-reaction';

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
			type: Array as PropType<Comment[]>,
			default: () => ([]),
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
