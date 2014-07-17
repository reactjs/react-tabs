module.exports = {
	entry: './example/main.js',
	output: {
		filename: './build/react-tabs.js'
	},
	module: {
		loaders: [
			{test: /\.js$/, loader: 'jsx-loader'}
		]
	}
};
