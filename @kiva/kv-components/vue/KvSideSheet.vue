<template>
	<div
		v-if="visible"
		class="tw-block lg:tw-mt-0 tw-absolute tw-inset-0
            tw-bg-black tw-transition-all md:tw-duration-150 tw-z-modal"
		:class="{
			'tw-bg-opacity-0 tw-delay-300': !open,
			'tw-bg-opacity-low': open,
		}"
		@click.self="closeSideSheet"
	>
		<div
			class="tw-absolute tw-right-0 tw-transition-all tw-duration-300 tw-bg-white
				tw-overflow-y-auto tw-p-2"
			:class="{
				'tw-w-0 tw-delay-200 tw-opacity-0': !open,
				'lg:tw-w-1/2 tw-w-full tw-opacity-full': open,
			}"
			:style="modalStyles"
		>
			<div
				class="tw-flex tw-justify-between tw-transition-opacity tw-duration-500 tw-delay-200"
				:class="{
					'tw-opacity-0': !open,
					'tw-opacity-full': open,
				}"
			>
				<button
					class="hover:tw-text-action-highlight"
					@click="closeSideSheet"
				>
					<kv-material-icon
						class="tw-w-3 tw-h-3"
						:icon="mdiClose"
					/>
				</button>

				<button
					v-if="showGoToLink"
					class="hover:tw-text-action-highlight"
					@click="goToLink"
				>
					<kv-material-icon
						class="tw-w-3 tw-h-3"
						:icon="mdiLaunch"
					/>
				</button>
			</div>
			<div
				class="tw-p-4 tw-overflow-y-auto tw-transition-opacity tw-duration-500 tw-delay-200"
				:class="{
					'tw-opacity-0': !open,
					'tw-opacity-full': open,
				}"
			>
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, toRefs, watch } from 'vue-demi';
import { mdiClose, mdiLaunch } from '@mdi/js';
import KvMaterialIcon from './KvMaterialIcon.vue';

export default {
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
		showGoToLink: {
			type: Boolean,
			default: false,
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
		const userScrollPosition = ref(0);

		const closeSideSheet = () => {
			open.value = false;
			kvTrackFunction.value(trackEventCategory.value, 'click', 'side-sheet-closed');

			if (animationSourceElement.value && window.scrollTo) {
				window.scrollTo({
					top: userScrollPosition.value,
					behavior: 'smooth',
				});

				modalStyles.value = {
					...initialStyles.value,
					transition: 'all 0.5s ease-in-out',
				};
			}

			setTimeout(() => {
				emit('side-sheet-closed');
			}, '700');
		};

		const goToLink = () => {
			emit('go-to-link');
		};

		watch(visible, () => {
			if (visible.value) {
				setTimeout(() => {
					open.value = true;
				}, 100);

				const rect = animationSourceElement.value?.getBoundingClientRect();

				const top = rect?.top ?? 0;
				const left = rect?.left ?? 0;
				const width = rect?.width ?? 0;
				const height = rect?.height ?? 0;

				if (top || left || width || height) {
					userScrollPosition.value = window.scrollY ?? 0;

					initialStyles.value = {
						position: 'fixed',
						top: `${top}px`,
						left: `${left}px`,
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
							left: '0',
							width: '100vw',
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
			mdiLaunch,
			open,
			closeSideSheet,
			goToLink,
			modalStyles,
		};
	},
};
</script>
