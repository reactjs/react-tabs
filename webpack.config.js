var webpack = require('webpack');

var order = new webpack.optimize.OccurrenceOrderPlugin();
var dedupe = new webpack.optimize.DedupePlugin();
var ugly = new webpack.optimize.UglifyJsPlugin();

module.exports = {
	entry: './example/main.js',
	output: {
		filename: './build/bundle.js'
	},
	module: {
		loaders: [
			{test: /\.js$/, loader: 'jsx-loader'}
		]
	},
	plugins: [
	    order,
	    dedupe,
		ugly
	]
};
