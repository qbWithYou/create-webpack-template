export const stylesConfig = {
	sass: {
		dev: {
			rules: `
				{
					test: /\.s[ac]ss$/,
					use: [
						'style-loader',
						'css-loader',
						'sass-loader',
					],
				},
			`,
		},
		prod: {
			rules: `
				{
					test: /\.s[ac]ss$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
						},
						'css-loader',
						'sass-loader',
					],
				},
			`,
		},
	},
	scss: {
		dev: {
			rules: `
				{
					test: /\.s[ac]ss$/,
					use: [
						'style-loader',
						'css-loader',
						'sass-loader'
					],
				},
			`,
		},
		prod: {
			rules: `
				{
					test: /\.s[ac]ss$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
						},
						'css-loader',
						'sass-loader',
					],
				},
			`,
		},
	},
	less: {
		dev: {
			rules: `
				{
					test: /\.less$/,
					use: [
						'style-loader',
						'css-loader',
						'less-loader'
					],
				},
			`,
		},
		prod: {
			rules: `
				{
					test: /\.less$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
						},
						'css-loader',
						'less-loader',
					],
				},
			`,
		},
	},
	css: {
		dev: {
			rules: `
				{
					test: /\.css$/,
					use: [
						'style-loader',
						'css-loader',
					],
				},
			`,
		},
		prod: {
			rules: `
				{
					test: /\.css$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
						},
						'css-loader',
					],
				},
			`,
		},
	},
};
