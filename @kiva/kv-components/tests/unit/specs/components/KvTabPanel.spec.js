import { render } from '@testing-library/vue';
import { axe } from 'jest-axe';
import KvTabPanel from '../../../../vue/KvTabPanel.vue';

describe('KvTabPanel', () => {
	it('has no automated accessibility violations', async () => {
		const { container } = render(KvTabPanel);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
