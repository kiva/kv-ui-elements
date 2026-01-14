# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [8.2.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@8.1.1...@kiva/kv-components@8.2.0) (2026-01-14)


### Bug Fixes

* add tests for KvIconButton ([7e08eea](https://github.com/kiva/kv-ui-elements/commit/7e08eeac4631c02e5dbd751a6e0847a7917e1c3a))
* code quality improvements and story cleanup ([8644061](https://github.com/kiva/kv-ui-elements/commit/864406144c0b30f5df11d25df21900407bec20cc))
* correct KvCardFrameDocs config + story usage ([01700f0](https://github.com/kiva/kv-ui-elements/commit/01700f0dde0420719d42e77c532b0906b5614274))
* implement minimum button touch area along with default hover and active states ([0d541f3](https://github.com/kiva/kv-ui-elements/commit/0d541f3e8c09eb90d09deb94d40d96c7fa45bbd0))
* setup static image handling and update KvIconButtonDocs to use it ([91abfcb](https://github.com/kiva/kv-ui-elements/commit/91abfcbcbbed713098ba31c5ea350c527dff05e7))
* simplified KvIconButton to more closely follow the design spec, improved documentation ([998dffc](https://github.com/kiva/kv-ui-elements/commit/998dffc9b946ad94361687dcc6e15590726690f5))
* update static image include path ([27d5e40](https://github.com/kiva/kv-ui-elements/commit/27d5e40f752d706d8ed1a36cea5e8af5dc7dd8e3))


### Features

* initial setup and stories for new KvIconButton component ([267851f](https://github.com/kiva/kv-ui-elements/commit/267851fb358ecf2020554a5e15835b5c040dee8f))





## [8.1.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@8.1.0...@kiva/kv-components@8.1.1) (2026-01-09)


### Bug Fixes

* custom loan card padding fix ([#763](https://github.com/kiva/kv-ui-elements/issues/763)) ([e97bead](https://github.com/kiva/kv-ui-elements/commit/e97bead4a659d85381ebb5b8b256b7351cc44134))





# [8.1.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@8.0.2...@kiva/kv-components@8.1.0) (2026-01-08)


### Features

* light compact loan card variant added ([#762](https://github.com/kiva/kv-ui-elements/issues/762)) ([43525ff](https://github.com/kiva/kv-ui-elements/commit/43525ff8a852e0b76c060030bc273d59c86d2cd9))





## [8.0.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@8.0.1...@kiva/kv-components@8.0.2) (2026-01-07)


### Bug Fixes

* ensure lend cta has correct borders ([a521800](https://github.com/kiva/kv-ui-elements/commit/a52180058e81569d64e7837e651b806c41890561))





## [8.0.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@8.0.0...@kiva/kv-components@8.0.1) (2026-01-06)

**Note:** Version bump only for package @kiva/kv-components





# [8.0.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@7.6.3...@kiva/kv-components@8.0.0) (2026-01-05)


### Bug Fixes

* **kv-components:** add lang="ts" and fix simple typescript errors ([3d34801](https://github.com/kiva/kv-ui-elements/commit/3d3480170a6856fb646b9f1a7044751604b31ea4))
* **kv-components:** address unknown types ([6784fde](https://github.com/kiva/kv-ui-elements/commit/6784fde33a0cbd055e34a217063bf5e290072dbb))
* **kv-components:** adjust KvMap for Leaflet and MapLibreGL types ([b69b637](https://github.com/kiva/kv-ui-elements/commit/b69b6371505f5280cfa01ea129593e21983c71c6))
* **kv-components:** define type for KvContentfulImg loading prop ([ee43dfc](https://github.com/kiva/kv-ui-elements/commit/ee43dfccfdfaea7e4cd6aa52ad408f73425b09ae))
* **kv-components:** define type for maplibregl global in mapUtils ([6b6418a](https://github.com/kiva/kv-ui-elements/commit/6b6418af1a641baf8a6e154b1f6b139bef4b7534))
* **kv-components:** remove unneccessary "as any" ([a01afc4](https://github.com/kiva/kv-ui-elements/commit/a01afc4745c3192f6db2449b07e9a2727b853edc))
* **kv-components:** use Array.from(x) instead of [...x] for browser compatibility ([b7058fd](https://github.com/kiva/kv-ui-elements/commit/b7058fd65ef6358962d9ab3b2b64c196f48a2a68))
* **kv-components:** use constant for event emits ([273c130](https://github.com/kiva/kv-ui-elements/commit/273c130362eb98af276f393b7dfe88e303ee6d49))
* **kv-components:** use PropType for array prop type definitions ([c3d1020](https://github.com/kiva/kv-ui-elements/commit/c3d10201f8a6ee636ceb08c4886cbd8bd22ef9e2))


* feat(kv-components)!: rename KvProgressBar ariaLabel prop to label ([c2a9bd0](https://github.com/kiva/kv-ui-elements/commit/c2a9bd0eb42b0a0d4548bf6665c4017b383ddf62))


### Features

* **kv-components:** add types for dependencies ([2431c38](https://github.com/kiva/kv-ui-elements/commit/2431c381dd534e0ce679c41cef60f560a7f0b048))
* **kv-components:** cs convert to typescript ([e0bc947](https://github.com/kiva/kv-ui-elements/commit/e0bc9476c077926b48f881510382f7d04632dbbf))


### BREAKING CHANGES

* KvProgressBar prop renamed to avoid conflict with the HTML attribute.





## [7.6.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@7.6.2...@kiva/kv-components@7.6.3) (2025-12-22)


### Bug Fixes

* update caption styles and spacing within KvContentfulImg component ([0276c5c](https://github.com/kiva/kv-ui-elements/commit/0276c5c854334f429f5e2c684eeed18fb280d2fd))





## [7.6.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@7.6.1...@kiva/kv-components@7.6.2) (2025-12-16)

**Note:** Version bump only for package @kiva/kv-components





## [7.6.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@7.6.0...@kiva/kv-components@7.6.1) (2025-12-16)

**Note:** Version bump only for package @kiva/kv-components





# [7.6.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@7.5.0...@kiva/kv-components@7.6.0) (2025-12-04)


### Features

* add prop to open loan in new tab ([366e32b](https://github.com/kiva/kv-ui-elements/commit/366e32bbd83501f44de6c8dd0107a10b7adfdf26))





# [7.5.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@7.4.1...@kiva/kv-components@7.5.0) (2025-12-01)


### Features

* add link for business name and fix non-formatted websites ([8f4b57d](https://github.com/kiva/kv-ui-elements/commit/8f4b57d36ca38f8aeceda1b48874db4d9c139d99))





## [7.4.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@7.4.0...@kiva/kv-components@7.4.1) (2025-11-25)

**Note:** Version bump only for package @kiva/kv-components





# [7.4.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@7.3.4...@kiva/kv-components@7.4.0) (2025-11-24)


### Bug Fixes

* add website tracking click ([ce6bb8e](https://github.com/kiva/kv-ui-elements/commit/ce6bb8ec1beaabc98a025f9439a7dc1d23afd391))


### Features

* additional props for business cards ([53a7c73](https://github.com/kiva/kv-ui-elements/commit/53a7c736ef1d2c4b703784120c2a783e6669b7fd))





## [7.3.4](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@7.3.3...@kiva/kv-components@7.3.4) (2025-11-20)


### Bug Fixes

* small adjustment to keep space between loaders ([6389f05](https://github.com/kiva/kv-ui-elements/commit/6389f0594256a9be154d3981e31cfc0f773aeca0))





## [7.3.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@7.3.2...@kiva/kv-components@7.3.3) (2025-11-12)


### Bug Fixes

* slightly smaller pager for control top right carousel ([f2a95a8](https://github.com/kiva/kv-ui-elements/commit/f2a95a812fe54751f045ea24e5f597eee88ede5f))





## [7.3.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@7.3.1...@kiva/kv-components@7.3.2) (2025-11-12)


### Bug Fixes

* ensure KvLoanInfoCard has unique exports ([6a61dd5](https://github.com/kiva/kv-ui-elements/commit/6a61dd5a15b8903d018c481fa702bad118a13970))





## [7.3.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@7.3.0...@kiva/kv-components@7.3.1) (2025-11-11)


### Bug Fixes

* make compact impact vertical card more compact ([6d8e16c](https://github.com/kiva/kv-ui-elements/commit/6d8e16cb8207ac20ced9cdba96c23383fbb9737d))





# [7.3.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@7.2.5...@kiva/kv-components@7.3.0) (2025-11-11)


### Bug Fixes

* setup transitive 'helps' option for loan use and export new KvLoanInfoCard ([bb82045](https://github.com/kiva/kv-ui-elements/commit/bb82045dae06e06babeabc366a697eca5d98ce3a))


### Features

* new basic loan information card and stories ([9d506f2](https://github.com/kiva/kv-ui-elements/commit/9d506f20bea8c5a741e022972f62596ea8a8ae98))





## [7.2.5](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@7.2.4...@kiva/kv-components@7.2.5) (2025-11-10)

**Note:** Version bump only for package @kiva/kv-components





## [7.2.4](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@7.2.3...@kiva/kv-components@7.2.4) (2025-11-10)


### Bug Fixes

* kiva cards url in mobile ([aa05c93](https://github.com/kiva/kv-ui-elements/commit/aa05c93678c311068ea78ea4ef1a8a32d4794665))





## [7.2.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@7.2.2...@kiva/kv-components@7.2.3) (2025-11-07)


### Bug Fixes

* add new useCompactCard optn and ability to show message for existingCategories ([b4a6bf0](https://github.com/kiva/kv-ui-elements/commit/b4a6bf06d3c22b89dcdbd945f75a4604cbec3808))





## [7.2.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@7.2.1...@kiva/kv-components@7.2.2) (2025-11-07)


### Bug Fixes

* update button size options, add optional menu border styles ([90e765e](https://github.com/kiva/kv-ui-elements/commit/90e765e763ff06bff688886a342773bbc5262a56))





## [7.2.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@7.2.0...@kiva/kv-components@7.2.1) (2025-11-06)


### Bug Fixes

* slightly less padding above carousel pager ([cc92346](https://github.com/kiva/kv-ui-elements/commit/cc92346443e5eca5ff80877f1b3150adb309e567))





# [7.2.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@7.1.1...@kiva/kv-components@7.2.0) (2025-11-06)


### Features

* mp-2206 compact card highlight ([8e3d5fa](https://github.com/kiva/kv-ui-elements/commit/8e3d5fa2893e65cb62d13cba0c7c41735e1cbe23))
* mp-2206 compact card highlight ([1cdc560](https://github.com/kiva/kv-ui-elements/commit/1cdc560174f507adb9c59ed4280e3194b39a3764))





## [7.1.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@7.1.0...@kiva/kv-components@7.1.1) (2025-11-06)

**Note:** Version bump only for package @kiva/kv-components





# [7.1.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@7.0.0...@kiva/kv-components@7.1.0) (2025-11-04)


### Bug Fixes

* add padding to control ([99e6074](https://github.com/kiva/kv-ui-elements/commit/99e607452a2d09d0d0bf4a2738c2a1d8ce46b8cd))
* add storybook ([8b3c2a9](https://github.com/kiva/kv-ui-elements/commit/8b3c2a9e388de3d1d34c86fb5613fd874e2cf3a5))
* apply style fixes ([a4b9ccb](https://github.com/kiva/kv-ui-elements/commit/a4b9ccb21585e6f6389294d29aebd428e465e51a))
* change tw-shadow-md to tw-shadow-lg ([1967b6e](https://github.com/kiva/kv-ui-elements/commit/1967b6e767f5c3732774ed8009cc11523581c5f6))
* improve controls positioning ([5dd487d](https://github.com/kiva/kv-ui-elements/commit/5dd487d8e4314dfa8058b33236e3dde5f77baf54))
* minor style change ([8a02e67](https://github.com/kiva/kv-ui-elements/commit/8a02e679fa7728d385ec128df05e72e7f98e5131))
* remove extraneous tw class ([f77aa72](https://github.com/kiva/kv-ui-elements/commit/f77aa72195d05aaecf515e800ee8aad19aad7d2d))


### Features

* add controlsTopRight prop ([fa2cfb4](https://github.com/kiva/kv-ui-elements/commit/fa2cfb4fbe74f519f85efa1134ebdf4a1d1a1c75))





# [7.0.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.69.3...@kiva/kv-components@7.0.0) (2025-11-03)


### Bug Fixes

* **KvUserAvatar:** adjust cross-browser vertical alignment ([b9a77e6](https://github.com/kiva/kv-ui-elements/commit/b9a77e62225be40f9bc1235981fe6244d09a36a1))


* feat(KvUserAvatar)!: responsive sizing relative to width and height ([d76c5f1](https://github.com/kiva/kv-ui-elements/commit/d76c5f1b4cac90994aea7b39617acc9b3a8848e5))


### Features

* **KvUserAvatar:** option to use css placeholder ([0a78f5a](https://github.com/kiva/kv-ui-elements/commit/0a78f5abb38d1d91b72bf09612b5dc7c5469c29f))
* **KvWwwHeader:** loading states for basket, balance, and avatar ([0c31471](https://github.com/kiva/kv-ui-elements/commit/0c314713ea48d8eaeb22fa851755eab0821c14c3))


### BREAKING CHANGES

* The size of KvUserAvatar must be styled by consumers





## [6.69.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.69.2...@kiva/kv-components@6.69.3) (2025-11-03)


### Bug Fixes

* avoid showing badge for goals atb modal ([#734](https://github.com/kiva/kv-ui-elements/issues/734)) ([1176bee](https://github.com/kiva/kv-ui-elements/commit/1176bee51eff5f8002095effe5f55d083a5ada87))





## [6.69.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.69.1...@kiva/kv-components@6.69.2) (2025-10-31)


### Bug Fixes

* add click event to mobile tabs in lend menu ([ab0c730](https://github.com/kiva/kv-ui-elements/commit/ab0c730d67efa96b1bcaffd9ffb877fcd170ee79))
* prevent accordion items having double analytics ([12991f6](https://github.com/kiva/kv-ui-elements/commit/12991f654dad577dca51ba30baed8ff2be18497f))





## [6.69.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.69.0...@kiva/kv-components@6.69.1) (2025-10-30)


### Bug Fixes

* ensure all menu items have hover events ([8926d99](https://github.com/kiva/kv-ui-elements/commit/8926d99965ae447d5a6a7b715cb6d62364e94488))
* extend analytics in mobile hamburger menu ([9bee4f6](https://github.com/kiva/kv-ui-elements/commit/9bee4f67456f34dd7b2847d3801d2d3d8a3be343))
* move region click event to accordion item ([66e3121](https://github.com/kiva/kv-ui-elements/commit/66e31212ace02133c50ff84fec213fd775266972))





# [6.69.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.68.0...@kiva/kv-components@6.69.0) (2025-10-30)


### Features

* atb updated for goals ([#730](https://github.com/kiva/kv-ui-elements/issues/730)) ([914534a](https://github.com/kiva/kv-ui-elements/commit/914534a57f134fcabf4c9a7e816d5b6de75f40a9))





# [6.68.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.67.3...@kiva/kv-components@6.68.0) (2025-10-29)


### Features

* recommended row lendcard (MP-2100) ([61b8f4e](https://github.com/kiva/kv-ui-elements/commit/61b8f4ed77392e6050021f27e591dc8de39b9f65))





## [6.67.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.67.2...@kiva/kv-components@6.67.3) (2025-10-28)


### Bug Fixes

* make basket icon green ([dbec56a](https://github.com/kiva/kv-ui-elements/commit/dbec56aa9026ab00eb4f641ae9bd0c3688523ec7))





## [6.67.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.67.1...@kiva/kv-components@6.67.2) (2025-10-28)


### Bug Fixes

* adjust new nav sizes ([e6c3d15](https://github.com/kiva/kv-ui-elements/commit/e6c3d155429d86d6c67ea79a6822fe2f94ee574a))





## [6.67.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.67.0...@kiva/kv-components@6.67.1) (2025-10-28)


### Bug Fixes

* small adjustments to mobile side sheet cta ([67fdc16](https://github.com/kiva/kv-ui-elements/commit/67fdc16b6e92f5e2e70e167f643ca466d3771d1b))





# [6.67.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.66.0...@kiva/kv-components@6.67.0) (2025-10-27)


### Features

* fix compact card ([42d98c2](https://github.com/kiva/kv-ui-elements/commit/42d98c2cdf04dd1e803174eaaf7d2c240fedcabc))
* fix compact card ([22fcc33](https://github.com/kiva/kv-ui-elements/commit/22fcc33dbe72673eefcc8a0cabbbe54ce8739bcf))
* fix recommended rows ([842168f](https://github.com/kiva/kv-ui-elements/commit/842168fc28714bde14f538499a947dfcaba1fdb6))





# [6.66.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.65.1...@kiva/kv-components@6.66.0) (2025-10-24)


### Features

* sidesheet content min height added ([#721](https://github.com/kiva/kv-ui-elements/issues/721)) ([9a476e1](https://github.com/kiva/kv-ui-elements/commit/9a476e1bc852dc55ea34110b1943d526a24bdf7a))





## [6.65.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.65.0...@kiva/kv-components@6.65.1) (2025-10-23)


### Bug Fixes

* increase avatar menu width to fix position ([7c56abb](https://github.com/kiva/kv-ui-elements/commit/7c56abb09679efc2000e9013206266aa8eb97dbb))





# [6.65.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.64.1...@kiva/kv-components@6.65.0) (2025-10-23)


### Features

* kvsidesheet no animated variant ([#718](https://github.com/kiva/kv-ui-elements/issues/718)) ([2b47670](https://github.com/kiva/kv-ui-elements/commit/2b47670af638c346c7785fa03cc47a5ab9f1b8f4))





## [6.64.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.64.0...@kiva/kv-components@6.64.1) (2025-10-23)


### Bug Fixes

* avoid window errors in kvsidesheet ([#717](https://github.com/kiva/kv-ui-elements/issues/717)) ([debd50f](https://github.com/kiva/kv-ui-elements/commit/debd50ff1513e6c68357fb6943ae2078ae833005))





# [6.64.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.63.0...@kiva/kv-components@6.64.0) (2025-10-23)


### Features

* recommended row compact cart link fix ([adaf5d3](https://github.com/kiva/kv-ui-elements/commit/adaf5d340ed5acd67ddf563411d9d67becf1c82b))





# [6.63.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.62.5...@kiva/kv-components@6.63.0) (2025-10-22)


### Features

* preset amount option fix ([46b3c51](https://github.com/kiva/kv-ui-elements/commit/46b3c51b6179dc9be728ddeb6bb45dd3ff008407))





## [6.62.5](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.62.4...@kiva/kv-components@6.62.5) (2025-10-22)


### Bug Fixes

* vertically center initial in user avatar ([39b1238](https://github.com/kiva/kv-ui-elements/commit/39b12380fe6b0f256adf94bec5b2d99026139b95))





## [6.62.4](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.62.3...@kiva/kv-components@6.62.4) (2025-10-22)


### Bug Fixes

* hamburger menu header hidden behind the navbar ([a18589d](https://github.com/kiva/kv-ui-elements/commit/a18589dcaac9d577e2b02a9ab58da88d99cad08c))
* take action menu should hide in mobile ([67b6169](https://github.com/kiva/kv-ui-elements/commit/67b6169a4255aceab91ecd39dbd81806f7d1f290))





## [6.62.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.62.2...@kiva/kv-components@6.62.3) (2025-10-22)


### Bug Fixes

* avatar menu position on abrupt viewport changes and some clean up in header experiment ([20447c3](https://github.com/kiva/kv-ui-elements/commit/20447c33df809bf964e75c1ff5043ffd92d2cb93))
* revert checkIsMobileThrottled method ([5937853](https://github.com/kiva/kv-ui-elements/commit/593785349487053baf959eff107ba0e6a4f6a3fe))





## [6.62.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.62.1...@kiva/kv-components@6.62.2) (2025-10-21)


### Bug Fixes

* improve on hover fire events and menus getting closed on navbar edge ([433f331](https://github.com/kiva/kv-ui-elements/commit/433f331d4ff69d6bd0726f7929846cad688c5f35))





## [6.62.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.62.0...@kiva/kv-components@6.62.1) (2025-10-21)


### Bug Fixes

* avoid loading menus when elements is not mounted and  missing on hover event tracking ([597296a](https://github.com/kiva/kv-ui-elements/commit/597296aa1958bc8dd68cdda252216fe231c76702))





# [6.62.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.61.0...@kiva/kv-components@6.62.0) (2025-10-20)


### Bug Fixes

* revised mobile breakpoint ([c651c95](https://github.com/kiva/kv-ui-elements/commit/c651c953c20bac8f889c7435927e6509f2827e00))


### Features

* fixed truncation issue ([d428f54](https://github.com/kiva/kv-ui-elements/commit/d428f54b382a0f87b00d0384dd284daba6d57dd3))
* other preset option wrapping fix ([708f13f](https://github.com/kiva/kv-ui-elements/commit/708f13f4327f66e313a75cff75d6db50c0137ea9))
* reverted breakpoint value ([4ca075f](https://github.com/kiva/kv-ui-elements/commit/4ca075ff41fce31c56c86f4d283ca04c16ce9b6c))





# [6.61.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.60.0...@kiva/kv-components@6.61.0) (2025-10-20)


### Features

* recommended row lendcard (MP-2100) ([8c8a9e4](https://github.com/kiva/kv-ui-elements/commit/8c8a9e4c8761d9ebb7411f8daeaf150fb9841bd4))





# [6.60.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.59.4...@kiva/kv-components@6.60.0) (2025-10-16)


### Features

* recommended row lendcard (MP-2099) ([7669389](https://github.com/kiva/kv-ui-elements/commit/766938960cd1fb50cfacefdf47a0c4f19066f028))
* recommended row lendcard (MP-2099) ([b8ec6a5](https://github.com/kiva/kv-ui-elements/commit/b8ec6a58e889989244a776f9e6e44c423b21bf9d))
* recommended row lendcard (MP-2099) ([4235a66](https://github.com/kiva/kv-ui-elements/commit/4235a663d53a2b080a8ed326b2f7421c1ccebf2c))
* recommended row lendcard (MP-2100) ([d8ac648](https://github.com/kiva/kv-ui-elements/commit/d8ac64899c740f6c34cbcaedbc574e0601d64b9e))
* recommended row lendcard (MP-2100) ([711cc7b](https://github.com/kiva/kv-ui-elements/commit/711cc7bdec2a3df27b4b1f111cd58fb3b8dcd084))
* recommended row lendcard (MP-2100) ([db5273c](https://github.com/kiva/kv-ui-elements/commit/db5273c15dc4d14435a80996fcdb728407592c56))
* recommended row lendcard (MP-2100) ([82ebb0d](https://github.com/kiva/kv-ui-elements/commit/82ebb0dfc175569e63eda18f1d2f3f7d48e17338))
* recommended row lendcard (MP-2100) ([b2015b2](https://github.com/kiva/kv-ui-elements/commit/b2015b286a601ee8c5353ab761a5074901fe54f9))
* recommended row lendcard (MP-2100) ([ac321b9](https://github.com/kiva/kv-ui-elements/commit/ac321b915028f93ac1854b215716d8008d992675))
* recommended row lendcard (MP-2100) ([c9c2d92](https://github.com/kiva/kv-ui-elements/commit/c9c2d92b5b5159aeb70b23cec732aeccbfe67bd6))





## [6.59.4](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.59.3...@kiva/kv-components@6.59.4) (2025-10-15)


### Bug Fixes

* inject kvTrackEvent in header component ([aaf4230](https://github.com/kiva/kv-ui-elements/commit/aaf4230602de2be99effaf2caffd4ab166f704ef))





## [6.59.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.59.2...@kiva/kv-components@6.59.3) (2025-10-15)


### Bug Fixes

* missmatch on avatar links and missing hover on lend event ([f1ceb81](https://github.com/kiva/kv-ui-elements/commit/f1ceb81e3c25adec582d62d93ef6f36b381f30b1))





## [6.59.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.59.1...@kiva/kv-components@6.59.2) (2025-10-14)


### Bug Fixes

* missing tracking events ([397f83a](https://github.com/kiva/kv-ui-elements/commit/397f83a8de7853d27476e01188537ed896719d71))
* user tapping should not redirect to lend by category page ([fda004c](https://github.com/kiva/kv-ui-elements/commit/fda004cf46962cd8dac4332a02b19241013dd8b5))





## [6.59.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.59.0...@kiva/kv-components@6.59.1) (2025-10-10)


### Bug Fixes

* prevent event from menu component parent in mobile ([c37a538](https://github.com/kiva/kv-ui-elements/commit/c37a5385646a248e73b771aab78c9a5ec5960722))





# [6.59.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.58.0...@kiva/kv-components@6.59.0) (2025-10-08)


### Features

* update new nav tracking events ([9d7d9d1](https://github.com/kiva/kv-ui-elements/commit/9d7d9d13820427e3ada0e0885e5c97ac4b1e547a))





# [6.58.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.57.7...@kiva/kv-components@6.58.0) (2025-10-08)


### Bug Fixes

* disabled text color ([c9c13ca](https://github.com/kiva/kv-ui-elements/commit/c9c13ca5950e327eb916aeb96a7aa46bb9e31426))
* spacing ([485d422](https://github.com/kiva/kv-ui-elements/commit/485d422d37175a4ad934ea171e202de0d6ebe5c6))


### Features

* change modal title styling to be h2 ([1ad959a](https://github.com/kiva/kv-ui-elements/commit/1ad959af01d35052637af0bd97cbdb77b56c17bf))
* disabled fields for datepicker ([032355e](https://github.com/kiva/kv-ui-elements/commit/032355e4a3c4e7f6e012be676a7bb22cab852138))





## [6.57.7](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.57.6...@kiva/kv-components@6.57.7) (2025-10-03)


### Bug Fixes

* set atb modal right position to 0 if value is negative ([29151e9](https://github.com/kiva/kv-ui-elements/commit/29151e9498f4f296dd7f391ba192de1e353836de))





## [6.57.6](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.57.5...@kiva/kv-components@6.57.6) (2025-10-03)


### Bug Fixes

* add gender to loan card data to simplify where the fragment is used ([9d8dda9](https://github.com/kiva/kv-ui-elements/commit/9d8dda9c5cb886afa378feb51bf78264d60a77db))





## [6.57.5](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.57.4...@kiva/kv-components@6.57.5) (2025-10-02)


### Bug Fixes

* mobile menu being closed when click it anywhere and close menus on nav empty spaces click ([568b9b5](https://github.com/kiva/kv-ui-elements/commit/568b9b57890e5879bc68360a5672d9ff7539e8f9))





## [6.57.4](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.57.3...@kiva/kv-components@6.57.4) (2025-10-01)


### Bug Fixes

* when closing outside menu, watch openMenuItem to reset active menu value ([252baa7](https://github.com/kiva/kv-ui-elements/commit/252baa71f9f07ac7fc97c7b0920ec1dcef3856ef))





## [6.57.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.57.2...@kiva/kv-components@6.57.3) (2025-10-01)


### Bug Fixes

* utility menu analytics ([bd4742b](https://github.com/kiva/kv-ui-elements/commit/bd4742b0c29200b8336e10ede4388f18b029a248))





## [6.57.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.57.1...@kiva/kv-components@6.57.2) (2025-10-01)


### Bug Fixes

* close on click outside menu and toggling of avatar menu ([b897cd2](https://github.com/kiva/kv-ui-elements/commit/b897cd26871cb562a8713a948c0e7d9ff381b52d))





## [6.57.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.57.0...@kiva/kv-components@6.57.1) (2025-09-29)


### Bug Fixes

* balance rounded down in header ([#686](https://github.com/kiva/kv-ui-elements/issues/686)) ([e39be9c](https://github.com/kiva/kv-ui-elements/commit/e39be9c623e4fe16e4e8b03fc77dca20b2a4e936))





# [6.57.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.56.3...@kiva/kv-components@6.57.0) (2025-09-26)


### Features

* fallback font styles adjusted to match primary styles ([c57ddc1](https://github.com/kiva/kv-ui-elements/commit/c57ddc1190153dc4d5db264df52f2f0b45738c5b))





## [6.56.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.56.2...@kiva/kv-components@6.56.3) (2025-09-24)


### Bug Fixes

* kvsidesheet guard added as route leaves ([#684](https://github.com/kiva/kv-ui-elements/issues/684)) ([78c51dd](https://github.com/kiva/kv-ui-elements/commit/78c51dd0ef02a7bec0c0afbab830dd475e6512a7))





## [6.56.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.56.1...@kiva/kv-components@6.56.2) (2025-09-23)


### Bug Fixes

* avatar menu width and tablet size not opening take action and about menus ([b566a05](https://github.com/kiva/kv-ui-elements/commit/b566a055596afd77692443ab7d0c9470a8170a06))
* remove unnecessary if condition with linkPos ([4f4e6fc](https://github.com/kiva/kv-ui-elements/commit/4f4e6fc786cb54c076eb148ab8e86818dc7173c9))





## [6.56.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.56.0...@kiva/kv-components@6.56.1) (2025-09-23)


### Bug Fixes

* update validator for KvSecondaryNav headinglink ([010ce14](https://github.com/kiva/kv-ui-elements/commit/010ce146457edb1cb50ed223e726a51a97953c1e))





# [6.56.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.55.2...@kiva/kv-components@6.56.0) (2025-09-23)


### Bug Fixes

* cursor pointer for router links ([e763da2](https://github.com/kiva/kv-ui-elements/commit/e763da2bbb9f08ce45f8b7229aabbdd0add059b6))
* headingLink conditional params are now set properly ([c364b58](https://github.com/kiva/kv-ui-elements/commit/c364b58b82ebf99e220d94c69bc165d623eb73c6))
* move reactive underline classes to before style classes ([0822fd8](https://github.com/kiva/kv-ui-elements/commit/0822fd8cfd76b36f6c7e17046cf210fc4f2ee6c8))


### Features

* heading link option ([d932381](https://github.com/kiva/kv-ui-elements/commit/d9323816b1e02a5a6a88860413c64243f173a836))





## [6.55.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.55.1...@kiva/kv-components@6.55.2) (2025-09-19)


### Bug Fixes

* don't require lender for receipt, fix datepicker ([af57234](https://github.com/kiva/kv-ui-elements/commit/af57234cfade0b4c7a334ed3d04d6eee7e4ee240))





## [6.55.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.55.0...@kiva/kv-components@6.55.1) (2025-09-16)


### Performance Improvements

* **kv-components:** use www origin and webp format for kiva images ([dd2b318](https://github.com/kiva/kv-ui-elements/commit/dd2b318e66c0254e77fd54948bc53c520f7abaaf))





# [6.55.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.54.0...@kiva/kv-components@6.55.0) (2025-09-12)


### Bug Fixes

* center avatar img ([f8410c9](https://github.com/kiva/kv-ui-elements/commit/f8410c969891d31ebf6d73534a485c61ca18c0d7))


### Features

* basket, balance and avatar design tweaks ([68e0e10](https://github.com/kiva/kv-ui-elements/commit/68e0e107129c0a594ce5d20502b5a6529f864325))





# [6.54.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.53.1...@kiva/kv-components@6.54.0) (2025-09-12)


### Features

* **kv-components:** getKivaImageUrl method in imageUtils ([607f7b7](https://github.com/kiva/kv-ui-elements/commit/607f7b7baaeb1b90c295c68c1a30d3c4f61ba9bc))





## [6.53.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.53.0...@kiva/kv-components@6.53.1) (2025-09-11)


### Bug Fixes

* check legacy placeholder for avatar in header ([b9c0ccc](https://github.com/kiva/kv-ui-elements/commit/b9c0ccc0e87f4c961d9d26429972e7e75e3aa7e8))





# [6.53.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.52.10...@kiva/kv-components@6.53.0) (2025-09-11)


### Features

* using fallback icon when user has no profile photo ([dfc8004](https://github.com/kiva/kv-ui-elements/commit/dfc80049117da6d148e60d1d4a12c3d1e2cfb2b2))





## [6.52.10](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.52.9...@kiva/kv-components@6.52.10) (2025-09-09)


### Bug Fixes

* prop for changing countries not lent to url ([aa3f6de](https://github.com/kiva/kv-ui-elements/commit/aa3f6de34c899ebfacca691303a705f175a070af))





## [6.52.9](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.52.8...@kiva/kv-components@6.52.9) (2025-09-09)


### Bug Fixes

* mp-1988 narrow lend CTA ([71552c4](https://github.com/kiva/kv-ui-elements/commit/71552c407baca4b7007f0517d729ea9828a2def5))
* mp-1988 narrow lend CTA ([441ddd0](https://github.com/kiva/kv-ui-elements/commit/441ddd0de41e4577f3b63b37a954435e4fbc6867))
* mp-1988 narrow lend CTA ([8b84086](https://github.com/kiva/kv-ui-elements/commit/8b840862ad7a35be19e2ce6013acb3898b95a495))





## [6.52.8](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.52.7...@kiva/kv-components@6.52.8) (2025-09-05)


### Bug Fixes

* full height in hamburger menu ([55ee934](https://github.com/kiva/kv-ui-elements/commit/55ee934555cf8464c1b0d8a789145e6cadd265d9))





## [6.52.7](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.52.6...@kiva/kv-components@6.52.7) (2025-09-04)


### Bug Fixes

* is if the issue with isMobile is when it's checked ([c0b6cb8](https://github.com/kiva/kv-ui-elements/commit/c0b6cb8e3dd7b43ba967f3b39d17e5a0501b0809))
* remove some extra padding from desktop ([a5a3d9a](https://github.com/kiva/kv-ui-elements/commit/a5a3d9a729452fe6103503d8ee35d38fd8dd484b))





## [6.52.6](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.52.5...@kiva/kv-components@6.52.6) (2025-09-04)


### Bug Fixes

* actually prevent avatar menu from being full width in mobile ([5516cb4](https://github.com/kiva/kv-ui-elements/commit/5516cb478cf208532e189fdad1e92635b472e9aa))
* add more space between basket and balance ([50b4919](https://github.com/kiva/kv-ui-elements/commit/50b4919183859f3eda1f204c1805589ed963ca2b))
* adjust hamburger menu padding ([e962fbf](https://github.com/kiva/kv-ui-elements/commit/e962fbfb32ececa440328151f82ec4176b9db0d0))
* adjust tapping timeout to prevent mobile menu auto closing ([6b1bba8](https://github.com/kiva/kv-ui-elements/commit/6b1bba8402d0cf86f26ee6de789c7e4d9c7d79f8))
* right align portfolio menu items in mobile ([35204d4](https://github.com/kiva/kv-ui-elements/commit/35204d4980158438f896fcdf6d81442afc2aa670))





## [6.52.5](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.52.4...@kiva/kv-components@6.52.5) (2025-09-04)


### Bug Fixes

* add KvDatePicker to index.js ([2db6d2b](https://github.com/kiva/kv-ui-elements/commit/2db6d2bb37c8c38f5a305afd45d819b4089c3e68))





## [6.52.4](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.52.3...@kiva/kv-components@6.52.4) (2025-09-03)


### Bug Fixes

* avoid sending mouseover event on mobile in DropdownLink component ([4aea5d0](https://github.com/kiva/kv-ui-elements/commit/4aea5d0cfbb6bfc56fdca87cc29d60d59e51062a))





## [6.52.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.52.2...@kiva/kv-components@6.52.3) (2025-09-03)


### Bug Fixes

* resolve padding issue in medium desktop viewports ([58c4d90](https://github.com/kiva/kv-ui-elements/commit/58c4d905389da4171e52060ab125c06fef46acfc))
* update take action copy ([0f565b3](https://github.com/kiva/kv-ui-elements/commit/0f565b3b8aace59a1f7807ae5214da780003ed1c))





## [6.52.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.52.1...@kiva/kv-components@6.52.2) (2025-09-03)


### Bug Fixes

* lend menu closing when mouse leave, maxTouchPoints to handle mobile and desktop events ([ccea5d2](https://github.com/kiva/kv-ui-elements/commit/ccea5d2b2621461c710d862557a3c3999dbf6954))





## [6.52.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.52.0...@kiva/kv-components@6.52.1) (2025-09-03)


### Bug Fixes

* menus stuck when mouse leaves in desktop ([e88364d](https://github.com/kiva/kv-ui-elements/commit/e88364ddc69762d5913be8b7a70454e8d43a957e))





# [6.52.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.51.0...@kiva/kv-components@6.52.0) (2025-09-03)


### Bug Fixes

* avoid sending double events to open and closing menus with a flag ([f599073](https://github.com/kiva/kv-ui-elements/commit/f599073e2e7be56a51640be5d0bdbff8c702eeba))
* nav narrow than page container, menus dont open in tablet size and small design fixes ([53a4776](https://github.com/kiva/kv-ui-elements/commit/53a477650232d3a0e278eb609ba4c451073d57cf))
* solve comments ([30d5495](https://github.com/kiva/kv-ui-elements/commit/30d549510d6db4d77e04caea071bc0320322a3d3))


### Features

* change lg to md breakpoint ([2f65522](https://github.com/kiva/kv-ui-elements/commit/2f655227207c29d124a870cf33188a22e8e523fb))





# [6.51.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.50.5...@kiva/kv-components@6.51.0) (2025-08-29)


### Bug Fixes

* add theme support to datepicker ([07c983a](https://github.com/kiva/kv-ui-elements/commit/07c983acc7f33ecebce177476cdf04463af093f1))
* datepicker story not compiling properly ([00c094f](https://github.com/kiva/kv-ui-elements/commit/00c094f65eebc1c822dbfe28c08a97b967f17b7f))
* datepicker theme works on the input element ([91edf79](https://github.com/kiva/kv-ui-elements/commit/91edf7904c34fd70b37fffb771fccdefcf9aa7c6))
* use theme color variables con datepicker ([b83c51e](https://github.com/kiva/kv-ui-elements/commit/b83c51e7b68c201c3b40e5af4bc5c2b645747bdd))


### Features

* add kvDatePicker using vue-datepicker, stories ([b9bed63](https://github.com/kiva/kv-ui-elements/commit/b9bed6320a5f4500f6f413a3e794c135781d9736))





## [6.50.5](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.50.4...@kiva/kv-components@6.50.5) (2025-08-28)


### Bug Fixes

* make KvTooltip controllable via programatic events, add stories for placement and modifiers ([243b896](https://github.com/kiva/kv-ui-elements/commit/243b8968835aa0c87d593133bd67e1073525e538))





## [6.50.4](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.50.3...@kiva/kv-components@6.50.4) (2025-08-27)


### Bug Fixes

* test id syntax and using show for basket for kvAtbModal query ([4073a82](https://github.com/kiva/kv-ui-elements/commit/4073a8223219679b7eae9881cdb08dde7b3b6f1b))





## [6.50.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.50.2...@kiva/kv-components@6.50.3) (2025-08-27)


### Bug Fixes

* lend cta issue with mobile viewport ([62afc39](https://github.com/kiva/kv-ui-elements/commit/62afc392e2f5dd68cb449443d21f18afc7ef9645))
* lend cta issue with mobile viewport ([2a3fad4](https://github.com/kiva/kv-ui-elements/commit/2a3fad42f525b24c5ee8aecc0bd972b8236e31b6))
* lend cta issue with mobile viewport ([b6440a9](https://github.com/kiva/kv-ui-elements/commit/b6440a9044825322e152322ffcadc5719e485ce4))
* lend cta issue with mobile viewport ([a87af40](https://github.com/kiva/kv-ui-elements/commit/a87af40d33f118a790721ba9b3cb3eb95d99ca99))
* lend cta issue with mobile viewport ([01b7ba6](https://github.com/kiva/kv-ui-elements/commit/01b7ba6f1f9c0711c38c6e7c0108243d34a0b952))





## [6.50.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.50.1...@kiva/kv-components@6.50.2) (2025-08-27)


### Bug Fixes

* menu getting closed when hover on header edge and adding test ids to header elements ([76f14d8](https://github.com/kiva/kv-ui-elements/commit/76f14d841cf0e52a85e47f7f2659c12941f87c8f))





## [6.50.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.50.0...@kiva/kv-components@6.50.1) (2025-08-27)


### Bug Fixes

* lend menu botom hidden in mobile devices ([7806f0d](https://github.com/kiva/kv-ui-elements/commit/7806f0d89264bc18d35bc43501fa3e7d66cb85cd))





# [6.50.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.49.4...@kiva/kv-components@6.50.0) (2025-08-27)


### Features

* **KvTooltip:** configurable max-width and popper options ([bb8efd1](https://github.com/kiva/kv-ui-elements/commit/bb8efd1ab814a023bf1e78ddda1212cdf3ac3692))





## [6.49.4](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.49.3...@kiva/kv-components@6.49.4) (2025-08-26)


### Bug Fixes

* menu scroll, avatar menu opening on resize and menu shadow height ([cf1e6cf](https://github.com/kiva/kv-ui-elements/commit/cf1e6cff215411371e47e3d9fd47eccde222cf2a))





## [6.49.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.49.2...@kiva/kv-components@6.49.3) (2025-08-26)


### Bug Fixes

* migrate prior sm radii usages to be xs to restore the 4px radius ([b611499](https://github.com/kiva/kv-ui-elements/commit/b611499f37cd5ab4263400a7c87a9ec31afa6b62))





## [6.49.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.49.1...@kiva/kv-components@6.49.2) (2025-08-25)


### Bug Fixes

* header and menus spacing and small design fixes ([4326cce](https://github.com/kiva/kv-ui-elements/commit/4326cce95692f85951dba4d05ce3bb04eb81c600))





## [6.49.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.49.0...@kiva/kv-components@6.49.1) (2025-08-25)


### Bug Fixes

* mp-1832 fixing layout ([6bcc9ee](https://github.com/kiva/kv-ui-elements/commit/6bcc9eefb1cba9bf443433dfdf5f662556cbfd69))
* mp-1832 fixing layout ([3f86ef0](https://github.com/kiva/kv-ui-elements/commit/3f86ef061b7868fb5d60d457c2adcc35c72833c9))
* mp-1832 fixing layout ([4c7a077](https://github.com/kiva/kv-ui-elements/commit/4c7a077cec5d79052d992591b4dabb20fb1683d8))
* mp-1832 fixing layout ([edb2861](https://github.com/kiva/kv-ui-elements/commit/edb28618dabeaaf63108d1dbc73aa8427f95e663))
* mp-1832 fixing layout ([0c4676f](https://github.com/kiva/kv-ui-elements/commit/0c4676f570a6b93132971ce75be986b32773a4b6))
* mp-1832 fixing layout ([66ce364](https://github.com/kiva/kv-ui-elements/commit/66ce364459ddd80de46f99c918070a9b345e555a))
* mp-1832 fixing layout ([dd890d3](https://github.com/kiva/kv-ui-elements/commit/dd890d39cdca31e010929483e72d87319c942f75))
* mp-1832 fixing nuxt compatibility ([ac13e47](https://github.com/kiva/kv-ui-elements/commit/ac13e4795927e8e3183e1d62157fbb8ec52fab9b))





# [6.49.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.48.1...@kiva/kv-components@6.49.0) (2025-08-25)


### Features

* toggle header menus in mobile ([2d32b6b](https://github.com/kiva/kv-ui-elements/commit/2d32b6b20a0ea4757e48943c5f68a9442a733657))





## [6.48.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.48.0...@kiva/kv-components@6.48.1) (2025-08-25)

**Note:** Version bump only for package @kiva/kv-components





# [6.48.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.47.1...@kiva/kv-components@6.48.0) (2025-08-22)


### Features

* add lend monthly link too Lend menus ([6f7a9e0](https://github.com/kiva/kv-ui-elements/commit/6f7a9e0c7c1fefca79ec765fa4fb0a5e7e6dfe2d))
* menus still open when mouse leave and bottom border issue ([d074c82](https://github.com/kiva/kv-ui-elements/commit/d074c82ebc833c4685e2e8b148f7cd80680edf13))





## [6.47.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.47.0...@kiva/kv-components@6.47.1) (2025-08-21)


### Bug Fixes

* balance prop ([c53c63a](https://github.com/kiva/kv-ui-elements/commit/c53c63a1ce8ac4323209b9b7bfac23948e97bdb2))
* user avatar reference and warnings ([a4f04d1](https://github.com/kiva/kv-ui-elements/commit/a4f04d16c220c35ca98f3349c37bb1f5aa8b917e))





# [6.47.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.46.0...@kiva/kv-components@6.47.0) (2025-08-21)


### Bug Fixes

* indentation and no redirect link ([8b6e863](https://github.com/kiva/kv-ui-elements/commit/8b6e863606e0a8c2ccb4eac778dbbb08415176cb))
* moving balance to header instead of menu ([3487e88](https://github.com/kiva/kv-ui-elements/commit/3487e88fbb44c1d284854407e23b2a4805f5997d))
* only show if logged in and make url as prop ([567dffc](https://github.com/kiva/kv-ui-elements/commit/567dffc20e1cd0f43cee6b72c603ca133d5cb2a2))
* opening avatar menu on resize and other code changes ([ba691b0](https://github.com/kiva/kv-ui-elements/commit/ba691b0aa401b55411ed6599e3db01e995557805))
* resolve copilot comments ([a78198d](https://github.com/kiva/kv-ui-elements/commit/a78198db926205e84e11a5ce0fadea60dc7c7233))
* uninstall unused fuse.js package ([ba4aab8](https://github.com/kiva/kv-ui-elements/commit/ba4aab884ebaf3194aba5ddb6b6bacfd2836fd3c))


### Features

* adding My Dashboard link to header ([5a85f10](https://github.com/kiva/kv-ui-elements/commit/5a85f104990ab70d6943de5f9b9fdf0387f3ab22))
* avoid full width on some links and send their position to show menu bellow them ([03e8b6e](https://github.com/kiva/kv-ui-elements/commit/03e8b6e8772f044a7c3b427bf684e108ce8e6bbc))
* change menu bg color and remove search code ([6cb0042](https://github.com/kiva/kv-ui-elements/commit/6cb004241c8ffd6f4da537ef6b6e632837b06e51))
* create about dropdown link ([a1424f9](https://github.com/kiva/kv-ui-elements/commit/a1424f90aadf6af6345167ee6292e3175763e290))
* modifying currentt mobile menu ([c5c2aee](https://github.com/kiva/kv-ui-elements/commit/c5c2aee47c83138d5299cfe0be642ffb6de4e101))
* remove 'now' from Lend button ([0daac8c](https://github.com/kiva/kv-ui-elements/commit/0daac8ca85e6b597912d979909a01fa7a35ffebc))
* removing support kiva button and do not redirect to lend by category page on mobile ([5a49ab9](https://github.com/kiva/kv-ui-elements/commit/5a49ab9db4fca9083aea619cbb7b20999139c0cb))
* reusable dropdown link component ([4d7e98f](https://github.com/kiva/kv-ui-elements/commit/4d7e98fd2aa896fb68e63da593fdac6744dac28f))
* using user avatar instead of user icon ([870080e](https://github.com/kiva/kv-ui-elements/commit/870080e3daa83d2232414f851608b3ec1a125e5b))





# [6.46.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.45.2...@kiva/kv-components@6.46.0) (2025-08-21)


### Bug Fixes

* implement category image from contentful or custom image, update mock data and stories ([2aa2474](https://github.com/kiva/kv-ui-elements/commit/2aa247415763458aab23e2048c44f102602005a9))


### Features

* new impact vertical selection interface, tweaks to card frame to prevent odd heights ([d8246f9](https://github.com/kiva/kv-ui-elements/commit/d8246f9bc697141aeea5231a55eeb4d80607ba2a))





## [6.45.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.45.1...@kiva/kv-components@6.45.2) (2025-08-21)

**Note:** Version bump only for package @kiva/kv-components





## [6.45.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.45.0...@kiva/kv-components@6.45.1) (2025-08-20)


### Bug Fixes

* a little less padding ([ff9b3ae](https://github.com/kiva/kv-ui-elements/commit/ff9b3ae9a64c0c510fe51346b6e2606095c5912f))
* add top padding to kvpill ([6640462](https://github.com/kiva/kv-ui-elements/commit/6640462bf76ad27275b6a3186e821e4175eb936f))





# [6.45.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.44.0...@kiva/kv-components@6.45.0) (2025-08-20)


### Features

* export kvpill component ([a9899a2](https://github.com/kiva/kv-ui-elements/commit/a9899a283202be7c2a0e5227d4424bf8ce7db6a9))





# [6.44.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.43.1...@kiva/kv-components@6.44.0) (2025-08-20)


### Features

* add icon story, change h5 to span ([0d862b1](https://github.com/kiva/kv-ui-elements/commit/0d862b1ece213301378f93b98ed5d0e84aadaa06))
* generic pill component ([6e5dcc4](https://github.com/kiva/kv-ui-elements/commit/6e5dcc4f318fab6e4c1fe9a8c56b95210aa03d39))





## [6.43.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.43.0...@kiva/kv-components@6.43.1) (2025-08-18)


### Bug Fixes

* add ability to blur backgorund behind kvlightbox ([7b04368](https://github.com/kiva/kv-ui-elements/commit/7b043683b5c31ecbc9c277f823941841c5c42ad2))





# [6.43.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.42.0...@kiva/kv-components@6.43.0) (2025-08-13)


### Bug Fixes

* add width to button, improve auto-closing after menu click ([3ee2d44](https://github.com/kiva/kv-ui-elements/commit/3ee2d44d33ec0b0d10e5d1e603df10f829fa5018))
* allow content outside of KvCardFrame by default to support embedded menus that may overflow ([df7ce98](https://github.com/kiva/kv-ui-elements/commit/df7ce989f83671ccc78415a8a0dc009bbf0fbd79))


### Features

* initial setup for utility component with required customizations ([ea07f12](https://github.com/kiva/kv-ui-elements/commit/ea07f120a2d53f5dd8b7770c9f1caf6b20416fef))





# [6.42.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.41.0...@kiva/kv-components@6.42.0) (2025-08-13)


### Features

* new global component for pulsing dot ([334e9ff](https://github.com/kiva/kv-ui-elements/commit/334e9ff963011763d192a452dfd2e03fd79d64a6))





# [6.41.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.40.6...@kiva/kv-components@6.41.0) (2025-08-08)


### Features

* preload menu headers to avoid delay in showing menu ([4f20926](https://github.com/kiva/kv-ui-elements/commit/4f209269022557084dabfca3ef0671af263de446))





## [6.40.6](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.40.5...@kiva/kv-components@6.40.6) (2025-08-06)


### Bug Fixes

* min height class and hover color ([39dc682](https://github.com/kiva/kv-ui-elements/commit/39dc682a721843781bf197888dbdd91d9611e1dd))





## [6.40.5](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.40.4...@kiva/kv-components@6.40.5) (2025-08-06)


### Bug Fixes

* private menu query error and style issues ([63ffd62](https://github.com/kiva/kv-ui-elements/commit/63ffd62ffae909265f63b33e927f3f15ce84ba2d))





## [6.40.4](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.40.3...@kiva/kv-components@6.40.4) (2025-08-06)


### Bug Fixes

* not defined props in lend menu component ([3a6ec3d](https://github.com/kiva/kv-ui-elements/commit/3a6ec3d24a976c41427b78dd5fae1d802cc1b2b9))
* removing extra space ([34adcfe](https://github.com/kiva/kv-ui-elements/commit/34adcfedfa394178116f3e879c08baf2ecac3983))
* style tweaks and error in computed property ([48125e5](https://github.com/kiva/kv-ui-elements/commit/48125e59d49af6d3f58f75ec079c7341d0d2638c))





## [6.40.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.40.2...@kiva/kv-components@6.40.3) (2025-08-05)


### Bug Fixes

* missing no underline class in lend menu ([7492033](https://github.com/kiva/kv-ui-elements/commit/74920333e0cec3347f64683af8df8654eb85153e))
* search bar transition and category link spacing ([0d725b8](https://github.com/kiva/kv-ui-elements/commit/0d725b866a7d9afb6b97f1171606d9754f98621b))





## [6.40.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.40.1...@kiva/kv-components@6.40.2) (2025-08-05)


### Bug Fixes

* import kvWwwHeader related components ([7be704e](https://github.com/kiva/kv-ui-elements/commit/7be704ef71656661e15ca4c142d8ae38b59579e1))
* not exporting iconBag component ([56a312f](https://github.com/kiva/kv-ui-elements/commit/56a312fcec63c77f0b8cd2ee4d907c60f8c8c1bd))
* not necessary internal components being exported ([8bf51d1](https://github.com/kiva/kv-ui-elements/commit/8bf51d10d0ee50771beb0321ddf4ce61e1266f00))





## [6.40.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.40.0...@kiva/kv-components@6.40.1) (2025-08-05)


### Bug Fixes

* **KvContentfulImg:** using scale fit changes aspect ratio ([cbf5b86](https://github.com/kiva/kv-ui-elements/commit/cbf5b86b7b303ed298cff850d48c4fc4cd337eb6))





# [6.40.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.39.0...@kiva/kv-components@6.40.0) (2025-08-04)


### Bug Fixes

* extra space in variable declaration ([22e3490](https://github.com/kiva/kv-ui-elements/commit/22e34904564bd112307fe46ae1e074d9ffae2c36))
* highlighted bg ([a14a88d](https://github.com/kiva/kv-ui-elements/commit/a14a88dd03bbfcb025dbc051028309a4cfd91faa))
* mega menu link underline ([79705d3](https://github.com/kiva/kv-ui-elements/commit/79705d352922b7645843d0720b2d3022b351722d))
* menu drawer was not visible ([17b3f90](https://github.com/kiva/kv-ui-elements/commit/17b3f90b966772426e89b9e738076709dd3d33b6))
* removing ecoForest theme, svg for material icons and custom tw classes ([a01e26a](https://github.com/kiva/kv-ui-elements/commit/a01e26a19d2dd9ae4f50790640a07db9df957ea6))
* removing jit class for menu opacity ([a6ab331](https://github.com/kiva/kv-ui-elements/commit/a6ab33147494356941a83f353654a98eff051646))
* removing userId as ref ([cb6b789](https://github.com/kiva/kv-ui-elements/commit/cb6b7894210efd7c11b9949d5eeab3ca3f808ad6))
* using numeral to format balance ([53b2230](https://github.com/kiva/kv-ui-elements/commit/53b2230d616307babfaa239a446c9120364abf37))
* visual QA changes WIP ([49f99c1](https://github.com/kiva/kv-ui-elements/commit/49f99c1f48c5bdd1bede0692496a09fedaee6b23))


### Features

* add borrower/trustee state and small fix in balance ([c7bb125](https://github.com/kiva/kv-ui-elements/commit/c7bb1256956ad1f26acfd30b61933126ce68fcad))
* add test to comparators and arrayUtils ([d3b74c6](https://github.com/kiva/kv-ui-elements/commit/d3b74c6575695ee55694e3755f76bc47fb03d1bc))
* add tracking events ([03f71c5](https://github.com/kiva/kv-ui-elements/commit/03f71c559ef074d0cdc80c41d329e3c0e8366c2c))
* eco forest theme ([4fadf40](https://github.com/kiva/kv-ui-elements/commit/4fadf40c84a9a7a329f5941a1c39d105295dcbd8))
* implement search engine and display its results ([d6dd3a3](https://github.com/kiva/kv-ui-elements/commit/d6dd3a3daee0d842ea78f2ba902ad3fc6a9cbbd3))
* initial www header MARS-528 ([ca31433](https://github.com/kiva/kv-ui-elements/commit/ca3143391439aa21ff93d04f2f81a7769ae6b609))
* **KvThemeProvider:** allow custom root tag ([25d61bc](https://github.com/kiva/kv-ui-elements/commit/25d61bcc917b011a87b6ac2c164528de6babb7cc))
* load and format lend menu data ([754a84d](https://github.com/kiva/kv-ui-elements/commit/754a84d76eb349e83d1cec0859e362f53640fa0e))
* run suggestion query within component ([57351e9](https://github.com/kiva/kv-ui-elements/commit/57351e9f9c015398d2e129032ed1dd9e5c6cf1bd))
* set links ([e68841f](https://github.com/kiva/kv-ui-elements/commit/e68841ffb675f1034cea89a2a56b0699383681b1))
* use site search composable in search bar and suggestions ([996c28d](https://github.com/kiva/kv-ui-elements/commit/996c28d54285ebd8c820e9912c2862b1d9158226))
* utils for site search ([fee4db4](https://github.com/kiva/kv-ui-elements/commit/fee4db4e88625cbd4e25edbaddbcb8341324ecb1))





# [6.39.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.38.1...@kiva/kv-components@6.39.0) (2025-07-31)


### Features

* add animation support to round variant of kvcheckbox ([5ac8df6](https://github.com/kiva/kv-ui-elements/commit/5ac8df6899325288395012ba9209b0a9fea91626))
* add format support to round variant of kvcheckbox ([0ce501a](https://github.com/kiva/kv-ui-elements/commit/0ce501aa78dba300a98940c8f00df2f6a06f1d87))





## [6.38.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.38.0...@kiva/kv-components@6.38.1) (2025-07-29)

**Note:** Version bump only for package @kiva/kv-components





# [6.38.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.37.0...@kiva/kv-components@6.38.0) (2025-07-29)


### Features

* add round variant to kvcheckbox ([8b52251](https://github.com/kiva/kv-ui-elements/commit/8b52251a529988c7582cf6f5affce351f8a836d2))
* add round variant to kvcheckbox ([3821276](https://github.com/kiva/kv-ui-elements/commit/3821276f4e38c95aaed7a67f5dfc361acd4629e1))
* add round variant to kvcheckbox ([88769ca](https://github.com/kiva/kv-ui-elements/commit/88769ca4d5d9f7c02a51b4c9fbd6391dd8a99d5c))
* add round variant to kvcheckbox ([05e36b6](https://github.com/kiva/kv-ui-elements/commit/05e36b6e6aab0d0b3b6f1e32065247c3c00ae742))





# [6.37.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.36.0...@kiva/kv-components@6.37.0) (2025-07-29)


### Features

* [MP-1847] - changing GoToLink icon for ([3a91f38](https://github.com/kiva/kv-ui-elements/commit/3a91f38f83be0e98e96d84bdebf86dde99382ae5))





# [6.36.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.35.1...@kiva/kv-components@6.36.0) (2025-07-28)


### Features

* ensure icon in kvselect in centered ([d258fbf](https://github.com/kiva/kv-ui-elements/commit/d258fbfee642f14078da2d86e4339c6b187902a1))





## [6.35.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.35.0...@kiva/kv-components@6.35.1) (2025-07-28)

**Note:** Version bump only for package @kiva/kv-components





# [6.35.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.34.0...@kiva/kv-components@6.35.0) (2025-07-28)


### Bug Fixes

* export KvCardFrame component ([e3f7660](https://github.com/kiva/kv-ui-elements/commit/e3f76604f11ec379261f547045841203b8d2c865))


### Features

* new content card frame component, theme enabled, configurable borders, backgrounds and shadows ([0d33b8b](https://github.com/kiva/kv-ui-elements/commit/0d33b8b41156046d0091185c58b0cfabc8a28b12))





# [6.34.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.33.0...@kiva/kv-components@6.34.0) (2025-07-18)


### Features

* include new receipt component in build ([1a920b3](https://github.com/kiva/kv-ui-elements/commit/1a920b345285555be42734e3cfb80cb2e7eaafeb))





# [6.33.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.32.0...@kiva/kv-components@6.33.0) (2025-07-17)


### Features

* add receipt to our component library ([cfddff8](https://github.com/kiva/kv-ui-elements/commit/cfddff8461a619d8e9e13d826cd663a7a010fd24))





# [6.32.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.31.1...@kiva/kv-components@6.32.0) (2025-07-11)


### Bug Fixes

* reverting component height ([b2196da](https://github.com/kiva/kv-ui-elements/commit/b2196dacbdc8e12d9bf199b7e7fb0f13703e6fe0))


### Features

* update KvSelect height and weight ([ed79266](https://github.com/kiva/kv-ui-elements/commit/ed79266b229a4a84589762d5e3b1d6ee957b7609))





## [6.31.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.31.0...@kiva/kv-components@6.31.1) (2025-07-10)


### Bug Fixes

* ensure we import and map default theme on KvToolTip, add new themes ([4cfd822](https://github.com/kiva/kv-ui-elements/commit/4cfd82254dcb3af5314a3856259c4e0da2d80ee9))





# [6.31.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.30.1...@kiva/kv-components@6.31.0) (2025-07-09)


### Bug Fixes

* setting max-width ([be7361a](https://github.com/kiva/kv-ui-elements/commit/be7361a7770bebae0019f9e455068edcc0ad7558))


### Features

* set max-width to kv-select ([dabde9b](https://github.com/kiva/kv-ui-elements/commit/dabde9bbc6ba47319521bb4d5b107a20d5c70828))
* setting radius to select ([1a12c4d](https://github.com/kiva/kv-ui-elements/commit/1a12c4d58fa1803c32046f10c945992efd2ea163))





## [6.30.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.30.0...@kiva/kv-components@6.30.1) (2025-07-09)


### Bug Fixes

* checkout now cta to full width ([d99b911](https://github.com/kiva/kv-ui-elements/commit/d99b911bcfa8befa2dbab227a598ddfcdb39dc13))





# [6.30.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.29.2...@kiva/kv-components@6.30.0) (2025-07-09)


### Features

* deleted storybook story related to showPill ([aaa89b4](https://github.com/kiva/kv-ui-elements/commit/aaa89b42ba8dc9f8baa5ebf94bc4db101d45cdc1))
* kv-cart-pill removal ([565b36a](https://github.com/kiva/kv-ui-elements/commit/565b36a1d6fe09e723c2f0fd0550992cfa19024c))
* showPill code removal ([50eb56b](https://github.com/kiva/kv-ui-elements/commit/50eb56b40f12520abdf74c765e7624be041653fc))





## [6.29.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.29.1...@kiva/kv-components@6.29.2) (2025-06-25)


### Bug Fixes

* apply OnUnmounted ref fixes ([876ae92](https://github.com/kiva/kv-ui-elements/commit/876ae922357aecd6926fe874f9bf5a977362435e))





## [6.29.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.29.0...@kiva/kv-components@6.29.1) (2025-06-24)


### Bug Fixes

* loan card computed properties bug ([#594](https://github.com/kiva/kv-ui-elements/issues/594)) ([cd1ca4e](https://github.com/kiva/kv-ui-elements/commit/cd1ca4ecf957aab5691bb800a8b746f9b885c503))





# [6.29.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.28.1...@kiva/kv-components@6.29.0) (2025-06-24)


### Features

* custom href added to loan card ([#593](https://github.com/kiva/kv-ui-elements/issues/593)) ([f8a3500](https://github.com/kiva/kv-ui-elements/commit/f8a3500e27408a517c71f39c7e76eb26c9e75ac9))





## [6.28.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.28.0...@kiva/kv-components@6.28.1) (2025-06-23)


### Bug Fixes

* resolve issue with side sheet initial rendering in ui app ([fa5df2c](https://github.com/kiva/kv-ui-elements/commit/fa5df2cdeff9590f2fdc3fe710a7e492c0e4e71a))





# [6.28.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.27.2...@kiva/kv-components@6.28.0) (2025-06-20)


### Features

* remove huge amount flags ([#591](https://github.com/kiva/kv-ui-elements/issues/591)) ([b2d1765](https://github.com/kiva/kv-ui-elements/commit/b2d1765f9b98ae136570683a27b4d922df6d82f5))





## [6.27.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.27.1...@kiva/kv-components@6.27.2) (2025-06-20)


### Bug Fixes

* remove problematic tailwind class from sidesheet ([463dc9e](https://github.com/kiva/kv-ui-elements/commit/463dc9ea38272bd001bb4860109e3143cd49ff42))





## [6.27.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.27.0...@kiva/kv-components@6.27.1) (2025-06-18)


### Bug Fixes

* modal position fix ([#589](https://github.com/kiva/kv-ui-elements/issues/589)) ([01eef0f](https://github.com/kiva/kv-ui-elements/commit/01eef0fe4b7ca7621626859b1131a5f59381e258))





# [6.27.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.26.0...@kiva/kv-components@6.27.0) (2025-06-12)


### Bug Fixes

* sidesheet content height in mobile ([b1e4b6f](https://github.com/kiva/kv-ui-elements/commit/b1e4b6f196da00a183f9b975a087e68369002e30))


### Features

* add flag to hide headline background on mobile ([8b58dc2](https://github.com/kiva/kv-ui-elements/commit/8b58dc26fc10d8ce25a941eba42d6aa7af985ecc))
* hide headline bg flag for bp sidesheet ([af7c5da](https://github.com/kiva/kv-ui-elements/commit/af7c5da48e8b13e09586cda74caefcff01df64d5))





# [6.26.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.25.0...@kiva/kv-components@6.26.0) (2025-06-12)


### Bug Fixes

* always show heading on mobile, tweak some conditional classes to be more shorthand ([8cfe4b7](https://github.com/kiva/kv-ui-elements/commit/8cfe4b7cfbf9f4f06de6dcfb4cb4628866b5799a))
* external link flag to detect if should be router-link or a tag ([7c30152](https://github.com/kiva/kv-ui-elements/commit/7c301525b4fc5e5dfa10731f9ccbfa8f089c4cd2))
* sidesheet does not work with SSR ([6875b76](https://github.com/kiva/kv-ui-elements/commit/6875b76b55f84f9748f1b7019637d254c80752a8))
* tweaks for QA notes on SecondaryNav ([6d4d3e6](https://github.com/kiva/kv-ui-elements/commit/6d4d3e61d853f37c57c3986e0ac848cbeb1f4540))
* update storybook to be a bit simpler ([82db14c](https://github.com/kiva/kv-ui-elements/commit/82db14c078b3297e835d74a8c7a7ffecc896da06))
* use kv-page-container for inner nav ([e3c8de5](https://github.com/kiva/kv-ui-elements/commit/e3c8de5697e8599bbd426902e3bd08d73e561704))


### Features

* new secondary nav component ([7a2fc06](https://github.com/kiva/kv-ui-elements/commit/7a2fc064b65ca833594b14f72b198717c5e7fc42))
* subnavLinkClicked emitter ([4e5b4bb](https://github.com/kiva/kv-ui-elements/commit/4e5b4bb8ca8760e92592258e3e3f74790e71e9b3))





# [6.25.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.24.1...@kiva/kv-components@6.25.0) (2025-06-11)


### Features

* headline to h3 and content padding ([bec54b5](https://github.com/kiva/kv-ui-elements/commit/bec54b5352e0b76ec74aea94bd351de5b278f03e))





## [6.24.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.24.0...@kiva/kv-components@6.24.1) (2025-06-11)


### Bug Fixes

* prevent word wrap in lend CTA button ([fe6487c](https://github.com/kiva/kv-ui-elements/commit/fe6487ca66e9e1fbe1dc19d1e7e63361f0127310))





# [6.24.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.23.0...@kiva/kv-components@6.24.0) (2025-06-09)


### Features

* adding space between headline and top controls in sidesheet ([61b55f8](https://github.com/kiva/kv-ui-elements/commit/61b55f8a26fb12ce4fe12ebe873916e2479786a8))





# [6.23.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.22.2...@kiva/kv-components@6.23.0) (2025-06-05)


### Bug Fixes

* use new style for selected dropdown as well ([436acaf](https://github.com/kiva/kv-ui-elements/commit/436acaf45dadae663198e36a86582ef390add211))


### Features

* improve lend cta selected state for side sheet version and improve long borrower name support ([30f597d](https://github.com/kiva/kv-ui-elements/commit/30f597daaddf8a6462a9cbf7bf88a7b917946b84))





## [6.22.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.22.1...@kiva/kv-components@6.22.2) (2025-06-05)


### Bug Fixes

* smoothed out animation for side sheet usage and got design review ([6db3af6](https://github.com/kiva/kv-ui-elements/commit/6db3af650b87609f307ba688557e1de0ca71f3a6))





## [6.22.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.22.0...@kiva/kv-components@6.22.1) (2025-06-03)

**Note:** Version bump only for package @kiva/kv-components





# [6.22.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.21.1...@kiva/kv-components@6.22.0) (2025-06-03)


### Features

* add id and ref to sidesheet content ([abcdbac](https://github.com/kiva/kv-ui-elements/commit/abcdbac5494ae212c5c4bd8ffede191cd0c61e22))





## [6.21.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.21.0...@kiva/kv-components@6.21.1) (2025-06-03)


### Bug Fixes

* fix incorrect import ([3bb3598](https://github.com/kiva/kv-ui-elements/commit/3bb3598308ad0468d1109967144f54d8703c9a23))
* fix Storybook animation bug ([edcdeb1](https://github.com/kiva/kv-ui-elements/commit/edcdeb1e6971d9a2dcd6e348a6ecf4d3f0a9f7d7))
* fix the KvSideSheet closing animation ([9033afc](https://github.com/kiva/kv-ui-elements/commit/9033afc99b1b88542b3cb7fcff9c830ae292e7f1))





# [6.21.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.20.0...@kiva/kv-components@6.21.0) (2025-05-29)


### Features

* switching milestones to achievements in atb and pill components ([db315f7](https://github.com/kiva/kv-ui-elements/commit/db315f77ee1543c0c220f310c23f9d5aad8637e0))





# [6.20.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.19.4...@kiva/kv-components@6.20.0) (2025-05-29)


### Bug Fixes

* make widthDimensions CSS rules ([a1580b6](https://github.com/kiva/kv-ui-elements/commit/a1580b635046e177c97ff8be204f03f318906546))
* slight change to default widthDimensions ([81d5167](https://github.com/kiva/kv-ui-elements/commit/81d5167b89b5515a3bc2819642002e3fb51a6e29))
* style fix ([2d55cad](https://github.com/kiva/kv-ui-elements/commit/2d55caddbe356a1436531998f0c10ac99ed12df7))


### Features

* add widthDimensions prop to KvSideSheet ([fee3309](https://github.com/kiva/kv-ui-elements/commit/fee330993e671b513c4c277b44bbe794e80848e3))





## [6.19.4](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.19.3...@kiva/kv-components@6.19.4) (2025-05-23)


### Bug Fixes

* atb modal styling fix ([#571](https://github.com/kiva/kv-ui-elements/issues/571)) ([3ca2c0f](https://github.com/kiva/kv-ui-elements/commit/3ca2c0f7023f0af7a51c519554163f19968fb29f))





## [6.19.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.19.2...@kiva/kv-components@6.19.3) (2025-05-23)


### Bug Fixes

* type passed to redirect handler ([#570](https://github.com/kiva/kv-ui-elements/issues/570)) ([0f19279](https://github.com/kiva/kv-ui-elements/commit/0f19279b2d8e022596ece72ef39eb52ea1bb9455))





## [6.19.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.19.1...@kiva/kv-components@6.19.2) (2025-05-23)


### Bug Fixes

* kvatbmodal component added to index file ([#569](https://github.com/kiva/kv-ui-elements/issues/569)) ([303c5e9](https://github.com/kiva/kv-ui-elements/commit/303c5e942c108836e56cc96a12dc0946a4e77fdf))





## [6.19.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.19.0...@kiva/kv-components@6.19.1) (2025-05-23)


### Bug Fixes

* add window height resizing functionality ([b8ff7f4](https://github.com/kiva/kv-ui-elements/commit/b8ff7f46244148d4e30b24dd9fcb0fa735902db4))
* create timeouts to ensure proper height measurements ([fab1c46](https://github.com/kiva/kv-ui-elements/commit/fab1c46246429af395075919b2427bbfd2aafadc))
* fix component import ([305993c](https://github.com/kiva/kv-ui-elements/commit/305993c967b169eb26eac97c482a2d07d0016b2b))
* improve SideSheet component for BadgeJourneys ([5bf661e](https://github.com/kiva/kv-ui-elements/commit/5bf661e6a1dbeb41470c6832712c89bb43ffdad0))
* make content height dynamic, not flex-1 ([a7f26af](https://github.com/kiva/kv-ui-elements/commit/a7f26afe6ae9d05b4ebb435a68ccd0fe78e02c10))
* make controls template padding dynamic ([b4e8203](https://github.com/kiva/kv-ui-elements/commit/b4e8203d3ae5b4f6541169e575b0ec3bb15f0823))
* remove extraneous code ([fa1393e](https://github.com/kiva/kv-ui-elements/commit/fa1393e1d60c73573a7b00940fa387db3cda41c4))





# [6.19.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.18.0...@kiva/kv-components@6.19.0) (2025-05-23)


### Features

*  atb modal component ([#568](https://github.com/kiva/kv-ui-elements/issues/568)) ([5ebd409](https://github.com/kiva/kv-ui-elements/commit/5ebd4094d071acfaf20fe16852125564eb27aa39))





# [6.18.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.17.0...@kiva/kv-components@6.18.0) (2025-05-12)


### Features

* make sidesheet back button optional ([c71a6df](https://github.com/kiva/kv-ui-elements/commit/c71a6dfef721f1b83de45e7fa0c619b436700596))





# [6.17.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.16.1...@kiva/kv-components@6.17.0) (2025-05-07)


### Features

* use stranded lend button when max amount is 25 ([c53b13d](https://github.com/kiva/kv-ui-elements/commit/c53b13d813b09e782fdf77f31757557a74b8b8e7))





## [6.16.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.16.0...@kiva/kv-components@6.16.1) (2025-05-06)


### Bug Fixes

* set full height if controls are present ([926804b](https://github.com/kiva/kv-ui-elements/commit/926804b14eb2c263994b792947fc63cbfb0e6a2c))
* style tweaks and hide h2 if not present ([3a92e74](https://github.com/kiva/kv-ui-elements/commit/3a92e74b8d14c47bb4ba3fdfd3a72ca4225f9607))





# [6.16.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.15.0...@kiva/kv-components@6.16.0) (2025-04-30)


### Features

* use Alea to get consistent 'random' value for loan callouts and user avatars ([35a4d60](https://github.com/kiva/kv-ui-elements/commit/35a4d60de027a79415ef08d817baca34b69bd118))





# [6.15.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.14.2...@kiva/kv-components@6.15.0) (2025-04-29)


### Features

* add a prop to limit amounts shown in presets ([bafcf37](https://github.com/kiva/kv-ui-elements/commit/bafcf372c098869420ccae55b5c15d633ace295b))





## [6.14.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.14.1...@kiva/kv-components@6.14.2) (2025-04-25)

**Note:** Version bump only for package @kiva/kv-components





## [6.14.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.14.0...@kiva/kv-components@6.14.1) (2025-04-25)

**Note:** Version bump only for package @kiva/kv-components





# [6.14.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.13.2...@kiva/kv-components@6.14.0) (2025-04-25)


### Bug Fixes

* isFunded check in KvIntroductionLoanCard ([feeb4d9](https://github.com/kiva/kv-ui-elements/commit/feeb4d92a2ecf2edd3684cd66613a67a2d1267df))
* use unreservedAmount prop ([e4d614a](https://github.com/kiva/kv-ui-elements/commit/e4d614a5b983bd97262473df9ff8f143c9edaa58))


### Features

* colocate fragments in loan card components and calculate unreservedAmount ([20a930b](https://github.com/kiva/kv-ui-elements/commit/20a930b7dce73bf08cd58a5a13406d59bbc7e51e))
* require graphql-tag as peer dependency for kv-components ([ccc3792](https://github.com/kiva/kv-ui-elements/commit/ccc37924300604a150001c7574781f11ec5b7e11))





## [6.13.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.13.1...@kiva/kv-components@6.13.2) (2025-04-25)


### Bug Fixes

* add new files to package.json ([7d4178f](https://github.com/kiva/kv-ui-elements/commit/7d4178fa367921343e7a76decd712b8df6d2f4bf))





## [6.13.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.13.0...@kiva/kv-components@6.13.1) (2025-04-25)

**Note:** Version bump only for package @kiva/kv-components





# [6.13.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.12.0...@kiva/kv-components@6.13.0) (2025-04-25)


### Features

* ignore kvuseravatar in chromatic ([99b3da9](https://github.com/kiva/kv-ui-elements/commit/99b3da98ab646b844805690618a0144ffddd29a4))





# [6.12.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.11.1...@kiva/kv-components@6.12.0) (2025-04-24)


### Features

* change secondary text logic on lendcta ([f1f03c1](https://github.com/kiva/kv-ui-elements/commit/f1f03c192507109f7511ab76dfe5493438de7d5b))





## [6.11.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.11.0...@kiva/kv-components@6.11.1) (2025-04-24)

**Note:** Version bump only for package @kiva/kv-components





# [6.11.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.10.0...@kiva/kv-components@6.11.0) (2025-04-23)


### Features

* add secondary button text with show presets ([f8dfb68](https://github.com/kiva/kv-ui-elements/commit/f8dfb68ffedad8ccd3f8f32f8b0d77e46b1a7b57))





# [6.10.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.9.4...@kiva/kv-components@6.10.0) (2025-04-23)


### Features

* center buttons on vertical carousel ([37b150f](https://github.com/kiva/kv-ui-elements/commit/37b150fa4cd0608f40e8c5a135ce2044760cd3b0))





## [6.9.4](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.9.3...@kiva/kv-components@6.9.4) (2025-04-17)


### Bug Fixes

* resolve when avatar image disappears ([d81d234](https://github.com/kiva/kv-ui-elements/commit/d81d234dd21367b6ae49efeddecd849d8e190044))





## [6.9.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.9.2...@kiva/kv-components@6.9.3) (2025-04-15)

**Note:** Version bump only for package @kiva/kv-components





## [6.9.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.9.1...@kiva/kv-components@6.9.2) (2025-04-09)


### Bug Fixes

* error was being thrown safely on prod ([3cf5970](https://github.com/kiva/kv-ui-elements/commit/3cf5970a8866a955f45478f0296945627ab2ef44))





## [6.9.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.9.0...@kiva/kv-components@6.9.1) (2025-04-08)

**Note:** Version bump only for package @kiva/kv-components





# [6.9.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.8.1...@kiva/kv-components@6.9.0) (2025-04-03)


### Features

* add multiple avatars to story ([132f21e](https://github.com/kiva/kv-ui-elements/commit/132f21eeb329768af336c3c31ebd2c50696d173a))
* add story for multiple avatars ([400faa2](https://github.com/kiva/kv-ui-elements/commit/400faa24cad8f564ea063eec5d0e05884a0f184b))
* set timeout for image to load ([326a732](https://github.com/kiva/kv-ui-elements/commit/326a732eaf3cf4967dcfce6a62d1154e6b7dc378))
* wait for image to complete to avoid infinite loading in user avatar ([df672b4](https://github.com/kiva/kv-ui-elements/commit/df672b43e0748e2d9ac1df24fb96efa231d9a374))





## [6.8.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.8.0...@kiva/kv-components@6.8.1) (2025-04-03)


### Bug Fixes

* isLoading value ([0288c87](https://github.com/kiva/kv-ui-elements/commit/0288c87d490021b50fb0230626765a2bd5ba5efe))
* remove important from placeholder size classes ([4b2934f](https://github.com/kiva/kv-ui-elements/commit/4b2934f0d04257d2bbf1be7210015741a1c7ff7e))
* using styles over classes for placeholder ([81fbfcc](https://github.com/kiva/kv-ui-elements/commit/81fbfcc0dd7c0f1d2554ccefcdbda790e99a7d92))





# [6.8.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.7.0...@kiva/kv-components@6.8.0) (2025-04-02)


### Features

* set isLoading to false when image is already loaded ([9b15d67](https://github.com/kiva/kv-ui-elements/commit/9b15d67251ed64dd952a6dd7ce7dab7363d9067a))





# [6.7.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.6.0...@kiva/kv-components@6.7.0) (2025-03-26)


### Features

* loader added to kv user avatar component ([#534](https://github.com/kiva/kv-ui-elements/issues/534)) ([6857a80](https://github.com/kiva/kv-ui-elements/commit/6857a80568d6f3486bf86a2f12faa999932c2197))





# [6.6.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.5.0...@kiva/kv-components@6.6.0) (2025-03-17)


### Features

* add custom message prop for pill ([ba5ab3d](https://github.com/kiva/kv-ui-elements/commit/ba5ab3de1124cd9adf5a90891b18d29e3d91cb02))





# [6.5.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.4.2...@kiva/kv-components@6.5.0) (2025-03-13)


### Features

* cart modal category option added ([#532](https://github.com/kiva/kv-ui-elements/issues/532)) ([6cd72ff](https://github.com/kiva/kv-ui-elements/commit/6cd72ffa436cba897607fb55273d097db0e78d2a))





## [6.4.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.4.1...@kiva/kv-components@6.4.2) (2025-03-12)


### Bug Fixes

* kv cart modal slot fix ([#531](https://github.com/kiva/kv-ui-elements/issues/531)) ([96d4606](https://github.com/kiva/kv-ui-elements/commit/96d4606b2dc7373908177739bda8c4b4c5299d1e))





## [6.4.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.4.0...@kiva/kv-components@6.4.1) (2025-03-11)

**Note:** Version bump only for package @kiva/kv-components





# [6.4.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.3.1...@kiva/kv-components@6.4.0) (2025-03-06)


### Features

* pill added to lend cta ([#529](https://github.com/kiva/kv-ui-elements/issues/529)) ([a343c42](https://github.com/kiva/kv-ui-elements/commit/a343c4203f8af0b68a517120d1ca7a24998d3777))





## [6.3.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.3.0...@kiva/kv-components@6.3.1) (2025-03-06)


### Bug Fixes

* adding KvCartPill to components index ([2a0061e](https://github.com/kiva/kv-ui-elements/commit/2a0061ed6dd2b5584ebdffb5242fcb36e13bdf2c))





# [6.3.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.2.0...@kiva/kv-components@6.3.0) (2025-03-05)


### Features

* cart pill component for atb ([647ed47](https://github.com/kiva/kv-ui-elements/commit/647ed4774936a27852ba74915b13f980de869ca3))





# [6.2.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.1.0...@kiva/kv-components@6.2.0) (2025-03-03)


### Features

* atb modal kept open if mouse is over ([#526](https://github.com/kiva/kv-ui-elements/issues/526)) ([61992ff](https://github.com/kiva/kv-ui-elements/commit/61992ff5d00032e57007278f5d86b087b86439c4))





# [6.1.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@6.0.0...@kiva/kv-components@6.1.0) (2025-03-03)


### Bug Fixes

* remove required prop for query ([7f19b13](https://github.com/kiva/kv-ui-elements/commit/7f19b13a3f31bd32acef91717b4964fb10c8cfef))


### Features

* avatar bubble component for new atb experiment ([c7a2bf6](https://github.com/kiva/kv-ui-elements/commit/c7a2bf6b2ab8b61ea7e93d56566a5add46a50f32))
* prevent showing bubble if there is no target ([877d3ad](https://github.com/kiva/kv-ui-elements/commit/877d3ad63cc22d2188ec58edfb0879e453c64a2f))





# [6.0.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@5.3.7...@kiva/kv-components@6.0.0) (2025-02-21)


* feat(kv-shop)!: compile kv-shop with vite ([98b3a78](https://github.com/kiva/kv-ui-elements/commit/98b3a78cc49232d1499974c2f7c58f301b1e87f0))


### BREAKING CHANGES

* kv-shop exports compiled vue components instead of SFCs





## [5.3.7](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@5.3.6...@kiva/kv-components@5.3.7) (2025-02-19)


### Bug Fixes

* adjust kv cart modal design ([db4c7f4](https://github.com/kiva/kv-ui-elements/commit/db4c7f4cd42570d13631dea1a026c953378f09e4))





## [5.3.6](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@5.3.5...@kiva/kv-components@5.3.6) (2025-02-03)


### Bug Fixes

* resolve issue where preset options dropdown needed to be reset ([a8bd1ef](https://github.com/kiva/kv-ui-elements/commit/a8bd1ef572cbe3ad949589d71d5a25b3580c1e98))





## [5.3.5](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@5.3.4...@kiva/kv-components@5.3.5) (2025-02-03)


### Bug Fixes

* change border color on button for lend cta ([b342fff](https://github.com/kiva/kv-ui-elements/commit/b342ffff9cc9ef9d531fffc6d8de3acde518151e))





## [5.3.4](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@5.3.3...@kiva/kv-components@5.3.4) (2025-01-27)


### Bug Fixes

* gap from fieldset when adding state in showPresetAmount variant ([886a84d](https://github.com/kiva/kv-ui-elements/commit/886a84db693ce224445f81d6a1e2bcb742f38480))





## [5.3.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@5.3.2...@kiva/kv-components@5.3.3) (2025-01-27)


### Bug Fixes

* hide preset amount when adding loan to basket ([09ede60](https://github.com/kiva/kv-ui-elements/commit/09ede608c3fac175b91f28d26d6a2b308b79734a))





## [5.3.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@5.3.1...@kiva/kv-components@5.3.2) (2025-01-23)


### Bug Fixes

* single preset button option should be shown as lend amount button ([ac90ea9](https://github.com/kiva/kv-ui-elements/commit/ac90ea94eb2a26e400fc6feeaf96c61e15364779))





## [5.3.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@5.3.0...@kiva/kv-components@5.3.1) (2025-01-22)


### Bug Fixes

* sidesheet width on mobile after adding loan to basket ([4bb15a0](https://github.com/kiva/kv-ui-elements/commit/4bb15a0ed69761dc391fe07c812497e9dea368fd))





# [5.3.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@5.2.2...@kiva/kv-components@5.3.0) (2025-01-22)


### Features

* esc key event added to side sheet component ([#511](https://github.com/kiva/kv-ui-elements/issues/511)) ([66f901f](https://github.com/kiva/kv-ui-elements/commit/66f901f75280262ec715da337b1a5a0efd7843fe))





## [5.2.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@5.2.1...@kiva/kv-components@5.2.2) (2025-01-22)


### Bug Fixes

* **kv-components:** include import line for component css files ([46cf73a](https://github.com/kiva/kv-ui-elements/commit/46cf73a57f02963ae3acbf05755fffa08b709019))





## [5.2.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@5.2.0...@kiva/kv-components@5.2.1) (2025-01-21)


### Bug Fixes

* **kv-components:** bundled dependencies in vendor instead of node_modules avoids resolution issues ([4965e84](https://github.com/kiva/kv-ui-elements/commit/4965e843ad1f07b56f29b02117c2887009318f53))





# [5.2.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@5.1.2...@kiva/kv-components@5.2.0) (2025-01-21)


### Features

* **kv-tokens:** export configs from main ([f405e6d](https://github.com/kiva/kv-ui-elements/commit/f405e6def81d504d7558068f8aba52b1388b073b))





## [5.1.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@5.1.1...@kiva/kv-components@5.1.2) (2025-01-21)


### Bug Fixes

* **kv-components:** use .mjs extension for bundled node_modules ([d76b633](https://github.com/kiva/kv-ui-elements/commit/d76b633da9a24f7b1bce8ec1a8ffb40f9c944498))





## [5.1.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@5.1.0...@kiva/kv-components@5.1.1) (2025-01-17)


### Bug Fixes

* **KvIntroductionLoanCard:** provide country name to KvFlag ([6a80105](https://github.com/kiva/kv-ui-elements/commit/6a80105c9df68a4e3edb896c8ac2497ca955779f))





# [5.1.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@5.0.0...@kiva/kv-components@5.1.0) (2025-01-17)


### Bug Fixes

* **kv-components:** match kv-tokens peer version with current dev dependency major ([ec92f1b](https://github.com/kiva/kv-ui-elements/commit/ec92f1b0ca7e1cb2aee438cc7e10fd80455502cd))
* remove method from return ([e547cc7](https://github.com/kiva/kv-ui-elements/commit/e547cc7d6442db02b109f7cd311b49a99792384e))


### Features

* avoid page scroll when sidesheet open and fix sheet shown in left sometimes ([9602d5b](https://github.com/kiva/kv-ui-elements/commit/9602d5bbb7c53abfd80398a28eb77839a06ec4aa))





# [5.0.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@4.8.6...@kiva/kv-components@5.0.0) (2025-01-17)


### Bug Fixes

* **KvCountdownTimer:** show all zeros when time expires ([8b844ff](https://github.com/kiva/kv-ui-elements/commit/8b844ff96998844a3c114201405c6febca37d2be))


* perf(KvCountdownTimer)!: use date-fns instead of moment and expect deadline Date prop ([d7052a4](https://github.com/kiva/kv-ui-elements/commit/d7052a4f9abef3d88783d5ef8c86d9e5f6dad88e))
* refactor(kv-tokens)!: convert all modules to esm ([f09dd82](https://github.com/kiva/kv-ui-elements/commit/f09dd821e4060570767abb490db45836ecd9b80a))
* refactor(kv-components)!: distribute components as es modules ([3f8bd88](https://github.com/kiva/kv-ui-elements/commit/3f8bd88e98adf9da97f46d4d3b41be714d11e0a6))
* perf(KvFlag)!: country name for KvFlag must be provided as a prop SHUA-137 ([0cdc6bf](https://github.com/kiva/kv-ui-elements/commit/0cdc6bfb890b91dbb7bd3c1ebcb68cc86ecba8c5))
* refactor(kv-components)!: use vite to transpile vue components, update storybook ([f3ec580](https://github.com/kiva/kv-ui-elements/commit/f3ec5803a9746d44966817c4721abfb23896fd87))


### Performance Improvements

* **KvFlag:** import flag icon svg urls to use as background image SHUA-129 ([7c3a794](https://github.com/kiva/kv-ui-elements/commit/7c3a7947a894fd255f44064c545a70b03cf17254))


### BREAKING CHANGES

* msLeft Number prop replaced with deadline Date prop
* modules now use import/export and .js extensions
* components exported at vue/* to match source path
* country name must be provided to KvFlag
* dist folder structure is different, so existing import statements will not work





## [4.8.6](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@4.8.5...@kiva/kv-components@4.8.6) (2025-01-16)


### Bug Fixes

* adjust modal position and remove scroll when visible ([af17714](https://github.com/kiva/kv-ui-elements/commit/af17714803c84ca2b4f3d9f1a9f7730303429530))





## [4.8.5](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@4.8.4...@kiva/kv-components@4.8.5) (2025-01-10)


### Bug Fixes

* click events after removal of clickAllowed ([58388bb](https://github.com/kiva/kv-ui-elements/commit/58388bbfbf1b16a803a6f6e8a327babebb6393e2))





## [4.8.4](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@4.8.3...@kiva/kv-components@4.8.4) (2025-01-10)


### Bug Fixes

* carousel autoplay issues ([ae1e7eb](https://github.com/kiva/kv-ui-elements/commit/ae1e7ebf82181b3c9fed505d3ad5afce41dcabba))





## [4.8.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@4.8.2...@kiva/kv-components@4.8.3) (2025-01-10)


### Bug Fixes

* padding in preset buttons ([7ea60b0](https://github.com/kiva/kv-ui-elements/commit/7ea60b09571ae913f5ca7b363bf3d0ff027f04d6))





## [4.8.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@4.8.1...@kiva/kv-components@4.8.2) (2025-01-09)


### Bug Fixes

* set full width for continue to basket state ([cacc5a2](https://github.com/kiva/kv-ui-elements/commit/cacc5a2ec697dd37466fc6b1b4ff4fef40edf5ef))





## [4.8.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@4.8.0...@kiva/kv-components@4.8.1) (2025-01-09)

**Note:** Version bump only for package @kiva/kv-components





# [4.8.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@4.7.1...@kiva/kv-components@4.8.0) (2025-01-09)


### Features

* make sure autoplay stops on carousel interactions ([a973201](https://github.com/kiva/kv-ui-elements/commit/a97320125351e82ccdd946abd91507a2f619b1d3))





## [4.7.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@4.7.0...@kiva/kv-components@4.7.1) (2025-01-09)


### Bug Fixes

* preset button was adding to basket because of type ([994a42f](https://github.com/kiva/kv-ui-elements/commit/994a42f36b2065c57994d1903c48ad9a14ad5c69))





# [4.7.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@4.6.0...@kiva/kv-components@4.7.0) (2025-01-09)


### Features

* add autoplay button if autoplay plugin is enabled ([8bebbe5](https://github.com/kiva/kv-ui-elements/commit/8bebbe5945dd4e34c922f9f511a4145564ae005a))





# [4.6.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@4.5.1...@kiva/kv-components@4.6.0) (2025-01-08)


### Bug Fixes

* case when unreserved amount is greater first dropdown option ([af7bac1](https://github.com/kiva/kv-ui-elements/commit/af7bac155c18e902c7fe9594d75bd74ee966564a))
* edge cases for unreserved amount and select dropdown by default ([273e13f](https://github.com/kiva/kv-ui-elements/commit/273e13fa377277bf49684ea3032da56f0e5537ff))
* new cases for unreserved amount ([2de1302](https://github.com/kiva/kv-ui-elements/commit/2de1302de738d0f2489f56721efc30d1f6ab448a))
* remove lendCtaSelectedOption modification ([10c98d0](https://github.com/kiva/kv-ui-elements/commit/10c98d04bc72eba67591e6d7dbaf6347f5026bdf))
* resolve comments and add new cases in stories ([310c152](https://github.com/kiva/kv-ui-elements/commit/310c15273d21e2610f7e7bd67c46e5c6d5bf32d5))


### Features

* add enableHugeAmount option to preset buttons ([c07a4b1](https://github.com/kiva/kv-ui-elements/commit/c07a4b1f74532b57f15a7aef9337659462c57b2e))
* new lendCta variant with preset options as buttons plus dropdown ([1e464a7](https://github.com/kiva/kv-ui-elements/commit/1e464a7518e77657deb59cadb90f78f1dc0db287))
* new line for dropdown when huge amount flag is enabled ([c66a90e](https://github.com/kiva/kv-ui-elements/commit/c66a90e6ac0e7b4bdc15ca28f681a97eab43dfca))





## [4.5.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@4.5.0...@kiva/kv-components@4.5.1) (2025-01-04)

**Note:** Version bump only for package @kiva/kv-components





# [4.5.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@4.4.0...@kiva/kv-components@4.5.0) (2025-01-03)


### Features

* add autoplay and fade plugin options for carousels ([b85b0c2](https://github.com/kiva/kv-ui-elements/commit/b85b0c20fbff52663c823a984db53fbb41baf0a4))





# [4.4.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@4.3.3...@kiva/kv-components@4.4.0) (2025-01-02)


### Features

* add browser API mocks to test embla carousel ([e4e8bd1](https://github.com/kiva/kv-ui-elements/commit/e4e8bd11812faf75ed12d7258cdaf7f024f86c45))
* update embla to latest version ([6d37f77](https://github.com/kiva/kv-ui-elements/commit/6d37f7734072e595e6648592050b55027be537a5))





## [4.3.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@4.3.2...@kiva/kv-components@4.3.3) (2024-12-20)


### Bug Fixes

* side sheet shouldn't be full height ([d7e680f](https://github.com/kiva/kv-ui-elements/commit/d7e680fe172a1776bd5cc97d99cbb32d988b7c55))





## [4.3.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@4.3.1...@kiva/kv-components@4.3.2) (2024-12-16)


### Bug Fixes

* overflow fallback ([1cd05db](https://github.com/kiva/kv-ui-elements/commit/1cd05db96ccc96424e7c364fb49156acedb6d101))
* smooth out side sheet animation ([d65df74](https://github.com/kiva/kv-ui-elements/commit/d65df74824ef936fdcfc3f07870107a0676d194e))





## [4.3.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@4.3.0...@kiva/kv-components@4.3.1) (2024-12-11)


### Bug Fixes

* resolve issue when screen size is changed and opening behavior changes ([c51d62e](https://github.com/kiva/kv-ui-elements/commit/c51d62e6b2f4efaee4ddcb6efa33cfe9523fd69f))





# [4.3.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@4.2.2...@kiva/kv-components@4.3.0) (2024-12-10)


### Features

* scroll user to original position when sheet is opening in mobile ([0c783fa](https://github.com/kiva/kv-ui-elements/commit/0c783fae5f61cb2958fb6220baa284c4287bedac))





## [4.2.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@4.2.1...@kiva/kv-components@4.2.2) (2024-12-09)


### Bug Fixes

* opacity-low left a white space when closing sidesheet ([5ac062e](https://github.com/kiva/kv-ui-elements/commit/5ac062ed16bf4ddba1fc8a64ada95084b271546f))





## [4.2.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@4.2.0...@kiva/kv-components@4.2.1) (2024-12-09)


### Bug Fixes

* height modal and not necessary fixed position ([c922c7d](https://github.com/kiva/kv-ui-elements/commit/c922c7d9e3ff44ec498ed037bad6fc7c95240444))





# [4.2.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@4.1.0...@kiva/kv-components@4.2.0) (2024-12-09)


### Bug Fixes

* fix transition and remove unused code ([664b00e](https://github.com/kiva/kv-ui-elements/commit/664b00e1b27a6afd51ce9cc85069b9dd4f5dc5d7))
* remove bg ([43c8a0d](https://github.com/kiva/kv-ui-elements/commit/43c8a0db295be4dd86b414a41145ebcc6e2606f8))
* set default values for element ([c21852d](https://github.com/kiva/kv-ui-elements/commit/c21852d54e2c94f99098b5a234233addfe0a1ed2))


### Features

* sidesheet expand effect ([4fbe553](https://github.com/kiva/kv-ui-elements/commit/4fbe5533d437af0d77b6d79b2f8ec8880f51c3dd))





# [4.1.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@4.0.1...@kiva/kv-components@4.1.0) (2024-12-02)


### Features

* adjust sidesheet for mobile and tablet views ([21a6e6c](https://github.com/kiva/kv-ui-elements/commit/21a6e6ce193be8e200a292de4625175105b2cd1a))





## [4.0.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@4.0.0...@kiva/kv-components@4.0.1) (2024-12-02)


### Bug Fixes

* removing margin and fixed position ([7c6c8ea](https://github.com/kiva/kv-ui-elements/commit/7c6c8eac840359cbf22b9d36f01115db96305f55))





# [4.0.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.109.4...@kiva/kv-components@4.0.0) (2024-11-27)


### Bug Fixes

* additional story refactoring for vue3 storybook 8 ([af16665](https://github.com/kiva/kv-ui-elements/commit/af166656eed90ef1a49b23fb9fe5a08308c92cc4))
* fix more stories for vue3 storybook 8 ([aeb19aa](https://github.com/kiva/kv-ui-elements/commit/aeb19aaec30263ab6524f739492f31441cd663ba))
* fix more stories for vue3 storybook 8 ([6fa71f7](https://github.com/kiva/kv-ui-elements/commit/6fa71f7c752c2fcfdfdb322264fe1fe846299747))
* fix primitives story for vue3 storybook 8 ([0c271cf](https://github.com/kiva/kv-ui-elements/commit/0c271cf18c1342179932df74229da3f708644bee))
* jest imports from [@vueuse](https://github.com/vueuse) ([3465f4e](https://github.com/kiva/kv-ui-elements/commit/3465f4e98f5f86db9c85bac4d1a80d6d18b6eff9))
* lock storybook package versions ([4e39c6d](https://github.com/kiva/kv-ui-elements/commit/4e39c6dbb9970f8037e0aa099533545e97ab49cd))
* remove comment ([a3109d0](https://github.com/kiva/kv-ui-elements/commit/a3109d01569171ff004543ef5e7dbee197645674))
* remove vue 2/3 testing, add test config to kv-components ([cb0ddf2](https://github.com/kiva/kv-ui-elements/commit/cb0ddf23c06de65eea6da48cb24c3b2775ab2216))
* tests ([e67a114](https://github.com/kiva/kv-ui-elements/commit/e67a114bb821f99a491ca8c5b1a3d93b90464dae))


### Features

* update to vue3 and storybook 8 ([51f609d](https://github.com/kiva/kv-ui-elements/commit/51f609df48b3643b90653e44b36d7c9028f08825))


### BREAKING CHANGES

* Vue3 is now required





## [3.109.4](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.109.3...@kiva/kv-components@3.109.4) (2024-11-26)


### Bug Fixes

* preventDefault from undefined with showViewLoan and showLoanDetails enabled ([6354931](https://github.com/kiva/kv-ui-elements/commit/63549310e55d3d058b29e4020c0ffaa174bbe1f0))
* remove native on click ([e10bf2b](https://github.com/kiva/kv-ui-elements/commit/e10bf2b50060110bca6681deff215d49394dceda))





## [3.109.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.109.2...@kiva/kv-components@3.109.3) (2024-11-25)

**Note:** Version bump only for package @kiva/kv-components





## [3.109.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.109.1...@kiva/kv-components@3.109.2) (2024-11-20)

**Note:** Version bump only for package @kiva/kv-components





## [3.109.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.109.0...@kiva/kv-components@3.109.1) (2024-11-19)


### Bug Fixes

* add tailwind config to kv-components exports ([74388fc](https://github.com/kiva/kv-ui-elements/commit/74388fc3f65f679e6cb7e16ea51d6f71b6d96412))





# [3.109.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.108.0...@kiva/kv-components@3.109.0) (2024-11-18)


### Bug Fixes

* storybook static directory should include all of /dist ([64a5b22](https://github.com/kiva/kv-ui-elements/commit/64a5b22d0f5e3bb9b02c8693dcdb59291b43061e))


### Features

* serve static assets from kvui directory MP-544 ([840f6de](https://github.com/kiva/kv-ui-elements/commit/840f6de89f213143218d28e82a7ef0be1de319b6))





# [3.108.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.107.2...@kiva/kv-components@3.108.0) (2024-11-15)


### Bug Fixes

* change error text color for KvTextInput ([5dbf6ad](https://github.com/kiva/kv-ui-elements/commit/5dbf6ad72b436d7aabf868cf8bac0ed7f1439412))
* color updates for default theme and KvButton ([e27b124](https://github.com/kiva/kv-ui-elements/commit/e27b1243e797322c95cf52f505787e6c9b5eceac))
* handle underline styles for buttons and clickable loan cards ([ef4d19f](https://github.com/kiva/kv-ui-elements/commit/ef4d19f420b00201baf5e0c0dcd39194a2be970c))
* more wip for ecosystem themes ([3fd83ab](https://github.com/kiva/kv-ui-elements/commit/3fd83ab38e0e9463c375a94fc84012fa38948cdb))
* more wip work for new ecosystem themes ([90447d4](https://github.com/kiva/kv-ui-elements/commit/90447d471178b410637d8ba50d535180c8b03718))
* secondary button styling ([4602efa](https://github.com/kiva/kv-ui-elements/commit/4602efac93b4755015b847090d1eb1e24d70c1d9))
* switch vertical tab active color to action instead of action-highlight ([cc1e2d5](https://github.com/kiva/kv-ui-elements/commit/cc1e2d5b12f7981ffb7a8e724036c65bc0f60d6d))


### Features

* update styling for KvTextInput error state ([361cdba](https://github.com/kiva/kv-ui-elements/commit/361cdbacd2f56e1f38e330efe7425b4922c89443))
* use external file for heading underline svg MP-544 MP-545 ([fad8f16](https://github.com/kiva/kv-ui-elements/commit/fad8f16b5555916624c26a24828ff39dcbc5edbf))
* use green-3 and stone-3 for bg-secondary in dark themes ([d13d63e](https://github.com/kiva/kv-ui-elements/commit/d13d63e08346b936a1bb2bc61c4d3fc6c5a4e8d0))
* wip initial pass at ecosystem themes ([680dbbc](https://github.com/kiva/kv-ui-elements/commit/680dbbc7aab575f9db43d7b10bdcba9003fd589e))





## [3.107.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.107.1...@kiva/kv-components@3.107.2) (2024-11-05)


### Bug Fixes

* add specifier for vue imports ([f62b249](https://github.com/kiva/kv-ui-elements/commit/f62b249e67deaf46a398c5ad59251990befe788d))





## [3.107.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.107.0...@kiva/kv-components@3.107.1) (2024-11-05)


### Bug Fixes

* add components to dist folder as well ([0b20c69](https://github.com/kiva/kv-ui-elements/commit/0b20c69ed132a9a46da040523c559a6d900143d1))





# [3.107.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.106.0...@kiva/kv-components@3.107.0) (2024-11-05)


### Features

* compile kv-component utils ([7b41391](https://github.com/kiva/kv-ui-elements/commit/7b413912c3bcf2659e729072fe1705427a78c1ba))





# [3.106.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.105.3...@kiva/kv-components@3.106.0) (2024-11-01)


### Features

* basic vertical carousel ([6a40563](https://github.com/kiva/kv-ui-elements/commit/6a405637ee4186d3cb5a7dbf71f87d8a04d46d86))





## [3.105.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.105.2...@kiva/kv-components@3.105.3) (2024-10-28)

**Note:** Version bump only for package @kiva/kv-components





## [3.105.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.105.1...@kiva/kv-components@3.105.2) (2024-10-25)


### Bug Fixes

* swap updated map file for global loans map ([444d164](https://github.com/kiva/kv-ui-elements/commit/444d164ab313a864fb70ed754a41948e96d95315))
* update data accessors to match new file letter casing ([a3dcf62](https://github.com/kiva/kv-ui-elements/commit/a3dcf62a3b696a1bde2046cc363671219aa41e6f))





## [3.105.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.105.0...@kiva/kv-components@3.105.1) (2024-10-24)


### Bug Fixes

* add more complete kv-carousel render to test, update to stable source for placeholder images ([03ee704](https://github.com/kiva/kv-ui-elements/commit/03ee704cbbb8345d4129a6b4cc63c8adfc9d83a9))





# [3.105.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.104.0...@kiva/kv-components@3.105.0) (2024-10-15)


### Features

* vote card read more ([b7d2c74](https://github.com/kiva/kv-ui-elements/commit/b7d2c74dfa6c464e68b3a6a52298a4a37b11d184))





# [3.104.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.103.0...@kiva/kv-components@3.104.0) (2024-10-09)


### Features

* vertically align contents inside voting cards 2 to bottom ([828e24d](https://github.com/kiva/kv-ui-elements/commit/828e24dd12b40674fd2f5079b2741ebf0e014c03))





# [3.103.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.102.5...@kiva/kv-components@3.103.0) (2024-10-08)


### Features

* new voting card ([#466](https://github.com/kiva/kv-ui-elements/issues/466)) ([039bca4](https://github.com/kiva/kv-ui-elements/commit/039bca45ac0b8fa2f902f4623af04da5d55a0a88))





## [3.102.5](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.102.4...@kiva/kv-components@3.102.5) (2024-10-08)


### Bug Fixes

* activeSlice value isn't comparable because it's a Proxy, use toRaw ([046a4c1](https://github.com/kiva/kv-ui-elements/commit/046a4c1518a751f8a6d47ff970a0fd6583655f59))





## [3.102.4](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.102.3...@kiva/kv-components@3.102.4) (2024-10-04)


### Bug Fixes

* pie chart not animating in vue 3 ([c15efec](https://github.com/kiva/kv-ui-elements/commit/c15efec2cebf39fcafaa0eb533bd6ef8ffab2d6d))





## [3.102.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.102.2...@kiva/kv-components@3.102.3) (2024-09-30)


### Bug Fixes

* width classes added to pie chart ([#463](https://github.com/kiva/kv-ui-elements/issues/463)) ([77715e2](https://github.com/kiva/kv-ui-elements/commit/77715e2d27a19bbb9c3cdd5239a037ae04ee5715))





## [3.102.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.102.1...@kiva/kv-components@3.102.2) (2024-09-26)


### Bug Fixes

* change how model value is handled for select component ([5626a8f](https://github.com/kiva/kv-ui-elements/commit/5626a8fcb2a464d72abbda06968dec56496e4204))





## [3.102.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.102.0...@kiva/kv-components@3.102.1) (2024-09-23)


### Bug Fixes

* pie chart not visible with only one value MP-791 ([6419cd8](https://github.com/kiva/kv-ui-elements/commit/6419cd8d0f348d32dddadd4170f87a6442bf1b29))





# [3.102.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.101.3...@kiva/kv-components@3.102.0) (2024-09-16)


### Features

* add underline styles for h3 ([#460](https://github.com/kiva/kv-ui-elements/issues/460)) ([b9ea2c4](https://github.com/kiva/kv-ui-elements/commit/b9ea2c4c56108064ad016f4c3c3376f2208f08dd))





## [3.101.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.101.2...@kiva/kv-components@3.101.3) (2024-09-13)


### Bug Fixes

* remove computed from next tick ([cb7a1fb](https://github.com/kiva/kv-ui-elements/commit/cb7a1fb358799ab99a1a05707bc2fc0b9aa915b7))





## [3.101.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.101.1...@kiva/kv-components@3.101.2) (2024-09-06)


### Bug Fixes

* handle slide scale instead of img ([8758b9e](https://github.com/kiva/kv-ui-elements/commit/8758b9efccd3d40bf7420a2f808901c6f396d260))
* overflow ([59529e4](https://github.com/kiva/kv-ui-elements/commit/59529e4e8f8dbbf3b2a2ba413868911702bc95e9))





## [3.101.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.101.0...@kiva/kv-components@3.101.1) (2024-09-05)


### Bug Fixes

* force primary color ([652370b](https://github.com/kiva/kv-ui-elements/commit/652370b54998b4fd9597f434c66c783448d0419e))
* new loan card name wasn't clickable ([27603b7](https://github.com/kiva/kv-ui-elements/commit/27603b78f1c8d271baa23e93dfde2acc8e7e5727))





# [3.101.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.100.0...@kiva/kv-components@3.101.0) (2024-09-05)


### Features

* move treemap into repo ([e75bd3c](https://github.com/kiva/kv-ui-elements/commit/e75bd3c83d7ede41dc07196392bafdf941b0bcc3))





# [3.100.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.99.0...@kiva/kv-components@3.100.0) (2024-09-04)


### Features

* use kiva fork of treemap repo ([50cc510](https://github.com/kiva/kv-ui-elements/commit/50cc510199e37763512dfb3c8e244153835ab16d))





# [3.99.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.98.1...@kiva/kv-components@3.99.0) (2024-09-04)


### Features

* desktop side sheet component added to library ([#454](https://github.com/kiva/kv-ui-elements/issues/454)) ([5f140cb](https://github.com/kiva/kv-ui-elements/commit/5f140cbf2a05833e2c08bdf9dadb7ce9cbdb7194))





## [3.98.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.98.0...@kiva/kv-components@3.98.1) (2024-09-04)


### Bug Fixes

* resolve chart issue with vue 3 ([93716c6](https://github.com/kiva/kv-ui-elements/commit/93716c61bebff132a6bb6bd8138a3ffab2336c0b))





# [3.98.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.97.0...@kiva/kv-components@3.98.0) (2024-09-03)


### Features

* add bookmark functionality to new loan card ([10ddade](https://github.com/kiva/kv-ui-elements/commit/10ddade2555770635b14272534791f6b6931d6d0))





# [3.97.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.96.0...@kiva/kv-components@3.97.0) (2024-08-29)


### Features

* emitted event added to pie chart component ([#452](https://github.com/kiva/kv-ui-elements/issues/452)) ([1d95611](https://github.com/kiva/kv-ui-elements/commit/1d95611471b25b3c2f5fb9e26431295bd1942a1f))





# [3.96.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.95.1...@kiva/kv-components@3.96.0) (2024-08-28)


### Features

* async countries border data import ([#451](https://github.com/kiva/kv-ui-elements/issues/451)) ([aa27135](https://github.com/kiva/kv-ui-elements/commit/aa2713540d61ad2cd780a0fdfbfd8249030d9cbd))





## [3.95.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.95.0...@kiva/kv-components@3.95.1) (2024-08-28)


### Bug Fixes

* props usage removed reactivity ([6795042](https://github.com/kiva/kv-ui-elements/commit/6795042bfcc11e133781e2591eaee4035cfd7d63))





# [3.95.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.94.0...@kiva/kv-components@3.95.0) (2024-08-28)


### Bug Fixes

* add story for long borrower name ([da58fc9](https://github.com/kiva/kv-ui-elements/commit/da58fc9a078626577370eea41a0d9336edc2c74e))
* allow new card to be pull width ([59488dc](https://github.com/kiva/kv-ui-elements/commit/59488dc7e9550d8df38f73fe0b859844e65c6576))
* fully funded card ([17a9156](https://github.com/kiva/kv-ui-elements/commit/17a9156fc8003f2a19feb030cfe1e1ba369222dc))
* general new loan card styling tweaks ([dac3bb1](https://github.com/kiva/kv-ui-elements/commit/dac3bb14d62c97b04e7979e0c512edc4c90634c8))
* hide country for US loans ([5353e0f](https://github.com/kiva/kv-ui-elements/commit/5353e0f9b1678d013becf7775bb4c408cf72887a))
* one more small styling change ([042da40](https://github.com/kiva/kv-ui-elements/commit/042da402e089805260f4e465c8d237baf6bfe642))


### Features

* add emojis and colors to loan tags ([8d002c2](https://github.com/kiva/kv-ui-elements/commit/8d002c25a243c305fae5113305a604c2f34746e4))





# [3.94.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.93.0...@kiva/kv-components@3.94.0) (2024-08-23)


### Features

* charts added to library ([#447](https://github.com/kiva/kv-ui-elements/issues/447)) ([575bd80](https://github.com/kiva/kv-ui-elements/commit/575bd80fb1700a38732a2b8cafbeb5cc5374764b))





# [3.93.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.92.1...@kiva/kv-components@3.93.0) (2024-08-22)


### Features

* carousel circle effect ([c982be4](https://github.com/kiva/kv-ui-elements/commit/c982be4d088f18cb53b5d97b3071fa7dac72e1c6))





## [3.92.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.92.0...@kiva/kv-components@3.92.1) (2024-08-19)


### Bug Fixes

* vite has some complications around importing json ([7a5ced1](https://github.com/kiva/kv-ui-elements/commit/7a5ced1172e319a83b12d674529c81977c95a993))





# [3.92.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.91.1...@kiva/kv-components@3.92.0) (2024-08-16)


### Features

* dotted version for carousel controls ([#444](https://github.com/kiva/kv-ui-elements/issues/444)) ([a719d75](https://github.com/kiva/kv-ui-elements/commit/a719d75ce7622695668fe1467bf1129d916800c2))





## [3.91.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.91.0...@kiva/kv-components@3.91.1) (2024-08-14)


### Bug Fixes

* resolve issue found in ui vue migration ([0050e5e](https://github.com/kiva/kv-ui-elements/commit/0050e5e93cf189f18fda0c468a577546f5f1911c))





# [3.91.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.90.5...@kiva/kv-components@3.91.0) (2024-08-14)


### Features

* country layers added to leaflet map ([#441](https://github.com/kiva/kv-ui-elements/issues/441)) ([97c35b5](https://github.com/kiva/kv-ui-elements/commit/97c35b5cd79f8d53a48b879694d988acfb4823e6))





## [3.90.5](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.90.4...@kiva/kv-components@3.90.5) (2024-08-06)


### Bug Fixes

* use TW class inline to make overwriting simpler ([3af651f](https://github.com/kiva/kv-ui-elements/commit/3af651fbf961d06a631381029daa43f02550546c))





## [3.90.4](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.90.3...@kiva/kv-components@3.90.4) (2024-08-06)


### Bug Fixes

* use an image size we already have a retina size for ([109a303](https://github.com/kiva/kv-ui-elements/commit/109a303ba7ce6bd6830109e4323a9e25636556bf))





## [3.90.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.90.2...@kiva/kv-components@3.90.3) (2024-08-06)


### Bug Fixes

* adjust new card styling ([875d701](https://github.com/kiva/kv-ui-elements/commit/875d701b951660444f8d00d7ae1596958df604f3))





## [3.90.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.90.1...@kiva/kv-components@3.90.2) (2024-08-05)


### Bug Fixes

* relative node_modules path broke when imported into another app ([3bb1c5d](https://github.com/kiva/kv-ui-elements/commit/3bb1c5d5db0701c41691bcd588421e6b4dd0ea19))





## [3.90.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.90.0...@kiva/kv-components@3.90.1) (2024-08-02)

**Note:** Version bump only for package @kiva/kv-components





# [3.90.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.89.1...@kiva/kv-components@3.90.0) (2024-07-26)


### Bug Fixes

* revert new loan card ([84ee01e](https://github.com/kiva/kv-ui-elements/commit/84ee01e11c23d45f41389c003acaba843b50d103))


### Features

* remove clickable tags exp ([afba87d](https://github.com/kiva/kv-ui-elements/commit/afba87dd24a9123607ccf6d8a83e81efab2a2a34))





## [3.89.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.89.0...@kiva/kv-components@3.89.1) (2024-07-24)


### Bug Fixes

* remove top margin from cart modal ([d789a53](https://github.com/kiva/kv-ui-elements/commit/d789a53b4ce498d1945d7160613af4d5e11431ab))





# [3.89.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.88.1...@kiva/kv-components@3.89.0) (2024-07-23)


### Bug Fixes

* flag-icons import ([0b58418](https://github.com/kiva/kv-ui-elements/commit/0b58418bf5aeb58cb8eefc265c228092e6e761e4))
* indent, use kvFlag and some refactor ([4fbc11a](https://github.com/kiva/kv-ui-elements/commit/4fbc11a03fa2970e7d8c3cc340aa144b9da35c24))
* line-clamp in loan use ([f4cf963](https://github.com/kiva/kv-ui-elements/commit/f4cf963a567adc6ba23349cbe0da1bc2d15f24d1))
* loan name clickable ([18f63ca](https://github.com/kiva/kv-ui-elements/commit/18f63ca60d08f92e034cae73e3eb326b2a61f735))
* loan use template ([4efe849](https://github.com/kiva/kv-ui-elements/commit/4efe8493ec1dce8a3edb73d17e47c1fb8e308be2))
* remove class props for deep ([c6923dc](https://github.com/kiva/kv-ui-elements/commit/c6923dc3ff576be80efc69f72a9cf6d35974aef7))
* remove kvflag from loan card ([1e2bba8](https://github.com/kiva/kv-ui-elements/commit/1e2bba8c726e7702aa52efb765651a138feb2220))


### Features

* introduction card component and story ([7115800](https://github.com/kiva/kv-ui-elements/commit/71158004b0b9a18e9bf1ba8375c213c1c3ca251f))
* kvflag component and new loan card for homepage ([8cf61bb](https://github.com/kiva/kv-ui-elements/commit/8cf61bb62820c6f9ce280d0f864f5b58d5279694))
* toggle flag border ([2a782a1](https://github.com/kiva/kv-ui-elements/commit/2a782a1c9bec4ca9d0d3f60a7e9a6d44a310956c))
* using flag emoticons ([159497b](https://github.com/kiva/kv-ui-elements/commit/159497b08bb1efb5989544df068624cca3c6929b))





## [3.88.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.88.0...@kiva/kv-components@3.88.1) (2024-07-22)


### Bug Fixes

* remove margin in cart modal ([3f40f9a](https://github.com/kiva/kv-ui-elements/commit/3f40f9a1239af24eb7c00359c2825d2d55edefa9))





# [3.88.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.87.4...@kiva/kv-components@3.88.0) (2024-07-19)


### Bug Fixes

* adjust underline after review ([979d47c](https://github.com/kiva/kv-ui-elements/commit/979d47c6a96c22f4e49b799e57dba412e39e15db))


### Features

* brush-stroke underline for headings mvp MP-348 ([6211527](https://github.com/kiva/kv-ui-elements/commit/621152741bd537da6026984569a7775767a2c3ec))





## [3.87.4](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.87.3...@kiva/kv-components@3.87.4) (2024-07-17)


### Bug Fixes

* increase quality setting for small contentful images ([9a75d76](https://github.com/kiva/kv-ui-elements/commit/9a75d76837240dc7f07cd04097575677bd7cbdac))





## [3.87.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.87.2...@kiva/kv-components@3.87.3) (2024-07-16)


### Bug Fixes

* set full width for cart modal in tablet ([e04445a](https://github.com/kiva/kv-ui-elements/commit/e04445a14cace3c6b3988a95dd2114b44bf7828b))





## [3.87.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.87.1...@kiva/kv-components@3.87.2) (2024-07-16)

**Note:** Version bump only for package @kiva/kv-components





## [3.87.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.87.0...@kiva/kv-components@3.87.1) (2024-07-12)


### Bug Fixes

* handle long names in cart modal ([a4a5afa](https://github.com/kiva/kv-ui-elements/commit/a4a5afa60b65fcdd18016af4e156eb0421c86fe3))





# [3.87.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.86.2...@kiva/kv-components@3.87.0) (2024-07-12)


### Features

* dark stone theme provider added ([#426](https://github.com/kiva/kv-ui-elements/issues/426)) ([8a8ea0a](https://github.com/kiva/kv-ui-elements/commit/8a8ea0aa548c9e0e125fa2219a53a2870cca289c))





## [3.86.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.86.1...@kiva/kv-components@3.86.2) (2024-07-12)

**Note:** Version bump only for package @kiva/kv-components





## [3.86.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.86.0...@kiva/kv-components@3.86.1) (2024-07-12)


### Bug Fixes

* modal size on desktop ([79edbb9](https://github.com/kiva/kv-ui-elements/commit/79edbb9127259d9883b93ba1b564b3627452d90a))
* modal title ([69074c6](https://github.com/kiva/kv-ui-elements/commit/69074c67647fb873ea4eef703f5f8263544d1638))





# [3.86.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.85.0...@kiva/kv-components@3.86.0) (2024-07-12)


### Bug Fixes

* adding tracking info ([a666513](https://github.com/kiva/kv-ui-elements/commit/a6665130d65f350d119c5e5669b6dd45a7e0ddef))
* lint ([a197c47](https://github.com/kiva/kv-ui-elements/commit/a197c47ea65c2927d4b60bb9f2533622dbae6f85))
* missing js docs ([1370e81](https://github.com/kiva/kv-ui-elements/commit/1370e81d8baecf49e6b40b84cad527ea68779763))
* remove unnecesary important in loan img ([014b48d](https://github.com/kiva/kv-ui-elements/commit/014b48d5506782fdcb6aa102ec3fc4d68f042012))


### Features

* add secondary btn ([579c61a](https://github.com/kiva/kv-ui-elements/commit/579c61ad6d7c0b25cb0a6f7e01fb2da5c58c9c86))
* create new cart modal component ([3719d2b](https://github.com/kiva/kv-ui-elements/commit/3719d2b3aaa47cb2f9b856c577aa1230619aab11))





# [3.85.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.84.0...@kiva/kv-components@3.85.0) (2024-07-10)


### Features

* carousel controls arrow added for aside version ([#423](https://github.com/kiva/kv-ui-elements/issues/423)) ([f1f8fb3](https://github.com/kiva/kv-ui-elements/commit/f1f8fb337b4a8ffb343e8341ce7a8d932805df1f))





# [3.84.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.83.2...@kiva/kv-components@3.84.0) (2024-07-08)


### Features

* aside controls variant added to carousel component ([#420](https://github.com/kiva/kv-ui-elements/issues/420)) ([d50ca9e](https://github.com/kiva/kv-ui-elements/commit/d50ca9eaa9023d437a5b9e385b95bfdecee7b122))





## [3.83.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.83.1...@kiva/kv-components@3.83.2) (2024-06-25)


### Bug Fixes

* max dimensions on kvContentfulImg ([#419](https://github.com/kiva/kv-ui-elements/issues/419)) ([4496979](https://github.com/kiva/kv-ui-elements/commit/4496979544fa7d9d941111bff234aae58aa5ca16))





## [3.83.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.83.0...@kiva/kv-components@3.83.1) (2024-06-07)


### Bug Fixes

* event is firing twice ([#417](https://github.com/kiva/kv-ui-elements/issues/417)) ([3e30e40](https://github.com/kiva/kv-ui-elements/commit/3e30e4023c6d6af324fc99e805b0f10d36934c2e))





# [3.83.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.82.1...@kiva/kv-components@3.83.0) (2024-06-07)


### Features

* implement custom loan details on loan card ([#416](https://github.com/kiva/kv-ui-elements/issues/416)) ([13a7a39](https://github.com/kiva/kv-ui-elements/commit/13a7a39ed9d073aa3ee7319b69c6b46f26d45d5b))





## [3.82.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.82.0...@kiva/kv-components@3.82.1) (2024-06-03)


### Bug Fixes

* loan card button secondary action and destination ([#411](https://github.com/kiva/kv-ui-elements/issues/411)) ([9cf20db](https://github.com/kiva/kv-ui-elements/commit/9cf20dbd9865a685ae19a5a4d553bb3345c680b8))





# [3.82.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.81.0...@kiva/kv-components@3.82.0) (2024-06-03)


### Features

* remove amount lent activity feed ([#410](https://github.com/kiva/kv-ui-elements/issues/410)) ([82a2216](https://github.com/kiva/kv-ui-elements/commit/82a22166f70085ad5a725e3e58f2fb3dd7eafa78))





# [3.81.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.80.1...@kiva/kv-components@3.81.0) (2024-05-29)


### Bug Fixes

* removed unneeded code ([15c19bb](https://github.com/kiva/kv-ui-elements/commit/15c19bb1cdd6ac65910117d077dff38d48fa9cb3))


### Features

* secondary handler remove default behavior if set ([bbf91f8](https://github.com/kiva/kv-ui-elements/commit/bbf91f8b77a79f8204b0050ef1c466573f63228a))





## [3.80.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.80.0...@kiva/kv-components@3.80.1) (2024-05-22)


### Bug Fixes

* left some unsaved changes out of the branch, adding those in ([a8498a3](https://github.com/kiva/kv-ui-elements/commit/a8498a3012abe50cf6254e3734a47df31314c473))





# [3.80.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.79.0...@kiva/kv-components@3.80.0) (2024-05-22)


### Bug Fixes

* add showContributors condition ([2fe0be3](https://github.com/kiva/kv-ui-elements/commit/2fe0be34ea8cb18fdce37a0eba979d089a850426))


### Features

* show contributors section of loan card ([e65e80f](https://github.com/kiva/kv-ui-elements/commit/e65e80f1862c93e45b9f3a05a3a01d3585b4fc7c))





# [3.79.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.78.2...@kiva/kv-components@3.79.0) (2024-05-21)


### Bug Fixes

* change cta2ButtonText to loanInBasketButtonText ([f052b7b](https://github.com/kiva/kv-ui-elements/commit/f052b7bdee874b5e2447b437cd90c7751ced4bce))
* remove button story edits ([9dfbf98](https://github.com/kiva/kv-ui-elements/commit/9dfbf981adc2f90384650044f35e6179dbbd851f))
* remove showSecondaryButton in favor of condition to make code more readable ([8223460](https://github.com/kiva/kv-ui-elements/commit/8223460d56480267b2d4f16e99c7becc1e72b40e))
* set consistent default values for buttons ([041fef2](https://github.com/kiva/kv-ui-elements/commit/041fef2cc21b11b4b4d11f342c8fb7a7dcee222f))


### Features

* loan card primary and secondary button customization options ([77ecb2e](https://github.com/kiva/kv-ui-elements/commit/77ecb2e90c1df81201029ba8906f217cf9f9d6b2))





## [3.78.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.78.1...@kiva/kv-components@3.78.2) (2024-05-20)

**Note:** Version bump only for package @kiva/kv-components





## [3.78.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.78.0...@kiva/kv-components@3.78.1) (2024-05-15)


### Bug Fixes

* change activity copy in team pick loan ([190ea03](https://github.com/kiva/kv-ui-elements/commit/190ea03a93befc0fb60587a61b408c06a9f84be0))





# [3.78.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.77.0...@kiva/kv-components@3.78.0) (2024-05-15)


### Features

* start index added to kvcarousel component ([#398](https://github.com/kiva/kv-ui-elements/issues/398)) ([0477155](https://github.com/kiva/kv-ui-elements/commit/0477155d8bb02cce80777dbb3d2296b63d146ea8))





# [3.77.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.76.0...@kiva/kv-components@3.77.0) (2024-05-08)


### Features

* clickable activity tag ([#397](https://github.com/kiva/kv-ui-elements/issues/397)) ([0b808a5](https://github.com/kiva/kv-ui-elements/commit/0b808a591d1b6f43c12df8f6f54920cd77f59125))





# [3.76.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.75.2...@kiva/kv-components@3.76.0) (2024-05-02)


### Bug Fixes

* removal of unnecessary classes, v-if, and added slot tag ([dd46624](https://github.com/kiva/kv-ui-elements/commit/dd46624bde0f99f3889d11cc0c68bf5b0eeab182))
* style classes -> Tailwinds classes ([920e364](https://github.com/kiva/kv-ui-elements/commit/920e364749d47a8e73770a3c43eb5c3e1a36df1d))
* tags within storybook component, also font for title ([23e6c0d](https://github.com/kiva/kv-ui-elements/commit/23e6c0d7c50d6c097960553356740aa10c9ffff2))


### Features

* newly created global chip component [CIT-1429] ([82cb335](https://github.com/kiva/kv-ui-elements/commit/82cb33538cadbc0c817501df70e36a37c21d5dd8))
* scss section removal, additional stories, new props + setup ([c7000d7](https://github.com/kiva/kv-ui-elements/commit/c7000d7f4d0e4446b40de0840805079aa863473a))





## [3.75.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.75.1...@kiva/kv-components@3.75.2) (2024-04-29)


### Bug Fixes

* category callouts were missing props to make them clickable ([6d7918b](https://github.com/kiva/kv-ui-elements/commit/6d7918bda0ddb8bff1dc38fa985409503c2d2616))





## [3.75.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.75.0...@kiva/kv-components@3.75.1) (2024-04-26)


### Bug Fixes

* activity removed from clickable tags ([#394](https://github.com/kiva/kv-ui-elements/issues/394)) ([e59496a](https://github.com/kiva/kv-ui-elements/commit/e59496afceb9b7964078452c57dd401cb6b2dab4))





# [3.75.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.74.1...@kiva/kv-components@3.75.0) (2024-04-26)


### Features

* clickable tags added to classic loan card ([#393](https://github.com/kiva/kv-ui-elements/issues/393)) ([3677c91](https://github.com/kiva/kv-ui-elements/commit/3677c915855d68b125f71a0660d4fbb4628b8133))





## [3.74.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.74.0...@kiva/kv-components@3.74.1) (2024-04-25)

**Note:** Version bump only for package @kiva/kv-components





# [3.74.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.73.2...@kiva/kv-components@3.74.0) (2024-04-23)


### Bug Fixes

* adjusted comment ([e73e6a8](https://github.com/kiva/kv-ui-elements/commit/e73e6a842486ec5ce951a3130348cb1e3428288d))
* extracted CTA dropdown methods and added unit tests ([4ef99de](https://github.com/kiva/kv-ui-elements/commit/4ef99deb24399fcb619c41d20370ad79812f1b00))
* removed duplicate test ([838d6d4](https://github.com/kiva/kv-ui-elements/commit/838d6d48c85bbfd7759fd5266498219817e00cd7))


### Features

* $1000 lend CTA options ([4f89352](https://github.com/kiva/kv-ui-elements/commit/4f8935237acb9c1f1655b77cc604fe68b21ab077))





## [3.73.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.73.1...@kiva/kv-components@3.73.2) (2024-04-23)


### Bug Fixes

* add type stories for italics and font weight for serif ([1133777](https://github.com/kiva/kv-ui-elements/commit/11337774fcb8b12ecc93bd11943b11f66bdc53e6))
* testing baseline configs for including new dovetail webfont ([7079590](https://github.com/kiva/kv-ui-elements/commit/7079590f9b3ab0bbfb91b81ab6aa98fd4ae2f113))





## [3.73.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.73.0...@kiva/kv-components@3.73.1) (2024-04-17)


### Bug Fixes

* upgrade to latest vue-demi to support vue 2.7 ([c86ea1f](https://github.com/kiva/kv-ui-elements/commit/c86ea1f4d5a2cb56e813d0f1c2ee59e7cfcf0ca4))





# [3.73.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.72.0...@kiva/kv-components@3.73.0) (2024-04-10)


### Features

* change voting card icon ([#388](https://github.com/kiva/kv-ui-elements/issues/388)) ([c7a5061](https://github.com/kiva/kv-ui-elements/commit/c7a50617a591e9734f996ad87e80d06b2292dc4d))





# [3.72.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.71.2...@kiva/kv-components@3.72.0) (2024-04-05)


### Features

* huge lent amount added to lend cta dropdown ([#387](https://github.com/kiva/kv-ui-elements/issues/387)) ([0874f5c](https://github.com/kiva/kv-ui-elements/commit/0874f5c888bb388fc9e9f7dc857f2c92b919c78b))





## [3.71.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.71.1...@kiva/kv-components@3.71.2) (2024-04-03)


### Bug Fixes

* icon needs to be pulled to the right on voting card for small titles ([571d372](https://github.com/kiva/kv-ui-elements/commit/571d372d54c20c08203ef901cd8d55023e12477a))
* pinned title to top of area below image and vote + progress to bottom of card ([24f1609](https://github.com/kiva/kv-ui-elements/commit/24f1609f4ccc6211c02baef3530dba6bfe593271))





## [3.71.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.71.0...@kiva/kv-components@3.71.1) (2024-04-03)


### Bug Fixes

* fixed bug related to icon resizing in voting card ([7dc424c](https://github.com/kiva/kv-ui-elements/commit/7dc424ce0aa83f627240c50bb9925033f50c2cc2))





# [3.71.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.70.0...@kiva/kv-components@3.71.0) (2024-04-02)


### Features

* pass error message to loan card and activity feed ([#384](https://github.com/kiva/kv-ui-elements/issues/384)) ([90f3ebc](https://github.com/kiva/kv-ui-elements/commit/90f3ebc45594ffbcacabe19d454b184573208257))





# [3.70.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.69.1...@kiva/kv-components@3.70.0) (2024-04-01)


### Features

* activity feed added to loan card ([#383](https://github.com/kiva/kv-ui-elements/issues/383)) ([a7a3bfc](https://github.com/kiva/kv-ui-elements/commit/a7a3bfc600742b700eb221fa77d9951d793ca86b))





## [3.69.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.69.0...@kiva/kv-components@3.69.1) (2024-03-27)


### Bug Fixes

* remove reaction wasn't working ([4fa9d53](https://github.com/kiva/kv-ui-elements/commit/4fa9d5358da329c3bc4fcd49e4d0d6ef4d3d830c))





# [3.69.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.68.1...@kiva/kv-components@3.69.0) (2024-03-27)


### Features

* adjust comment components for chat product ([077a8ff](https://github.com/kiva/kv-ui-elements/commit/077a8fffbd8df44ee91ce2cf97b7f460fdbc1b49))





## [3.68.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.68.0...@kiva/kv-components@3.68.1) (2024-03-26)


### Bug Fixes

* activity feed item bg should be white ([b60cc9d](https://github.com/kiva/kv-ui-elements/commit/b60cc9d25cd397836d805461f7795092e3a1d187))





# [3.68.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.67.0...@kiva/kv-components@3.68.0) (2024-03-25)


### Features

* info icon added to voting card ([cd7eb7e](https://github.com/kiva/kv-ui-elements/commit/cd7eb7ed944637871c45bd0644b20f18b2184401))





# [3.67.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.66.2...@kiva/kv-components@3.67.0) (2024-03-25)


### Features

* inline activity feed amount lent updated ([#376](https://github.com/kiva/kv-ui-elements/issues/376)) ([cdb52ec](https://github.com/kiva/kv-ui-elements/commit/cdb52ec5e85f258efbf5c5e44952523cb0dd454a))





## [3.66.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.66.1...@kiva/kv-components@3.66.2) (2024-03-22)


### Bug Fixes

* loan card bug fixed ([#375](https://github.com/kiva/kv-ui-elements/issues/375)) ([724be25](https://github.com/kiva/kv-ui-elements/commit/724be2519ed7ee176a6c1fbe8c47b4fb9a825dc7))





## [3.66.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.66.0...@kiva/kv-components@3.66.1) (2024-03-21)


### Bug Fixes

* adjust commenting components initially for chat data ([f821dcf](https://github.com/kiva/kv-ui-elements/commit/f821dcf7762f5a0e584a788a5e551fd5762032e6))
* adjust for new data type ([99a33fb](https://github.com/kiva/kv-ui-elements/commit/99a33fbf4de6e4cab2d5759a7b0b4f94f8a707eb))
* another data tweak ([770be92](https://github.com/kiva/kv-ui-elements/commit/770be9278f1017a553e5d3480dc530824567a4f1))





# [3.66.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.65.2...@kiva/kv-components@3.66.0) (2024-03-20)


### Features

* collapsable replies list added to commenting component ([#373](https://github.com/kiva/kv-ui-elements/issues/373)) ([612a880](https://github.com/kiva/kv-ui-elements/commit/612a8806ffd74411a774f6bdf5efb30e877abaa1))





## [3.65.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.65.1...@kiva/kv-components@3.65.2) (2024-03-19)


### Bug Fixes

* revert level 3 reactions and more specific error src ([dc8acac](https://github.com/kiva/kv-ui-elements/commit/dc8acaca403b438d34daca49e85442627883b08f))





## [3.65.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.65.0...@kiva/kv-components@3.65.1) (2024-03-19)


### Bug Fixes

* allow heart on last comment level ([3e876ed](https://github.com/kiva/kv-ui-elements/commit/3e876ed7fa7d113acbbc24983ad8f5f90c29c3da))





# [3.65.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.64.0...@kiva/kv-components@3.65.0) (2024-03-19)


### Features

* logged in feats for commenting components ([#370](https://github.com/kiva/kv-ui-elements/issues/370)) ([bee56c9](https://github.com/kiva/kv-ui-elements/commit/bee56c9fa3451ef91e89b3b64a5f7846840fedcf))





# [3.64.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.63.1...@kiva/kv-components@3.64.0) (2024-03-18)


### Features

* team pick label added to loan card component ([#369](https://github.com/kiva/kv-ui-elements/issues/369)) ([76803bf](https://github.com/kiva/kv-ui-elements/commit/76803bfd7b81497f1d34e537c0435d7fa7dd3606))





## [3.63.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.63.0...@kiva/kv-components@3.63.1) (2024-03-12)


### Bug Fixes

* fix data reference for comment list item ([0955f28](https://github.com/kiva/kv-ui-elements/commit/0955f28b8deeb067e8d393c2365dbdcab79e92df))





# [3.63.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.62.1...@kiva/kv-components@3.63.0) (2024-03-08)


### Features

* inline activity feed components added ([#367](https://github.com/kiva/kv-ui-elements/issues/367)) ([32c782a](https://github.com/kiva/kv-ui-elements/commit/32c782a39d39100dcf24a7a322488d5e25b86d8b))





## [3.62.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.62.0...@kiva/kv-components@3.62.1) (2024-03-07)


### Bug Fixes

* remove centering on voting card category ([fc0d036](https://github.com/kiva/kv-ui-elements/commit/fc0d03604bcdf6157b716a93d3e62d758e765aad))





# [3.62.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.61.0...@kiva/kv-components@3.62.0) (2024-03-05)


### Bug Fixes

* add comment regarding inject ([7a98c3b](https://github.com/kiva/kv-ui-elements/commit/7a98c3b017c9472c14ef0a26fdad53864aaf3ada))
* add provide to commenting stories ([01c1e53](https://github.com/kiva/kv-ui-elements/commit/01c1e5305cda4d2885afa1c4a4784630e7a6047d))


### Features

* update reply to match other commenting buttons ([6ad68a3](https://github.com/kiva/kv-ui-elements/commit/6ad68a3ddcce48089d12bd473f8fa3bfd7c30b5f))





# [3.61.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.60.0...@kiva/kv-components@3.61.0) (2024-03-04)


### Features

* fetchlenderinfo method injected to comment item component ([#362](https://github.com/kiva/kv-ui-elements/issues/362)) ([2aba5e0](https://github.com/kiva/kv-ui-elements/commit/2aba5e0837d57eec77f2d1bee48ca2c3c127c1d4))





# [3.60.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.59.1...@kiva/kv-components@3.60.0) (2024-03-04)


### Bug Fixes

* unit test update ([e0e943b](https://github.com/kiva/kv-ui-elements/commit/e0e943bf51a9f7775f9b1279dc449787d7d05055))


### Features

* use new avatar in commenting components ([c707f71](https://github.com/kiva/kv-ui-elements/commit/c707f71e87661feb93486d3b900d4f0a77aff353))





## [3.59.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.59.0...@kiva/kv-components@3.59.1) (2024-03-04)


### Bug Fixes

* comments count fixed ([#360](https://github.com/kiva/kv-ui-elements/issues/360)) ([cdbaf2d](https://github.com/kiva/kv-ui-elements/commit/cdbaf2d6e19e556cfb769805307466c24021567e))





# [3.59.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.58.0...@kiva/kv-components@3.59.0) (2024-03-04)


### Features

* replies count added to reply commenting button ([#359](https://github.com/kiva/kv-ui-elements/issues/359)) ([87e4b01](https://github.com/kiva/kv-ui-elements/commit/87e4b01022641e774203274a0b3a353d1b2a37bc))





# [3.58.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.57.0...@kiva/kv-components@3.58.0) (2024-03-01)


### Bug Fixes

* fallback to kiva logo if no image or name ([74cdc90](https://github.com/kiva/kv-ui-elements/commit/74cdc900a8c1f9783771a7428f2722f59f5edf09))


### Features

* port avatar component from cps to cover different avatar situations ([036506f](https://github.com/kiva/kv-ui-elements/commit/036506f7680646c8e432af1842fb55851a5c6b2c))





# [3.57.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.56.1...@kiva/kv-components@3.57.0) (2024-03-01)


### Bug Fixes

* test failed because of whitespaces in value ([4591e93](https://github.com/kiva/kv-ui-elements/commit/4591e932a9c785f97019f47a8d7899142b2c1204))


### Features

* show number of likes ([c088fae](https://github.com/kiva/kv-ui-elements/commit/c088fae443da391871ef1783e64712d306b84007))





## [3.56.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.56.0...@kiva/kv-components@3.56.1) (2024-03-01)


### Bug Fixes

* remove country from voting card ([fee3dcb](https://github.com/kiva/kv-ui-elements/commit/fee3dcb7af0fd103dedca70c14448cfab91c66eb))





# [3.56.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.55.2...@kiva/kv-components@3.56.0) (2024-03-01)


### Features

* update vote card to be able to hide percentage portion of card ([11c15b8](https://github.com/kiva/kv-ui-elements/commit/11c15b84b939f1a1781c5a24a6dbfd2be378c096))





## [3.55.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.55.1...@kiva/kv-components@3.55.2) (2024-03-01)


### Bug Fixes

* remove const var import ([#352](https://github.com/kiva/kv-ui-elements/issues/352)) ([4c1ca6a](https://github.com/kiva/kv-ui-elements/commit/4c1ca6a2d518ce1b1b72933b5f5296513d352fa2))





## [3.55.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.55.0...@kiva/kv-components@3.55.1) (2024-02-29)

**Note:** Version bump only for package @kiva/kv-components





# [3.55.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.54.0...@kiva/kv-components@3.55.0) (2024-02-29)


### Bug Fixes

* input width ([2489339](https://github.com/kiva/kv-ui-elements/commit/2489339c622ac45739bcc1eefc0a69837f90b841))
* when to send hide event and test not recognizing vue3 ([c3941a7](https://github.com/kiva/kv-ui-elements/commit/c3941a7a73a439846e6abf16b6dd0b29fa0e36f7))


### Features

* adding input for comment reply ([b18edf0](https://github.com/kiva/kv-ui-elements/commit/b18edf0ecd300f622379d160237fd750cf117fa1))
* update tests and remove handleClick for emits ([fc3c586](https://github.com/kiva/kv-ui-elements/commit/fc3c58667248fb4e44bb0a7558f6c88f97f299b1))





# [3.54.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.53.0...@kiva/kv-components@3.54.0) (2024-02-28)


### Features

* kvcommentsheartbutton added for comments stuff ([#346](https://github.com/kiva/kv-ui-elements/issues/346)) ([57303da](https://github.com/kiva/kv-ui-elements/commit/57303daec80222c199556b296d720462265e53ac))





# [3.53.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.52.1...@kiva/kv-components@3.53.0) (2024-02-26)


### Bug Fixes

* indentation in item component ([30aee02](https://github.com/kiva/kv-ui-elements/commit/30aee02d3c2e58c7c98fe6a58689a9824f56ef60))
* optional chaining for comment object ([bac9ba1](https://github.com/kiva/kv-ui-elements/commit/bac9ba199970966564bfab7d6a2e64bb92fea286))
* revert profile image and small fixes ([fc8cf74](https://github.com/kiva/kv-ui-elements/commit/fc8cf7440fb355fbfee0e8acfb2a849dd6513a11))
* using more accurate data for components ([043f1c2](https://github.com/kiva/kv-ui-elements/commit/043f1c2d47a5d22157785b9d972246823572e4fd))


### Features

* provisional comment list and item components ([642745c](https://github.com/kiva/kv-ui-elements/commit/642745ce1359e5cc9e3d98d122f26728b3dffda0))





## [3.52.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.52.0...@kiva/kv-components@3.52.1) (2024-02-01)


### Bug Fixes

* add back in comments container ([36a8a97](https://github.com/kiva/kv-ui-elements/commit/36a8a979aac47c425e32d87cd13160ad68b913cf))
* another tweak to how events emitted ([029367a](https://github.com/kiva/kv-ui-elements/commit/029367aeb1f38151a7d36e0a2246b82b14489cb3))
* minor test fix ([c95c486](https://github.com/kiva/kv-ui-elements/commit/c95c4866d05b2e711e8895868d72ddc6bb5b7a43))
* remove unneeded comment container ([71365b0](https://github.com/kiva/kv-ui-elements/commit/71365b0f6628d1d280f9fbd2b0adbad8688fd57c))





# [3.52.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.51.0...@kiva/kv-components@3.52.0) (2024-01-31)


### Bug Fixes

* added missing suppression classes ([5d04867](https://github.com/kiva/kv-ui-elements/commit/5d048672f078d2d229372e37b896c9be025457d9))


### Features

* add comments add component ([1bf5fc3](https://github.com/kiva/kv-ui-elements/commit/1bf5fc388fee61a63f49775a15b50728c140a569))





# [3.51.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.50.0...@kiva/kv-components@3.51.0) (2024-01-25)


### Features

* add basic comments container for future comment work ([4f1b3ab](https://github.com/kiva/kv-ui-elements/commit/4f1b3aba7f78ead3cf53a955bbb1b1243c4b2cda))





# [3.50.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.49.1...@kiva/kv-components@3.50.0) (2024-01-19)


### Bug Fixes

* change component to take in a slot ([a3b733c](https://github.com/kiva/kv-ui-elements/commit/a3b733c644c7a431fb592e1b159cd551bd5e0f3c))
* restore missing class ([6781e31](https://github.com/kiva/kv-ui-elements/commit/6781e31170c729cf484a0aff11ca544f8cca7aec))


### Features

* make the voting cards capable of using borrower image or direct url as img src ([cedc03c](https://github.com/kiva/kv-ui-elements/commit/cedc03ce887815ef133e29e61a9770b633493d8f))





## [3.49.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.49.0...@kiva/kv-components@3.49.1) (2024-01-17)


### Bug Fixes

* correcting mistake with wrong function call ([904d39d](https://github.com/kiva/kv-ui-elements/commit/904d39df4afa9d470fc91a96d7e76fe782898448))
* editing classes for country / name tag ([aaac1c5](https://github.com/kiva/kv-ui-elements/commit/aaac1c561a24a192031977c7ea5a365789228740))





# [3.49.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.48.3...@kiva/kv-components@3.49.0) (2024-01-16)


### Features

* vote button variant ([d58fe0c](https://github.com/kiva/kv-ui-elements/commit/d58fe0c9d16b3139d36e7d61bc2c3b4fbb5d1f0d))
* voting category cards ([8938dff](https://github.com/kiva/kv-ui-elements/commit/8938dff740c79eaf09e8543ad384c97decee2634))





## [3.48.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.48.2...@kiva/kv-components@3.48.3) (2023-12-08)


### Bug Fixes

* p4 tag on loan card ([8513e93](https://github.com/kiva/kv-ui-elements/commit/8513e93addcb68f9f6f17f4eb52ee4d33f6af481))





## [3.48.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.48.1...@kiva/kv-components@3.48.2) (2023-12-06)


### Bug Fixes

* **KvLightbox:** allow focus on open alerts, clicks on browser extensions and outside lightbox ([969cf63](https://github.com/kiva/kv-ui-elements/commit/969cf638d27212052ade5e08e7de9786018bef9e))





## [3.48.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.48.0...@kiva/kv-components@3.48.1) (2023-11-29)

**Note:** Version bump only for package @kiva/kv-components





# [3.48.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.47.0...@kiva/kv-components@3.48.0) (2023-11-20)


### Features

* map mega animation ([#315](https://github.com/kiva/kv-ui-elements/issues/315)) ([5adfe9c](https://github.com/kiva/kv-ui-elements/commit/5adfe9c5d7db3b05efa23962025ba5440e8a2e4a))





# [3.47.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.46.3...@kiva/kv-components@3.47.0) (2023-10-23)


### Features

* prioritizing matching text in loan tag component ([#308](https://github.com/kiva/kv-ui-elements/issues/308)) ([2ac6ec1](https://github.com/kiva/kv-ui-elements/commit/2ac6ec129733eccaeeca93edd32f8e76d8f8f906))





## [3.46.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.46.2...@kiva/kv-components@3.46.3) (2023-10-17)


### Bug Fixes

* kvcountdowtimer component updated to show the remaining hours correctly ([#307](https://github.com/kiva/kv-ui-elements/issues/307)) ([1ea593c](https://github.com/kiva/kv-ui-elements/commit/1ea593ce88339fff9e9bf2bcd1e33bed46a8b09a))





## [3.46.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.46.1...@kiva/kv-components@3.46.2) (2023-10-12)

**Note:** Version bump only for package @kiva/kv-components





## [3.46.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.46.0...@kiva/kv-components@3.46.1) (2023-10-04)


### Bug Fixes

* bug fixed for lse loans when including eco friendly and single p… ([#304](https://github.com/kiva/kv-ui-elements/issues/304)) ([0afb6fc](https://github.com/kiva/kv-ui-elements/commit/0afb6fc7f362048f1ee76ac898a3dcb456d250d5))





# [3.46.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.45.0...@kiva/kv-components@3.46.0) (2023-09-29)


### Features

* loan name wasn't being suppressed from hotjar ([998daef](https://github.com/kiva/kv-ui-elements/commit/998daefd75ebebbabde03f37be78d17469e34e00))





# [3.45.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.44.2...@kiva/kv-components@3.45.0) (2023-09-29)


### Bug Fixes

* missed leading words ([1614ebd](https://github.com/kiva/kv-ui-elements/commit/1614ebd5ff3ceccc900a8db24624f5a40d9f17c6))


### Features

* add optional why special string to loan use ([99d20ec](https://github.com/kiva/kv-ui-elements/commit/99d20ecc8e2efd0b9a6de4890335f9f46daf8250))





## [3.44.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.44.1...@kiva/kv-components@3.44.2) (2023-09-25)


### Bug Fixes

* bookmark icon position fixed to avoid using z index property ([#301](https://github.com/kiva/kv-ui-elements/issues/301)) ([59287f8](https://github.com/kiva/kv-ui-elements/commit/59287f82e27275a23c6924537a55bdb31f563946))





## [3.44.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.44.0...@kiva/kv-components@3.44.1) (2023-09-20)


### Bug Fixes

* backpedal kvedit button and use existing components instead ([e751910](https://github.com/kiva/kv-ui-elements/commit/e751910f808f7d4b5861995053015bd20b9c6d5e))





# [3.44.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.43.0...@kiva/kv-components@3.44.0) (2023-09-19)


### Features

* increase impact visibility for lse loans ([#298](https://github.com/kiva/kv-ui-elements/issues/298)) ([f9dc1e4](https://github.com/kiva/kv-ui-elements/commit/f9dc1e47f25a68f8e3bd745abfc2338b376bd848))





# [3.43.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.42.0...@kiva/kv-components@3.43.0) (2023-09-15)


### Features

* added label support ([c016a68](https://github.com/kiva/kv-ui-elements/commit/c016a683ae38ca5af66fa86576d88abd0066d719))
* line graph can now just take values and normalization happens in component ([3f706be](https://github.com/kiva/kv-ui-elements/commit/3f706be31b288b64e4a566746bd7d0530ce25650))
* ported over Shua's line graph using clip path and made slight CSS tweaks to match mocks ([56ac312](https://github.com/kiva/kv-ui-elements/commit/56ac312924eecdf56e2d9d99082643e6d42f7765))
* simple unit tests and small fixes related to tests ([43700fa](https://github.com/kiva/kv-ui-elements/commit/43700faf6c1f0c76432107c3a658539bd3bf6c7b))





# [3.42.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.41.0...@kiva/kv-components@3.42.0) (2023-09-14)


### Bug Fixes

* added event emitters ([3a84e6e](https://github.com/kiva/kv-ui-elements/commit/3a84e6e97b5d230ff747c296339bce31263d89da))
* added event emitters, addressed comments, updated tests ([35a8a0c](https://github.com/kiva/kv-ui-elements/commit/35a8a0c6b34eed36fba030c29d3389c356c06927))
* addressing build issues, made button square ([974bbdc](https://github.com/kiva/kv-ui-elements/commit/974bbdcac2558fc47c7280f6535d390ed8c824ef))
* stopped requiring default title ([f494700](https://github.com/kiva/kv-ui-elements/commit/f494700078a2660f72703b95327df6e407d16d5f))


### Features

* new edit button that opens up a lightbox for editing page settings in kiva at work pages ([9d9c2ca](https://github.com/kiva/kv-ui-elements/commit/9d9c2caf3df0f741c2039d2423e42e108e753ff0))





# [3.41.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.40.1...@kiva/kv-components@3.41.0) (2023-09-07)


### Features

* add box shadow to all toasts ([57ccaf2](https://github.com/kiva/kv-ui-elements/commit/57ccaf2f2da006a6990f5d5b0d6adeca8d3081b0))
* rolled back some new tooltip props ([4ce96d6](https://github.com/kiva/kv-ui-elements/commit/4ce96d6eae3457a6a92bde9e407f226d5e53d332))





## [3.40.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.40.0...@kiva/kv-components@3.40.1) (2023-09-07)

**Note:** Version bump only for package @kiva/kv-components





# [3.40.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.39.0...@kiva/kv-components@3.40.0) (2023-09-06)


### Features

* avoid adding themes to callouts when equal to category page name in loan card ([#290](https://github.com/kiva/kv-ui-elements/issues/290)) ([d15ef2b](https://github.com/kiva/kv-ui-elements/commit/d15ef2b4f4503c50247644d5023a7189edfc5d4f))





# [3.39.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.38.2...@kiva/kv-components@3.39.0) (2023-09-01)


### Features

* add bg and drop shadow toast variations ([a2b045d](https://github.com/kiva/kv-ui-elements/commit/a2b045d0823d55d1c643105fde2a847a0713f55f))





## [3.38.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.38.1...@kiva/kv-components@3.38.2) (2023-08-31)

**Note:** Version bump only for package @kiva/kv-components





## [3.38.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.38.0...@kiva/kv-components@3.38.1) (2023-08-30)


### Bug Fixes

* kvmap component refactor to avoid using vue meta package ([#287](https://github.com/kiva/kv-ui-elements/issues/287)) ([72f5240](https://github.com/kiva/kv-ui-elements/commit/72f524037358f039032ebd1c8d1f4e106ab6ff10))





# [3.38.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.37.0...@kiva/kv-components@3.38.0) (2023-08-29)


### Features

* kvmap ported to kv components library ([#286](https://github.com/kiva/kv-ui-elements/issues/286)) ([373e53f](https://github.com/kiva/kv-ui-elements/commit/373e53fd407d161e79033826a6063fbd5ca5b2ce))





# [3.37.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.36.0...@kiva/kv-components@3.37.0) (2023-08-18)


### Features

* update header icon ([a593f2c](https://github.com/kiva/kv-ui-elements/commit/a593f2c4ba2285a1917622db55a88ff68097fe89))





# [3.36.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.35.1...@kiva/kv-components@3.36.0) (2023-08-14)


### Features

* avoid fractional page number in kvpaginator component ([#281](https://github.com/kiva/kv-ui-elements/issues/281)) ([0d5e028](https://github.com/kiva/kv-ui-elements/commit/0d5e028837c0edcedc87092215f0be94b6565996))





## [3.35.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.35.0...@kiva/kv-components@3.35.1) (2023-08-14)


### Bug Fixes

* linting errors ([c686bd2](https://github.com/kiva/kv-ui-elements/commit/c686bd20bc96a61882bce0981642be65133ed46d))
* linting issues ([1a631d5](https://github.com/kiva/kv-ui-elements/commit/1a631d529b1d3ebd56c357be2e02fac54b9c1de5))





# [3.35.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.34.0...@kiva/kv-components@3.35.0) (2023-08-03)


### Features

* adding new option to the loan progress bar bg ([89afa0a](https://github.com/kiva/kv-ui-elements/commit/89afa0ad20cd64a794441d187da534006a3aeef2))





# [3.34.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.33.0...@kiva/kv-components@3.34.0) (2023-08-02)


### Features

* balance campaign prices added to loan utility ([#277](https://github.com/kiva/kv-ui-elements/issues/277)) ([319707e](https://github.com/kiva/kv-ui-elements/commit/319707e525865077e531ab6f4c378676da7ee53b))





# [3.33.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.32.0...@kiva/kv-components@3.33.0) (2023-08-01)


### Features

* cleanup unneeded code in kiva partner header ([ff39945](https://github.com/kiva/kv-ui-elements/commit/ff39945d649a010105a44762b3662acfd38b9dcd))





# [3.32.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.31.0...@kiva/kv-components@3.32.0) (2023-07-31)


### Features

* basic kivaPartner header ([7ec9fd8](https://github.com/kiva/kv-ui-elements/commit/7ec9fd89d50a10bc6f9c796f6395d634842b2f55))





# [3.31.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.30.0...@kiva/kv-components@3.31.0) (2023-07-26)


### Features

* 5 dollars pre select added to loan card components ([#274](https://github.com/kiva/kv-ui-elements/issues/274)) ([1f30146](https://github.com/kiva/kv-ui-elements/commit/1f30146f67ae079eb662cc02403ee9adcfe257ee))





# [3.30.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.29.0...@kiva/kv-components@3.30.0) (2023-07-17)


### Features

* cover the expired edge case ([4e97abf](https://github.com/kiva/kv-ui-elements/commit/4e97abfab4019f08632666f34a931d8a2f89e6d2))





# [3.29.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.28.0...@kiva/kv-components@3.29.0) (2023-07-14)


### Features

* created generic countdown component ([a321379](https://github.com/kiva/kv-ui-elements/commit/a321379aee166c3f8e91def8e2be42b4d42d5896))
* custom countdown for vue 2 + 3 ([2bafad9](https://github.com/kiva/kv-ui-elements/commit/2bafad90df469b447d472926fa82d119711f2885))





# [3.28.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.27.0...@kiva/kv-components@3.28.0) (2023-07-06)


### Features

* avoid image bug for tiny screens ([#270](https://github.com/kiva/kv-ui-elements/issues/270)) ([d59aa72](https://github.com/kiva/kv-ui-elements/commit/d59aa72fa49605bcf5b7d88ed9efed28bc804d14))





# [3.27.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.26.0...@kiva/kv-components@3.27.0) (2023-06-27)


### Features

* disabling to click loan use when loading ([#269](https://github.com/kiva/kv-ui-elements/issues/269)) ([625afb2](https://github.com/kiva/kv-ui-elements/commit/625afb201bbd6a805516297946c0a428f1c4da50))





# [3.26.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.25.0...@kiva/kv-components@3.26.0) (2023-06-23)


### Features

* lend amount CTA double event stop ([70997d5](https://github.com/kiva/kv-ui-elements/commit/70997d571940eb4f4a914c1a216bdcf64142954d))





# [3.25.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.24.0...@kiva/kv-components@3.25.0) (2023-06-21)


### Features

* fix prop type for route ([2102672](https://github.com/kiva/kv-ui-elements/commit/21026721bc62c6a71ec182e62396bdc0e8b3617c))





# [3.24.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.23.1...@kiva/kv-components@3.24.0) (2023-06-21)


### Features

* add support for $5 notes default lend CTA dropdown selected amount changing for ERL ([bac6944](https://github.com/kiva/kv-ui-elements/commit/bac69444b032c9b42c25f6359baf7c4a03eb651b))





## [3.23.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.23.0...@kiva/kv-components@3.23.1) (2023-06-14)


### Bug Fixes

* **KvLightbox:** use all available space for title instead of sharing with close button ([21db7b9](https://github.com/kiva/kv-ui-elements/commit/21db7b905119276e2fe21d4e31b4b73bc1e780d1))





# [3.23.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.22.3...@kiva/kv-components@3.23.0) (2023-06-09)


### Features

* location selector no longer being used ([bdf5452](https://github.com/kiva/kv-ui-elements/commit/bdf5452ec359b040cd7a904678422c3ae540889c))





## [3.22.3](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.22.2...@kiva/kv-components@3.22.3) (2023-06-02)

**Note:** Version bump only for package @kiva/kv-components





## [3.22.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.22.1...@kiva/kv-components@3.22.2) (2023-05-29)


### Bug Fixes

* regions watcher removed from location selector ([#255](https://github.com/kiva/kv-ui-elements/issues/255)) ([69a5c7b](https://github.com/kiva/kv-ui-elements/commit/69a5c7b8430f1732fb04d08aa2a6b4768720dbf4))





## [3.22.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.22.0...@kiva/kv-components@3.22.1) (2023-05-26)

**Note:** Version bump only for package @kiva/kv-components





# [3.22.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.21.2...@kiva/kv-components@3.22.0) (2023-05-24)


### Features

* emit added to location selector component ([#248](https://github.com/kiva/kv-ui-elements/issues/248)) ([ca043e4](https://github.com/kiva/kv-ui-elements/commit/ca043e40091d56e55ddff80890f446a41baa97dd))





## [3.21.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.21.1...@kiva/kv-components@3.21.2) (2023-05-24)

**Note:** Version bump only for package @kiva/kv-components





## [3.21.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.21.0...@kiva/kv-components@3.21.1) (2023-05-24)

**Note:** Version bump only for package @kiva/kv-components





# [3.21.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.20.0...@kiva/kv-components@3.21.0) (2023-05-16)


### Features

* remove countdown for now from loan tags ([7aeae11](https://github.com/kiva/kv-ui-elements/commit/7aeae114c4dd7823829241ea659ff5a19de948ef))





# [3.20.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.19.0...@kiva/kv-components@3.20.0) (2023-05-11)


### Features

* handle view loan when funded ([b6a392b](https://github.com/kiva/kv-ui-elements/commit/b6a392b0bbdcb09db37eba3d72e4b52b44eed41a))





# [3.19.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.18.0...@kiva/kv-components@3.19.0) (2023-05-09)


### Features

* loan card CTA fixes needed for home page ([fc1c9f8](https://github.com/kiva/kv-ui-elements/commit/fc1c9f858aeae620f6cfea74da8d15ae859afa3c))





# [3.18.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.17.0...@kiva/kv-components@3.18.0) (2023-05-05)


### Features

* "view loan" CTA ([aa10cf1](https://github.com/kiva/kv-ui-elements/commit/aa10cf17a1ca4978b97fc9541522f31d95cc886f))





# [3.17.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.16.0...@kiva/kv-components@3.17.0) (2023-05-05)


### Features

* new loan card ported from recent successful Denali experiment ([0b0e5a0](https://github.com/kiva/kv-ui-elements/commit/0b0e5a0a575bc1c65ab71579f151a6d3cee5d8d7))





# [3.16.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.15.0...@kiva/kv-components@3.16.0) (2023-05-03)


### Features

* add custom blog colors ([7e00f04](https://github.com/kiva/kv-ui-elements/commit/7e00f047dec9fdde2b68e0a1e5f8cb951f3baa4a))





# [3.15.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.14.0...@kiva/kv-components@3.15.0) (2023-04-27)


### Features

* implemented initial kv-loan-filters package ([1987069](https://github.com/kiva/kv-ui-elements/commit/1987069227099a2ef1cabf09d1086e6a66adee0d))





# [3.14.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.13.2...@kiva/kv-components@3.14.0) (2023-04-17)


### Bug Fixes

* call userEvent directly ([461774f](https://github.com/kiva/kv-ui-elements/commit/461774f4e6596030b806d03084486e961011f8be))


### Features

* event guidelines ([37c1635](https://github.com/kiva/kv-ui-elements/commit/37c16351f8a29b3949745cc2786d394049bd6d5c))
* move KvPagination component to kv-elements ([5f24d6a](https://github.com/kiva/kv-ui-elements/commit/5f24d6aae4bdb2909fb61c666b6a3d64dd76da99))





## [3.13.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.13.1...@kiva/kv-components@3.13.2) (2023-04-14)

**Note:** Version bump only for package @kiva/kv-components





## [3.13.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.13.0...@kiva/kv-components@3.13.1) (2023-04-05)


### Bug Fixes

* check for button ref before adding ripple ([#233](https://github.com/kiva/kv-ui-elements/issues/233)) ([5371a88](https://github.com/kiva/kv-ui-elements/commit/5371a8816caefede244ca20b933b9cece025b0bb))





# [3.13.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.12.0...@kiva/kv-components@3.13.0) (2023-03-01)


### Features

* danger, caution, and ghost variants for KvPrgoressBar ([8b7e43f](https://github.com/kiva/kv-ui-elements/commit/8b7e43fd55e02fd01e2bc5488c86dd3984a7a42d))





# [3.12.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.11.2...@kiva/kv-components@3.12.0) (2023-02-10)


### Features

* hide delay param for toast ([d8620c0](https://github.com/kiva/kv-ui-elements/commit/d8620c06e2aa9b814bebdee7a5e1c150f06d77e9))





## [3.11.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.11.1...@kiva/kv-components@3.11.2) (2023-01-25)

**Note:** Version bump only for package @kiva/kv-components





## [3.11.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.11.0...@kiva/kv-components@3.11.1) (2023-01-20)

**Note:** Version bump only for package @kiva/kv-components





# [3.11.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.10.2...@kiva/kv-components@3.11.0) (2023-01-19)


### Features

* kiva logo type added to kv toast component including an svg icon ([#227](https://github.com/kiva/kv-ui-elements/issues/227)) ([c24ecc1](https://github.com/kiva/kv-ui-elements/commit/c24ecc1295e32b817bf057f0570de56224c85c3f))





## [3.10.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.10.1...@kiva/kv-components@3.10.2) (2022-12-07)

**Note:** Version bump only for package @kiva/kv-components





## [3.10.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.10.0...@kiva/kv-components@3.10.1) (2022-11-23)


### Bug Fixes

* use value instead of ref ([8620e81](https://github.com/kiva/kv-ui-elements/commit/8620e81b5e3a5b649c3825b1a62be17cf1d8c72c))





# [3.10.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.9.1...@kiva/kv-components@3.10.0) (2022-11-09)


### Bug Fixes

* smooth out transition by apply styling to child div ([8f629d7](https://github.com/kiva/kv-ui-elements/commit/8f629d7659aec83493797e8b1bb9d4540457686a))
* test multiline content for broken state, add .stop event modifier on FAQ icon click ([e4758d5](https://github.com/kiva/kv-ui-elements/commit/e4758d5103233007c5c497b310e5cf4c994885aa))


### Features

* created tests in order to fix FAQ Arrow Functionality ([7bc7c54](https://github.com/kiva/kv-ui-elements/commit/7bc7c54258cb83f74b127f9c5985ff56ba3e9129))





## [3.9.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.9.0...@kiva/kv-components@3.9.1) (2022-10-14)


### Bug Fixes

* turn off pre-wrap whitespace for KvExpandableQuestion and prose for the title of the component ([753abef](https://github.com/kiva/kv-ui-elements/commit/753abef7b01d2d8928ac432ed87675a95d715688))





# [3.9.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.8.0...@kiva/kv-components@3.9.0) (2022-10-07)


### Bug Fixes

* removed extra space on line 23 ([c8a3226](https://github.com/kiva/kv-ui-elements/commit/c8a32264ede0b628f578b98c4ac8256a539fd28d))


### Features

* fixed bugs in KvExpandableQuestion (arrow functionality and slot content rendering) ([4ab9f47](https://github.com/kiva/kv-ui-elements/commit/4ab9f477200d53b89ce6a4ae0328215268dd4019))





# [3.8.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.7.1...@kiva/kv-components@3.8.0) (2022-10-04)


### Features

* created and implemented a reusable global component and story (KvExpandableQuestion)[VUE-1318] ([173ae50](https://github.com/kiva/kv-ui-elements/commit/173ae50e88dffa7dabb7392404ccdb813307ea31))
* removed analyticsCategory prop, edited other code blocks ([2864261](https://github.com/kiva/kv-ui-elements/commit/2864261b55517bab8099b84b404d09aaae37b489))
* removed line 84, and converted faq into a string ([8f5a3da](https://github.com/kiva/kv-ui-elements/commit/8f5a3dab81556997a6eb7dd0e5dffac2babff104))





## [3.7.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.7.0...@kiva/kv-components@3.7.1) (2022-09-27)


### Bug Fixes

* **KvContentfulImg:** match size and fit of picture to figure wrapper MARS-265 ([f6ede31](https://github.com/kiva/kv-ui-elements/commit/f6ede316c286871cc685e0840a6c2b9452ee48e3))





# [3.7.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.6.2...@kiva/kv-components@3.7.0) (2022-09-24)


### Features

* add dark mint theme ([269d6af](https://github.com/kiva/kv-ui-elements/commit/269d6af35a35bdcac8ca3c1c780bc62926072c8d))





## [3.6.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.6.1...@kiva/kv-components@3.6.2) (2022-09-21)


### Bug Fixes

* remove margin top from figcaption prose ([67bdb12](https://github.com/kiva/kv-ui-elements/commit/67bdb12d16efd730f063bbfafa4a4a653e20d406))





## [3.6.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.6.0...@kiva/kv-components@3.6.1) (2022-09-21)

**Note:** Version bump only for package @kiva/kv-components





# [3.6.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.5.2...@kiva/kv-components@3.6.0) (2022-09-16)


### Features

* **KvContentfulImg:** add optional caption MARS-243 ([35dfa7a](https://github.com/kiva/kv-ui-elements/commit/35dfa7ac4888dff6ff62b14f71bb1edb4c805717))





## [3.5.2](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.5.1...@kiva/kv-components@3.5.2) (2022-09-15)


### Bug Fixes

* **KvCarousel:** slidesToScroll should not be 0 MARS-248 ([c2fc929](https://github.com/kiva/kv-ui-elements/commit/c2fc929fbdcf87a061b71fff14b91ab8064fc130))





## [3.5.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.5.0...@kiva/kv-components@3.5.1) (2022-09-13)


### Bug Fixes

* **KvCarousel:** incorrect slide marked as current ([f496e7c](https://github.com/kiva/kv-ui-elements/commit/f496e7c0a8fdebd1f6e003f4c79b57a5926b0c4a))





# [3.5.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.4.0...@kiva/kv-components@3.5.0) (2022-09-07)


### Bug Fixes

* height of indicator bar ([8908e44](https://github.com/kiva/kv-ui-elements/commit/8908e44da2d3edcfbc9bfca44144604ed255674b))


### Features

* add vertical tab button for new home page exp ([329e490](https://github.com/kiva/kv-ui-elements/commit/329e490a8df555b126c23e93f4ce69cd00eb7c35))
* add vertical variant in tab ([a23c9d1](https://github.com/kiva/kv-ui-elements/commit/a23c9d1abd1ade6a2603d422bb0f2535e299d119))





# [3.4.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.3.1...@kiva/kv-components@3.4.0) (2022-08-29)


### Features

* creating a global resuable component (KvAccordionItem) ([5bf7685](https://github.com/kiva/kv-ui-elements/commit/5bf76858508870f9055e680406a1167cdd68099c))





## [3.3.1](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.3.0...@kiva/kv-components@3.3.1) (2022-08-26)


### Bug Fixes

* ensure ref is defined in exported methods ([3ab00ea](https://github.com/kiva/kv-ui-elements/commit/3ab00ea181ee2455925c2f8f01950b79c2ea7b09))





# [3.3.0](https://github.com/kiva/kv-ui-elements/compare/@kiva/kv-components@3.2.0...@kiva/kv-components@3.3.0) (2022-08-10)


### Bug Fixes

* added class to placeholder story to show support ([ed4e6c9](https://github.com/kiva/kv-ui-elements/commit/ed4e6c984b6a52b238862004266ada10c9cb0c95))
* added non-static class and style to placeholder as example ([4fd5e98](https://github.com/kiva/kv-ui-elements/commit/4fd5e98d41c900f69b56614980c688ebd43f6176))


### Features

* placeholder component ([b29facc](https://github.com/kiva/kv-ui-elements/commit/b29facc8c8fcdb9761cc9e58e2530ea1e3b4a2f8))





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
