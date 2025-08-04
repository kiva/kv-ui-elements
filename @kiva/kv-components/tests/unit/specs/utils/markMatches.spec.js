import markMatches from '#utils/markMatches';

describe('markMatches', () => {
	it('returns text unchanged if marks is empty', () => {
		expect(markMatches('hello', [])).toBe('hello');
		expect(markMatches('world', null)).toBe('world');
	});

	it('marks a single range', () => {
		const text = 'abc';
		const marks = [[0, 2]];
		const result = markMatches(text, marks);
		const markStart = '<mark class="tw-bg-tertiary tw-rounded-sm tw-mix-blend-multiply tw-p-0.5 tw--m-0.5">';
		const markEnd = '</mark>';
		const expected = `${markStart}abc${markEnd}`;

		expect(result).toBe(expected);
	});

	it('marks multiple ranges', () => {
		const text = 'abde';
		const marks = [[0, 1], [2, 3]];
		const result = markMatches(text, [marks]);
		const markStart = '<mark class="tw-bg-tertiary tw-rounded-sm tw-mix-blend-multiply tw-p-0.5 tw--m-0.5">';
		const markEnd = '</mark>';
		const manual = text.split('').map((ch, i) => {
			let prefix = '';
			let suffix = '';
			if ([0, 1].includes(i)) prefix = markStart;
			if ([2, 3].includes(i)) suffix = markEnd;
			return prefix + ch + suffix;
		}).join('');
		expect(result).toBe(manual);
	});
});
