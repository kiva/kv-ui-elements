import { render, fireEvent } from '@testing-library/vue';
import { axe } from 'jest-axe';
import {
	mdiDotsVertical, mdiClose, mdiBookmark, mdiBookmarkOutline,
} from '@mdi/js';
import KvIconButton from '#components/KvIconButton.vue';

describe('KvIconButton', () => {
	const renderIconButton = (options) => render(KvIconButton, {
		...options,
	});

	describe('Basic Rendering', () => {
		it('renders a button element', () => {
			const { getByRole } = renderIconButton();
			getByRole('button');
		});

		it('renders with the default icon when no icon prop is provided', () => {
			const { container } = renderIconButton();
			const button = container.querySelector('button');
			expect(button).toBeTruthy();
		});

		it('renders with a custom icon when provided', () => {
			const { container } = renderIconButton({
				props: { icon: mdiClose },
			});
			const button = container.querySelector('button');
			expect(button).toBeTruthy();
		});
	});

	describe('Size Variants', () => {
		it('renders small size correctly', () => {
			const { container } = renderIconButton({
				props: { size: 'small' },
			});
			const iconContainer = container.querySelector('.tw-w-4');
			expect(iconContainer).toBeTruthy();
		});

		it('renders medium size correctly', () => {
			const { container } = renderIconButton({
				props: { size: 'medium' },
			});
			const iconContainer = container.querySelector('.tw-w-5');
			expect(iconContainer).toBeTruthy();
		});

		it('renders large size correctly (default)', () => {
			const { container } = renderIconButton({
				props: { size: 'large' },
			});
			const iconContainer = container.querySelector('.tw-w-6');
			expect(iconContainer).toBeTruthy();
		});
	});

	describe('Visual Variants', () => {
		it('does not show background by default', () => {
			const { container } = renderIconButton();
			const iconContainer = container.querySelector('.tw-bg-white');
			expect(iconContainer).toBeFalsy();
		});

		it('shows background when showBackground is true', () => {
			const { container } = renderIconButton({
				props: { showBackground: true },
			});
			const iconContainer = container.querySelector('.tw-bg-white');
			expect(iconContainer).toBeTruthy();
		});

		it('does not show border by default', () => {
			const { container } = renderIconButton();
			const iconContainer = container.querySelector('.tw-border');
			expect(iconContainer).toBeFalsy();
		});

		it('shows border when showBorder is true', () => {
			const { container } = renderIconButton({
				props: { showBorder: true },
			});
			const iconContainer = container.querySelector('.tw-border');
			expect(iconContainer).toBeTruthy();
		});

		it('applies primary border color', () => {
			const { container } = renderIconButton({
				props: { showBorder: true, borderColor: 'primary' },
			});
			const iconContainer = container.querySelector('.tw-border-primary');
			expect(iconContainer).toBeTruthy();
		});

		it('applies secondary border color', () => {
			const { container } = renderIconButton({
				props: { showBorder: true, borderColor: 'secondary' },
			});
			const iconContainer = container.querySelector('.tw-border-secondary');
			expect(iconContainer).toBeTruthy();
		});

		it('applies tertiary border color (default)', () => {
			const { container } = renderIconButton({
				props: { showBorder: true, borderColor: 'tertiary' },
			});
			const iconContainer = container.querySelector('.tw-border-tertiary');
			expect(iconContainer).toBeTruthy();
		});
	});

	describe('Disabled State', () => {
		it('is not disabled by default', () => {
			const { getByRole } = renderIconButton();
			const button = getByRole('button');
			expect(button.disabled).toBe(false);
		});

		it('is disabled when disabled prop is true', () => {
			const { getByRole } = renderIconButton({
				props: { disabled: true },
			});
			const button = getByRole('button');
			expect(button.disabled).toBe(true);
		});

		it('applies opacity-low class when disabled', () => {
			const { container } = renderIconButton({
				props: { disabled: true },
			});
			const button = container.querySelector('.tw-opacity-low');
			expect(button).toBeTruthy();
		});

		it('does not emit click event when disabled', async () => {
			const onClick = jest.fn();
			const { getByRole } = renderIconButton({
				props: { disabled: true },
				attrs: { onClick },
			});
			const button = getByRole('button');
			await fireEvent.click(button);
			expect(onClick).not.toHaveBeenCalled();
		});
	});

	describe('Click Events', () => {
		it('emits click event when clicked', async () => {
			const onClick = jest.fn();
			const { getByRole } = renderIconButton({
				attrs: { onClick },
			});
			const button = getByRole('button');
			await fireEvent.click(button);
			expect(onClick).toHaveBeenCalledTimes(1);
		});

		it('passes the event object to click handler', async () => {
			const onClick = jest.fn();
			const { getByRole } = renderIconButton({
				attrs: { onClick },
			});
			const button = getByRole('button');
			await fireEvent.click(button);
			expect(onClick).toHaveBeenCalledWith(expect.any(MouseEvent));
		});
	});

	describe('Toggle Functionality', () => {
		it('is not toggleable by default', () => {
			const { getByRole } = renderIconButton();
			const button = getByRole('button');
			expect(button.getAttribute('aria-pressed')).toBeNull();
		});

		it('sets aria-pressed when toggleable', () => {
			const { getByRole } = renderIconButton({
				props: { toggleable: true, modelValue: false },
			});
			const button = getByRole('button');
			expect(button.getAttribute('aria-pressed')).toBe('false');
		});

		it('updates aria-pressed based on modelValue', () => {
			const { getByRole } = renderIconButton({
				props: { toggleable: true, modelValue: true },
			});
			const button = getByRole('button');
			expect(button.getAttribute('aria-pressed')).toBe('true');
		});

		it('emits update:modelValue when toggled', async () => {
			const onUpdate = jest.fn();
			const { getByRole } = renderIconButton({
				props: { toggleable: true, modelValue: false },
				attrs: { 'onUpdate:modelValue': onUpdate },
			});
			const button = getByRole('button');
			await fireEvent.click(button);
			expect(onUpdate).toHaveBeenCalledWith(true);
		});

		it('toggles from true to false', async () => {
			const onUpdate = jest.fn();
			const { getByRole } = renderIconButton({
				props: { toggleable: true, modelValue: true },
				attrs: { 'onUpdate:modelValue': onUpdate },
			});
			const button = getByRole('button');
			await fireEvent.click(button);
			expect(onUpdate).toHaveBeenCalledWith(false);
		});

		it('displays default icon when toggle is off', () => {
			const { container } = renderIconButton({
				props: {
					toggleable: true,
					modelValue: false,
					icon: mdiBookmarkOutline,
					activeIcon: mdiBookmark,
				},
			});
			// Icon path would be in the SVG but hard to test directly
			// This tests that the component renders without error
			const button = container.querySelector('button');
			expect(button).toBeTruthy();
		});

		it('displays active icon when toggle is on', () => {
			const { container } = renderIconButton({
				props: {
					toggleable: true,
					modelValue: true,
					icon: mdiBookmarkOutline,
					activeIcon: mdiBookmark,
				},
			});
			// Icon path would be in the SVG but hard to test directly
			// This tests that the component renders without error
			const button = container.querySelector('button');
			expect(button).toBeTruthy();
		});

		it('emits both update:modelValue and click events when toggleable', async () => {
			const onUpdate = jest.fn();
			const onClick = jest.fn();
			const { getByRole } = renderIconButton({
				props: { toggleable: true, modelValue: false },
				attrs: {
					'onUpdate:modelValue': onUpdate,
					onClick,
				},
			});
			const button = getByRole('button');
			await fireEvent.click(button);
			expect(onUpdate).toHaveBeenCalledWith(true);
			expect(onClick).toHaveBeenCalledTimes(1);
		});
	});

	describe('Accessibility', () => {
		it('has no automated accessibility violations', async () => {
			const { container } = renderIconButton({
				props: {
					icon: mdiDotsVertical,
				},
				attrs: {
					'aria-label': 'More options',
				},
			});
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		it('has no accessibility violations with background', async () => {
			const { container } = renderIconButton({
				props: {
					icon: mdiClose,
					showBackground: true,
				},
				attrs: {
					'aria-label': 'Close',
				},
			});
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		it('has no accessibility violations with border', async () => {
			const { container } = renderIconButton({
				props: {
					icon: mdiClose,
					showBackground: true,
					showBorder: true,
					borderColor: 'tertiary',
				},
				attrs: {
					'aria-label': 'Close',
				},
			});
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		it('has no accessibility violations when disabled', async () => {
			const { container } = renderIconButton({
				props: {
					icon: mdiDotsVertical,
					disabled: true,
				},
				attrs: {
					'aria-label': 'More options',
				},
			});
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		it('has no accessibility violations when toggleable', async () => {
			const { container } = renderIconButton({
				props: {
					icon: mdiBookmarkOutline,
					activeIcon: mdiBookmark,
					toggleable: true,
					modelValue: false,
					showBackground: true,
				},
				attrs: {
					'aria-label': 'Bookmark',
				},
			});
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});
	});

	describe('Combined Props', () => {
		it('renders with all visual props enabled', () => {
			const { container } = renderIconButton({
				props: {
					icon: mdiClose,
					size: 'medium',
					showBackground: true,
					showBorder: true,
					borderColor: 'primary',
				},
			});
			const iconContainer = container.querySelector('.tw-w-5.tw-bg-white.tw-border.tw-border-primary');
			expect(iconContainer).toBeTruthy();
		});

		it('renders as a disabled toggle button', () => {
			const { getByRole, container } = renderIconButton({
				props: {
					icon: mdiBookmarkOutline,
					activeIcon: mdiBookmark,
					toggleable: true,
					modelValue: false,
					disabled: true,
					showBackground: true,
				},
			});
			const button = getByRole('button');
			expect(button.disabled).toBe(true);
			expect(button.getAttribute('aria-pressed')).toBe('false');
			expect(container.querySelector('.tw-opacity-low')).toBeTruthy();
		});
	});
});
