import KvExpandableQuestion from '../KvExpandableQuestion.vue';

export default {
	title: 'Interface Elements/KvExpandableQuestion',
	component: KvExpandableQuestion,
};

const DefaultTemplate = () => ({
	components: { KvExpandableQuestion },
	template: `
		<div style="padding: 20px;">
			<kv-expandable-question
			id="expandable-question-test"
			title="expandable-question-title"
			content="<p> Hello, KvAccordion Contents! </p>"
			/>
		</div>
	`,
});

export const Default = DefaultTemplate.bind({});

const expandableQuestions = [
	{
		title: 'expandable question one',
		content: '<p> Hello, KvAccordion Contents! </p>',
		id: 'expandable-question-test-1',
	},
	{
		title: 'expandable question two',
		content: '<p> Hello, KvAccordion Contents! </p>',
		id: 'expandable-question-test-2',
	},
	{
		title: 'expandable question three',
		content: '<p> Hello, KvAccordion Contents! </p>',
		id: 'expandable-question-test-3',
	},
];

const GroupTemplate = () => ({
	components: { KvExpandableQuestion },
	data: () => ({
		questions: expandableQuestions,
	}),
	methods: {
		kvTrackMock(
			category,
			action,
			label,
		) {
			console.log(category, action, label);
		},
	},
	template: `
		<div style="padding: 20px;">
			<kv-expandable-question
				v-for="(question, index) in questions"
				:key="index"
				:id="question.id"
				:title="question.title"
				:content="question.content"
				:active="question.id === 'expandable-question-test-2'"
				:kv-track-function="kvTrackMock"
			/>
		</div>
	`,
});

export const ExpandableSet = GroupTemplate.bind({});

const SlotContentTemplate = () => ({
	components: { KvExpandableQuestion },
	template: `
		<div style="padding: 20px;">
			<kv-expandable-question
			id="expandable-question-test"
			title="expandable question with slot content"
			>
				<p> A created slot! </p>
			</kv-expandable-question>
		</div>
	`,
});

export const SlotContent = SlotContentTemplate.bind({});

const ProseWrappedTemplate = () => ({
	components: { KvExpandableQuestion },
	template: `
		<div class="rich-text-content tw-prose tw-whitespace-pre-wrap tw-mb-2 md:tw-mb-3" data-testid="rich-text-container">
			<h4><!--[-->Our commitment<!--]--></h4>
			<h2><!--[--><!--[-->100% of your loan goes toward <!--]--><!--[--><b><!--[-->supporting borrowers.<!--]--></b><!--]--><!--]--></h2>
			<section class="tw-relative tw-w-full">
				<div class="tw-pt-4 tw-pb-4 lg:tw-pt-8 lg:tw-pb-8 tw-relative tw-w-full tw-overflow-hidden tw-z-1 tw-top-0">
					<div>
						<div style="">
							<div class="tw-divide-y tw-whitespace-normal">
								<kv-expandable-question
									id="expandable-question-test"
									title="Why Lending?"
								>
									<p>If you needed to buy a delivery truck for your business, you probably wouldn’t ask for donations; you’d apply for a loan.</p><p>But what about the  billion people without access to traditional finance? That's where you—and Kiva—come in. Kiva loans give people the power and resources to build the life they choose. By crowdfunding smaller amounts—called microloans—we can help more borrowers get funded.</p><p>With Kiva, you can use the same dollars again and again, helping a new borrower each time your loan is repaid. Your same $25 could help someone open a salon, support a child’s education, invest in community solar panels, and so on!</p>
								</kv-expandable-question>
								<kv-expandable-question
									id="expandable-question-test"
									title="How does Kiva make money ?"
								>
									<p>We cover most of our operating costs through voluntary donations made by Kiva lenders. As a 501(c)3 U.S. nonprofit, the remainder of our costs are covered through grants and donations from foundations and supporters. Additionally, select lending partners contribute small platform fees as we continue building innovative technologies that help create a more financially inclusive world.</p>
									<p>Kiva never takes a fee from lenders. 100% of funds lent on Kiva go to funding loans.</p>
								</kv-expandable-question>
								<kv-expandable-question
									id="expandable-question-test"
									title="Do Kiva borrowers pay any interest on their loans?"
								>
									<p>Kiva partners with microfinance institutions, nonprofits, and other organizations to disburse loans in the communities we serve.</p>
									<p>Most borrowers do pay interest to these local lending partners to help cover their operation costs. We verify that these rates are appropriate for the region and we only choose partners who have fair, non-predatory lending practices and prioritize social good.</p>
									<p>Some borrowers funded through Kiva do receive 0% interest loans, including most direct loans, which are loans not made through a local lending partner.</p>
								</kv-expandable-question>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	`,
});

export const ProseWrappedQuestion = ProseWrappedTemplate.bind({});
