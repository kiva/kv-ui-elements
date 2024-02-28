import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import KvCommentsListItem, { LIKE_COMMENT_EVENT } from '../../../../vue/KvCommentsListItem.vue';
import activityFeed from '../../../fixtures/mockFeedActivityData';

const comment = activityFeed.results[0].latest_reactions.comment[0];

const renderComment = (props = {}) => {
	return render(KvCommentsListItem, { props });
};

describe('KvCommentsListItem', () => {
	it('should render defaults', () => {
		const { getByRole } = renderComment({ comment });
		getByRole('button', { name: 'Reply' });
		getByRole('button', { name: 'Like' });
	});

	it('should render comment text', () => {
		const { getByText } = renderComment({ comment });
		getByText(comment.data.text);
	});

	it('should handle like button click', async () => {
		const { getByRole, emitted } = renderComment({ comment });
		const likeButton = getByRole('button', { name: 'Like' });

		await userEvent.click(likeButton);

		expect(emitted()[LIKE_COMMENT_EVENT]).toEqual([[{
			id: comment.id,
			isChild: true,
			reaction: LIKE_COMMENT_EVENT,
			userId: comment.user_id,
			value: true,
		}]]);
	});

	it('should handle reply button click', async () => {
		const { getByRole } = renderComment({ comment });
		const replyButton = getByRole('button', { name: 'Reply' });

		await userEvent.click(replyButton);
		getByRole('button', { name: 'Comment' });
	});
});
