<template>
	<div
		ref="rootRef"
		class="kv-simple-map tw-relative tw-block tw-overflow-hidden"
		:style="containerStyle"
	>
		<!-- Map background + pannable layer -->
		<div
			class="kv-simple-map__clip tw-absolute tw-inset-0 tw-overflow-hidden"
			:style="{ backgroundColor: oceanColor, cursor: panCursor }"
			@pointerdown="onPointerDown"
		>
			<div
				class="kv-simple-map__pan-layer tw-absolute tw-top-0 tw-left-0"
				:style="panLayerStyle"
			>
				<svg
					:width="SVG_W"
					:height="SVG_H"
					:viewBox="`0 0 ${SVG_W} ${SVG_H}`"
					fill="none"
					aria-hidden="true"
					class="tw-block"
				>
					<path
						v-for="entry in countryPaths"
						:key="entry.id"
						:d="paths[entry.key]"
						:fill="getCountryFill(entry.id)"
						fill-rule="evenodd"
						clip-rule="evenodd"
						stroke="white"
						stroke-linejoin="round"
						:style="getCountryPathStyle(entry.id)"
						@pointerenter="onCountryEnter(entry.id)"
						@pointerleave="onCountryLeave(entry.id)"
					/>
				</svg>
			</div>
		</div>

		<!-- Zoom controls -->
		<div
			v-if="showZoomControls && !isTourRunning"
			class="kv-simple-map__zoom-controls tw-absolute tw-top-2 tw-right-2 tw-flex tw-flex-col tw-gap-1"
		>
			<button
				type="button"
				class="kv-simple-map__control-btn"
				:disabled="!canZoomIn"
				aria-label="Zoom in"
				@click="zoomIn"
			>
				<kv-material-icon
					class="tw-w-2 tw-h-2"
					:icon="mdiPlus"
				/>
			</button>
			<button
				type="button"
				class="kv-simple-map__control-btn"
				:disabled="!canZoomOut"
				aria-label="Zoom out"
				@click="zoomOut"
			>
				<kv-material-icon
					class="tw-w-2 tw-h-2"
					:icon="mdiMinus"
				/>
			</button>
		</div>

		<!-- Resume autoplay -->
		<button
			v-if="canResumeAutoplay"
			type="button"
			class="kv-simple-map__control-btn kv-simple-map__play-btn tw-absolute tw-bottom-2 tw-right-2"
			aria-label="Resume tour"
			@click="resumeAutoplay"
		>
			<kv-material-icon
				class="tw-w-2 tw-h-2"
				:icon="mdiPlay"
			/>
		</button>

		<!-- Popup layer -->
		<div class="kv-simple-map__popup-layer tw-absolute tw-inset-0 tw-pointer-events-none">
			<Transition name="kv-simple-map-popup">
				<div
					v-if="visiblePopup"
					:key="visiblePopup.country.id"
					class="kv-simple-map__popup tw-absolute"
					:class="`kv-simple-map__popup--${visiblePopup.placement}`"
					:style="visiblePopup.style"
				>
					<div class="kv-simple-map__popup-content">
						<slot
							name="popup"
							:country="visiblePopup.country"
						>
							<div class="kv-simple-map__default-popup">
								<div
									v-if="visiblePopup.country.name"
									class="tw-text-label"
								>
									{{ visiblePopup.country.name }}
								</div>
								<div
									v-if="visiblePopup.country.loanCount != null"
									class="tw-text-caption"
								>
									{{ formatLoans(visiblePopup.country.loanCount) }}
								</div>
							</div>
						</slot>
					</div>
				</div>
			</Transition>
		</div>
	</div>
</template>

<script setup lang="ts">
import {
	computed,
	onBeforeUnmount,
	onMounted,
	ref,
	useSlots,
	watch,
	type PropType,
} from 'vue';
import { mdiMinus, mdiPlay, mdiPlus } from '@mdi/js';
import kvTokensPrimitives from '@kiva/kv-tokens';
import paths from '../data/simpleMapPaths';
import countryPaths from '../data/simpleMapCountryPaths';
import centroids from '../data/simpleMapCentroids';
import { ALL_COUNTRIES_ISO_MAP } from '../data/allCountriesISOMap';
import { useMapTourCycle } from '../utils/useMapTourCycle';
import KvMaterialIcon from './KvMaterialIcon.vue';

export interface SimpleMapCountry {
	id: string;
	name?: string;
	loanCount?: number;
	cx?: number;
	cy?: number;
}

const SVG_W = 1300.02;
const SVG_H = 571.784;
const PAN_EASE = 'cubic-bezier(0.76, 0, 0.24, 1)';

const props = defineProps({
	/**
	 * Countries to make interactive: each entry is hover-able and (when autoplay
	 * is true) becomes a stop on the scripted tour. Countries not in this list
	 * still render as background but do not show popups.
	 */
	countries: {
		type: Array as PropType<SimpleMapCountry[]>,
		default: () => [],
	},
	/**
	 * Width / height ratio that drives the default container height when no
	 * explicit height is set. Defaults to the source SVG's natural ratio.
	 */
	aspectRatio: {
		type: Number,
		default: SVG_W / SVG_H,
	},
	/**
	 * Explicit height override in pixels. Takes precedence over aspectRatio.
	 */
	height: {
		type: Number,
		default: null,
	},
	/**
	 * Explicit width override in pixels. Defaults to 100% of parent.
	 */
	width: {
		type: Number,
		default: null,
	},
	/**
	 * When true, the map runs an automatic tour through `countries`, panning
	 * and zooming to each in turn. Drag and zoom controls are suspended.
	 */
	autoplay: {
		type: Boolean,
		default: false,
	},
	/**
	 * When true (and autoplay is true), the tour repeats indefinitely.
	 */
	loop: {
		type: Boolean,
		default: true,
	},
	/**
	 * Allow click-and-drag to pan the map. Ignored during autoplay.
	 */
	allowDragging: {
		type: Boolean,
		default: true,
	},
	/**
	 * Show + / − zoom buttons. Hidden during autoplay.
	 */
	showZoomControls: {
		type: Boolean,
		default: true,
	},
	/**
	 * Multiplier applied to the base "fit-to-width" scale when focusing on a
	 * country during the tour. 2.0 ≈ desktop default, 2.4 ≈ more impact on small viewports.
	 */
	zoomFactor: {
		type: Number,
		default: 2.0,
	},
	/**
	 * Minimum zoom (1 = full overview).
	 */
	minZoom: {
		type: Number,
		default: 1,
	},
	/**
	 * Maximum zoom multiplier on top of base scale.
	 */
	maxZoom: {
		type: Number,
		default: 4,
	},
	/**
	 * Step applied per zoom-button click.
	 */
	zoomStep: {
		type: Number,
		default: 0.5,
	},
	/** Highlight color for active / hovered countries. Defaults to eco-green DEFAULT. */
	highlightColor: {
		type: String,
		default: kvTokensPrimitives.colors['eco-green'].DEFAULT,
	},
	/** Base color for countries that aren't in the `countries` list. */
	baseColor: {
		type: String,
		default: kvTokensPrimitives.colors.gray[200],
	},
	/**
	 * Loan-count thresholds that bucket each country into one of the four
	 * eco-green tiers. The default mirrors the design spec:
	 *   1–3 → tier 1, 4–8 → tier 2, 9–14 → tier 3, 15+ → tier 4.
	 * Pass an array of four ascending lower-bounds to customize.
	 */
	loanCountTiers: {
		type: Array as unknown as PropType<[number, number, number, number]>,
		default: () => [1, 4, 9, 15],
	},
	/** Background color of the ocean / unfilled area. */
	oceanColor: {
		type: String,
		default: '#e8f4fa',
	},
	/**
	 * Where to place the hover/tour popup relative to the country:
	 *   'top'           — centered above the country (auto-flips below if it
	 *                     would clip the top edge of the container).
	 *   'bottom-right'  — top-left of the popup hugs the country's
	 *                     bottom-right bbox corner.
	 */
	popupPlacement: {
		type: String as PropType<'top' | 'bottom-right'>,
		default: 'top',
		validator: (v: string) => ['top', 'bottom-right'].includes(v),
	},
	/**
	 * Pixel gap between the popup and the country edge, applied to whichever
	 * placement is active. Accepts negative values to make the popup overlap
	 * the country (useful for tightly hugging the bbox).
	 */
	popupOffset: {
		type: Number,
		default: 0,
	},
	/**
	 * On mount (and on resize), fit the camera to the bounding box of the
	 * `countries` list with a small padding buffer. When false, the map opens
	 * on the full world overview. The user's drag/zoom always overrides this
	 * — the fit is only applied until the first interaction.
	 */
	fitToCountries: {
		type: Boolean,
		default: true,
	},
	/**
	 * Padding around the fit bbox, expressed as a fraction of the bbox extent
	 * on each side (0.15 = 15% breathing room around all four edges). Only
	 * applies when `fitToCountries` is true.
	 */
	fitPadding: {
		type: Number,
		default: 0.15,
	},
	/** Tour: ms before the first pan begins. */
	initialDelay: { type: Number, default: 1000 },
	/** Tour: ms per pan animation. */
	panDuration: { type: Number, default: 1200 },
	/** Tour: ms to dwell on each country after the pan settles. */
	holdPerStep: { type: Number, default: 2000 },
	/** Tour: ms before the next pan to hide the active popup. */
	popupHideBefore: { type: Number, default: 350 },
	/** Tour: ms held on the full overview at the end of a cycle. */
	holdAll: { type: Number, default: 2000 },
	/** Highlight fade duration, in ms. */
	fadeDuration: { type: Number, default: 500 },
});

const slots = useSlots();
const hasCustomPopupSlot = computed(() => !!slots.popup);

// ── Container sizing ──────────────────────────────────────────────────────
const rootRef = ref<Element | null>(null);
const containerW = ref(0);
const containerH = ref(0);

function resolveHeight(): string {
	if (props.height != null) return `${props.height}px`;
	if (containerW.value) return `${containerW.value / props.aspectRatio}px`;
	return `${100 / props.aspectRatio}%`;
}

const containerStyle = computed(() => ({
	width: props.width != null ? `${props.width}px` : '100%',
	height: resolveHeight(),
	paddingBottom: props.height != null ? undefined : `${100 / props.aspectRatio}%`,
}));

let resizeObserver: ResizeObserver | null = null;
function measure() {
	const el = rootRef.value;
	if (!el) return;
	const rect = el.getBoundingClientRect();
	containerW.value = rect.width;
	containerH.value = rect.height;
}

// ── Tour state (composable) ───────────────────────────────────────────────
const countriesRef = computed(() => props.countries);
const loopRef = computed(() => props.loop);
// User can interrupt the tour by clicking/dragging the map. Until they hit
// the resume button (or autoplay flips off and back on), the cycle stays paused.
const isAutoplayPaused = ref(false);
const tourActive = computed(() => props.autoplay && !isAutoplayPaused.value);
const tourOptions = computed(() => ({
	initialDelay: props.initialDelay,
	panDuration: props.panDuration,
	holdPerStep: props.holdPerStep,
	popupHideBefore: props.popupHideBefore,
	holdAll: props.holdAll,
	fadeDuration: props.fadeDuration,
}));
const {
	panIdx,
	highlighted,
	showPopupIdx,
	isRunning: isTourRunning,
	start: startTour,
} = useMapTourCycle(countriesRef, tourActive, loopRef, tourOptions.value);

// ── Transform state ───────────────────────────────────────────────────────
interface Transform { x: number; y: number; scale: number; }
const baseScale = computed(() => (containerW.value ? containerW.value / SVG_W : 1));
const overviewTransform = computed<Transform>(() => {
	const s = baseScale.value;
	const renderedH = SVG_H * s;
	return {
		x: 0,
		y: Math.max(0, (containerH.value - renderedH) / 2),
		scale: s,
	};
});

function resolveCentroid(country: SimpleMapCountry): { cx: number; cy: number } | null {
	if (country.cx != null && country.cy != null) return { cx: country.cx, cy: country.cy };
	const fallback = centroids[country.id];
	return fallback ?? null;
}

const focusedTransform = computed<Transform | null>(() => {
	if (panIdx.value < 0) return null;
	const country = props.countries[panIdx.value];
	if (!country) return null;
	const centroid = resolveCentroid(country);
	if (!centroid) return null;
	const scale = baseScale.value * props.zoomFactor;
	return {
		x: containerW.value / 2 - centroid.cx * scale,
		y: containerH.value / 2 - centroid.cy * scale,
		scale,
	};
});

const manualTransform = ref<Transform>({ x: 0, y: 0, scale: 1 });
const isDragging = ref(false);
// Off until after the first painted frame so the initial fit-to-countries
// transform lands instantly rather than animating from {0, 0, 1} (top-left)
// before container measurement settles.
const transitionsEnabled = ref(false);

// True once the user has dragged or zoomed since the last countries change.
// Suppresses the auto-fit refit logic so we don't yank the camera back during
// interaction. Resets when `countries` changes.
const userHasInteracted = ref(false);

// Compute the union bbox of the supplied countries (in SVG coords) and the
// camera transform that fits it within the container, with padding. Returns
// null if the feature is disabled, the list is empty, or no bbox is resolvable.
const fitTransform = computed<Transform | null>(() => {
	if (!props.fitToCountries) return null;
	if (!props.countries.length) return null;
	if (!containerW.value || !containerH.value) return null;

	let xMin = Infinity;
	let yMin = Infinity;
	let xMax = -Infinity;
	let yMax = -Infinity;
	props.countries.forEach((country) => {
		// Caller-supplied (cx, cy) is a single point; degenerate bbox at that point.
		if (country.cx != null && country.cy != null) {
			if (country.cx < xMin) xMin = country.cx;
			if (country.cx > xMax) xMax = country.cx;
			if (country.cy < yMin) yMin = country.cy;
			if (country.cy > yMax) yMax = country.cy;
			return;
		}
		const c = centroids[country.id];
		if (!c) return;
		const cXMin = 2 * c.cx - c.xMax;
		const cYMin = 2 * c.cy - c.yMax;
		if (cXMin < xMin) xMin = cXMin;
		if (cYMin < yMin) yMin = cYMin;
		if (c.xMax > xMax) xMax = c.xMax;
		if (c.yMax > yMax) yMax = c.yMax;
	});
	if (!Number.isFinite(xMin)) return null;

	// Pad the bbox on all four sides; clamp the bbox to the SVG world extent
	// so we never zoom further out than the overview.
	const pad = Math.max(0, props.fitPadding);
	const w = Math.max(1, xMax - xMin) * (1 + pad * 2);
	const h = Math.max(1, yMax - yMin) * (1 + pad * 2);
	const fitScale = Math.min(containerW.value / w, containerH.value / h);

	const minScale = baseScale.value * props.minZoom;
	const maxScale = baseScale.value * props.maxZoom;
	const scale = Math.max(minScale, Math.min(maxScale, fitScale));

	const cx = (xMin + xMax) / 2;
	const cy = (yMin + yMax) / 2;
	return {
		x: containerW.value / 2 - cx * scale,
		y: containerH.value / 2 - cy * scale,
		scale,
	};
});

// Initial / resize-target manual transform: fit-to-countries when available,
// otherwise the world overview.
const initialManualTransform = computed<Transform>(() => fitTransform.value ?? overviewTransform.value);

const displayTransform = computed<Transform>(() => {
	if (isTourRunning.value) return focusedTransform.value ?? overviewTransform.value;
	return manualTransform.value;
});

// Apply the initial transform on mount and follow it on resize / countries
// changes — but only until the user has interacted manually.
watch(initialManualTransform, (next) => {
	if (isTourRunning.value) return;
	if (userHasInteracted.value) return;
	manualTransform.value = next;
}, { immediate: true });

// Passing a new `countries` list resets the interaction flag so we re-fit.
watch(() => props.countries, () => {
	userHasInteracted.value = false;
});

// Reset the pause flag whenever the autoplay prop changes — toggling autoplay
// from outside should always produce predictable behavior.
watch(() => props.autoplay, () => {
	isAutoplayPaused.value = false;
});

const panLayerStyle = computed(() => {
	const { x, y, scale } = displayTransform.value;
	const transitionEnabled = !isDragging.value && transitionsEnabled.value;
	return {
		width: `${SVG_W}px`,
		height: `${SVG_H}px`,
		transformOrigin: '0 0',
		transform: `translate(${x}px, ${y}px) scale(${scale})`,
		transition: transitionEnabled
			? `transform ${props.panDuration}ms ${PAN_EASE}`
			: 'none',
		willChange: 'transform',
	};
});

// ── Country fill resolution ───────────────────────────────────────────────
const hoveredId = ref<string | null>(null);
const countryById = computed(() => {
	const map = new Map<string, SimpleMapCountry>();
	props.countries.forEach((c) => map.set(c.id, c));
	return map;
});

function hasName(id: string) {
	return countryById.value.has(id) || !!ALL_COUNTRIES_ISO_MAP[id];
}

// Any country we can show in a popup is interactive — either it's in the
// caller's `countries` list (gets tier color + loan-count popup), or it has
// a name in our static ISO map (gets a name-only popup with neutral hover).
function isInteractive(id: string) {
	return hasName(id);
}

const ecoGreen = kvTokensPrimitives.colors['eco-green'];
const TIER_COLORS = [ecoGreen[1], ecoGreen[2], ecoGreen[3], ecoGreen[4]];
const resolvedHighlightColor = computed(() => props.highlightColor ?? ecoGreen.DEFAULT);
const resolvedBaseColor = computed(() => props.baseColor ?? kvTokensPrimitives.colors.gray[200]);
// Hover color for countries that have no loans — neutral gray, distinct from
// both the loan-tier hover (eco-green) and the resting base fill.
const NEUTRAL_HOVER_COLOR = kvTokensPrimitives.colors.gray[300];

function tierColorFor(loanCount: number | undefined): string | null {
	if (loanCount == null || loanCount < props.loanCountTiers[0]) return null;
	// Walk thresholds high → low; first one we meet is our tier.
	for (let i = props.loanCountTiers.length - 1; i >= 0; i -= 1) {
		if (loanCount >= props.loanCountTiers[i]) return TIER_COLORS[i];
	}
	return null;
}

function getCountryPathStyle(id: string) {
	return {
		transition: `fill ${props.fadeDuration}ms ease-in-out`,
		cursor: isInteractive(id) && !isTourRunning.value ? 'pointer' : 'inherit',
	};
}

function getCountryFill(id: string): string {
	const country = countryById.value.get(id);
	const tierColor = country ? tierColorFor(country.loanCount) : null;
	const isHovered = hoveredId.value === id && isInteractive(id);
	if (highlighted.value.has(id)) return resolvedHighlightColor.value;
	if (isHovered) {
		return tierColor ? resolvedHighlightColor.value : NEUTRAL_HOVER_COLOR;
	}
	return tierColor ?? resolvedBaseColor.value;
}

function onCountryEnter(id: string) {
	if (isTourRunning.value) return;
	if (!isInteractive(id)) return;
	hoveredId.value = id;
}

function onCountryLeave(id: string) {
	if (hoveredId.value === id) hoveredId.value = null;
}

// ── Popup ─────────────────────────────────────────────────────────────────
type ResolvedPlacement = 'top' | 'bottom' | 'bottom-right';
interface PopupView {
	country: SimpleMapCountry;
	placement: ResolvedPlacement;
	style: Record<string, string>;
}

// Estimated popup height used for "is this country too close to the top edge?"
// flip logic. The default popup is ~40px; 60 leaves room for two-line content
// and the gap.
const POPUP_FLIP_THRESHOLD = 60;

interface CountryBox { cx: number; cy: number; xMin: number; xMax: number; yMin: number; yMax: number; }

function resolveCountryBox(country: SimpleMapCountry): CountryBox | null {
	// Caller-supplied cx/cy is a single point — degenerate bbox at that point.
	if (country.cx != null && country.cy != null) {
		return {
			cx: country.cx,
			cy: country.cy,
			xMin: country.cx,
			xMax: country.cx,
			yMin: country.cy,
			yMax: country.cy,
		};
	}
	const c = centroids[country.id];
	if (!c) return null;
	// Mirror cx/cy across the recorded max corner to derive the min corner.
	return {
		cx: c.cx,
		cy: c.cy,
		xMax: c.xMax,
		yMax: c.yMax,
		xMin: 2 * c.cx - c.xMax,
		yMin: 2 * c.cy - c.yMax,
	};
}

function resolvePopupView(country: SimpleMapCountry): Pick<PopupView, 'placement' | 'style'> | null {
	const box = resolveCountryBox(country);
	if (!box) return null;
	const t = displayTransform.value;
	const offsetVar = { '--kv-simple-map-popup-offset': `${props.popupOffset}px` } as Record<string, string>;

	if (props.popupPlacement === 'bottom-right') {
		return {
			placement: 'bottom-right',
			style: {
				left: `${box.xMax * t.scale + t.x}px`,
				top: `${box.yMax * t.scale + t.y}px`,
				...offsetVar,
			},
		};
	}

	// 'top' — centered above the country, auto-flip below if too near the top.
	const centerX = box.cx * t.scale + t.x;
	const topY = box.yMin * t.scale + t.y;
	const bottomY = box.yMax * t.scale + t.y;
	const placement: ResolvedPlacement = topY < POPUP_FLIP_THRESHOLD ? 'bottom' : 'top';
	return {
		placement,
		style: {
			left: `${centerX}px`,
			top: `${placement === 'top' ? topY : bottomY}px`,
			...offsetVar,
		},
	};
}

function hasDefaultContent(country: SimpleMapCountry) {
	return !!country.name || country.loanCount != null;
}

const visiblePopup = computed<PopupView | null>(() => {
	// Tour-driven popup
	if (isTourRunning.value && showPopupIdx.value >= 0) {
		const country = props.countries[showPopupIdx.value];
		if (!country) return null;
		if (!hasCustomPopupSlot.value && !hasDefaultContent(country)) return null;
		const view = resolvePopupView(country);
		if (!view) return null;
		return { country, ...view };
	}
	// Hover-driven popup (only when the tour isn't actively running)
	if (!isTourRunning.value && hoveredId.value) {
		const id = hoveredId.value;
		// Prefer the caller's data (carries loanCount and any name override);
		// fall back to a name-only entry sourced from the static ISO map so
		// every country can surface a popup on hover.
		const country: SimpleMapCountry = countryById.value.get(id)
			?? { id, name: ALL_COUNTRIES_ISO_MAP[id] };
		if (!hasCustomPopupSlot.value && !hasDefaultContent(country)) return null;
		const view = resolvePopupView(country);
		if (!view) return null;
		return { country, ...view };
	}
	return null;
});

function formatLoans(n: number): string {
	return n === 1 ? '1 loan' : `${n} loans`;
}

// ── Drag-to-pan ───────────────────────────────────────────────────────────
let dragStart: { x: number; y: number; tx: number; ty: number } | null = null;

function onWindowPointerMove(e: PointerEvent) {
	if (!dragStart) return;
	manualTransform.value = {
		...manualTransform.value,
		x: dragStart.tx + (e.clientX - dragStart.x),
		y: dragStart.ty + (e.clientY - dragStart.y),
	};
}

function onWindowPointerUp() {
	isDragging.value = false;
	dragStart = null;
	window.removeEventListener('pointermove', onWindowPointerMove);
}

function onPointerDown(e: PointerEvent) {
	if (e.button !== 0 && e.pointerType === 'mouse') return;
	// A click or drag on the map exits autoplay. Snapshot the current camera
	// into manualTransform first so the user doesn't see the view jump back to
	// the overview when isTourRunning flips false.
	if (isTourRunning.value) {
		manualTransform.value = { ...displayTransform.value };
		isAutoplayPaused.value = true;
	}
	if (!props.allowDragging) return;
	userHasInteracted.value = true;
	isDragging.value = true;
	dragStart = {
		x: e.clientX,
		y: e.clientY,
		tx: manualTransform.value.x,
		ty: manualTransform.value.y,
	};
	window.addEventListener('pointermove', onWindowPointerMove);
	window.addEventListener('pointerup', onWindowPointerUp, { once: true });
}

const canResumeAutoplay = computed(() => props.autoplay && !isTourRunning.value);

function resumeAutoplay() {
	isAutoplayPaused.value = false;
	// If the tour finished naturally (loop=false), tourActive never flipped
	// false, so the watcher won't see a change — kick off a new cycle directly.
	startTour();
}

const panCursor = computed(() => {
	if (!props.allowDragging || isTourRunning.value) return 'default';
	return isDragging.value ? 'grabbing' : 'grab';
});

// ── Zoom controls ─────────────────────────────────────────────────────────
const canZoomIn = computed(() => manualTransform.value.scale < baseScale.value * props.maxZoom - 1e-3);
const canZoomOut = computed(() => manualTransform.value.scale > baseScale.value * props.minZoom + 1e-3);

function applyZoom(delta: number) {
	const cur = manualTransform.value;
	const min = baseScale.value * props.minZoom;
	const max = baseScale.value * props.maxZoom;
	const next = Math.min(max, Math.max(min, cur.scale + delta * baseScale.value));
	if (Math.abs(next - cur.scale) < 1e-6) return;
	userHasInteracted.value = true;
	// Zoom about container center
	const cw = containerW.value;
	const ch = containerH.value;
	const ratio = next / cur.scale;
	manualTransform.value = {
		x: cw / 2 - (cw / 2 - cur.x) * ratio,
		y: ch / 2 - (ch / 2 - cur.y) * ratio,
		scale: next,
	};
}

function zoomIn() { applyZoom(props.zoomStep); }
function zoomOut() { applyZoom(-props.zoomStep); }

// ── Lifecycle ─────────────────────────────────────────────────────────────
onMounted(() => {
	measure();
	if (typeof ResizeObserver !== 'undefined' && rootRef.value) {
		resizeObserver = new ResizeObserver(measure);
		resizeObserver.observe(rootRef.value as Element);
	}
	// Allow CSS transitions only after the first paint so the initial fit
	// settles instantly. Two rAFs — first lets the watcher apply the fitted
	// transform, second flips the flag so subsequent updates animate.
	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			transitionsEnabled.value = true;
		});
	});
});

onBeforeUnmount(() => {
	resizeObserver?.disconnect();
	window.removeEventListener('pointermove', onWindowPointerMove);
});
</script>

<style lang="postcss" scoped>
.kv-simple-map__pan-layer {
	transform-origin: 0 0;
}

.kv-simple-map__control-btn {
	@apply tw-w-4 tw-h-4 tw-flex tw-items-center tw-justify-center
		tw-bg-white tw-border tw-border-tertiary tw-rounded-xs tw-cursor-pointer;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.kv-simple-map__control-btn:disabled {
	@apply tw-cursor-default tw-opacity-low;
}

.kv-simple-map__control-btn:hover:not(:disabled) {
	@apply tw-bg-secondary;
}

.kv-simple-map__play-btn {
	@apply tw-rounded-full;
}

.kv-simple-map__default-popup {
	@apply tw-bg-white tw-rounded-sm tw-px-3 tw-py-1 tw-shadow tw-text-center tw-whitespace-nowrap;
	min-width: 80px;
}

/* Popup root is a 0x0 anchor at the country's anchor point; the inner
   .kv-simple-map__popup-content holds the actual card and sits offset
   from the anchor based on the placement modifier class. */
.kv-simple-map__popup {
	width: 0;
	height: 0;
}
.kv-simple-map__popup-content {
	position: absolute;
	white-space: nowrap;
}

/* "top" — card sits above the country, horizontally centred. */
.kv-simple-map__popup--top > .kv-simple-map__popup-content {
	bottom: var(--kv-simple-map-popup-offset, 4px);
	left: 0;
	transform: translateX(-50%);
}

/* "bottom" — auto-flip target when "top" would clip the container edge. */
.kv-simple-map__popup--bottom > .kv-simple-map__popup-content {
	top: var(--kv-simple-map-popup-offset, 4px);
	left: 0;
	transform: translateX(-50%);
}

/* "bottom-right" — card top-left hugs the country bbox bottom-right. */
.kv-simple-map__popup--bottom-right > .kv-simple-map__popup-content {
	top: var(--kv-simple-map-popup-offset, 4px);
	left: var(--kv-simple-map-popup-offset, 4px);
}

/* Enter/leave fades only — the placement transform stays put. */
.kv-simple-map-popup-enter-active,
.kv-simple-map-popup-leave-active {
	transition: opacity 180ms ease-out;
}
.kv-simple-map-popup-enter-from,
.kv-simple-map-popup-leave-to {
	opacity: 0;
}
.kv-simple-map-popup-enter-to,
.kv-simple-map-popup-leave-from {
	opacity: 1;
}
</style>
