import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import KvCommentsHeartButton from '#components/KvCommentsHeartButton.vue';

const CLICK_EVENT = 'click';

describe('KvCommentsHeartButton', () => {
	it('should render defaults', () => {
		const { getByRole } = render(KvCommentsHeartButton);
		const likeButton = getByRole('button', { name: 'Like' });

		expect(likeButton).toBeDefined();
	});

	it('should emit true value when clicked as not liked', async () => {
		const { getByRole, emitted } = render(KvCommentsHeartButton);
		const likeButton = getByRole('button', { name: 'Like' });

		await userEvent.click(likeButton);

		expect(emitted()[CLICK_EVENT]).toEqual([[true]]);
	});

	it('should emit false value when clicked as liked', async () => {
		const { getByRole, emitted } = render(KvCommentsHeartButton, { props: { isLiked: true } });
		const likeButton = getByRole('button', { name: 'Like' });

		await userEvent.click(likeButton);

		expect(emitted()[CLICK_EVENT]).toEqual([[false]]);
	});
});
