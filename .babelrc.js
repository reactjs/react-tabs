'use strict';

const target = process.env.BABEL_TARGET;
const output = process.env.BABEL_OUTPUT;
const env = process.env.NODE_ENV;
const modules = output == null ? false : output;

const targets = env === 'test' ? { node: 'current' } : undefined;

const options = {
  comments: false,
  minified: true,
  assumptions: {
    ignoreToPrimitiveHint: true,
    iterableIsArray: true,
    mutableTemplateObject: true,
    noNewArrows: true,
    objectRestNoSymbols: true,
    setComputedProperties: true,
    setSpreadProperties: true,
  },
  presets: [
    [
      '@babel/env',
      {
        loose: true,
        modules,
        targets,
        corejs: '3',
        useBuiltIns: 'entry',
      },
    ],
    ['@babel/react', { useBuiltIns: true }],
  ],
  plugins: [],
};

if (target === 'examples') {
  options.plugins.push([
    'transform-react-remove-prop-types',
    { removeImport: true },
  ]);
} else if (env !== 'test') {
  options.plugins.push(['transform-react-remove-prop-types', { mode: 'wrap' }]);
}

module.exports = options;
