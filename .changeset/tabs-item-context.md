---
'react-tabs': major
---

Pass tab and panel state through React context. Tabs and panels are still paired by position. Custom wrappers should keep their `tabsRole` and render the built-in component. Wrappers that read private props such as `selected`, `focus`, or `tabRef` will no longer receive those props.

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
import type { ReactTabsFunctionComponent, TabProps } from 'react-tabs';

const CustomTab: ReactTabsFunctionComponent<TabProps> = (props) => (
  <Tab {...props} className="custom-tab" selectedClassName="is-active" />
);

CustomTab.tabsRole = 'Tab';
```

The built-in `Tab` applies `is-active` when selected. If your custom UI needs the selection in JavaScript, control `<Tabs>` with `selectedIndex` and `onSelect` and read that state in your own component.
