export function getWebpackDevConfig({ rules, plugins }) {
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
				path: path.resolve(__dirname, 'public/build'),
			},
			resolve: {
				modules: [
					path.resolve(__dirname, 'src'),
					'node_modules',
				],
			},
			devtool: 'cheap-module-eval-source-map',
			devServer: {
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
						test: /\.(mp4|webm)$/,
						use: {
							loader: 'file-loader',
							options: {
								outputPath: 'images',
							},
						},
					},
					{
						test: /\.(woff|woff2)$/,
						use: {
							loader: 'file-loader',
							options: {
								outputPath: 'fonts',
							},
						},
					},
					{
						test: /\.(png|svg|jpe?g|gif|webp)$/,
						use: {
							loader: 'file-loader',
							options: {
								outputPath: 'images',
							},
						},
					},
				]
			},
			plugins: [
				${plugins}
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
