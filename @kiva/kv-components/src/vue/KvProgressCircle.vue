<template>
	<div>
		<!-- visually hidden, here for accessibility purposes -->
		<progress
			class="tw-sr-only"
			max="100"
			:value="value"
		>
		</progress>

		<div class="tw-w-full">
			<svg
				class="tw-block tw-overflow-visible"

				xmlns="http://www.w3.org/2000/svg"
				:viewBox="`0 0 ${radius * 2} ${radius * 2}`"
			>
				<!-- ring background -->
				<circle
					class="tw-origin-center tw-text-primary-inverse tw-stroke-current"
					:stroke-dasharray="circumference + ' ' + circumference"
					style="fill: transparent;
						stroke-linecap: round;
						transition: stroke-dashoffset 0.125s;"
					:style="{
						'strokeDashoffset': backgroundStrokeDashoffset,
						'transform': circleTransform
					}"
					:stroke-width="strokeWidth"
					:r="normalizedRadius"
					:cx="radius"
					:cy="radius"
				/>

				<!-- ring foreground -->
				<circle
					:class="`tw-origin-center tw-text-${color} tw-stroke-current`"
					:stroke-dasharray="circumference + ' ' + circumference"
					style="fill: transparent;
						stroke-linecap: round;
						transition: stroke-dashoffset 0.125s;"
					:style="{
						'strokeDashoffset': strokeDashoffset,
						'transform': circleTransform
					}"
					:stroke-width="strokeWidth"
					:r="normalizedRadius"
					:cx="radius"
					:cy="radius"
				/>

				<template v-if="showNumber">
					<defs>
						<!-- path the text should follow -->
						<path
							id="text_circle"
							:d="`
							M ${radius}, ${radius}
							m -${radius}, 0
							a ${radius},${radius} 0 1,1 ${radius * 2},0
							a ${radius},${radius} 0 1,1 -${radius * 2},0
						`"
							class="tw-text-transparent tw-fill-current tw-origin-center"
							:style="{
								'transform': `${textCircleTransform}`
							}"
						/>

						<!-- flipped path -->
						<path
							id="text_circle_flipped"
							:d="`
							M ${radius}, ${radius}
							m -${radius}, 0
							a ${radius},${radius} 0 1,0 ${radius * 2},0
							a ${radius},${radius} 0 1,0 -${radius * 2},0
						`"
							class="tw-text-transparent tw-fill-current tw-origin-center"
							:style="{
								'transform': `${textCircleTransform}`
							}"
						/>
					</defs>

					<!-- text background which acts as a stroke -->
					<text
						class="kv-progress-circle__ring-text-backdrop tw-text-white tw-fill-current tw-stroke-current"
						style="paint-order: stroke;
							stroke-width: 0.675em;
							stroke-linecap: butt;
							stroke-linejoin: round;
							font-weight: 900;
							text-anchor: start;
							letter-spacing: 0.1em;"
						:dy="textDy"
						:dx="textDx"
						:font-size="fontSize"
					>
						<textPath
							:xlink:href="`#text_circle${flipText ? '_flipped' : ''}`"
						>
							{{ value }}%
						</textPath>
					</text>

					<!-- text foreground -->
					<text
						:class="`kv-progress-circle__ring-text tw-text-${color} tw-fill-current tw-stroke-current`"
						style="font-weight: 900;
							text-anchor: start;
							letter-spacing: 0.1em;"
						:dy="textDy"
						:dx="textDx"
						:font-size="fontSize"
					>
						<textPath
							:xlink:href="`#text_circle${flipText ? '_flipped' : ''}`"
						>
							{{ value }}%
						</textPath>
					</text>
				</template>
			</svg>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, ref } from 'vue';

export default {
	name: 'KvProgressCircle',
	props: {
		/**
         * Value of the progress circle, between 0 and 100.
         * */
		value: {
			type: Number,
			required: true,
			validator(val: number) {
				return val >= 0 && val <= 100;
			},
		},
		/**
		 * Create an arc instead of a full circle. A percent.
		 * */
		arcScale: {
			type: Number,
			default: 1,
		},
		/**
		 * Degrees to rotate the circle, used in tandem with arcScale.
		 * */
		rotate: {
			type: Number,
			default: 0,
		},
		/**
		 * Stroke width as a percent of the circle
		 * */
		strokeWidth: {
			default: 8,
			type: Number,
		},
		/**
		 * Whether to show the value as a number
		 * */
		showNumber: {
			default: false,
			type: Boolean,
		},
		/**
		 * Color of the progress circle
		 * */
		color: {
			type: String,
			default: 'brand',
		},
	},
	setup(props) {
		const radius = ref(100);

		const fontSize = computed(() => props.strokeWidth * 3);

		const normalizedRadius = computed(() => radius.value - (props.strokeWidth / 2));

		const circumference = computed(() => normalizedRadius.value * 2 * Math.PI);

		const strokeDashoffset = computed(() => circumference.value - (props.value / 100) * circumference.value * props.arcScale); // eslint-disable-line max-len

		const backgroundStrokeDashoffset = computed(() => circumference.value - 1 * circumference.value * props.arcScale); // eslint-disable-line max-len

		const circleTransform = computed(() => {
			const offset = 90;
			return `rotate(${offset + props.rotate}deg)`;
		});

		const textCircleTransform = computed(() => {
			const offset = -90;
			return `rotate(${offset + props.rotate}deg)`;
		});

		const flipText = computed(() => props.value > 75 || props.value < 25);

		const textDx = computed(() => {
			if (flipText.value) {
				return circumference.value - (props.value / 100) * circumference.value * props.arcScale;
			}
			return (props.value / 100) * circumference.value * props.arcScale;
		});

		const textDy = computed(() => {
			if (flipText.value) {
				return 0;
			}
			return fontSize.value * 0.625;
		});

		return {
			radius,
			fontSize,
			normalizedRadius,
			circumference,
			strokeDashoffset,
			backgroundStrokeDashoffset,
			circleTransform,
			textCircleTransform,
			flipText,
			textDx,
			textDy,
		};
	},
};
</script>

<style lang="postcss" scoped>
/* Firefox doesn't support text on paths with stroke, so we hide the text and backdrop if we detect Firefox. */
@supports (-moz-appearance:none) {
    .kv-progress-circle__ring-text,
    .kv-progress-circle__ring-text-backdrop {
        display: none;
    }
}
</style>
