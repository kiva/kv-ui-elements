<template>
	<picture
		v-if="(width || height) && contentfulSrc && fallbackFormat"
		class="tw-inline-block"
	>
		<!-- Set of image sources -->
		<template v-if="sourceSizes.length > 0">
			<template v-for="(image, index) in sourceSizes">
				<!-- browser supports webp -->
				<source
					:key="'webp-image'+index"
					:media="'('+image.media+')'"
					type="image/webp"
					:srcset="`
					${buildUrl(image, 2)}&fit=${fit}&f=${focus}&fm=webp&q=65 2x,
					${buildUrl(image)}&fit=${fit}&f=${focus}&fm=webp&q=80 1x`"
				>
				<!-- browser doesn't support webp -->
				<source
					:key="'fallback-image'+index"
					:media="'('+image.media+')'"
					:srcset="`
						${buildUrl(image, 2)}&fit=${fit}&f=${focus}&fm=${fallbackFormat}&q=65 2x,
						${buildUrl(image)}&fit=${fit}&f=${focus}&fm=${fallbackFormat}&q=80 1x`"
				>
			</template>
			<!-- browser doesn't support picture element -->
			<img
				class="tw-max-w-full tw-max-h-full"
				:src="`${buildUrl(width, height)}&fit=${fit}&f=${focus}&fm=${fallbackFormat}&q=80`"
				:alt="alt"
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
				style="
					width: inherit;
					height: inherit;
					object-fit: inherit;
				"
				:srcset="`
					${buildUrl(null, 2)}&fit=${fit}&f=${focus}&fm=${fallbackFormat}&q=65 2x,
					${buildUrl()}&fit=${fit}&f=${focus}&fm=${fallbackFormat}&q=80 1x`"
				:src="`${buildUrl()}&fit=${fit}&f=${focus}&fm=${fallbackFormat}&q=80`"
				:width="width ? width : null"
				:height="height ? height : null"
				:alt="alt"
				:loading="loading"
			>
		</template>
	</picture>
</template>

<script>
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
				return ['jpg', 'png', 'webp'].indexOf(value) !== -1;
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
	methods: {
		buildUrl(image = null, multiplier = 1) {
			let src = image && image.url ? `${image.url}?` : `${this.contentfulSrc}?`;
			const width = image ? image.width : this.width;
			const height = image ? image.height : this.height;

			if (width) {
				src += `w=${width * multiplier}`;
			}
			if (width && height) {
				src += '&';
			}
			if (height) {
				src += `h=${height * multiplier}`;
			}
			return src;
		},
	},
};
</script>