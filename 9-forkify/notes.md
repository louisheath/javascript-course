## Notes

A collection of new concepts introduced in this project

# Node

## Node Package Manager

NodeJS comes with NPM, which lets us configure our JavaScript application with various libraries and packages.

### Configuration

scripts and installed packages are found in 'package.json'

### Commands

`npm install 'package' --save-dev`

- will add a package to the project's devDependencies list

`npm install 'package' --save`

- will add a package to the project's dependencies list

`sudo npm install 'package' --global`

- will make a package available to all projects

`npm run 'script name'`

- will run an npm script defined in the config


## Webpack Bundling

`webpack` alone scans the 'src' directory and bundles up all relevant code for execution
- the bundle is written to the 'dist' folder
- requires `webpack-cli` package to be run

`webpack-dev-server` *continuously* scans src, injecting the bundled file directly into index.html
- runs a local server on port 8080

`html-webpack-plugin` allows us to bundle our html files
- we inject variables into the index.html template and export the result to 'dist'
- not all apps use a template

### Configuration

Webpack and its plugins are configured via 'webpack.config.js'.

Any operations or settings which are relevant during bundling are defined here

### Commands

`npm install webpack webpack-cli webpack-dev-server html-webpack-plugin --save-dev`


## Babel

babel is a javascript compiler
- we set it up with the config file '.babelrc'   

`@babel/preset-env` provides automatic backwards compatibility from ES6 to ES5 for older browsers

`babel-loader` is what actually finds the files for converting
- RegEx used to find files for loading is defined in webpack config, as it happens alongside bundling

### Configuration

We configure Babel with the dot file '.babelrc'
- 'presets' is a collection of code transform plugins - code which transforms our code
- ES6 features such as Promises need extra code to be mimicked in ES5 - this is added by `@babel/polyfill`

### Commands

`npm install @babel/core @babel/preset-env babel-loader --save-dev`

`npm install @babel/polyfill --save`

### Axios

We are using axios instead of `fetch()` for API calls because it automatically converts the result to JSON, and it provides better error handling.

`npm install axiom --save`

# JavaScript

### Element.closest()

Given a css selector as paramater, it finds the nearest ancestor matching that selector

### data.goto

Placing this in an HTML element allows us to store data in the template.

E.g. `<... data-foo=1 />` can be retrieved in JS with `const foo = el.datasets.foo;`


### Element.matches()

Checks if the element satisfies some given css selectors. returns boolean.