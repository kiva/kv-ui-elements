const round = (num) => num
	.toFixed(7)
	.replace(/(\.[0-9]+?)0+$/, '$1')
	.replace(/\.0$/, '');

export const rem = (px) => `${round(px / 16)}rem`;
export const em = (px, base) => `${round(px / base)}em`;

export const hexToRGB = (hex) => {
	// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	const replacedHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(replacedHex);
	return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
};

export const base64 = (str) => {
	if (typeof window === 'undefined') return Buffer.from(str).toString('base64');
	return window.btoa(str);
};

export const flattenJSON = (obj, parentKey = '') => {
	const flattened = {};

	Object.keys(obj).forEach((key) => {
		const newKey = parentKey ? `${parentKey}-${key}` : key;
		if (typeof obj[key] === 'object') {
			Object.assign(flattened, flattenJSON(obj[key], newKey));
		} else {
			flattened[newKey] = obj[key];
		}
	});

	return flattened;
};
