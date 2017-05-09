# Changelog

### 1.0.0 (May 10, 2017)

#### Breaking Changes

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

<ReactTabs.Tabs></ReactTabs.Tabs>

// in 1.0
import { Tabs } from 'react-tabs';

<Tabs></Tabs>
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

#### New Features

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

#### Documentation

- Rewrite README.md
- Change ReactDOM.render to render (#163) (Gerard Banasig)
- Add NPM package badge (#164) (Hum4n01d)

#### Internal

- Refactor components to use native classes (#134) (LeoAJ)
- Refactor to not use react-dom and remove dependency on it
- Update dependencies
- Rename main.js to index.js
- Update travis versions
- Use prettier (#169)

### 0.8.3 (Apr 19, 2017)

- Fix deprecation warnings with react 15.5

### 0.8.2 (Oct 19, 2016)

- Fix UMD build (#143)

### 0.8.0 (Sep 14, 2016)

- Allow other components inside TabList (#123)

### 0.7.0 (Jul 05, 2016)

- Feature/add custom active and disabled class (#108)
- Remove aria-expanded attribute (#71)
- Fix warning with react 15.2

### 0.6.2 (Jun 24, 2016)

- Fix bower bundling (#111, #112)

### 0.6.1 (Jun 23, 2016)

- Allow setState in onSelect (#51, #110)

### 0.6.0 (Jun 20, 2016)

- Add a cancel option to tab change event handler (#73)
- DOMNode.setAttribute() expects the second param to be string (#75, #76)
- Allow passing through custom attributes (#93)
- Fix nesting of multiple instances of react-tabs (#103)

### 0.5.5 (Jun 13, 2016)

- Fix main exports of react tabs which were broken in 0.5.4

### 0.5.4 (Jun 10, 2016)

- Update to support react 15 (#94)

### 0.5.3 (Feb 01, 2016)

- use correct spelling of aria-labelledby (#67)

### 0.5.2 (Jan 29, 2016)

- Server Side Rendering won't work with default styles (#45)

### 0.5.1 (Oct 22, 2015)

- Removing ReactDOM from bundle

### 0.5.0 (Oct 22, 2015)

- Fix conditional rendering of tabs (#37)
- New configuration to disable styling via jss (#25)
- Avoid white on white Tab labels (#40)
- Support react 0.14 (#43)
- Issue when conditionally rendering Tab/TabPanel (#37)

### 0.4.1 (Sep 09, 2015)

- Do not bundle react into dist (#26)

### 0.4.0 (Aug 18, 2015)

- Support rendering of hidden Tabs (#28)
- Support supplying array of child nodes to Tab (#27)

### 0.3.0 (Aug 11, 2015)

- Support for disabling tabs

### 0.2.1 (Jun 26, 2015)

- Bower support (#22)
- Issue with React being included twice (#23)

### 0.2.0 (Jun 07, 2015)

- Allowing children of Tab to select Tab (#9)
- Only render the selected TabPanel
- Upgrading to React 0.13
- Removing JSX
- Fixing issue with focus management (#7)
- Fixing issue caused by no children being provided (#6)
- Fixing issue that made dynamic Tabs difficult

### 0.1.2 (Jul 23, 2014)

- Making Tab and TabPanel to be stateless
- Throwing Error when Tab count and TabPanel count aren't equal

### 0.1.1 (Jul 19, 2014)

- Fixing warning: Invalid access to component property
- Fixing style weirdness in Firefox

### 0.1.0 (Jul 18, 2014)

- Initial release
