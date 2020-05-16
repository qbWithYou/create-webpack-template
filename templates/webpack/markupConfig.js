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
			`
		},
		prod: {

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
			`
		},
		prod: {

		},
	},
};
