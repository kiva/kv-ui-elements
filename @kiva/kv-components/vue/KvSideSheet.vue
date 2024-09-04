<template>
	<div
		v-if="visible"
		class="tw-hidden lg:tw-block tw-fixed tw-inset-0
            tw-bg-black tw-transition-all tw-duration-150 tw-z-modal tw-mt-8"
		:class="{
			'tw-bg-opacity-0 tw-delay-300': !open,
			'tw-bg-opacity-low': open,
		}"
		@click.self="closeSideSheet"
	>
		<div
			class="tw-absolute tw-right-0 tw-h-full tw-transition-all tw-duration-300 tw-bg-white"
			:class="{
				'tw-w-0 tw-p-0 tw-delay-200': !open,
				'tw-w-1/2 tw-p-2': open,
			}"
		>
			<div class="tw-flex tw-justify-between">
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
	},
	emits: [
		'side-sheet-closed',
	],
	setup(props, { emit }) {
		const {
			visible,
			kvTrackFunction,
			trackEventCategory,
		} = toRefs(props);

		const open = ref(false);

		const closeSideSheet = () => {
			open.value = false;
			kvTrackFunction.value(trackEventCategory.value, 'click', 'side-sheet-closed');
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
				}, '300');
			}
		});

		return {
			mdiClose,
			mdiLaunch,
			open,
			closeSideSheet,
			goToLink,
		};
	},
};
</script>
