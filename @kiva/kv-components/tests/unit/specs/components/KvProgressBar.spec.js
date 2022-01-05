import { render } from '@testing-library/vue';
import { toHaveNoViolations } from 'jest-axe';
import KvProgressBar from '../../../../vue/KvProgressBar.vue';

expect.extend(toHaveNoViolations);

describe('KvProgressBar', () => {
	it('renders with a role of "progressbar"', () => {
		const { getByRole } = render(KvProgressBar, {
			slots: { default: 'Test Progress Bar' },
		});
		const progressbarEl = getByRole('progressbar');

		expect(progressbarEl).toBeDefined();
	});
});
