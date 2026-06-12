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

	// A native <input type="file"> fires `change` when a file is dropped onto it as well,
	// so the drop path and the picker path share the same handler.
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
});
