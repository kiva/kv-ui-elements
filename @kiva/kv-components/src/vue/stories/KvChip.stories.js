import {
	defaultTheme,
	greenLightTheme,
	greenDarkTheme,
	marigoldLightTheme,
	stoneLightTheme,
} from '@kiva/kv-tokens';
import KvChip from '../KvChip.vue';
import KvThemeProvider from '../KvThemeProvider.vue';

export default {
	title: 'Interface Elements/KvChip',
	component: KvChip,
};

/**
 * A chip is outlined by default and fills on hover. Hover one to see the second state.
 */
export const Default = () => ({
	components: { KvChip },
	template: `
		<kv-chip>Chip label</kv-chip>
	`,
});

/**
 * The common case: a row of removable filters. The chip sizes to its label, so a group
 * wraps naturally.
 */
export const ChipGroup = () => ({
	components: { KvChip },
	data() {
		return {
			labels: ['Kenya', 'Agriculture', 'Women', 'Under $500', 'Ends this week'],
		};
	},
	methods: {
		remove(label) {
			this.labels = this.labels.filter((l) => l !== label);
		},
	},
	template: `
		<div class="tw-flex tw-flex-wrap tw-gap-1">
			<kv-chip
				v-for="label in labels"
				:key="label"
				@click-chip="remove(label)"
			>
				{{ label }}
			</kv-chip>
			<p v-if="!labels.length" class="tw-text-small tw-text-secondary">All chips removed</p>
		</div>
	`,
});

/**
 * The label does not wrap, so a long one makes the chip wide rather than tall.
 */
export const LongLabel = () => ({
	components: { KvChip },
	template: `
		<kv-chip>A considerably longer chip label than usual</kv-chip>
	`,
});

/**
 * The chip is fixed rather than themable, per design, so it renders identically on every
 * surface. Each row below sits inside a different theme provider and every chip is the
 * same. Hover any of them to see the fill.
 */
export const Themes = () => ({
	components: { KvChip, KvThemeProvider },
	data() {
		return {
			themes: [
				{ name: 'default', tokens: defaultTheme },
				{ name: 'greenLight', tokens: greenLightTheme },
				{ name: 'greenDark', tokens: greenDarkTheme },
				{ name: 'marigoldLight', tokens: marigoldLightTheme },
				{ name: 'stoneLight', tokens: stoneLightTheme },
			],
		};
	},
	template: `
		<div class="tw-flex tw-flex-col tw-gap-2">
			<kv-theme-provider
				v-for="theme in themes"
				:key="theme.name"
				:theme="theme.tokens"
				class="tw-p-3 tw-rounded tw-bg-primary tw-flex tw-items-center tw-gap-3"
			>
				<span class="tw-text-small tw-text-secondary" style="width: 8rem;">{{ theme.name }}</span>
				<kv-chip>Chip label</kv-chip>
			</kv-theme-provider>
		</div>
	`,
});
