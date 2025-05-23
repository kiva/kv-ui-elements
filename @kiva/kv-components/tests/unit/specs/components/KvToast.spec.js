import { render } from '@testing-library/vue';
import { axe } from 'jest-axe';
import KvToast from '#components/KvToast.vue';

describe('KvToast', () => {
	it('has no automated accessibility violations', async () => {
		const { container } = render(KvToast);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
