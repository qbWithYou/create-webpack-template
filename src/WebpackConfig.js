import fs from 'fs';
import path from 'path';
import { parse } from '@babel/parser';
import generate from '@babel/generator';
import { getWebpackDevConfig } from '../templates/webpack/dev';
import { stylesConfig } from '../templates/webpack/stylesConfig';

export class WebpackConfig {
	config;

	constructor(config) {
		this.config = config;
	}

	generateAndCopyConfigs() {
		this.generateAndCopyDevConfig();
	}

	generateAndCopyDevConfig() {
		const ast = parse(
			getWebpackDevConfig({
				rules: stylesConfig[this.config.preprocessor].dev.rules,
			}),
		);

		const { code } = generate(ast);

		fs.writeFileSync(
			path.join(process.env.PWD, this.config.projectName, 'webpack.dev.js'),
			code,
		);
	}
}
