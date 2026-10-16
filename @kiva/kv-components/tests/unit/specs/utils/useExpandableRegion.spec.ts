import { nextTick, ref } from 'vue';
import { useExpandableRegion } from '#utils/useExpandableRegion';
import type { ExpandableRegionOptions } from '#utils/useExpandableRegion';
import withSetup from '../../utils/withSetup';

const makeRegion = (overrides: Partial<ExpandableRegionOptions> = {}) => withSetup(() => useExpandableRegion({
	idHandle: 'Learn More About Kiva',
	...overrides,
})).result;

const makeBody = (innerHtml = '') => {
	const body = document.createElement('div');
	body.innerHTML = innerHtml;
	document.body.appendChild(body);
	return body;
};

describe('useExpandableRegion', () => {
	afterEach(() => {
		document.body.innerHTML = '';
	});

	it('starts closed by default', () => {
		const region = makeRegion();

		expect(region.isExpanded.value).toBe(false);
		expect(region.controllerAttrs.value['aria-expanded']).toBe('false');
	});

	it('starts expanded when startExpanded is set', () => {
		const region = makeRegion({ startExpanded: true });

		expect(region.isExpanded.value).toBe(true);
		expect(region.controllerAttrs.value['aria-expanded']).toBe('true');
	});

	it('kebab-cases the id handle into the region id and suffixes the body id', () => {
		const region = makeRegion({ idHandle: 'Learn More About Kiva' });

		expect(region.regionId.value).toBe('learn-more-about-kiva');
		expect(region.bodyId.value).toBe('learn-more-about-kiva-body');
		expect(region.bodyAttrs.value).toEqual({ id: 'learn-more-about-kiva-body' });
		expect(region.controllerAttrs.value['aria-controls']).toBe('learn-more-about-kiva-body');
	});

	it('follows an id handle ref', () => {
		const idHandle = ref('first-key');
		const region = makeRegion({ idHandle });

		idHandle.value = 'second-key';

		expect(region.regionId.value).toBe('second-key');
		expect(region.bodyId.value).toBe('second-key-body');
	});

	it('has no ids when the id handle is empty', () => {
		const region = makeRegion({ idHandle: '' });

		expect(region.regionId.value).toBeUndefined();
		expect(region.bodyAttrs.value).toEqual({ id: undefined });
		expect(region.controllerAttrs.value['aria-controls']).toBeUndefined();
	});

	it('flips one shared state whichever controller toggles it', () => {
		const region = makeRegion();

		region.toggle({ label: 'Heading text' });
		expect(region.isExpanded.value).toBe(true);

		region.toggle({ label: 'Button text', kind: 'region' });
		expect(region.isExpanded.value).toBe(false);
	});

	it('tracks the state the region enters on each toggle', () => {
		const trackFunction = jest.fn();
		const region = makeRegion({ trackFunction, analyticsLabel: 'Learn more about Kiva' });

		region.toggle();
		region.toggle();

		expect(trackFunction.mock.calls).toEqual([
			['event-tracking', 'toggle', 'learn-more-about-kiva', 'region-expand'],
			['event-tracking', 'toggle', 'learn-more-about-kiva', 'region-collapse'],
		]);
	});

	it.each([
		['faq', 'section', 'section-expand'],
		['major-gifts', 'card', 'card-expand'],
	])('tracks with the category %s and the kind %s', (analyticsCategory, kind, property) => {
		const trackFunction = jest.fn();
		const region = makeRegion({
			trackFunction, analyticsCategory, analyticsLabel: 'Frequently asked', kind: kind as 'section' | 'card',
		});

		region.toggle();

		expect(trackFunction).toHaveBeenCalledWith(analyticsCategory, 'toggle', 'frequently-asked', property);
	});

	it('falls back to the region label when the controller label is empty', () => {
		const trackFunction = jest.fn();
		const region = makeRegion({ trackFunction, analyticsLabel: 'Region name' });

		region.toggle({ label: '' });

		expect(trackFunction).toHaveBeenCalledWith('event-tracking', 'toggle', 'region-name', 'region-expand');
	});

	it('tracks with the label and kind of the controller that toggled', () => {
		const trackFunction = jest.fn();
		const region = makeRegion({ trackFunction, analyticsLabel: 'Region name', kind: 'card' });

		region.toggle({ label: 'Read the details', kind: 'region' });

		expect(trackFunction).toHaveBeenCalledWith('event-tracking', 'toggle', 'read-the-details', 'region-expand');
	});

	it('animates a toggle and skips the animation on programmatic expansion', () => {
		const region = makeRegion();

		region.expand();
		expect(region.skipEnter.value).toBe(true);

		region.collapse();
		region.toggle();
		expect(region.skipEnter.value).toBe(false);
	});

	it('does not track expand or collapse', () => {
		const trackFunction = jest.fn();
		const region = makeRegion({ trackFunction });

		region.expand();
		region.collapse();

		expect(trackFunction).not.toHaveBeenCalled();
	});

	it.each([
		['the region id', '#learn-more-about-kiva'],
		['the body id', '#learn-more-about-kiva-body'],
		['an element inside the body', '#inner-question'],
	])('expands without animation when the hash names %s', (_, hash) => {
		const bodyElement = ref(makeBody('<p id="inner-question">Question</p>'));
		const region = makeRegion({ bodyElement });

		expect(region.expandForHash(hash)).toBe(true);
		expect(region.isExpanded.value).toBe(true);
		expect(region.skipEnter.value).toBe(true);
	});

	it.each([
		['is empty', ''],
		['names an element outside the body', '#outside'],
		['names no element', '#missing'],
	])('stays closed when the hash %s', (_, hash) => {
		makeBody('<p id="outside">Outside</p>');
		const bodyElement = ref(makeBody('<p id="inner-question">Question</p>'));
		const region = makeRegion({ bodyElement });

		expect(region.expandForHash(hash)).toBe(false);
		expect(region.isExpanded.value).toBe(false);
	});

	it('decodes a percent-encoded hash before matching it', () => {
		const bodyElement = ref(makeBody('<p id="pregunta-ñ">Pregunta</p>'));
		const region = makeRegion({ bodyElement });

		region.expandForHash('#pregunta-%C3%B1');

		expect(region.isExpanded.value).toBe(true);
	});

	it('expands a region and the region around it for a hash inside the inner one', () => {
		const outerBody = ref(makeBody('<div id="inner-body"><p id="inner-question">Question</p></div>'));
		const innerBody = ref(outerBody.value.querySelector('#inner-body') as HTMLElement);
		const outer = makeRegion({ idHandle: 'outer', bodyElement: outerBody });
		const inner = makeRegion({ idHandle: 'inner', bodyElement: innerBody });

		inner.expandForHash('#inner-question');
		outer.expandForHash('#inner-question');

		expect(inner.isExpanded.value).toBe(true);
		expect(outer.isExpanded.value).toBe(true);
	});

	it('expands on mount without tracking when the route hash targets the region', () => {
		const trackFunction = jest.fn();
		const region = makeRegion({ routeHash: ref('#learn-more-about-kiva'), trackFunction });

		expect(region.isExpanded.value).toBe(true);
		expect(region.skipEnter.value).toBe(true);
		expect(trackFunction).not.toHaveBeenCalled();
	});

	it('stays closed on mount when the route hash targets something else', () => {
		const region = makeRegion({ routeHash: ref('#another-region') });

		expect(region.isExpanded.value).toBe(false);
	});

	it('expands when the route hash changes to target the region', async () => {
		const routeHash = ref('');
		const region = makeRegion({ routeHash });

		routeHash.value = '#learn-more-about-kiva';
		await nextTick();

		expect(region.isExpanded.value).toBe(true);
	});
});
