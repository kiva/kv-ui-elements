/* eslint-disable import/prefer-default-export, max-len, no-shadow */

interface TreemapDataPoint {
	value: number;
	[key: string]: any;
}

interface TreemapRect {
	x: number;
	y: number;
	width: number;
	height: number;
	data: TreemapDataPoint;
}

interface Rectangle {
	data: TreemapRect[];
	xBeginning: number;
	yBeginning: number;
	totalWidth: number;
	totalHeight: number;
}

const getMaximum = (array: number[]): number => Math.max(...array);

const getMinimum = (array: number[]): number => Math.min(...array);

const sumReducer = (acc: number, cur: number): number => acc + cur;

const roundValue = (number: number): number => Math.max(Math.round(number * 100) / 100, 0);

const validateArguments = ({ data, width, height }: { data: TreemapDataPoint[]; width: number; height: number }): void => {
	if (!width || typeof width !== 'number' || width < 0) {
		throw new Error('You need to specify the width of your treemap');
	}
	if (!height || typeof height !== 'number' || height < 0) {
		throw new Error('You need to specify the height of your treemap');
	}
	if (!data || !Array.isArray(data) || data.length === 0 || !data.every((dataPoint) => Object.prototype.hasOwnProperty.call(dataPoint, 'value') && typeof dataPoint.value === 'number' && dataPoint.value >= 0 && !Number.isNaN(dataPoint.value))) {
		throw new Error('You data must be in this format [{ value: 1 }, { value: 2 }], \'value\' being a positive number');
	}
};

/**
 * Used to calculate the coordinates of a treemap representation following the "squarify" algorithm
 *
 * Clément Bataille, 2020
 * Licensed under the MIT license
 *
 * {@link https://github.com/clementbat/treemap}
 *
 * @param param0.data The coordinate data to use in the calculation
 * @param param0.width The width of the treemap
 * @param param0.height The height of the treemap
 * @returns The calculated coordinates
 */
export function getTreemap({ data, width, height }: { data: TreemapDataPoint[]; width: number; height: number }): TreemapRect[] {
	let Rectangle: Rectangle;
	let initialData: TreemapDataPoint[] = [];

	function worstRatio(row: number[], width: number): number {
		const sum = row.reduce(sumReducer, 0);
		const rowMax = getMaximum(row);
		const rowMin = getMinimum(row);
		return Math.max(((width ** 2) * rowMax) / (sum ** 2), (sum ** 2) / ((width ** 2) * rowMin));
	}

	const getMinWidth = (): { value: number; vertical: boolean } => {
		if (Rectangle.totalHeight ** 2 > Rectangle.totalWidth ** 2) {
			return { value: Rectangle.totalWidth, vertical: false };
		}
		return { value: Rectangle.totalHeight, vertical: true };
	};

	const layoutRow = (row: number[], width: number, vertical: boolean): void => {
		const rowHeight = row.reduce(sumReducer, 0) / width;

		row.forEach((rowItem) => {
			const rowWidth = rowItem / rowHeight;
			const { xBeginning } = Rectangle;
			const { yBeginning } = Rectangle;

			let data;
			if (vertical) {
				data = {
					x: xBeginning,
					y: yBeginning,
					width: rowHeight,
					height: rowWidth,
					data: initialData[Rectangle.data.length],
				};
				Rectangle.yBeginning += rowWidth;
			} else {
				data = {
					x: xBeginning,
					y: yBeginning,
					width: rowWidth,
					height: rowHeight,
					data: initialData[Rectangle.data.length],
				};
				Rectangle.xBeginning += rowWidth;
			}

			Rectangle.data.push(data);
		});

		if (vertical) {
			Rectangle.xBeginning += rowHeight;
			Rectangle.yBeginning -= width;
			Rectangle.totalWidth -= rowHeight;
		} else {
			Rectangle.xBeginning -= width;
			Rectangle.yBeginning += rowHeight;
			Rectangle.totalHeight -= rowHeight;
		}
	};

	const layoutLastRow = (rows: number[], children: number[], width: number): void => {
		const { vertical } = getMinWidth();
		layoutRow(rows, width, vertical);
		layoutRow(children, width, vertical);
	};

	const squarify = (children: number[], row: number[], width: number): void => {
		if (children.length === 1) {
			return layoutLastRow(row, children, width);
		}

		const rowWithChild = [...row, children[0]];

		if (row.length === 0 || worstRatio(row, width) >= worstRatio(rowWithChild, width)) {
			children.shift();
			return squarify(children, rowWithChild, width);
		}
		layoutRow(row, width, getMinWidth().vertical);
		return squarify(children, [], getMinWidth().value);
	};

	validateArguments({ data, width, height });
	Rectangle = {
		data: [],
		xBeginning: 0,
		yBeginning: 0,
		totalWidth: width,
		totalHeight: height,
	};
	initialData = data;
	const totalValue = data.map((dataPoint) => dataPoint.value).reduce(sumReducer, 0);
	const dataScaled = data.map((dataPoint) => (dataPoint.value * height * width) / totalValue);

	squarify(dataScaled, [], getMinWidth().value);
	return Rectangle.data.map((dataPoint) => ({
		...dataPoint,
		x: roundValue(dataPoint.x),
		y: roundValue(dataPoint.y),
		width: roundValue(dataPoint.width),
		height: roundValue(dataPoint.height),
	}));
}
