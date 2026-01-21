<template>
	<div
		ref="userAvatar"
		class="data-hj-suppress tw-flex tw-items-center tw-justify-center tw-rounded-full tw-overflow-hidden"
		:class="{
			'tw-bg-brand': isAnonymousUser && theme === 'default',
			'tw-bg-brand-100': isAnonymousUser && theme === 'ecoGreenLight',
			[avatarClass]: !isAnonymousUser,
		}"
	>
		<!-- User is anonymous or data is missing -->
		<!-- Kiva K logo -->
		<!-- eslint-disable max-len -->
		<svg
			v-if="isAnonymousUser"
			:class="{
				'kiva-k__green-light': theme === 'ecoGreenLight',
				'kiva-k__white': theme === 'default',
				'kiva-k__small': isSmall,
				'kiva-k__normal': !isSmall
			}"
			viewBox="0 0 25 37"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M8.22861 0.875H0.857178V36.3125H8.22861V0.875Z"
			/>
			<path
				d="M10.1143 23.2751C21.9428 23.2751 24.6857 13.2126 24.6857 11.4626H23.6571C11.8286 11.4626 9.08569 21.5251 9.08569 23.2751H10.1143Z"
			/>
			<path
				d="M9.08569 24.2376C9.08569 26.0751 11.1428 36.3126 23.8285 36.3126H24.8571C24.8571 34.4751 22.8 24.2376 10.1143 24.2376H9.08569Z"
			/>
		</svg>
		<!-- eslint-enable max-len -->
		<!-- User is not anonymous and image is loading -->
		<kv-loading-placeholder
			v-show="!isAnonymousUser && userHasImage && isImageLoading"
		/>
		<!-- User is not anonymous and has an image -->
		<div
			v-if="!isAnonymousUser && userHasImage"
			class="tw-w-full tw-h-full"
			:style="showCssPlaceholder ? { display: 'var(--user-avatar-display, block)'} : {
				display: isImageLoading ? 'none' : 'block'
			}"
		>
			<img
				ref="imageRef"
				:src="lenderImageUrl"
				alt="Image of lender"
				class="tw-w-full"
				:style="showCssPlaceholder ? { content: 'var(--user-avatar)' } : {}"
				@load="onImgLoad()"
			>
		</div>
		<!-- User is not anonymous and does not have an image -->
		<!-- First Letter of lender name -->
		<svg
			v-if="!isAnonymousUser && !userHasImage"
			class="tw-w-full tw-h-full"
			fill="currentColor"
			:viewBox="letterViewBox"
		>
			<text
				x="50%"
				y="55%"
				dominant-baseline="middle"
				text-anchor="middle"
			>
				{{ lenderNameFirstLetter }}
			</text>
		</svg>
	</div>
</template>

<script lang="ts">
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
		 * Whether to render a smaller avatar
		 */
		isSmall: {
			type: Boolean,
			default: false,
		},
		/**
		 * Whether to use a css variable for the avatar url before data is loaded
		 */
		showCssPlaceholder: {
			type: Boolean,
			default: false,
		},
		theme: {
			type: String,
			default: 'default',
			validator(value: string) {
				// The value must match one of these strings
				return [
					'default',
					'ecoGreenLight',
				].indexOf(value) !== -1;
			},
		},
	},
	setup(props) {
		const {
			lenderName,
			lenderImageUrl,
			isSmall,
			showCssPlaceholder,
		} = toRefs(props);

		const isImageLoading = ref(true);
		const imageRef = ref(null);
		const userAvatar = ref(null);

		const isAnonymousUser = computed(() => {
			return (!showCssPlaceholder.value && lenderName.value === '' && lenderImageUrl.value === '')
				|| lenderName.value === 'Anonymous';
		});

		const avatarClass = computed(() => {
			const fontSize = isSmall?.value ? 'tw-font-sans tw-font-normal' : 'tw-font-serif';
			return `${randomizedUserAvatarClass(lenderName.value)} ${fontSize}`;
		});
		const letterViewBox = computed(() => {
			return isSmall?.value ? '0 0 27 27' : '0 0 27.5 27.5';
		});

		const userHasImage = computed(() => {
			if (showCssPlaceholder.value) {
				// when using css placeholder, assume user has image
				return true;
			}
			const imageFilename = lenderImageUrl?.value?.split('/').pop() ?? '';
			return imageFilename && !isLegacyPlaceholderAvatar(imageFilename);
		});

		const lenderNameFirstLetter = computed(() => {
			return lenderName?.value?.substring(0, 1).toUpperCase();
		});

		const onImgLoad = () => {
			isImageLoading.value = false;
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
			userHasImage,
			lenderNameFirstLetter,
			letterViewBox,
			isLegacyPlaceholderAvatar,
			isImageLoading,
			onImgLoad,
			imageRef,
			userAvatar,
		};
	},
};
</script>

<style lang="postcss" scoped>
.kiva-k__normal {
	height: 60%
}
.kiva-k__small {
	height: 70%
}
.kiva-k__white {
	@apply tw-fill-white;
}
.kiva-k__green-light {
	@apply tw-fill-eco-green-2;
}
</style>
