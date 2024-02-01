import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import ListComponent from '../../../../vue/KvCommentsList.vue';
import activityFeed from '../../../fixtures/mockFeedActivityData';
import { LIKE_COMMENT_EVENT, REPLY_COMMENT_EVENT } from '../../../../vue/KvCommentsListItem.vue';

const renderList = (props = {}) => {
	return render(ListComponent, { props });
};

const comments = activityFeed.results[0].latest_reactions;

describe('KvCommentsList', () => {
	it('should render comments component', async () => {
		const { container } = renderList({ comments });

		const { id } = comments.comment[0];
		expect(container.querySelectorAll(`#${id}`).length).toBe(1);
	});

	it('should emit comment events', async () => {
		const { getAllByRole, emitted } = renderList({ comments });
		const replyButton = getAllByRole('button', { name: 'Reply' })[0];
		const likeButton = getAllByRole('button', { name: 'Like' })[0];
		const firstComment = comments.comment[0];

		const TEST_OBJ = {
			userId: firstComment.user_id,
			id: firstComment.id,
			isChild: true,
		};

		await userEvent.click(replyButton);
		expect(emitted()[REPLY_COMMENT_EVENT]).toEqual([[{ ...TEST_OBJ, reaction: REPLY_COMMENT_EVENT }]]);

		await userEvent.click(likeButton);
		expect(emitted()[LIKE_COMMENT_EVENT]).toEqual([[{ ...TEST_OBJ, reaction: LIKE_COMMENT_EVENT }]]);
	});
});
