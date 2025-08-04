export default function markMatches(text, marks) {
	// If no match is found, just return the label, unmarked
	if (!marks || !marks.length) {
		return text;
	}

	// Take array like [[2, 3], [6, 9], [11, 14]] and turn it into two separate arrays,
	// [2, 6, 11] and [3, 9, 14], named 'starts' and 'ends', respectively.
	// 'starts' is the indices of the label where a match starts, and thus should
	// have a '<mark>' tag inserted.
	// 'ends' is the indices of the label where a match ends, and thus should
	// have a '</mark>' tag inserted.
	const starts = marks.map((mark) => mark[0]).flat();
	const ends = marks.map((mark) => mark[1]).flat();

	// Build an array of strings, inserting the <mark> tags at the appropriate indices
	const charArray = Array.from(text).map((character, index) => {
		const prefix = starts.indexOf(index) > -1
			? '<mark class="tw-bg-tertiary tw-rounded-sm tw-mix-blend-multiply tw-p-0.5 tw--m-0.5">' : '';
		const suffix = ends.indexOf(index) > -1 ? '</mark>' : '';
		return `${prefix}${character}${suffix}`;
	});

	// Return all the the strings in the array concatenated together
	return charArray.join('');
}
