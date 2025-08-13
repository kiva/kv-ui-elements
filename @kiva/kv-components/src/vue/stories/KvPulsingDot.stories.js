import KvPulsingDot from '../KvPulsingDot.vue';

export default {
	title: 'KvPulsingDot',
	component: KvPulsingDot,
	args: {
		dotColorClass: 'tw-bg-brand',
		pulseColorClass: 'tw-border-brand',
	},
	argTypes: {
		dotColorClass: { control: 'select', options: ['tw-bg-brand', 'tw-bg-action', 'tw-bg-caution', 'tw-bg-danger'] },
		pulseColorClass: { control: 'select', options: ['tw-border-brand', 'tw-border-action', 'tw-border-caution', 'tw-border-danger'] },
	},
};

const Template = (args, { argTypes }) => ({
	components: { KvPulsingDot },
	props: Object.keys(argTypes),
	setup() {
		return { args };
	},
	template: `
		<div class="tw-p-2">
			<KvPulsingDot
				:dot-color-class="args.dotColorClass"
				:pulse-color-class="args.pulseColorClass"
			/>
		</div>
	`,
});

export const Default = Template.bind({
	args: {
		dotColorClass: 'tw-bg-brand',
		pulseColorClass: 'tw-border-brand',
	},
});
