const path = require('path');

module.exports = {
	entry: __dirname + '/src/scripts/app.js',
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: '[name].[hash].js',
	},
	resolve: {
		modules: [
			'src',
			'node_modules',
		],
	},
	module: {
		rules: [
			{
				test: /.(mp4|webm)$/,
				use: {
					loader: 'file-loader',
					options: {
						outputPath: 'video',
					},
				},
			},
			{
				test: /.(woff|woff2)$/,
				use: {
					loader: 'file-loader',
					options: {
						outputPath: 'fonts',
					},
				},
			},
			{
				test: /.(png|svg|jpe?g|gif|webp)$/,
				use: {
					loader: 'file-loader',
					options: {
						outputPath: 'images',
					},
				},
			},
		],
	},
}
