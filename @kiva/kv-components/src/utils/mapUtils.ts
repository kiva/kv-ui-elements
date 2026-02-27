import type MapLibreGl from 'maplibre-gl';

declare const maplibregl: typeof MapLibreGl;

/**
 * Code to generate random coordinates
 * */
function getRandomInRange(from, to, fixed) {
	return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
	// .toFixed() returns string, so ' * 1' is a trick to convert to number
}
const randomCoordinates = Array.from(
	{ length: 20 },
	() => [getRandomInRange(-180, 180, 3), getRandomInRange(-90, 90, 3)],
);

/**
 * Color indexes for the map
 * */
const mapColors = [
	100,
	300,
	500,
	650,
	800,
	1000,
];

/**
 * Given 2 coordinates and the number of steps return an array of coordinates in between
 * @param startCoordinates - starting coordinates in the format [latitude, longitude]
 * @param endCoordinates - ending coordinates in the format [latitude, longitude]
 * @param numberOfSteps - number of steps to take between the start and end coordinates
 * @returns - array of coordinates in the format [[latitude, longitude], [latitude, longitude]]
*/
export function getCoordinatesBetween(
	startCoordinates: number[],
	endCoordinates: number[],
	numberOfSteps: number,
): number[][] {
	// All invalid inputs should return an empty array
	if (!startCoordinates
		|| !endCoordinates
		|| !numberOfSteps
		|| numberOfSteps < 1
		|| !Array.isArray(startCoordinates)
		|| !Array.isArray(endCoordinates)
		|| startCoordinates.length !== 2 || endCoordinates.length !== 2) {
		return [];
	}
	const diffX = endCoordinates[0] - startCoordinates[0];
	const diffY = endCoordinates[1] - startCoordinates[1];

	const sfX = diffX / numberOfSteps;
	const sfY = diffY / numberOfSteps;

	let i = 0;
	let j = 0;

	const lineCoordinates: number[][] = [];

	while (Math.abs(i) < Math.abs(diffX) || Math.abs(j) < Math.abs(diffY)) {
		lineCoordinates.push([startCoordinates[0] + i, startCoordinates[1] + j]);

		if (Math.abs(i) < Math.abs(diffX)) {
			i += sfX;
		}

		if (Math.abs(j) < Math.abs(diffY)) {
			j += sfY;
		}
	}
	// Because of rounding errors, lets push the exact end coordinates
	// as the last item in the array to make sure the line ends precisely
	lineCoordinates[lineCoordinates.length - 1] = [endCoordinates[0], endCoordinates[1]];
	return lineCoordinates;
}

/**
 * This function animates a series of lines from an array of starting coordinates to a single end point
 * then animates removing the line from the origin to the end point
 * returns a promise when the animation is complete
 * @param mapInstance - the map instance
 * @param originPoints - array of starting coordinates in the format [[latitude, longitude], [latitude, longitude]]
 * @param endPoint - single end point in the format [latitude, longitude]
 * @returns - promise that resolves when the animation is complete
*/
function animateLines(
	mapInstance: any,
	originPoints: number[][],
	endPoint: number[],
): Promise<void> {
	const speedFactor = 100; // number of frames per degree, controls animation speed
	return new Promise<void>((resolve) => {
		// EndPoint
		mapInstance.addSource('endpoint', {
			type: 'geojson',
			data: {
				type: 'Point',
				coordinates: [
					endPoint[0], endPoint[1],
				],
			},
		});

		const lineFlight = (startCoordinates: number[], endCoordinates: number[], index: number, lastLine = false) => {
			const lineCoordinates = getCoordinatesBetween(startCoordinates, endCoordinates, speedFactor);
			let animationCounter = 0;

			// Create a GeoJSON source with an empty lineString.
			const geojson = {
				type: 'FeatureCollection',
				features: [{
					type: 'Feature',
					geometry: {
						type: 'LineString',
						coordinates: [],
					},
				}],
			};

			// Start Point
			mapInstance.addSource(`startPoint${index}`, {
				type: 'geojson',
				data: {
					type: 'Point',
					coordinates: [
						startCoordinates[0], startCoordinates[1],
					],
				},
			});

			// Line
			mapInstance.addLayer({
				id: `line-animation${index}`,
				type: 'line',
				source: {
					type: 'geojson',
					data: geojson,
				},
				layout: {
					'line-cap': 'round',
					'line-join': 'round',
				},
				paint: {
					'line-color': '#277056',
					'line-width': 2,
				},
			});

			const animateLine = () => {
				if (animationCounter < lineCoordinates.length) {
					geojson.features[0].geometry.coordinates.push(lineCoordinates[animationCounter]);
					mapInstance.getSource(`line-animation${index}`).setData(geojson);

					requestAnimationFrame(animateLine);
					animationCounter += 1;
				} else {
					// This else block is for animating line removal from start to end
					const coord = geojson.features[0].geometry.coordinates;
					// remove 2 points at a time so the removal is twice as fast as the line creation
					coord.shift();
					coord.shift();

					if (coord.length > 0) {
						geojson.features[0].geometry.coordinates = coord;
						mapInstance.getSource(`line-animation${index}`).setData(geojson);
						requestAnimationFrame(animateLine);
					} else {
						// remove all sources to allow for new animation
						mapInstance.removeLayer(`line-animation${index}`);
						mapInstance.removeSource(`line-animation${index}`);
						mapInstance.removeSource(`startPoint${index}`);

						if (lastLine) {
							mapInstance.removeSource('endpoint');
							resolve();
						}
					}
				}
			};

			animateLine();
		};

		originPoints.forEach((coordinate, index) => {
			lineFlight(coordinate, endPoint, index, index === originPoints.length - 1);
		});
	});
}

/**
 * This function generates a map marker for each borrowerPoint
 * @param {Map Instance} mapInstance - the map instance
 * @param {Array} borrowerPoints - array of borrower objects
 * @returns {void}
 * */
export function generateMapMarkers(mapInstance, borrowerPoints) {
	const geojson: {
		type: string;
		features?: any[];
	} = {
		type: 'FeatureCollection',
	};

	geojson.features = borrowerPoints.map((borrower) => ({
		type: 'Feature',
		properties: {
			message: 'test',
			image: borrower.image,
			iconSize: [80, 80],
		},
		geometry: {
			type: 'Point',
			coordinates: borrower.location,
		},
	}));
	// add markers to map
	geojson.features.forEach((marker) => {
		// create a DOM element for the marker
		const el = document.createElement('div');
		el.className = 'map-marker';
		el.style.backgroundImage = `url(${marker.properties.image})`;
		el.style.width = `${marker.properties.iconSize[0]}px`;
		el.style.height = `${marker.properties.iconSize[1]}px`;

		// Possible place to add an event listener
		// el.addEventListener('click', () => {
		// 	window.alert(marker.properties.message);
		// });

		// add marker to map
		// maplibregl should be defined in the KvMap component
		new maplibregl.Marker({ element: el })
			.setLngLat(marker.geometry.coordinates)
			.addTo(mapInstance);
	});
}

/**
 * This function animates a series of lines from an array of starting coordinates to a single end point
 * then animates removing the line from the origin to the end point
 * then flies to the next point in the array and repeats the animation
 * returns a promise when the animation is complete
 * @param {Map Instance} mapInstance - the map instance
 * @param {Array} borrowerPoints - array of borrower objects
 * @returns {Promise} - promise that resolves when the animation is complete
 * */
export function animationCoordinator(mapInstance, borrowerPoints) {
	return new Promise<void>((resolve) => {
		const destinationPoints = borrowerPoints.map((borrower) => borrower.location);
		const totalNumberOfPoints = destinationPoints.length;
		let currentPointIndex = 0;

		const flyToPoint = (index) => {
			mapInstance.flyTo({
				// These options control the ending camera position: centered at
				// the target, at zoom level 9, and north up.
				center: destinationPoints[index],
				zoom: 4,
				bearing: 0,

				// These options control the flight curve, making it move
				// slowly and zoom out almost completely before starting
				// to pan.
				speed: 0.9, // make the flying slow
				curve: 1, // change the speed at which it zooms out

				// This can be any easing function: it takes a number between
				// 0 and 1 and returns another number between 0 and 1.
				easing(t) {
					return t;
				},

				// this animation is considered essential with respect to prefers-reduced-motion
				essential: true,
			}, { flyEnd: true });
		};

		// This will trigger the next steps in the animation chain
		mapInstance.on('moveend', (event) => {
			if (event.flyEnd === true) {
				animateLines(mapInstance, randomCoordinates, destinationPoints[currentPointIndex])
					.then(() => {
						if (currentPointIndex < totalNumberOfPoints - 1) {
							currentPointIndex += 1;
							flyToPoint(currentPointIndex);
						} else {
							resolve();
						}
					});
			}
		});

		// fly to point 1
		flyToPoint(currentPointIndex);
	});
}

/**
 * This function returns an array of not overlapped intervals between min and max
 * @param min - min number of the interval
 * @param max - max number of the interval
 * @param nbIntervals - number of intervals
 * @returns - array with intervals
 * */
export const getLoansIntervals = (min: number, max: number, nbIntervals: number): number[][] => {
	const size = Math.floor((max - min) / nbIntervals);
	const result: number[][] = [];

	if (size <= 0) return [[min, max]];

	for (let i = 0; i < nbIntervals; i += 1) {
		let inf = min + (i * size);
		let sup = ((inf + size) < max) ? inf + size : max;

		if (i > 0) {
			inf += (1 * i);
			sup += (1 * i);
		}

		if (i > 0 && sup > max) {
			sup = max;
		}

		if (i === (nbIntervals - 1)) {
			if (sup < max || sup > max) sup = max;
		}

		result.push([inf, sup]);

		if (sup >= max) break;
	}

	return result;
};

/**
 * This function returns the color of the country based on the number of loans
 * @param lenderLoans - number of loans per country
 * @param countriesData - data of countries
 * @param kvTokensPrimitives - kv tokens for colors
 * @param defaultBaseColor - default base color
 * @returns - color of the country
 * */
export const getCountryColor = (
	lenderLoans: number,
	countriesData: any[],
	kvTokensPrimitives: any,
	defaultBaseColor: string,
): string => {
	const loanCountsArray: number[] = [];
	countriesData.forEach((country) => {
		loanCountsArray.push(country.value);
	});

	const maxNumLoansToOneCountry = Math.max(...loanCountsArray);
	const intervals = getLoansIntervals(1, maxNumLoansToOneCountry, 6);

	if (intervals.length === 1) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const [_inf, sup] = intervals[0];

		for (let i = 0; i < sup; i += 1) {
			const loansNumber = i + 1;

			if (lenderLoans && lenderLoans >= loansNumber && lenderLoans < loansNumber + 1) {
				return kvTokensPrimitives.colors.brand[mapColors[i]];
			}
		}
	} else {
		for (let i = 0; i < intervals.length; i += 1) {
			const [inf, sup] = intervals[i];
			if (lenderLoans && lenderLoans >= inf && lenderLoans <= sup) {
				return kvTokensPrimitives.colors.brand[mapColors[i]];
			}
		}
	}

	if (defaultBaseColor) {
		return defaultBaseColor;
	}

	return kvTokensPrimitives.colors.gray[300];
};

/**
 * Computes the map center based on the distribution of loans across countries.
 * If there are no loans, it defaults to a world view (0, 0).
 * @param data - array of country stats with lat/long coordinates
 * @returns - center coordinates as { lat, long }
 */
export const computeMapCenter = (
	data: Array<{ lat: number; long: number }>,
): { lat: number; long: number } => {
	if (!data.length) return { lat: 0, long: 0 };

	const lat = data.reduce((sum, d) => sum + d.lat, 0) / data.length;
	const long = data.reduce((sum, d) => sum + d.long, 0) / data.length;

	return { lat, long };
};

/**
 * Computes the zoom level based on the geographic spread of countries.
 * Uses a logarithmic scale based on the maximum span of latitudes and longitudes,
 * with padding to ensure all points are visible within a buffer zone.
 * @param data - array of country stats with lat/long coordinates
 * @returns - zoom level between 1 and 6
 */
export const computeMapZoom = (
	data: Array<{ lat: number; long: number }>,
): number => {
	if (!data.length) return 2;
	if (data.length === 1) return 5;

	const lats = data.map((d) => d.lat);
	const longs = data.map((d) => d.long);
	const latSpan = Math.max(...lats) - Math.min(...lats);
	const longSpan = Math.max(...longs) - Math.min(...longs);
	const maxSpan = Math.max(latSpan, longSpan);

	// Countries very close together (< 1 degree apart)
	if (maxSpan < 1) return 6;
	// Countries in same region (< 10 degrees apart)
	if (maxSpan < 10) return 5;
	// Padding multiplier of 2.5 ensures countries stay within a buffer zone from map edges
	const zoom = Math.floor(Math.log2(360 / (maxSpan * 2.5)));
	return Math.max(1, Math.min(zoom, 6));
};
