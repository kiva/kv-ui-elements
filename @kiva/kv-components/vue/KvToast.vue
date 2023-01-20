<template>
	<div
		role="alert"
		aria-live="polite"
	>
		<transition
			enter-active-class="tw-transition-opacity tw-duration-300"
			leave-active-class="tw-transition-opacity tw-duration-300"
			enter-class="tw-opacity-0"
			enter-to-class="tw-opacity-full"
			leave-class="tw-opacity-full"
			leave-to-class="tw-opacity-0"
		>
			<div
				v-if="isVisible"
				data-test="tip-message"
				class="tw-mx-2.5"
			>
				<kv-page-container>
					<div
						class="
							tw-rounded tw-overflow-hidden
							tw-flex
							tw-bg-secondary
							tw-mx-auto
							tw-w-full md:tw-w-max md:tw-max-w-full md:tw-min-w-1/2
						"
					>
						<div
							class="
							tw-w-5
							tw-flex-shrink-0
							tw-flex
							tw-items-center tw-justify-center
						"
							:class="{
								'tw-bg-brand tw-text-white' : (
									messageType === '' || messageType === 'confirmation' ||
									messageType === 'kiva-logo'
								),
								'tw-bg-danger tw-text-primary-inverse' : messageType === 'error',
								'tw-bg-caution tw-text-primary' : messageType === 'warning',
							}"
						>
							<!-- Kiva Icon SVG -->
							<!-- eslint-disable max-len -->
							<svg
								v-if="messageType === 'kiva-logo'"
								width="16"
								height="24"
								viewBox="0 0 16 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M4.78202 0H0V23.141H4.78202V0ZM6.00533 14.6274C13.6788 14.6274 15.4582 8.05649 15.4582 6.91372H14.7909C7.11743 6.91372 5.33807 13.4846 5.33807 14.6274H6.00533ZM5.33807 15.1988C5.33807 16.3987 6.67259 23.0838 14.9021 23.0838H15.5694C15.5694 21.8839 14.2349 15.1988 6.00533 15.1988H5.33807Z"
									fill="white"
								/>
							</svg>
							<kv-material-icon
								v-else
								class="tw-w-2.5 tw-h-2.5"
								:icon="icon"
							/>
						</div>
						<div
							ref="messageRef"
							class="
							tw-flex-1
							tw-px-1 tw-py-2
							tw-flex
						"
						>
							<slot
								v-if="hasToastContentSlot"
								name="toastContent"
							></slot>
							<!-- eslint-disable vue/no-v-html -->
							<p
								v-else
								class="tw-inline-block tw-m-auto"
								v-html="message"
							>
							</p>
							<!--eslint-enable-->
						</div>

						<button
							class="
							tw-w-5
							tw-flex-shrink-0
							tw-flex
							tw-items-center tw-justify-center
							tw-bg-secondary
							hover:tw-text-action-highlight
						"
							@click="close"
						>
							<kv-material-icon
								class="tw-w-2.5 tw-h-2.5"
								:icon="mdiClose"
							/>
							<span class="tw-sr-only">Close notification</span>
						</button>
					</div>
				</kv-page-container>
			</div>
		</transition>
	</div>
</template>

<script>
import {
	ref,
	computed,
} from 'vue-demi';
import {
	mdiClose, mdiAlertCircle, mdiAlert, mdiCheckCircle,
} from '@mdi/js';
import KvMaterialIcon from './KvMaterialIcon.vue';
import KvPageContainer from './KvPageContainer.vue';

/**
 * A component which displays a temporary notice to the user.
 * Toasts remain visible for 100ms * message character count, with a minumum of 5 seconds.
 * Queuing toasts is not included in this component and should be handled by your application.
 *
 * Usage:
 *
 * ```
 *  <kv-toast ref="myToastRef" />
 *
 *  this.$refs.myToastRef.show(
 * 		message: String,
 * 		messageType: 'error' | 'info' | 'confirmation',
 * 		persist: Boolean
 *  );
 *  this.$refs.myToastRef.close();
 * ```
 */
export default {
	components: {
		KvMaterialIcon,
		KvPageContainer,
	},
	emits: [
		'close',
	],
	setup(props, { emit, slots }) {
		const isVisible = ref(false);
		const message = ref('');
		const messageType = ref('confirmation'); // 'error', 'info', 'confirmation'
		const persist = ref(false);
		const timeout = ref(null);

		const icon = computed(() => {
			if (messageType.value === 'warning') {
				return mdiAlert;
			}
			if (messageType.value === 'error') {
				return mdiAlertCircle;
			}
			return mdiCheckCircle;
		});

		const msToDisplayToast = computed(() => {
			const MINIMUM_MS = 5000;
			const MS_PER_CHARACTER = 100;

			// create an empty span to get the character count without HTML
			const span = document.createElement('span');
			span.innerHTML = message.value;
			const characterCount = span.innerText.length;

			const characterMs = MS_PER_CHARACTER * characterCount;
			return Math.max(characterMs, MINIMUM_MS);
		});

		const hasToastContentSlot = computed(() => !!slots?.toastContent ?? false);

		const close = () => {
			isVisible.value = false;
			clearTimeout(timeout.value);

			/**
			* Indicates the toast has closed by a user or after timeout
			* @event close
			*/
			emit('close');
		};

		const show = (messageInput, type, persistInput) => {
			isVisible.value = true;
			message.value = typeof messageInput === 'string' ? messageInput : '';
			messageType.value = typeof type === 'string' ? type : '';
			persist.value = Boolean(persistInput);

			if (!persist.value) {
				timeout.value = setTimeout(() => {
					close();
				}, msToDisplayToast.value);
			}
		};

		return {
			mdiClose,
			isVisible,
			message,
			messageType,
			persist,
			timeout,
			icon,
			msToDisplayToast,
			close,
			show,
			hasToastContentSlot,
		};
	},
};
</script>
