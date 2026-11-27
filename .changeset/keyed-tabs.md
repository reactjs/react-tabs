---
'react-tabs': major
---

Tabs and panels now pair by a shared `itemKey` instead of their positions. The key can be a string or a finite number. Give each item a stable key so selection survives reorder, insertion, and removal of another tab. Keyboard navigation still follows the tab list's rendered order.

For uncontrolled tabs, replace `defaultIndex` with `defaultKey`. An explicit initial key is required, even if you previously relied on the first tab being selected automatically.

```tsx
<Tabs defaultKey={0}>
  <TabList>
    <Tab itemKey={0}>Overview</Tab>
    <Tab itemKey={1}>Billing</Tab>
  </TabList>
  <TabPanel itemKey={0}>Overview content</TabPanel>
  <TabPanel itemKey={1}>Billing content</TabPanel>
</Tabs>
```

For controlled tabs, replace `selectedIndex={index}` with `selectedKey={key}`. Keep `onSelect`, but update handlers to receive keys instead of positions. For example, use `<Tabs selectedKey={selectedKey} onSelect={setSelectedKey}>` and give the matching tab and panel the same key. TypeScript state can use the exported `TabKey` type.

If an uncontrolled selection disappears, the group selects the first enabled tab with a matching panel and calls `onSelect` with an undefined event. Controlled callers choose their own replacement. Returning `false` still cancels mouse and keyboard selections.

`TabsProps` is now a union. If your TypeScript wrapper used `interface CustomProps extends TabsProps`, use `type CustomProps = TabsProps & { … }` instead.
