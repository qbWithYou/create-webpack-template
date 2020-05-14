import fs from 'fs';
import path from 'path';
import { generatePackageFile } from './generatePackageFile';

export function copyStaticFiles({ projectName, preprocessor, gitignore }) {
	const PROJECT_DIRECTORY = path.join(process.env.PWD, projectName);

	const stylesFile = `styles.${preprocessor}`;
	fs.copyFile(
		path.join(__dirname, '..', 'templates', 'styles', stylesFile),
		path.join(PROJECT_DIRECTORY, 'src', 'styles', stylesFile),
		function() {},
	);

	if (gitignore) {
		fs.copyFile(
			path.join(__dirname, '..', 'templates', '.gitignore'),
			path.join(PROJECT_DIRECTORY, '.gitignore'),
			function() {},
		);
	}

	generatePackageFile(projectName);
}
