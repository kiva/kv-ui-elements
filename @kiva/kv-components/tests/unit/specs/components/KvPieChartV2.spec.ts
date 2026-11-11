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

	it('defaults growDuration to 500ms and staggers segments by it', () => {
		const { container } = render(KvPieChartV2, {
			props: {
				values: defaultValues, loading: false, shownSegments: 6, initialDelay: 0,
			},
		});
		const root = container.querySelector('.kv-pie-chart-v2') as HTMLElement;
		expect(root.style.getPropertyValue('--segment-grow-duration')).toBe('500ms');
		const segments = container.querySelectorAll<SVGElement>('.segment-circle');
		expect(segments[0].style.transitionDelay).toBe('0ms');
		expect(segments[1].style.transitionDelay).toBe('500ms');
	});

	it('growDuration drives the CSS draw duration and the segment stagger together', () => {
		const { container } = render(KvPieChartV2, {
			props: {
				values: defaultValues, loading: false, shownSegments: 6, initialDelay: 0, growDuration: 250,
			},
		});
		const root = container.querySelector('.kv-pie-chart-v2') as HTMLElement;
		expect(root.style.getPropertyValue('--segment-grow-duration')).toBe('250ms');
		const segments = container.querySelectorAll<SVGElement>('.segment-circle');
		expect(segments[1].style.transitionDelay).toBe('250ms');
		expect(segments[2].style.transitionDelay).toBe('500ms');
	});

	describe('listHeader', () => {
		it('renders no header by default', () => {
			const { container } = render(KvPieChartV2, {
				props: { values: defaultValues, loading: false },
			});
			expect(container.querySelector('.legend-header')).toBeNull();
		});

		it('renders the header above the legend', () => {
			const { container, getByText } = render(KvPieChartV2, {
				props: { values: defaultValues, loading: false, listHeader: 'Lent to' },
			});
			const header = getByText('Lent to');
			const firstItem = container.querySelector('.legend-item') as Element;
			// eslint-disable-next-line no-bitwise
			expect(header.compareDocumentPosition(firstItem) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
		});

		it('hides the header while loading', () => {
			const { queryByText } = render(KvPieChartV2, {
				props: { values: defaultValues, loading: true, listHeader: 'Lent to' },
			});
			expect(queryByText('Lent to')).toBeNull();
		});
	});

	describe('layout', () => {
		it('defaults to stacked, with the legend under the chart as pills', () => {
			const { container } = render(KvPieChartV2, {
				props: { values: defaultValues, loading: false },
			});
			const root = container.querySelector('.kv-pie-chart-v2');
			expect(root).toHaveClass('tw-flex-col');
			expect(root).not.toHaveClass('tw-flex-row');
			container.querySelectorAll('.legend-item').forEach((item) => {
				expect(item).toHaveClass('tw-bg-gray-100');
			});
		});

		it('two-column puts the legend beside the chart without pill backgrounds', () => {
			const { container } = render(KvPieChartV2, {
				props: { values: manyValues, loading: false, layout: 'two-column' },
			});
			const root = container.querySelector('.kv-pie-chart-v2');
			expect(root).toHaveClass('tw-flex-row');
			expect(root).not.toHaveClass('tw-flex-col');
			const items = container.querySelectorAll('.legend-item');
			expect(items.length).toBe(6);
			items.forEach((item) => {
				expect(item).not.toHaveClass('tw-bg-gray-100');
			});
		});

		it('right-aligns values in stacked and left-aligns them in two-column', () => {
			const stacked = render(KvPieChartV2, {
				props: { values: defaultValues, loading: false },
			});
			expect(stacked.container.querySelector('.legend-value')).toHaveClass('tw-text-right');
			const twoColumn = render(KvPieChartV2, {
				props: { values: defaultValues, loading: false, layout: 'two-column' },
			});
			expect(twoColumn.container.querySelector('.legend-value')).toHaveClass('tw-text-left');
		});

		it.each([
			['stacked', undefined, '0.5rem'],
			['two-column', undefined, '1.5rem'],
			['stacked', 3, '1.5rem'],
			['two-column', 0, '0rem'],
			['two-column', 2.5, '1.25rem'],
		])('%s layout with listGap %s sets a %s gap between chart and list', (layout, listGap, expected) => {
			const { container } = render(KvPieChartV2, {
				props: {
					values: defaultValues, loading: false, layout, listGap,
				},
			});
			const root = container.querySelector('.kv-pie-chart-v2') as HTMLElement;
			expect(root.style.gap).toBe(expected);
		});

		it('rejects a negative listGap', () => {
			const { validator } = (KvPieChartV2 as any).props.listGap;
			expect(validator(0)).toBe(true);
			expect(validator(-1)).toBe(false);
		});

		it('rejects unknown layouts', () => {
			const { validator } = (KvPieChartV2 as any).props.layout;
			expect(validator('stacked')).toBe(true);
			expect(validator('two-column')).toBe(true);
			expect(validator('grid')).toBe(false);
		});

		it('has no accessibility violations in two-column with header and more link', async () => {
			const { container } = render(KvPieChartV2, {
				props: {
					values: manyValues,
					loading: false,
					layout: 'two-column',
					listHeader: 'Lent to',
					moreLinkLabel: '+{count} more',
				},
			});
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});
	});

	describe('moreLinkLabel', () => {
		it.each(['percent', 'amount', 'count'])('replaces the Other pill with a count link for unit %s', (unit) => {
			const { getByRole, queryByRole } = render(KvPieChartV2, {
				props: {
					values: manyValues, loading: false, unit, moreLinkLabel: '+{count} more',
				},
			});
			const link = getByRole('button', { name: '+3 more' });
			expect(link.textContent?.trim()).toBe('+3 more');
			expect(link).not.toHaveClass('tw-bg-gray-100');
			expect(queryByRole('button', { name: /Other/ })).toBeNull();
		});

		it('replaces every {count} token', () => {
			const { getByRole } = render(KvPieChartV2, {
				props: {
					values: manyValues, loading: false, moreLinkLabel: '{count} more ({count})',
				},
			});
			getByRole('button', { name: '3 more (3)' });
		});

		it('still opens the lightbox', async () => {
			const { getByRole } = render(KvPieChartV2, {
				props: { values: manyValues, loading: false, moreLinkLabel: '+{count} more' },
			});
			await fireEvent.click(getByRole('button', { name: '+3 more' }));
			getByRole('dialog');
		});

		it('is not rendered when nothing overflows', () => {
			const { queryByRole } = render(KvPieChartV2, {
				props: {
					values: defaultValues, loading: false, shownSegments: 6, moreLinkLabel: '+{count} more',
				},
			});
			expect(queryByRole('button')).toBeNull();
		});
	});
});
