const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

module.exports = {
	mode: 'development',
	entry: __dirname + '/src/entry.js',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist/build'),
	},
	resolve: {
		modules: [
			path.resolve(__dirname, 'src'),
			'node_modules',
		],
	},
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: 'dist',
		publicPath: '',
		host: 'localhost',
		port: '8000',
		compress: false,
		hot: true,
		open: true,
	},
	module: {
		rules: [
			{
				test: /\.s(a|c)ss$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(pug|html)$/,
				use: [
					{
						loader: 'pug-loader',
					}
				]
			},
			{
				test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.webp|\.jpe?g|\.gif$|\.mp4$|\.webm$|\.mp3$/,
				loader: 'file-loader'
			}
		]
	},
	plugins: [
		...generateHtmlPlugins(path.resolve(__dirname, 'src/html/views')),
	]
};

function generateHtmlPlugins(templateDir) {
	const files = fs.readdirSync(templateDir);

	return files.map(file => {
		const parts = file.split('.');
		const name = parts[0];
		const ext = parts[1];

		return new HtmlWebpackPlugin({
			filename: `${name}.html`,
			template: path.resolve(__dirname, `${templateDir}/${name}.${ext}`),
			inject: true,
		});
	});
}
