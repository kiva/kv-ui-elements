import KvAtbModal from '../KvAtbModal.vue';
import KvAtbModalDocsMdx from './KvAtbModalDocs.mdx';

export default {
	title: 'Checkout/KvAtbModal',
	component: KvAtbModal,
	parameters: {
		docs: {
			page: KvAtbModalDocsMdx,
			title: 'KvAtbModal Docs',
		},
	},
	argTypes: {
		/**
		 * Show modal
		 */
		modalVisible: {
			control: 'boolean',
			description: 'Controls visibility of the modal.',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		/**
		 * Added loan to basket
		 */
		addedLoan: {
			control: 'object',
			description: 'The loan object that was added to the basket. Contains id, name, gender, borrowerCount, themes, basketSize.',
			table: {
				type: { summary: 'object' },
				defaultValue: { summary: '{}' },
			},
		},
		/**
		 * User data
		 */
		userData: {
			control: 'object',
			description: 'User data object containing my.loans.totalCount for determining first loan status.',
			table: {
				type: { summary: 'object' },
				defaultValue: { summary: '{}' },
			},
		},
		/**
		 * Photo path base URL
		 */
		photoPath: {
			control: 'text',
			description: 'Base path for borrower photo images.',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: "''" },
			},
		},
		/**
		 * Milestones number
		 */
		milestonesNumber: {
			control: 'number',
			description: 'Number of milestones the user is close to achieving.',
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: '0' },
			},
		},
		/**
		 * Show modal content
		 */
		showModalContent: {
			control: 'boolean',
			description: 'Whether to show the modal content section.',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		/**
		 * User has ever logged in
		 */
		hasEverLoggedIn: {
			control: 'boolean',
			description: 'Whether the user has ever logged in before.',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		/**
		 * One loan away category name
		 */
		oneLoanAwayCategory: {
			control: 'text',
			description: 'Category name for "one loan away" milestone.',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: "''" },
			},
		},
		/**
		 * One loan away filtered URL
		 */
		oneLoanAwayFilteredUrl: {
			control: 'text',
			description: 'URL to redirect user to find loans in the "one away" category.',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: "''" },
			},
		},
		/**
		 * One away text
		 */
		oneAwayText: {
			control: 'text',
			description: 'Text displayed when user is one loan away from milestone.',
			table: {
				type: { summary: 'string' },
				defaultValue: { summary: "''" },
			},
		},
		/**
		 * Milestones progress
		 */
		milestonesProgress: {
			control: 'object',
			description: 'Object tracking progress on various milestone categories.',
			table: {
				type: { summary: 'object' },
				defaultValue: { summary: '{}' },
			},
		},
		/**
		 * Is loan goal modal
		 */
		isLoanGoal: {
			control: 'boolean',
			description: 'Whether this is a loan goal modal variation.',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
		/**
		 * Is completing goal modal
		 */
		isCompletingGoal: {
			control: 'boolean',
			description: 'Whether the user is completing their annual goal with this loan.',
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
		},
	},
};

// Mock data for stories
const mockUserData = {
	my: {
		__typename: 'My',
		id: '5225402',
		loans: {
			__typename: 'LoanBasicCollection',
			totalCount: 1,
		},
	},
};

const mockAddedLoan = {
	id: 2968271,
	name: 'Maria',
	gender: 'female',
	borrowerCount: 1,
	themes: [],
	basketSize: 1,
};

/**
 * Default story - Interactive playground for exploring all props.
 * The modal appears anchored to the header basket element.
 */
export const Default = {
	args: {
		modalVisible: true,
		addedLoan: mockAddedLoan,
		userData: mockUserData,
		photoPath: 'https://www.kiva.org/img/',
		milestonesNumber: 0,
		showModalContent: true,
		hasEverLoggedIn: true,
		oneLoanAwayCategory: '',
		oneLoanAwayFilteredUrl: '',
		oneAwayText: '',
		milestonesProgress: {},
		isLoanGoal: false,
		isCompletingGoal: false,
	},
	render: (args) => ({
		components: { KvAtbModal },
		setup() {
			return { args };
		},
		template: `
			<header class="tw-bg-primary tw-p-4">
				<div class="tw-flex tw-justify-end" data-testid="header-basket">
					<button class="tw-text-white">Basket</button>
					<KvAtbModal
						v-bind="args"
						@reset-modal="onResetModal"
						@close-redirect="onCloseRedirect"
					/>
				</div>
			</header>
		`,
		methods: {
			onResetModal() {
				console.log('Event: reset-modal');
			},
			onCloseRedirect(payload) {
				console.log('Event: close-redirect', payload);
			},
		},
	}),
};

// Reusable render function for stories
const renderModal = (args) => ({
	components: { KvAtbModal },
	setup() {
		return { args };
	},
	template: `
		<header class="tw-bg-primary tw-p-4">
			<div class="tw-flex tw-justify-end" data-testid="header-basket">
				<button class="tw-text-white">Basket</button>
				<KvAtbModal
					v-bind="args"
					@reset-modal="onResetModal"
					@close-redirect="onCloseRedirect"
				/>
			</div>
		</header>
	`,
	methods: {
		onResetModal() {
			console.log('Event: reset-modal');
		},
		onCloseRedirect(payload) {
			console.log('Event: close-redirect', payload);
		},
	},
});

/**
 * Overview showing the modal in a typical add-to-basket scenario.
 */
export const ComponentOverview = {
	args: {
		modalVisible: true,
		addedLoan: mockAddedLoan,
		userData: mockUserData,
		photoPath: 'https://www.kiva.org/img/',
		milestonesNumber: 1,
		showModalContent: true,
		hasEverLoggedIn: true,
		milestonesProgress: { 'womens-equality': 1 },
	},
	render: renderModal,
};

/**
 * First loan experience - Shows special badge for new lenders.
 */
export const FirstLoanExperience = {
	args: {
		modalVisible: true,
		addedLoan: { ...mockAddedLoan, basketSize: 1 },
		userData: { my: null },
		photoPath: 'https://www.kiva.org/img/',
		showModalContent: true,
		hasEverLoggedIn: false,
	},
	render: renderModal,
};

/**
 * Milestone achievement - Shows progress toward multiple milestones.
 */
export const MilestoneAchievement = {
	args: {
		modalVisible: true,
		addedLoan: { ...mockAddedLoan, basketSize: 2 },
		userData: mockUserData,
		photoPath: 'https://www.kiva.org/img/',
		showModalContent: true,
		hasEverLoggedIn: true,
		milestonesNumber: 2,
		milestonesProgress: { 'womens-equality': 1, 'us-economic-equality': 1 },
	},
	render: renderModal,
};

/**
 * One loan away - Shows when user is close to next achievement.
 */
export const OneLoanAway = {
	args: {
		modalVisible: true,
		addedLoan: { ...mockAddedLoan, basketSize: 3 },
		userData: mockUserData,
		photoPath: 'https://www.kiva.org/img/',
		showModalContent: true,
		hasEverLoggedIn: true,
		oneLoanAwayCategory: 'Women-owned businesses',
		oneLoanAwayFilteredUrl: '/lend/filter?gender=female',
		oneAwayText: '1 away',
	},
	render: renderModal,
};

/**
 * Loan goal progress - Shows progress toward annual lending goal.
 */
export const LoanGoalProgress = {
	args: {
		modalVisible: true,
		addedLoan: mockAddedLoan,
		userData: mockUserData,
		photoPath: 'https://www.kiva.org/img/',
		showModalContent: true,
		hasEverLoggedIn: true,
		isLoanGoal: true,
	},
	render: renderModal,
};

/**
 * Goal completion - Shows when loan completes annual goal.
 */
export const GoalCompletion = {
	args: {
		modalVisible: true,
		addedLoan: mockAddedLoan,
		userData: mockUserData,
		photoPath: 'https://www.kiva.org/img/',
		showModalContent: true,
		hasEverLoggedIn: true,
		isCompletingGoal: true,
	},
	render: renderModal,
};
