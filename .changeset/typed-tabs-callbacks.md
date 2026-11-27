---
'react-tabs': major
---

Build `react-tabs` with TypeScript and generate its declarations from source. CommonJS and ESM are still available.

The callback types now match their runtime values. For user interactions, `onSelect` receives a React mouse or keyboard event. Use `event.nativeEvent` for the underlying DOM event. Automatic recovery in an uncontrolled group reports an undefined event. `domRef` receives the root `HTMLDivElement` or `null`, so typed callbacks must handle `null` on unmount.
