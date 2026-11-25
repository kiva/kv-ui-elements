import { render, waitFor } from '@testing-library/vue';
import KvMap from '#components/KvMap.vue';
import mockLenderCountries from '../../../fixtures/mockLenderCountries';

const COUNTRIES = mockLenderCountries.filter(({ isoCode }) => ['MX', 'KE'].includes(isoCode));
const MEXICO = COUNTRIES.find(({ isoCode }) => isoCode === 'MX');

const MAP_RECT = {
	left: 0, right: 357, top: 0, bottom: 300,
};

const createFakeLayer = (feature) => {
	const handlers = {};
	const element = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	return {
		feature,
		handlers,
		element,
		on: jest.fn((events) => Object.assign(handlers, events)),
		bindTooltip: jest.fn(),
		setStyle: jest.fn(),
		bringToFront: jest.fn(),
		getElement: () => element,
	};
};

const installLeafletMock = () => {
	const layers = new Map();
	const circles = [];
	const panes = {};
	const mapHandlers = {};
	const container = document.createElement('div');
	container.getBoundingClientRect = () => MAP_RECT;
	window.L = {
		map: jest.fn(() => ({
			on: jest.fn((event, handler) => { mapHandlers[event] = handler; }),
			getContainer: () => container,
			createPane: jest.fn((name) => {
				panes[name] = { style: {} };
				return panes[name];
			}),
			remove: jest.fn(),
			off: jest.fn(),
		})),
		tileLayer: jest.fn(() => ({ addTo: jest.fn() })),
		geoJson: jest.fn((data, options) => {
			data.features.forEach((feature) => {
				const layer = createFakeLayer(feature);
				options.onEachFeature(feature, layer);
				layers.set(feature.properties.iso_a2, layer);
			});
			return {
				addTo() { return this; },
				eachLayer: (fn) => layers.forEach(fn),
			};
		}),
		circle: jest.fn((latLng, options) => {
			const handlers = {};
			const circle = {
				latLng,
				options,
				handlers,
				addTo() { return this; },
				bindTooltip: jest.fn(),
				on: jest.fn((event, handler) => { handlers[event] = handler; }),
			};
			circles.push(circle);
			return circle;
		}),
		point: (x, y) => ({ x, y }),
		DomUtil: {
			getPosition: (element) => element.position,
			setPosition: jest.fn((element, position) => Object.assign(element, { position })),
		},
	};
	return {
		layers, circles, panes, mapHandlers,
	};
};

const renderLeafletMap = async (props = {}) => {
	const mocks = installLeafletMock();
	const result = render(KvMap, {
		props: {
			useLeaflet: true,
			lat: 0,
			long: 0,
			countriesData: COUNTRIES,
			...props,
		},
	});
	await waitFor(() => expect(window.L.geoJson).toHaveBeenCalled());
	return { ...result, ...mocks };
};

const circleFor = (circles, { lat, long }) => circles.find(({ latLng }) => latLng[0] === lat && latLng[1] === long);

const SELECTED_CLASSES = ['tw-stroke-current', 'tw-text-action-highlight', 'tw-stroke-2'];

const isHighlighted = (layer) => SELECTED_CLASSES.every((name) => layer.element.classList.contains(name));
const hasAnyHighlight = (layer) => SELECTED_CLASSES.some((name) => layer.element.classList.contains(name));

describe('KvMap', () => {
	afterEach(() => {
		delete window.L;
	});

	describe('clickable countries', () => {
		it('emits country-lend-filter with the ISO code when a country with data is clicked', async () => {
			const { emitted, layers } = await renderLeafletMap({ countriesClickable: true });

			layers.get('MX').handlers.click();

			expect(emitted()['country-lend-filter']).toEqual([['MX']]);
		});

		it('does not make countries clickable by default', async () => {
			const { layers } = await renderLeafletMap();

			expect(layers.get('MX').handlers.click).toBeUndefined();
		});

		it('does not emit for countries without data', async () => {
			const { layers } = await renderLeafletMap({ countriesClickable: true });

			expect(layers.get('BR').handlers.click).toBeUndefined();
		});

		it('keeps country clicks when tooltips are off', async () => {
			const { layers } = await renderLeafletMap({ countriesClickable: true, showTooltips: false });

			expect(layers.get('MX').handlers.click).toBeDefined();
			expect(layers.get('MX').bindTooltip).not.toHaveBeenCalled();
		});
	});

	describe('selected country', () => {
		it('outlines nothing before a click', async () => {
			const { layers } = await renderLeafletMap({ countriesClickable: true });

			expect([...layers.values()].some(hasAnyHighlight)).toBe(false);
		});

		it('outlines the clicked country', async () => {
			const { layers } = await renderLeafletMap({ countriesClickable: true });

			layers.get('MX').handlers.click();

			expect(isHighlighted(layers.get('MX'))).toBe(true);
			expect(layers.get('MX').bringToFront).toHaveBeenCalled();
			expect(hasAnyHighlight(layers.get('KE'))).toBe(false);
		});

		it('moves the outline to the next clicked country', async () => {
			const { layers } = await renderLeafletMap({ countriesClickable: true });

			layers.get('MX').handlers.click();
			layers.get('KE').handlers.click();

			expect(isHighlighted(layers.get('KE'))).toBe(true);
			expect(hasAnyHighlight(layers.get('MX'))).toBe(false);
		});

		it('outlines the country whose fundraising dot is clicked', async () => {
			const { layers, circles } = await renderLeafletMap({ countriesClickable: true, showFundraisingLoans: true });

			circleFor(circles, MEXICO).handlers.click();

			expect(isHighlighted(layers.get('MX'))).toBe(true);
		});

		it('does not outline a clicked dot when countries are not clickable', async () => {
			const { emitted, layers, circles } = await renderLeafletMap({ showFundraisingLoans: true });

			circleFor(circles, MEXICO).handlers.click();

			expect(emitted()['country-lend-filter']).toEqual([['MX']]);
			expect([...layers.values()].some(hasAnyHighlight)).toBe(false);
		});

		it('draws fundraising dots in a pane above the country shapes', async () => {
			const { circles, panes } = await renderLeafletMap({ countriesClickable: true, showFundraisingLoans: true });
			const { pane } = circles[0].options;

			// Leaflet's overlayPane, where country shapes live, is z-index 400
			expect(Number(panes[pane]?.style.zIndex)).toBeGreaterThan(400);
			expect(circles.every((circle) => circle.options.pane === pane)).toBe(true);
		});

		it('keeps dots in the default pane when countries are not clickable', async () => {
			const { circles, panes } = await renderLeafletMap({ showFundraisingLoans: true });

			expect(Object.keys(panes)).toEqual([]);
			expect(circles.every((circle) => circle.options.pane === undefined)).toBe(true);
		});

		it('keeps the outline when the map is rebuilt for fundraising dots', async () => {
			const { layers, rerender } = await renderLeafletMap({ countriesClickable: true });
			layers.get('MX').handlers.click();
			const firstMexico = layers.get('MX');

			await rerender({ showFundraisingLoans: true });
			await waitFor(() => expect(layers.get('MX')).not.toBe(firstMexico));

			expect(isHighlighted(layers.get('MX'))).toBe(true);
		});

		it('keeps the outline after mouseout', async () => {
			const { layers } = await renderLeafletMap({ countriesClickable: true });
			const mexico = layers.get('MX');

			mexico.handlers.click();
			mexico.handlers.mouseout({ target: mexico });

			expect(isHighlighted(mexico)).toBe(true);
		});
	});

	describe('fundraising tooltip text', () => {
		it('uses the default fundraising tooltip text', async () => {
			const { circles } = await renderLeafletMap({ showFundraisingLoans: true });

			expect(circleFor(circles, MEXICO).bindTooltip).toHaveBeenCalledWith('Click to see 48 fundraising loans in Mexico');
		});

		it('uses fundraisingTooltip for the dot text', async () => {
			const { circles } = await renderLeafletMap({
				showFundraisingLoans: true,
				fundraisingTooltip: (country) => `See facts about ${country.label}`,
			});

			expect(circleFor(circles, MEXICO).bindTooltip).toHaveBeenCalledWith('See facts about Mexico');
		});
	});

	describe('tooltip edges', () => {
		const WRAP_CLASS = '!tw-whitespace-normal';
		const EDGE_GAP = 4;

		// Box follows the Leaflet position; a style width stands in for wrapped text
		const createTooltip = (rect) => {
			const element = document.createElement('div');
			element.position = { x: 0, y: 0 };
			element.getBoundingClientRect = () => {
				const width = element.style.width ? parseFloat(element.style.width) : rect.right - rect.left;
				const left = rect.left + element.position.x;
				return {
					left, right: left + width, top: rect.top + element.position.y, bottom: rect.bottom + element.position.y,
				};
			};
			return {
				update: () => { element.position = { x: 0, y: 0 }; },
				getElement: () => element,
			};
		};

		// `wrapped`: as if an earlier open had wrapped it
		const openTooltip = async (rect, { wrapped = false } = {}) => {
			const tooltip = createTooltip(rect);
			if (wrapped) {
				tooltip.getElement().classList.add(WRAP_CLASS);
				tooltip.getElement().style.width = '80px';
			}
			const { mapHandlers } = await renderLeafletMap();
			mapHandlers.tooltipopen({ tooltip });
			const element = tooltip.getElement();
			return { box: element.getBoundingClientRect(), element };
		};

		it('shifts a tooltip cut off on the left back inside the map', async () => {
			const { box } = await openTooltip({
				left: -20, right: 110, top: 50, bottom: 80,
			});

			expect(box.left).toBe(MAP_RECT.left + EDGE_GAP);
		});

		it('shifts a tooltip cut off on the right back inside the map', async () => {
			const { box } = await openTooltip({
				left: 140, right: 400, top: 50, bottom: 80,
			});

			expect(box.right).toBe(MAP_RECT.right - EDGE_GAP);
		});

		it('shifts a tooltip cut off at the top back inside the map', async () => {
			const { box } = await openTooltip({
				left: 100, right: 200, top: -10, bottom: 20,
			});

			expect(box.top).toBe(MAP_RECT.top + EDGE_GAP);
		});

		it('shifts a tooltip cut off at the bottom back inside the map', async () => {
			const { box } = await openTooltip({
				left: 100, right: 200, top: 290, bottom: 320,
			});

			expect(box.bottom).toBe(MAP_RECT.bottom - EDGE_GAP);
		});

		it('wraps a tooltip wider than the map to fit inside it', async () => {
			const { box, element } = await openTooltip({
				left: 10, right: 410, top: 50, bottom: 80,
			});

			expect(element.classList.contains(WRAP_CLASS)).toBe(true);
			expect(box.left).toBe(MAP_RECT.left + EDGE_GAP);
			expect(box.right).toBe(MAP_RECT.right - EDGE_GAP);
		});

		it('keeps a tooltip that fits on one line', async () => {
			const { element } = await openTooltip({
				left: 140, right: 400, top: 50, bottom: 80,
			});

			expect(element.classList.contains(WRAP_CLASS)).toBe(false);
			expect(element.style.width).toBe('');
		});

		it('unwraps a reopened tooltip that now fits on one line', async () => {
			const { element } = await openTooltip({
				left: 100, right: 200, top: 50, bottom: 80,
			}, { wrapped: true });

			expect(element.classList.contains(WRAP_CLASS)).toBe(false);
			expect(element.style.width).toBe('');
		});

		it('leaves a tooltip that fits where it is', async () => {
			await openTooltip({
				left: 100, right: 200, top: 50, bottom: 80,
			});

			expect(window.L.DomUtil.setPosition).not.toHaveBeenCalled();
		});
	});

	describe('focus ring', () => {
		it('hides the focus ring browsers draw on clicked country shapes', async () => {
			await renderLeafletMap();

			expect(window.L.geoJson.mock.calls[0][1].className).toBe('tw-outline-none');
		});

		it('hides the focus ring browsers draw on clicked fundraising dots', async () => {
			const { circles } = await renderLeafletMap({ showFundraisingLoans: true });

			expect(circles.every((circle) => circle.options.className === 'tw-outline-none')).toBe(true);
		});
	});
});
