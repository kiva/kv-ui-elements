import { render } from '@testing-library/vue';
import KvLoanProgressGroup from '../../../../vue/KvLoanProgressGroup';

describe('KvLoanProgressGroup', () => {
	it('should display default message', () => {
		const { getByText } = render(KvLoanProgressGroup);

		getByText('funded!');
	});

	it('should display amount left', () => {
		const { getByText } = render(KvLoanProgressGroup, {
			props: {
				moneyLeft: '12.34',
			},
		});

		getByText('$12.34 to go!');
	});

	it('should use orange color with low amount', () => {
		const { container } = render(KvLoanProgressGroup, {
			props: {
				moneyLeft: '12.34',
			},
		});

		expect(container.getElementsByClassName('progress-group-amount-low').length).toBe(1);
	});

	it('should not use orange color with not low amount', () => {
		const { container } = render(KvLoanProgressGroup, {
			props: {
				moneyLeft: '500',
			},
		});

		expect(container.getElementsByClassName('progress-group-amount-low').length).toBe(0);
	});

	it('should pass percentage to progress bar', () => {
		const { container } = render(KvLoanProgressGroup, {
			props: {
				progressPercent: 0.5,
			},
		});

		expect(container.querySelector('[role="progressbar"]').getAttribute('aria-valuenow')).toBe('50');
	});
});
