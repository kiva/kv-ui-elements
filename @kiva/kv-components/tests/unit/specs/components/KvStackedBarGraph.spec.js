import { render, fireEvent } from '@testing-library/vue';
import { axe } from 'jest-axe';
import KvStackedBarGraph from '#components/KvStackedBarGraph.vue';

const series = [
	{ key: 'user', label: 'Repaid to your account', color: '#26985D' },
	{ key: 'promo', label: 'Repaid to Kiva or sponsor', color: '#996210' },
];

const points = [
	{ label: 'Jul 2026', segments: [{ seriesKey: 'user', value: 300 }, { seriesKey: 'promo', value: 100 }] },
	{ label: 'Aug 2026', segments: [{ seriesKey: 'user', value: 200 }, { seriesKey: 'promo', value: 50 }] },
];

const usd = (value) => `$${Number(value).toFixed(0)}`;

const renderGraph = (props = {}) => render(KvStackedBarGraph, {
	props: {
		points,
		series,
		formatValue: usd,
		title: 'Estimated repayments by month',
		...props,
	},
});

describe('KvStackedBarGraph', () => {
	it('renders a legend entry for each series', () => {
		const { getByText } = renderGraph();
		expect(getByText('Repaid to your account')).toBeTruthy();
		expect(getByText('Repaid to Kiva or sponsor')).toBeTruthy();
	});

	it('renders one rect per non-zero segment', () => {
		const { container } = renderGraph();
		expect(container.querySelectorAll('rect.kv-stacked-bar-graph__segment')).toHaveLength(4);
	});

	it('scales segment heights to the largest stacked total', () => {
		const { container } = renderGraph();
		const rects = [...container.querySelectorAll('rect.kv-stacked-bar-graph__segment')];
		const heights = rects.map((r) => Number(r.getAttribute('height')));
		expect(Math.max(...heights)).toBeGreaterThan(Math.min(...heights));
	});

	it('renders multiple nice, evenly-spaced y-axis gridlines across the range', () => {
		// Tallest bar total is 400 -> nice step 100 -> ticks 0,100,200,300,400.
		const { container, getByText } = renderGraph();
		const gridlines = container.querySelectorAll('line.kv-stacked-bar-graph__gridline');
		expect(gridlines).toHaveLength(5);
		// Intermediate ticks exist, not just 0 and the max.
		expect(getByText('$0')).toBeTruthy();
		expect(getByText('$200')).toBeTruthy();
		expect(getByText('$300')).toBeTruthy();
	});

	it('exposes the title as a caption and one labelled button hit target per bar', () => {
		const { container, getByText } = renderGraph();
		// Title is surfaced as a visually-hidden caption, not an svg[role=img] label.
		expect(getByText('Estimated repayments by month')).toBeTruthy();
		// Decorative segments are hidden from assistive tech.
		container.querySelectorAll('rect.kv-stacked-bar-graph__segment').forEach((seg) => {
			expect(seg.getAttribute('aria-hidden')).toBe('true');
		});
		// Interaction + label live on one focusable button per bar.
		const hits = [...container.querySelectorAll('rect.kv-stacked-bar-graph__hit')];
		expect(hits).toHaveLength(2);
		hits.forEach((hit) => {
			expect(hit.getAttribute('role')).toBe('button');
			expect(hit.getAttribute('tabindex')).toBe('0');
		});
		const julLabel = hits.map((n) => n.getAttribute('aria-label')).find((l) => l.includes('Jul 2026'));
		expect(julLabel).toContain('Repaid to your account');
		expect(julLabel).toContain('Repaid to Kiva or sponsor');
	});

	it('renders x-axis labels for each period', () => {
		const { getByText } = renderGraph();
		expect(getByText('Jul 2026')).toBeTruthy();
		expect(getByText('Aug 2026')).toBeTruthy();
	});

	it('renders nothing but the figure shell when there are no points', () => {
		const { container } = renderGraph({ points: [] });
		expect(container.querySelectorAll('rect.kv-stacked-bar-graph__segment')).toHaveLength(0);
	});

	it('labels the total above every bar', () => {
		const { container } = renderGraph();
		const totals = [...container.querySelectorAll('.kv-stacked-bar-graph__total-label')]
			.map((node) => node.textContent.trim());
		expect(totals).toEqual(['$400', '$250']);
	});

	it('emits bar-click with the bar index when a bar is activated', async () => {
		const { container, emitted } = renderGraph();
		await fireEvent.click(container.querySelector('rect.kv-stacked-bar-graph__hit'));
		expect(emitted()['bar-click']).toBeTruthy();
		expect(emitted()['bar-click'][0]).toEqual([0]);
	});

	it('emits bar-click with the bar index when a bar is activated by keyboard', async () => {
		const { container, emitted } = renderGraph();
		const hit = container.querySelector('rect.kv-stacked-bar-graph__hit');
		await fireEvent.keyDown(hit, { key: 'Enter' });
		expect(emitted()['bar-click']).toBeTruthy();
		expect(emitted()['bar-click'][0]).toEqual([0]);
	});

	it('falls back to the shared palette when a series omits a color', () => {
		const { container } = renderGraph({
			series: [
				{ key: 'user', label: 'Series A' },
				{ key: 'promo', label: 'Series B' },
			],
		});
		const fills = [...container.querySelectorAll('rect.kv-stacked-bar-graph__segment')]
			.map((r) => r.getAttribute('fill'));
		expect(fills).toContain('#276A43'); // palette index 0
		expect(fills).toContain('#F4B539'); // palette index 1
	});

	it('appends barActionLabel to each bar aria-label when provided, omits it otherwise', () => {
		const { container: withLabel } = renderGraph({ barActionLabel: 'Select to view repayments for this month.' });
		const withHit = withLabel.querySelector('rect.kv-stacked-bar-graph__hit');
		expect(withHit.getAttribute('aria-label')).toContain('Select to view repayments for this month.');

		const { container: without } = renderGraph();
		const withoutHit = without.querySelector('rect.kv-stacked-bar-graph__hit');
		expect(withoutHit.getAttribute('aria-label')).not.toContain('Select to view');
	});

	it('has no automated accessibility violations', async () => {
		const { container } = renderGraph();
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
