<template>
	<div
		v-if="visible"
		class="tw-block lg:tw-mt-0 tw-fixed tw-inset-0
            tw-bg-black tw-transition-all md:tw-duration-150 tw-z-modal"
		:class="{
			'tw-bg-opacity-0 tw-delay-300': !open,
			'tw-bg-opacity-low': open,
		}"
		@click.self="closeSideSheet"
	>
		<div
			class="tw-fixed tw-right-0 tw-transition-all tw-duration-300 tw-bg-white tw-overflow-y-auto"
			:class="{
				'tw-w-0 tw-delay-200 tw-opacity-0': !open,
				'lg:tw-w-1/2 tw-w-full tw-opacity-full': open,
				'tw-h-full': $slots.controls,
			}"
		>
			<div
				class="tw-relative tw-h-full"
				:style="modalStyles"
			>
				<div
					class="tw-flex tw-justify-between tw-transition-opacity tw-duration-500 tw-delay-200
					tw-px-3 tw-py-2 tw-border-tertiary"
					:class="{
						'tw-opacity-0': !open,
						'tw-opacity-full': open,
						'tw-border-b': showHeadlineBorder
					}"
				>
					<div
						class="tw-flex tw-gap-1.5"
					>
						<button
							v-if="showBackButton"
							class="hover:tw-text-action-highlight tw-flex tw-items-center tw-justify-center"
							@click="closeSideSheet"
						>
							<kv-material-icon
								class="tw-w-3 tw-h-3"
								:icon="mdiArrowLeft"
							/>
						</button>
						<h2 v-if="headline">
							{{ headline }}
						</h2>
					</div>

					<div class="tw-flex tw-gap-1.5">
						<button
							v-if="showGoToLink"
							class="hover:tw-text-action-highlight tw-flex tw-items-center tw-justify-center"
							@click="goToLink"
						>
							<kv-material-icon
								class="tw-w-3 tw-h-3"
								:icon="mdiExportVariant"
							/>
						</button>
						<button
							class="hover:tw-text-action-highlight tw-flex tw-items-center tw-justify-center"
							@click="closeSideSheet"
						>
							<kv-material-icon
								class="tw-w-3 tw-h-3"
								:icon="mdiClose"
							/>
						</button>
					</div>
				</div>
				<div
					class="tw-p-2 tw-overflow-y-auto tw-transition-opacity tw-duration-500 tw-delay-200
						tw-overscroll-y-contain"
					:class="{
						'tw-opacity-0': !open,
						'tw-opacity-full': open,
					}"
				>
					<slot></slot>
				</div>
				<div
					v-if="$slots.controls"
					ref="controlsRef"
					class="tw-absolute tw-border-t tw-border-tertiary tw-w-full tw-bottom-0 tw-bg-white"
					:class="{
						'tw-opacity-0': !open,
						'tw-opacity-full': open,
					}"
				>
					<slot name="controls"></slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, toRefs, watch } from 'vue';
import {
	mdiClose, mdiArrowLeft, mdiExportVariant,
} from '@mdi/js';
import KvMaterialIcon from './KvMaterialIcon.vue';

export default {
	name: 'KvSideSheet',
	components: {
		KvMaterialIcon,
	},
	props: {
		/**
		 * Whether the side sheet is open or not
		 * */
		visible: {
			type: Boolean,
			default: false,
		},
		/**
		 * Show the go to link button
		 * */
		showBackButton: {
			type: Boolean,
			default: false,
		},
		/**
		 * Show the go to link button
		 * */
		showGoToLink: {
			type: Boolean,
			default: false,
		},
		showHeadlineBorder: {
			type: Boolean,
			default: true,
		},
		/**
		 * Tracking event function
		 * */
		kvTrackFunction: {
			type: Function,
			default: () => ({}),
		},
		/**
		 * Tracking event category
		 * */
		trackEventCategory: {
			type: String,
			default: '',
		},
		/**
		 * Source element position for expand animation
		 */
		animationSourceElement: {
			type: Object,
			default: () => ({}),
		},
		/**
		 * The headline of the side sheet
		 */
		headline: {
			type: String,
			default: '',
		},
	},
	emits: [
		'side-sheet-closed',
	],
	setup(props, { emit }) {
		const {
			visible,
			kvTrackFunction,
			trackEventCategory,
			animationSourceElement,
		} = toRefs(props);

		const open = ref(false);
		const initialStyles = ref({});
		const modalStyles = ref({});
		let onKeyUp = null;

		const avoidBodyScroll = () => {
			const bodyClasses = 'tw-overflow-hidden';
			if (open.value) {
				document.body.classList.add(bodyClasses);
			} else {
				document.body.classList.remove(bodyClasses);
			}
		};

		const closeSideSheet = () => {
			open.value = false;
			avoidBodyScroll();
			kvTrackFunction.value(trackEventCategory.value, 'click', 'side-sheet-closed');

			if (animationSourceElement.value) {
				modalStyles.value = {
					...initialStyles.value,
					transition: 'all 0.5s ease-in-out',
				};
			}

			setTimeout(() => {
				emit('side-sheet-closed');
			}, '700');

			document.removeEventListener('keyup', onKeyUp);
		};

		const goToLink = () => {
			emit('go-to-link');
		};

		onKeyUp = (e) => {
			if (!!e && e.key === 'Escape') {
				closeSideSheet();
			}
		};

		watch(visible, () => {
			if (visible.value) {
				document.addEventListener('keyup', onKeyUp);

				setTimeout(() => {
					open.value = true;
					avoidBodyScroll();
				}, 100);

				const rect = animationSourceElement.value?.getBoundingClientRect();

				const top = rect?.top ?? 0;
				const left = rect?.left ?? 0;
				const width = rect?.width ?? 0;
				const height = rect?.height ?? 0;

				if (top || left || width || height) {
					initialStyles.value = {
						position: 'fixed',
						top: `${top}px`,
						width: `${width}px`,
						height: `${height}px`,
					};

					modalStyles.value = {
						...initialStyles.value,
						transition: 'none',
					};

					setTimeout(() => {
						modalStyles.value = {
							top: '0',
							width: '100%',
							height: '100%',
							transition: 'all 0.5s ease-in-out',
						};
					}, 10);
				} else {
					modalStyles.value = {};
				}
			}
		});

		return {
			mdiClose,
			mdiArrowLeft,
			mdiExportVariant,
			open,
			closeSideSheet,
			goToLink,
			modalStyles,
		};
	},
};
</script>
