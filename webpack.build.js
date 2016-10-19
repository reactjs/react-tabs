'use strict';

const path = require('path');
const webpack = require('webpack');

let COMPONENT_FILE = 'react-tabs';
const plugins = [];

if (process.env.MINIFY) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
  COMPONENT_FILE += '.min';
}

module.exports = {
  entry: path.join(__dirname, require(path.join(__dirname, 'package.json')).main),
  output: {
    filename: path.join(__dirname, 'dist/' + COMPONENT_FILE + '.js'),
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
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: plugins,
};
