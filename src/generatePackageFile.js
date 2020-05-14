import fs from 'fs';
import path from 'path';

export function generatePackageFile(projectName) {
	const PROJECT_DIRECTORY = path.join(process.env.PWD, projectName);

	const value = JSON.stringify(
		{
			name: projectName,
			description: '',
			scripts: {
				start: 'webpack-dev-server --open --config webpack.dev.js',
				build: 'webpack --config webpack.prod.js',
			},
			version: "1.0.0",
			author: '',
			license: 'ISC',
			devDependencies: {},
			dependencies: {},
		},
		null,
		4
	);

	fs.writeFile(
		path.join(PROJECT_DIRECTORY, 'package.json'),
		value,
		function() {},
	);
}
