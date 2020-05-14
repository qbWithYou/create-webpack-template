import { exec } from 'child_process';
import path from 'path';

export function installDependencies(projectName) {
	exec(`cd ${projectName} && npm install && npm install @babel/core`, function(error, stdout, stderr) {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		console.log(stdout);
	});
}
