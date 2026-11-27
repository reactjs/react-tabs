import { defineConfig } from 'vitest/config';

export default defineConfig({
  oxc: {
    jsx: { runtime: 'automatic' },
  },
  test: {
    include: ['**/__tests__/**/*-test.js(x)?'],
    environment: 'happy-dom',
    coverage: {
      all: true,
      include: ['src/**'],
      exclude: ['**/__tests__/**'],
      provider: 'v8',
      reporter: ['text', 'lcov'],
    },
  },
});
