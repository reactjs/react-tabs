# Migration guide

## v6 to v7

### Match each tab and panel with `itemKey`

**What changed**

v6 matched tabs and panels by render order. v7 matches them by an explicit `itemKey`, so panels can render in a different order from their tabs.

**How to migrate**

Give each `<Tab>` and its `<TabPanel>` the same `itemKey`. Use a unique key per pair within the group. Old indexes work as numeric keys for a fixed list. For a dynamic list, use a stable item ID so the key stays with the item through reordering or removal.

```tsx
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

function AccountTabs() {
  return (
    <Tabs defaultKey={0}>
      <TabList>
        <Tab itemKey={0}>Overview</Tab>
        <Tab itemKey={1}>Billing</Tab>
      </TabList>
      <TabPanel itemKey={0}>Account overview</TabPanel>
      <TabPanel itemKey={1}>Billing settings</TabPanel>
    </Tabs>
  );
}
```

Keys can be nonempty strings or finite numbers. Match the type on both sides, since `1` and `'1'` are different keys. Keep the panel element mounted even if its contents load on demand.

### Account for hidden panels in exit animations

**What changed**

In v6, CSS controlled whether an inactive panel was visible. Inactive panels now get the HTML `hidden` attribute as soon as selection changes, even with `forceRender` or `forceRenderTabPanel`. The default stylesheet no longer sets panel visibility.

**How to migrate**

Check custom panel styles that set `display` so they respect `[hidden]`. For example, apply `display: grid` only to `.my-panel:not([hidden])`.

If you animate an outgoing panel, keep `forceRender` or `forceRenderTabPanel` enabled for its contents and override `display` on that panel's `[hidden]` element only while its exit animation runs. Mark the outgoing panel `inert` during that interval to keep it out of keyboard navigation and the accessibility tree. Remove the display override when the animation ends.

### Replace `defaultIndex` with `defaultKey`

**What changed**

In v6, uncontrolled tabs used `defaultIndex` and selected the first tab when it was omitted. In v7, they require an explicit `defaultKey`.

**How to migrate**

Set `defaultKey` to the `itemKey` of the tab you want to open first. Add it even if you previously omitted `defaultIndex`.

```diff
- <Tabs defaultIndex={1}>
+ <Tabs defaultKey={1}>
```

### Replace `selectedIndex` with `selectedKey`

**What changed**

In v6, `selectedIndex` identified the controlled selection by position. In v7, `selectedKey` identifies it by `itemKey`.

**How to migrate**

Store the active `itemKey` in state, pass it as `selectedKey`, and update it in `onSelect`. If you remove the selected tab, set a replacement key yourself. The group shows no selection while the key is missing.

```diff
- <Tabs selectedIndex={activeIndex} onSelect={setActiveIndex}>
+ <Tabs selectedKey={activeKey} onSelect={setActiveKey}>
```

### Use keys in `onSelect`

**What changed**

The first two `onSelect` arguments changed from the next and previous numeric indexes to the next and previous `itemKey` values.

**How to migrate**

Update handlers that use the arguments as array indexes. For example, replace `tabs[nextIndex]` with `tabs.find((tab) => tab.id === nextKey)` if you use each item's `id` as its `itemKey`. Import `TabKey` from `react-tabs` for explicit TypeScript annotations.

### Use `nativeEvent` when you need a DOM event

**What changed**

v6 declared the `onSelect` event as a DOM `Event`. v7 types user interactions as the React mouse or keyboard events the callback receives at runtime.

**How to migrate**

Let TypeScript infer the event type in your handler. If a helper expects a DOM `Event`, guard against `undefined` and pass `event.nativeEvent`.

### Handle automatic selection when a tab is removed

**What changed**

In v6, removing a tab could shift the selection to another item at the same index. In v7, removing another tab preserves the selected key. If you remove the selected tab from an uncontrolled group, v7 selects the first enabled tab with a matching panel and calls `onSelect` with `undefined` as the event.

**How to migrate**

Check that the event exists before reading it in `onSelect`. Returning `false` still cancels mouse and keyboard selections. The callback reports an automatic replacement after it has already been selected.

### Pass a number for the HTML `tabindex` attribute

**What changed**

`Tab`'s `tabIndex` prop changed from a string in v6 to a number in v7. It sets the HTML `tabindex` attribute, which controls keyboard tab order.

**How to migrate**

Replace string values with numbers. Keep the same numeric value to preserve the tab order.

```diff
- tabIndex="0"
+ tabIndex={0}
```

### Handle `null` in `domRef`

**What changed**

v6 typed the `domRef` argument as an optional `HTMLElement`. v7 types it as `HTMLDivElement | null`, including the `null` React passes on unmount.

**How to migrate**

Check for `null` before using the element. If you annotate the callback parameter, use `HTMLDivElement | null`.

### Remove `tabsRole` assignments

**What changed**

v6 used the `tabsRole` static property to recognize custom wrappers. v7 removed it.

**How to migrate**

Delete assignments such as `CustomTab.tabsRole = 'Tab'`. Render the built-in component inside your wrapper and forward the props it needs, including `itemKey` for tabs and panels.

### Replace `ReactTabsFunctionComponent`

**What changed**

v7 removed the `ReactTabsFunctionComponent` type, which v6 used to describe components with a `tabsRole` static.

**How to migrate**

Remove the type import and annotate your wrapper's props with the type of the component it renders.

```tsx
import { Tab } from 'react-tabs';
import type { TabProps } from 'react-tabs';

function CustomTab(props: TabProps) {
  return <Tab {...props} />;
}
```

### Replace reads of private wrapper props

**What changed**

v6 passed private props such as `selected`, `focus`, and `tabRef` to custom wrappers. In v7, the built-in components get their state from context.

**How to migrate**

Remove reads of those private props. Use `selectedClassName` for styling and let the built-in `Tab` handle focus. If custom logic needs to know which tab is active, read the key from your controlled `Tabs` state.

### Use a type intersection to extend `TabsProps`

**What changed**

`TabsProps` changed from an interface to a union of controlled and uncontrolled props.

**How to migrate**

Replace `interface TrackedTabsProps extends TabsProps` with a type alias that uses `&` to add your own props.

```tsx
import type { TabsProps } from 'react-tabs';

type TrackedTabsProps = TabsProps & { analyticsName: string };
```

### Switch to the ESM package entry point

**What changed**

v6 shipped a CommonJS build and an ESM build for bundlers. v7 ships a single native ES module build and declares its public entry points with `exports`.

**How to migrate**

Import components from `react-tabs`. If you used a deep import from `react-tabs/lib/` or `react-tabs/esm/`, switch to the package root. The documented stylesheet paths, such as `react-tabs/style/react-tabs.css`, still work.

If your CommonJS app calls `require('react-tabs')`, use a Node version with synchronous ESM support, such as Node 22.12 or newer. On older versions, load the package with dynamic `import('react-tabs')`.

### Import types from the package root

**What changed**

v6 shipped an `index.d.ts` at the package root. v7 generates its declarations alongside the ESM build and points TypeScript to them through the package metadata.

**How to migrate**

If you imported `react-tabs/index.d.ts` directly, change the import to `import type { TabsProps } from 'react-tabs'`.
