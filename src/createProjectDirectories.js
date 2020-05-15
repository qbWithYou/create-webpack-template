import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const USER_CURRENT_LOCATION = process.env.PWD;

const directoriesConfig = [
	{
		name: 'src',
		children: [
			{
				name: 'src/assets',
				children: [
					{
						name: 'src/assets/fonts',
					},
					{
						name: 'src/assets/images',
					},
				],
			},
			{
				name: 'src/scripts',
			},
			{
				name: 'src/styles',
			},
			{
				name: 'src/markup',
			},
		],
	},
	{
		name: 'public',
	},
];

export function createProjectDirectories(projectName) {
	// Создаём папку с проектом
	fs.mkdirSync(path.join(USER_CURRENT_LOCATION, projectName));

	createInnerDirectories(directoriesConfig, projectName);
}

// Создаём внутренние папки
function createInnerDirectories(directories, projectName) {
	directories.forEach(directory => {
		fs.mkdirSync(
			path.join(
				USER_CURRENT_LOCATION,
				projectName,
				directory.name
			),
		);

		if (directory.children) {
			createInnerDirectories(directory.children, projectName);
		}
	});
}
