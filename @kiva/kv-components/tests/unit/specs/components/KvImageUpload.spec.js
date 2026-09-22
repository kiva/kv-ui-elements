import { render, fireEvent, waitFor } from '@testing-library/vue';
import { axe } from 'jest-axe';
import KvImageUpload from '#components/KvImageUpload.vue';
import { cropResizeImageToDataUrl } from '#utils/imageUtils';

// Keep real validation; mock only the canvas pipeline (jsdom can't decode/render).
jest.mock('#utils/imageUtils', () => {
	const actual = jest.requireActual('#utils/imageUtils');
	return {
		__esModule: true,
		...actual,
		cropResizeImageToDataUrl: jest.fn(),
	};
});

const validPng = () => new File(['x'], 'photo.png', { type: 'image/png' });
const renderUploader = (props = {}, options = {}) => render(KvImageUpload, { props, ...options });
const getFileInput = (container) => container.querySelector('input[type="file"]');

describe('KvImageUpload', () => {
	beforeEach(() => {
		cropResizeImageToDataUrl.mockResolvedValue('data:image/png;base64,preview');
	});

	it('has no automated accessibility violations', async () => {
		const { container } = renderUploader();
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it('exposes a focusable, labelled native file input (keyboard accessible)', () => {
		const { getByLabelText } = renderUploader();
		const input = getByLabelText('Upload image');
		expect(input.tagName).toBe('INPUT');
		expect(input.type).toBe('file');
		expect(input).not.toHaveStyle({ display: 'none' });
	});

	it('renders the default placeholder (camera prompt) and no preview image when empty', () => {
		const { container, getByText } = renderUploader();
		expect(container.querySelector('img')).toBeNull();
		expect(container.querySelector('.kv-image-upload__placeholder')).not.toBeNull();
		getByText('Add a photo');
	});

	it('renders custom fallback-image slot content in place of the default placeholder', () => {
		const { container, getByText, queryByText } = renderUploader({}, {
			slots: { 'fallback-image': '<span>Custom upload area</span>' },
		});
		getByText('Custom upload area');
		// The slot replaces the default placeholder entirely.
		expect(container.querySelector('.kv-image-upload__placeholder')).toBeNull();
		expect(queryByText('Add a photo')).toBeNull();
	});

	it('emits file-uploaded with the original file for a valid image', async () => {
		const { container, emitted } = renderUploader({ maxSizeMb: 1 });
		const file = validPng();
		await fireEvent.change(getFileInput(container), { target: { files: [file] } });
		await waitFor(() => expect(emitted()['file-uploaded']).toBeTruthy());
		expect(emitted()['file-uploaded'][0][0]).toEqual({ file });
	});

	it('emits a size error and does not process an oversized file', async () => {
		const { container, emitted } = renderUploader({ maxSizeMb: 1 });
		const big = new File([new ArrayBuffer(2 * 1024 * 1024)], 'big.png', { type: 'image/png' });
		await fireEvent.change(getFileInput(container), { target: { files: [big] } });
		expect(emitted()['file-error'][0][0]).toEqual({
			type: 'size',
			message: 'File size must be less than 1MB',
		});
		expect(cropResizeImageToDataUrl).not.toHaveBeenCalled();
		expect(emitted()['file-uploaded']).toBeUndefined();
	});

	it('emits a format error for a disallowed type', async () => {
		const { container, emitted } = renderUploader();
		const txt = new File(['x'], 'a.txt', { type: 'text/plain' });
		await fireEvent.change(getFileInput(container), { target: { files: [txt] } });
		expect(emitted()['file-error'][0][0]).toEqual({
			type: 'format',
			message: 'File format not supported',
		});
	});

	it('emits an "other" error when processing fails', async () => {
		cropResizeImageToDataUrl.mockRejectedValueOnce(new Error('boom'));
		const { container, emitted } = renderUploader();
		await fireEvent.change(getFileInput(container), { target: { files: [validPng()] } });
		await waitFor(() => expect(emitted()['file-error']).toBeTruthy());
		expect(emitted()['file-error'][0][0]).toEqual({ type: 'other', message: 'Failed to read file' });
	});

	it('renders the preview as a circle when shape is circle', async () => {
		const { container, emitted } = renderUploader({ shape: 'circle' });
		await fireEvent.change(getFileInput(container), { target: { files: [validPng()] } });
		await waitFor(() => expect(emitted()['file-uploaded']).toBeTruthy());
		expect(container.querySelector('img').className).toContain('tw-rounded-full');
	});

	it('hides the edit icon in the blank state by default', () => {
		const { container } = renderUploader();
		expect(container.querySelector('.edit-icon')).toBeNull();
	});

	it('shows the edit icon in the blank state when showEditIcon is true', () => {
		const { container } = renderUploader({ showEditIcon: true });
		expect(container.querySelector('.edit-icon')).not.toBeNull();
	});

	it('always shows the edit icon once an image is present, even when showEditIcon is false', () => {
		const { container } = renderUploader({ imageUrl: 'https://example.com/pic.png' });
		expect(container.querySelector('.edit-icon')).not.toBeNull();
	});

	it('emits file-removed and clears the preview when removing', async () => {
		const { container, emitted, getByLabelText } = renderUploader();
		await fireEvent.change(getFileInput(container), { target: { files: [validPng()] } });
		await waitFor(() => expect(container.querySelector('img')).not.toBeNull());
		await fireEvent.click(getByLabelText('Remove Image'));
		expect(emitted()['file-removed']).toBeTruthy();
		expect(container.querySelector('img')).toBeNull();
	});

	it('renders a preview image on mount when imageUrl is provided', () => {
		const { container } = renderUploader({ imageUrl: 'https://example.com/pic.png' });
		const img = container.querySelector('img');
		expect(img).not.toBeNull();
		expect(img.src).toBe('https://example.com/pic.png');
	});

	it('updates the preview when imageUrl prop changes', async () => {
		const { container, rerender } = renderUploader({ imageUrl: 'https://example.com/pic.png' });
		await rerender({ imageUrl: 'https://example.com/other.png' });
		const img = container.querySelector('img');
		expect(img).not.toBeNull();
		expect(img.src).toBe('https://example.com/other.png');
	});

	it('flips the file input label to "Change image" after a successful upload', async () => {
		const { container, getByLabelText } = renderUploader();
		await fireEvent.change(getFileInput(container), { target: { files: [validPng()] } });
		await waitFor(() => getByLabelText('Change image'));
		expect(getByLabelText('Change image').type).toBe('file');
	});

	describe('drag and drop', () => {
		// jsdom has no usable DataTransfer, so events carry the shape the handlers read.
		const fileDrag = (files = []) => ({ dataTransfer: { types: ['Files'], files, dropEffect: '' } });
		const plainDrag = () => ({ dataTransfer: { types: ['text/plain'], files: [], dropEffect: '' } });
		const getDropZone = (container) => container.querySelector('.kv-image-upload');

		it('processes a dropped file through the same validation as the picker', async () => {
			const { container, emitted } = renderUploader();
			const file = validPng();

			await fireEvent.drop(getDropZone(container), fileDrag([file]));

			await waitFor(() => expect(emitted()['file-uploaded']).toBeTruthy());
			expect(emitted()['file-uploaded'][0][0]).toEqual({ file });
		});

		it('emits a format error for a dropped file of a disallowed type', async () => {
			const { container, emitted } = renderUploader();
			const txt = new File(['x'], 'a.txt', { type: 'text/plain' });

			await fireEvent.drop(getDropZone(container), fileDrag([txt]));

			expect(emitted()['file-error'][0][0]).toEqual({
				type: 'format',
				message: 'File format not supported',
			});
		});

		it('emits a size error for an oversized dropped file', async () => {
			const { container, emitted } = renderUploader({ maxSizeMb: 1 });
			const big = new File([new ArrayBuffer(2 * 1024 * 1024)], 'big.png', { type: 'image/png' });

			await fireEvent.drop(getDropZone(container), fileDrag([big]));

			expect(emitted()['file-error'][0][0]).toEqual({
				type: 'size',
				message: 'File size must be less than 1MB',
			});
			expect(cropResizeImageToDataUrl).not.toHaveBeenCalled();
		});

		it('takes only the first of several dropped files', async () => {
			const { container, emitted } = renderUploader();
			const first = validPng();

			await fireEvent.drop(getDropZone(container), fileDrag([first, new File(['y'], 'b.png', { type: 'image/png' })]));

			await waitFor(() => expect(emitted()['file-uploaded']).toBeTruthy());
			expect(emitted()['file-uploaded']).toHaveLength(1);
			expect(emitted()['file-uploaded'][0][0]).toEqual({ file: first });
		});

		it('replaces the current image when a file is dropped on the preview', async () => {
			const { container, emitted } = renderUploader({ imageUrl: 'https://example.com/pic.png' });
			const replacement = validPng();

			await fireEvent.drop(getDropZone(container), fileDrag([replacement]));

			await waitFor(() => expect(emitted()['file-uploaded']).toBeTruthy());
			expect(emitted()['file-uploaded'][0][0]).toEqual({ file: replacement });
		});

		it('marks the container while a file is dragged over it', async () => {
			const { container } = renderUploader();

			await fireEvent.dragEnter(getDropZone(container), fileDrag());

			expect(getDropZone(container).className).toContain('kv-image-upload--dragging');
		});

		it('keeps the marker while the pointer crosses a descendant', async () => {
			const { container } = renderUploader();

			await fireEvent.dragEnter(getDropZone(container), fileDrag());
			await fireEvent.dragEnter(getDropZone(container), fileDrag());
			await fireEvent.dragLeave(getDropZone(container), fileDrag());

			expect(getDropZone(container).className).toContain('kv-image-upload--dragging');
		});

		it('clears the marker once the drag has left every element', async () => {
			const { container } = renderUploader();

			await fireEvent.dragEnter(getDropZone(container), fileDrag());
			await fireEvent.dragEnter(getDropZone(container), fileDrag());
			await fireEvent.dragLeave(getDropZone(container), fileDrag());
			await fireEvent.dragLeave(getDropZone(container), fileDrag());

			expect(getDropZone(container).className).not.toContain('kv-image-upload--dragging');
		});

		it('clears the marker on drop', async () => {
			const { container } = renderUploader();

			await fireEvent.dragEnter(getDropZone(container), fileDrag());
			await fireEvent.drop(getDropZone(container), fileDrag([validPng()]));

			expect(getDropZone(container).className).not.toContain('kv-image-upload--dragging');
		});

		it('highlights the default placeholder border while dragging', async () => {
			const { container } = renderUploader();
			const placeholderBorder = () => container.querySelector('.kv-image-upload__placeholder > div');

			expect(placeholderBorder().className).toContain('tw-border-black');

			await fireEvent.dragEnter(getDropZone(container), fileDrag());

			expect(placeholderBorder().className).toContain('tw-border-action');
			expect(placeholderBorder().className).not.toContain('tw-border-black');
		});

		it('exposes the drag state to the fallback-image slot', async () => {
			const { container, getByText } = renderUploader({}, {
				slots: {
					'fallback-image': `
						<template #fallback-image="{ isDraggingOver }">
							<span>{{ isDraggingOver ? 'Drop it' : 'Custom area' }}</span>
						</template>
					`,
				},
			});
			getByText('Custom area');

			await fireEvent.dragEnter(getDropZone(container), fileDrag());

			getByText('Drop it');
		});

		describe('drag-overlay slot', () => {
			const withOverlay = (props = {}) => renderUploader(props, {
				slots: { 'drag-overlay': '<span>Drop to replace</span>' },
			});
			const withImage = { imageUrl: 'https://example.com/pic.png' };

			it('renders nothing until a file is dragged over', async () => {
				const { queryByText, container } = withOverlay(withImage);
				expect(queryByText('Drop to replace')).toBeNull();

				await fireEvent.dragEnter(getDropZone(container), fileDrag());

				expect(queryByText('Drop to replace')).not.toBeNull();
			});

			it('covers an existing preview, which fallback-image cannot reach', async () => {
				const { container, getByText } = withOverlay(withImage);

				await fireEvent.dragEnter(getDropZone(container), fileDrag());

				// The preview is still rendered; the overlay sits on top of it.
				expect(container.querySelector('img')).not.toBeNull();
				getByText('Drop to replace');
			});

			// fallback-image owns the empty state and gets isDraggingOver, so rendering here too
			// would stack two competing treatments.
			it('stays out of the empty state entirely', async () => {
				const { container, queryByText } = withOverlay();

				await fireEvent.dragEnter(getDropZone(container), fileDrag());

				expect(queryByText('Drop to replace')).toBeNull();
				expect(container.querySelector('.kv-image-upload__placeholder')).not.toBeNull();
			});

			it('clears once the drag leaves', async () => {
				const { container, queryByText } = withOverlay(withImage);

				await fireEvent.dragEnter(getDropZone(container), fileDrag());
				await fireEvent.dragLeave(getDropZone(container), fileDrag());

				expect(queryByText('Drop to replace')).toBeNull();
			});

			// An overlay that took pointer events would land under the cursor mid-drag and churn
			// the dragenter/dragleave pairs.
			it('never takes pointer events', async () => {
				const { container } = withOverlay(withImage);

				await fireEvent.dragEnter(getDropZone(container), fileDrag());

				expect(container.querySelector('.tw-pointer-events-none')).not.toBeNull();
			});

			it('renders no overlay element for consumers that do not fill the slot', async () => {
				const { container } = renderUploader(withImage);

				await fireEvent.dragEnter(getDropZone(container), fileDrag());

				expect(container.querySelector('.tw-pointer-events-none')).toBeNull();
			});
		});

		it('ignores a drag that carries no files', async () => {
			const { container, emitted } = renderUploader();

			await fireEvent.dragEnter(getDropZone(container), plainDrag());
			expect(getDropZone(container).className).not.toContain('kv-image-upload--dragging');

			await fireEvent.drop(getDropZone(container), plainDrag());
			expect(emitted()['file-uploaded']).toBeUndefined();
			expect(emitted()['file-error']).toBeUndefined();
		});
	});
});
