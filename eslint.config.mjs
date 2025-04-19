import babelParser from '@babel/eslint-parser';
import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  js.configs.recommended,
  reactPlugin.configs.flat.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.react,
  jsxA11yPlugin.flatConfigs.recommended,
  prettierRecommended,
  {
    ignores: ['webpack.*', '**/lib', '**/dist', '**/esm'],
  },
  {
    languageOptions: {
      parser: babelParser,

      parserOptions: {
        requireConfigFile: false,
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx'],
        },
      },
    },

    rules: {
      'jsx-a11y/no-static-element-interactions': 'off',

      'import/no-extraneous-dependencies': [
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
      'react/prop-types': 'off',
    },
  },
];
