import { render } from '@testing-library/vue';
import KvProgressBar from '../../../../vue/KvProgressBar.vue';

describe('KvProgressBar', () => {
	it('renders with a role of "progressbar"', () => {
		const { getByRole } = render(KvProgressBar);
		const progressbarEl = getByRole('progressbar');

		expect(progressbarEl).toBeDefined();
	});
});
