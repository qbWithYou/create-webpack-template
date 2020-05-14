import inquirer from 'inquirer';

export async function getConfigOptions() {
	const questions = [
		{
			type: 'input',
			name: 'projectName',
			message: 'Enter a project name',
			default: 'MyAwesomeProject',
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
					name: 'Sass',
					value: 'sass',
				},
				{
					name: 'Scss',
					value: 'scss',
				},
				{
					name: 'Less',
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
			name: 'gitignore',
			message: 'Include .gitignore?',
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
