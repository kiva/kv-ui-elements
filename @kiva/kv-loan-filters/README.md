# kv-loan-filters

A library of utilities related to the Kiva loan filters.

## Install

Deployed:

```bash
npm i @kiva/kv-loan-filters
```

Local:

```bash
# Open kv-ui-elements folder in Terminal
cd @kiva/kv-loan-filters
npm link

# Open target local project folder in Terminal
npm link @kiva/kv-loan-filters
```

Extra step for Nuxt local development:

```ts
// Open nuxt.config.ts in target project and add with your username
...
vite: {
    optimizeDeps: {
      exclude: ['@kiva/kv-loan-filters'],
    },
    server: {
      fs: {
        allow: ['/Users/username/kiva/kv-ui-elements'],
      },
    },
  },
...
```

## Tests

```bash
npm run test
npm run test-watch
```

## Lint

```bash
npm run lint
```

## Build

```bash
npm run build
```

## Overview

The loan filter utilities are used to power the filtering UI in the Kiva Vue 2 + 3 applications. Example pages include `/lend/filter` and `/lending-home`. While these utilities don't deal directly with FLSS queries, the utilities provide the functionality for filter against the FLSS endpoints. The underlying state of the filters is stored in the Apollo cache in `loanSearchState`.

For an example of how to handle filtering and the changes to the Apollo cache, look to `LoanSearchInterface` in the `ui` repo, specifically the Apollo `watchQuery` that monitors `loanSearchState`. There are also utilities for using query params to change the `loanSearchState`.

Facets are the available filters, and the legacy lend API is the source of truth. The loans per facet count is provided by FLSS.

## Contribution Guidelines

The Kiva UI project is bound by a [Code of Conduct](https://github.com/kiva/ui/blob/master/code_of_conduct.md).

Kiva welcomes outside contributions to our UI repository. If you have any ideas for a feature or improvement, create an issue and we can discuss whether it makes sense to create a pull request. Thanks for the help!
