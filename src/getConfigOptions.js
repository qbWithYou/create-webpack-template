import inquirer from 'inquirer';

/**
 *
 * @typedef {Object} Config
 *
 * @property {string} projectName
 * @property {string} preprocessor
 * @property {string} cssUtil
 * @property {boolean} usePug
 */

/**
 *
 * @return {Config}
 */
export async function getConfigOptions() {
	const questions = [
		{
			type: 'input',
			name: 'projectName',
			message: 'Enter a project name',
			default: 'my-awesome-project',
			validate(value) {
				return /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(value)
					? true
					: 'Incorrect project name';
			},
		},
		{
			type: 'list',
			name: 'preprocessor',
			message: 'Choose CSS preprocessor:',
			choices: [
				{
					name: 'sass',
					value: 'sass',
				},
				{
					name: 'scss',
					value: 'scss',
				},
				{
					name: 'less',
					value: 'less',
				},
				{
					name: 'I want to use pure css',
					value: 'css',
				},
			],
		},
		{
			type: 'list',
			name: 'cssUtil',
			message: 'Choose your fighter',
			choices: [
				{
					name: 'reset.css',
					value: 'reset',
				},
				{
					name: 'normalize.css',
					value: 'normalize',
				},
				{
					name: 'No, thanks, i will be a fighter',
					value: false,
				},
			],
		},
		{
			type: 'list',
			name: 'usePug',
			message: 'Use pug for preprocessing html?',
			choices: [
				{
					name: 'Yes',
					value: true,
				},
				{
					name: 'No',
					value: false,
				},
			],
		},
	];

	return inquirer.prompt(questions);
}
