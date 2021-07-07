# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
