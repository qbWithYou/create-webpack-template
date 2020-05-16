import fs from 'fs';
import path from 'path';

const USER_CURRENT_LOCATION = process.env.PWD;

const directories = [
	'src',
	'src/assets',
	'src/assets/fonts',
	'src/assets/images',
	'src/scripts',
	'src/styles',
	'src/markup',
	'public',
];

export function createProjectDirectories({ projectName, usePug }) {

	if (usePug) {
		Array.prototype.push.apply(
			directories,
			['src/markup/views', 'src/markup/templates',]
		);
	}

	// Создаём папку с проектом
	fs.mkdirSync(path.join(USER_CURRENT_LOCATION, projectName));

	createInnerDirectories(projectName);
}

// Создаём внутренние папки
function createInnerDirectories(projectName) {
	directories.forEach(directory => {
		fs.mkdirSync(
			path.join(
				USER_CURRENT_LOCATION,
				projectName,
				directory
			),
		);
	});
}
