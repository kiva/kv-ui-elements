import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import ListComponent from '#components/KvCommentsList.vue';
import { LIKE_COMMENT_EVENT, REPLY_COMMENT_EVENT } from '#components/KvCommentsListItem.vue';
import { ADD_REACTION_EVENT } from '#components/KvCommentsContainer.vue';
import { comments } from '../../../fixtures/mockCommentsData';

const LOGGED_IN_USER = 'TEST_USER';

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

describe('KvCommentsList', () => {
	it('should render comments component', async () => {
		const { container } = renderList({ comments });

		const { id } = comments[0];
		expect(container.querySelectorAll(`#${id}`).length).toBe(1);
	});

	it('should not emit like reaction events for guest user', async () => {
		const { getAllByRole, emitted } = renderList({ comments });
		const likeButton = getAllByRole('button', { name: 'Like' })[0];

		await userEvent.click(likeButton);
		expect(emitted()[ADD_REACTION_EVENT]).toEqual(undefined);
	});

	it('should emit like reaction events for logged in user', async () => {
		const { getAllByRole, emitted } = renderList({ comments, userPublicId: LOGGED_IN_USER });
		const likeButton = getAllByRole('button', { name: 'Like' })[0];
		const firstComment = comments[0];

		const TEST_OBJ = {
			id: firstComment.id,
			isChild: true,
		};

		await userEvent.click(likeButton);
		expect(emitted()[ADD_REACTION_EVENT]).toEqual([[{ ...TEST_OBJ, reaction: LIKE_COMMENT_EVENT, value: true }]]);
	});

	it('should emit reply reaction events for logged in user', async () => {
		const {
			getAllByRole,
			getByRole,
			getByPlaceholderText,
			emitted,
		} = renderList({ comments, userPublicId: LOGGED_IN_USER });
		const replyButton = getAllByRole('button', { name: 'Reply' })[0];
		const firstComment = comments[0];

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
