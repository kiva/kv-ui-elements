import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import KvCommentsListItem, { LIKE_COMMENT_EVENT, REPLY_COMMENT_EVENT } from '../../../../vue/KvCommentsListItem.vue';
import activityFeed from '../../../fixtures/mockFeedActivityData';
import { ADD_REACTION_EVENT } from '../../../../vue/KvCommentsContainer.vue';

const comment = activityFeed.results[0].latest_reactions.comment[0];

const renderComment = (props = {}) => {
	return render(KvCommentsListItem, { props });
};

describe('KvCommentsListItem', () => {
	it('should render defaults', () => {
		const { getAllByRole } = renderComment({ comment });
		const replyButton = getAllByRole('button', { name: 'Reply' })[0];
		const likeButton = getAllByRole('button', { name: 'Like' })[0];

		expect(likeButton).toBeDefined();
		expect(replyButton).toBeDefined();
	});

	it('should render comment text', () => {
		const { getByText } = renderComment({ comment });
		getByText(comment.data.text);
	});

	it('should handle like button click', async () => {
		const { getAllByRole, emitted } = renderComment({ comment });
		const likeButton = getAllByRole('button', { name: 'Like' })[0];

		await userEvent.click(likeButton);

		expect(emitted()[ADD_REACTION_EVENT]).toEqual([[{
			id: comment.id,
			isChild: true,
			reaction: LIKE_COMMENT_EVENT,
			value: true,
		}]]);
	});

	it('should handle reply button click', async () => {
		const { getAllByRole, getByRole } = renderComment({ comment });
		const replyButton = getAllByRole('button', { name: 'Reply' })[0];

		await userEvent.click(replyButton);
		getByRole('button', { name: 'Comment' });
	});

	it('should emit reply reaction events', async () => {
		const {
			getAllByRole,
			getByRole,
			getByPlaceholderText,
			emitted,
		} = renderComment({ comment });
		const replyButton = getAllByRole('button', { name: 'Reply' })[0];

		const TEST_OBJ = {
			id: comment.id,
			isChild: true,
		};

		await userEvent.click(replyButton);
		const commentButton = getByRole('button', { name: 'Comment' });

		const textInput = getByPlaceholderText('Add a comment to this loan...');
		const TEST_INPUT = 'test test';

		await userEvent.type(textInput, TEST_INPUT);

		await userEvent.click(commentButton);
		expect(emitted()[ADD_REACTION_EVENT]).toEqual([[{ ...TEST_OBJ, reaction: REPLY_COMMENT_EVENT, value: TEST_INPUT }]]);
	});
});
