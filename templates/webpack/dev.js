export function getWebpackDevConfig({ rules, plugins }) {
	return `
		const fs = require('fs');
		const path = require('path');
		const webpack = require('webpack');
		const { merge } = require('webpack-merge');
		const commonConfig = require('./webpack.common.js');
		const HtmlWebpackPlugin = require('html-webpack-plugin');

		module.exports = merge(commonConfig, {
			mode: 'development',
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
				],
			},
			plugins: [
				${plugins}
			],
		});
	
		function generateHtmlPlugins(templateDir) {
			const files = fs.readdirSync(templateDir);
	
			return files.map(file => {
				const [name, ext] = file.split('.');
	
				return new HtmlWebpackPlugin({
					filename: \`\${name}.html\`,
					template: path.resolve(__dirname, \`\${templateDir}/\${name}.\${ext}\`),
				});
			});
		}
	`
}
