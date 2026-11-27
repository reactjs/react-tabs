# react-tabs [![npm version](https://img.shields.io/npm/v/react-tabs.svg)](https://www.npmjs.com/package/react-tabs) [![Coverage Status](https://coveralls.io/repos/github/reactjs/react-tabs/badge.svg?branch=main)](https://coveralls.io/github/reactjs/react-tabs?branch=main)

An accessible and easy tab component for ReactJS.

https://reactcommunity.org/react-tabs/

> Version 5 or newer of `react-tabs` needs react version 18 or newer
>
> Version 4 of `react-tabs` needs react version 16.8 or newer

<ins><blockquote class="rich-diff-level-zero"> <p class="rich-diff-level-one">react-tabs was tested on real mobile devices and browsers with<br>
<img src="./examples/src/images/Browserstack-logo.svg" height="50" alt="Browserstack">

</p> </blockquote></ins>

## Installing

```bash
yarn add react-tabs
```

or

```bash
npm install --save react-tabs
```

## Compatibility (December 2026)

`react-tabs` supports React 18 and 19.

### Browsers

`react-tabs` targets the current and previous stable releases of Chrome, Edge, Firefox, and Safari on desktop, Chrome on Android, and Safari on iOS. Firefox ESR is also supported.

The npm package ships ES2020 JavaScript as native ESM. The table shows the earliest versions that can parse the optional chaining (`?.`) and nullish coalescing (`??`) used in the published code. [Optional chaining support](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining#browser_compatibility) · [Nullish coalescing support](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing#browser_compatibility)

| Browser                       | Earliest version that parses the published syntax | Released                                                                                                       |
| ----------------------------- | ------------------------------------------------: | -------------------------------------------------------------------------------------------------------------- |
| Chrome on desktop and Android |                                                80 | [February 2020](https://chromereleases.googleblog.com/2020/02/stable-channel-update-for-desktop.html)          |
| Edge                          |                                                80 | [February 2020](https://learn.microsoft.com/en-us/deployedge/microsoft-edge-relnotes-security#february-7-2020) |
| Firefox                       |                                                74 | [March 2020](https://www.firefox.com/en-US/firefox/74.0/releasenotes/)                                         |
| Safari on macOS               |                                              13.1 | [March 2020](https://developer.apple.com/documentation/safari-release-notes)                                   |
| Safari on iOS                 |                                              13.4 | [March 2020](https://support.apple.com/en-ca/103828)                                                           |

These browser versions are roughly seven years old as of December 2026.

The library also uses `Element.closest()` for tab navigation and `MutationObserver` to track changes to tabs and panels. Both are available in the versions above, and the default CSS adds no newer browser requirement. [Element.closest() support](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#browser_compatibility) · [MutationObserver support](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver#browser_compatibility)

These versions describe the package's feature requirements. Your React renderer and application build can set a higher minimum. A browser build tool also needs to resolve the package's React and `clsx` imports and handle `process.env.NODE_ENV`.

### Server-side rendering

Use the latest patch of Node.js **22.x**, **24.x**, or **26.x**. These are the supported [Node.js LTS release lines](https://nodejs.org/en/about/previous-releases) as of December 2026.

Load the package with `import`. CommonJS servers can use `require('react-tabs')` on Node.js 22.12 and later, which can load [synchronous ES modules](https://nodejs.org/api/modules.html#loading-ecmascript-modules-using-require).

## Basic Example

`react-tabs` ships as native ESM. Import components from `react-tabs` and stylesheets from `react-tabs/style/`. See the [migration guide](MIGRATION.md#switch-to-the-esm-package-entry-point) for CommonJS consumers.

```js
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default () => (
  <Tabs defaultKey="overview">
    <TabList>
      <Tab itemKey="overview">Overview</Tab>
      <Tab itemKey="details">Details</Tab>
    </TabList>

    <TabPanel itemKey="overview">
      <h2>Any content 1</h2>
    </TabPanel>
    <TabPanel itemKey="details">
      <h2>Any content 2</h2>
    </TabPanel>
  </Tabs>
);
```

## API

## Components

Each group uses one `TabList`. Every `Tab` in the list needs a `TabPanel` with the same `itemKey`. Panels can be rendered in a different order from the tabs.

### &lt;Tabs /&gt;

If you specify additional props on the `<Tabs />` component they will be forwarded to the rendered `<div />`.

#### className: `string | Array<string> | { [string]: boolean }`

> default: `"react-tabs"`

Provide a custom class name for the outer `<div />` of the tabs.

> You can also supply an array of class names or an object where the class names are the key and the value is a boolean indicating if the name should be added. See the docs of [classnames](https://github.com/JedWatson/classnames#usage) on how to supply different class names.

#### defaultFocus: `boolean`

> default: `false`

If set to `true` the tabs will be focused on initial render. This allows immediate use of keyboard keys to switch tabs after the first render.

#### defaultKey: `TabKey`

Required in uncontrolled mode. Use the key of the tab to select on the initial render. Set either `defaultKey` or `selectedKey` for each group.

#### direction: `string`

> default: `"ltr"`

Provide the direction of the component, can be either rtl or ltr.

#### disabledTabClassName: `string`

> default: `"react-tabs__tab--disabled"`

Provide a custom class name for disabled tabs.

> This option can also be set directly at the `<Tab />` component.

#### disableUpDownKeys: `bool`

> default: `false`

Disable up & down arrow keys to change tabs.

#### domRef: `(node: HTMLDivElement | null) => void`

> default: `null`

Register a callback that will receive the underlying DOM node for every mount. It will also receive null on unmount.

#### environment: `Window`

If you're rendering `react-tabs` within a different `window` context than the default one; for example, an iframe.

#### focusTabOnClick: `boolean`

> default: `true`

By default the tab that is clicked will also be focused in the DOM. If set to `false` the tab will not be focused anymore.

> Be aware that keyboard navigation will not work after click if set to false. Though one can still focus the tabs by pressing `tab` and then keyboard navigation will work.

#### forceRenderTabPanel: `boolean`

> default: `false`

Panel elements stay mounted. By default only the selected panel renders its contents. Set this to `true` to keep all panel contents mounted.

> This can also be enabled for each individual `<TabPanel />` component with its prop `forceRender`.

#### onSelect: `(nextKey: TabKey, previousKey: TabKey, event: TabEvent | undefined) => boolean | void`

Called before a mouse or keyboard selection, including when a user activates the current tab. Return `false` to cancel the selection. The event is a React mouse or keyboard event.

If an uncontrolled group loses the selected tab, the first enabled tab with a matching panel becomes selected. The callback fires once after that selection is applied, with `event` set to `undefined`. The return value has no effect on automatic recovery. If no replacement is available, the group waits until one appears.

#### selectedKey: `TabKey`

Required in controlled mode along with `onSelect`. Set this to the key of the selected tab. If the key has no matching pair, the group shows no selection and gives the first enabled pair the default keyboard entry point.

#### selectedTabClassName: `string`

> default: `"react-tabs__tab--selected"`

Provide a custom class name for the active tab.

> This option can also be set directly at the `<Tab />` component.

#### selectedTabPanelClassName: `string`

> default: `"react-tabs__tab-panel--selected"`

Provide a custom class name for the active tab panel.

> This option can also be set directly at the `<TabPanel />` component.

### &lt;TabList /&gt;

If you specify additional props on the `<TabList />` component they will be forwarded to the rendered `<ul />`.

#### className: `string | Array<string> | { [string]: boolean }`

> default: `"react-tabs__tab-list"`

Provide a custom class name for the `<ul />`.

> You can also supply an array of class names or an object where the class names are the key and the value is a boolean indicating if the name should be added. See the docs of [classnames](https://github.com/JedWatson/classnames#usage) on how to supply different class names.

### &lt;Tab /&gt;

If you specify additional props on the `<Tab />` component they will be forwarded to the rendered `<li />`.

#### itemKey: `TabKey`

Required. Use a nonempty string or finite number that identifies this tab within its group. Give the corresponding panel the same key. For dynamic lists, keep the key attached to the item when it moves. The number `1` and the string `'1'` are distinct keys.

#### className: `string | Array<string> | { [string]: boolean }`

> default: `"react-tabs__tab"`

Provide a custom class name for the `<li />`.

> You can also supply an array of class names or an object where the class names are the key and the value is a boolean indicating if the name should be added. See the docs of [classnames](https://github.com/JedWatson/classnames#usage) on how to supply different class names.

#### disabled: `boolean`

> default: `false`

Disable this tab which will make it not do anything when clicked. Also a disabled class name will be added (see `disabledClassName`)

#### disabledClassName: `string`

> default: `"react-tabs__tab--disabled"`

Provide a custom class name for disabled tabs.

> This option can also be set for all `<Tab />` components with the prop `disabledTabClassName` on `<Tabs />`.

#### selectedClassName: `string`

> default: `"react-tabs__tab--selected"`

Provide a custom class name for the active tab.

> This option can also be set for all `<Tab />` components with the prop `selectedTabClassName` on `<Tabs />`.

#### tabIndex: `number`

> default: `0` for the selected tab. If there is no selection, the first enabled tab with a matching panel gets `0`. Other tabs omit the attribute.

Overrides the tab's position in the keyboard tab order. Use `tabIndex={0}` to include a tab in the tab order or `tabIndex={-1}` to leave it out while keeping it programmatically focusable.

### &lt;TabPanel /&gt;

If you specify additional props on the `<TabPanel />` component they will be forwarded to the rendered `<div />`.

#### itemKey: `TabKey`

Required. Use the same key as exactly one `Tab` in the same group. Keep the panel element mounted when its contents load on demand so the tab's ARIA link has a target.

#### className: `string | Array<string> | { [string]: boolean }`

> default: `"react-tabs__tab-panel"`

Provide a custom class name for the `<div />` containing the tab content.

> You can also supply an array of class names or an object where the class names are the key and the value is a boolean indicating if the name should be added. See the docs of [classnames](https://github.com/JedWatson/classnames#usage) on how to supply different class names.

#### forceRender: `boolean`

> default: `false`

By default the panel renders its contents when selected. Set this to `true` to keep the contents mounted while inactive.

> This can also be enabled for all `<TabPanel />` components with the prop `forceRenderTabPanel` on `<Tabs />`.

#### selectedClassName: `string`

> default: `"react-tabs__tab-panel--selected"`

Provide a custom class name for the active tab panel.

> This option can also be set for all `<TabPanel />` components with the prop `selectedTabPanelClassName` on `<Tabs />`.

## Controlled vs Uncontrolled mode

### Uncontrolled mode

Set `defaultKey` to the initial selection. The group manages selection after that. You can listen for changes with `onSelect`. See the [basic example](#basic-example).

### Controlled mode

Set `selectedKey` and update it from `onSelect`. Use controlled mode when other parts of your app need to set the selection, such as routing or removing the currently selected item.

```jsx
import { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

function AccountTabs() {
  const [selectedKey, setSelectedKey] = useState('overview');

  return (
    <Tabs selectedKey={selectedKey} onSelect={setSelectedKey}>
      <TabList>
        <Tab itemKey="overview">Overview</Tab>
        <Tab itemKey="billing">Billing</Tab>
      </TabList>
      <TabPanel itemKey="overview">Account overview</TabPanel>
      <TabPanel itemKey="billing">Billing settings</TabPanel>
    </Tabs>
  );
}
```

## Styling

react-tabs does not include any style loading by default. Default stylesheets are provided and can be included in your application if desired.

### Webpack

When using webpack and an appropriate loader (`css-loader`, `sass-loader`, `less-loader` or `style-loader`) you can simply import the default stylesheet.

```js
import 'react-tabs/style/react-tabs.css';
// or
import 'react-tabs/style/react-tabs.scss';
// or
import 'react-tabs/style/react-tabs.less';
```

### SASS

When using SASS you can easily import the default styles

```scss
@import '../../path/to/node_modules/react-tabs/style/react-tabs.scss';
```

### LESS

When using LESS you can easily import the default styles

```scss
@import '../../path/to/node_modules/react-tabs/style/react-tabs.less';
```

### Custom Style

You can also always just simply copy the default style to your own css/scss/less and modify it to your own needs. The changelog will always tell you when classes change and we also consider changes that break the styling as semver major.

### Custom Components

Render the built-in component in your wrapper, forwarding `itemKey` and the other public props your wrapper accepts.

```tsx
import { Tab } from 'react-tabs';
import type { TabProps } from 'react-tabs';

function CustomTab({ children, ...props }: TabProps) {
  return (
    <Tab {...props}>
      <strong>{children}</strong>
    </Tab>
  );
}
```

## Contributing

Include a [changeset](.changeset/README.md) with changes that should ship in a new release.

## License

MIT
