const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const sourceDirectory = path.resolve(__dirname, 'examples/src');
const targetDirectory = path.resolve(__dirname, 'examples/dist');

const isDev = process.env.NODE_ENV !== 'production';

const plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    inject: true,
    template: path.resolve(__dirname, 'examples/src/index.html'),
    minify: {
      collapseWhitespace: !isDev,
      removeComments: !isDev,
      removeRedundantAttributes: !isDev,
    },
  }),
  new MiniCssExtractPlugin({
    filename: '[name]-[contenthash].css',
    chunkFilename: '[name]-[contenthash].css',
  }),
];

if (!isDev) {
  plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  );
}

module.exports = {
  mode: isDev ? 'development' : 'production',
  context: sourceDirectory,
  entry: {
    app: './app.js',
  },
  output: {
    path: targetDirectory,
    chunkFilename: 'chunk-[chunkhash].js',
    filename: '[name]-[chunkhash].js',
    hashDigestLength: 8,
    publicPath: './',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(less|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
        sideEffects: true,
      },
      {
        test: /\.(png|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
            },
          },
        ],
        sideEffects: true,
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      'react-tabs': path.resolve(__dirname, 'src/index'),
    },
  },
  plugins,
};
