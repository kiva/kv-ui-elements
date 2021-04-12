# kv-components

## What lives here?
* Reusable UI building block components that can be used across apps at Kiva. They take in only props and slots, emit events, and are agnostic to how data loads.
* Rule of thumb - If a UI pattern is used more than three times, turn it into a Kv* component and add it here.

## What doesn't live here?
* App-specific components that contain business logic
* Pages - It can be nice to use Storybook for faster development when building out a screen. If desired that can be done in the app-specific repo rather than here.

## Writing Stories
* Write stories in the [CSF format](https://storybook.js.org/docs/vue/writing-stories/introduction). 
* Build stories (permutations) that describe the intended look and feel given the components set of inputs (props or slots).
* Use JsHint to document all props, slots and events so Storybook docs will pick them up.

## Process
* TBD - visual snapshotting(?, chromatic?), design signoff, versioning, NPM, oh my!

## Additional Resources
* https://storybook.js.org/tutorials/design-systems-for-developers


