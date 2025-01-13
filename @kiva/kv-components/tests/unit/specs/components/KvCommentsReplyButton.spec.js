import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import KvCommentsReplyButton from '#components/KvCommentsReplyButton';

const CLICK_EVENT = 'click';

describe('KvCommentsReplyButton', () => {
	it('should render defaults', () => {
		const { getByRole } = render(KvCommentsReplyButton);
		const replyButton = getByRole('button', { name: 'Reply' });

		expect(replyButton).toBeDefined();
	});

	it('should emit click event when clicked', async () => {
		const { getByRole, emitted } = render(KvCommentsReplyButton);
		const replyButton = getByRole('button', { name: 'Reply' });

		await userEvent.click(replyButton);

		expect(emitted()[CLICK_EVENT]).toEqual([[]]);
	});
});
