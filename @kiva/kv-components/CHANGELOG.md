# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.2.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.1.0...@kiva/kv-components@3.2.0) (2022-08-04)


### Bug Fixes

* event name in emits ([06813fd](https://github.com/kiva/kv-ui-elements/commit/06813fda75cf9a169b9e5afd33549b9eb77b33a1))
* remove unused event ([345cd90](https://github.com/kiva/kv-ui-elements/commit/345cd903ab5d6725de34d2085a2c8e65cba6933f))


### Features

* add payload to track closing events ([275c81d](https://github.com/kiva/kv-ui-elements/commit/275c81da659fa586500b9d21607ba5c69c4e5839))
* add tailored emit event for MARS-199 experiment in kvLightbox ([8499206](https://github.com/kiva/kv-ui-elements/commit/8499206381c9e5bf1ac0ae4ab913b91b07ba906e))





# [3.1.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.0.6...@kiva/kv-components@3.1.0) (2022-07-19)


### Features

* add new caution variant to buttons ([#191](https://github.com/kiva/kv-ui-elements/issues/191)) ([14f3eb6](https://github.com/kiva/kv-ui-elements/commit/14f3eb6548bfc925cc2cb656966829f127a8864e))





## [3.0.6](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.0.5...@kiva/kv-components@3.0.6) (2022-06-23)

**Note:** Version bump only for package @kiva/kv-components





## [3.0.5](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.0.4...@kiva/kv-components@3.0.5) (2022-05-27)

**Note:** Version bump only for package @kiva/kv-components





## [3.0.4](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.0.3...@kiva/kv-components@3.0.4) (2022-05-23)


### Bug Fixes

* remove usage of currentInstance, re-implement indicator count update mechanism ([21dae02](https://github.com/kiva/kv-ui-elements/commit/21dae029094bdeecd4d352eea70a116c08af504c))





## [3.0.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.0.2...@kiva/kv-components@3.0.3) (2022-05-16)


### Bug Fixes

* added back initial uuid value. ([aa4a88c](https://github.com/kiva/kv-ui-elements/commit/aa4a88c5a65846e9103ce25985bd7d1cc7bfd025))
* label and input uuids didn't match ([742452a](https://github.com/kiva/kv-ui-elements/commit/742452a9ffe03980f10f444a99f253429d028170))





## [3.0.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.0.1...@kiva/kv-components@3.0.2) (2022-03-18)


### Bug Fixes

* clean up tests console errors and props ([37a6da9](https://github.com/kiva/kv-ui-elements/commit/37a6da9b4439463e777ae503b7ccff6562b9c81f))
* ensure reactive ref state without timeout ([eda1553](https://github.com/kiva/kv-ui-elements/commit/eda1553304e6ed4199e35dbd73cb821b87bf3175))
* return additional items for access as refs in vue2 ([b34ee52](https://github.com/kiva/kv-ui-elements/commit/b34ee52c39357bb7469418717d99c08a937c5cb8))





## [3.0.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.0.0...@kiva/kv-components@3.0.1) (2022-02-16)


### Bug Fixes

* **KvButton:** pass through click event for parent ([65c042f](https://github.com/kiva/kv-ui-elements/commit/65c042ff7b4780a514766ab476f443562b195eab))





# [3.0.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@2.0.0...@kiva/kv-components@3.0.0) (2022-02-16)


### Bug Fixes

* **deps:** add required missing vue composition api for storybook ([7c4629e](https://github.com/kiva/kv-ui-elements/commit/7c4629eac8820a53ce86de0056a5ac17cfd25b73))
* input reference was back to ref ([fce5264](https://github.com/kiva/kv-ui-elements/commit/fce52641b384efb83d5d8d5cfd4587cc924b4484))
* **KvSwitch:** ensure component attributes behave the same way across vue versions ([1414899](https://github.com/kiva/kv-ui-elements/commit/14148990c48449548614d02ee4869ddd72c87f74))
* model added to work correctly ([8992e83](https://github.com/kiva/kv-ui-elements/commit/8992e8330a86c41e75a42dddc5ed3531aad1da43))
* set correct module type for importing the package ([ef7e828](https://github.com/kiva/kv-ui-elements/commit/ef7e82876544f9016a09e743d68da3451e1ab3d6))
* update path ([f33c2fb](https://github.com/kiva/kv-ui-elements/commit/f33c2fb7383ceb2caf916db2ec8d4e940697b5e7))
* value attr was added to msToDisplayToast computed ref to show the toast correctly ([5c5199c](https://github.com/kiva/kv-ui-elements/commit/5c5199c3d9601f34f9342c971f643c2ed1bde80f))


### Features

* checked prop was replaced by modelValue for composition api ([01e31a4](https://github.com/kiva/kv-ui-elements/commit/01e31a41976fc7cb406fbe0c6e41bb2ebf4573b1))
* files for kvcheckbox component were updated for tests passing ([e788ef3](https://github.com/kiva/kv-ui-elements/commit/e788ef34be213831cfce2034b94c4ebb843d7401))
* **KvCarousel:** component was rewritten to use composition api ([#149](https://github.com/kiva/kv-ui-elements/issues/149)) ([0e7ab21](https://github.com/kiva/kv-ui-elements/commit/0e7ab219902858fe05626231ca0027498b2d1280))
* kvcheckbox component was rewritten to use composition api ([945edee](https://github.com/kiva/kv-ui-elements/commit/945edeee9efcec4f47cb4dafbec81d856406cb16))
* kvcheckbox component was rewritten to use composition api ([787e9cf](https://github.com/kiva/kv-ui-elements/commit/787e9cf9448f7c9db5732fd3e1b2d441c52c389e))
* kvcontentfulimg component was rewritten to use composition api ([#145](https://github.com/kiva/kv-ui-elements/issues/145)) ([e30526c](https://github.com/kiva/kv-ui-elements/commit/e30526c994e65cfce7d479dd9f06e333588e7360))
* **KvLightbox:** component was rewritten using composition api ([#156](https://github.com/kiva/kv-ui-elements/issues/156)) ([8a83c6f](https://github.com/kiva/kv-ui-elements/commit/8a83c6ff01b32f2a46c3133c67033051de3ee8cf))
* kvprogressbar component was rewritten using composition api ([#152](https://github.com/kiva/kv-ui-elements/issues/152)) ([9cda6b6](https://github.com/kiva/kv-ui-elements/commit/9cda6b603a5eff1ea746b58bc1385f54bcb0cb50))
* **KvRadio:** component was rewritten to use composition api ([#146](https://github.com/kiva/kv-ui-elements/issues/146)) ([5b8f342](https://github.com/kiva/kv-ui-elements/commit/5b8f34213f445e876981197c91e333949ba73eb2))
* **KvSelect:** component was rewritten and basic test file was added ([#150](https://github.com/kiva/kv-ui-elements/issues/150)) ([69f99d8](https://github.com/kiva/kv-ui-elements/commit/69f99d814e46bdb622c27792fb955261ea7ff7bd))
* kvswitch component was rewritten using composition api ([a51c00e](https://github.com/kiva/kv-ui-elements/commit/a51c00e67b6f85b83bc24e3672de3d22994b5db1))
* KvTabs, KvTab, & KvTabPanel updated to support composition api ([#165](https://github.com/kiva/kv-ui-elements/issues/165)) ([c4758ae](https://github.com/kiva/kv-ui-elements/commit/c4758ae7dee98adf4f9a58fad6ef2d87d3fefcf7))
* **KvTextInput:** component was rewritten using composition api ([#159](https://github.com/kiva/kv-ui-elements/issues/159)) ([6d4ae80](https://github.com/kiva/kv-ui-elements/commit/6d4ae809003b07aea3c6eb97565a09c95289c0e8))
* kvtextlink component was rewritten to use composition api ([#151](https://github.com/kiva/kv-ui-elements/issues/151)) ([7181775](https://github.com/kiva/kv-ui-elements/commit/7181775d6d30c1bee5955670f615b4fdd587f9fe))
* pointer was added to switch component ([44ffb45](https://github.com/kiva/kv-ui-elements/commit/44ffb45c6dd5f4c71b5b8bfd3b8b2b65ab0818a2))
* testing file was added for kvtoast component ([cd6abe9](https://github.com/kiva/kv-ui-elements/commit/cd6abe9dea2218e705fc1efb94127d6b184e3800))


### BREAKING CHANGES

* **KvSelect:** The KvSelect prop `value` was renamed to `modelValue`.
The KvCheckbox prop `checked` has been renamed to `modelValue`.
The KvCheckbox event `change` has been renamed to `update:modelValue`.
* **KvTextInput:** The KvTextInput prop `value` has been renamed to `modelValue`





# [2.0.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@1.4.6...@kiva/kv-components@2.0.0) (2022-02-03)


* feat!: upgrade Tailwind to v3 ([18c1653](https://github.com/kiva/kv-ui-elements/commit/18c1653565eb42b8abfaaba6b3712173ff341850))


### BREAKING CHANGES

* Tailwind dependency is now v3





## [1.4.6](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@1.4.5...@kiva/kv-components@1.4.6) (2022-02-03)

**Note:** Version bump only for package @kiva/kv-components





## [1.4.5](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@1.4.4...@kiva/kv-components@1.4.5) (2022-02-03)

**Note:** Version bump only for package @kiva/kv-components





## [1.4.4](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@1.4.3...@kiva/kv-components@1.4.4) (2022-01-11)

**Note:** Version bump only for package @kiva/kv-components





## [1.4.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@1.4.2...@kiva/kv-components@1.4.3) (2022-01-05)


### Bug Fixes

* **KvButton:** fix loading spinner positioning in Safari ([3bfb687](https://github.com/kiva/kv-ui-elements/commit/3bfb68754b0cf9a119e5666a7dd08bc851ae2411))
* **KvSelect:** fix icon sizing in Safari ([58026af](https://github.com/kiva/kv-ui-elements/commit/58026af41e958024606edcfe458b4ec29264828c))
* **KvSwitch:** fix positioning in Safari ([d3cce11](https://github.com/kiva/kv-ui-elements/commit/d3cce113fe7801c798e3303dd52580c44afeff64))
* **KvTextInput:** fix icon sizing in Safari ([7f52581](https://github.com/kiva/kv-ui-elements/commit/7f52581b671ebecd094f455102fda0b685d26bda))





## [1.4.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@1.4.1...@kiva/kv-components@1.4.2) (2021-12-23)

**Note:** Version bump only for package @kiva/kv-components





## [1.4.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@1.4.0...@kiva/kv-components@1.4.1) (2021-12-22)


### Bug Fixes

* **KvTextInput:** watch for value prop changes ([ffa6c6d](https://github.com/kiva/kv-ui-elements/commit/ffa6c6dda548af021f1472e81469d7fc3a3c0a11))





# [1.4.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@1.3.0...@kiva/kv-components@1.4.0) (2021-12-20)


### Features

* **KvTextInput:** focus the input after clearing text ([2093abb](https://github.com/kiva/kv-ui-elements/commit/2093abb30dca870c661f5354e043f0c40290ef81))





# [1.3.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@1.2.2...@kiva/kv-components@1.3.0) (2021-12-13)


### Features

* **KvTextInput:** adds a button which clears the search form ([bf4166e](https://github.com/kiva/kv-ui-elements/commit/bf4166e604bfd08ab1c128eda10c51fc81c359ec))





## [1.2.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@1.2.1...@kiva/kv-components@1.2.2) (2021-11-24)

**Note:** Version bump only for package @kiva/kv-components





## [1.2.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@1.2.0...@kiva/kv-components@1.2.1) (2021-11-17)

**Note:** Version bump only for package @kiva/kv-components





# [1.2.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@1.1.3...@kiva/kv-components@1.2.0) (2021-11-12)


### Features

* **KvCheckbox:** add a prop and visual styling to tell a user the input is invalid ([b587ffd](https://github.com/kiva/kv-ui-elements/commit/b587ffdcb4834eb6dda25a880646cdcd4137a337))





## [1.1.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@1.1.2...@kiva/kv-components@1.1.3) (2021-11-10)


### Bug Fixes

* **KvLightbox:** allow for an empty lightbox body ([3d36755](https://github.com/kiva/kv-ui-elements/commit/3d367551d52dcc1d1b3aea7d98b7e733cd703ddc))





## [1.1.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@1.1.1...@kiva/kv-components@1.1.2) (2021-11-08)


### Bug Fixes

* **KvLightbox:** prevent lightbox references from being null when the lightbox is closed ([f19f03e](https://github.com/kiva/kv-ui-elements/commit/f19f03e0507e9e1c56b40aee3483628a39b0ff4f))





## [1.1.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@1.1.0...@kiva/kv-components@1.1.1) (2021-10-21)


### Bug Fixes

* **KvButton, KvTextLink:** Allow route objects to be passed to the :to prop ([505c125](https://github.com/kiva/kv-ui-elements/commit/505c1259b688a18a3dc4ed00c9768129d4123677))





# [1.1.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@1.0.0...@kiva/kv-components@1.1.0) (2021-10-20)


### Features

* allow font weight for 'text-small' class to be set on case-by-case basis ([3a33b4b](https://github.com/kiva/kv-ui-elements/commit/3a33b4b5eaad7f97b3e5579fedbc4f6095d6d12f))





# [1.0.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.22.3...@kiva/kv-components@1.0.0) (2021-10-07)

**Note:** Version bump only for package @kiva/kv-components





## [0.22.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.22.2...@kiva/kv-components@0.22.3) (2021-10-07)


### Bug Fixes

* **KvButton, KvTextLink:** Allow a route object to be passed to the "to" prop ([db3eda7](https://github.com/kiva/kv-ui-elements/commit/db3eda79215dc61a9700febf6117a572473f81cf))
* **KvButton:** align text center in case it wraps ([2b13157](https://github.com/kiva/kv-ui-elements/commit/2b131574451fef54ccb2d7bd98076fcdfb20bc04))





## [0.22.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.22.1...@kiva/kv-components@0.22.2) (2021-10-06)

**Note:** Version bump only for package @kiva/kv-components





## [0.22.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.22.0...@kiva/kv-components@0.22.1) (2021-10-05)

**Note:** Version bump only for package @kiva/kv-components





# [0.22.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.21.5...@kiva/kv-components@0.22.0) (2021-10-04)


### Features

* Add placeholder styling to our base styles ([ab42188](https://github.com/kiva/kv-ui-elements/commit/ab421881420c6698717930dca49f5b72e89da115))





## [0.21.5](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.21.4...@kiva/kv-components@0.21.5) (2021-10-01)

**Note:** Version bump only for package @kiva/kv-components





## [0.21.4](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.21.3...@kiva/kv-components@0.21.4) (2021-09-30)


### Bug Fixes

* **KvCheckbox, KvRadio, KvSwitch:** Avoid SSR problems when setting the UUID ([ff55726](https://github.com/kiva/kv-ui-elements/commit/ff55726e7052908c58dc71ea6d14d6bffb922da7))





## [0.21.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.21.2...@kiva/kv-components@0.21.3) (2021-09-30)


### Bug Fixes

* **KvCheckbox:** Background color now reliably changes when checkbox is clicked ([fc509b2](https://github.com/kiva/kv-ui-elements/commit/fc509b20fbed89e39df729090aa97beedd684636))





## [0.21.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.21.1...@kiva/kv-components@0.21.2) (2021-09-30)


### Bug Fixes

* **KvCheckbox:** Allow checkboxes to use an array in v-model ([39b2e92](https://github.com/kiva/kv-ui-elements/commit/39b2e92a3c71ebb94e6da0f7133ae67d40758035))





## [0.21.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.21.0...@kiva/kv-components@0.21.1) (2021-09-28)


### Bug Fixes

* **KvButton:** prevent underline on focus when button is an anchor tag ([10199ba](https://github.com/kiva/kv-ui-elements/commit/10199badc4bec6ae0badc420df5b0c2d7fed59e3))
* Use themable class names. Change to low-opacity instead of text-color for disabled state. ([6aa9f0d](https://github.com/kiva/kv-ui-elements/commit/6aa9f0dc9d0952e172848fdbd834fecb94cd0bc2))





# [0.21.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.20.5...@kiva/kv-components@0.21.0) (2021-09-23)


### Features

* **KvButton:** Add active state prop and styling ([5c97148](https://github.com/kiva/kv-ui-elements/commit/5c9714835cea5536f7fc88b36483f691b5cba9a3))





## [0.20.5](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.20.4...@kiva/kv-components@0.20.5) (2021-09-23)


### Bug Fixes

* Remove unnecessary lightbox class and webkit fix, make lightbox stories initialize with open lightboxes for better visual diffs ([#117](https://github.com/kiva/kv-ui-elements/issues/117)) ([1aa4f33](https://github.com/kiva/kv-ui-elements/commit/1aa4f33c1d9425874e54058930a753d7aab6773e))





## [0.20.4](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.20.3...@kiva/kv-components@0.20.4) (2021-09-23)


### Bug Fixes

* Fix lightboxes being cut off vertically on mobile ([#116](https://github.com/kiva/kv-ui-elements/issues/116)) ([23dd4d9](https://github.com/kiva/kv-ui-elements/commit/23dd4d91ba9aa4178644afe1cbd2bdf98de0d05a))





## [0.20.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.20.2...@kiva/kv-components@0.20.3) (2021-09-23)

**Note:** Version bump only for package @kiva/kv-components





## [0.20.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.20.1...@kiva/kv-components@0.20.2) (2021-09-22)

**Note:** Version bump only for package @kiva/kv-components





## [0.20.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.20.0...@kiva/kv-components@0.20.1) (2021-09-15)

**Note:** Version bump only for package @kiva/kv-components





# [0.20.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.19.7...@kiva/kv-components@0.20.0) (2021-09-14)


### Features

* **KvThemeProvider:** Add darkGreen theme ([8eaf80c](https://github.com/kiva/kv-ui-elements/commit/8eaf80cd9063d6f4468b131464ca1b7f5d127360))





## [0.19.7](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.19.6...@kiva/kv-components@0.19.7) (2021-09-14)

**Note:** Version bump only for package @kiva/kv-components





## [0.19.6](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.19.5...@kiva/kv-components@0.19.6) (2021-09-10)


### Bug Fixes

* fixes randomness in storybook stories for kvCarousel ([#111](https://github.com/kiva/kv-ui-elements/issues/111)) ([2ccbee2](https://github.com/kiva/kv-ui-elements/commit/2ccbee234b47f422caa4c4b93b992ae96efb0c26))





## [0.19.5](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.19.4...@kiva/kv-components@0.19.5) (2021-09-08)

**Note:** Version bump only for package @kiva/kv-components





## [0.19.4](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.19.3...@kiva/kv-components@0.19.4) (2021-09-02)

**Note:** Version bump only for package @kiva/kv-components





## [0.19.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.19.2...@kiva/kv-components@0.19.3) (2021-09-01)

**Note:** Version bump only for package @kiva/kv-components





## [0.19.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.19.1...@kiva/kv-components@0.19.2) (2021-08-31)

**Note:** Version bump only for package @kiva/kv-components





## [0.19.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.19.0...@kiva/kv-components@0.19.1) (2021-08-31)

**Note:** Version bump only for package @kiva/kv-components





# [0.19.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.18.0...@kiva/kv-components@0.19.0) (2021-08-30)


### Features

* **Theming:** Change tailwind class names to be themable. Adds KvThemeProvider component to set themes. ([0759c66](https://github.com/kiva/kv-ui-elements/commit/0759c669721acab61ca145b500f0860749aa85eb))





# [0.18.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.17.1...@kiva/kv-components@0.18.0) (2021-08-23)


### Features

* modify KvCarousel to allow for responsive slides ([#104](https://github.com/kiva/kv-ui-elements/issues/104)) ([8abf536](https://github.com/kiva/kv-ui-elements/commit/8abf53614190ee8ca6bb9480b0fb22cbd47aecc3))





## [0.17.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.17.0...@kiva/kv-components@0.17.1) (2021-08-20)

**Note:** Version bump only for package @kiva/kv-components





# [0.17.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.15.1...@kiva/kv-components@0.17.0) (2021-08-19)


### Features

* Adds KvCarousel component ([#100](https://github.com/kiva/kv-ui-elements/issues/100)) ([05a57b5](https://github.com/kiva/kv-ui-elements/commit/05a57b552d1e884a2cebb3d4e1b9a093d8c9834e))





# [0.16.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.15.1...@kiva/kv-components@0.16.0) (2021-08-19)


### Features

* Adds KvCarousel component ([#100](https://github.com/kiva/kv-ui-elements/issues/100)) ([05a57b5](https://github.com/kiva/kv-ui-elements/commit/05a57b552d1e884a2cebb3d4e1b9a093d8c9834e))





## [0.15.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.15.0...@kiva/kv-components@0.15.1) (2021-08-18)

**Note:** Version bump only for package @kiva/kv-components





# [0.15.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.14.0...@kiva/kv-components@0.15.0) (2021-08-13)


### Features

* **KvTextInput:** Kiva Classic input type=text ([6d17b96](https://github.com/kiva/kv-ui-elements/commit/6d17b96c7b397f2764e45a97029c36a47012654e))





# [0.14.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.13.3...@kiva/kv-components@0.14.0) (2021-08-11)


### Features

* **KvTabs:** Make inactive tab color black to prevent users from thinking its disabled ([ec28ce2](https://github.com/kiva/kv-ui-elements/commit/ec28ce26f43716b1d5290b23676a1d7b9c24302f))





## [0.13.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.13.2...@kiva/kv-components@0.13.3) (2021-08-11)

**Note:** Version bump only for package @kiva/kv-components





## [0.13.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.13.1...@kiva/kv-components@0.13.2) (2021-08-06)


### Bug Fixes

* **KvLightbox:** Fix minimum height 50% of screen on mobile. ([6abcd6b](https://github.com/kiva/kv-ui-elements/commit/6abcd6b432a42c7ab1133e2bee05f05e06f001d1))
* **KvSelect:** fixes issue where chevron wasn't visible in safari ([f01c9f5](https://github.com/kiva/kv-ui-elements/commit/f01c9f502035cdc9d2d39dd493121879afb3eff1))
* **KvTabs:** fix unselected tab panel color ([3b5146a](https://github.com/kiva/kv-ui-elements/commit/3b5146afe22a95b2dadb7cd0580873f0d26d602c))





## [0.13.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.13.0...@kiva/kv-components@0.13.1) (2021-08-05)


### Bug Fixes

* **KvTabs:** Prevent different height tab contents from overflowing their container during a transition ([a5ae332](https://github.com/kiva/kv-ui-elements/commit/a5ae3320d19589e35523b3b156237ec4b14071eb))





# [0.13.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.12.0...@kiva/kv-components@0.13.0) (2021-08-05)


### Bug Fixes

* **KvCheckbox:** fix binding attributes to the input element ([39fa56b](https://github.com/kiva/kv-ui-elements/commit/39fa56bf0f3ed0317241b2c0c44762c999325387))


### Features

* **KvCheckbox:** Styled vue component for checkbox UI ([18a83da](https://github.com/kiva/kv-ui-elements/commit/18a83da0ac53978ce3cc4d27c2ca31fe6c713bfe))
* **KvSwitch:**  Add input listeners so we get blur and focus events ([f720630](https://github.com/kiva/kv-ui-elements/commit/f720630e188375d5daeac3b4a0885c718117ca7c))
* **KvSwitch:** Allow for passing attributes like required, value, etc. to the input element ([4a80136](https://github.com/kiva/kv-ui-elements/commit/4a80136a51608f74042bfcfb8d8d571f1a5a0627))
* **KvSwitch:** remove value prop since it's never used in Vue. ([dea9ac9](https://github.com/kiva/kv-ui-elements/commit/dea9ac95e19cc772b238c47b962404ac1080cb1d))





# [0.12.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.11.0...@kiva/kv-components@0.12.0) (2021-08-05)


### Bug Fixes

* **KvRadio:** Add a unique ID for labels and inputs ([f2c2838](https://github.com/kiva/kv-ui-elements/commit/f2c2838af57f09eb3482d6c9a76d33b32594044e))


### Features

* **KvRadio:** Kiva Classic Vue component of <input type="radio"> ([d7af81c](https://github.com/kiva/kv-ui-elements/commit/d7af81c5a390305b22eb8f03954f84b8b3c36b81))





# [0.11.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.10.8...@kiva/kv-components@0.11.0) (2021-08-02)


### Features

* **KvSwitch:** UI for an on/off toggle ([a01aa65](https://github.com/kiva/kv-ui-elements/commit/a01aa6537c782439870cfb0a896e192e808f09f5))





## [0.10.8](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.10.7...@kiva/kv-components@0.10.8) (2021-07-30)

**Note:** Version bump only for package @kiva/kv-components





## [0.10.7](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.10.6...@kiva/kv-components@0.10.7) (2021-07-30)


### Performance Improvements

* Try adding sideEffects:false to improve tree shaking ([b87be7e](https://github.com/kiva/kv-ui-elements/commit/b87be7e1d27baf646249a34add8d4a49eeb69f85))





## [0.10.6](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.10.5...@kiva/kv-components@0.10.6) (2021-07-29)


### Bug Fixes

* **KvButton:** Fix accessibility issue where links might have role=button ([e72312e](https://github.com/kiva/kv-ui-elements/commit/e72312e3488273f9408804900c78f789d93bee7b))
* **KvButton:** fix default display when the button is a link ([db18d1d](https://github.com/kiva/kv-ui-elements/commit/db18d1dd2d200bea354784536c05ccc6caa9fef0))





## [0.10.5](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.10.4...@kiva/kv-components@0.10.5) (2021-07-29)

**Note:** Version bump only for package @kiva/kv-components





## [0.10.4](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.10.3...@kiva/kv-components@0.10.4) (2021-07-28)


### Bug Fixes

* Locks page scroll when the lightbox is open on UI ([b2f4be5](https://github.com/kiva/kv-ui-elements/commit/b2f4be519b53b3f8f2785d5e0013a4d2266ea1a8))





## [0.10.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.10.2...@kiva/kv-components@0.10.3) (2021-07-28)


### Bug Fixes

* **KvToast:** Show green checkbox if no messageType is passed in ([0dae691](https://github.com/kiva/kv-ui-elements/commit/0dae69110d37c8618cbc74e4e13c1b4a69d565e0))





## [0.10.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.10.1...@kiva/kv-components@0.10.2) (2021-07-22)


### Bug Fixes

* **KvButton:** bring back ripple animation on click ([649704d](https://github.com/kiva/kv-ui-elements/commit/649704d9fdc0a87f7a83293033c5563e1f07c3a5))





## [0.10.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.10.0...@kiva/kv-components@0.10.1) (2021-07-21)

**Note:** Version bump only for package @kiva/kv-components





# [0.10.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.9.0...@kiva/kv-components@0.10.0) (2021-07-17)


### Bug Fixes

* **KvToast:** wrap toast in page container, set min-width to 50% ([2357e4b](https://github.com/kiva/kv-ui-elements/commit/2357e4b0abb5eddbb15b234a96f0180282008ba1))


### Features

* **KvToast:** Component for displaying a temporary message to the user ([993fb91](https://github.com/kiva/kv-ui-elements/commit/993fb91aa74e5b3a60502802b7a0cb7c11125022))





# [0.9.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.8.1...@kiva/kv-components@0.9.0) (2021-07-16)


### Features

* **KvTextLink:** animate the icon on hover ([93fa540](https://github.com/kiva/kv-ui-elements/commit/93fa5407248d27d01dac804917679ad5f2d3a0fb))
* add 'text-link' utility class ([27a15f8](https://github.com/kiva/kv-ui-elements/commit/27a15f822b48e5a7ad0cfafa3f2c493580320086))
* **KvTextLink:** A component for a stylized text link with icon option ([afc7123](https://github.com/kiva/kv-ui-elements/commit/afc71232ed7f95990ff9852d2d89f5c41f2358d3))





## [0.8.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.8.0...@kiva/kv-components@0.8.1) (2021-07-12)

**Note:** Version bump only for package @kiva/kv-components





# [0.8.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.7.4...@kiva/kv-components@0.8.0) (2021-07-07)


### Features

* **KvLightbox:** Accessible lightbox/alert component ([165a087](https://github.com/kiva/kv-ui-elements/commit/165a087af1a0b9adc1f4b8d165e6492e5c54c92c))





## [0.7.4](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.7.3...@kiva/kv-components@0.7.4) (2021-07-01)

**Note:** Version bump only for package @kiva/kv-components





## [0.7.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.7.2...@kiva/kv-components@0.7.3) (2021-07-01)

**Note:** Version bump only for package @kiva/kv-components





## [0.7.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.7.1...@kiva/kv-components@0.7.2) (2021-07-01)

**Note:** Version bump only for package @kiva/kv-components





## [0.7.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.7.0...@kiva/kv-components@0.7.1) (2021-06-29)

**Note:** Version bump only for package @kiva/kv-components





# [0.7.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.6.0...@kiva/kv-components@0.7.0) (2021-06-25)


### Bug Fixes

* **KvGrid:** Set a grid gap for both x and y directions ([099581b](https://github.com/kiva/kv-ui-elements/commit/099581bbf94515dd9f2348fad7643d016ecf243f))


### Features

* **KvGrid:** Allow the grid container element to be elements other than divs ([e940032](https://github.com/kiva/kv-ui-elements/commit/e9400328eb45c9d14c2b557ed3666232d08fd136))
* **KvTabs:** Accessible components for implementing a tab UI pattern ([2d3dd50](https://github.com/kiva/kv-ui-elements/commit/2d3dd502507b3c5f7844ad4b6510dd9fc926753f))





# [0.6.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.5.0...@kiva/kv-components@0.6.0) (2021-06-17)


### Bug Fixes

* **KvContentfulImg:** Allow gif as fallback format. Remove webp since that's the non-fallback. ([6358209](https://github.com/kiva/kv-ui-elements/commit/635820947e52e18a964e4ac49efa583153cba647))
* **KvContentfulImg:** Ensure inline-styles are included on both img elements ([45dfce1](https://github.com/kiva/kv-ui-elements/commit/45dfce1a5b821e62dc8c2b19d235360f90921a7a))
* **KvContentfulImg:** Remove need for fallback format since it's no longer required ([0785d60](https://github.com/kiva/kv-ui-elements/commit/0785d609f7c44d78320f4e672b805c700d022634))
* **KvProgressBar:** Add ariaLabel prop, fix aria attribute DOM placement, add min prop in case it's non-zero. ([941b923](https://github.com/kiva/kv-ui-elements/commit/941b923b1419d561951eabbc65b7653b91bbed3a))


### Features

* **KvGrid:** A component that sets the grid gaps as specified by design ([3886aff](https://github.com/kiva/kv-ui-elements/commit/3886aff12d185adb2f921f7d37676236dde9066e))
* **KvPageContainer:** A component that adds margins, centers and contains content per design specs ([d007e1b](https://github.com/kiva/kv-ui-elements/commit/d007e1b3e1bb770782fe84f78802cdbdbf0e8fd4))


### Performance Improvements

* **KvContentfulImg:** Set width and height attributes on source elements to prevent content layout shift ([b381662](https://github.com/kiva/kv-ui-elements/commit/b3816624dea23b74735cb5abdf6620a53b9a044e))
* **KvProgressBar:** Animate using css transforms instead of width ([cf5a917](https://github.com/kiva/kv-ui-elements/commit/cf5a917d54442a04c6dae7893483868c5f5fcff4))





# [0.5.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.4.2...@kiva/kv-components@0.5.0) (2021-06-15)


### Bug Fixes

* **KvContentfulImg:** Fallback format does not need to be required because it has a default value ([342b4b1](https://github.com/kiva/kv-ui-elements/commit/342b4b1dd564e94e7c6cdacc812354e73bc3016e))
* KvSelect, updating value to accept number and string ([ab12bcb](https://github.com/kiva/kv-ui-elements/commit/ab12bcbced19e6a5e209028fb616cb490ce67c8a))


### Features

* **KvContentfulImg:** Make child img element inherit width, height, and object-fit styles from parent ([3c6dc3c](https://github.com/kiva/kv-ui-elements/commit/3c6dc3c303a477c01c57a92b10cf465414bcb3ef))





## [0.4.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.4.1...@kiva/kv-components@0.4.2) (2021-06-10)


### Bug Fixes

* adding tailwinds override for foundation classes applied globally in /ui ([866efe8](https://github.com/kiva/kv-ui-elements/commit/866efe84029928b82fbf2c3207cb16cde1ac676e))





## [0.4.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.4.0...@kiva/kv-components@0.4.1) (2021-06-08)

**Note:** Version bump only for package @kiva/kv-components





# [0.4.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.3.1...@kiva/kv-components@0.4.0) (2021-06-08)


### Features

* Add ability to set custom image sources across source sets. This enables an adaptive image setup for using different images across viewport sizes. ([9fd8c9a](https://github.com/kiva/kv-ui-elements/commit/9fd8c9a34559019c62e32b943b5759570f9f5cde))





## [0.3.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.3.0...@kiva/kv-components@0.3.1) (2021-06-03)

**Note:** Version bump only for package @kiva/kv-components





# [0.3.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.2.0...@kiva/kv-components@0.3.0) (2021-05-27)


### Features

* **KvProgressBar:** Accessible progress bar with animation on load ([#58](https://github.com/kiva/kv-ui-elements/issues/58)) ([b01f8a4](https://github.com/kiva/kv-ui-elements/commit/b01f8a4376fb771c76df74a0569b9bba77ba2cc3))





# [0.2.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@0.1.0...@kiva/kv-components@0.2.0) (2021-05-26)


### Bug Fixes

* **build:** Move scoped workspaces to directory matching scope ([#53](https://github.com/kiva/kv-ui-elements/issues/53)) ([a86c7a1](https://github.com/kiva/kv-ui-elements/commit/a86c7a1e339b549a717d4efa4c5216b1a6ec751b))


### Features

* **build:** KvSelect focus styles ([43b9818](https://github.com/kiva/kv-ui-elements/commit/43b981810a18d27b48ed0856f584413d476a632e))
* **build:** KvSelect increasing focus state ring thickness ([2547155](https://github.com/kiva/kv-ui-elements/commit/25471551a7ba625e80a3eba339ca4bc938d6b9c5))
* **build:** KvSelect removing grey border on focus ([bb028b8](https://github.com/kiva/kv-ui-elements/commit/bb028b8c786871796b6cba91b5b6f49e9bfedc4d))
* **KvContentfulImg:** Component that renders image from contentful ([#57](https://github.com/kiva/kv-ui-elements/issues/57)) ([0dfccb5](https://github.com/kiva/kv-ui-elements/commit/0dfccb5f60f50262b7f58703e08b631c17201bb0))
* **KvLoadingSpinner:** Modify the animation timing for KvLoadingSpinner ([#56](https://github.com/kiva/kv-ui-elements/issues/56)) ([39c19b6](https://github.com/kiva/kv-ui-elements/commit/39c19b6a9a1e5eeddb95769ba2d91ea90eedf054))
* KvSelect component and storybook story ([0db8bed](https://github.com/kiva/kv-ui-elements/commit/0db8bed4530da9ab9f4fe04a1e0f26e57835a8ab))
* **KvLoadingSpinner:** KvLoadingSpinner component ([#48](https://github.com/kiva/kv-ui-elements/issues/48)) ([9647064](https://github.com/kiva/kv-ui-elements/commit/9647064852876f58bd226a610fe07af7d937301d))





# 0.1.0 (2021-05-19)


### Bug Fixes

* **KvButton:** Prevent underline on hover for buttons with hrefs. Add story. ([aa9e158](https://github.com/kiva/kv-ui-elements/commit/aa9e1588138cbe380a0532884fae1fbd5b453d47))


### Features

* Release process ([#49](https://github.com/kiva/kv-ui-elements/issues/49)) ([50c96fa](https://github.com/kiva/kv-ui-elements/commit/50c96fa71c4ff7d979b18ce778b4e5c4efdedabd))
* **KvMaterialIcon:** New component for displaying Material Design icons ([007ceea](https://github.com/kiva/kv-ui-elements/commit/007ceeaba9d011d1e358bd9a6cbc79e7a1da5c55))


### Reverts

* Revert "Add an out directory for building storybook" ([fc6fee1](https://github.com/kiva/kv-ui-elements/commit/fc6fee126605b59b0a0a99b3152fa197bfe18f09))
