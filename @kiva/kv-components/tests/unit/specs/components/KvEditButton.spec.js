import { render } from '@testing-library/vue';
import addVueRouter from '../../utils/addVueRouter';
import KvEditButton from '../../../../vue/KvEditButton.vue';

describe('KvEditButton', () => {
	const renderComponent = (options) => render(KvEditButton, addVueRouter(options));

	it('renders the edit button', () => {
		const { getByRole } = renderComponent();
		getByRole('button', { name: /edit/i });
	});
});
