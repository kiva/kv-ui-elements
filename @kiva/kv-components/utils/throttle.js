// eslint-disable-next-line import/prefer-default-export
export function throttle(func, timeFrame) {
	let lastTime = 0;
	return function t(...args) {
		const now = new Date();
		if (now - lastTime >= timeFrame) {
			func(...args);
			lastTime = now;
		}
	};
}
