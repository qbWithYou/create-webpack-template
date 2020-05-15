const webpack = require('webpack');
const path = require('path');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	mode: 'production',

	entry: __dirname + '/src/entry.js',

	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist/build'),
		publicPath: 'build/'
	},

	resolve: {
		extensions: ['*', '.js'],
		modules: ['./src/scripts', 'node_modules', './src/styles', './src/images', './src/video', './src/audio']
	},

	module: {
		rules: [
			{
				test: /\.s([ac])ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '/'
						}
					},
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.js$/,
				// exclude: /node_modules/, если раскомментировать, то зависимости не будут полифилиться, лучше отключить, если нужно, чтобы работало в IE
				loader: 'babel-loader',
				options: {
					presets: ["@babel/preset-env"]
				}
			},
			{
				test: /\.(pug|html)$/,
				use: [
					{
						loader: 'pug-loader',
						options: {
							pretty: true
						}
					}
				]
			},
			{
				test: /\.worker\.js$/,
				use: { loader: 'worker-loader' }
			},
			{
				test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.webp|\.jpe?g|\.gif$|\.mp4$|\.webm$|\.mp3$/,
				loader: 'file-loader'
			}
		]
	},

	plugins: [
		...generateHtmlPlugins(path.resolve(__dirname, 'src/html/views')),
		new MiniCssExtractPlugin({
			filename: 'styles.css'
		}),
		new CleanWebpackPlugin({
			verbose: true
		}),
		new webpack.EnvironmentPlugin({ NODE_ENV: 'prod' })
	],

	optimization: {
		minimizer: [
			// BundleAnalyzerPlugin(), // Если нужно посмотреть что там по весу
			new TerserWebpackPlugin({
				terserOptions: {
					compress: {
						drop_console: true,
					}
				}
			}),
			new OptimizeCssAssetsPlugin()
		]
	}
};

function generateHtmlPlugins (templateDir) {
	const files = fs.readdirSync(templateDir);

	return files.map(file => {
		const parts = file.split('.');
		const name = parts[0];
		const ext = parts[1];

		return new HtmlWebpackPlugin({
			filename: `../${name}.html`,
			template: path.resolve(__dirname, `${templateDir}/${name}.${ext}`),
			inject: true,
		});
	});
};
