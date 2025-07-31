import KvAtbModal from '../KvAtbModal.vue';

export default {
	title: 'KvAtbModal',
	component: KvAtbModal,
	argTypes: {
		modalVisible: false,
		userData: {},
		addedLoan: {},
		myKivaExperimentEnabled: false,
		photoPath: '',
		showModalContent: false,
		oneLoanAwayCategory: '',
		oneLoanAwayFilteredUrl: '',
		oneAwayText: '',
		milestonesNumber: 0,
		milestonesProgress: {},
	},
};

const userData = {
	my: {
		__typename: 'My',
		id: '5225402',
		userPreferences: {
			__typename: 'UserPreferences',
			id: 3298130,
			preferences: '{"myKivaPageExp":1}',
		},
		loans: {
			__typename: 'LoanBasicCollection',
			totalCount: 1,
		},
	},
};

const addedLoan = {
	id: 2968271,
	name: 'Dr. Tracey J.',
	gender: 'female',
	borrowerCount: 1,
	themes: [],
	basketSize: 1,
};

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { KvAtbModal },
	setup() {
		return args;
	},
	template: `
			<header>
				<div data-testid="header-basket">
					<KvAtbModal
						:modalVisible="isVisible"
						:userData="userData" 
						:addedLoan="addedLoan"
						:myKivaExperimentEnabled="myKivaExperimentEnabled"
						:showModalContent="showModalContent"
						photoPath='https://www-kiva-org.freetls.fastly.net/img/'
						:oneLoanAwayCategory="oneLoanAwayCategory"
						:oneLoanAwayFilteredUrl="oneLoanAwayFilteredUrl"
						:oneAwayText="oneAwayText"
						:milestonesNumber="milestonesNumber"
						:milestonesProgress="milestonesProgress"
						@close-redirect="isVisible = false"
						@reset-modal="isVisible = false"
					/>
				</div>
			</header>
		`,
	data() {
		return {
			isVisible: true,
		};
	},
});

export const Default = Template.bind({});
Default.args = {
	userData,
	addedLoan,
};

export const MyKiva = Template.bind({});
MyKiva.args = {
	userData,
	addedLoan,
	myKivaExperimentEnabled: true,
	showModalContent: true,
};

export const MyKivaMultipleMilestones = Template.bind({});
MyKivaMultipleMilestones.args = {
	userData,
	addedLoan: {
		...addedLoan,
		basketSize: 2,
	},
	myKivaExperimentEnabled: true,
	showModalContent: true,
	milestonesNumber: 2,
	milestonesProgress: { 'womens-equality': 1, 'us-economic-equality': 1 },
};

export const MyKivaFirstLoan = Template.bind({});
MyKivaFirstLoan.args = {
	userData: {
		my: {
			...userData.my,
			loans: {
				totalCount: 0,
			},
		},
	},
	addedLoan,
	myKivaExperimentEnabled: true,
};

export const MyKivaFirstLoanMale = Template.bind({});
MyKivaFirstLoanMale.args = {
	userData: {
		my: {
			...userData.my,
			loans: {
				totalCount: 0,
			},
		},
	},
	addedLoan: {
		...addedLoan,
		name: 'Joe',
		gender: 'male',
	},
	myKivaExperimentEnabled: true,
};

export const MyKivaFirstLoanSocialEnterprise = Template.bind({});
MyKivaFirstLoanSocialEnterprise.args = {
	userData: {
		my: {
			...userData.my,
			loans: {
				totalCount: 0,
			},
		},
	},
	addedLoan: {
		...addedLoan,
		themes: ['Social Enterprise'],
	},
	myKivaExperimentEnabled: true,
};

export const MyKivaGuest = Template.bind({});
MyKivaGuest.args = {
	userData: {},
	addedLoan,
	myKivaExperimentEnabled: true,
};

export const MyKivaOneLoanAway = Template.bind({});
MyKivaOneLoanAway.args = {
	userData,
	addedLoan,
	myKivaExperimentEnabled: true,
	showModalContent: true,
	oneLoanAwayCategory: 'entrepreneur',
	oneLoanAwayFilteredUrl: '/lend-by-category/kiva-u-s',
	oneAwayText: '4 of 5',
};
