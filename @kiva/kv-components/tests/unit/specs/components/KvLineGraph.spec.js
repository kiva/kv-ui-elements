import { render } from '@testing-library/vue';
import { axe } from 'jest-axe';
import KvLineGraph from '../../../../vue/KvLineGraph';

describe('KvLineGraph', () => {
	const points = [
		{ value: 10 },
		{ value: 20 },
		{ value: 50 },
		{ value: 60 },
		{ value: 80 },
	];

	const pointsWithLabels = [
		{ value: 10, label: '2014' },
		{ value: 20, label: '2015' },
		{ value: 50, label: '2016' },
		{ value: 60, label: '2017' },
		{ value: 80, label: '2018' },
	];

	it('should render chart with points', () => {
		const { container } = render(KvLineGraph, { props: { points } });
		const pointElements = container.querySelectorAll('span');

		expect(pointElements.length).toBe(points.length);
	});

	it('should render chart with value labels', () => {
		const { container } = render(KvLineGraph, { props: { points: pointsWithLabels } });
		const pointElements = container.querySelectorAll('span');

		expect(pointElements.length).toBe(points.length * 2);
	});

	it('should render chart with x-axis label', () => {
		const { container } = render(KvLineGraph, { props: { points, axisLabel: 'People supported over time' } });
		const label = container.querySelectorAll('h4');

		expect(label.length).toBe(1);
	});

	it('should render chart with value labels and x-axis label', () => {
		const { container } = render(KvLineGraph, { props: { points: pointsWithLabels, axisLabel: 'People supported over time' } });
		const pointElements = container.querySelectorAll('span');
		const label = container.querySelectorAll('h4');

		expect(pointElements.length).toBe(points.length * 2);
		expect(label.length).toBe(1);
	});

	it('should have no automated accessibility violations', async () => {
		const { container } = render(KvLineGraph, { props: { points } });
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
