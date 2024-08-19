<template>
	<div
		class="tw-relative tw-block tw-w-full"
		:style="mapDimensions"
	>
		<div
			:id="`kv-map-holder-${mapId}`"
			:ref="refString"
			class="tw-w-full tw-h-full tw-bg-black"
			:style="{ position: 'absolute' }"
		></div>
	</div>
</template>

<script>
import kvTokensPrimitives from '@kiva/kv-tokens/primitives.json';
import { animationCoordinator, generateMapMarkers, getCountryColor } from '../utils/mapUtils';
import countriesBorders from '../data/countries-borders.json';

export default {
	name: 'KvMap',
	props: {
		/**
		 * Aspect Ration for computed map dimensions
		 * We'll divide the container width by this to determine the height
		 */
		aspectRatio: {
			type: Number,
			default: 1,
		},
		/**
		 * Control how quickly the autoZoom occurs
		 */
		autoZoomDelay: {
			type: Number,
			default: 1500,
		},
		/**
		 * Set the height to override aspect ratio driven and/or default dimensions
		 */
		height: {
			type: Number,
			default: null,
		},
		/**
		 * Setting this initialZoom will zoom the map from initialZoom to zoom when the map enters the viewport
		 */
		initialZoom: {
			type: Number,
			default: null,
		},
		/**
		 * Set the center point latitude
		 */
		lat: {
			type: Number,
			default: null,
		},
		/**
		 * Set the center point longitude
		 */
		long: {
			type: Number,
			default: null,
		},
		/**
		 * Set this if there are more than one map on the page
		 */
		mapId: {
			type: Number,
			default: 0,
		},
		/**
		 * Force use of Leaflet
		 */
		useLeaflet: {
			type: Boolean,
			default: false,
		},
		/**
		 * Set the width to override aspect ratio driven and/or default dimensions
		 */
		width: {
			type: Number,
			default: null,
		},
		/**
		 * Default zoom level
		 */
		zoomLevel: {
			type: Number,
			default: 4,
		},
		/**
		 * Borrower points object.
		 * If this object is present, the advanced animation will be triggered
		 * Sample object:
		 * {
			borrowerPoints: [
				{
					image: 'https://www-kiva-org.freetls.fastly.net/img/w80h80fz50/e60a3d61ff052d60991c5d6bbf4a45d3.jpg',
					location: [-77.032, 38.913],
				},
				{
					image: 'https://www-kiva-org.freetls.fastly.net/img/w80h80fz50/6101929097c6e5de48232a4d1ae3b71c.jpg',
					location: [41.402, 7.160],
				},
				{
					image: 'https://www-kiva-org.freetls.fastly.net/img/w80h80fz50/11e018ee3d8b9c5adee459c16a29d264.jpg',
					location: [-73.356596, 3.501],
				},
			],
		* }
		*/
		advancedAnimation: {
			type: Object,
			required: false,
			default: () => ({}),
		},
		/**
		 * Show the zoom control
		 */
		showZoomControl: {
			type: Boolean,
			default: false,
		},
		/**
		 * Allow dragging of the map
		 */
		allowDragging: {
			type: Boolean,
			default: false,
		},
		/**
		 * Show labels on the map
		 * Working for leaflet only
		 */
		showLabels: {
			type: Boolean,
			default: true,
		},
		/**
		 * Lender data for the map
		 * Working for leaflet only
		 */
		countriesData: {
			type: Array,
			default: () => ([]),
		},
		/**
		 * Show fundraising loans
		 * Working for leaflet only
		 */
		showFundraisingLoans: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			hasWebGL: false,
			leafletReady: false,
			mapInstance: null,
			mapLibreReady: false,
			mapLoaded: false,
			zoomActive: false,
		};
	},
	computed: {
		mapDimensions() {
			// Use container to derive height based on aspect ration + width
			const container = this.$el?.getBoundingClientRect();
			const height = container ? `${container.width / this.aspectRatio}px` : '300px';
			const width = container ? `${container.width}px` : '100%';
			// Override values if deliberate height or width are provided
			return {
				height: this.height ? `${this.height}px` : height,
				width: this.width ? `${this.width}px` : width,
				paddingBottom: this.height ? `${this.height}px` : `${100 / this.aspectRatio}%`,
			};
		},
		refString() {
			return `mapholder${this.mapId}`;
		},
	},
	watch: {
		lat(next, prev) {
			if (prev === null && this.long && !this.mapLibreReady && !this.leafletReady) {
				this.initializeMap();
			}
		},
		long(next, prev) {
			if (prev === null && this.lat && !this.mapLibreReady && !this.leafletReady) {
				this.initializeMap();
			}
		},
		showFundraisingLoans() {
			if (this.mapInstance) {
				this.mapInstance.remove();
				this.initializeLeaflet();
			}
		},
	},
	mounted() {
		if (!this.mapLibreReady && !this.leafletReady) {
			this.initializeMap();
		}
	},
	beforeDestroy() {
		if (this.mapInstance) {
			if (!this.hasWebGL && !this.leafletReady) {
				// turn off the leaflet instance
				this.mapInstance.off();
			}
			// remove either leaflet or maplibregl
			this.mapInstance.remove();
		}
		this.destroyWrapperObserver();
	},
	methods: {
		activateZoom(zoomOut = false) {
			const { mapInstance, hasWebGL, mapLibreReady } = this;
			const currentZoomLevel = mapInstance.getZoom();
			// exit if already zoomed in (getZoom() works for both leaflet + maplibregl)
			if ((!zoomOut && currentZoomLevel === this.zoomLevel)
				|| (zoomOut && currentZoomLevel === this.initialZoom)) return false;

			this.zoomActive = true;
			// establish delayed zoom duration
			const timedZoom = window.setTimeout(() => {
				if (hasWebGL && mapLibreReady) {
					// maplibregl specific zoom method
					mapInstance.zoomTo(
						zoomOut ? this.initialZoom : this.zoomLevel,
						{ duration: 1200 },
					);
				} else {
					// leaflet specific zoom method
					mapInstance.setZoom(zoomOut ? this.initialZoom : this.zoomLevel);
				}

				clearTimeout(timedZoom);
				this.zoomActive = false;
			}, this.autoZoomDelay);
		},
		createWrapperObserver() {
			// Watch for the wrapper element moving in and out of the viewport
			this.wrapperObserver = this.createIntersectionObserver({
				targets: [this.$refs?.[this.refString]],
				callback: (entries) => {
					// only activate autoZoom if we have an initialZoom set
					entries.forEach((entry) => {
						if (entry.target === this.$refs?.[this.refString] && !this.zoomActive) {
							if (entry.intersectionRatio > 0) {
								// activate zoom
								if (this.initialZoom !== null) {
									this.activateZoom();
								}
								// animate map
								if (this.advancedAnimation?.borrowerPoints) {
									this.animateMap();
								}
							}
						}
					});
				},
			});
		},
		destroyWrapperObserver() {
			if (this.wrapperObserver) {
				this.wrapperObserver.disconnect();
			}
		},
		checkWebGL() {
			// exit and use leaflet if specified or document isn't present
			if (this.useLeaflet || typeof document === 'undefined') return false;
			// via. https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/By_example/Detect_WebGL
			// Create canvas element. The canvas is not added to the document itself,
			// so it is never displayed in the browser window.
			const canvas = document.createElement('canvas');
			// Get WebGLRenderingContext from canvas element.
			const gl = canvas.getContext('webgl')
			|| canvas.getContext('experimental-webgl');
			// Report the result.
			if (gl && gl instanceof WebGLRenderingContext) {
				this.hasWebGL = true;
				return true;
			}
			return false;
		},
		initializeMap() {
			/**
			 * This initial checkWebGL() call kicks off the library asset inclusion
			 * We then start polling for the readiness of our selected map library and initialize it once ready
			 */
			const mapScript = document.createElement('script');
			const mapStyle = document.createElement('link');
			mapScript.setAttribute('async', true);
			mapScript.setAttribute('defer', true);
			mapStyle.setAttribute('rel', 'stylesheet');
			if (this.checkWebGL()) {
				mapScript.setAttribute('vmid', `maplibregljs${this.mapId}`);
				mapStyle.setAttribute('vmid', `maplibreglcss${this.mapId}`);
				mapScript.setAttribute('src', 'https://unpkg.com/maplibre-gl@latest/dist/maplibre-gl.js');
				mapStyle.setAttribute('href', 'https://unpkg.com/maplibre-gl@latest/dist/maplibre-gl.css');

				this.testDelayedGlobalLibrary('maplibregl').then((response) => {
					if (response.loaded && !this.mapLoaded && !this.useLeaflet && this.lat && this.long) {
						this.initializeMapLibre();
						this.mapLibreReady = true;
					}
				});
			} else {
				mapScript.setAttribute('vmid', `leafletjs${this.mapId}`);
				mapStyle.setAttribute('vmid', `leaftletcss${this.mapId}`);
				mapScript.setAttribute('src', 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js');
				mapStyle.setAttribute('href', 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');

				this.testDelayedGlobalLibrary('L').then((leafletTest) => {
					if (leafletTest.loaded && !this.mapLoaded && this.lat && this.long) {
						this.initializeLeaflet();
						this.leafletReady = true;
					}
				});
			}
			document.head.appendChild(mapScript);
			document.head.appendChild(mapStyle);
		},
		initializeLeaflet() {
			/* eslint-disable no-undef, max-len */
			// Initialize primary mapInstance
			this.mapInstance = L.map(`kv-map-holder-${this.mapId}`, {
				center: [this.lat, this.long],
				zoom: this.initialZoom || this.zoomLevel,
				// todo make props for the following options
				dragging: this.allowDragging,
				zoomControl: this.showZoomControl,
				animate: true,
				scrollWheelZoom: false,
				doubleClickZoom: false,
				attributionControl: false,
			});
			/* eslint-disable quotes */
			// Add our tileset to the mapInstance
			let tileLayer = 'https://api.maptiler.com/maps/landscape/{z}/{x}/{y}.png?key=n1Mz5ziX3k6JfdjFe7mx';
			if (this.showLabels) {
				tileLayer = 'https://api.maptiler.com/maps/bright/{z}/{x}/{y}.png?key=n1Mz5ziX3k6JfdjFe7mx';
			}
			L.tileLayer(tileLayer, {
				tileSize: 512,
				zoomOffset: -1,
				minZoom: 1,
				crossOrigin: true,
			}).addTo(this.mapInstance);

			if (this.countriesData.length > 0) {
				L.geoJson(
					this.getCountriesData(),
					{
						style: this.countryStyle,
						onEachFeature: this.onEachCountryFeature,
					},
				).addTo(this.mapInstance);

				this.countriesData.forEach((country) => {
					if (country.numLoansFundraising > 0 && this.showFundraisingLoans) {
						const circle = L.circle([country.lat, country.long], {
							color: kvTokensPrimitives.colors.black,
							weight: 1,
							fillColor: kvTokensPrimitives.colors.brand[900],
							fillOpacity: 1,
							radius: 130000,
						}).addTo(this.mapInstance);

						const tooltipText = `Click to see ${country.numLoansFundraising} fundraising loans in ${country.label}`;
						circle.bindTooltip(tooltipText);

						circle.on('click', () => {
							this.circleMapClicked(country.isoCode);
						});
					}
				});
			}
			/* eslint-enable quotes */
			/* eslint-enable no-undef, max-len */

			// signify map has loaded
			this.mapLoaded = true;
			// only activate autoZoom if we have an initialZoom set
			if (this.initialZoom !== null) {
				this.createWrapperObserver();
			}
		},
		initializeMapLibre() {
			// Initialize primary mapInstance
			/* eslint-disable no-undef */
			let tileLayer = 'https://api.maptiler.com/maps/landscape/style.json?key=n1Mz5ziX3k6JfdjFe7mx';
			if (this.showLabels) {
				tileLayer = 'https://api.maptiler.com/maps/bright/style.json?key=n1Mz5ziX3k6JfdjFe7mx';
			}

			this.mapInstance = new maplibregl.Map({
				container: `kv-map-holder-${this.mapId}`,
				style: tileLayer,
				center: [this.long, this.lat],
				zoom: this.initialZoom || this.zoomLevel,
				attributionControl: false,
				dragPan: this.allowDragging,
				scrollZoom: false,
				doubleClickZoom: false,
				dragRotate: false,
			});

			if (this.showZoomControl) {
				this.mapInstance.addControl(new maplibregl.NavigationControl());
			}

			this.mapInstance.on('load', () => {
				// signify map has loaded
				this.mapLoaded = true;
				// Create wrapper observer to watch for map entering viewport
				if (this.initialZoom !== null || this.advancedAnimation?.borrowerPoints) {
					this.createWrapperObserver();
				}
			});
			/* eslint-enable no-undef */
		},
		animateMap() {
			// remove country labels
			this.mapInstance.style.stylesheet.layers.forEach((layer) => {
				if (layer.type === 'symbol') {
					this.mapInstance.removeLayer(layer.id);
				}
			});
			// generate map markers for borrower points
			generateMapMarkers(this.mapInstance, this.advancedAnimation.borrowerPoints);

			// wait 500 ms before calling the animation coordinator promise
			// to allow the map to scroll into view
			setTimeout(() => {
				animationCoordinator(this.mapInstance, this.advancedAnimation.borrowerPoints)
					.then(() => {
						// when animation is complete reset map to component properties
						this.mapInstance.dragPan.enable();
						this.mapInstance.scrollZoom.enable();
						this.mapInstance.scrollZoom.enable();
						this.mapInstance.easeTo({
							center: [this.long, this.lat],
							zoom: this.initialZoom || this.zoomLevel,
						});
					});
			}, 500);
		},
		checkIntersectionObserverSupport() {
			if (typeof window === 'undefined'
				|| !('IntersectionObserver' in window)
				|| !('IntersectionObserverEntry' in window)
				|| !('intersectionRatio' in window.IntersectionObserverEntry.prototype)) {
				return false;
			}
			return true;
		},
		createIntersectionObserver({ callback, options, targets } = {}) {
			if (this.checkIntersectionObserverSupport()) {
				const observer = new IntersectionObserver(callback, options);
				targets.forEach((target) => observer.observe(target));
				return observer;
			}
		},
		testDelayedGlobalLibrary(library, timeout = 3000) {
			// return a promise
			return new Promise((resolve, reject) => {
				if (typeof window === 'undefined') {
					reject(new Error('window object not available'));
				}
				// establish timeout to limit time until promise resolution
				let readyStateTimeout;
				// establish interval to check for library presence
				const readyStateInterval = window.setInterval(() => {
					// determine if library is present on window
					if (typeof window[library] !== 'undefined') {
						// cleanup timers
						clearInterval(readyStateInterval);
						clearTimeout(readyStateTimeout);
						// resolve the promise
						resolve({ loaded: true });
					}
				}, 100);

				// activate timeout
				readyStateTimeout = window.setTimeout(() => {
					// clean up interval and timeout
					clearInterval(readyStateInterval);
					clearTimeout(readyStateTimeout);
					// resolve the promise
					resolve({ loaded: false });
				}, timeout);
			});
		},
		getCountriesData() {
			const countriesFeatures = countriesBorders.features ?? [];

			countriesFeatures.forEach((country, index) => {
				const countryData = this.countriesData.find((data) => data.isoCode === country.properties.ISO_A2);
				if (countryData) {
					countriesFeatures[index].lenderLoans = countryData.value;
					countriesFeatures[index].numLoansFundraising = countryData.numLoansFundraising;
				}
			});

			return countriesBorders;
		},
		countryStyle(feature) {
			return {
				color: kvTokensPrimitives.colors.white,
				fillColor: getCountryColor(feature.lenderLoans, this.countriesData, kvTokensPrimitives),
				weight: 1,
				fillOpacity: 1,
			};
		},
		onEachCountryFeature(feature, layer) {
			const loansString = feature.lenderLoans
				? `${feature.lenderLoans} loan${feature.lenderLoans > 1 ? 's' : ''}`
				: '0 loans';
			const countryString = `${feature.properties.NAME} <br/> ${loansString}`;

			layer.bindTooltip(countryString, {
				sticky: true,
			});

			layer.on({
				mouseover: this.highlightFeature,
				mouseout: this.resetHighlight,
			});
		},
		highlightFeature(e) {
			const layer = e.target;

			layer.setStyle({
				fillColor: kvTokensPrimitives.colors.gray[500],
			});
		},
		resetHighlight(e) {
			const layer = e.target;
			const { feature } = layer;

			layer.setStyle({
				fillColor: getCountryColor(feature.lenderLoans, this.countriesData, kvTokensPrimitives),
			});
		},
		circleMapClicked(countryIso) {
			this.$emit('country-lend-filter', countryIso);
		},
	},
};
</script>

<style>
/* Styles for animation map markers defined in @kiva/kv-components/utils/mapAnimation.js */
.map-marker {
	margin-top: -77px;
	margin-left: 35px;
	display: block;
	border: none;
	border-radius: 50%;
	cursor: pointer;
	padding: 0;
}

.map-marker::after {
	content: '';
	position: absolute;
	top: -8px;
	left: -8px;
	right: -8px;
	bottom: -8px;
	border-radius: 50%;
	border: 4px solid #000;
}

.map-marker::before {
	content: "";
	width: 0;
	height: 0;
	left: -13px;
	bottom: -32px;
	border: 9px solid transparent;
	border-left: 40px solid #000;
	transform: rotate(114deg);
	position: absolute;
	z-index: -1;
}
</style>
