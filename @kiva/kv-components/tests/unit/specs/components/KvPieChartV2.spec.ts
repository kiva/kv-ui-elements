import { render, fireEvent } from '@testing-library/vue';
import { axe } from 'jest-axe';
import KvPieChartV2 from '#components/KvPieChartV2.vue';

const defaultValues = [
	{ label: 'Agriculture', value: 28 },
	{ label: 'Eco-friendly', value: 28 },
	{ label: 'Services', value: 17 },
	{ label: 'Water', value: 13 },
	{ label: 'Food', value: 12 },
	{ label: 'Other Category', value: 5 },
];

const manyValues = [
	{ label: 'Food', value: 575 },
	{ label: 'Retail', value: 377 },
	{ label: 'Agriculture', value: 285 },
	{ label: 'Services', value: 211 },
	{ label: 'Clothing', value: 183 },
	{ label: 'Arts', value: 65 },
	{ label: 'Housing', value: 65 },
	{ label: 'Education', value: 36 },
];

describe('KvPieChartV2', () => {
	it('should have no automated accessibility violations', async () => {
		const { container } = render(KvPieChartV2, {
			props: { values: defaultValues, loading: false },
		});
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it('renders the correct number of segment circles for given data', () => {
		const { container } = render(KvPieChartV2, {
			props: { values: defaultValues, loading: false, shownSegments: 6 },
		});
		const segments = container.querySelectorAll('.segment-circle');
		// 6 items, shownSegments=6 -> 6 segments, no Other
		expect(segments.length).toBe(6);
	});

	it('uses default shownSegments of 5, collapsing the 6th item into Other', () => {
		const { container, getByRole } = render(KvPieChartV2, {
			props: { values: defaultValues, loading: false },
		});
		const segments = container.querySelectorAll('.segment-circle');
		// 6 items, default shownSegments=5 -> 5 visible + 1 Other = 6 circles
		expect(segments.length).toBe(6);
		getByRole('button', { name: /Other/i });
	});

	it('shows animated gray-200 skeleton ring when loading is true', () => {
		const { container } = render(KvPieChartV2, {
			props: { values: [], loading: true, strokeWidth: 88 },
		});
		const skeletonRing = container.querySelector('.skeleton-ring');
		expect(skeletonRing).toBeTruthy();
		expect(skeletonRing?.getAttribute('stroke')).toBe('#E0E0E0');
		expect(skeletonRing?.getAttribute('stroke-width')).toBe('88');
		expect(skeletonRing?.classList.contains('skeleton-ring--loading')).toBe(true);
		expect(skeletonRing?.classList.contains('tw-opacity-0')).toBe(false);
	});

	it('does not show legend when loading', () => {
		const { queryByText } = render(KvPieChartV2, {
			props: { values: defaultValues, loading: true },
		});
		expect(queryByText('Agriculture')).toBeNull();
	});

	it('respects shownSegments prop and collapses excess into Other', () => {
		const { container, getByRole } = render(KvPieChartV2, {
			props: { values: manyValues, loading: false, shownSegments: 4 },
		});
		// 4 visible segments + 1 "Other" segment = 5 circles
		const segments = container.querySelectorAll('.segment-circle');
		expect(segments.length).toBe(5);
		// "Other" pill button should be present
		getByRole('button', { name: /Other/i });
	});

	it('displays percent unit formatting in lightbox items', async () => {
		const { getByRole, getAllByRole } = render(KvPieChartV2, {
			props: {
				values: [
					{ label: 'A', value: 80 },
					{ label: 'B', value: 20 },
					{ label: 'C', value: 10 },
				],
				loading: false,
				shownSegments: 1,
				unit: 'percent',
			},
		});
		// Click "Other" pill button to open lightbox with static (non-animated) values
		const otherButton = getByRole('button', { name: /Other/i });
		await fireEvent.click(otherButton);
		// Multiple dialog roles may exist (lightbox + nested); pick the one with content
		const dialogs = getAllByRole('dialog');
		const allText = dialogs.map((d) => d.textContent).join('');
		// Lightbox items use formatItemValue which is not animated
		expect(allText).toContain('18%'); // 20/110 ≈ 18%
	});

	it('displays amount unit with dollar prefix in lightbox items', async () => {
		const { getByRole, getAllByRole } = render(KvPieChartV2, {
			props: {
				values: [
					{ label: 'A', value: 1000 },
					{ label: 'B', value: 500 },
				],
				loading: false,
				shownSegments: 1,
				unit: 'amount',
			},
		});
		const otherButton = getByRole('button', { name: /Other/i });
		await fireEvent.click(otherButton);
		const allText = getAllByRole('dialog').map((d) => d.textContent).join('');
		expect(allText).toContain('$500');
	});

	it('displays count unit as raw number in lightbox items', async () => {
		const { getByRole, getAllByRole } = render(KvPieChartV2, {
			props: {
				values: [
					{ label: 'A', value: 80 },
					{ label: 'B', value: 42 },
				],
				loading: false,
				shownSegments: 1,
				unit: 'count',
			},
		});
		const otherButton = getByRole('button', { name: /Other/i });
		await fireEvent.click(otherButton);
		const allText = getAllByRole('dialog').map((d) => d.textContent).join('');
		expect(allText).toContain('42');
	});

	it('applies custom colors when provided', () => {
		const { container } = render(KvPieChartV2, {
			props: {
				values: [{ label: 'Custom', value: 100, color: '#FF0000' }],
				loading: false,
			},
		});
		const segment = container.querySelector('.segment-circle');
		expect(segment?.getAttribute('stroke')).toBe('#FF0000');
	});

	it('shows Other pill when data exceeds shownSegments', () => {
		const { getByRole } = render(KvPieChartV2, {
			props: { values: manyValues, loading: false, shownSegments: 4 },
		});
		const otherButton = getByRole('button', { name: /Other/i });
		expect(otherButton).toBeTruthy();
	});

	it('opens lightbox when Other pill is clicked', async () => {
		const { getByRole } = render(KvPieChartV2, {
			props: { values: manyValues, loading: false, shownSegments: 4 },
		});
		const otherButton = getByRole('button', { name: /Other/i });
		await fireEvent.click(otherButton);
		// Lightbox should have role="dialog"
		getByRole('dialog');
	});

	it('renders no segments when values is empty', () => {
		const { container } = render(KvPieChartV2, {
			props: { values: [], loading: false },
		});
		const segments = container.querySelectorAll('.segment-circle');
		expect(segments.length).toBe(0);
	});
});
