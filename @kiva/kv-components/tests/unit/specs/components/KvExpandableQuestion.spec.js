import { fireEvent, render } from '@testing-library/vue';
import KvExpandableQuestion from '../../../../vue/KvExpandableQuestion.vue';

describe('KvExpandableQuestion', () => {
	it('renders KvExpandableQuestion that opens and closes when clicking the title', async () => {
		const { getByText } = render(KvExpandableQuestion, {
			props: {
				title: 'Kv Expandable Question',
				id: 'kv-expandable-question',
			},
			slots: { default: 'Test Question' },
		});
		const titleContent = getByText('Kv Expandable Question');
		expect(titleContent).toBeDefined();
		expect(getByText('Test Question')).not.toBeVisible();
		await fireEvent.click(titleContent);
		expect(getByText('Test Question')).toBeVisible();
		await fireEvent.click(titleContent);
		expect(getByText('Test Question')).not.toBeVisible();
	});

	it('renders KvExpandableQuestion that opens and closes when clicking the arrow', async () => {
		const { container, getByText } = render(KvExpandableQuestion, {
			props: {
				title: 'Kv Expandable Question',
				id: 'kv-expandable-question',
				testid: 'test-expandable',
			},
			// establish some multi line content
			slots: { default: '<p>renders KvExpandableQuestion that opens and closes when clicking the arrow renders KvExpandableQuestion</p> <p>that opens and closes when clicking the arrow</p> <p>Test Question</p>' },
		});
		const spanEl = container.querySelector("[role='img']");
		const svgEl = container.querySelector("[viewBox= '0 0 24 24']");

		// Check State prior to clicking Icon
		expect(svgEl).toBeVisible();
		expect(getByText('Test Question')).not.toBeVisible();

		// Click icon to open expandable and check content visibility
		await fireEvent.click(spanEl);
		const firstLineOpen = getByText('renders KvExpandableQuestion that opens and closes when clicking the arrow renders KvExpandableQuestion');
		expect(firstLineOpen).toBeVisible();

		const lastLineOpen = getByText('Test Question');
		expect(lastLineOpen).toBeVisible();

		// Click icon and check content visibility
		await fireEvent.click(spanEl);
		const firstLineClosed = getByText('renders KvExpandableQuestion that opens and closes when clicking the arrow renders KvExpandableQuestion');
		expect(firstLineClosed).not.toBeVisible();

		const lastLineClosed = getByText('Test Question');
		expect(lastLineClosed).not.toBeVisible();
	});
});
