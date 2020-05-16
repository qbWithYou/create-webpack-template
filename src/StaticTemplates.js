import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const copyFile = promisify(fs.copyFile);
const writeFile = promisify(fs.writeFile);

export class StaticTemplates {
	projectDir;
	config;

	constructor(config) {
		this.config = config;
		this.projectDir = path.join(process.env.PWD, config.projectName);
	}

	checkConfigAndCopyFiles() {
		const tasks = [
			this.copyScriptTemplate(),
			this.copyImage(),
		];

		if (this.config.cssUtil) {
			tasks.push(this.copyStylesTemplateWithCssUtil());
		} else {
			tasks.push(this.copyStylesTemplate());
		}

		if (this.config.gitignore) {
			tasks.push(this.copyGitIgnore());
		}

		if (this.config.usePug) {
			tasks.push(this.copyPugTemplate());
		} else {
			tasks.push(this.copyHtmlTemplate());
		}

		return Promise.all(tasks);
	}

	copyStylesTemplate() {
		const stylesFileName = `styles.${this.config.preprocessor}`;

		return copyFile(
			path.join(__dirname, '..', 'templates', 'styles', stylesFileName),
			path.join(this.projectDir, 'src', 'styles', stylesFileName),
		);
	}

	copyStylesTemplateWithCssUtil() {
		const { preprocessor, cssUtil } = this.config;
		const stylesFileName = `styles.${preprocessor}`;
		const cssUtilFile = `${cssUtil}.${preprocessor}`;

		const cssUtilImport = {
			sass: `@use '${cssUtil}'`,
			scss: `@use '${cssUtil}';`,
			less: `@import '${cssUtil}';`,
			css: `@import '${cssUtil}.css';`,
		};

		let stylesTemplateValue = fs.readFileSync(
			path.join(__dirname, '..', 'templates', 'styles', stylesFileName),
			'utf8',
		);
		stylesTemplateValue = `${cssUtilImport[preprocessor]}\n\n${stylesTemplateValue}`;

		return Promise.all([
			copyFile(
				path.join(__dirname, '..', 'templates', 'styles', cssUtilFile),
				path.join(this.projectDir, 'src', 'styles', cssUtilFile),
			),
			writeFile(
				path.join(this.projectDir, 'src', 'styles', stylesFileName),
				stylesTemplateValue,
			),
		]);
	}

	copyScriptTemplate() {
		const importString = `import '../styles/styles.${this.config.preprocessor}';`;
		let scriptTemplateValue = fs.readFileSync(
			path.join(__dirname, '../templates/scripts/app.js'),
			'utf8'
		);
		scriptTemplateValue = `${importString}\n\n${scriptTemplateValue}`;

		return writeFile(
			path.join(this.projectDir, 'src/scripts/app.js'),
			scriptTemplateValue,
		);
	}

	copyGitIgnore() {
		return copyFile(
			path.join(__dirname, '..', 'templates', '.gitignore'),
			path.join(this.projectDir, '.gitignore'),
		);
	}

	copyImage() {
		return copyFile(
			path.join(__dirname, '..', 'templates', 'images', 'bg.png'),
			path.join(this.projectDir, 'src', 'assets', 'images', 'bg.png'),
		);
	}

	copyHtmlTemplate() {
		return copyFile(
			path.join(__dirname, '..', 'templates', 'markup', 'html', 'index.html'),
			path.join(this.projectDir, 'src', 'markup', 'index.html'),
		);
	}

	copyPugTemplate() {
		return Promise.all([
			copyFile(
				path.join(__dirname, '..', 'templates', 'markup', 'pug', 'views', 'index.pug'),
				path.join(this.projectDir, 'src', 'markup', 'views', 'index.pug'),
			),
			copyFile(
				path.join(__dirname, '..', 'templates', 'markup', 'pug', 'templates', 'content.pug'),
				path.join(this.projectDir, 'src', 'markup', 'templates', 'content.pug'),
			),
		]);
	}
}
