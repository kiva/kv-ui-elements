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

		<kv-button
			variant="ghost"
			class="tw-font-medium"
			@click="onClick(REPLY_COMMENT_EVENT)"
		>
			Reply
		</kv-button>
		<kv-button
			variant="ghost"
			class="tw-font-medium"
			@click="onClick(LIKE_COMMENT_EVENT)"
		>
			Like
		</kv-button>
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
					:nest-level="nestLevel + 1"
					:handle-click="handleClick"
				/>
			</p>
		</div>
	</div>
</template>

<script>
import KvButton from './KvButton.vue';

export const REPLY_COMMENT_EVENT = 'reply-comment';
export const LIKE_COMMENT_EVENT = 'like-comment';

export default {
	name: 'KvCommentsListItem',
	components: { KvButton },
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
		 * The function to call when a reaction is clicked
		 */
		handleClick: {
			type: Function,
			default: () => ({}),
		},
	},
	setup(props) {
		const onClick = (reaction) => {
			props.handleClick({
				reaction,
				id: props.comment?.id ?? null,
				userId: props.comment?.user_id ?? null,
				isChild: true,
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
