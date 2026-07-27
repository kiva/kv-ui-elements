import { render, waitFor } from '@testing-library/vue';
import { axe } from 'jest-axe';
import KvFormAssemblyForm from '#components/KvFormAssemblyForm.vue';

// KvLoadingSpinner is a dependency-free SVG, so it is rendered for real rather than
// stubbed — no spec in this repo stubs child components, and the a11y check is more
// meaningful against the real markup.
//
// The component only builds its src once the container ref is populated, which is one
// reactivity flush after mount — so every helper that needs the iframe awaits it.
async function renderForm(props = {}) {
	const utils = render(KvFormAssemblyForm, {
		props: { formAssemblyId: 658, ...props },
	});
	await waitFor(() => expect(utils.container.querySelector('iframe')).not.toBeNull());
	return utils;
}

function getIframe(container) {
	const iframe = container.querySelector('iframe');
	expect(iframe).not.toBeNull();
	return iframe;
}

function getIframeQuery(container) {
	const src = getIframe(container).getAttribute('src');
	return new URLSearchParams(src.split('?')[1] ?? '');
}

describe('KvFormAssemblyForm', () => {
	// awaited so the iframe is present — otherwise axe never exercises frame-title,
	// which is the rule the title prop exists to satisfy
	it('has no automated accessibility violations', async () => {
		const { container } = await renderForm();
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it('renders an iframe pointing at the FA form URL', async () => {
		const { container } = await renderForm();
		expect(getIframe(container).getAttribute('src')).toBe('https://kiva.tfaforms.net/658');
	});

	it('gives the iframe an accessible name from the title prop', async () => {
		const { container } = await renderForm({ title: 'Newsletter signup' });
		expect(getIframe(container).getAttribute('title')).toBe('Newsletter signup');
	});

	it('falls back to a generic iframe title when none is supplied', async () => {
		const { container } = await renderForm();
		expect(getIframe(container).getAttribute('title')).toBe('FormAssembly form');
	});

	// In cms-page-server the id is often not known at first render — it arrives from
	// Contentful or a computed — so the src has to rebuild when the prop settles.
	it('rebuilds the src when formAssemblyId changes', async () => {
		const { container, rerender } = await renderForm();
		expect(getIframe(container).getAttribute('src')).toBe('https://kiva.tfaforms.net/658');

		await rerender({ formAssemblyId: 601 });

		await waitFor(() => expect(getIframe(container).getAttribute('src'))
			.toBe('https://kiva.tfaforms.net/601'));
	});

	// The src is built one flush after mount, so asserting synchronously here would pass
	// even if the id guard were removed. Drain the queue first, then assert the negative.
	it('renders no iframe when formAssemblyId is not supplied', async () => {
		const { container } = render(KvFormAssemblyForm);

		await new Promise((resolve) => { setTimeout(resolve, 0); });

		expect(container.querySelector('iframe')).toBeNull();
	});

	it('still renders when additionalQueryParams is null rather than undefined', async () => {
		const { container } = await renderForm({ additionalQueryParams: null });
		expect(getIframe(container).getAttribute('src')).toBe('https://kiva.tfaforms.net/658');
	});

	// deliberately a different id from the default used everywhere else, so this also
	// pins that the prop is interpolated into the url rather than hardcoded
	it('appends additionalQueryParams to the form url', async () => {
		const { container } = await renderForm({
			formAssemblyId: 999,
			additionalQueryParams: '?foo=bar',
		});

		expect(getIframe(container).getAttribute('src')).toBe('https://kiva.tfaforms.net/999?foo=bar');
	});

	it('preserves every key in a multi-param query string', async () => {
		const { container } = await renderForm({
			additionalQueryParams: '?tfa_4211=user@example.com&tfa_4264=12345',
		});

		const query = getIframeQuery(container);
		expect(query.get('tfa_4211')).toBe('user@example.com');
		expect(query.get('tfa_4264')).toBe('12345');
	});

	it('tolerates additionalQueryParams without a leading question mark', async () => {
		const { container } = await renderForm({ additionalQueryParams: 'foo=bar' });
		expect(getIframe(container).getAttribute('src')).toBe('https://kiva.tfaforms.net/658?foo=bar');
	});

	it('emits no query string when additionalQueryParams is empty', async () => {
		const { container } = await renderForm({ additionalQueryParams: '' });
		expect(getIframe(container).getAttribute('src')).toBe('https://kiva.tfaforms.net/658');
	});

	it('emits no query string when additionalQueryParams is only a question mark', async () => {
		const { container } = await renderForm({ additionalQueryParams: '?' });
		expect(getIframe(container).getAttribute('src')).toBe('https://kiva.tfaforms.net/658');
	});

	// mcstover on PR #861: automation hooks, distinct per form so several embeds on one
	// page are individually addressable.
	it('exposes a stable wrapper class and a form-specific data-testid', async () => {
		const { container } = await renderForm();
		const root = container.firstElementChild;

		expect(root.classList.contains('kv-form-assembly-form')).toBe(true);
		expect(root.getAttribute('data-testid')).toBe('kv-form-assembly-form-658');
	});

	it('falls back to an unsuffixed data-testid when there is no form id', async () => {
		const { container } = render(KvFormAssemblyForm);
		await new Promise((resolve) => { setTimeout(resolve, 0); });

		expect(container.firstElementChild.getAttribute('data-testid')).toBe('kv-form-assembly-form');
	});

	// A consumer in cms-page-server sizes its lightbox by passing a class down to this
	// wrapper. That works only while the template has a single root, so pin the fallthrough.
	it('merges a consumer-supplied class onto the root element', () => {
		const { container } = render(KvFormAssemblyForm, {
			props: { formAssemblyId: 658 },
			attrs: { class: 'lightbox-max-height' },
		});

		const root = container.firstElementChild;
		expect(root.classList.contains('lightbox-max-height')).toBe(true);
		expect(root.classList.contains('tw-w-full')).toBe(true);
	});
});

// A real browser always sets `source` to the posting window, so default it to the
// component's own frame. Pass an explicit `source` to simulate a different embed.
function postFaMessage(container, data, { origin = 'https://kiva.tfaforms.net', source } = {}) {
	const iframe = container.querySelector('iframe');
	window.dispatchEvent(new MessageEvent('message', {
		origin,
		data,
		source: source === undefined ? iframe?.contentWindow : source,
	}));
}

describe('KvFormAssemblyForm postMessage handling', () => {
	it('emits fa-form-loaded and hides the spinner on fa_frame_loaded', async () => {
		const { container, emitted } = await renderForm();
		// the spinner is the only svg the component renders
		expect(container.querySelector('svg')).not.toBeNull();

		postFaMessage(container, { type: 'fa_frame_loaded' });

		await waitFor(() => expect(emitted()['fa-form-loaded']).toBeTruthy());
		await waitFor(() => expect(container.querySelector('svg')).toBeNull());
	});

	it('marks the container busy until the form reports loaded', async () => {
		const { container } = await renderForm();
		const root = container.firstElementChild;
		expect(root.getAttribute('aria-busy')).toBe('true');

		postFaMessage(container, { type: 'fa_frame_loaded' });

		await waitFor(() => expect(root.getAttribute('aria-busy')).toBe('false'));
	});

	it('resizes the iframe to the reported height plus 30px body margin', async () => {
		const { container, emitted } = await renderForm();

		postFaMessage(container, { type: 'fa_frame_data', frameHeight: 800 });

		await waitFor(() => expect(getIframe(container).getAttribute('height')).toBe('830'));
		expect(emitted()['fa-form-submitted']).toBeFalsy();
	});

	it('falls back to a 300px height when frameHeight is absent', async () => {
		const { container } = await renderForm();

		postFaMessage(container, { type: 'fa_form_page_change' });

		await waitFor(() => expect(getIframe(container).getAttribute('height')).toBe('330'));
	});

	it('emits fa-form-submitted with valid true for a well-formed analytics payload', async () => {
		const { container, emitted } = await renderForm();

		postFaMessage(container, {
			type: 'fa_form_submitted',
			frameHeight: 400,
			analytics: ['category', 'action', 'label', 'property', 'value'],
		});

		await waitFor(() => expect(emitted()['fa-form-submitted']).toBeTruthy());
		expect(emitted()['fa-form-submitted'][0][0]).toEqual({
			analytics: ['category', 'action', 'label', 'property', 'value'],
			valid: true,
		});
	});

	it('emits valid false when the analytics payload is missing', async () => {
		const { container, emitted } = await renderForm();

		postFaMessage(container, { type: 'fa_form_submitted', frameHeight: 400 });

		await waitFor(() => expect(emitted()['fa-form-submitted']).toBeTruthy());
		expect(emitted()['fa-form-submitted'][0][0]).toEqual({
			analytics: null,
			valid: false,
		});
	});

	it('emits valid false when the analytics payload is malformed', async () => {
		const { container, emitted } = await renderForm();

		postFaMessage(container, {
			type: 'fa_form_submitted',
			frameHeight: 400,
			analytics: ['only-one-string', 42],
		});

		await waitFor(() => expect(emitted()['fa-form-submitted']).toBeTruthy());
		expect(emitted()['fa-form-submitted'][0][0]).toEqual({
			analytics: ['only-one-string', 42],
			valid: false,
		});
	});

	// Kiva's forms raise fa_form_closed from a beforeunload handler, so it means the form's
	// page went away — not that the user finished. It is the weaker of the two signals.
	it('emits fa-form-closed when the form page is torn down', async () => {
		const { container, emitted } = await renderForm();

		postFaMessage(container, { type: 'fa_form_closed' });

		await waitFor(() => expect(emitted()['fa-form-closed']).toBeTruthy());
		expect(emitted()['fa-form-submitted']).toBeFalsy();
	});

	// the two are independent: a submit does not imply teardown, and vice versa
	it('does not emit fa-form-closed on a plain submit', async () => {
		const { container, emitted } = await renderForm();

		postFaMessage(container, { type: 'fa_form_submitted', frameHeight: 400 });

		await waitFor(() => expect(emitted()['fa-form-submitted']).toBeTruthy());
		expect(emitted()['fa-form-closed']).toBeFalsy();
	});

	it('ignores messages from any other origin', async () => {
		const { container, emitted } = await renderForm();

		postFaMessage(container, { type: 'fa_form_submitted', frameHeight: 900 }, { origin: 'https://evil.example.com' });
		postFaMessage(container, { type: 'fa_frame_loaded' }, { origin: 'https://evil.example.com' });

		// nothing should change, so settle the queue before asserting the negatives
		await waitFor(() => expect(getIframe(container).getAttribute('height')).toBe('500'));
		expect(emitted()['fa-form-submitted']).toBeFalsy();
		expect(emitted()['fa-form-loaded']).toBeFalsy();
	});

	// Asserting behaviour after unmount is vacuous — there is nothing observable left to
	// check, so the test passes whether or not the listener was removed. Pin the removal
	// itself, and pin that it removes the *same* handler it registered.
	// mcstover on PR #861: guard against collisions when several embeds share a page.
	// Origin alone is not enough — every embed hears every FormAssembly frame.
	it('ignores a message from a different FormAssembly frame on the same page', async () => {
		const { container, emitted } = await renderForm();
		const otherFrame = document.createElement('iframe');
		document.body.appendChild(otherFrame);

		postFaMessage(container, { type: 'fa_form_submitted', frameHeight: 900 }, {
			source: otherFrame.contentWindow,
		});

		await waitFor(() => expect(getIframe(container).getAttribute('height')).toBe('500'));
		expect(emitted()['fa-form-submitted']).toBeFalsy();
		document.body.removeChild(otherFrame);
	});

	// The definitive answer to "should the container ref be dynamic?" — it does not need to
	// be. Template refs are per component instance, so two embeds each resolve their own
	// element and build their own src. Only document-global attributes needed disambiguating.
	it('keeps two embeds on the same page fully independent', async () => {
		const TwoEmbeds = {
			components: { KvFormAssemblyForm },
			template: `
				<div>
					<KvFormAssemblyForm :form-assembly-id="658" title="First" />
					<KvFormAssemblyForm :form-assembly-id="601" title="Second" />
				</div>
			`,
		};
		const { container } = render(TwoEmbeds);
		await waitFor(() => expect(container.querySelectorAll('iframe')).toHaveLength(2));
		const [first, second] = container.querySelectorAll('iframe');

		// each instance resolved its own container ref and built its own url
		expect(first.getAttribute('src')).toBe('https://kiva.tfaforms.net/658');
		expect(second.getAttribute('src')).toBe('https://kiva.tfaforms.net/601');

		// and each is separately addressable by automation
		expect(container.querySelector('[data-testid="kv-form-assembly-form-658"]')).not.toBeNull();
		expect(container.querySelector('[data-testid="kv-form-assembly-form-601"]')).not.toBeNull();

		// a resize from the first frame must leave the second at its default height
		window.dispatchEvent(new MessageEvent('message', {
			origin: 'https://kiva.tfaforms.net',
			data: { type: 'fa_frame_data', frameHeight: 800 },
			source: first.contentWindow,
		}));

		await waitFor(() => expect(first.getAttribute('height')).toBe('830'));
		expect(second.getAttribute('height')).toBe('500');
	});

	it('removes its message listener on unmount', async () => {
		const addSpy = jest.spyOn(window, 'addEventListener');
		const removeSpy = jest.spyOn(window, 'removeEventListener');

		const { unmount } = await renderForm();
		const registered = addSpy.mock.calls.find(([type]) => type === 'message');
		expect(registered).toBeDefined();

		unmount();

		expect(removeSpy).toHaveBeenCalledWith('message', registered[1]);

		addSpy.mockRestore();
		removeSpy.mockRestore();
	});
});
