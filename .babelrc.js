'use strict';

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
        bugfixes: true,
        loose: true,
        modules,
        targets,
        corejs: '3',
        useBuiltIns: 'entry',
      },
    ],
    ['@babel/react', { runtime: 'automatic' }],
  ],
  plugins: [],
};

if (env !== 'test') {
  options.plugins.push(['transform-react-remove-prop-types', { mode: 'wrap' }]);
}

module.exports = options;
