import { getConfigOptions } from './getConfigOptions';
import { Dependencies } from './installDependencies';
import { StaticTemplates } from './StaticTemplates';
import { WebpackConfig } from './WebpackConfig';
import { TemplateDirectories } from './TemplateDirectories';

export async function cli(args) {
	const config = await getConfigOptions();

	new TemplateDirectories(config).createDirectories();
	await new StaticTemplates(config).checkConfigAndCopyFiles();
	await new WebpackConfig(config).generateAndCopyConfigs();
	new Dependencies(config).install();
}
