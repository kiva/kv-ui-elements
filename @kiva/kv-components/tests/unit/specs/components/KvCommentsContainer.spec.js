import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import Container, { ADD_REACTION_EVENT } from '#components/KvCommentsContainer';
import { ADD_COMMENT_ID, ADD_COMMENT_EVENT } from '#components/KvCommentsAdd';

const LOGGED_IN_USER = 'TEST_USER';

const renderContainer = (props = {}) => {
	return render(Container, { props });
};

describe('KvCommentsContainer', () => {
	it('should not render comments add component for guest user', async () => {
		const { container } = renderContainer();
		expect(container.querySelectorAll(`#${ADD_COMMENT_ID}`).length).toBe(0);
	});

	it('should render comments add component for logged in user', async () => {
		const { container } = renderContainer({ userPublicId: LOGGED_IN_USER });
		expect(container.querySelectorAll(`#${ADD_COMMENT_ID}`).length).toBe(1);
	});

	it('should emit comment for logged in user', async () => {
		const { getByPlaceholderText, getByRole, emitted } = renderContainer({ userPublicId: LOGGED_IN_USER });
		const textInput = getByPlaceholderText('Add a comment...');
		const commentButton = getByRole('button', { name: 'Comment' });
		const TEST_INPUT = 'test test';

		await userEvent.type(textInput, TEST_INPUT);

		await userEvent.click(commentButton);

		expect(emitted()[ADD_REACTION_EVENT]).toEqual([[{
			id: null,
			isChild: false,
			reaction: ADD_COMMENT_EVENT,
			value: TEST_INPUT,
		}]]);
	});
});
