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
	},
};
