import fs from 'fs';
import path from 'path';
import { parse } from '@babel/parser';
import generate from '@babel/generator';
import { getWebpackDevConfig } from '../templates/webpack/dev';
import { stylesConfig } from '../templates/webpack/stylesConfig';
import { markupConfig } from '../templates/webpack/markupConfig';

export class WebpackConfig {
	config;

	constructor(config) {
		this.config = config;
	}

	generateAndCopyConfigs() {
		this.generateAndCopyDevConfig();
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
}
