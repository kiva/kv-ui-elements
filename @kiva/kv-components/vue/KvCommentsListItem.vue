<template>
	<div>
		<div
			class="tw-flex tw-items-center tw-gap-1"
		>
			<img
				v-if="profileImage"
				class="
					data-hj-suppress
					tw-inline-block
					tw-w-3.5
					tw-h-3.5
					tw-rounded-full
					tw-overflow-hidden
					tw-object-fill
				"
				:src="profileImage"
				alt="picture"
			>
			<p>
				{{ text }}
			</p>
		</div>
		<div class="tw-flex tw-items-center tw-gap-x-0.5">
			<kv-comments-heart-button
				:is-small="true"
				:is-liked="isLiked"
				@click="onClick(LIKE_COMMENT_EVENT, $event)"
			/>
			<kv-button
				variant="ghost"
				class="tw-font-medium"
				@click="onClick(REPLY_COMMENT_EVENT)"
			>
				Reply
			</kv-button>
		</div>
		<div
			v-if="latestChildren"
			class="tw-my-1"
		>
			<p
				v-for="nested_comment in latestChildren"
				:key="nested_comment.id"
				class="tw-ml-3"
			>
				<kv-comments-list-item
					:comment="nested_comment"
					:is-liked="nested_comment.is_liked"
					:nest-level="nestLevel + 1"
					:handle-click="handleClick"
				/>
			</p>
		</div>
	</div>
</template>

<script>
import KvButton from './KvButton.vue';
import KvCommentsHeartButton from './KvCommentsHeartButton.vue';

export const REPLY_COMMENT_EVENT = 'reply-comment';
export const LIKE_COMMENT_EVENT = 'like-comment';

export default {
	name: 'KvCommentsListItem',
	components: {
		KvButton,
		KvCommentsHeartButton,
	},
	props: {
		/**
		 * Activity comment
		 */
		comment: {
			type: Object,
			default: () => ({}),
		},
		/**
		 * The nest level of the comment
		 */
		nestLevel: {
			type: Number,
			default: 0,
		},
		/**
		 * Comment is liked by current user
		 */
		isLiked: {
			type: Boolean,
			default: false,
		},
		/**
		 * The function to call when a reaction is clicked
		 */
		handleClick: {
			type: Function,
			default: () => ({}),
		},
	},
	setup(props) {
		const onClick = (reaction, value) => {
			props.handleClick({
				reaction,
				id: props.comment?.id ?? null,
				userId: props.comment?.user_id ?? null,
				isChild: true,
				value,
			});
		};

		return {
			onClick,
			REPLY_COMMENT_EVENT,
			LIKE_COMMENT_EVENT,
		};
	},
	computed: {
		text() {
			return this.comment?.data?.text ?? '';
		},
		userId() {
			return this.comment?.user_id ?? null;
		},
		latestChildren() {
			return this.comment?.latest_children ?? null;
		},
		profileImage() {
			return this.comment?.user_picture ?? '';
		},
	},
};
</script>
