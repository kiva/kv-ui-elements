<template>
	<kv-theme-provider
		:theme="themeStyle"
		class="kv-tailwind"
	>
		<div
			class="tw-z-1 tw-w-full"
			:class="{
				'tw-fixed': isBelowElement,
				'tw-absolute': !isBelowElement,
			}"
		>
			<div class="tw-w-full tw-text-primary tw-bg-primary tw-overflow-x-auto kv-secondary-nav">
				<div
					ref="navInner"
					class="
						kv-secondary-nav__inner
						tw-flex tw-gap-2 md:tw-gap-4 tw-items-center tw-flex-wrap
						tw-px-2 md:tw-px-8 tw-py-2"
					:class="navAlignmentClass"
				>
					<div
						v-if="heading && heading.length > 0"
						class="kv-secondary-nav__heading-container"
					>
						<div class="kv-secondary-nav__heading tw-text-h3">
							{{ heading }}
						</div>
					</div>
					<button
						class="
							kv-secondary-nav__toggle
							tw-flex md:tw-hidden
							tw-text-primary tw-bg-transparent tw-border-none tw-cursor-pointer"
						@click="toggleSubNavigation"
					>
						<kv-material-icon
							:icon="subNavigationOpen ? mdiChevronUp : mdiChevronDown"
						/>
					</button>
					<div
						ref="subNavigation"
						class="kv-secondary-nav__links-container tw-pt-1 md:tw-pt-0 md:tw-block tw-w-full md:tw-w-auto"
						:class="subNavigationOpen ? '' : 'tw-hidden' "
					>
						<ul class="kv-secondary-nav__links tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-gap-3">
							<li
								v-for="(link, index) in links"
								:key="index"
								class="kv-secondary-nav__link-item tw-w-full md:tw-w-auto"
							>
								<router-link
									:to="link.href"
									class="
										kv-secondary-nav__link
										tw-py-2 md:tw-py-n
										tw-text-primary tw-font-medium
										hover:tw-underline hover:tw-text-primary
									"
									:class="{
										'tw-underline': link.isActive ,
										'tw-no-underline': !link.isActive,
									}"
								>
									{{ link.text }}
								</router-link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div
			id="threshold"
			ref="thresholdRef"
		></div>
	</kv-theme-provider>
</template>
<script>
// Vue core
import {
	ref, computed, toRefs, onMounted, onUnmounted,
} from 'vue';

// Theme
import { defaultTheme, greenDarkTheme } from '@kiva/kv-tokens';

// Components
import { mdiChevronUp, mdiChevronDown } from '@mdi/js';
import KvThemeProvider from './KvThemeProvider.vue';
import KvMaterialIcon from './KvMaterialIcon.vue';

// Icons

export default {
	name: 'KvSecondaryNav',
	components: {
		KvMaterialIcon,
		KvThemeProvider,
	},
	props: {
		heading: {
			type: String,
			default: '',
		},
		links: {
			type: Array,
			default: () => [],
			validator(value) {
				return value.every(
					(link) => Object.prototype.hasOwnProperty.call(link, 'text')
						&& Object.prototype.hasOwnProperty.call(link, 'href'),
				);
			},
		},
		linkAlignment: {
			type: String,
			default: '',
			validator(value) {
				return ['left', 'right', 'center'].includes(value);
			},
		},
		theme: {
			type: String,
			default: 'default',
			validator(value) {
				return ['default', 'dark'].includes(value);
			},
		},
	},
	setup(props) {
		const {
			heading, linkAlignment, theme,
		} = toRefs(props);

		const thresholdRef = ref(null);
		const isBelowElement = ref(false);
		const navInner = ref(null);
		const navPlaceholder = ref(null);
		const headerOffset = ref(0);
		const subNavigation = ref(null);
		const subNavigationOpen = ref(false);

		const navAlignmentClass = computed(() => {
			if (linkAlignment.value === 'right') {
				return (heading.value && heading.value.length > 0)
					? 'tw-justify-between'
					: 'tw-justify-end';
			}
			if (linkAlignment.value === 'left') {
				return 'tw-justify-start';
			}
			if (linkAlignment.value === 'center') {
				return 'tw-justify-center';
			}
			return '';
		});

		const themeStyle = computed(() => {
			const themeMapper = {
				default: defaultTheme,
				dark: greenDarkTheme,
			};
			return themeMapper[theme.value];
		});

		const updateHeaderPosition = () => {
			const thresholdClientRectTop = thresholdRef.value?.getBoundingClientRect()?.top;
			isBelowElement.value = thresholdClientRectTop ? thresholdClientRectTop < 0 : false;
		};

		const toggleSubNavigation = () => {
			subNavigationOpen.value = !subNavigationOpen.value;
		};

		onMounted(() => {
			updateHeaderPosition();
			window.addEventListener('scroll', updateHeaderPosition);
			window.addEventListener('resize', updateHeaderPosition);
		});

		onUnmounted(() => {
			window.removeEventListener('scroll', updateHeaderPosition);
			window.removeEventListener('resize', updateHeaderPosition);
		});

		return {
			navAlignmentClass,
			toggleSubNavigation,
			subNavigationOpen,
			mdiChevronUp,
			mdiChevronDown,
			isBelowElement,
			navInner,
			subNavigation,
			thresholdRef,
			navPlaceholder,
			headerOffset,
			themeStyle,
		};
	},
};
</script>
<style scoped>
#threshold, .kv-secondary-nav {
	min-height: 62px;
	width: 100%;
}
</style>
