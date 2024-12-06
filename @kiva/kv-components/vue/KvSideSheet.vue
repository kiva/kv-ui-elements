<template>
	<div
		v-if="visible"
		class="tw-block tw-fixed lg:tw-mt-0 md:tw-absolute tw-inset-0
            tw-bg-black tw-transition-all md:tw-duration-150 tw-z-modal"
		:class="{
			'tw-bg-opacity-0 tw-delay-300': !open,
			'tw-bg-opacity-low': open,
		}"
		@click.self="closeSideSheet"
	>
		<div
			class="tw-absolute tw-right-0 tw-h-full tw-transition-all tw-duration-300 tw-bg-white"
			:class="{
				'tw-w-0 tw-p-0 tw-delay-200': !open && !expandEffect,
				'lg:tw-w-1/2 tw-w-full tw-p-2': open && !expandEffect,
				'tw-w-full tw-overflow-hidden': expandEffect
			}"
			:style="modalStyles"
			@transitionend="onTransitionEnd"
		>
			<div
				class="tw-flex tw-justify-between"
				:class="{'tw-hidden': !open && expandEffect}"
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
		 * Give an effect of expand and shrink on the sheet
		 */
		expandEffect: {
			type: Boolean,
			default: false,
		},
		/**
		 * Only used when expandEffect is true to set initial position where sheet will be expanded
		 */
		initialStyles: {
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
			expandEffect,
			initialStyles,
		} = toRefs(props);

		const open = ref(false);
		const animating = ref(false);

		const modalStyles = ref({});

		if (expandEffect.value) {
			modalStyles.value = {
				...initialStyles,
				transition: 'none',
			};
		}

		const closeSideSheet = () => {
			open.value = false;
			kvTrackFunction.value(trackEventCategory.value, 'click', 'side-sheet-closed');

			if (expandEffect.value) {
				animating.value = true;

				modalStyles.value = {
					...initialStyles.value,
					transition: 'all 0.7s ease-in-out',
				};
			}

			setTimeout(() => {
				emit('side-sheet-closed');
				animating.value = false;
			}, '700');
		};

		const goToLink = () => {
			emit('go-to-link');
		};

		const onTransitionEnd = () => {
			animating.value = false;
		};

		watch(visible, () => {
			if (visible.value) {
				setTimeout(() => {
					open.value = true;
				}, '300');

				if (expandEffect.value) {
					animating.value = true;
					setTimeout(() => {
						modalStyles.value = {
							top: '0',
							left: '0',
							width: '100vw',
							height: '100vh',
							transition: 'all 0.5s ease-in-out',
						};
					}, 100);
				}
			}
		});

		watch(initialStyles, (newStyles) => {
			modalStyles.value = {
				...newStyles,
				transition: 'none',
			};
		});

		return {
			mdiClose,
			mdiLaunch,
			open,
			closeSideSheet,
			goToLink,
			onTransitionEnd,
			modalStyles,
			animating,
		};
	},
};
</script>
