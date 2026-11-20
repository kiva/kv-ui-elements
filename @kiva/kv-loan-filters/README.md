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

## Auto-lend LSC conversion

`lscToFlssFilters` converts an auto-lend profile's legacy loan search criteria (LSC) into FLSS saved-search filters. It
matches subscription-service's `processLsc` where that handles a field, and makes a documented best guess beyond it.

```js
import { autolendLscSelection, lscToFlssFilters } from '@kiva/kv-loan-filters';

const query = gql`query { my { autolendProfile { loanSearchCriteria { ${autolendLscSelection} } } } }`;

const { filters, changes, unconverted } = lscToFlssFilters(loanSearchCriteria, { themeFacets });
// filters is ready for createFundraisingLoanSavedSearch(filters: $filters)
```

`changes` lists keys whose saved search may match differently from the LSC. `unconverted` lists criteria present in
the LSC that could not be carried over, ready to show to the user.

To show the result as a list, call `presentFlssFilters(conversion.filters[0], allFacets, conversion.changes)`. It
returns ordered `{ key, label, values, note? }` criteria with names resolved from `allFacets`; render `unconverted`
beneath them. It also accepts an existing saved search's filter group.

### Matching `processLsc`

| LSC (graph) | FLSS | Rule |
|---|---|---|
| `country` | `countryIsoCode: { any }` | Omit when empty. |
| `sector` | `sectorId: { any }` | Omit when empty. |
| `partner` | `partnerId: { any }` | Omit when empty. |
| `activity` | `activityId: { any }` | Omit when empty. |
| `loanTags` | `tagId: { any }` | Omit when empty. |
| `theme` (names) | `themeId: { any }` | Match `themeFacets` by trimmed, case-insensitive name. Unmatched names go to `unconverted`. |
| `gender` | `gender: { eq }` | `both`/null → omit. |
| `isGroup` | `isIndividual: { eq: !isGroup }` | null → omit. |
| `distributionModel` | `distributionModel: { eq: DIRECT \| FIELDPARTNER }` | `both`/null → omit. |
| `lenderTerm` | `lenderRepaymentTerm: { range }` | A bound of 0 or null is omitted. |
| `riskRating` | `partnerRiskRating: { range }` | Absent ("All") → `{ lte: 5 }`. `{ min: 0, max: 5 }` → omit. Otherwise bounds of 0 are omitted. |
| `defaultRate` | `partnerDefaultRate: { range }` | A min of 0 is kept. A max of 0 above a positive min is unset. |
| `arrearsRate` | `delinquencyRate: { range }` | Same as default rate. |

### Beyond `processLsc`

| LSC (graph) | FLSS | Rule |
|---|---|---|
| `queryString` | `keywordSearch: { eq }` | Trimmed. Empty → omit. Noted in `changes`. |
| `trustee` | `trusteeId: { any }` | Omit when empty. |
| `profitability` | `partnerAvgProfitability: { range }` | Default-rate rules. |
| `avgBorrowerCost` | `partnerAvgBorrowerCost: { range }` | Default-rate rules. |
| `dafEligible: true` | `dafEligible: { eq: true }` | false/null → omit. |
| `currencyLossPossible: false` | `isCurrencyLossPossible: { eq: false }` | true/null → omit. |
| `cityState`, else `city_state` | `city: { any }`, `state: { any }` | Split `"Portland,OR"` or `"St. Louis MO"`. Unsplittable entries go to `unconverted`. Noted in `changes`. |

### Dropped without an entry

- **Not criteria:** `sortBy`, `loanLimit`, `status`, `loanIds`, `lenderFavorite`.
- **Dropped by subscription-service before conversion:** `isMatched`, `matcherAccountId`, `expiringSoon`,
  `excludeNonRated`. FLSS `isMatchable` is the candidate if "matched only" is ever converted.
- **Search-only, never stored on an LSC:** `hasResearchScore`, `anonymizationLevel`.
- **Never returned by the graph:** amount, borrower age, states, zips, social performance badges.

## Contribution Guidelines

The Kiva UI project is bound by a [Code of Conduct](https://github.com/kiva/ui/blob/master/code_of_conduct.md).

Kiva welcomes outside contributions to our UI repository. If you have any ideas for a feature or improvement, create an issue and we can discuss whether it makes sense to create a pull request. Thanks for the help!
