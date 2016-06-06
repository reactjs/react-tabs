var path = require('path');
var webpack = require('webpack');
var BASE_DIR = process.cwd();
var COMPONENT_FILE = 'react-tabs';
var COMPONENT_NAME = 'ReactTabs';
var plugins = [];

function getPackageMain() {
  return require(path.resolve(BASE_DIR, 'package.json')).main;
}

if (process.env.MINIFY) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
  COMPONENT_FILE += '.min';
}

module.exports = {
  entry: path.resolve(BASE_DIR, getPackageMain()),
  output: {
    filename: path.resolve(BASE_DIR, 'dist/' + COMPONENT_FILE + '.js'),
    library: COMPONENT_NAME,
    libraryTarget: 'umd'
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: plugins
};
