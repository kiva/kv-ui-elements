import resolveConfig from 'tailwindcss/resolveConfig'; // eslint-disable-line import/no-extraneous-dependencies
import { tailwindConfig, textStyles } from '@kiva/kv-tokens';
import { headerNumberCase, kebabCase, removeObjectProperty } from '#utils/themeUtils';
import KvGrid from '../KvGrid.vue';
import KvPageContainer from '../KvPageContainer.vue';
import KvTab from '../KvTab.vue';
import KvTabs from '../KvTabs.vue';
import KvTabPanel from '../KvTabPanel.vue';
import KvToast from '../KvToast.vue';

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
	title: 'Base Styling/Primitives',
};

export const Primitives = (templateArgs, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		KvGrid,
		KvPageContainer,
		KvTab,
		KvTabs,
		KvTabPanel,
		KvToast,
	},
	setup() { return { theme, args: { ...templateArgs } }; },
	template: `
	<kv-page-container>
		<h1 class="tw-mt-4">Primitives</h1>
		<section class="tw-py-8">
			<h2 class="tw-mb-4">Background Colors</h2>
			<kv-tabs>
				<template #tabNav>
					<kv-tab for-panel="bg_themable">Themable</kv-tab>
					<kv-tab for-panel="bg_static">Static</kv-tab>
				</template>
				<template #tabPanels>
					<kv-tab-panel id="bg_themable">
						<kv-grid
							as="ul"
							class="tw-grid-cols-3 md:tw-grid-cols-4 lg:tw-grid-cols-5"
						>
							<template v-for="color in backgroundColor" :key="buildClassName('bg', color[0])">
								<li
									v-if="!isStaticColor(color)"
								>
									<button
										class="tw-flex tw-flex-col tw-h-full tw-w-full tw-text-left tw-border tw-rounded tw-p-1.5 tw-border-tertiary tw-font-book hover:tw-text-action-highlight"
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
											<br><small class="tw-text-tertiary">var({{buildClassName('--bg', color[0])}})</small>
										</div>
									</button>
								</li>
							</template>
						</kv-grid>
					</kv-tab-panel>
					<kv-tab-panel id="bg_static">
						<kv-grid
							as="ul"
							class="tw-grid-cols-3 md:tw-grid-cols-4 lg:tw-grid-cols-5"
						>
							<template v-for="color in backgroundColor" :key="buildClassName('bg', color[0])">
								<li
									v-if="isStaticColor(color)"
								>
									<button
										class="tw-flex tw-flex-col tw-h-full tw-w-full tw-text-left tw-border tw-rounded tw-p-1.5 tw-border-tertiary tw-font-book hover:tw-text-action-highlight"
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
											<br><small class="tw-text-tertiary">{{color[1]}}</small>
										</div>
									</button>
								</li>
							</template>
						</kv-grid>
					</kv-tab-panel>
				</template>
			</kv-tabs>
		</section>
		<hr>
		<section class="tw-py-8">
			<h2 class="tw-mb-4">Text Colors</h2>
			<kv-tabs>
				<template #tabNav>
					<kv-tab for-panel="text_themable">Themable</kv-tab>
					<kv-tab for-panel="text_static">Static</kv-tab>
				</template>
				<template #tabPanels>
					<kv-tab-panel id="text_themable">
						<table>
							<tbody>
								<template v-for="color in textColor" :key="buildClassName('text-color', color[0])">
									<tr
										v-if="!isStaticColor(color)"
									>
										<td class="tw-py-1 tw-min-w-[300px]">
											<button
												class="hover:tw-text-action-highlight"
												:class="buildClassName('tw-text', color[0])"
												@click="copy(buildClassName('tw-text', color[0]))"
											>.{{buildClassName('tw-text', color[0])}}</button>
										</td>
										<td>
											<small class="tw-text-tertiary">var({{buildClassName('--text', color[0])}})</small>
										</td>
									</tr>
								</template>
							</tbody>
						</table>
					</kv-tab-panel>
					<kv-tab-panel id="text_static">
						<table>
							<tbody>
								<template v-for="color in textColor" :key="buildClassName('text-color', color[0])">
									<tr
										v-if="isStaticColor(color)"
									>
										<td class="tw-py-1 tw-min-w-[300px]">
											<button
												class="hover:tw-text-action-highlight"
												:class="buildClassName('tw-text', color[0])"
												@click="copy(buildClassName('tw-text', color[0]))"
											>.{{buildClassName('tw-text', color[0])}}</button>
										</td>
										<td>
											<small class="tw-text-tertiary">var({{buildClassName('--text', color[0])}})</small>
										</td>
									</tr>
								</template>
							</tbody>
						</table>
					</kv-tab-panel>
				</template>
			</kv-tabs>
		</section>
		<hr>
		<section class="tw-py-8">
			<h2 class="tw-mb-4">Border/Ring Colors</h2>
			<kv-tabs>
				<template #tabNav>
					<kv-tab for-panel="border_themable">Themable</kv-tab>
					<kv-tab for-panel="border_static">Static</kv-tab>
				</template>
				<template #tabPanels>
					<kv-tab-panel id="border_themable">
						<table>
							<tbody>
								<template v-for="color in borderColor" :key="buildClassName('border-color', color[0])">
									<tr
										v-if="!isStaticColor(color)"
									>
										<td class="tw-py-2 tw-min-w-[300px]">
											<button
												class="tw-ring-4 hover:tw-text-action-highlight"
												:class="buildClassName('tw-ring', color[0])"
												@click="copy(buildClassName('tw-border', color[0]))"
											>.{{buildClassName('tw-border', color[0])}}</button>
										</td>
										<td>
											<small class="tw-text-tertiary">var({{buildClassName('--border', color[0])}})</small>
										</td>
									</tr>
								</template>
							</tbody>
						</table>
					</kv-tab-panel>
					<kv-tab-panel id="border_static">
						<table>
							<tbody>
								<template v-for="color in borderColor" :key="buildClassName('border-color', color[0])">
									<tr
										v-if="isStaticColor(color)"
									>
										<td class="tw-py-2 tw-min-w-[300px]">
											<button
												class="tw-ring-4 hover:tw-text-action-highlight"
												:class="buildClassName('tw-ring', color[0])"
												@click="copy(buildClassName('tw-border', color[0]))"
											>.{{buildClassName('tw-border', color[0])}}</button>
										</td>
										<td>
											<small class="tw-text-tertiary">var({{buildClassName('--border', color[0])}})</small>
										</td>
									</tr>
								</template>
							</tbody>
						</table>
					</kv-tab-panel>
				</template>
			</kv-tabs>
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
						class="tw-text-left tw-font-book hover:tw-text-action-highlight"
						@click="copy(buildClassName('tw-text', typeStyle))"
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
		<section class="tw-py-8">
			<h2 class="tw-mb-4">Text Styles <i>(Italics)</i></h2>
			<ul class="tw-flex tw-flex-wrap tw-flex-col tw-gap-4">
				<li
					v-for="typeStyle in kivaTypography"
					:key="buildClassName('text', typeStyle)"
					class="tw-overflow-x-auto tw-w-full"
				>
					<button
						class="tw-text-left tw-font-book hover:tw-text-action-highlight"
						@click="copy(buildClassName('tw-text', typeStyle))"
					>
						<p
							class="tw-mb-1 tw-italic"
							:class="buildClassName('tw-text', typeStyle)"
							style="width: 12em;"
						>
							The quick brown fox jumps over the lazy dog
						</p>
						<span>.{{buildClassName('tw-text', typeStyle)}} .tw-italic</span>
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
						class="tw-text-left tw-font-book hover:tw-text-action-highlight"
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
			<h2 class="tw-mb-4">Font Weights (Serif)</h2>
			<ul class="tw-flex tw-flex-wrap tw-flex-col tw-gap-4">
				<li
					v-for="fontWeight in fontWeights"
					:key="buildClassName('tw-font', fontWeight[0])"
				>
					<button
						class="tw-text-left tw-font-book hover:tw-text-action-highlight"
						@click="copy(buildClassName('tw-font', fontWeight[0]))"
					>
						<p :class="[buildClassName('tw-font', fontWeight[0]), 'tw-font-serif']">
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
						class="tw-flex tw-flex-col tw-text-left tw-border tw-rounded tw-p-1.5 tw-w-full tw-h-full tw-border-tertiary tw-font-book hover:tw-text-action-highlight"
						@click="copy(buildClassName('tw-rounded', radius[0]))"
					>
						<div
							class="tw-bg-tertiary tw-w-full tw-h-0 tw-mb-1"
							style="padding-bottom: 100%;"
							:class="buildClassName('tw-rounded', radius[0])"
						></div>
						<div>
							.{{buildClassName('tw-rounded', radius[0])}}
							<br><small class="tw-text-tertiary">({{remToPx(radius[1])}}px)</small>
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
						class="tw-flex tw-flex-col tw-text-left tw-border tw-rounded tw-p-1.5 tw-w-full tw-h-full tw-border-tertiary tw-font-book hover:tw-text-action-highlight"
						@click="copy(buildClassName('tw-opacity', opacityItem[0]))"
					>
						<div
							class="tw-bg-tertiary tw-w-full tw-h-0 tw-mb-1"
							:class="buildClassName('tw-opacity', opacityItem[0])"
							style="background-image: linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet, red); padding-bottom: 100%;"
						></div>
						<div>
							.{{buildClassName('tw-opacity', opacityItem[0])}}<br>
							<small class="tw-text-tertiary">({{opacityItem[1]}})</small>
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
						class="tw-text-left tw-font-book hover:tw-text-action-highlight"
						@click="copy(buildClassName('tw-w', spaceItem[0]))"
					>
						<div
							class="tw-bg-tertiary tw-h-3 tw-inline-block"
							:class="buildClassName('tw-w', spaceItem[0])"
						></div>
						<div>
							.{{buildClassName('tw-w', spaceItem[0])}}
							<small class="tw-text-tertiary">({{remToPx(spaceItem[1])}}px)</small>
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
						class="tw-w-8 tw-h-4 tw-bg-tertiary tw-mb-1"
						:style="{ 'width': breakpoint[1] }"
					></div>
					<span>
						{{breakpoint[0]}}
						<small class="tw-text-tertiary">({{remToPx(breakpoint[1])}}px)</small>
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
						class="tw-flex tw-text-left tw-content-start tw-align-top tw-p-2 tw-font-book hover:tw-text-action-highlight tw-h-12 tw-bg-tertiary tw-outline-2 tw-outline-dotted tw-outline-offset-2"
						style="width: 250px;"
						@click="copy(buildClassName('tw-z', zIndex[0]))"
					>
						<span>
							{{buildClassName('tw-z', zIndex[0])}}
							<small class="tw-text-tertiary">({{zIndex[1]}})</small>
						</span>
					</button>
				</li>
			</ul>
		</section>
		<!-- Toast -->
		<div class="tw-fixed tw-inset-0 tw-z-toast tw-pointer-events-none">
			<div class="tw-fixed tw-left-0 tw-right-0 tw-top-2 tw-pointer-events-auto">
				<kv-toast ref="toastRef" />
			</div>
		</div>
	</kv-page-container>
	`,
	data() {
		return {
			backgroundColor: buildValuesFromThemeObj(theme.backgroundColor),
			textColor: buildValuesFromThemeObj(theme.textColor),
			borderColor: buildValuesFromThemeObj(theme.borderColor),
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
			this.$refs.toastRef.show(message);
		},
		remToPx(rem) {
			return parseFloat(rem) * 16;
		},
		buildClassName(prefix, value) {
			let name = `${prefix}-${value}`;
			name = name.replace('-DEFAULT', '');
			return name;
		},
		isStaticColor(colorName) {
			const staticColors = [
				'transparent',
				'current',
				'brand',
				'black',
				'white',
				'eco-green',
				'marigold',
				'desert-rose',
				'stone',
				'gray',
				'social',
			];
			const isStatic = staticColors.some((staticColor) => colorName[0].includes(staticColor));
			return isStatic;
		},
	},
});
