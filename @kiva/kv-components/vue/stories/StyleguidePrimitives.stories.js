import resolveConfig from 'tailwindcss/resolveConfig'; // eslint-disable-line import/no-extraneous-dependencies
import tailwindConfig from '@kiva/kv-tokens/configs/tailwind.config';
import { textStyles } from '@kiva/kv-tokens/configs/kivaTypography';
import KvPageContainer from '../KvPageContainer.vue';
import KvGrid from '../KvGrid.vue';

const { headerNumberCase, kebabCase, removeObjectProperty } = require('../../utils/themeUtils');

const config = resolveConfig(tailwindConfig);
const { theme } = config;

function buildValuesFromThemeObj(initialObj) {
	const arr = [];
	const iterate = (obj, prefix = '') => {
		Object.keys(obj).forEach((key) => {
			if (typeof obj[key] === 'object') {
				iterate(obj[key], key);
			} else {
				const niceKey = prefix ? `${prefix}-${key}` : key;
				arr.push([niceKey, obj[key]]);
			}
		});
	};
	iterate(initialObj);
	return arr;
}

export default {
	title: 'BaseStyling',
};

export const Primitives = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvPageContainer, KvGrid },
	template: `
	<kv-page-container>
		<h1 class="tw-mt-4">Primitives</h1>
		<section class="tw-py-8">
			<h2 class="tw-mb-4">Colors</h2>

			<kv-grid
				as="ul"
				class="tw-grid-cols-3 md:tw-grid-cols-4 lg:tw-grid-cols-5"
			>
				<li
					v-for="color in colors"
					:key="buildClassName('bg', color[0])"
				>
					<button
						class="tw-flex tw-flex-col tw-h-full tw-w-full tw-text-left tw-border tw-rounded tw-p-1.5 tw-border-gray-300 tw-font-book hover:tw-text-action-700"
						@click="copy(buildClassName('tw-bg', color[0]))"
					>
						<div
							class="tw-w-full tw-h-0 tw-block tw-mb-1"
							style="padding-bottom: 100%;"
							:class="buildClassName('tw-bg', color[0])"
						>
						</div>
						<div class="tw-w-full">
							.{{buildClassName('tw-bg', color[0])}}
							<br><small class="tw-text-gray-500">{{color[1]}}</small>
						</div>
					</button>
				</li>
			</kv-grid>

		</section>
		<hr>
		<section class="tw-py-8">
			<h2 class="tw-mb-4">Text Styles</h2>
			<ul class="tw-flex tw-flex-wrap tw-flex-col tw-gap-4">
				<li
					v-for="typeStyle in kivaTypography"
					:key="buildClassName('text', typeStyle)"
					class="tw-overflow-x-auto tw-w-full"
				>
					<button
						class="tw-text-left tw-font-book hover:tw-text-action-700"
						@click="copy(buildClassName('text', typeStyle))"
					>
						<p
							class="tw-mb-1"
							:class="buildClassName('tw-text', typeStyle)"
							style="width: 12em;"
						>
							The quick brown fox jumps over the lazy dog
						</p>
						<span>.{{buildClassName('tw-text', typeStyle)}}</span>
					</button>
				</li>
			</ul>
		</section>
		<hr>
		<section class="tw-py-8">
			<h2 class="tw-mb-4">Font Weights</h2>
			<ul class="tw-flex tw-flex-wrap tw-flex-col tw-gap-4">
				<li
					v-for="fontWeight in fontWeights"
					:key="buildClassName('tw-font', fontWeight[0])"
				>
					<button
						class="tw-text-left tw-font-book hover:tw-text-action-700"
						@click="copy(buildClassName('tw-font', fontWeight[0]))"
					>
						<p :class="buildClassName('tw-font', fontWeight[0])">
							The quick brown fox jumps over the lazy dog
						</p>
						<span>.{{buildClassName('tw-font', fontWeight[0])}}</span>
					</button>
				</li>
			</ul>
		</section>
		<hr>
		<section class="tw-py-8">
			<h2 class="tw-mb-4">Radii</h2>

			<kv-grid
				as="ul"
				class="tw-grid-cols-3 md:tw-grid-cols-4 lg:tw-grid-cols-5"
			>
				<li
					v-for="radius in radii"
					:key="buildClassName('tw-rounded', radius[0])"
				>
					<button
						class="tw-flex tw-flex-col tw-text-left tw-border tw-rounded tw-p-1.5 tw-w-full tw-h-full tw-border-gray-300 tw-font-book hover:tw-text-action-700"
						@click="copy(buildClassName('tw-rounded', radius[0]))"
					>
						<div
							class="tw-bg-gray-300 tw-w-full tw-h-0 tw-mb-1"
							style="padding-bottom: 100%;"
							:class="buildClassName('tw-rounded', radius[0])"
						></div>
						<div>
							.{{buildClassName('tw-rounded', radius[0])}}
							<br><small class="tw-text-gray-500">({{remToPx(radius[1])}}px)</small>
						</div>
					</button>
				</li>
			</kv-grid>

		</section>
		<hr>
		<section class="tw-py-8">
			<h2 class="tw-mb-4">Opacity</h2>
			<kv-grid as="ul" class="tw-grid-cols-3 md:tw-grid-cols-4 lg:tw-grid-cols-5">
				<li
					v-for="opacityItem in opacity"
					:key="buildClassName('tw-opacity', opacityItem[0])"
				>
					<button
						class="tw-flex tw-flex-col tw-text-left tw-border tw-rounded tw-p-1.5 tw-w-full tw-h-full tw-border-gray-300 tw-font-book hover:tw-text-action-700"
						@click="copy(buildClassName('tw-opacity', opacityItem[0]))"
					>
						<div
							class="tw-bg-gray-300 tw-w-full tw-h-0 tw-mb-1"
							:class="buildClassName('tw-opacity', opacityItem[0])"
							style="background-image: linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet, red); padding-bottom: 100%;"
						></div>
						<div>
							.{{buildClassName('tw-opacity', opacityItem[0])}}<br>
							<small class="tw-text-gray-500">({{opacityItem[1]}})</small>
						</div>
					</button>
				</li>
			</kv-grid>
		</section>
		<hr>
		<section class="tw-py-8">
			<h2 class="tw-mb-4">Space</h2>
			<ul class="tw-flex tw-flex-wrap tw-flex-col tw-gap-4">
				<li
					v-for="spaceItem in space"
					class="block"
					:key="buildClassName('tw-w', spaceItem[0])"
				>
					<button
						class="tw-text-left tw-font-book hover:tw-text-action-700"
						@click="copy(buildClassName('tw-w', spaceItem[0]))"
					>
						<div
							class="tw-bg-gray-300 tw-h-3 tw-inline-block"
							:class="buildClassName('tw-w', spaceItem[0])"
						></div>
						<div>
							.{{buildClassName('tw-w', spaceItem[0])}}
							<small class="tw-text-gray-500">({{remToPx(spaceItem[1])}}px)</small>
						</div>
					</button>
				</li>
			</ul>
		</section>
		<hr>
		<section class="tw-py-8">
			<h2 class="tw-mb-4">Breakpoints</h2>
			<ul class="tw-flex tw-flex-wrap tw-flex-col tw-gap-4 tw-overflow-x-auto">
				<li
					v-for="breakpoint in breakpoints"
					:key="buildClassName('tw-breakpoint', breakpoint[0])"
				>
					<div
						class="tw-w-8 tw-h-4 tw-bg-gray-300 tw-mb-1"
						:style="{ 'width': breakpoint[1] }"
					></div>
					<span>
						{{breakpoint[0]}}
						<small class="tw-text-gray-500">({{remToPx(breakpoint[1])}}px)</small>
					</span>
				</li>
			</ul>
		</section>
		<hr>
		<section class="tw-py-8">
			<h2 class="tw-mb-4">Z-Indices</h2>
			<ul class="tw-relative">
				<li
					v-for="(zIndex, index) in zIndices"
					:key="buildClassName('tw-z', zIndex[0])"
					class="tw-absolute"
					:class="buildClassName('tw-z', zIndex[0])"
					:style="{left: 'calc(' + index/zIndices.length * 100 + '% - ' + (index/zIndices.length * 250) + 'px)', top: index * 50 + 'px'}"
				>
					<button
						class="tw-flex tw-text-left tw-content-start tw-align-top tw-p-2 tw-font-book hover:tw-text-action-700 tw-h-12 tw-bg-gray-300 tw-outline-white"
						style="width: 250px;"
						@click="copy(buildClassName('tw-z', zIndex[0]))"
					>
						<span>
							{{buildClassName('tw-z', zIndex[0])}}
							<small class="tw-text-gray-500">({{zIndex[1]}})</small>
						</span>
					</button>
				</li>
			</ul>
		</section>

		<!-- TODO: replace with KvToast -->
		<div
			aria-hidden="isToastVisible"
			class="tw-fixed tw-z-toast tw-bottom-0 tw-left-1/2 tw-transform tw--left tw--translate-x-1/2 tw-px-3 tw-py-2 tw-bg-gray-500 tw-text-white tw-rounded tw-transition-all"
			:class="isToastVisible ? 'tw-opacity-full tw--translate-y-2' : 'tw-opacity-0 tw--translate-y-0'"
		>
			<span>{{ toastMessage }}</span>
		</div>
	</kv-page-container>
	`,
	data() {
		return {
			colors: buildValuesFromThemeObj(theme.colors),
			space: buildValuesFromThemeObj(theme.spacing).sort((a, b) => a[0] - b[0]),
			kivaTypography: Object.keys(textStyles).map((key) => headerNumberCase(kebabCase(key)).replace('text-', '')),
			fontWeights: buildValuesFromThemeObj(theme.fontWeight),
			breakpoints: buildValuesFromThemeObj(removeObjectProperty(theme.screens, 'print')),
			radii: buildValuesFromThemeObj(theme.borderRadius),
			opacity: buildValuesFromThemeObj(theme.opacity),
			zIndices: buildValuesFromThemeObj(theme.zIndex).sort((a, b) => a[1] - b[1]),
			isToastVisible: false,
			toastMessage: '',
		};
	},
	methods: {
		async copy(val) {
			await navigator.clipboard.writeText(val);
			this.showToast(`copied: ${val}`);
		},
		showToast(message) {
			this.toastMessage = message;
			this.isToastVisible = true;
			setTimeout(() => {
				this.isToastVisible = false;
			}, 4000);
		},
		remToPx(rem) {
			return parseFloat(rem) * 16;
		},
		buildClassName(prefix, value) {
			let name = `${prefix}-${value}`;
			name = name.replace('-DEFAULT', '');
			return name;
		},
	},
});
