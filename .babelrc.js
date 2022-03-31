'use strict';

const target = process.env.BABEL_TARGET;
const output = process.env.BABEL_OUTPUT;
const env = process.env.NODE_ENV;
const modules = output == null ? false : output;

const targets = env === 'test' ? { node: 'current' } : undefined;

const options = {
  presets: [['@babel/env', { loose: true, modules, targets }], '@babel/react'],
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
