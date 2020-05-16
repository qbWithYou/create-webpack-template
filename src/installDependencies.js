import { exec } from 'child_process';

export function installDependencies({ projectName, preprocessor, usePug }) {
	const dependencies = [
		'webpack',
		'webpack-cli',
		'webpack-dev-server',
		'@babel/core',
		'babel-loader',
		'file-loader',
		'css-loader',
		'html-loader',
		'style-loader',
		'html-webpack-plugin',
		'terser-webpack-plugin',
		'clean-webpack-plugin',
	];

	if (/s[ac]ss/.test(preprocessor)) {
		Array.prototype.push.apply(
			dependencies,
			['sass', 'sass-loader'],
		);
	} else if (preprocessor === 'less') {
		Array.prototype.push.apply(
			dependencies,
			['less-loader'],
		);
	}

	if (usePug) {
		dependencies.push('pug-html-loader');
	}

	console.log('Installing dependencies');

	exec(
		`cd ${projectName} && npm install ${dependencies.join(' ')} --save-dev`,
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
