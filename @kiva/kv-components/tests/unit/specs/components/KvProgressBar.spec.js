import { render } from '@testing-library/vue';
import KvProgressBar from '#components/KvProgressBar.vue';

describe('KvProgressBar', () => {
	it('renders with a role of "progressbar"', () => {
		const { getByRole } = render(KvProgressBar, { props: { ariaLabel: 'progress-bar', value: 100 } });
		const progressbarEl = getByRole('progressbar');

		expect(progressbarEl).toBeDefined();
	});
});
