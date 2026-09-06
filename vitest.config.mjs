import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/__tests__/**/*-test.js(x)?'],
    environment: 'jsdom',
    coverage: {
      all: true,
      include: ['src/**'],
      exclude: ['**/__tests__/**'],
      provider: 'v8',
      reporter: ['text', 'lcov'],
    },
  },
});
