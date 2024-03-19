import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import KvCommentsListItem, { LIKE_COMMENT_EVENT, REPLY_COMMENT_EVENT } from '../../../../vue/KvCommentsListItem.vue';
import activityFeed from '../../../fixtures/mockFeedActivityData';
import { ADD_REACTION_EVENT } from '../../../../vue/KvCommentsContainer.vue';

const comment = activityFeed.results[0].latest_reactions.comment[0];
const LOGGED_IN_USER = 'TEST_USER';

const renderComment = (props = {}) => {
	return render(KvCommentsListItem,
		{
			props,
			// provide function for vue 2 testing
			provide: {
				fetchLenderInfo: () => Promise.resolve({}),
			},
			// provide function for vue 3 testing
			global: {
				provide: {
					fetchLenderInfo: () => Promise.resolve({}),
				},
			},
		});
};

describe('KvCommentsListItem', () => {
	it('should render defaults for guest user', () => {
		const { getAllByRole } = renderComment({ comment });
		const likeButton = getAllByRole('button', { name: 'Like' })[0];

		expect(likeButton).toBeDefined();
	});

	it('should render defaults for logged in user', () => {
		const { getAllByRole } = renderComment({ comment, userPublicId: LOGGED_IN_USER });
		const replyButton = getAllByRole('button', { name: 'Reply' })[0];
		const likeButton = getAllByRole('button', { name: 'Like' })[0];

		expect(likeButton).toBeDefined();
		expect(replyButton).toBeDefined();
	});

	it('should render comment text', () => {
		const { getByText } = renderComment({ comment });
		getByText(comment.data.text);
	});

	it('should not handle like button click for guest user', async () => {
		const { getAllByRole, emitted, getByTestId } = renderComment({ comment });
		const likeButton = getAllByRole('button', { name: 'Like' })[0];
		const likeCount = getByTestId('like-count');

		await userEvent.click(likeButton);

		expect(likeCount).toHaveTextContent(1);
		expect(emitted()[ADD_REACTION_EVENT]).toEqual(undefined);
	});

	it('should handle like button click for logged in user', async () => {
		const { getAllByRole, emitted, getByTestId } = renderComment({ comment, userPublicId: LOGGED_IN_USER });
		const likeButton = getAllByRole('button', { name: 'Like' })[0];
		const likeCount = getByTestId('like-count');

		await userEvent.click(likeButton);

		expect(likeCount).toHaveTextContent(1);
		expect(emitted()[ADD_REACTION_EVENT]).toEqual([[{
			id: comment.id,
			isChild: true,
			reaction: LIKE_COMMENT_EVENT,
			value: true,
		}]]);
	});

	it('should handle reply button click for logged in user', async () => {
		const { getAllByRole, getByRole } = renderComment({ comment, userPublicId: LOGGED_IN_USER });
		const replyButton = getAllByRole('button', { name: 'Reply' })[0];

		await userEvent.click(replyButton);
		getByRole('button', { name: 'Comment' });
	});

	it('should emit reply reaction events for logged in user', async () => {
		const {
			getAllByRole,
			getByRole,
			getByPlaceholderText,
			emitted,
		} = renderComment({ comment, userPublicId: LOGGED_IN_USER });
		const replyButton = getAllByRole('button', { name: 'Reply' })[0];

		const TEST_OBJ = {
			id: comment.id,
			isChild: true,
		};

		await userEvent.click(replyButton);
		const commentButton = getByRole('button', { name: 'Comment' });

		const textInput = getByPlaceholderText('Add a comment...');
		const TEST_INPUT = 'test test';

		await userEvent.type(textInput, TEST_INPUT);

		await userEvent.click(commentButton);
		expect(emitted()[ADD_REACTION_EVENT]).toEqual([[{ ...TEST_OBJ, reaction: REPLY_COMMENT_EVENT, value: TEST_INPUT }]]);
	});
});
