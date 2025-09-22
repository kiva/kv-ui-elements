# kv-ui-elements

Monorepo containing design definitions and UI components for Kiva's style guide.

-   [Storybook](https://main--608b4cf87f686c00213841b1.chromatic.com/?path=/docs/base-styling-primitives--primitives)
-   [Design definitions and Tailwind Config](https://github.com/kiva/kv-ui-elements/tree/main/%40kiva/kv-tokens)
-   [UI Component library](https://github.com/kiva/kv-ui-elements/tree/main/%40kiva/kv-components)
-   [Modules for Loan Filters](https://github.com/kiva/kv-ui-elements/tree/main/%40kiva/kv-loan-filters)

## Adding New Package

```bash
npm install -g lerna
lerna create @kiva/kv-package-name
```

## Linking individual workspaces for local dev in other repos

Note: The Node.js versions used while linking must match!!!

1. In this repo's root, link the specific workspace you're working with
```bash
npm link -w @kiva/kv-components
-or-
npm link -w @kiva/kv-shop
```

2. In your web application repo's root, pull in the link
```bash
npm link @kiva/kv-components
-or-
npm link @kiva/kv-shop
```

3. Make changes to your active workspace/package locally, run npm build and changes should be reflected in your application

### Unlinking from your application
To bring your web application back to it's normal state, we need to unlink the package so it continues to install from npm instead of your local machine. The `--no-save` flag will ensure you don't remove this package completely.
```bash
npm unlink --no-save @kiva/kv-components
-or-
npm unlink --no-save @kiva/kv-shop
```

## Contribution Guidelines

The Kiva UI project is bound by a [Code of Conduct](https://github.com/kiva/ui/blob/master/code_of_conduct.md).

Kiva welcomes outside contributions to our UI repository. If you have any ideas for a feature or improvement, create an issue and we can discuss whether it makes sense to create a pull request. Thanks for the help!
