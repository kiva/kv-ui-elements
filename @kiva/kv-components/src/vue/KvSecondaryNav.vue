<template>
	<kv-theme-provider
		:theme="themeStyle"
		class="kv-tailwind"
	>
		<div
			class="
				tw-z-1 tw-w-full kv-secondary-nav-holder relative
				tw-text-primary"
			:class="theme === 'default' ? 'tw-bg-secondary' : 'tw-bg-primary'"
		>
			<div
				class="
				tw-w-full tw-overflow-x-auto kv-secondary-nav
				tw-absolute tw-top-0 tw-left-0 tw-right-0"
				:class="theme === 'default' ? 'tw-bg-secondary' : 'tw-bg-primary'"
			>
				<kv-page-container>
					<div
						ref="navInner"
						class="
							kv-secondary-nav__inner
							tw-flex tw-gap-2 md:tw-gap-4 tw-items-center tw-flex-wrap
							tw-py-2"
						:class="navAlignmentClass"
					>
						<div
							v-if="heading && heading.length > 0"
							class="kv-secondary-nav__heading-container"
							:class="{ 'tw-block md:tw-hidden': linkAlignment === 'left' || linkAlignment === 'center' }"
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
							<kv-material-icon :icon="subNavigationOpen ? mdiChevronUp : mdiChevronDown" />
						</button>
						<div
							ref="subNavigation"
							class="
							kv-secondary-nav__links-container
							tw-pt-1 md:tw-pt-0 md:tw-block
							tw-w-full md:tw-w-auto
						"
							:class="{ 'tw-hidden': !subNavigationOpen }"
						>
							<ul
								class="
							kv-secondary-nav__links
							tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-gap-3
						"
							>
								<li
									v-for="(link, index) in links"
									:key="index"
									class="kv-secondary-nav__link-item tw-w-full md:tw-w-auto"
								>
									<component
										:is="link.isExternal ? 'a' : 'router-link'"
										:to="link.isExternal ? undefined : link.href"
										:href="link.isExternal ? link.href : undefined"
										class="
											kv-secondary-nav__link
											tw-py-2 md:tw-py-n
											tw-text-primary tw-font-medium
											hover:tw-underline hover:tw-text-primary
										"
										:class="{
											'tw-underline': link.isActive,
											'tw-no-underline': !link.isActive,
										}"
									>
										{{ link.text }}
									</component>
								</li>
							</ul>
						</div>
					</div>
				</kv-page-container>
			</div>
		</div>
	</kv-theme-provider>
</template>
<script>
// Vue core
import {
	ref, computed, toRefs,
} from 'vue';

// Theme
import { defaultTheme, greenDarkTheme } from '@kiva/kv-tokens';

// Components
import { mdiChevronUp, mdiChevronDown } from '@mdi/js';
import KvThemeProvider from './KvThemeProvider.vue';
import KvMaterialIcon from './KvMaterialIcon.vue';
import KvPageContainer from './KvPageContainer.vue';

export default {
	name: 'KvSecondaryNav',
	components: {
		KvThemeProvider,
		KvMaterialIcon,
		KvPageContainer,
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

		const subNavigation = ref(null);
		const subNavigationOpen = ref(false);

		const navAlignmentClass = computed(() => {
			if (linkAlignment.value === 'right') {
				return (heading.value && heading.value.length > 0)
					? 'tw-justify-between'
					: 'tw-justify-between md:tw-justify-end';
			}
			if (linkAlignment.value === 'left') {
				return 'tw-justify-between md:tw-justify-start';
			}
			if (linkAlignment.value === 'center') {
				return 'tw-justify-between md:tw-justify-center';
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

		const toggleSubNavigation = () => {
			subNavigationOpen.value = !subNavigationOpen.value;
		};

		return {
			navAlignmentClass,
			toggleSubNavigation,
			subNavigationOpen,
			mdiChevronUp,
			mdiChevronDown,
			subNavigation,
			themeStyle,
		};
	},
};
</script>
<style scoped>
.kv-secondary-nav-holder {
	height: 62px;
}
.kv-secondary-nav {
	min-height: 62px;
}
</style>
