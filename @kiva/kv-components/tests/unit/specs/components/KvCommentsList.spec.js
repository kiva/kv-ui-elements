import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import ListComponent from '../../../../vue/KvCommentsList.vue';
import activityFeed from '../../../fixtures/mockFeedActivityData';
import { LIKE_COMMENT_EVENT, REPLY_COMMENT_EVENT } from '../../../../vue/KvCommentsListItem.vue';
import { ADD_REACTION_EVENT } from '../../../../vue/KvCommentsContainer.vue';

const renderList = (props = {}) => {
	return render(ListComponent,
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

const comments = activityFeed.results[0].latest_reactions;

describe('KvCommentsList', () => {
	it('should render comments component', async () => {
		const { container } = renderList({ comments });

		const { id } = comments.comment[0];
		expect(container.querySelectorAll(`#${id}`).length).toBe(1);
	});

	it('should emit like reaction events', async () => {
		const { getAllByRole, emitted } = renderList({ comments });
		const likeButton = getAllByRole('button', { name: 'Like' })[0];
		const firstComment = comments.comment[0];

		const TEST_OBJ = {
			id: firstComment.id,
			isChild: true,
		};

		await userEvent.click(likeButton);
		expect(emitted()[ADD_REACTION_EVENT]).toEqual([[{ ...TEST_OBJ, reaction: LIKE_COMMENT_EVENT, value: true }]]);
	});

	it('should emit reply reaction events', async () => {
		const {
			getAllByRole,
			getByRole,
			getByPlaceholderText,
			emitted,
		} = renderList({ comments });
		const replyButton = getAllByRole('button', { name: 'Reply' })[0];
		const firstComment = comments.comment[0];

		const TEST_OBJ = {
			id: firstComment.id,
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
