import fs from 'fs';
import path from 'path';

export function copyStaticFiles({
	projectName,
	preprocessor,
	gitignore,
	cssUtil,
}) {
	const PROJECT_DIRECTORY = path.join(process.env.PWD, projectName);

	const stylesFile = `styles.${preprocessor}`;
	if (cssUtil) {
		const cssUtilFile = `${cssUtil}.${preprocessor}`;

		fs.copyFile(
			path.join(__dirname, '..', 'templates', 'styles', cssUtilFile),
			path.join(PROJECT_DIRECTORY, 'src', 'styles', cssUtilFile),
			function() {},
		);

		let fileValue = fs.readFileSync(
			path.join(__dirname, '..', 'templates', 'styles', stylesFile),
			'utf-8',
		);

		let importString;
		switch (preprocessor) {
			case 'scss':
				importString = `@use '${cssUtil}';`;
				break;
			case 'sass':
				importString = `@use '${cssUtil}'`;
				break;
			case 'less':
				importString = `@import '${cssUtil}';`;
				break;
			case 'css':
				importString = `@import '${cssUtil}.css';`;
				break;
		}

		fileValue = `${importString}\n\n` + fileValue;

		fs.writeFileSync(
			path.join(PROJECT_DIRECTORY, 'src', 'styles', stylesFile),
			fileValue,
		);
	} else {
		fs.copyFile(
			path.join(__dirname, '..', 'templates', 'styles', stylesFile),
			path.join(PROJECT_DIRECTORY, 'src', 'styles', stylesFile),
			function() {},
		);
	}

	if (gitignore) {
		fs.copyFile(
			path.join(__dirname, '..', 'templates', '.gitignore'),
			path.join(PROJECT_DIRECTORY, '.gitignore'),
			function() {},
		);
	}
}
