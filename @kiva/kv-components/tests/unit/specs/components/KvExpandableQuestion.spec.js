import { fireEvent, render, screen } from '@testing-library/vue';
// import { axe } from 'jest-axe';
import KvExpandableQuestion from '../../../../vue/KvExpandableQuestion.vue';

screen.debug();

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
		const { container } = render(KvExpandableQuestion, {
			props: {
				title: 'Kv Expandable Question',
				id: 'kv-expandable-question',
				testid: 'test-expandable',
			},
			slots: { default: 'Test Question' },
		});
		const spanEl = container.querySelector("[role='img']");
		const svgEl = container.querySelector("[viewBox= '0 0 24 24']");
		// const displaySVG = screen.getByDisplayValue
		console.log(spanEl);
		console.log(svgEl);
		expect(spanEl.classList.toString()).toContain('tw-inline-flex');
		expect(svgEl.classList.toString()).toContain('tw-w-full');
		expect(svgEl).toBeVisible();
		await fireEvent.click(svgEl);
		expect(svgEl).toBeInTheDocument();
		// fireEvent.change
		/* expect(svgEl).not.toBeVisible();
		await fireEvent.click(svgEl);
		expect(svgEl).toBeVisible(); */

		// const arrowIcon = getByRole('button');
		// expect(arrowIcon.find('span')).toBeDefined();

		// expect(arrowIcon.find('span')).not.toBeVisible();
		// await fireEvent.click(titleContent);
		// expect(getByText('Test Question')).toBeVisible();
		// await fireEvent.click(titleContent);
		// expect(getByText('Test Question')).not.toBeVisible();
	});
	/* it('can\'t be toggled when the disabled prop is true', async () => {
		const { getByLabelText } = render(KvExpandableQuestion, {
			props: { disabled: true },
			slots: { default: 'Test Question' },
		});
		const questionEl = getByLabelText('Test Question');

		expect(questionEl.checked).toEqual(false);
		await questionEl.click();
		expect(questionEl.checked).toEqual(false);
	}); */

	/* it('has no automated accessibility violations', async () => {
		const { container } = render(KvExpandableQuestion, {
			props: {
				title: 'Kv Expandable Question',
				id: 'kv-expandable-question',
			},
			slots: { default: 'Test Question' },
		});
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	}); */
});
