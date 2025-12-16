# kv-shop

A library of methods and components related to the Kiva Shop.

## Install

Deployed:

```bash
npm i @kiva/kv-shop
```

Local:

```bash
# Open kv-ui-elements folder in Terminal
npm link -w @kiva/kv-shop

# Open target local project folder in Terminal
npm link @kiva/kv-shop
```

Extra step for Nuxt local development:

```ts
// Open nuxt.config.ts in target project and add with your username
...
vite: {
    optimizeDeps: {
      exclude: ['@kiva/kv-shop'],
    },
    server: {
      fs: {
        allow: ['/Users/username/kiva/kv-ui-elements'],
      },
    },
  },
...
```

## Lint

```bash
npm run lint
```

## Build

```bash
npm run build
```

## Contribution Guidelines

This project is bound by a [Code of Conduct](https://github.com/kiva/ui/blob/master/code_of_conduct.md).

Kiva welcomes outside contributions to our UI repository. If you have any ideas for a feature or improvement, create an issue and we can discuss whether it makes sense to create a pull request. Thanks for the help!
