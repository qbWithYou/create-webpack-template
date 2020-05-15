export function getWebpackDevConfig({ rules }) {
	return `
		const webpack = require('webpack');
		const path = require('path');
		const HtmlWebpackPlugin = require('html-webpack-plugin');
		const fs = require('fs');
	
		module.exports = {
			mode: 'development',
			entry: __dirname + '/src/scripts/app.js',
			output: {
				filename: 'index.js',
				path: path.resolve(__dirname, 'public'),
			},
			resolve: {
				modules: [
					path.resolve(__dirname, 'src'),
					'node_modules',
				],
			},
			devtool: 'cheap-module-eval-source-map',
			devServer: {
				contentBase: 'public',
				publicPath: '',
				host: 'localhost',
				port: '8000',
				compress: false,
				hot: true,
				open: true,
			},
			module: {
				rules: [
					${rules}
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
				new HtmlWebpackPlugin(),
				//...generateHtmlPlugins(path.resolve(__dirname, 'src/markup')),
				//new webpack.HotModuleReplacementPlugin(),
			]
		};
	
		function generateHtmlPlugins(templateDir) {
			const files = fs.readdirSync(templateDir);
	
			return files.map(file => {
				const parts = file.split('.');
				const name = parts[0];
				const ext = parts[1];
	
				return new HtmlWebpackPlugin({
					filename: \`\${name}.html\`,
					template: path.resolve(__dirname, \`\${templateDir}/\${name}.\${ext}\`),
					inject: true,
				});
			});
		}
	`
}
