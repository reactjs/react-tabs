---
'react-tabs': major
---

Inactive tab panels now use the HTML `hidden` attribute, so they stay hidden without a stylesheet. `forceRender` and `forceRenderTabPanel` still keep their contents mounted. See the [migration guide](https://github.com/reactjs/react-tabs/blob/main/MIGRATION.md#account-for-hidden-panels-in-exit-animations) for custom styles and exit animations.
