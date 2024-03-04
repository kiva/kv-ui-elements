import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import KvCommentsReplyButton from '../../../../vue/KvCommentsReplyButton.vue';

const CLICK_EVENT = 'click';

describe('KvCommentsReplyButton', () => {
	it('should render defaults', () => {
		const { getByRole } = render(KvCommentsReplyButton);
		const replyButton = getByRole('button', { name: 'Reply' });

		expect(replyButton).toBeDefined();
	});

	it('should render number of replies', () => {
		const { getByTestId } = render(KvCommentsReplyButton, { props: { numberOfReplies: 6 } });
		const replyCount = getByTestId('reply-count');

		expect(replyCount).toBeDefined();
		expect(replyCount).toHaveTextContent(6);
	});

	it('should emit click event when clicked', async () => {
		const { getByRole, emitted } = render(KvCommentsReplyButton);
		const replyButton = getByRole('button', { name: 'Reply' });

		await userEvent.click(replyButton);

		expect(emitted()[CLICK_EVENT]).toEqual([[]]);
	});
});
