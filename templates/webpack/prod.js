export function getWebpackProdConfig({ rules, plugins }) {
	return `
		const fs = require('fs');
		const path = require('path');
		const webpack = require('webpack');
		const merge = require('webpack-merge');
		const commonConfig = require('./webpack.common.js');
		const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
		const TerserWebpackPlugin = require('terser-webpack-plugin');
		const MiniCssExtractPlugin = require('mini-css-extract-plugin');
		const { CleanWebpackPlugin } = require('clean-webpack-plugin');
		const HtmlWebpackPlugin = require('html-webpack-plugin');
	
		module.exports = merge(commonConfig, {
			mode: 'production',
			entry: __dirname + '/src/scripts/app.js',
			module: {
				rules: [
					${rules}
				],
			},
			plugins: [
				${plugins}
				new MiniCssExtractPlugin({
					filename: 'styles.[hash].css',
				}),
				new CleanWebpackPlugin({
					verbose: true,
				}),
			],
			optimization: {
				minimizer: [
					new TerserWebpackPlugin({
						terserOptions: {
							compress: {
								drop_console: true,
							},
						},
					}),
					new OptimizeCssAssetsPlugin(),
				]
			}
		});

		function generateHtmlPlugins(templateDir) {
			const files = fs.readdirSync(templateDir);
	
			return files.map(file => {
				const [name, ext] = file.split('.');
	
				return new HtmlWebpackPlugin({
					filename: \`\${name}.html\`,
					template: path.resolve(__dirname, \`\${templateDir}/\${name}.\${ext}\`),
					minify: false,
				});
			});
		}
	`
}
