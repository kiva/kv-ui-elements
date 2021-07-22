import { mount } from '@vue/test-utils';
import KvButton from '../../../../vue/KvButton.vue';
import { VariantPrimary, WithHref, StateLoading } from '../../../../vue/stories/KvButton.stories';

describe('Default Button', () => {
	it('renders as a button tag', () => {
		const wrapper = mount(KvButton, {
			propsData: VariantPrimary.args,
		});
		expect(wrapper.element.tagName).toBe('BUTTON');
	});

	it('when passed an href prop, it renders as an anchor tag', () => {
		const wrapper = mount(KvButton, {
			propsData: WithHref.args,
		});
		expect(wrapper.element.tagName).toBe('A');
	});

	it('shows a ripple animation when clicked', async () => {
		const wrapper = mount(KvButton, {
			propsData: VariantPrimary.args,
		});
		await wrapper.trigger('click');
		const rippleSpan = wrapper.find('.tw-animate-ripple');
		expect(rippleSpan.exists()).toBe(true);
	});

	it('when passed a loading prop, the button is disabled', () => {
		const wrapper = mount(KvButton, {
			propsData: StateLoading.args,
		});
		expect(wrapper.attributes('disabled')).toBeTruthy();
	});
});
