import KvAccordionItem from '../KvAccordionItem.vue';

export default {
	title: 'Interface Elements/KvAccordionItem',
	component: KvAccordionItem,
};

const DefaultTemplate = () => ({
	components: { KvAccordionItem },
	template: `
		<div style="padding: 20px;">
			<kv-accordion-item id="accordian-test">
				<template #header>
					<h2>Accordion</h2>
				</template>
				<p>
					"Hello, KvAccordion Contents!"
				</p>
			</kv-accordion-item>
		</div>
	`,
});

export const Default = DefaultTemplate.bind({});
