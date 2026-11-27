---
'react-tabs': major
---

Tab and panel state comes from React context. Custom wrappers render the built-in component and forward `itemKey`. Remove the old `tabsRole` assignment and use ordinary React component types in place of `ReactTabsFunctionComponent`.

If your wrapper reads `selected` to apply a CSS class, move that class to the built-in `selectedClassName` prop.

**Before**

```jsx
import { Tab } from 'react-tabs';

function CustomTab({ selected, ...props }) {
  return (
    <Tab
      {...props}
      className={selected ? 'custom-tab is-active' : 'custom-tab'}
    />
  );
}

CustomTab.tabsRole = 'Tab';
```

**After**

```tsx
import { Tab } from 'react-tabs';
import type { TabProps } from 'react-tabs';

function CustomTab(props: TabProps) {
  return (
    <Tab {...props} className="custom-tab" selectedClassName="is-active" />
  );
}
```

The built-in `Tab` applies `is-active` when selected. If your custom UI needs the selection in JavaScript, control `<Tabs>` with `selectedKey` and `onSelect`.
