import { render } from '@testing-library/vue';
import KvSelect from '../../../../vue/KvSelect.vue';

describe('KvSelect', () => {
	it('renders with a role of "select"', () => {
		const { getByRole } = render(KvSelect, {
			slots: { default: 'Test Select' },
		});
		const selectEl = getByRole('select');

		expect(selectEl).toBeDefined();
	});
});
