import { exec } from 'child_process';

export class Dependencies {
	dependencies = [
		'webpack',
		'webpack-cli',
		'webpack-merge',
		'webpack-dev-server',
		// '@babel/core',
		// 'babel-loader',
		'file-loader',
		'css-loader',
		'html-loader',
		'style-loader',
		'html-webpack-plugin',
		'clean-webpack-plugin',
		'terser-webpack-plugin',
		'mini-css-extract-plugin',
		'optimize-css-assets-webpack-plugin',
	];
	config;

	constructor(config) {
		this.config = config;
	}

	addDependenciesFromUserChoice() {
		if (/s[ac]ss/.test(this.config.preprocessor)) {
			Array.prototype.push.apply(
				this.dependencies,
				['sass', 'sass-loader'],
			);
		} else if (this.config.preprocessor === 'less') {
			Array.prototype.push.apply(
				this.dependencies,
				['less-loader'],
			);
		}

		if (this.config.usePug) {
			this.dependencies.push('pug-html-loader');
		}
	}

	install() {
		this.addDependenciesFromUserChoice();

		console.log('Installing dependencies');

		exec(
			`cd ${this.config.projectName} && npm install ${
				this.dependencies.join(' ')
			} --save-dev`,
			function(error, stdout, stderr) {
				if (error) {
					console.log(`error: ${error.message}`);
					return;
				}
				if (stderr) {
					console.log(`stderr: ${stderr}`);
					return;
				}
				console.log(stdout);
			},
		);
	}
}
