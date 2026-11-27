import reactPlugin from '@eslint-react/eslint-plugin';
import js from '@eslint/js';
import importPlugin, { createNodeResolver } from 'eslint-plugin-import-x';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y-x';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
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
    files: ['src/components/Tabs.jsx'],
    languageOptions: { globals: { process: 'readonly' } },
  },
  {
    files: ['src/components/UncontrolledTabs.jsx'],
    languageOptions: { globals: { window: 'readonly' } },
  },
  {
    files: ['src/**/__tests__/**/*.{js,jsx}'],
    languageOptions: { globals: { console: 'readonly' } },
  },
  {
    files: [
      'src/components/UncontrolledTabs.jsx',
      'src/helpers/childrenDeepMap.js',
    ],
    rules: {
      // Tab selection and focus are passed through to caller-provided elements.
      '@eslint-react/no-clone-element': 'off',
    },
  },
  {
    files: ['src/helpers/childrenDeepMap.js'],
    rules: {
      // React.Children handles the children shapes accepted by Tabs.
      '@eslint-react/no-children-map': 'off',
      '@eslint-react/no-children-for-each': 'off',
    },
  },
  {
    settings: {
      'import-x/resolver-next': [
        createNodeResolver({ extensions: ['.js', '.jsx'] }),
      ],
    },

    rules: {
      '@eslint-react/dom-no-unsafe-target-blank': 'error',

      'jsx-a11y-x/no-static-element-interactions': 'off',

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
  prettierRecommended,
];
