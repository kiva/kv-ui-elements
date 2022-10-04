import KvExpandableQuestion from '../KvExpandableQuestion.vue';

export default {
	title: 'KvExpandableQuestion',
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
		title: 'expandable question title one',
		content: '<p> Hello, KvAccordion Contents! </p>',
		id: 'expandable-question-test-1',
	},
	{
		title: 'expandable question title two',
		content: '<p> Hello, KvAccordion Contents! </p>',
		id: 'expandable-question-test-2',
	},
	{
		title: 'expandable question title three',
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
