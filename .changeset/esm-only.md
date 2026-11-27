---
'react-tabs': major
---

`react-tabs` now ships a single native ES module build. Import components from `react-tabs` and stylesheets from `react-tabs/style/`. Replace deep imports from `react-tabs/lib/` or `react-tabs/esm/` with imports from the package root.

If your CommonJS app uses `require('react-tabs')`, use a Node version with synchronous ESM support, such as Node 22.12 or newer, or load the package with dynamic `import()`.
