import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import KvLightbox from '#components/KvLightbox.vue';

describe('KvLightbox', () => {
	it('has no automated accessibility violations', async () => {
		const { container } = render(KvLightbox,
			{
				props: { title: 'Lightbox Title' },
			});
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it('fire close emit once', async () => {
		const { emitted } = render(KvLightbox,
			{
				props: { title: 'Lightbox Title', visible: true },
			});

		const button = screen.getByRole('button');
		await userEvent.click(button);
		expect(emitted()).toHaveProperty('lightbox-closed');
		expect(emitted).toBeTruthy();
		expect(emitted.length).toBe(1); // Ensures it fired only once
	});
});
