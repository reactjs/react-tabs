---
'react-tabs': major
---

Build `react-tabs` with TypeScript and generate its declarations from source. CommonJS and ESM are still available.

The callback types now match their runtime values. `onSelect` receives a React mouse or keyboard event. Use `event.nativeEvent` when you need the underlying DOM event. `domRef` receives the root `HTMLDivElement` or `null`, so typed callbacks must handle `null` on unmount.
