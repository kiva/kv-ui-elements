import { render } from '@testing-library/vue';
import Container from '../../../../vue/KvCommentsContainer.vue';

const renderContainer = (props = {}) => {
	return render(Container, { props });
};

describe('KvCommentsContainer', () => {
	it('should render without activity ID', async () => {
		const component = renderContainer();
		component.getByText('Activity ID missing');
	});

	it('should render with activity ID', async () => {
		const component = renderContainer({ activityId: 'asd' });
		component.getByText('Comment functionality coming soon!');
	});
});
