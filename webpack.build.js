'use strict';

const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let COMPONENT_FILE = 'react-tabs';
const plugins = [];
const babelOptions = {};

if (process.env.MINIFY) {
  plugins.push(new UglifyJsPlugin({ sourceMap: true }));
  plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }));
  COMPONENT_FILE += '.min';

  babelOptions.plugins = [
    function(babel) {
      return {
        visitor: {
          ImportDeclaration(path) {
            // Remove all propType imports in min bundle
            if (
              path.node.source.value.indexOf('helpers/propTypes') > -1 ||
              path.node.source.value === 'prop-types'
            ) {
              path.remove();
            }
          }
        }
      };
    }
  ];
} else {
  plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  }));
}

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: COMPONENT_FILE + '.js',
    path: path.join(__dirname, 'dist'),
    library: 'ReactTabs',
    libraryTarget: 'umd',
  },
  externals: {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'prop-types': {
      root: 'PropTypes',
      commonjs2: 'prop-types',
      commonjs: 'prop-types',
      amd: 'prop-types',
    },
    'classnames': {
      root: 'classNames',
      commonjs2: 'classnames',
      commonjs: 'classnames',
      amd: 'classnames',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: babelOptions,
      },
    ],
  },
  plugins: plugins,
  devtool: 'source-map',
};
