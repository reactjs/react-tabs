---
'react-tabs': major
---

`Tab` now uses React's numeric `tabIndex` type. Replace string values such as `<Tab tabIndex="0">Overview</Tab>` with numbers such as `<Tab tabIndex={0}>Overview</Tab>`.

When `tabIndex` is omitted, the selected tab still gets `0`. If there is no selection, the first enabled tab with a matching panel gets `0` so keyboard users can enter the group.
