import fs from 'fs';
import path from 'path';

export class TemplateDirectories {
	directories = [
		'src',
		'src/assets',
		'src/assets/fonts',
		'src/assets/images',
		'src/scripts',
		'src/styles',
		'src/markup',
		'public',
	];
	config;

	constructor(config) {
		this.config = config;

		if (this.config.usePug) {
			Array.prototype.push.apply(
				this.directories,
				['src/markup/views', 'src/markup/templates',]
			);
		}
	}

	createDirectories() {
		this.createMainProjectDirectory();
		this.createProjectInnerDirectories();
	}

	createMainProjectDirectory() {
		fs.mkdirSync(
			path.join(process.env.PWD, this.config.projectName)
		);
	}

	createProjectInnerDirectories() {
		this.directories.forEach(directory => {
			fs.mkdirSync(
				path.join(
					process.env.PWD,
					this.config.projectName,
					directory
				),
			);
		});
	}
}
