import KvLoadingText from '../KvLoadingText.vue';
import KvLoadingTextDocsMdx from './KvLoadingTextDocs.mdx';

export default {
	title: 'Interface Elements/KvLoadingText',
	component: KvLoadingText,
	parameters: {
		docs: {
			page: KvLoadingTextDocsMdx,
			title: 'Kv Loading Text Docs',
		},
	},
	argTypes: {
		lines: {
			control: 'number',
			description: 'Number of loading text lines to render.',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '1' },
			},
		},
	},
};

// Component Overview - Simple examples of each type (CSF format)
export const ComponentOverview = {
	render: () => ({
		components: { KvLoadingText },
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8">
				<div class="tw-flex tw-gap-8 tw-items-start tw-justify-center">
					<div class="tw-text-center">
						<div style="width: 200px;">
							<kv-loading-text />
						</div>
						<p class="tw-text-small tw-mt-2">Single line</p>
					</div>
					<div class="tw-text-center">
						<div style="width: 200px;">
							<kv-loading-text :lines="4" />
						</div>
						<p class="tw-text-small tw-mt-2">Paragraph (4 lines)</p>
					</div>
				</div>
			</div>
		`,
	}),
};

// All Variations - Comprehensive view of all style and functional variants
export const AllVariations = {
	render: () => ({
		components: { KvLoadingText },
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-8">
				<div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-8">
					<div>
						<h3 class="tw-text-upper tw-mb-4 tw-font-medium">1 line</h3>
						<div style="width: 240px;">
							<kv-loading-text :lines="1" />
						</div>
					</div>
					<div>
						<h3 class="tw-text-upper tw-mb-4 tw-font-medium">2 lines</h3>
						<div style="width: 240px;">
							<kv-loading-text :lines="2" />
						</div>
					</div>
					<div>
						<h3 class="tw-text-upper tw-mb-4 tw-font-medium">3 lines</h3>
						<div style="width: 240px;">
							<kv-loading-text :lines="3" />
						</div>
					</div>
					<div>
						<h3 class="tw-text-upper tw-mb-4 tw-font-medium">5 lines</h3>
						<div style="width: 240px;">
							<kv-loading-text :lines="5" />
						</div>
					</div>
				</div>
			</div>
		`,
	}),
};

// Single-Line Usage
export const SingleLineUsage = {
	render: () => ({
		components: { KvLoadingText },
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-6">
				<p class="tw-text-primary tw-text-small tw-mb-3">
					With the default <code>lines</code> value of 1, a single full-width bar is rendered --
					useful for a title, label, or any single line of loading text.
				</p>
				<div style="width: 200px;">
					<kv-loading-text />
				</div>
			</div>
		`,
	}),
};

// Multi-Line Paragraph
export const MultiLineParagraph = {
	args: {
		lines: 4,
	},
	render: (args) => ({
		components: { KvLoadingText },
		setup() {
			return { args };
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-6">
				<p class="tw-text-primary tw-text-small tw-mb-3">
					When <code>lines</code> is greater than 1, every line renders at full width except the
					final line, which narrows to 70% width to mimic the ragged right edge of a naturally
					wrapped paragraph.
				</p>
				<div style="width: 240px;">
					<kv-loading-text v-bind="args" />
				</div>
			</div>
		`,
	}),
};

// Font Size Scaling
export const FontSizeScaling = {
	render: () => ({
		components: { KvLoadingText },
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-6">
				<p class="tw-text-primary tw-text-small tw-mb-3">
					Each bar is <code>1cap</code> tall rather than a fixed pixel value, and each line takes
					its height from the inherited <code>line-height</code>, so <code>KvLoadingText</code>
					scales automatically with the font size of its surrounding context.
				</p>
				<div class="tw-flex tw-gap-8 tw-items-start">
					<div class="tw-text-center">
						<div style="width: 160px;" class="tw-text-base">
							<kv-loading-text :lines="2" />
						</div>
						<p class="tw-text-small tw-mt-2">.tw-text-base</p>
					</div>
					<div class="tw-text-center">
						<div style="width: 220px;" class="tw-text-h1">
							<kv-loading-text :lines="2" />
						</div>
						<p class="tw-text-small tw-mt-2">.tw-text-h1</p>
					</div>
				</div>
			</div>
		`,
	}),
};

const oneLine = 'Lorem ipsum dolor sit amet';
const oneLineShort = 'Lorem ipsum';
const twoLine = 'How vexingly quick daft zebras jump';
const paragraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor '
	+ 'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud '
	+ 'exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

const headingSpecimens = [
	{
		textClass: 'tw-text-display', text: oneLineShort, width: 300, lines: 1,
	},
	{
		textClass: 'tw-text-display', text: twoLine, width: 420, lines: 2,
	},
	{
		textClass: 'tw-text-h1', text: oneLine, width: 400, lines: 1,
	},
	{
		textClass: 'tw-text-h1', text: twoLine, width: 260, lines: 2,
	},
	{
		textClass: 'tw-text-h2', text: oneLine, width: 340, lines: 1,
	},
	{
		textClass: 'tw-text-h2', text: twoLine, width: 220, lines: 2,
	},
	{
		textClass: 'tw-text-blockquote', text: oneLine, width: 340, lines: 1,
	},
	{
		textClass: 'tw-text-blockquote', text: twoLine, width: 220, lines: 2,
	},
	{
		textClass: 'tw-text-h3', text: oneLine, width: 310, lines: 1,
	},
	{
		textClass: 'tw-text-h3', text: twoLine, width: 200, lines: 2,
	},
	{
		textClass: 'tw-text-h4', text: oneLine, width: 310, lines: 1,
	},
	{
		textClass: 'tw-text-h4', text: twoLine, width: 200, lines: 2,
	},
];

const basicSpecimens = [
	{
		textClass: 'tw-text-base', text: oneLine, width: 260, lines: 1,
	},
	{
		textClass: 'tw-text-base', text: paragraph, width: 360, lines: 5,
	},
	{
		textClass: 'tw-text-button-link', text: oneLine, width: 260, lines: 1,
	},
	{
		textClass: 'tw-text-button-link', text: paragraph, width: 360, lines: 5,
	},
	{
		textClass: 'tw-text-small', text: oneLine, width: 230, lines: 1,
	},
	{
		textClass: 'tw-text-small', text: paragraph, width: 320, lines: 5,
	},
	{
		textClass: 'tw-text-caption', text: oneLine, width: 230, lines: 1,
	},
	{
		textClass: 'tw-text-caption', text: paragraph, width: 320, lines: 5,
	},
	{
		textClass: 'tw-text-label', text: oneLine, width: 230, lines: 1,
	},
	{
		textClass: 'tw-text-label', text: paragraph, width: 320, lines: 5,
	},
	{
		textClass: 'tw-text-upper', text: oneLine, width: 280, lines: 1,
	},
	{
		textClass: 'tw-text-upper', text: paragraph, width: 320, lines: 6,
	},
];

const specimenSections = [
	{ title: 'Heading styles', specimens: headingSpecimens },
	{ title: 'Basic text styles', specimens: basicSpecimens },
];

// Compared With Real Text - each type style beside the text it stands in for
export const ComparedWithRealText = {
	render: () => ({
		components: { KvLoadingText },
		setup() {
			return { specimenSections };
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-6">
				<p class="tw-text-primary tw-text-small tw-mb-3">
					Each specimen sets a fixed width and renders the real text on the left and
					<code>KvLoadingText</code> on the right, both in the same type style. The box hugs each
					block, so the space the skeleton reserves can be compared against the space the text
					occupies, leading included.
				</p>
				<template v-for="section in specimenSections" :key="section.title">
					<h3 class="tw-text-upper tw-mb-4 tw-mt-8 tw-font-medium">{{ section.title }}</h3>
					<div
						v-for="specimen in section.specimens"
						:key="specimen.textClass + specimen.lines + specimen.width"
						class="tw-mb-6"
					>
						<div class="tw-flex tw-gap-4 tw-items-start tw-overflow-x-auto tw-overflow-y-hidden">
							<div
								class="tw-bg-white tw-shrink-0"
								:class="specimen.textClass"
								:style="{ width: specimen.width + 'px' }"
							>{{ specimen.text }}</div>
							<div
								class="tw-bg-white tw-shrink-0"
								:class="specimen.textClass"
								:style="{ width: specimen.width + 'px' }"
							>
								<kv-loading-text :lines="specimen.lines" />
							</div>
						</div>
						<p class="tw-text-small tw-mt-2">
							.{{ specimen.textClass.replace('tw-', '') }} &mdash; {{ specimen.lines }} line(s) at {{ specimen.width }}px
						</p>
					</div>
				</template>
			</div>
		`,
	}),
};

// Default story - interactive playground
export const Default = {
	args: {
		lines: 3,
	},
	render: (args) => ({
		components: { KvLoadingText },
		setup() {
			return { args };
		},
		template: `
			<div class="tw-bg-gray-50 tw-rounded-md tw-p-6 tw-inline-block" style="width: 240px;">
				<kv-loading-text v-bind="args" />
			</div>
		`,
	}),
};
