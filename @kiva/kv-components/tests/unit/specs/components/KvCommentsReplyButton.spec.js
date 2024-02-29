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

	it('should emit true value when clicked as not liked', async () => {
		const { getByRole, emitted } = render(KvCommentsReplyButton);
		const likeButton = getByRole('button', { name: 'Reply' });

		await userEvent.click(likeButton);

		expect(emitted()[CLICK_EVENT]).toEqual([[]]);
	});
});
