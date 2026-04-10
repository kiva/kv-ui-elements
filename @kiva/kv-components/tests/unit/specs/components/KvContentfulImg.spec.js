import { render } from '@testing-library/vue';
import { axe } from 'jest-axe';
import KvContentfulImg from '#components/KvContentfulImg.vue';

const contentfulSrc = 'https://images.ctfassets.net/test/image.jpg';

describe('KvContentfulImg', () => {
	it('has no automated accessibility violations', async () => {
		const { container } = render(KvContentfulImg, {
			props: {
				contentfulSrc,
				width: 400,
				height: 300,
				alt: 'Test image',
			},
		});
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	describe('caption computed property', () => {
		it('should return empty string when alt text does not start with ^', () => {
			const { queryByText } = render(KvContentfulImg, {
				props: {
					contentfulSrc,
					width: 400,
					height: 300,
					alt: 'Regular alt text',
				},
			});

			const caption = queryByText('Regular alt text');
			expect(caption).toBeNull();
		});

		it('should extract caption when alt text starts with ^', () => {
			const { getByText } = render(KvContentfulImg, {
				props: {
					contentfulSrc,
					width: 400,
					height: 300,
					alt: '^This is a caption',
				},
			});

			const caption = getByText('This is a caption');
			expect(caption).toBeDefined();
		});

		it('should extract caption and remove ^# when alt text starts with ^#', () => {
			const { getByText } = render(KvContentfulImg, {
				props: {
					contentfulSrc,
					width: 400,
					height: 300,
					alt: '^#This is a caption without leaf icon',
				},
			});

			const caption = getByText('This is a caption without leaf icon');
			expect(caption).toBeDefined();
		});

		it('should trim whitespace after extracting caption', () => {
			const { getByText } = render(KvContentfulImg, {
				props: {
					contentfulSrc,
					width: 400,
					height: 300,
					alt: '^  Caption with leading spaces',
				},
			});

			const caption = getByText('Caption with leading spaces');
			expect(caption).toBeDefined();
		});
	});

	describe('removeLeafIcon computed property', () => {
		it('should show leaf icon when alt text starts with ^ only', () => {
			const { container } = render(KvContentfulImg, {
				props: {
					contentfulSrc,
					width: 400,
					height: 300,
					alt: '^Caption with leaf icon',
				},
			});

			const leafIcon = container.querySelector('svg');
			expect(leafIcon).toBeDefined();
			expect(leafIcon).not.toBeNull();
		});

		it('should hide leaf icon when alt text starts with ^#', () => {
			const { container } = render(KvContentfulImg, {
				props: {
					contentfulSrc,
					width: 400,
					height: 300,
					alt: '^#Caption without leaf icon',
				},
			});

			const leafIcon = container.querySelector('svg');
			expect(leafIcon).toBeNull();
		});

		it('should not show leaf icon when there is no caption', () => {
			const { container } = render(KvContentfulImg, {
				props: {
					contentfulSrc,
					width: 400,
					height: 300,
					alt: 'Regular alt text',
				},
			});

			const leafIcon = container.querySelector('svg');
			expect(leafIcon).toBeNull();
		});
	});

	describe('conditional rendering', () => {
		it('should not render when both width and height are missing', () => {
			const { container } = render(KvContentfulImg, {
				props: {
					contentfulSrc,
					alt: 'Test image',
				},
			});

			const figure = container.querySelector('figure');
			expect(figure).toBeNull();
		});

		it('should not render when contentfulSrc is empty', () => {
			const { container } = render(KvContentfulImg, {
				props: {
					contentfulSrc: '',
					width: 400,
					height: 300,
					alt: 'Test image',
				},
			});

			const figure = container.querySelector('figure');
			expect(figure).toBeNull();
		});

		it('should render when only width is provided', () => {
			const { container } = render(KvContentfulImg, {
				props: {
					contentfulSrc,
					width: 400,
					alt: 'Test image',
				},
			});

			const figure = container.querySelector('figure');
			expect(figure).not.toBeNull();
			const img = container.querySelector('img');
			expect(img).not.toBeNull();
		});

		it('should render when only height is provided', () => {
			const { container } = render(KvContentfulImg, {
				props: {
					contentfulSrc,
					height: 300,
					alt: 'Test image',
				},
			});

			const figure = container.querySelector('figure');
			expect(figure).not.toBeNull();
			const img = container.querySelector('img');
			expect(img).not.toBeNull();
		});
	});

	describe('animated gif handling', () => {
		const gifSrc = 'https://images.ctfassets.net/test/animation.gif';

		it('should not render a webp source element for animated gifs', () => {
			const { container } = render(KvContentfulImg, {
				props: {
					contentfulSrc: gifSrc,
					width: 400,
					height: 300,
					alt: 'Animated gif',
				},
			});

			const webpSource = container.querySelector('source[type="image/webp"]');
			expect(webpSource).toBeNull();
		});

		it('should render a webp source element for non-gif images', () => {
			const { container } = render(KvContentfulImg, {
				props: {
					contentfulSrc,
					width: 400,
					height: 300,
					alt: 'Regular image',
				},
			});

			const webpSource = container.querySelector('source[type="image/webp"]');
			expect(webpSource).not.toBeNull();
		});

		it('should use the raw gif url without query params on the img src', () => {
			const { container } = render(KvContentfulImg, {
				props: {
					contentfulSrc: gifSrc,
					width: 400,
					height: 300,
					alt: 'Animated gif',
				},
			});

			const img = container.querySelector('img');
			expect(img.getAttribute('src')).toBe(gifSrc);
		});
	});

	describe('fallbackFormat default param handling', () => {
		it('should default to jpg for a .jpg source url', () => {
			const { container } = render(KvContentfulImg, {
				props: {
					contentfulSrc,
					width: 400,
					height: 300,
					alt: 'Test image',
				},
			});

			const img = container.querySelector('img');
			expect(img.getAttribute('src')).toContain('fm=jpg');
		});

		it('should default to png for a .png source url', () => {
			const { container } = render(KvContentfulImg, {
				props: {
					contentfulSrc: 'https://images.ctfassets.net/test/image.png',
					width: 400,
					height: 300,
					alt: 'Test image',
				},
			});

			const img = container.querySelector('img');
			expect(img.getAttribute('src')).toContain('fm=png');
		});

		it('should default to jpg for a .webp source url', () => {
			const { container } = render(KvContentfulImg, {
				props: {
					contentfulSrc: 'https://images.ctfassets.net/test/image.webp',
					width: 400,
					height: 300,
					alt: 'Test image',
				},
			});

			const img = container.querySelector('img');
			expect(img.getAttribute('src')).toContain('fm=jpg');
		});

		it('should use explicit fallbackFormat prop over url-derived format', () => {
			const { container } = render(KvContentfulImg, {
				props: {
					contentfulSrc,
					width: 400,
					height: 300,
					alt: 'Test image',
					fallbackFormat: 'png',
				},
			});

			const img = container.querySelector('img');
			expect(img.getAttribute('src')).toContain('fm=png');
		});
	});

	describe('alt text behavior', () => {
		it('should use regular alt text on img element when no caption', () => {
			const { container } = render(KvContentfulImg, {
				props: {
					contentfulSrc,
					width: 400,
					height: 300,
					alt: 'Regular alt text',
				},
			});

			const img = container.querySelector('img');
			expect(img.getAttribute('alt')).toBe('Regular alt text');
		});

		it('should use caption as alt attribute when caption exists', () => {
			const { container } = render(KvContentfulImg, {
				props: {
					contentfulSrc,
					width: 400,
					height: 300,
					alt: '^This is a caption',
				},
			});

			const img = container.querySelector('img');
			expect(img.getAttribute('alt')).toBe('This is a caption');
		});

		it('should use trimmed caption as alt attribute when caption has ^#', () => {
			const { container } = render(KvContentfulImg, {
				props: {
					contentfulSrc,
					width: 400,
					height: 300,
					alt: '^#Caption without icon',
				},
			});

			const img = container.querySelector('img');
			expect(img.getAttribute('alt')).toBe('Caption without icon');
		});

		it('should handle empty alt text', () => {
			const { container } = render(KvContentfulImg, {
				props: {
					contentfulSrc,
					width: 400,
					height: 300,
					alt: '',
				},
			});

			const img = container.querySelector('img');
			expect(img.getAttribute('alt')).toBe('');
		});
	});
});
