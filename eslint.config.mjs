import reactPlugin from '@eslint-react/eslint-plugin';
import js from '@eslint/js';
import importPlugin, { createNodeResolver } from 'eslint-plugin-import-x';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y-x';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
  js.configs.recommended,
  reactPlugin.configs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.react,
  jsxA11yPlugin.configs.recommended,
  {
    ignores: ['webpack.*', '**/lib', '**/dist', '**/esm'],
  },
  {
    files: ['src/**/*.jsx'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
  },
  {
    files: ['src/components/Tabs.tsx'],
    languageOptions: { globals: { process: 'readonly' } },
  },
  {
    files: ['src/components/UncontrolledTabs.tsx'],
    languageOptions: { globals: { window: 'readonly' } },
  },
  {
    files: ['src/**/__tests__/**/*.{js,jsx}'],
    languageOptions: { globals: { console: 'readonly' } },
  },
  {
    files: [
      'src/components/UncontrolledTabs.tsx',
      'src/helpers/childrenDeepMap.ts',
    ],
    rules: {
      // Preserve caller-provided wrappers while replacing their children.
      '@eslint-react/no-clone-element': 'off',
    },
  },
  {
    files: ['src/helpers/childrenDeepMap.ts'],
    rules: {
      // React.Children handles the children shapes accepted by Tabs.
      '@eslint-react/no-children-map': 'off',
      '@eslint-react/no-children-for-each': 'off',
    },
  },
  {
    settings: {
      // Lint against the oldest supported React version.
      'react-x': { version: '18.0.0' },
      'import-x/resolver-next': [
        createNodeResolver({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
      ],
    },

    rules: {
      '@eslint-react/dom-no-unsafe-target-blank': 'error',

      'jsx-a11y-x/no-static-element-interactions': 'off',

      'import-x/no-duplicates': ['error', { 'prefer-inline': true }],

      'import-x/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/__tests__/**/*',
            'examples/src/**/*.js',
            'rollup.config.js',
            'webpack.config.js',
          ],

          optionalDependencies: false,
        },
      ],

      'no-unused-vars': [
        'error',
        {
          ignoreRestSiblings: true,
        },
      ],

      'no-console': 'error',
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [
      importPlugin.flatConfigs.typescript,
      tseslint.configs.recommended,
    ],
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { ignoreRestSiblings: true },
      ],
    },
  },
  prettierRecommended,
]);
