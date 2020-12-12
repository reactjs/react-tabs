'use strict';

const target = process.env.BABEL_TARGET;
const output = process.env.BABEL_OUTPUT;
const modules = output == null ? false : output;

const options = {
  presets: [['@babel/env', { loose: true, modules }], '@babel/react'],
  plugins: [
    ['@babel/proposal-class-properties', { loose: true }],
  ],
};

if (target === 'examples') {
  options.plugins.push([
    'transform-react-remove-prop-types',
    { removeImport: true },
  ]);
} else {
  options.plugins.push(['transform-react-remove-prop-types', { mode: 'wrap' }]);
}

module.exports = options;
