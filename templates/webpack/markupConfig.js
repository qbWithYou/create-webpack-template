export const markupConfig = {
	html: {
		dev: {
			rules: `
				{
					test: /\.html$/i,
					loader: 'html-loader',
				},
			`,
			plugins: `
				...generateHtmlPlugins(path.resolve(__dirname, 'src/markup')),
			`,
		},
		prod: {
			rules: `
				{
					test: /\.html$/i,
					use: [
						{
							loader: 'html-loader',
							options: {
								minimize: false,
							},
						},
					],
				},
			`,
			plugins: `
				...generateHtmlPlugins(path.resolve(__dirname, 'src/markup')),
			`,
		},
	},
	pug: {
		dev: {
			rules: `
				{
					test: /\.pug$/i,
					loader: ['html-loader', 'pug-html-loader'],
				},
			`,
			plugins: `
				...generateHtmlPlugins(path.resolve(__dirname, 'src/markup/views')),
			`,
		},
		prod: {
			rules: `
				{
					test: /\.pug$/i,
					use: [
						{
							loader: 'html-loader',
							options: {
								minimize: false,
							},
						},
						'pug-html-loader'
					],
				},
			`,
			plugins: `
				...generateHtmlPlugins(path.resolve(__dirname, 'src/markup/views')),
			`,
		},
	},
};
