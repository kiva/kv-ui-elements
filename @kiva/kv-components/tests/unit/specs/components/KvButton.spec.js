import { render, fireEvent } from '@testing-library/vue';
import { axe, toHaveNoViolations } from 'jest-axe';
import KvButton from '../../../../vue/KvButton.vue';

expect.extend(toHaveNoViolations);

describe('Default Button', () => {
	it('renders as a button tag', () => {
		const { getByRole } = render(KvButton, {
			slots: { default: 'Test Button' },
		});
		getByRole('button', { name: 'Test Button' });
	});

	it('when passed an href prop, it renders as an anchor tag', () => {
		const { getByRole } = render(KvButton, {
			props: { href: 'https://www.example.com' },
			slots: { default: 'Test Button' },
		});
		getByRole('link', { name: 'Test Button' });
	});

	it('shows a ripple animation when clicked', async () => {
		const { getByText, getByTestId } = render(KvButton, {
			slots: { default: 'Test Button' },
		});
		const btnEl = getByText('Test Button');
		await fireEvent.click(btnEl);
		getByTestId('ripple');
	});

	it('when passed a loading prop, the button is disabled', () => {
		const { getByRole } = render(KvButton, {
			props: { state: 'loading' },
			slots: { default: 'Test Button' },
		});
		const btnEl = getByRole('button', { name: 'Test Button' });
		expect(btnEl.disabled).toBeTruthy();
	});

	it('has no automated accessibility violations', async () => {
		const { container } = render(KvButton, {
			slots: { default: 'Test Button' },
		});
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
