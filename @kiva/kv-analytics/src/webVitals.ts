import {
	onCLS,
	onFCP,
	onINP,
	onLCP,
	onTTFB,
} from 'web-vitals';

const trackingCategory = 'web vitals';
const trackingAction = 'report';

/**
 * Snowplow struct event shape consumed by dbt `fact_snowplow_web_vital_event`:
 * `('web vitals', 'report', metricName, metricId, roundedDelta)`. Do not change it.
 *
 * The callback is injected rather than defaulting to this package's own {@link trackEvent} because
 * consuming apps may still run their own tracker (e.g. ui's forked plugin), where this package's
 * queue would never flush.
 */
export type WebVitalsTrackEvent = (
	category: string,
	action: string,
	label: string,
	property: string,
	value: number,
) => unknown;

/**
 * Subscribes to the Core Web Vitals (CLS, FCP, INP, LCP, TTFB) and reports each delta as a
 * Snowplow struct event through the given tracker.
 *
 * @param trackEvent The consuming app's `trackEvent` (e.g. `$kvTrackEvent`).
 */
export default function collectWebVitals(trackEvent: WebVitalsTrackEvent) {
	const handleReport = ({ name, id, delta }: { name: string, id: string, delta: number }) => {
		// The name of the metric in acronym form ('CLS', 'FCP', 'INP', 'LCP', 'TTFB').
		const label = name;

		// A unique ID representing this particular metric that's specific to the
		// current page load. This ID can be used by an analytics tool to dedupe
		// multiple values sent for the same metric, or to group multiple deltas
		// together and calculate a total.
		const property = id;

		// The delta between the current value and the last-reported value.
		// On the first report, `delta` and `value` will always be the same.
		// Snowplow requires that se_value is an integer, so the value is rounded.
		// For CLS the value is first multiplied by 1000 for greater precision.
		const value = Math.round(name === 'CLS' ? delta * 1000 : delta);

		// Send metric value as an event
		trackEvent(trackingCategory, trackingAction, label, property, value);
	};
	onCLS(handleReport);
	onFCP(handleReport);
	onINP(handleReport);
	onLCP(handleReport);
	onTTFB(handleReport);
}
