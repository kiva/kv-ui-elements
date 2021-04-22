# kv-ui-elements
Design definitions and components for Kiva's style guide
* View our component library here: TBD
* View our Tailwind config viewer here: TBD

## Installing
$ `npm install https://github.com/kiva/kv-ui-elements`
## Consuming Components
To use these Vue components within into your project, you'll need to install Tailwind, use our config as a preset, then import the components you like.

1. [Install tailwind](https://tailwindcss.com/docs/installation) into your project
2. Add our tailwind config as a [preset](https://tailwindcss.com/docs/configuration#presets) in your tailwind.config.js
```
// tailwind.config.js
module.exports = {
  presets: [
    require('kv-ui-elements/kv-tokens/configs/tailwind.config.js')
  ],

  // Project-specific customizations
  theme: {
    //...
  },
  // ...
}
```
3. Import and use the Vue SFC components
```
<template>
  <div class="container">
    <h2 class="text-2xl">Test</h2>
    <kv-button>Lend today</kv-button>
  </div>
</template>

<script>
import KvButton from 'kv-ui-elements/kv-components/vue/KvButton.vue';
export default {
  components: {
    KvButton
  }
}
</script>
```
## Consuming Design Tokens
$ `import tokens from kv-ui-elements/kv-tokens/primitives.json`

## Developing
Pull down and $ `npm install`

### Developing Components with Storybook
For Node versions 15.13.x you can run Storybook from the root directory
$ `npm run storybook`;

Otherwise,
$ `cd kv-components && npm run storybook`

You can now edit Vue components or their stories and see the changes with live reload. If you edit `kv-tokens/primitives.json` or `kv-tokens/configs/tailwind.config.js` you'll need to rebuild storybook to see those changes.


## Contribution Guidelines
The Kiva UI project is bound by a [Code of Conduct](https://github.com/kiva/ui/blob/master/code_of_conduct.md).

Kiva welcomes outside contributions to our UI repository. If you have any ideas for a feature or improvement, create an issue and we can discuss whether it makes sense to create a pull request. Thanks for the help!
