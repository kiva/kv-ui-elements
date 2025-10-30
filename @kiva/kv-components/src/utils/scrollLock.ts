export function lockScroll() {
	if (typeof window !== 'undefined') {
		document.body.style.overflow = 'hidden'; // kludge until we are not prefixing tailwind classes in UI
		// document.body.classList.add('tw-overflow-hidden');
	}
}

export function unlockScroll() {
	if (typeof window !== 'undefined') {
		document.body.style.overflow = null; // kludge until we are not prefixing tailwind classes in UI
		// document.body.classList.remove('tw-overflow-hidden');
	}
}

export function lockScrollSmallOnly() {
	if (typeof window !== 'undefined') {
		document.body.classList.add('tw-overflow-hidden', 'md:tw-overflow-auto');
	}
}

export function unlockScrollSmallOnly() {
	if (typeof window !== 'undefined') {
		document.body.classList.remove('tw-overflow-hidden', 'md:tw-overflow-auto');
	}
}
