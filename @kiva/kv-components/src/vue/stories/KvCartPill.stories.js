import KvCartPill from '../KvCartPill.vue';

export default {
	title: 'KvCartPill',
	component: KvCartPill,
	parameters: {
		layout: 'fullscreen',
	},
	args: {
		borrowerName: '',
		showBg: false,
		milestonesNumber: 0,
		isCloseNextMilestone: false,
	},
};

const DefaultTemplate = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvCartPill },
	setup() { return { args }; },
	template: `
		<div>
			<kv-cart-pill
				:borrower-name="borrowerName"
				:show-bg="showBg"
				:milestones-number="milestonesNumber"
				:is-close-next-milestone="isCloseNextMilestone"
			/>
		</div>
	`,
	data() {
		return {
			borrowerName: args.borrowerName,
			showBg: args.showBg,
			milestonesNumber: args.milestonesNumber,
			isCloseNextMilestone: args.isCloseNextMilestone,
		};
	},
});

export const Default = DefaultTemplate.bind({});

export const WithSecondaryBackground = DefaultTemplate.bind({});
WithSecondaryBackground.args = {
	showBg: true,
};
export const PillWithBorrower = DefaultTemplate.bind({});
PillWithBorrower.args = {
	borrowerName: 'Maria',
};

export const PillWith2Milestones = DefaultTemplate.bind({});
PillWith2Milestones.args = {
	borrowerName: 'Maria',
	milestonesNumber: 2,

};

export const PillCloseNextMilestone = DefaultTemplate.bind({});
PillCloseNextMilestone.args = {
	isCloseNextMilestone: true,
};
