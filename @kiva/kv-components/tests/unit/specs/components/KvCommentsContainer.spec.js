import { render } from '@testing-library/vue';
import Container from '../../../../vue/KvCommentsContainer.vue';
import { ADD_COMMENT_ID } from '../../../../vue/KvCommentsAdd.vue';

const renderContainer = (props = {}) => {
	return render(Container, { props });
};

describe('KvCommentsContainer', () => {
	it('should render comments add component', async () => {
		const { container } = renderContainer();
		expect(container.querySelectorAll(`#${ADD_COMMENT_ID}`).length).toBe(1);
	});
});
