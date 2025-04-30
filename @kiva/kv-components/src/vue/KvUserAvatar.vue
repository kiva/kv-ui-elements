<template>
	<div
		id="kv-user-avatar"
		class="data-hj-suppress tw-flex"
		:class="{ 'tw-w-3': isSmall, 'tw-w-6': !isSmall }"
	>
		<!-- User is anonymous or data is missing -->
		<div
			v-if="isAnonymousUser"
			class="
				tw-rounded-full
				tw-bg-brand
				tw-inline-flex tw-align-center tw-justify-center
			"
			:class="{ 'tw-w-3 tw-h-3': isSmall, 'tw-w-6 tw-h-6': !isSmall }"
		>
			<!-- Kiva K logo -->
			<!-- eslint-disable max-len -->
			<svg
				class="tw-h-full tw-text-brand"
				:class="{ 'tw-w-3 tw-h-3': isSmall }"
				width="25"
				height="37"
				viewBox="0 0 25 37"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M8.22861 0.875H0.857178V36.3125H8.22861V0.875Z"
					fill="white"
				/>
				<path
					d="M10.1143 23.2751C21.9428 23.2751 24.6857 13.2126 24.6857 11.4626H23.6571C11.8286 11.4626 9.08569 21.5251 9.08569 23.2751H10.1143Z"
					fill="white"
				/>
				<path
					d="M9.08569 24.2376C9.08569 26.0751 11.1428 36.3126 23.8285 36.3126H24.8571C24.8571 34.4751 22.8 24.2376 10.1143 24.2376H9.08569Z"
					fill="white"
				/>
			</svg>
			<!-- eslint-enable max-len -->
		</div>
		<!-- User is not anonymous and has an image -->
		<div
			v-else-if="!isLegacyPlaceholderAvatar(imageFilename) && imageFilename"
		>
			<kv-loading-placeholder
				v-if="isLoading"
				:style="{
					width: isSmall ? '1.5rem' : '3rem',
					height: isSmall ? '1.5rem' : '3rem',
				}"
				class="!tw-rounded-full"
			/>
			<img
				v-show="!isLoading"
				ref="imageRef"
				:src="lenderImageUrl"
				alt="Image of lender"
				class="tw-rounded-full tw-inline-block"
				:class="{ 'tw-w-3 tw-h-3': isSmall, 'tw-w-6 tw-h-6': !isSmall }"
				@load="onImgLoad()"
			>
		</div>
		<!-- User is not anonymous and does not have an image -->
		<div
			v-else-if="isLegacyPlaceholderAvatar(imageFilename) || !imageFilename"
			class="
				tw-rounded-full
				tw-inline-flex tw-align-center tw-justify-center
			"
			:class="avatarClass()"
		>
			<!-- First Letter of lender name -->
			<span class="tw-self-center">
				{{ lenderNameFirstLetter }}
			</span>
		</div>
	</div>
</template>

<script>
import {
	computed, toRefs, ref, onMounted,
} from 'vue';
import { isLegacyPlaceholderAvatar, randomizedUserAvatarClass } from '../utils/imageUtils';
import KvLoadingPlaceholder from './KvLoadingPlaceholder.vue';

export default {
	name: 'KvUserAvatar',
	components: {
		KvLoadingPlaceholder,
	},
	props: {
		/**
		 * The name of the lender
		 */
		lenderName: {
			type: String,
			default: '',
		},
		/**
		 * The image of the lender
		 */
		lenderImageUrl: {
			type: String,
			default: '',
		},
		/**
		 * The image of the lender
		 */
		isSmall: {
			type: Boolean,
			default: false,
		},
	},
	setup(props) {
		const {
			lenderName,
			lenderImageUrl,
			isSmall,
		} = toRefs(props);

		const isLoading = ref(true);
		const imageRef = ref(null);

		const isAnonymousUser = computed(() => {
			return (lenderName.value === '' && lenderImageUrl.value === '') || lenderName.value === 'Anonymous';
		});

		const avatarClass = () => {
			const smallClass = isSmall?.value ? 'tw-w-3 tw-h-3 tw-text-h4' : 'tw-w-6 tw-h-6 tw-text-h2';
			return `${randomizedUserAvatarClass(lenderName.value)} ${smallClass}`;
		};

		const imageFilename = computed(() => {
			return lenderImageUrl?.value?.split('/').pop() ?? '';
		});

		const lenderNameFirstLetter = computed(() => {
			return lenderName?.value?.substring(0, 1).toUpperCase();
		});

		const onImgLoad = () => {
			isLoading.value = false;
		};

		const waitForImageToComplete = (img, timeout = 10000) => {
			return new Promise((resolve, reject) => {
				const deadline = Date.now() + timeout;
				const check = () => {
					if (!img || img.complete) {
						resolve(img);
					} else if (Date.now() > deadline) {
						reject(new Error(`Timeout: ${img.src}`));
					} else {
						setTimeout(check, 50);
					}
				};

				check();
			});
		};

		onMounted(async () => {
			const img = imageRef.value;
			try {
				await waitForImageToComplete(img);
				onImgLoad();
			} catch (err) {
				console.log(err.message);
			}
		});

		return {
			isAnonymousUser,
			avatarClass,
			imageFilename,
			lenderNameFirstLetter,
			isLegacyPlaceholderAvatar,
			isLoading,
			onImgLoad,
			imageRef,
		};
	},
};
</script>
