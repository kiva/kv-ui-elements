<template>
	<kv-lightbox
		:visible="visible"
		:title="title"
		:prevent-close="preventClose || loading || paying"
		class="tw-z-modal"
		@lightbox-closed="$emit('lightbox-closed')"
	>
		<!-- The host may open the lightbox before the basket is ready and show its skeleton here. -->
		<div
			v-if="visible && loading"
			role="status"
			aria-busy="true"
			data-testid="kv-checkout-loading"
		>
			<slot name="loading"></slot>
		</div>
		<form
			v-else-if="visible"
			style="max-width: 520px;"
			class="tw-mx-auto"
			action="."
			@submit.prevent="onSubmit"
		>
			<!-- What is being paid for: the host renders its own list here -->
			<slot name="totals"></slot>

			<!-- Payment method, supplied by the host and shown only when a deposit is due -->
			<slot
				v-if="depositRequired"
				name="payment"
			></slot>

			<!-- Guest account info -->
			<fieldset
				v-if="!isLoggedIn"
				class="tw-text-left"
				data-testid="kv-checkout-guest-fields"
			>
				<legend class="tw-sr-only">
					Contact information
				</legend>
				<label
					:for="`${idPrefix}-guest-email`"
					class="tw-block tw-font-medium"
				>
					Email address
				</label>
				<kv-text-input
					:id="`${idPrefix}-guest-email`"
					:model-value="email"
					type="email"
					:valid="!showEmailError"
					class="tw-w-full tw-mb-2"
					@update:model-value="$emit('update:email', $event)"
					@focus="track('click', 'guest-checkout-email')"
					@blur="emailTouched = true"
				/>
				<p
					v-if="showEmailError"
					class="tw-text-danger tw-text-small tw-mb-1"
				>
					Valid email required.
				</p>

				<kv-checkbox
					:model-value="termsAgreement"
					name="termsAgreement"
					class="tw-mb-1"
					:valid="!showTermsError"
					@update:model-value="onTermsChange"
				>
					<span class="tw-text-small">
						I have read and agree to the
						<a
							:href="`${appUri}/legal/terms`"
							target="_blank"
							title="Open Terms of Use in a new window"
							@click="track('click', 'tos-link')"
						>Terms of Use</a>
						and
						<a
							:href="`${appUri}/legal/privacy`"
							target="_blank"
							title="Open Privacy Policy in a new window"
							@click="track('click', 'privacy-link')"
						>Privacy Policy</a>.
						Preferences can be managed in settings.
					</span>
				</kv-checkbox>

				<kv-checkbox
					:model-value="emailUpdates"
					name="emailUpdates"
					class="tw-mb-1"
					@update:model-value="onEmailUpdatesChange"
				>
					<span class="tw-text-small">
						Receive email updates from Kiva (including borrower updates and promos).
						You can unsubscribe anytime.
					</span>
				</kv-checkbox>

				<p
					v-if="showTermsError"
					class="tw-text-danger tw-text-small tw-mb-1"
				>
					You must agree to the Kiva Terms of Use &amp; Privacy policy.
				</p>
			</fieldset>

			<!-- Host copy that belongs right above the button, such as a charge notice -->
			<slot name="before-submit"></slot>

			<kv-button
				:state="submitState"
				type="submit"
				class="tw-w-full tw-my-1"
			>
				{{ submitLabel }}
			</kv-button>
			<p
				v-if="depositRequired"
				class="tw-text-base tw-text-center"
			>
				<slot name="disclaimer">
					Thanks to PayPal, Kiva receives free payment processing for all transactions.
				</slot>
			</p>
			<p
				v-else-if="totalsLoaded"
				class="tw-text-base tw-text-center"
				data-testid="kv-checkout-covered"
			>
				<slot name="covered">
					No payment needed. Your Kiva credit covers this.
				</slot>
			</p>
		</form>
	</kv-lightbox>
</template>

<script lang="ts">
import { computed, ref, toRefs } from 'vue';
import KvButton from './KvButton.vue';
import KvCheckbox from './KvCheckbox.vue';
import KvLightbox from './KvLightbox.vue';
import KvTextInput from './KvTextInput.vue';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * The visual half of a one-time checkout lightbox: totals, payment method and guest fields come in
 * through slots and props, the form validates the guest fields, and a valid submit is emitted for
 * the host to carry out. It knows nothing about baskets, Apollo or Braintree; kv-shop composes it
 * with the checkout logic, and the apps use that composition.
 */
export default {
	name: 'KvCheckoutLightbox',
	components: {
		KvButton,
		KvCheckbox,
		KvLightbox,
		KvTextInput,
	},
	props: {
		/**
		 * Whether the lightbox is shown.
		 */
		visible: {
			type: Boolean,
			default: false,
		},
		/**
		 * The host is still preparing what is being paid for: the `loading` slot shows instead of
		 * the form and the lightbox cannot be dismissed.
		 */
		loading: {
			type: Boolean,
			default: false,
		},
		/**
		 * Keep the lightbox from being dismissed. It is already locked while loading or paying.
		 */
		preventClose: {
			type: Boolean,
			default: false,
		},
		title: {
			type: String,
			default: 'Finalize your impact',
		},
		/**
		 * A signed-in lender skips the guest fields.
		 */
		isLoggedIn: {
			type: Boolean,
			default: false,
		},
		/**
		 * The amounts are known. Until then the submit stays disabled and the "covered" note is hidden.
		 */
		totalsLoaded: {
			type: Boolean,
			default: false,
		},
		/**
		 * Something is still owed: the `payment` slot and the disclaimer show, and the submit waits
		 * for `paymentReady`.
		 */
		depositRequired: {
			type: Boolean,
			default: false,
		},
		/**
		 * The payment method in the `payment` slot is ready to be charged.
		 */
		paymentReady: {
			type: Boolean,
			default: false,
		},
		/**
		 * The host is carrying out the submit: the button shows its loading state and the lightbox
		 * cannot be dismissed.
		 */
		paying: {
			type: Boolean,
			default: false,
		},
		submitLabel: {
			type: String,
			default: 'Submit my contribution',
		},
		/**
		 * Origin of the legal pages linked from the terms checkbox.
		 */
		appUri: {
			type: String,
			default: 'https://www.kiva.org',
		},
		/**
		 * Analytics callback: (category, action, label, property, value).
		 */
		kvTrackFunction: {
			type: Function,
			default: () => {},
		},
		category: {
			type: String,
			default: 'basket',
		},
		/**
		 * Prefix for the guest email input id, so two lightboxes on a page do not share one.
		 */
		idPrefix: {
			type: String,
			default: 'kv-checkout',
		},
		/**
		 * Guest fields, each a v-model: `v-model:email`, `v-model:terms-agreement`,
		 * `v-model:email-updates`.
		 */
		email: {
			type: String,
			default: '',
		},
		termsAgreement: {
			type: Boolean,
			default: false,
		},
		emailUpdates: {
			type: Boolean,
			default: false,
		},
	},
	emits: [
		'lightbox-closed',
		/**
		 * The form is valid and the lender pressed submit; the host carries out the checkout.
		 */
		'submit',
		'update:email',
		'update:termsAgreement',
		'update:emailUpdates',
	],
	setup(props, { emit }) {
		const {
			isLoggedIn,
			totalsLoaded,
			depositRequired,
			paymentReady,
			paying,
			email,
			termsAgreement,
		} = toRefs(props);

		const track = (action: string, label?: string) => {
			props.kvTrackFunction(props.category, action, label);
		};

		// Validation is only required for a signed-out visitor, and errors show once a field has
		// been touched or a submit was attempted.
		const emailTouched = ref(false);
		const termsTouched = ref(false);
		const emailValid = computed(() => EMAIL_PATTERN.test(email.value.trim()));
		const guestFieldsValid = computed(() => isLoggedIn.value || (emailValid.value && termsAgreement.value));
		const showEmailError = computed(() => !isLoggedIn.value && emailTouched.value && !emailValid.value);
		const showTermsError = computed(() => !isLoggedIn.value && termsTouched.value && !termsAgreement.value);

		const submitState = computed(() => {
			if (!totalsLoaded.value) {
				return 'disabled';
			}
			if (depositRequired.value && !paymentReady.value) {
				return 'disabled';
			}
			if (!guestFieldsValid.value) {
				return 'disabled';
			}
			if (paying.value) {
				return 'loading';
			}
			return '';
		});

		const onTermsChange = (value: boolean) => {
			emit('update:termsAgreement', value);
			track('click', 'guest-checkout-tos');
		};

		const onEmailUpdatesChange = (value: boolean) => {
			emit('update:emailUpdates', value);
			track('click', 'guest-checkout-marketing-updates');
		};

		const onSubmit = () => {
			if (paying.value) {
				return;
			}
			emailTouched.value = true;
			termsTouched.value = true;
			if (!guestFieldsValid.value) {
				return;
			}
			emit('submit');
		};

		return {
			emailTouched,
			onEmailUpdatesChange,
			onSubmit,
			onTermsChange,
			showEmailError,
			showTermsError,
			submitState,
			track,
		};
	},
};
</script>
