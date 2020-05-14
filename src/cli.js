import { getConfigOptions } from './getConfigOptions';
import { createProjectDirectories } from './createProjectDirectories';
import { copyStaticFiles } from './copyStaticFiles';
import { installDependencies } from './installDependencies';

export async function cli(args) {
	const config = await getConfigOptions();
	// const dependencies = [];

	createProjectDirectories(config.projectName);
	copyStaticFiles(config);
	installDependencies(config.projectName);
}
