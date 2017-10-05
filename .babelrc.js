'use strict';

const target = process.env.BABEL_TARGET;
const modules = target === 'rollup' ? false : 'commonjs';

const options = {
  presets: [['env', { loose: true, modules }], 'react'],
  plugins: ['transform-object-rest-spread', ['transform-class-properties', { loose: true }]],
};

if (target === 'rollup') {
  options.plugins.push('external-helpers');
} else {
  options.plugins.push(['transform-react-remove-prop-types', { mode: 'wrap' }]);
}

module.exports = options;
