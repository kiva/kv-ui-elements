import { render, fireEvent } from '@testing-library/vue';
import { axe } from 'jest-axe';
import { nextTick } from 'vue';
import KvCheckoutLightbox from '#components/KvCheckoutLightbox.vue';

const track = jest.fn();

// The lightbox is controlled: the guest fields are v-models owned by the host. Rendering through a
// host that binds them lets a test type into the fields and see the validation react.
const renderLightbox = (props = {}, slots = {}) => {
	const Host = {
		components: { KvCheckoutLightbox },
		emits: ['submit', 'lightbox-closed'],
		data: () => ({ email: '', terms: false, updates: false }),
		setup() {
			return {
				lightboxProps: {
					visible: true,
					totalsLoaded: true,
					category: 'upc',
					...props,
				},
				track,
			};
		},
		template: `
			<div>
				<kv-checkout-lightbox
					v-bind="lightboxProps"
					v-model:email="email"
					v-model:terms-agreement="terms"
					v-model:email-updates="updates"
					:kv-track-function="track"
					@submit="$emit('submit')"
					@lightbox-closed="$emit('lightbox-closed')"
				>
					<template #totals><p data-testid="host-totals">Totals</p></template>
					<template #payment><div data-testid="host-payment">Payment form</div></template>
					${Object.entries(slots).map(([name, html]) => `<template #${name}>${html}</template>`).join('')}
				</kv-checkout-lightbox>
				<p data-testid="models">{{ email }}|{{ terms }}|{{ updates }}</p>
			</div>
		`,
	};
	return render(Host);
};

const submitButton = (utils) => utils.getByRole('button', { name: 'Submit my contribution' });
const closeButton = (utils) => utils.queryByRole('button', { name: /close/i });

const fillGuestFields = async (utils) => {
	await fireEvent.update(utils.getByLabelText('Email address'), 'lender@example.com');
	await fireEvent.click(utils.getByRole('checkbox', { name: /Terms of Use/ }));
	await nextTick();
};

describe('KvCheckoutLightbox', () => {
	beforeEach(() => {
		track.mockClear();
	});

	it('has no automated accessibility violations', async () => {
		const { container } = renderLightbox();
		expect(await axe(container)).toHaveNoViolations();
	});

	it('renders the host totals and guest fields for a signed-out visitor', () => {
		const utils = renderLightbox();
		expect(utils.getByTestId('host-totals')).toBeInTheDocument();
		expect(utils.getByTestId('kv-checkout-guest-fields')).toBeInTheDocument();
		expect(utils.getByLabelText('Email address')).toBeInTheDocument();
	});

	it('hides the guest fields for a signed-in lender', () => {
		const utils = renderLightbox({ isLoggedIn: true });
		expect(utils.queryByTestId('kv-checkout-guest-fields')).toBeNull();
	});

	describe('submit state', () => {
		it('stays disabled until the totals have loaded', () => {
			expect(submitButton(renderLightbox({ isLoggedIn: true, totalsLoaded: false }))).toBeDisabled();
		});

		it('enables for a signed-in lender once the totals are known and nothing is due', () => {
			expect(submitButton(renderLightbox({ isLoggedIn: true }))).not.toBeDisabled();
		});

		it('waits for the payment method when a deposit is due', () => {
			expect(submitButton(renderLightbox({ isLoggedIn: true, depositRequired: true }))).toBeDisabled();
		});

		it('enables once the payment method is ready', () => {
			expect(submitButton(renderLightbox({
				isLoggedIn: true, depositRequired: true, paymentReady: true,
			}))).not.toBeDisabled();
		});

		it('waits for valid guest fields', async () => {
			const utils = renderLightbox();
			expect(submitButton(utils)).toBeDisabled();
			await fillGuestFields(utils);
			expect(submitButton(utils)).not.toBeDisabled();
		});

		it('shows loading while the host is paying', () => {
			const utils = renderLightbox({ isLoggedIn: true, paying: true });
			// KvButton disables itself and hides the label behind the spinner while loading.
			expect(submitButton(utils)).toBeDisabled();
			expect(utils.getByText('Submit my contribution')).toHaveClass('tw-invisible');
		});
	});

	describe('guest validation', () => {
		it('flags a bad email and unaccepted terms on submit and does not emit', async () => {
			const utils = renderLightbox();
			await fireEvent.update(utils.getByLabelText('Email address'), 'not-an-email');
			await fireEvent.submit(utils.container.querySelector('form'));
			await nextTick();

			expect(utils.getByText('Valid email required.')).toBeInTheDocument();
			expect(utils.getByText(/You must agree to the Kiva Terms of Use/)).toBeInTheDocument();
			expect(utils.emitted('submit')).toBeUndefined();
		});

		it('shows the email error once the field is left', async () => {
			const utils = renderLightbox();
			const input = utils.getByLabelText('Email address');
			await fireEvent.update(input, 'nope');
			await fireEvent.blur(input);
			await nextTick();
			expect(utils.getByText('Valid email required.')).toBeInTheDocument();
		});

		it('emits submit once the guest fields are valid', async () => {
			const utils = renderLightbox();
			await fillGuestFields(utils);
			await fireEvent.submit(utils.container.querySelector('form'));
			expect(utils.emitted('submit')).toHaveLength(1);
		});

		it('emits submit for a signed-in lender with no fields to validate', async () => {
			const utils = renderLightbox({ isLoggedIn: true });
			await fireEvent.submit(utils.container.querySelector('form'));
			expect(utils.emitted('submit')).toHaveLength(1);
		});

		it('ignores a submit while paying', async () => {
			const utils = renderLightbox({ isLoggedIn: true, paying: true });
			await fireEvent.submit(utils.container.querySelector('form'));
			expect(utils.emitted('submit')).toBeUndefined();
		});
	});

	it('round-trips the guest fields through their v-models', async () => {
		const utils = renderLightbox();
		await fireEvent.update(utils.getByLabelText('Email address'), 'lender@example.com');
		await fireEvent.click(utils.getByRole('checkbox', { name: /Terms of Use/ }));
		await fireEvent.click(utils.getByRole('checkbox', { name: /Receive email updates/ }));
		await nextTick();
		expect(utils.getByTestId('models').textContent).toBe('lender@example.com|true|true');
	});

	it('tracks the guest interactions through the host callback', async () => {
		const utils = renderLightbox();
		await fireEvent.focus(utils.getByLabelText('Email address'));
		await fireEvent.click(utils.getByRole('checkbox', { name: /Terms of Use/ }));
		await fireEvent.click(utils.getByRole('checkbox', { name: /Receive email updates/ }));

		expect(track).toHaveBeenCalledWith('upc', 'click', 'guest-checkout-email', undefined, undefined);
		// The checkbox events match the /checkout guest form: the copy as property, the selection as value.
		expect(track).toHaveBeenCalledWith(
			'upc', 'click', 'terms-of-use', 'I have read and agree to the Terms of Use and Privacy Policy', 1,
		);
		expect(track).toHaveBeenCalledWith(
			'upc', 'click', 'marketing-updates', expect.stringMatching(/^Receive email updates from Kiva/), 1,
		);
	});

	it('reports a cleared checkbox with a zero value', async () => {
		const utils = renderLightbox();
		const terms = utils.getByRole('checkbox', { name: /Terms of Use/ });
		await fireEvent.click(terms);
		await fireEvent.click(terms);
		expect(track).toHaveBeenLastCalledWith('upc', 'click', 'terms-of-use', expect.any(String), 0);
	});

	describe('payment and notes', () => {
		it('renders the payment slot and the disclaimer only when a deposit is due', () => {
			const utils = renderLightbox({ isLoggedIn: true, depositRequired: true });
			expect(utils.getByTestId('host-payment')).toBeInTheDocument();
			expect(utils.getByText(/free payment processing/)).toBeInTheDocument();
			expect(utils.queryByTestId('kv-checkout-covered')).toBeNull();
		});

		it('says the credit covers it when nothing is due and the totals are known', () => {
			const utils = renderLightbox({ isLoggedIn: true });
			expect(utils.queryByTestId('host-payment')).toBeNull();
			expect(utils.getByTestId('kv-checkout-covered')).toBeInTheDocument();
		});

		it('says nothing about the credit until the totals are known', () => {
			const utils = renderLightbox({ isLoggedIn: true, totalsLoaded: false });
			expect(utils.queryByTestId('kv-checkout-covered')).toBeNull();
		});

		it('renders the before-submit slot above the button', () => {
			const utils = renderLightbox({ isLoggedIn: true }, {
				'before-submit': '<p data-testid="host-notice">We will charge your payment method.</p>',
			});
			const inOrder = Array.from(utils.container.querySelectorAll('[data-testid="host-notice"], button[type="submit"]'));
			expect(inOrder[0]).toBe(utils.getByTestId('host-notice'));
			expect(inOrder[1]).toBe(submitButton(utils));
		});
	});

	describe('loading and locking', () => {
		it('shows the loading slot instead of the form while the host prepares', () => {
			const utils = renderLightbox({ loading: true }, { loading: '<p data-testid="host-skeleton">Adding…</p>' });
			expect(utils.getByTestId('host-skeleton')).toBeInTheDocument();
			expect(utils.container.querySelector('form')).toBeNull();
		});

		it('can be closed when idle', () => {
			expect(closeButton(renderLightbox({ isLoggedIn: true }))).not.toBeNull();
		});

		it('locks while loading', () => {
			expect(closeButton(renderLightbox({ isLoggedIn: true, loading: true }))).toBeNull();
		});

		it('locks while paying', () => {
			expect(closeButton(renderLightbox({ isLoggedIn: true, paying: true }))).toBeNull();
		});

		it('locks on request', () => {
			expect(closeButton(renderLightbox({ isLoggedIn: true, preventClose: true }))).toBeNull();
		});

		it('relays the lightbox close', async () => {
			const utils = renderLightbox({ isLoggedIn: true });
			await fireEvent.click(closeButton(utils));
			expect(utils.emitted('lightbox-closed')).toHaveLength(1);
		});
	});
});
