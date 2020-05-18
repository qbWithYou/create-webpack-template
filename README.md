# create-webpack-template

This is a cli with which you can easily generate a webpack v4 config for static sites.

## Getting started

`npx create-webpack-template`

or

`npm install create-webpack-template -g && create-webpack-template`

After installation, enter the name of your project and select the technologies that you want to use.

After you select everything you need, `create-webpack-template` will create a directory with the name of your project and place the following files there (depends on your choice).

Example of the structure of your project after creation:

```
.
├── src <- Working directory
│   ├── assets
│   │   ├── fonts
│   │   └── images
│   │       └── bg.png
│   ├── markup
│   │   ├── templates
│   │   │   └── content.pug
│   │   └── views
│   │       └── index.pug
│   ├── scripts
│   │   └── app.js
│   └── styles
│       ├── normalize.sass
│       └── styles.sass
├── public <- Build directory
├── node_modules
├── webpack.common.js
├── webpack.dev.js
├── package.json
├── package-lock.json
├── webpack.prod.js
└── .gitignore
```

Run `npm run start` for development mode or `npm run build` for production mode.

## Capabilities

#### From cli

**CSS capabilities:**
1. Sass
2. Scss
3. Less
4. Pure CSS

**CSS Utils:** 
1. reset.css (sass/scss/less)
2. normalize.css (sass/scss/less)

**HTML capabilities:**
1. Pug
2. Pure HTML

#### Webpack technologies used

**Loaders:**
1. file-loader
2. css-loader
3. html-loader
4. style-loader

**Plugins:**
1. html-webpack-plugin
2. clean-webpack-plugin
3. terser-webpack-plugin
4. mini-css-extract-plugin
5. optimize-css-assets-webpack-plugin
