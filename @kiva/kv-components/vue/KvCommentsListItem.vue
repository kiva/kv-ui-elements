<template>
	<div>
		<div>
			<div class="tw-flex tw-items-center tw-gap-1">
				<kv-user-avatar
					:lender-name="authorName"
					:lender-image-url="authorImage"
					is-small
				/>
				<p
					v-if="authorName"
					class="data-hj-suppress tw-font-medium"
				>
					{{ authorName }}
				</p>
			</div>
			<p>
				{{ commentText }}
			</p>
		</div>
		<div
			v-if="nestLevel < 3"
			class="tw-flex tw-items-center tw-gap-x-1"
		>
			<div class="tw-flex tw-items-center tw-gap-0.5">
				<kv-comments-heart-button
					:is-small="true"
					:is-liked="isLiked"
					:disabled="!userPublicId"
					@click="addReaction(LIKE_COMMENT_EVENT, $event)"
				/>
				<p
					v-if="numberOfLikes"
					data-testid="like-count"
					class="tw-font-medium"
				>
					{{ numberOfLikes }}
				</p>
			</div>
			<kv-comments-reply-button
				v-if="userPublicId"
				@click="replyClick"
			/>
		</div>
		<div
			v-if="showInput"
			class="tw-w-full"
		>
			<kv-comments-add
				ref="commentsAddRef"
				:user-image-url="userImageUrl"
				:user-display-name="userDisplayName"
				:is-reply="true"
				class="tw-ml-3"
				@add-comment="addReaction(REPLY_COMMENT_EVENT, $event)"
				@hide-input="hideInput"
			/>
		</div>
		<div
			v-if="childComments"
			class="tw-my-1"
		>
			<button
				v-if="numberOfReplies"
				class="tw-ml-3 tw-text-action tw-font-medium tw-mb-1 tw-flex tw-items-center"
				@click="toggleReplies"
			>
				<kv-material-icon
					class="tw-h-2.5 tw-w-2.5 tw-transition tw-transform tw-duration-500 tw-ease"
					:class="{ 'tw-rotate-180' : repliesOpened }"
					:icon="mdiChevronDown"
				/>
				{{ numberOfReplies }} {{ numberOfReplies > 1 ? 'replies' : 'reply' }}
			</button>
			<div v-if="repliesOpened">
				<div
					v-for="nested_comment in childComments"
					:key="nested_comment.id"
					class="tw-ml-3"
				>
					<kv-comments-list-item
						:user-image-url="userImageUrl"
						:user-display-name="userDisplayName"
						:user-public-id="userPublicId"
						:comment="nested_comment"
						:nest-level="nestLevel + 1"
						@add-reaction="$emit(ADD_REACTION_EVENT, $event);"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mdiChevronDown } from '@mdi/js';
import {
	ref,
	nextTick,
	computed,
	toRefs,
	onMounted,
	inject,
} from 'vue-demi';
import KvMaterialIcon from './KvMaterialIcon.vue';
import KvCommentsReplyButton from './KvCommentsReplyButton.vue';
import KvCommentsHeartButton from './KvCommentsHeartButton.vue';
import KvCommentsAdd from './KvCommentsAdd.vue';
import KvUserAvatar from './KvUserAvatar.vue';

export const REPLY_COMMENT_EVENT = 'reply-comment';
export const LIKE_COMMENT_EVENT = 'like-comment';
const ADD_REACTION_EVENT = 'add-reaction';

export default {
	name: 'KvCommentsListItem',
	components: {
		KvCommentsReplyButton,
		KvCommentsHeartButton,
		KvCommentsAdd,
		KvUserAvatar,
		KvMaterialIcon,
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
	},
	emits: [
		ADD_REACTION_EVENT,
	],
	setup(props, { emit }) {
		const {
			comment,
			userPublicId,
		} = toRefs(props);

		const showInput = ref(false);
		const commentsAddRef = ref(null);
		const authorInfo = ref();
		const repliesOpened = ref(false);

		const commentText = computed(() => comment?.value?.text ?? '');

		const authorId = computed(() => comment?.value?.user?.publicLenderId ?? '');
		const authorImage = computed(() => authorInfo?.value?.image?.url ?? '');
		const authorName = computed(() => authorInfo?.value?.name ?? '');

		const childComments = computed(() => comment?.value?.latest_children?.comment ?? null);
		const childLikes = computed(() => comment?.value?.latest_children?.like ?? []);
		const likedObject = computed(() => childLikes.value.find((child) => child?.user?.data?.publicLenderId === userPublicId.value)); // eslint-disable-line max-len
		const isLiked = computed(() => likedObject.value !== undefined);

		const replyClick = () => {
			showInput.value = !showInput.value;
			nextTick(() => {
				if (showInput.value) commentsAddRef.value.$refs.input.focus();
			});
		};

		const addReaction = (reaction, value) => {
			const payload = {
				reaction,
				id: comment?.value?.id ?? null,
				isChild: true,
				value,
			};
			if (reaction === LIKE_COMMENT_EVENT && !value) {
				payload.id = likedObject.value.id;
			}

			emit(ADD_REACTION_EVENT, payload);
		};

		const hideInput = () => { showInput.value = false; };

		const numberOfLikes = computed(() => comment?.value?.children_counts?.like ?? 0);

		const numberOfReplies = computed(() => comment?.value?.children_counts?.comment ?? 0);

		const toggleReplies = () => { repliesOpened.value = !repliesOpened.value; };

		// The fetchLenderInfo method must be provided in the parent component
		const fetchLenderInfo = inject('fetchLenderInfo');

		onMounted(async () => {
			if (authorId.value) {
				const authorData = await fetchLenderInfo(authorId.value);
				authorInfo.value = authorData;
			}
		});

		return {
			hideInput,
			showInput,
			commentsAddRef,
			replyClick,
			addReaction,
			REPLY_COMMENT_EVENT,
			LIKE_COMMENT_EVENT,
			ADD_REACTION_EVENT,
			commentText,
			authorImage,
			authorName,
			childComments,
			isLiked,
			numberOfLikes,
			numberOfReplies,
			repliesOpened,
			toggleReplies,
			mdiChevronDown,
		};
	},
};
</script>
