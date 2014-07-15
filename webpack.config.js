module.exports = {
	entry: './example/main.js',
	output: {
		filename: './example/bundle.js'
	},
	module: {
		loaders: [
			{test: /\.js$/, loader: 'jsx-loader'}
		]
	}
};
