import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import Container, { ADD_REACTION_EVENT } from '../../../../vue/KvCommentsContainer.vue';
import { ADD_COMMENT_ID, ADD_COMMENT_EVENT } from '../../../../vue/KvCommentsAdd.vue';

const renderContainer = (props = {}) => {
	return render(Container, { props });
};

describe('KvCommentsContainer', () => {
	it('should render comments add component', async () => {
		const { container } = renderContainer();
		expect(container.querySelectorAll(`#${ADD_COMMENT_ID}`).length).toBe(1);
	});

	it('should emit comment', async () => {
		const { getByPlaceholderText, getByRole, emitted } = renderContainer();
		const textInput = getByPlaceholderText('Add a comment to this loan...');
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
