import paramCase from '#utils/paramCase';

describe('paramCase', () => {
	it('converts camelCase to param-case', () => {
		expect(paramCase('fooBarBaz')).toBe('foo-bar-baz');
	});

	it('converts PascalCase to param-case', () => {
		expect(paramCase('FooBarBaz')).toBe('foo-bar-baz');
	});

	it('converts spaces to dashes', () => {
		expect(paramCase('Foo Bar Baz')).toBe('foo-bar-baz');
	});

	it('converts underscores to dashes', () => {
		expect(paramCase('foo_bar_baz')).toBe('foo-bar-baz');
	});

	it('handles mixed cases and separators', () => {
		expect(paramCase('FooBar baz_qux')).toBe('foo-bar-baz-qux');
	});

	it('returns empty string for empty input', () => {
		expect(paramCase('')).toBe('');
	});

	it('handles single word', () => {
		expect(paramCase('Word')).toBe('word');
	});
});
