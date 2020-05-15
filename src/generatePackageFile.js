import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

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

	return promisify(fs.writeFile)(
		path.join(PROJECT_DIRECTORY, 'package.json'),
		value,
	);
}
