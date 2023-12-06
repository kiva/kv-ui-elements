export function redirectTo(href: string) {
	return new Promise(() => {
		window.location.href = href;
	});
}
