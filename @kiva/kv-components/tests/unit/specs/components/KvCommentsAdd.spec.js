import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import CommentsAdd, { ADD_COMMENT_EVENT } from '../../../../vue/KvCommentsAdd.vue';

const renderCommentsAdd = (props = {}) => {
	return render(CommentsAdd, { props });
};

describe('KvCommentsAdd', () => {
	it('should render defaults', () => {
		const { getByPlaceholderText, getByRole } = renderCommentsAdd();
		getByPlaceholderText('Add a comment to this loan...');
		getByRole('button', { name: 'Cancel' });
		getByRole('button', { name: 'Comment' });
	});

	it('should render user info', () => {
		const { getByAltText, getByText } = renderCommentsAdd({
			userImageUrl: 'test.com',
			userDisplayName: 'User',
		});
		getByAltText('Lender');
		getByText('User');
	});

	it('should enable comment button when text entered', async () => {
		const { getByPlaceholderText, getByRole } = renderCommentsAdd();
		const textInput = getByPlaceholderText('Add a comment to this loan...');
		const commentButton = getByRole('button', { name: 'Comment' });

		expect(commentButton.disabled).toBeTruthy();

		await userEvent.type(textInput, 'test');

		expect(commentButton.disabled).toBeFalsy();

		await userEvent.clear(textInput);

		expect(commentButton.disabled).toBeTruthy();
	});

	it('should clear text when cancel clicked', async () => {
		const { getByPlaceholderText, getByRole } = renderCommentsAdd();
		const textInput = getByPlaceholderText('Add a comment to this loan...');
		const cancelButton = getByRole('button', { name: 'Cancel' });

		await userEvent.type(textInput, 'test');
		await userEvent.click(cancelButton);

		expect(textInput.value).toBe('');
	});

	it('should emit value when comment clicked', async () => {
		const { getByPlaceholderText, getByRole, emitted } = renderCommentsAdd();
		const textInput = getByPlaceholderText('Add a comment to this loan...');
		const commentButton = getByRole('button', { name: 'Comment' });
		const TEST_INPUT = 'test test';

		await userEvent.type(textInput, TEST_INPUT);

		await userEvent.click(commentButton);

		expect(emitted()[ADD_COMMENT_EVENT]).toEqual([[TEST_INPUT]]);
	});

	it('should not emit empty value when comment clicked', async () => {
		const { getByRole, emitted } = renderCommentsAdd();
		const commentButton = getByRole('button', { name: 'Comment' });

		await userEvent.click(commentButton);

		expect(emitted()[ADD_COMMENT_EVENT]).toBe(undefined);
	});
});
