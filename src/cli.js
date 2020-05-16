import { getConfigOptions } from './getConfigOptions';
import { createProjectDirectories } from './createProjectDirectories';
import { installDependencies } from './installDependencies';
import { generatePackageFile } from './generatePackageFile';
import { StaticTemplates } from './StaticTemplates';
import { WebpackConfig } from './WebpackConfig';

export async function cli(args) {
	const config = await getConfigOptions();

	createProjectDirectories(config);
	await new StaticTemplates(config).checkConfigAndCopyFiles();
	await new WebpackConfig(config).generateAndCopyConfigs();
	await generatePackageFile(config.projectName);
	installDependencies(config);
}
