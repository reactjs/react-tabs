# react-tabs

## 6.1.3

### Patch Changes

- [#638](https://github.com/reactjs/react-tabs/pull/638) [`1b5d358`](https://github.com/reactjs/react-tabs/commit/1b5d358dc70ef4793dd921f9537a927bdad0776c) Thanks [@danez](https://github.com/danez)! - Avoid an extra render when focusing the initially selected tab with `defaultFocus`.

## [6.1.2](https://github.com/reactjs/react-tabs/releases/tag/v6.1.2)

### Bug Fixes

- retain tab focus across fragment-wrapped selection changes ([#633](https://github.com/reactjs/react-tabs/issues/633)) ([a04acb8](https://github.com/reactjs/react-tabs/commit/a04acb80abddee89bc2e15a947af2175a8031e76))

## [6.1.1](https://github.com/reactjs/react-tabs/releases/tag/v6.1.1)

### Bug Fixes

- **config:** migrate config renovate.json ([#609](https://github.com/reactjs/react-tabs/issues/609)) ([002233b](https://github.com/reactjs/react-tabs/commit/002233b91e5f4e8f478b3842f9f02611568abeb2))

## [6.1.0](https://github.com/reactjs/react-tabs/releases/tag/v6.1.0)

### Features

- support react v19 ([363086b](https://github.com/reactjs/react-tabs/commit/363086b312615f5799b9cd75c4193e26e125ee47))

## [6.0.2](https://github.com/reactjs/react-tabs/releases/tag/v6.0.2)

### Bug Fixes

- **deps:** update dependency clsx to v2 ([#524](https://github.com/reactjs/react-tabs/issues/524)) ([9ea1c76](https://github.com/reactjs/react-tabs/commit/9ea1c76f24058c54637312b0c07234c81d29ec61))

## [6.0.1](https://github.com/reactjs/react-tabs/releases/tag/v6.0.1)

### Bug Fixes

- refactor defaultProps to disable warning from react ([#518](https://github.com/reactjs/react-tabs/issues/518)) ([dc34bdb](https://github.com/reactjs/react-tabs/commit/dc34bdb68f37b298818bc24ab345ea02e3cb47b9))

## [6.0.0](https://github.com/reactjs/react-tabs/releases/tag/v6.0.0)

### Features

- Remove UMD build and drop support for older browsers ([e4b9867](https://github.com/reactjs/react-tabs/commit/e4b9867107cfc6f040105e48aa7522d2b2fd2701))

### Breaking Changes

- The UMD build has been removed.
- Older browsers are not supported anymore. In particulare Internet Explorer, the default browser on Android < 5.0 and iOS Safari < 12.2
- src folder is not included anymore in the package to reduce package size.

## [5.2.0](https://github.com/reactjs/react-tabs/releases/tag/v5.2.0)

### Features

- Allow disable left right buttons ([#504](https://github.com/reactjs/react-tabs/issues/504)) ([ed49912](https://github.com/reactjs/react-tabs/commit/ed49912cf4581742acb05bd91f78d9613f90f01c))

## [5.1.0](https://github.com/reactjs/react-tabs/releases/tag/v5.1.0)

### Features

- **typescript:** Add new type for custom tabs function components ([#469](https://github.com/reactjs/react-tabs/issues/469)) ([f5a877c](https://github.com/reactjs/react-tabs/commit/f5a877ccfcb72eeecc4c59a43decf2c32daa5253))

## [5.0.0](https://github.com/reactjs/react-tabs/releases/tag/v5.0.0)

This release focus on tackling some long-standing issues with server-side rendering. `react-tabs` now uses some new features from react 18 to fix those issues. The npm package is now ~20% smaller and the UMD builds are also a little bit smaller (production: ~5%, dev: ~30%)

### Features

- Add typescript typings to repo ([4965a39](https://github.com/reactjs/react-tabs/commit/4965a393060bd06bee5462787d896660875609c2))
- Improve output code size and do not package tests ([77d571a](https://github.com/reactjs/react-tabs/commit/77d571a862e8bd0ce4c25c97cf1280164990abb7))
- Minify generated code and don't print comments ([efd6807](https://github.com/reactjs/react-tabs/commit/efd680761aadfbcc621c76a2cc57382eef2f5639))
- Use new `useId` hook from react 18 ([487326c](https://github.com/reactjs/react-tabs/commit/487326c02f5316887dc4b27ac39e6ef69cdd2c03))

### Breaking Changes

- Typescript typings are now part of this package. Please uninstall `@types/react-tabs`
- React version 18 or newer is now required.
- `resetIdCounter` was removed as it is not necessary anymore. Ensure you remove any calls to it from your code.
- The package now does use `Object.assign` directly instead of babel helpers. In older browsers you need to pollyfill `Object.assign` and `Symbol`. `react` itself has the same requirements, see https://reactjs.org/docs/javascript-environment-requirements.html
- Tests are not shipped anymore with the npm package.

## [4.3.0](https://github.com/reactjs/react-tabs/releases/tag/v4.3.0)

### Features

- Add typescript typings to repo ([0cb15ff](https://github.com/reactjs/react-tabs/commit/0cb15ff3f1af78cc119827d958d29b743e834149))
- **typescript:** Add new type for custom tabs function components ([#469](https://github.com/reactjs/react-tabs/issues/469)) ([51b30bb](https://github.com/reactjs/react-tabs/commit/51b30bbe5adffa29eaba99a50eb43f3b413afade))

## [4.2.1](https://github.com/reactjs/react-tabs/releases/tag/v4.2.1)

### Bug Fixes

- Improve minimal performance of code ([58caf6a](https://github.com/reactjs/react-tabs/commit/58caf6a556ad852bb2db4551ddc446c6a666a58d))

## [4.2.0](https://github.com/reactjs/react-tabs/releases/tag/v4.2.0)

### Bug Fixes

- Do not always refocus tab if rerender happens ([4c63bcb](https://github.com/reactjs/react-tabs/commit/4c63bcb057f82de498bbb3325556f6d26064aa8e))

### Features

- New prop to disable focusing tabs on click ([85caf7a](https://github.com/reactjs/react-tabs/commit/85caf7a08ec6c3f04f65356a6b3599aa8fdde1ae))

## [4.1.0](https://github.com/reactjs/react-tabs/releases/tag/v4.1.0)

### Features

- Support react version 18 ([f849c30](https://github.com/reactjs/react-tabs/commit/f849c3025eb43be173b9c07ee831ef279d26beaa))

## [4.0.1](https://github.com/reactjs/react-tabs/releases/tag/v4.0.1)

### Bug Fixes

- Requires React version 16.8 or newer ([397673d](https://github.com/reactjs/react-tabs/commit/397673d17f49d67bc788a5cab206da1f7002cd46))

## [4.0.0](https://github.com/reactjs/react-tabs/releases/tag/v4.0.0)

### Features

- Always set focus on tabs ([4512dad](https://github.com/reactjs/react-tabs/commit/4512dadaeaed3ac0e14fe0f5a2df1baf0ebe5e48)), closes [#272](https://github.com/reactjs/react-tabs/issues/272)
- Updated all the class components to newer functional components ([b2159c9](https://github.com/reactjs/react-tabs/commit/b2159c91b0a8836a25a5cf0c9cd4b57e929ceece))

### Breaking Changes

- The tabs are now instantly focused on click and not just by double-click. The default styling has been adapted for that, so that there is no outline shown anymore on focus.
- Requires react 16.8 or newer

## [3.2.3](https://github.com/reactjs/react-tabs/releases/tag/v3.2.3)

### Bug Fixes

- Change strategy to detect tabs for compatibility with other libraries ([517a056](https://github.com/reactjs/react-tabs/commit/517a0561127558a2f0084296ff81e090000afe83)), closes [#424](https://github.com/reactjs/react-tabs/issues/424)

## [3.2.2](https://github.com/reactjs/react-tabs/releases/tag/v3.2.2)

### Bug Fixes

- Add link to error message about controlled vs uncontrolled ([e50db44](https://github.com/reactjs/react-tabs/commit/e50db44e89a604ef47691b06514e8bff919ea2b4))

## [3.2.1](https://github.com/reactjs/react-tabs/releases/tag/v3.2.1)

### Bug Fixes

- Ensure that initial selected index never goes below 0 ([ba1c5f8](https://github.com/reactjs/react-tabs/commit/ba1c5f8de0091bedaf749619a613496ff7a5c9cd))

## [3.2.0](https://github.com/reactjs/react-tabs/releases/tag/v3.2.0)

### Features

- Add new `environment` prop to handle tabs in iframes ([#365](https://github.com/reactjs/react-tabs/issues/365)) ([d6fd355](https://github.com/reactjs/react-tabs/commit/d6fd355883b532306c178999eb1b323017fa2e6c))
- New prop to disable up/down arrow keys for changing tabs ([#368](https://github.com/reactjs/react-tabs/issues/368)) ([40ea746](https://github.com/reactjs/react-tabs/commit/40ea7462364df038dfa9338bf0b2c91dd050c4fc))

## [3.1.2](https://github.com/reactjs/react-tabs/releases/tag/v3.1.2)

### Bug Fixes

- **deps:** add support for React 17 ([cb8297d](https://github.com/reactjs/react-tabs/commit/cb8297d38c2b42ae14f8f9f4bdaf5a695c28920f))

## [3.1.1](https://github.com/reactjs/react-tabs/releases/tag/v3.1.1)

### Bug Fixes

- Replace classnames with clsx ([a37ca85](https://github.com/reactjs/react-tabs/commit/a37ca85f8dc7caa1def5805f6fdaa1653c1e0cd1))

## [3.1.0](https://github.com/reactjs/react-tabs/releases/tag/v3.1.0)

### Features

- Right to left support ([#311](https://github.com/reactjs/react-tabs/issues/311)) ([f789bbf](https://github.com/reactjs/react-tabs/commit/f789bbf))

## [3.0.0](https://github.com/reactjs/react-tabs/releases/tag/v3.0.0)

### Bug Fixes

- **react:** Fix lifecycle for react 16.3 or newer ([738d9d8](https://github.com/reactjs/react-tabs/commit/738d9d8))
- **tabs:** Handle nodes with parentNode set to undefined instead of null correctly ([83f8780](https://github.com/reactjs/react-tabs/commit/83f8780))

### Breaking Changes

- **react:** Minimum compatible version of react is now 16.3

## [2.3.1](https://github.com/reactjs/react-tabs/releases/tag/v2.3.1)

### Bug Fixes

- **tabs:** Handle nodes with parentNode set to undefined instead of null correctly ([0259616](https://github.com/reactjs/react-tabs/commit/0259616))

## [2.3.0](https://github.com/reactjs/react-tabs/releases/tag/v2.3.0)

### Bug Fixes

- Fix flickering on iphone when touching tabs ([5d608aa](https://github.com/reactjs/react-tabs/commit/5d608aa)), closes [#186](https://github.com/reactjs/react-tabs/issues/186)
- **style:** Correctly fix flash on iOS ([25cfa16](https://github.com/reactjs/react-tabs/commit/25cfa16))

### Features

- Add support for home and end key on tab list ([#246](https://github.com/reactjs/react-tabs/issues/246)) ([8f5cd84](https://github.com/reactjs/react-tabs/commit/8f5cd84))

## [2.2.2](https://github.com/reactjs/react-tabs/releases/tag/v2.2.2)

### Bug Fixes

- **publish:** Compile with latest babel to get rid of react proptype warnings
- **publish:** Added src folder to package ([#232](https://github.com/reactjs/react-tabs/issues/232)) ([a4cc6d0](https://github.com/reactjs/react-tabs/commit/a4cc6d0))

## [2.2.1](https://github.com/reactjs/react-tabs/releases/tag/v2.2.1)

### Bug Fixes

- **tabs:** click wrapper container bubbles up to document causing getAttribute() to throw ([#221](https://github.com/reactjs/react-tabs/issues/221)) ([96b163b](https://github.com/reactjs/react-tabs/commit/96b163b))

## [2.2.0](https://github.com/reactjs/react-tabs/releases/tag/v2.2.0)

### Features

- **tabs:** verify click tabNode using *[role=tab] ([#220](https://github.com/reactjs/react-tabs/issues/220)) ([5bd6bfe](https://github.com/reactjs/react-tabs/commit/5bd6bfe))

## [2.1.1](https://github.com/reactjs/react-tabs/releases/tag/v2.1.1)

### Bug Fixes

- **style:** Fix less and sass to correctly generate tab--disabled class ([b95891e](https://github.com/reactjs/react-tabs/commit/b95891e))

## [2.1.0](https://github.com/reactjs/react-tabs/releases/tag/v2.1.0)

### Bug Fixes

- **tabs:** Correctly handle children of type string ([#211](https://github.com/reactjs/react-tabs/issues/211)) ([6fd4002](https://github.com/reactjs/react-tabs/commit/6fd4002))
- **umd:** Fix the umd builds by switching to rollup ([#212](https://github.com/reactjs/react-tabs/issues/212)) ([46c1a60](https://github.com/reactjs/react-tabs/commit/46c1a60))

### Features

- **dependencies:** Support react 16 ([94447e9](https://github.com/reactjs/react-tabs/commit/94447e9))
- **tablist:** Enable overwriting tabIndex on `<Tab>` and allow tabbing among `<Tab>`s by using tab key and enter/space. ([00a8401](https://github.com/reactjs/react-tabs/commit/00a8401))
- **tabs:** Publish also as ES2015 modules ([41415ab](https://github.com/reactjs/react-tabs/commit/41415ab))
- **tabs:** Add `domRef` prop for getting the ref to the tabs DOM node ([#213](https://github.com/reactjs/react-tabs/issues/213)) ([e989491](https://github.com/reactjs/react-tabs/commit/e989491))

## [2.0.0](https://github.com/reactjs/react-tabs/releases/tag/v2.0.0)

### Bug Fixes

- **tabs:** Fix activeElement check [#193](https://github.com/reactjs/react-tabs/issues/193) ([#194](https://github.com/reactjs/react-tabs/issues/194)) ([722d52f](https://github.com/reactjs/react-tabs/commit/722d52f))

### Features

- **tabs:** Allow for higher order components ([#196](https://github.com/reactjs/react-tabs/issues/196)) ([1969e65](https://github.com/reactjs/react-tabs/commit/1969e65))
- **tabs:** Always callback setSelected. ([#195](https://github.com/reactjs/react-tabs/issues/195)) ([bc1910a](https://github.com/reactjs/react-tabs/commit/bc1910a))

### Breaking Changes

- **tabs:** The `onSelect` callback will now also be called when clicking on the currently active tab.

## [1.1.0](https://github.com/reactjs/react-tabs/releases/tag/v1.1.0)

### New Features

- Add nested TabList and TabPanel support ([#184](https://github.com/reactjs/react-tabs/pull/184)) (Emmet McPoland)

This allows random elements as children for the `<Tabs />` component, for example:

```jsx
<Tabs>
  <div id="tabs-nav-wrapper">
    <button>Left</button>
    <div className="tabs-container">
      <TabList>{tabs}</TabList>
    </div>
    <button>Right</button>
  </div>
  <div className="tab-panels">{tabPanels}</div>
</Tabs>
```

## [1.0.0-alpha.2](https://github.com/reactjs/react-tabs/tree/v1.0.0-alpha.2)

- Fix document access in server environments ([#175](https://github.com/reactjs/react-tabs/pull/175)).
- Lowercase the default CSS class names.

## [1.0.0-alpha.1](https://github.com/reactjs/react-tabs/tree/v1.0.0-alpha.1)

- Introduce controlled and uncontrolled modes and move default styling to a separate stylesheet.
- Rename `activeTabClassName` to `selectedTabClassName` and move it and `disabledTabClassName` to `<Tabs>`.

## [1.0.0](https://github.com/reactjs/react-tabs/releases/tag/v1.0.0)

### Breaking Changes

- Peer dependency for react requires now `^0.14.9` or `^15.3.0`
- `activeTabClassName` moved from `<TabList />` to `<Tabs />` and renamed to `selectedTabClassName`
- `disabledTabClassName` moved from `<TabList />` to `<Tabs />`
- `className` property on all components now overwrites the default classes instead of adding a second class name

```js
// 0.8
<Tabs className="tabs">
    <TabList className="list">
        <Tab className="tab" />
    </TabList>
    <TabPanel className="panel" />
</Tabs>

// Same effect in 1.0
<Tabs className={['tabs', 'react-tabs']}>
    <TabList className={['list', 'react-tabs__tab-list']}>
        <Tab className={['tab', 'react-tabs__tab']} />
    </TabList>
    <TabPanel className={['panel', 'react-tabs__tab-panel']} />
</Tabs>
```

- `selectedIndex` now enables controlled mode, which disables internal management of the active tab. If you were using `selectedIndex` before to set the initial displayed tab use `defaultIndex` now.
- The value `-1` for `selectedIndex` and `defaultIndex` do not activate the first tab anymore, but instead display no tab panel at all. Use `-1` if you want to display only the tabs but have non of them being selected. If you want to have the first tab selected us `0`.
- Support for bower package manager was removed.
- Removed deprecated default export of tabs:

```js
// 0.8
import ReactTabs from 'react-tabs';

<ReactTabs.Tabs></ReactTabs.Tabs>;

// in 1.0
import { Tabs } from 'react-tabs';

<Tabs></Tabs>;
```

- Removed jsstylesheet dependency and removed default style from javascript. If you want to use the default styles you can use one of the supported methods (see [README.md](https://github.com/reactjs/react-tabs#styling))
- The default class names were all lowercased and separated by hyphen, but still follow BEM methodology. E.g. `ReactTabs` -> `react-tabs`, `ReactTabs__TabPanel--selected` -> `react-tabs__tab-panel--selected`
- `<TabPanel />` components do not set the inline style `display: none` anymore. Hidding and showing a tab panel is now completely done via css and classnames. If you have your own style for the tabs make sure to add the following rules:

```css
.react-tabs__tab-panel {
  display: none;
}

.react-tabs__tab-panel--selected {
  display: block;
}
/* If you use custom class names obviously use the class names you set for the tab panels and selected tab panels */
```

### New Features

- New static method to reset the id counter for isomorphic apps. Call this before rendering your application on the server. (#129) (Neehar Venugopal)

```js
import { resetIdCounter } from 'react-tabs';

resetIdCounter();
```

- Allows arbitrary components anywhere inside `<TabList>` (#139) (Alexander Wallin)
- Allow random order of `<TabList />`, `<TabPanel />` and other arbitrary components. The `<TabPanel />` components are matched to the `<Tab />` components in order from top to bottom.

```js
<Tabs>
  <TabPanel />
  <div />
  <TabList>
    <Tab />
    <Tab />
  </TabList>
  <span />
  <TabPanel />
</Tabs>
```

- Introduce controlled and uncontrolled mode. This two modes allow either to control the tabs from your component from the outside or leave the control to the tabs within react-tabs components. (see [README.md](https://github.com/reactjs/react-tabs#controlled-vs-uncontrolled-mode) for more information)
- New prop `selectedTabPanelClassName` on `<Tabs />` to change the class name of the current selected tab panel.
- New prop `defaultIndex` on `<Tabs />` to allow setting the initial displayed tab.
- New prop `forceRender` on `<TabPanel />` to allow force rendering of individual tab panels.
- New prop `selectedClassName` on `<TabPanel />` to allow changing selected class name of individual tab panels.
- New prop `selectedClassName` on `<Tab />` to allow changing selected class name of individual tabs.
- New prop `disabledClassName` on `<Tab />` to allow changing disabled class name of individual tabs.
- Property `className` on all components can now officially take an array as argument.
- PropTypes are now wrapped in `if(process.env.NODE_ENV === 'production') Component.propTypes = { ... }` in order to allow removing of proptypes in production builds.

### Documentation

- Rewrite README.md
- Change ReactDOM.render to render (#163) (Gerard Banasig)
- Add NPM package badge (#164) (Hum4n01d)

### Internal

- Refactor components to use native classes (#134) (LeoAJ)
- Refactor to not use react-dom and remove dependency on it
- Update dependencies
- Rename main.js to index.js
- Update travis versions
- Use prettier (#169)

## [0.8.3](https://github.com/reactjs/react-tabs/releases/tag/v0.8.3)

- Fix deprecation warnings with react 15.5

## [0.8.2](https://github.com/reactjs/react-tabs/tree/v0.8.2)

### Bug Fixes

- Fix UMD build ([#143](https://github.com/reactjs/react-tabs/pull/143))

## [0.8.1](https://github.com/reactjs/react-tabs/tree/v0.8.1)

- Use the correct React global in the UMD build ([#143](https://github.com/reactjs/react-tabs/pull/143)).

## [0.8.0](https://github.com/reactjs/react-tabs/releases/tag/v0.8.0)

- Allow other components inside TabList (#123)

## [0.7.0](https://github.com/reactjs/react-tabs/releases/tag/v0.7.0)

- Feature/add custom active and disabled class (#108)
- Remove aria-expanded attribute (#71)
- Fix warning with react 15.2

## [0.6.2](https://github.com/reactjs/react-tabs/releases/tag/v0.6.2)

- Fix bower bundling (#111, #112)

## [0.6.1](https://github.com/reactjs/react-tabs/releases/tag/v0.6.1)

- Allow setState in onSelect (#51, #110)

## [0.6.0](https://github.com/reactjs/react-tabs/releases/tag/v0.6.0)

- Add a cancel option to tab change event handler (#73)
- DOMNode.setAttribute() expects the second param to be string (#75, #76)
- Allow passing through custom attributes (#93)
- Fix nesting of multiple instances of react-tabs (#103)

## [0.5.5](https://github.com/reactjs/react-tabs/releases/tag/v0.5.5)

- Fix main exports of react tabs which were broken in 0.5.4

## [0.5.4](https://github.com/reactjs/react-tabs/releases/tag/v0.5.4)

- Update to support react 15 (#94)

## [0.5.3](https://github.com/reactjs/react-tabs/tree/v0.5.3)

### Bug Fixes

- use correct spelling of aria-labelledby ([#67](https://github.com/reactjs/react-tabs/pull/67))

## [0.5.2](https://github.com/reactjs/react-tabs/tree/v0.5.2)

### Bug Fixes

- Server Side Rendering won't work with default styles ([#45](https://github.com/reactjs/react-tabs/pull/45))

## [0.5.1](https://github.com/reactjs/react-tabs/tree/v0.5.1)

### Bug Fixes

- Removing ReactDOM from bundle

## [0.5.0](https://github.com/reactjs/react-tabs/tree/v0.5.0)

### Features

- New configuration to disable styling via jss ([#25](https://github.com/reactjs/react-tabs/pull/25))
- Avoid white on white Tab labels ([#40](https://github.com/reactjs/react-tabs/pull/40))
- Support react 0.14 ([#43](https://github.com/reactjs/react-tabs/pull/43))

### Bug Fixes

- Fix conditional rendering of tabs ([#37](https://github.com/reactjs/react-tabs/pull/37))
- Issue when conditionally rendering Tab/TabPanel ([#37](https://github.com/reactjs/react-tabs/pull/37))

## [0.4.1](https://github.com/reactjs/react-tabs/tree/v0.4.1)

### Bug Fixes

- Do not bundle react into dist ([#26](https://github.com/reactjs/react-tabs/pull/26))

## [0.4.0](https://github.com/reactjs/react-tabs/tree/v0.4.0)

### Features

- Support rendering of hidden Tabs ([#28](https://github.com/reactjs/react-tabs/pull/28))
- Support supplying array of child nodes to Tab ([#27](https://github.com/reactjs/react-tabs/pull/27))

## [0.3.0](https://github.com/reactjs/react-tabs/tree/v0.3.0)

### Features

- Support for disabling tabs

## [0.2.1](https://github.com/reactjs/react-tabs/tree/v0.2.1)

### Bug Fixes

- Bower support ([#22](https://github.com/reactjs/react-tabs/pull/22))
- Issue with React being included twice ([#23](https://github.com/reactjs/react-tabs/pull/23))

## [0.2.0](https://github.com/reactjs/react-tabs/tree/v0.2.0)

### Features

- Allowing children of Tab to select Tab ([#9](https://github.com/reactjs/react-tabs/pull/9))
- Only render the selected TabPanel
- Upgrading to React 0.13
- Removing JSX

### Bug Fixes

- Fixing issue with focus management ([#7](https://github.com/reactjs/react-tabs/pull/7))
- Fixing issue caused by no children being provided ([#6](https://github.com/reactjs/react-tabs/pull/6))
- Fixing issue that made dynamic Tabs difficult

## [0.1.2](https://github.com/reactjs/react-tabs/tree/v0.1.2)

### Bug Fixes

- Making Tab and TabPanel to be stateless
- Throwing Error when Tab count and TabPanel count aren't equal

## [0.1.1](https://github.com/reactjs/react-tabs/tree/v0.1.1)

### Bug Fixes

- Fixing warning: Invalid access to component property
- Fixing style weirdness in Firefox

## [0.1.0](https://github.com/reactjs/react-tabs/tree/v0.1.0)

### Features

- Initial release
