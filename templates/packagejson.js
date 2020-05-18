export function getPackageJSON(projectName) {
	return JSON.stringify(
		{
			name: projectName,
			description: '',
			scripts: {
				start: 'webpack-dev-server --config webpack.dev.js',
				build: 'webpack --config webpack.prod.js',
			},
			version: "1.0.0",
			author: '',
			license: 'ISC',
			devDependencies: {},
			dependencies: {},
		},
		null,
		4
	);
}
