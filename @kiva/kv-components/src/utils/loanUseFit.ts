/**
 * Fits a loan use statement with a trailing "read more" link inside a line clamp.
 *
 * The link is part of the same paragraph as the statement, so a plain CSS clamp hides it on a
 * long statement. These helpers measure the rendered paragraph and shorten the statement text
 * instead, so "… read more" ends the last visible line.
 */

export const READ_MORE_CLASS = 'kv-loan-use-read-more';

const ELLIPSIS = '…';

// A one pixel tolerance keeps sub-pixel rounding from reading as overflow.
export const overflows = (statement: HTMLElement) => statement.scrollHeight > statement.clientHeight + 1;

const isText = (node: ChildNode) => node.nodeType === Node.TEXT_NODE && Boolean(node.textContent?.trim());

// The last run of text before the "read more" span: the tail of the use statement. Null when the
// paragraph has no text of its own.
export const findStatementTail = (statement: HTMLElement) => {
	const nodes = Array.from(statement.childNodes);
	const readMore = statement.querySelector(`.${READ_MORE_CLASS}`);
	const end = readMore ? nodes.indexOf(readMore) : nodes.length;
	return nodes.slice(0, end).reverse().find(isText) ?? null;
};

// Drops words from the end of the statement until "… read more" fits inside the clamp, keeping as
// many as fit. Expects the full text to overflow when called; a statement without a tail is left as is.
export const trimStatementToFit = (statement: HTMLElement) => {
	const tail = findStatementTail(statement);
	if (!tail) return;
	const text = tail.textContent ?? '';
	// The tail usually starts right after the name span; keep that space or "Pakistanbuy" appears.
	const leadingSpace = /^\s/.test(text) ? ' ' : '';
	const words = text.trim().split(/\s+/);
	const applyWordCount = (count: number) => {
		// Drop punctuation the ellipsis would otherwise follow ("thread,…"), keep a space before "read more".
		const kept = words.slice(0, count).join(' ').replace(/[,;:]$/, '');
		tail.textContent = `${leadingSpace}${kept}${ELLIPSIS} `;
	};
	let low = 1;
	let high = words.length - 1;
	let best = 1;
	while (low <= high) {
		const mid = Math.floor((low + high) / 2);
		applyWordCount(mid);
		if (overflows(statement)) {
			high = mid - 1;
		} else {
			best = mid;
			low = mid + 1;
		}
	}
	applyWordCount(best);
};

// Renders the full statement and makes it fit the clamp: shown whole when it fits, shown whole
// without the link when only the link overflows, and otherwise trimmed so "… read more" ends the
// last visible line.
export const fitStatement = (statement: HTMLElement, html: string) => {
	// eslint-disable-next-line no-param-reassign
	statement.innerHTML = html;
	if (!overflows(statement)) return;
	const readMore = statement.querySelector(`.${READ_MORE_CLASS}`);
	if (readMore) {
		readMore.remove();
		if (!overflows(statement)) {
			// The markup puts a space before the link; drop it so the statement ends cleanly.
			const tail = findStatementTail(statement);
			if (tail) tail.textContent = (tail.textContent ?? '').trimEnd();
			return;
		}
		// eslint-disable-next-line no-param-reassign
		statement.innerHTML = html;
	}
	trimStatementToFit(statement);
};
