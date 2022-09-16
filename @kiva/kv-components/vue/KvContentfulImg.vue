<template>
	<figure
		v-if="(width || height) && contentfulSrc"
		class="tw-inline-block"
	>
		<picture>
			<!-- Set of image sources -->
			<template v-if="sourceSizes.length > 0">
				<!-- browser supports webp -->
				<source
					v-for="(image, index) in sourceSizes"
					:key="'webp-image'+index"
					:media="'('+image.media+')'"
					type="image/webp"
					:width="image.width ? image.width : null"
					:height="image.height ? image.height : null"
					:srcset="`
						${buildUrl(image, 2)}&fit=${fit}&f=${focus}&fm=webp&q=65 2x,
						${buildUrl(image)}&fit=${fit}&f=${focus}&fm=webp&q=80 1x`"
				>
				<!-- browser doesn't support webp -->
				<source
					v-for="(image, index) in sourceSizes"
					:key="'fallback-image'+index"
					:media="'('+image.media+')'"
					:width="image.width ? image.width : null"
					:height="image.height ? image.height : null"
					:srcset="`
						${buildUrl(image, 2)}&fit=${fit}&f=${focus}&fm=${fallbackFormat}&q=65 2x,
						${buildUrl(image)}&fit=${fit}&f=${focus}&fm=${fallbackFormat}&q=80 1x`"
				>
				<!-- browser doesn't support picture element -->
				<img
					class="tw-max-w-full tw-max-h-full"
					style="width: inherit; height: inherit; object-fit: inherit;"
					:src="`${buildUrl(width, height)}&fit=${fit}&f=${focus}&fm=${fallbackFormat}&q=80`"
					:alt="caption || alt"
					:loading="loading"
				>
			</template>

			<!-- Single image -->
			<template v-if="sourceSizes.length === 0">
				<!-- browser supports webp -->
				<source
					type="image/webp"
					:srcset="`
						${buildUrl(null, 2)}&fit=${fit}&f=${focus}&fm=webp&q=65 2x,
						${buildUrl()}&fit=${fit}&f=${focus}&fm=webp&q=80 1x`"
				>
				<!-- browser doesn't support webp or browser doesn't support picture element -->
				<img
					class="tw-max-w-full tw-max-h-full"
					style="width: inherit; height: inherit; object-fit: inherit;"
					:srcset="`
						${buildUrl(null, 2)}&fit=${fit}&f=${focus}&fm=${fallbackFormat}&q=65 2x,
						${buildUrl()}&fit=${fit}&f=${focus}&fm=${fallbackFormat}&q=80 1x`"
					:src="`${buildUrl()}&fit=${fit}&f=${focus}&fm=${fallbackFormat}&q=80`"
					:width="width ? width : null"
					:height="height ? height : null"
					:alt="caption || alt"
					:loading="loading"
				>
			</template>
		</picture>
		<figcaption
			v-if="caption"
			class="tw-text-h4 tw-mt-2"
		>
			<span
				class="tw-inline-flex tw-align-text-top"
				aria-hidden="true"
				role="img"
			>
				<svg
					class="tw-h-2 tw-w-2"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<!-- eslint-disable max-len -->
					<path
						d="m3.12088 18.7441c12.86212 0 15.87912-14.52631 15.87912-16.99996h-1.1209c-12.85272 0-15.8791 14.51376-15.8791 16.99996z"
						fill="currentColor"
					/>
					<!-- eslint-enable max-len -->
				</svg>
			</span>
			{{ caption }}
		</figcaption>
	</figure>
</template>

<script>
import { computed, toRefs } from 'vue-demi';
// Since it's easy for marketing or other to upload massive images to contentful,
// in order to be performant respectful of our users data plans, and not damage
// our SEO, we shouldn't send the source image directly to our users.

// This component uses to contentful's image query params to:
// Serve webp with a fallback for older browsers.
// Offer both 1x and 2x images.
// Properly size the images and make sure they're compressed.
// Crop images around focus area.
// If we have both width and height we pass those attributes to the image to prevent jank.
// Allow lazy loading via image attribute.

export default {
	props: {
		/**
		 * Large, uncompressed image url that you get back from contentful.
		* */
		contentfulSrc: {
			type: String,
			required: true,
		},
		/**
		 * If the browser can't support webp we fallback to this image format.
		 * `jpg, png, webp`
		* */
		fallbackFormat: {
			type: String,
			default: 'jpg',
			validator(value) {
				// The value must match one of these strings
				return ['jpg', 'png', 'gif'].indexOf(value) !== -1;
			},
		},
		/**
		 * 1x width of the image. Width or height must be defined. Ideally both.
		* */
		width: {
			type: [String, Number],
			default: null,
		},
		/**
		 * 1x height of the image. Width or height must be defined. Ideally both.
		* */
		height: {
			type: [String, Number],
			default: null,
		},
		/**
		 * Alt text for the image
		* */
		alt: {
			type: String,
			default: '',
		},
		/**
		 * Loading hint to the browser - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading
		 * `lazy, eager`
		* */
		loading: {
			type: String,
			default: null,
			validator(value) {
				// The value must match one of these strings
				return ['lazy', 'eager'].indexOf(value) !== -1;
			},
		},
		/**
		 * Focus area when modifying images. Focus area has no effect on the default 'scale' fit.
		 * https://www.contentful.com/developers/docs/references/images-api/#/reference/resizing-&-cropping/specify-focus-area
		* */
		focus: {
			type: String,
			default: 'center',
			validator(value) {
				// The value must match one of these strings
				return ['center', 'top', 'right', 'left', 'bottom', 'top_right', 'top_left', 'bottom_right', 'bottom_left', 'face', 'faces'].indexOf(value) !== -1;
			},
		},
		/**
		 * Focus area when modifying images. Focus area has no effect on the default 'scale' fit.
		 * https://www.contentful.com/developers/docs/references/images-api/#/reference/resizing-&-cropping/change-the-resizing-behavior
		* */
		fit: {
			type: String,
			default: 'scale',
			validator(value) {
				// The value must match one of these strings
				return ['pad', 'fill', 'scale', 'crop', 'thumb'].indexOf(value) !== -1;
			},
		},
		/**
		 * Sources sizes.
		 * Array of objects for different image sources.
		 * Sample object:
		 * 		{
					width: 1440,
					height: 620,
					media: 'min-width: 1025px',
					url: '//some-protocol-relative-contentful-url'
				}
		* */
		sourceSizes: {
			type: Array,
			required: false,
			default: () => [],
		},
	},
	setup(props) {
		const {
			alt,
			contentfulSrc,
			width,
			height,
		} = toRefs(props);

		const buildUrl = (image = null, multiplier = 1) => {
			let src = image && image.url ? `${image.url}?` : `${contentfulSrc.value}?`;
			const imgWidth = image ? image.width : width.value;
			const imgHeight = image ? image.height : height.value;

			if (imgWidth) {
				src += `w=${imgWidth * multiplier}`;
			}
			if (imgWidth && imgHeight) {
				src += '&';
			}
			if (imgHeight) {
				src += `h=${imgHeight * multiplier}`;
			}
			return src;
		};

		const caption = computed(() => {
			if (alt.value && alt.value.charAt(0) === '^') {
				return alt.value.slice(1).trim();
			}
			return '';
		});

		return {
			buildUrl,
			caption,
		};
	},
};
</script>
