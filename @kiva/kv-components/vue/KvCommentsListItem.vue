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
		<div
			v-if="nestLevel < 3"
			class="tw-flex tw-items-center tw-gap-x-2"
		>
			<kv-comments-heart-button
				:is-small="true"
				:is-liked="isLiked"
				@click="onClick(LIKE_COMMENT_EVENT, $event)"
			/>
			<kv-comments-reply-button
				@click="onClick(REPLY_COMMENT_EVENT, $event)"
			/>
		</div>
		<div
			v-if="showInput"
			class="tw-w-full"
		>
			<kv-comments-add
				ref="commentsAddRef"
				user-mention
				@add-comment="onClick(REPLY_COMMENT_EVENT, $event)"
				@hide-input="hideInput"
			/>
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
import { ref, nextTick } from 'vue-demi';
import KvCommentsReplyButton from './KvCommentsReplyButton.vue';
import KvCommentsHeartButton from './KvCommentsHeartButton.vue';
import KvCommentsAdd from './KvCommentsAdd.vue';

export const REPLY_COMMENT_EVENT = 'reply-comment';
export const LIKE_COMMENT_EVENT = 'like-comment';

export default {
	name: 'KvCommentsListItem',
	components: {
		KvCommentsReplyButton,
		KvCommentsHeartButton,
		KvCommentsAdd,
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
		const showInput = ref(false);
		const commentsAddRef = ref(null);

		const onClick = (reaction, value) => {
			if (reaction === REPLY_COMMENT_EVENT) {
				showInput.value = true;
				nextTick(() => {
					commentsAddRef.value.$refs.input.focus();
				});
			}

			if (value) {
				props.handleClick({
					reaction,
					id: props.comment?.id ?? null,
					userId: props.comment?.user_id ?? null,
					isChild: true,
					value,
				});
			}
		};

		const hideInput = () => { showInput.value = false; };

		return {
			hideInput,
			showInput,
			commentsAddRef,
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
