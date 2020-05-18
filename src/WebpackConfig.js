import fs from 'fs';
import path from 'path';
import { parse } from '@babel/parser';
import generate from '@babel/generator';
import { getWebpackDevConfig } from '../templates/webpack/dev';
import { stylesConfig } from '../templates/webpack/stylesConfig';
import { markupConfig } from '../templates/webpack/markupConfig';
import { getWebpackProdConfig } from '../templates/webpack/prod';

export class WebpackConfig {
	config;

	constructor(config) {
		this.config = config;
	}

	generateAndCopyConfigs() {
		this.copyCommonConfig();
		this.generateAndCopyProdAndDevConfigs();
	}

	copyCommonConfig() {
		fs.copyFileSync(
			path.join(__dirname, '..', 'templates', 'webpack', 'common.js'),
			path.join(process.env.PWD, this.config.projectName, 'webpack.common.js')
		);
	}

	generateAndCopyProdAndDevConfigs() {
		const markupFormat = this.config.usePug ? 'pug' : 'html';

		['dev', 'prod'].forEach(mode => {
			const generateConfig = mode === 'dev' ? getWebpackDevConfig : getWebpackProdConfig;

			const ast = parse(
				generateConfig({
					rules: `
					${stylesConfig[this.config.preprocessor][mode].rules}
					${markupConfig[markupFormat][mode].rules}
				`,
					plugins: markupConfig[markupFormat][mode].plugins,
				}),
			);

			const { code } = generate(ast);

			fs.writeFileSync(
				path.join(process.env.PWD, this.config.projectName, `webpack.${mode}.js`),
				code,
			);
		});
	}

	generateAndCopyDevConfig() {
		const markupFormat = this.config.usePug ? 'pug' : 'html';
		const ast = parse(
			getWebpackDevConfig({
				rules: `
					${stylesConfig[this.config.preprocessor].dev.rules}
					${markupConfig[markupFormat].dev.rules}
				`,
				plugins: markupConfig[markupFormat].dev.plugins,
			}),
		);

		const { code } = generate(ast);

		fs.writeFileSync(
			path.join(process.env.PWD, this.config.projectName, 'webpack.dev.js'),
			code,
		);
	}

	generateAndCopyProdConfig() {
		const markupFormat = this.config.usePug ? 'pug' : 'html';

		const ast = parse(
			getWebpackProdConfig({
				rules: `
					${stylesConfig[this.config.preprocessor].prod.rules}
					${markupConfig[markupFormat].prod.rules}
				`,
				plugins: markupConfig[markupFormat].prod.plugins,
			}),
		);

		const { code } = generate(ast);

		fs.writeFileSync(
			path.join(process.env.PWD, this.config.projectName, 'webpack.prod.js'),
			code,
		);
	}
}
