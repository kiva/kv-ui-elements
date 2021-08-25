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
									messageType === '' || messageType === 'confirmation'
								),
								'tw-bg-danger tw-text-primary-inverse' : messageType === 'error',
								'tw-bg-caution tw-text-black' : messageType === 'warning',
							}"
						>
							<kv-material-icon
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
							<p
								class="tw-inline-block tw-m-auto"
								v-html="message"
							>
							</p>
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
	data() {
		return {
			isVisible: false,
			message: '',
			messageType: 'confirmation', // 'error', 'info', 'confirmation'
			persist: false,
			timeout: null,
			mdiClose,
		};
	},
	computed: {
		icon() {
			if (this.messageType === 'warning') {
				return mdiAlert;
			}
			if (this.messageType === 'error') {
				return mdiAlertCircle;
			}
			return mdiCheckCircle;
		},
		msToDisplayToast() {
			const MINIMUM_MS = 5000;
			const MS_PER_CHARACTER = 100;

			// create an empty span to get the character count without HTML
			const span = document.createElement('span');
			span.innerHTML = this.message;
			const characterCount = span.innerText.length;

			const characterMs = MS_PER_CHARACTER * characterCount;
			return Math.max(characterMs, MINIMUM_MS);
		},
	},
	methods: {
		show(message, type, persist) {
			this.isVisible = true;
			this.message = typeof message === 'string' ? message : '';
			this.messageType = typeof type === 'string' ? type : '';
			this.persist = Boolean(persist);

			if (!this.persist) {
				this.timeout = setTimeout(() => {
					this.close();
				}, this.msToDisplayToast);
			}
		},
		close() {
			this.isVisible = false;
			clearTimeout(this.timeout);

			/**
			* Indicates the toast has closed by a user or after timeout
			* @event close
			*/
			this.$emit('close');
		},
	},
};
</script>
