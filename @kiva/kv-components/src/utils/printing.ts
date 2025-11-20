export function lockPrintSingleEl(domNode: Element) {
	if (typeof window !== 'undefined' && domNode) {
		document.body.classList.add('print:tw-invisible', 'print:tw-overflow-hidden');
		domNode.classList.add('print:tw-visible', 'print:tw-overflow-auto');
	}
}

export function unlockPrintSingleEl(domNode: Element) {
	if (typeof window !== 'undefined' && domNode) {
		document.body.classList.remove('print:tw-invisible', 'print:tw-overflow-hidden');
		domNode.classList.remove('print:tw-visible', 'print:tw-overflow-auto');
	}
}
