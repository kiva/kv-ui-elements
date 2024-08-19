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
 * @param {Array} startCoordinates - starting coordinates in the format [latitude, longitude]
 * @param {Array} endCoordinates - ending coordinates in the format [latitude, longitude]
 * @param {Number} numberOfSteps - number of steps to take between the start and end coordinates
 * @returns {Array} - array of coordinates in the format [[latitude, longitude], [latitude, longitude]]
*/
export function getCoordinatesBetween(startCoordinates, endCoordinates, numberOfSteps) {
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

	const lineCoordinates = [];

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
 * @param {Map Instance} mapInstance - the map instance
 * @param {Array} originPoints - array of starting coordinates in the format [[latitude, longitude], [latitude, longitude]]
 * @param {Array} endPoint - single end point in the format [latitude, longitude]
 * @returns {Promise} - promise that resolves when the animation is complete
*/
function animateLines(mapInstance, originPoints, endPoint) {
	const speedFactor = 100; // number of frames per degree, controls animation speed
	return new Promise((resolve) => {
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

		const lineFlight = (startCoordinates, endCoordinates, index, lastLine = false) => {
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
	const geojson = {
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
		// eslint-disable-next-line no-undef
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
	return new Promise((resolve) => {
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
 * @param {Integer} min - min number of the interval
 * @param {Integer} max - max number of the interval
 * @param {Integer} nbIntervals - number of intervals
 * @returns {Array} - array with intervals
 * */
export const getLoansIntervals = (min, max, nbIntervals) => {
	const size = Math.floor((max - min) / nbIntervals);
	const result = [];

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
 * @param {Integer} lenderLoans - number of loans per country
 * @param {Array} countriesData - data of countries
 * @param {Object} kvTokensPrimitives - kv tokens for colors
 * @returns {String} - color of the country
 * */
export const getCountryColor = (lenderLoans, countriesData, kvTokensPrimitives) => {
	const loanCountsArray = [];
	countriesData.forEach((country) => {
		loanCountsArray.push(country.value);
	});

	const maxNumLoansToOneCountry = Math.max(...loanCountsArray);
	const intervals = getLoansIntervals(1, maxNumLoansToOneCountry, 6);

	if (intervals.length === 1) {
		const [inf, sup] = intervals[0]; // eslint-disable-line no-unused-vars

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

	return kvTokensPrimitives.colors.gray[300];
};
