import {
	computed,
	onMounted,
	readonly,
	ref,
	unref,
	watch,
} from 'vue';
import type { ComputedRef, Ref } from 'vue';
import { kebabCase } from 'change-case';

export type ExpandableRegionKind = 'region' | 'card' | 'section';

export type ExpandableRegionTrackFunction = (
	// eslint-disable-next-line no-unused-vars
	category: string, action: string, label: string, property: string,
) => void;

type RefOrValue<T> = T | Ref<T>;

export interface ExpandableRegionOptions {
	// Key or name the region and body ids are kebab-cased from.
	idHandle: RefOrValue<string | undefined>;
	// Whether the region starts open.
	startExpanded?: boolean;
	// Current URL hash; expands the region on mount and on change when it targets the region.
	routeHash?: Ref<string | undefined>;
	// Receives category, action, label and property when a controller toggles the region.
	trackFunction?: ExpandableRegionTrackFunction;
	// Analytics category, defaulting to event-tracking.
	analyticsCategory?: RefOrValue<string | undefined>;
	// Default analytics label, kebab-cased; a controller can pass its own to toggle.
	analyticsLabel?: RefOrValue<string | undefined>;
	// Default analytics kind; a controller can pass its own to toggle.
	kind?: ExpandableRegionKind;
	// Element holding the region body, searched for elements a hash names.
	bodyElement?: Ref<HTMLElement | null | undefined>;
}

export interface ExpandableRegionController {
	// Visible text of the controller, kebab-cased into the analytics label.
	label?: string;
	// Kind of the controller, which prefixes the analytics property.
	kind?: ExpandableRegionKind;
}

export interface ExpandableRegion {
	isExpanded: Readonly<Ref<boolean>>;
	skipEnter: Readonly<Ref<boolean>>;
	regionId: ComputedRef<string | undefined>;
	bodyId: ComputedRef<string | undefined>;
	controllerAttrs: ComputedRef<{ 'aria-expanded': 'true' | 'false'; 'aria-controls': string | undefined }>;
	bodyAttrs: ComputedRef<{ id: string | undefined }>;
	// eslint-disable-next-line no-unused-vars
	toggle(controller?: ExpandableRegionController): void;
	expand(): void;
	collapse(): void;
	// eslint-disable-next-line no-unused-vars
	expandForHash(hash: string | undefined): boolean;
}

/**
 * State, ids, aria attributes, deep-link handling and tracking for a block of content that expands and collapses,
 * shared by every controller that toggles it.
 */
export function useExpandableRegion(options: ExpandableRegionOptions): ExpandableRegion {
	const isExpanded = ref(!!options.startExpanded);
	const skipEnter = ref(false);

	const regionId = computed(() => {
		const handle = unref(options.idHandle);
		return handle ? kebabCase(handle) : undefined;
	});
	const bodyId = computed(() => (regionId.value ? `${regionId.value}-body` : undefined));

	const controllerAttrs = computed(() => ({
		'aria-expanded': isExpanded.value ? 'true' as const : 'false' as const,
		'aria-controls': bodyId.value,
	}));
	const bodyAttrs = computed(() => ({ id: bodyId.value }));

	// Opens the region without animation.
	function expand(): void {
		skipEnter.value = true;
		isExpanded.value = true;
	}

	// Closes the region.
	function collapse(): void {
		isExpanded.value = false;
	}

	// Flips the region and tracks the state it enters.
	function toggle(controller: ExpandableRegionController = {}): void {
		skipEnter.value = false;
		isExpanded.value = !isExpanded.value;

		const kind = controller.kind ?? options.kind ?? 'region';
		const label = controller.label || unref(options.analyticsLabel) || '';
		options.trackFunction?.(
			unref(options.analyticsCategory) || 'event-tracking',
			'toggle',
			kebabCase(label),
			`${kind}-${isExpanded.value ? 'expand' : 'collapse'}`,
		);
	}

	// Decodes a URL hash into the id it names, leaving a malformed hash as written.
	function idFromHash(hash: string | undefined): string {
		const encoded = (hash ?? '').replace(/^#/, '');
		try {
			return decodeURIComponent(encoded);
		} catch {
			return encoded;
		}
	}

	// Whether the hash names the region, its body or an element inside the body.
	function hashTargetsRegion(hash: string | undefined): boolean {
		const id = idFromHash(hash);
		if (!id) {
			return false;
		}
		if (id === regionId.value || id === bodyId.value) {
			return true;
		}
		const body = options.bodyElement?.value;
		const target = body?.ownerDocument.getElementById(id);
		return !!target && !!body?.contains(target);
	}

	// Opens the region without animation when the hash targets it, returning whether it did.
	function expandForHash(hash: string | undefined): boolean {
		if (!hashTargetsRegion(hash)) {
			return false;
		}
		if (!isExpanded.value) {
			expand();
		}
		return true;
	}

	if (options.routeHash) {
		const { routeHash } = options;
		onMounted(() => expandForHash(routeHash.value));
		watch(routeHash, (hash) => expandForHash(hash));
	}

	return {
		isExpanded: readonly(isExpanded),
		skipEnter: readonly(skipEnter),
		regionId,
		bodyId,
		controllerAttrs,
		bodyAttrs,
		toggle,
		expand,
		collapse,
		expandForHash,
	};
}
