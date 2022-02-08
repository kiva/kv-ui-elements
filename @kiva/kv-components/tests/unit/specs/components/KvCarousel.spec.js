import { render } from '@testing-library/vue';
import { axe, toHaveNoViolations } from 'jest-axe';
import KvCarousel from '../../../../vue/KvCarousel.vue';

expect.extend(toHaveNoViolations);

describe('KvCarousel', () => {
	it('has no automated accessibility violations', async () => {
		const { container } = render(KvCarousel);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
