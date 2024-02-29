<template>
	<div class="tw-flex tw-flex-col">
		<div class="tw-flex tw-flex-col md:tw-flex-row md:tw-items-center tw-gap-0.5 md:tw-gap-1">
			<div class="tw-flex tw-items-center tw-gap-1">
				<img
					v-if="userImageUrl"
					:src="userImageUrl"
					alt="Lender"
					class="
						data-hj-suppress
						tw-inline-block
						tw-w-3.5
						tw-h-3.5
						tw-rounded-full
						tw-overflow-hidden
						tw-object-fill
					"
				>
				<div class="data-hj-suppress tw-font-medium">
					{{ userDisplayName }}
				</div>
			</div>
			<kv-text-input
				:id="ADD_COMMENT_ID"
				ref="input"
				v-model="addCommentValue"
				placeholder="Add a comment to this loan..."
				class="data-hj-suppress tw-grow"
			/>
		</div>
		<div class="tw-flex tw-py-0.5 tw-gap-0.5">
			<kv-button
				variant="ghost"
				class="tw-ml-auto"
				@click="cancel"
			>
				Cancel
			</kv-button>
			<kv-button
				variant="ghost"
				:state="commentButtonState"
				@click="comment"
			>
				Comment
			</kv-button>
		</div>
	</div>
</template>

<script>
import { computed, ref } from 'vue-demi';
import KvButton from './KvButton.vue';
import KvTextInput from './KvTextInput.vue';

export const ADD_COMMENT_ID = 'add-comment-value';
export const ADD_COMMENT_EVENT = 'add-comment';
export const HIDE_INPUT_EVENT = 'hide-input';

export default {
	components: {
		KvButton,
		KvTextInput,
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
		 * Whether or not the comment is a reply
		 */
		isReply: {
			type: Boolean,
			default: false,
		},
	},
	emits: [ADD_COMMENT_EVENT, HIDE_INPUT_EVENT],
	setup(props, { emit }) {
		const addCommentValue = ref('');
		const input = ref(null);

		const commentButtonState = computed(() => (addCommentValue.value ? '' : 'disabled'));

		const cancel = () => {
			addCommentValue.value = '';
			if (props.isReply) {
				emit(HIDE_INPUT_EVENT);
			}
		};

		const comment = () => {
			emit(ADD_COMMENT_EVENT, addCommentValue.value);
			addCommentValue.value = '';
			if (props.isReply) {
				emit(HIDE_INPUT_EVENT);
			}
		};

		const focus = () => input.value.focus();

		return {
			ADD_COMMENT_ID,
			addCommentValue,
			commentButtonState,
			cancel,
			comment,
			focus,
		};
	},
};
</script>

<style lang="postcss" scoped>
>>> input {
	@apply tw-border-t-0 tw-border-r-0 tw-border-l-0 tw-rounded-none tw-p-0 tw-h-4;
}

>>> input:focus {
	@apply tw-border-tertiary;
	box-shadow: none;
}

>>> button > span {
	@apply tw-min-h-0;
}

>>> button > span > span {
	@apply tw-py-0 tw-px-0.5;
}
</style>
