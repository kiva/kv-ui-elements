import { render } from '@testing-library/vue';
import { axe, toHaveNoViolations } from 'jest-axe';
import KvLightbox from '../../../../vue/KvLightbox.vue';

expect.extend(toHaveNoViolations);

describe('KvLightbox', () => {
	it('has no automated accessibility violations', async () => {
		const { container } = render(KvLightbox,
			{
				props: { title: 'Lightbox Title' },
			});
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
