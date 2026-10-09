import {
	mdiCheck,
} from '@mdi/js';
import KvMaterialIcon from '../KvMaterialIcon.vue';
import KvPill from '../KvPill.vue';
import KvPillDocsMdx from './KvPillDocs.mdx';

const variants = ['default', 'muted', 'light', 'urgent', 'caution'];
const sizes = ['default', 'small'];

const variantGuide = [
	{
		variant: 'default', surface: '#EDF4F1', text: '#223829', usage: 'General status and category labels',
	},
	{
		variant: 'muted', surface: '#F5F5F5', text: '#223829', usage: 'Low-emphasis label',
	},
	{
		variant: 'light', surface: '#FFFFFF', text: '#223829', usage: 'Low-emphasis label',
	},
	{
		variant: 'urgent', surface: '#F9F0EF', text: '#A24536', usage: 'Time-sensitive or important to draw the highest attention',
	},
	{
		variant: 'caution', surface: '#F8CD69', text: '#223829', usage: 'Cautionary status to draw attention, not severe',
	},
];

const sizeGuide = [
	{ size: 'default', usage: 'Standard use across most surfaces' },
	{ size: 'small', usage: 'Compact rows, dense lists, or inside smaller components' },
];

export default {
	title: 'Interface Elements/KvPill',
	component: KvPill,
	parameters: {
		docs: {
			page: KvPillDocsMdx,
			title: 'Kv Pill Docs',
		},
	},
	argTypes: {
		variant: {
			control: 'select',
			options: variants,
		},
		size: {
			control: 'select',
			options: sizes,
			description: '`default` renders a 34px tall pill, `small` a 26px tall pill.',
		},
	},
	args: {
		variant: 'default',
		size: 'default',
	},
};

const DefaultTemplate = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvPill },
	setup() { return { args }; },
	template: `
		<kv-pill :variant="args.variant" :size="args.size">Pill label</kv-pill>
	`,
});

const IconTemplate = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvPill, KvMaterialIcon },
	setup() { return { args, mdiCheck }; },
	template: `
		<kv-pill :variant="args.variant" :size="args.size">
			<template #icon>
				<kv-material-icon
					class="tw-h-2 tw-w-2"
					:icon="mdiCheck"
				/>
			</template>
			Pill label
		</kv-pill>
	`,
});

export const Default = DefaultTemplate.bind({});

export const WithIcon = IconTemplate.bind({});

export const AllVariants = () => ({
	components: { KvPill, KvMaterialIcon },
	setup() { return { variants, sizes, mdiCheck }; },
	template: `
		<div class="tw-overflow-x-auto tw-bg-gray-50 tw-p-2">
			<table class="tw-border-separate" style="border-spacing: 24px 16px;">
				<thead>
					<tr>
						<th></th>
						<th v-for="variant in variants" :key="variant" class="tw-text-label tw-capitalize tw-text-center">
							{{ variant }}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="size in sizes" :key="size">
						<th class="tw-text-label tw-text-secondary tw-text-right">Size: {{ size }}</th>
						<td v-for="variant in variants" :key="variant">
							<kv-pill class="tw-mx-auto" :variant="variant" :size="size">
								<template #icon>
									<kv-material-icon class="tw-h-2 tw-w-2" :icon="mdiCheck" />
								</template>
								Pill label
							</kv-pill>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	`,
});

export const ComponentOverview = () => ({
	components: { KvPill, KvMaterialIcon },
	setup() { return { mdiCheck }; },
	template: `
		<div class="tw-bg-gray-50 tw-rounded-md tw-p-4 tw-flex tw-flex-wrap tw-gap-2 tw-items-center tw-justify-center">
			<kv-pill>
				<template #icon>
					<kv-material-icon class="tw-h-2 tw-w-2" :icon="mdiCheck" />
				</template>
				Funded
			</kv-pill>
			<kv-pill variant="urgent">Ending soon</kv-pill>
			<kv-pill variant="muted" size="small">Agriculture</kv-pill>
		</div>
	`,
});

export const Anatomy = () => ({
	components: { KvPill, KvMaterialIcon },
	setup() { return { mdiCheck }; },
	template: `
		<div class="tw-bg-white tw-rounded-md tw-p-4 tw-flex tw-gap-4 tw-items-center tw-flex-wrap">
			<kv-pill>
				<template #icon>
					<kv-material-icon class="tw-h-2 tw-w-2" :icon="mdiCheck" />
				</template>
				Pill label
			</kv-pill>
			<ol class="tw-list-decimal tw-pl-3 tw-space-y-1">
				<li>Leading icon (optional) — the <code>#icon</code> slot</li>
				<li>Pill label — the default slot</li>
				<li>Pill container — background, padding and radius set by <code>variant</code> and <code>size</code></li>
			</ol>
		</div>
	`,
});

export const VariantGuide = () => ({
	components: { KvPill, KvMaterialIcon },
	setup() { return { variantGuide, mdiCheck }; },
	template: `
		<div class="tw-overflow-x-auto">
			<table class="tw-w-full tw-text-left">
				<thead class="tw-bg-secondary">
					<tr>
						<th class="tw-p-1">Variant</th>
						<th class="tw-p-1">Surface</th>
						<th class="tw-p-1">Text</th>
						<th class="tw-p-1">When to use</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="row in variantGuide" :key="row.variant">
						<td class="tw-p-1">
							<kv-pill :variant="row.variant">
								<template #icon>
									<kv-material-icon class="tw-h-2 tw-w-2" :icon="mdiCheck" />
								</template>
								{{ row.variant }}
							</kv-pill>
						</td>
						<td v-for="color in [row.surface, row.text]" :key="color" class="tw-p-1">
							<span class="tw-flex tw-items-center tw-gap-1">
								<span
									class="tw-inline-block tw-w-2.5 tw-h-2.5 tw-rounded-xs tw-border tw-border-tertiary"
									:style="{ backgroundColor: color }"
								></span>
								{{ color }}
							</span>
						</td>
						<td class="tw-p-1">{{ row.usage }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	`,
});

export const SizeGuide = () => ({
	components: { KvPill, KvMaterialIcon },
	setup() { return { sizeGuide, mdiCheck }; },
	template: `
		<div class="tw-overflow-x-auto">
			<table class="tw-w-full tw-text-left">
				<thead class="tw-bg-secondary">
					<tr>
						<th class="tw-p-1">Size</th>
						<th class="tw-p-1">When to use</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="row in sizeGuide" :key="row.size">
						<td class="tw-p-1">
							<kv-pill :size="row.size">
								<template #icon>
									<kv-material-icon class="tw-h-2 tw-w-2" :icon="mdiCheck" />
								</template>
								{{ row.size }}
							</kv-pill>
						</td>
						<td class="tw-p-1">{{ row.usage }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	`,
});
