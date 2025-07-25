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
	},
	argTypes: {
		bgColorClass: { control: 'text' },
		borderClass: { control: 'text' },
		radiusClass: { control: 'text' },
		shadowClass: { control: 'text' },
		headline: { control: 'text' },
		buttonText: { control: 'text' },
		theme: { control: 'text' },
	},
};

const DefaultTemplate = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvCardFrame, KvButton },
	setup() { return { args }; },
	template: `
		<div>
			<kv-card-frame
			>
				<div class="tw-p-3 tw-flex tw-flex-col tw-items-center">
					<div class="tw-w-10 tw-h-10 tw-mb-2"><picture class="tw-inline-block tw-relative tw-overflow-hidden tw-w-full tw-rounded-full tw-bg-brand" style="padding-bottom:100%;" data-testid="bp-summary-image" data-v-c516de63=""><source srcset="https://www.kiva.org/img/w80h80fz50/07f4ec319cb89eabe211cef6a7413931.jpg 80w, https://www.kiva.org/img/w160h160fz50/07f4ec319cb89eabe211cef6a7413931.jpg 160w, https://www.kiva.org/img/w72h72fz50/07f4ec319cb89eabe211cef6a7413931.jpg 72w, https://www.kiva.org/img/w144h144fz50/07f4ec319cb89eabe211cef6a7413931.jpg 144w, https://www.kiva.org/img/w64h64fz50/07f4ec319cb89eabe211cef6a7413931.jpg 64w, https://www.kiva.org/img/w128h128fz50/07f4ec319cb89eabe211cef6a7413931.jpg 128w" sizes="(min-width: 1024px) 80px, (min-width: 734px) 72px, 64px"><img class="tw-absolute tw-w-full tw-h-full tw-object-contain" src="https://www.kiva.org/img/w80h80fz50/07f4ec319cb89eabe211cef6a7413931.jpg" alt="Damary Lilibeth" loading="lazy"></picture></div>
					<h2 style="margin-bottom:1rem;">{{ headline }}</h2>
					<kv-button>{{ buttonText }}</kv-button>
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
		};
	},
});

export const Default = DefaultTemplate.bind({});

export const CustomThemeBorderAndShadow = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvCardFrame, KvButton },
	setup() { return { args }; },
	template: `
		<div>
			<kv-card-frame
				:bg-color-class="bgColorClass"
				:radius-class="radiusClass"
				:shadow-class="shadowClass"
				:border-class="borderClass"
				:theme="theme"
			>
				<div class="tw-p-3 tw-flex tw-flex-col tw-items-center">
					<div class="tw-w-10 tw-h-10 tw-mb-2"><picture class="tw-inline-block tw-relative tw-overflow-hidden tw-w-full tw-rounded-full tw-bg-brand" style="padding-bottom:100%;" data-testid="bp-summary-image" data-v-c516de63=""><source srcset="https://www.kiva.org/img/w80h80fz50/07f4ec319cb89eabe211cef6a7413931.jpg 80w, https://www.kiva.org/img/w160h160fz50/07f4ec319cb89eabe211cef6a7413931.jpg 160w, https://www.kiva.org/img/w72h72fz50/07f4ec319cb89eabe211cef6a7413931.jpg 72w, https://www.kiva.org/img/w144h144fz50/07f4ec319cb89eabe211cef6a7413931.jpg 144w, https://www.kiva.org/img/w64h64fz50/07f4ec319cb89eabe211cef6a7413931.jpg 64w, https://www.kiva.org/img/w128h128fz50/07f4ec319cb89eabe211cef6a7413931.jpg 128w" sizes="(min-width: 1024px) 80px, (min-width: 734px) 72px, 64px"><img class="tw-absolute tw-w-full tw-h-full tw-object-contain" src="https://www.kiva.org/img/w80h80fz50/07f4ec319cb89eabe211cef6a7413931.jpg" alt="Damary Lilibeth" loading="lazy"></picture></div>
					<h2 style="margin-bottom:1rem;">{{ headline }}</h2>
					<kv-button variant="secondary">{{ buttonText }}</kv-button>
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
		};
	},
});
CustomThemeBorderAndShadow.args = {
	bgColorClass: 'tw-bg-primary',
	borderClass: 'tw-border-primary tw-border',
	radiusClass: 'tw-rounded-sm',
	shadowClass: 'tw-shadow',
	theme: 'marigoldLight',
	buttonText: 'Secondary Action',
};

export const CustomContentAndThemeNoShadow = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvCardFrame, KvButton },
	setup() { return { args }; },
	template: `
		<div>
			<kv-card-frame
				:theme="theme"
			>
				<div class="tw-p-2">
					<h2>{{ headline }}</h2>
					<p style="margin-top:1rem;">Extra custom content!</p>
				</div>
			</kv-card-frame>
		</div>
	`,
	data() {
		return {
			headline: args.headline,
			buttonText: args.buttonText,
			theme: args.theme,
		};
	},
});
CustomContentAndThemeNoShadow.args = {
	theme: 'stoneDark',
	headline: 'Custom Headline',
	buttonText: 'Custom Button',
};

export const FullImageCard = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvCardFrame, KvButton },
	setup() { return { args }; },
	template: `
		<div>
			<kv-card-frame class="tw-w-16 tw-h-16">
				<a href="https://www.kiva.org/team/impact" target="_blank" rel="noopener noreferrer">
					<img src="https://www.kiva.org/img/team_impact_fb_share2.png" alt="Kiva Team Impact" />
				</a>
			</kv-card-frame>
		</div>
	`,
	data() {
		return {

		};
	},
});
