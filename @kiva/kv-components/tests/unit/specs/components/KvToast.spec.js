import { render } from '@testing-library/vue';
import { axe, toHaveNoViolations } from 'jest-axe';
import KvToast from '../../../../vue/KvToast.vue';

expect.extend(toHaveNoViolations);

describe('KvToast', () => {
	it('has no automated accessibility violations', async () => {
		const { container } = render(KvToast);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
