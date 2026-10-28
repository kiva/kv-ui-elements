# kv-analytics

A library of methods for web analytics on Kiva.org.

## Install

Deployed:

```bash
npm i @kiva/kv-analytics
```

Local:

```bash
# Open kv-ui-elements folder in Terminal
npm link -w @kiva/kv-analytics

# Open target local project folder in Terminal
npm link @kiva/kv-analytics
```

## Lint

```bash
npm run lint
```

## Build

```bash
npm run build
```

The build produces three outputs in `dist/`:

| Output | Entry | Consumers |
| --- | --- | --- |
| `index.js` (ESM) and `index.cjs` (CJS) | `@kiva/kv-analytics` | npm apps such as `ui` and `cms-page-server`. `web-vitals` stays an external dependency. |
| `browser.global.js` (IIFE) | `@kiva/kv-analytics/browser` | Pages without a module loader: the monolith's templates and mcp-web-publisher's analytics loader. `web-vitals` is bundled in. |

### Browser bundle

`dist/browser.global.js` declares a `kvAnalytics` global with every export of the package and has no `require()` or `import` at runtime, so it can be served inline or from a plain script tag. The release workflow uploads it to the kvui static assets bucket as `kv-analytics.<version>.js`, so pin the version you tested against:

```html
<script src="https://www.kiva.org/kvui/kv-analytics.1.7.0.js"></script>
<script>
	// Report Core Web Vitals through an existing Snowplow v2 tracker
	kvAnalytics.collectWebVitals(function (category, action, label, property, value) {
		window.snowplow('trackStructEvent', category, action, label, property, value);
	});
</script>
```

Node consumers that inline the bundle (mcp-web-publisher) can resolve it with `require.resolve('@kiva/kv-analytics/browser')`. Do not inline `dist/index.cjs` in a page: it calls `require('web-vitals')`.

## Test

```bash
npm test
```

## Contribution Guidelines

The Kiva UI project is bound by a [Code of Conduct](https://github.com/kiva/ui/blob/master/code_of_conduct.md).

Kiva welcomes outside contributions to our UI repository. If you have any ideas for a feature or improvement, create an issue and we can discuss whether it makes sense to create a pull request. Thanks for the help!
