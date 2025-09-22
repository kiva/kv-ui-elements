import KvCardFrame from '../KvCardFrame.vue';
import KvButton from '../KvButton.vue';

export default {
	title: 'KvCardFrame',
	component: KvCardFrame,
	args: {
		bgColorClass: null,
		borderClass: null,
		radiusClass: null,
		shadowClass: null,
		theme: null,
		headline: 'Generic Headline',
		buttonText: 'Click Me',
		buttonVariant: 'primary',
		showImage: true,
	},
	argTypes: {
		bgColorClass: { control: 'select', options: ['tw-bg-primary', 'tw-bg-secondary', 'tw-bg-tertiary', 'tw-bg-action', 'tw-bg-caution', 'tw-bg-danger'] },
		borderClass: { control: 'select', options: ['tw-border-none', 'tw-border', 'tw-border tw-border-secondary', 'tw-border tw-border-tertiary', 'tw-border tw-border-action', 'tw-border-2 tw-border-caution', 'tw-border-2 tw-border-danger', 'tw-border tw-border-2'] },
		radiusClass: { control: 'select', options: ['tw-rounded-xs', 'tw-rounded-sm', 'tw-rounded-md', 'tw-rounded', 'tw-rounded-lg', 'tw-rounded-xl', 'tw-rounded-full'] },
		shadowClass: { control: 'select', options: ['tw-shadow', 'tw-shadow-lg', 'tw-shadow-none'] },
		theme: { control: 'select', options: ['default', 'greenLight', 'greenDark', 'marigoldLight', 'stoneLight', 'stoneDark'] },
		headline: { control: 'text' },
		buttonText: { control: 'text' },
		buttonVariant: { control: 'select', options: ['primary', 'secondary', 'link', 'ghost', 'danger', 'caution'] },
		showImage: { control: 'boolean' },
	},
};

export const CustomizableCardFrame = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvCardFrame, KvButton },
	setup() { return { args }; },
	template: `
		<div>
			<kv-card-frame
				:bg-color-class="args.bgColorClass"
				:radius-class="args.radiusClass"
				:shadow-class="args.shadowClass"
				:border-class="args.borderClass"
				:theme="args.theme"
			>
				<div class="tw-p-3 tw-flex tw-flex-col tw-items-center">
					<div v-if="args.showImage" class="tw-w-10 tw-h-10 tw-mb-2"><picture class="tw-inline-block tw-relative tw-overflow-hidden tw-w-full tw-rounded-full tw-bg-brand" style="padding-bottom:100%;" data-testid="bp-summary-image" data-v-c516de63=""><source srcset="https://www.kiva.org/img/w80h80fz50/07f4ec319cb89eabe211cef6a7413931.webp 80w, https://www.kiva.org/img/w160h160fz50/07f4ec319cb89eabe211cef6a7413931.webp 160w, https://www.kiva.org/img/w72h72fz50/07f4ec319cb89eabe211cef6a7413931.webp 72w, https://www.kiva.org/img/w144h144fz50/07f4ec319cb89eabe211cef6a7413931.webp 144w, https://www.kiva.org/img/w64h64fz50/07f4ec319cb89eabe211cef6a7413931.webp 64w, https://www.kiva.org/img/w128h128fz50/07f4ec319cb89eabe211cef6a7413931.webp 128w" sizes="(min-width: 1024px) 80px, (min-width: 734px) 72px, 64px"><img class="tw-absolute tw-w-full tw-h-full tw-object-contain" src="https://www.kiva.org/img/w80h80fz50/07f4ec319cb89eabe211cef6a7413931.webp" alt="Damary Lilibeth" loading="lazy"></picture></div>
					<h2 style="margin-bottom:1rem;">{{ args.headline }}</h2>
					<kv-button :variant="args.buttonVariant">{{ args.buttonText }}</kv-button>
				</div>
			</kv-card-frame>
		</div>
	`,
	data() {
		return {
			bgColorClass: args.bgColorClass,
			borderClass: args.borderClass,
			radiusClass: args.radiusClass,
			shadowClass: args.shadowClass,
			theme: args.theme,
			headline: args.headline,
			buttonText: args.buttonText,
			buttonVariant: args.buttonVariant,
			showImage: args.showImage,
		};
	},
});
CustomizableCardFrame.args = {
	bgColorClass: 'tw-bg-primary',
	borderClass: 'tw-border-none',
	radiusClass: 'tw-rounded',
	shadowClass: 'tw-shadow',
	theme: 'greenLight',
	buttonText: 'Secondary Action',
	buttonVariant: 'secondary',
	showImage: true,
};

const DefaultCardStateTemplate = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvCardFrame, KvButton },
	setup() { return { args }; },
	template: `
		<div>
			<kv-card-frame
			>
				<div class="tw-p-3 tw-flex tw-flex-col tw-items-center">
					<div class="tw-w-10 tw-h-10 tw-mb-2"><picture class="tw-inline-block tw-relative tw-overflow-hidden tw-w-full tw-rounded-full tw-bg-brand" style="padding-bottom:100%;" data-testid="bp-summary-image" data-v-c516de63=""><source srcset="https://www.kiva.org/img/w80h80fz50/07f4ec319cb89eabe211cef6a7413931.webp 80w, https://www.kiva.org/img/w160h160fz50/07f4ec319cb89eabe211cef6a7413931.webp 160w, https://www.kiva.org/img/w72h72fz50/07f4ec319cb89eabe211cef6a7413931.webp 72w, https://www.kiva.org/img/w144h144fz50/07f4ec319cb89eabe211cef6a7413931.webp 144w, https://www.kiva.org/img/w64h64fz50/07f4ec319cb89eabe211cef6a7413931.webp 64w, https://www.kiva.org/img/w128h128fz50/07f4ec319cb89eabe211cef6a7413931.webp 128w" sizes="(min-width: 1024px) 80px, (min-width: 734px) 72px, 64px"><img class="tw-absolute tw-w-full tw-h-full tw-object-contain" src="https://www.kiva.org/img/w80h80fz50/07f4ec319cb89eabe211cef6a7413931.webp" alt="Damary Lilibeth" loading="lazy"></picture></div>
					<h2 style="margin-bottom:1rem;">{{ args.headline }}</h2>
					<kv-button>{{ args.buttonText }}</kv-button>
				</div>
			</kv-card-frame>
		</div>
	`,
	data() {
		return {
			headline: args.headline,
			buttonText: args.buttonText,
		};
	},
});

export const DefaultCardFrame = DefaultCardStateTemplate.bind({});

export const FullImageCard = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvCardFrame, KvButton },
	setup() { return { args }; },
	template: `
		<div>
			<kv-card-frame :allow-overflow="false" class="tw-w-16 tw-h-16">
				<a href="https://www.kiva.org/team/impact" target="_blank" rel="noopener noreferrer">
					<img src="https://www.kiva.org/img/team_impact_fb_share2.png" alt="Kiva Team Impact" />
				</a>
			</kv-card-frame>
		</div>
	`,
	data() {
		return {};
	},
});
