# React and Typescript Project Starter Kit

**init**
```
npm init
git init
```
add .gitignore

```
.idea/
node_modules/
dist/
jest_html_reporters.html
```

## Webpack + React + Typescript
**Webpack**
```
npm i webpack webpack-cli -D
```
```
mkdir src
```
**React**
```
npm i react react-dom
```
**Typescript**
```
npm i typescript @types/react @types/react-dom @types/webpack ts-loader -D
```
[tsconfig.json](https://gist.github.com/KRostyslav/82a25c469ffa6652825d58537ac6bc22)

```
{
 "compilerOptions": {
    "outDir": "./dist",
    "target": "es5",
    "jsx": "react" ,
    "module": "es6",
    "pretty": true ,
    "noImplicitAny": false ,
    "skipLibCheck": true ,
    "allowUnreachableCode": false,
    "traceResolution": false,
    "allowSyntheticDefaultImports": true
  },
  "exclude": [
    "node_modules"
  ]
}
```
[webpack.config.js](https://webpack.js.org/guides/typescript/)
```
const path = require('path');

module.exports = () => {
    return {
        mode: 'none',
        entry: {
            app: path.join(__dirname, 'src', 'index.tsx'),
        },
        target: 'web',
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: '/node_modules/',
                },
            ],
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist'),
        },
    };
};

```
**Code**

src/components/Button/Button.tsx
```
import * as React from 'react';

type TitleProps = {
    title: string;
    color?: string;
    size?: number;
};

function Button({ title, color, size }: TitleProps): JSX.Element {
    const onTitleClick = () => {
        console.log('test');
    };

    const styles:React.CSSProperties = {
        color,
        fontSize: size,
    };

    return (
        <button
            type="button"
            onClick={onTitleClick}
            style={styles}
        >
            {title}
        </button>
    );
}

export default Button;
```
src/App.tsx
```
import React from 'react';
import Button from './components/Button/Button';

function App(): JSX.Element {
    const buttonText = `Hello World`;

    return <Button title={buttonText} color="#448000" size={32} />;
}

export default App;

```


src/index.ts
```
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(<App />, document.querySelector('#root'));
```


**Run**

package.json -> "scripts"
```
"build": "webpack --config webpack.config.js",
```
Run `npm run build` and see the bundle app.js appear in a directory called dist

**[html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin/)**
```
npm i html-webpack-plugin -D
```
create template src/index.html
```
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>React Typescript Webpack</title>
</head>
<body>
<!-- React app root element -->
<div id="root"></div>
</body>
</html>
```
edit the webpack.config.js
```
...
const HtmlWebpackPlugin = require('html-webpack-plugin');
...
plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'src', 'index.html'),
                minify: {
                    collapseWhitespace: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                },
            }),
        ],
```
Run `npm run build` and see dist/index.html

**[DevServer](https://webpack.js.org/configuration/dev-server/)**
```
npm i webpack-dev-server -D
```
edit the webpack.config.js
```
devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
},
```
package.json -> "scripts"
```
"start": "webpack-dev-server",
```

run `npm run start`

## SCSS

[sass-loader](https://webpack.js.org/loaders/sass-loader/)
```
npm i sass sass-loader style-loader css-loader -D
```
edit the webpack.config.js
```
 module: {
    rules: [
        {
            test: /\.scss$/i,
            use: [
                // Creates `style` nodes from JS strings
                'style-loader',
                // Translates CSS into CommonJS
                'css-loader',
                // Compiles Sass to CSS
                'sass-loader',
            ],
        },
    ],
},
```
Code
src/components/Button/Button.scss
```
.Button {
    background-color: darkorange;
    border-radius: 5px;
}
```
src/components/Button/Button.tsx
```
...
import './Button.scss'
...
className="Button" 
```
restart devServer

**CSS Bundle**

[MiniCssExtractPlugin](https://webpack.js.org/plugins/mini-css-extract-plugin/)
```
npm i mini-css-extract-plugin -D
```
edit the webpack.config.js
```
...
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
...
module: {
    rules: [
        {
            test: /\.scss$/i,
            use: [
                // for dev
                // Creates `style` nodes from JS strings
                // 'style-loader',
                // for prod
                MiniCssExtractPlugin.loader,
                // Translates CSS into CommonJS
                'css-loader',
                // Compiles Sass to CSS
                'sass-loader',
            ],
        },
    ],
},
...
plugins: [
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
    }),
]
```
run `npm run build` and see the bundle app.css

**Autoprefixer**

```
npm i postcss-loader autoprefixer -D
```
edit the webpack.config.js
```
...
const autoprefixer = require('autoprefixer');
...
// insert after css-loader and before sass-loader
{
    loader: 'postcss-loader',
    options: {
        plugins: [
            autoprefixer({}),
        ],
        sourceMap: true,
    },
},
```
create [.browserslistrc](https://github.com/browserslist/browserslist#browserslistrc)
```
defaults
IE 8
maintained node versions
```
edit src/components/Button/Button.scss
```
...
user-select: none;
```
run `npm run build` and see prefixes in app.css bundle
```
-webkit-user-select: none;
   -moz-user-select: none;
    -ms-user-select: none;
        user-select: none;
``` 
## Files

[file-loader](https://webpack.js.org/loaders/file-loader/)

```
npm i file-loader -D
```

add files: 
src/components/Button/assets/time.svg
src/components/Button/assets/time.png
modify src/components/Button/Button.scss
```
    background-image: url("./assets/time.svg");
    background-repeat: no-repeat;
```
add [custom.d.ts](https://webpack.js.org/guides/typescript/#importing-other-assets)
```
declare module '*.svg' {
    const value: any;
    export default value;
}

declare module '*.jpg' {
    const value: any;
    export default value;
}

declare module '*.png' {
    const value: any;
    export default value;
}

```
modify src/components/Button/Button.tsx
```
// <reference path="../../custom.d.ts"/>
import TimePic from './assets/time.png';
...
 return (
    <button
        type="button"
        className="Button"
        onClick={onTitleClick}
        style={styles}
    >
        {title}
        <img src={TimePic} className="Title-Image" alt="" />
    </button>
 );
```
 edit the webpack.config.js
```
 module: {
    rules: [
        {
            test: /\.(jpg|png|svg)$/,
            loader: 'file-loader',
            options: {
                name: 'images/[sha512:hash:base64:7].[ext]',
            },
        },
    ]
}
```
run `npm run build` and see dist/images directory

## Dev and Prod build

Add [env variables](https://webpack.js.org/guides/environment-variables/) to webpack config 
```
...
module.exports = (options) => {
    const env = options || {};
    console.log('Production: ', Boolean(env.production));
    ...
}
```
run `npm run build -- --env.production` and see `Production: true` message

### css
css bundle only for production
edit the webpack.config.js
```
{
    test: /\.scss$/i,
    use: [
        ...
        env.production ? MiniCssExtractPlugin.loader : 'style-loader',
        ...
    ]
}
```
[CssMinimizerPlugin](https://webpack.js.org/plugins/css-minimizer-webpack-plugin/)
```
npm i css-minimizer-webpack-plugin -D
```
edit the webpack.config.js
```
...
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
...
optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },
```
run `npm run build -- --env.production` and see minimized app.css bundle
### JS
[UglifyJsPlugin](https://webpack.js.org/plugins/uglifyjs-webpack-plugin/)
```
npm i uglifyjs-webpack-plugin -D
```
edit the webpack.config.js
```
...
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
...
optimization: {
    minimizer [
        new UglifyJsPlugin({
            sourceMap: true,
            extractComments: true,
        }),
    ]
}
```
run `npm run build -- --env.production` and see minimized app.js bundle

[SourceMaps](https://webpack.js.org/configuration/devtool/)

edit the webpack.config.js
```
devtool: env.production ? 'source-map' : 'eval',
```
## Linters
### eslint
```
npm install -D eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react @typescript-eslint/eslint-plugin @typescript-eslint/parser
```
create .eslintrc.js
```
module.exports = {
    env: {
        browser: true,
        es2020: true,
    },
    extends: [
        'eslint:recommended',
        'airbnb',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 11,
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'import',
    ],
    settings: {
        'import/extensions': [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
        ],
    },
    rules: {
        indent: [2, 4],
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        'react/jsx-filename-extension': [2, {
            extensions: [
                '.jsx',
                '.tsx',
            ],
        }],
        'import/extensions': [
            0,
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
        'no-console': 2,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-unused-vars': 2,
        'react/jsx-props-no-spreading': 0,
        'react/require-default-props': 0,
    },
};
```
run `eslint src/`
### stylelint
```
npm i -D stylelint stylelint-config-airbnb stylelint-config-rational-order stylelint-config-recommended stylelint-order stylelint-scss stylelint-webpack-plugin
```
create .stylelintrc.js
```
module.exports = {
    extends: [
        'stylelint-config-recommended',
        'stylelint-config-airbnb',
        'stylelint-config-rational-order'
    ],
    plugins: [
        'stylelint-scss',
        'stylelint-order',
    ],
    rules: {
        'color-no-invalid-hex': true,
        indentation: 4,
        'function-comma-space-after': 'always-single-line',
        'color-named': 'never'
    }
};
```
edit the webpack.config.js
```
...
const StylelintPlugin = require('stylelint-webpack-plugin');
...
plugins: [
    new StylelintPlugin({
        configFile: '.stylelintrc.js',
        context: 'src',
        files: '**/*.scss',
        failOnError: false,
        quiet: false,
        emitErrors: true,
        syntax: 'scss',
    }),
]
```
run `stylelint src/**/**.scss --syntax scss`
add linters to package.json "scripts" section
```
    "eslint": "eslint src/",
    "stylelint": "stylelint src/**/**.scss --syntax scss",
```
## Jest
```
npm i -D jest enzyme enzyme-adapter-react-16 react-test-renderer jest-css-modules-transform ts-jest node-sass @types/jest @types/enzyme
```
create [test-setup.js](https://enzymejs.github.io/enzyme/docs/installation/#working-with-react-16)
```
/**
 * Defines the React 16 Adapter for Enzyme.
 *
 * @link http://airbnb.io/enzyme/docs/installation/#working-with-react-16
 * @copyright 2017 Airbnb, Inc.
 */
const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });
```
create [test-file-mock.js](https://jestjs.io/docs/ru/next/webpack#%D0%BE%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0-%D1%81%D1%82%D0%B0%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D1%85-%D0%B0%D0%BA%D1%82%D0%B8%D0%B2%D0%BE%D0%B2)
```
module.exports = 'test-file-stub';
```
edit package.json
```
"jest": {
    "setupFiles": [
      "<rootDir>/test-setup.js"
    ],
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js"
    ],
    "moduleNameMapper": {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test-file-mock.js"
    },
    "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest",
      ".+\\.(css|styl|less|sass|scss)$": "jest-css-modules-transform"
    },
    "testMatch": [
      "**/__tests__/*.(ts|tsx|js)"
    ],
  },
```
create src/components/Button/__tests__/Button.spec.tsx
```
/// <reference types="jest" />
import * as React from 'react';
import { render } from 'enzyme';
import Button from '../Button';

it('show Button', () => {
    const title = 'test';
    const result = render(<Button title={title} />);

    expect(result).toMatchSnapshot();
});
```
edit package.json
```
"scripts": {
  "test": "jest",
}
```
run `npm run test`
### test report
```
npm i jest-html-reporters -D
```
edit package.json
```
"jest": {
 ...
 "reporters": [
      "default",
      "jest-html-reporters"
    ]
}
```
run `npm run test`
## Hooks
```
npm i husky -D 
```
edit package.json
```
"scripts": {
   "checks": "npm run stylelint && npm run eslint && npm run test",
},
"husky": {
    "hooks": {
      "pre-commit": "npm run checks",
      "pre-push": "npm run checks"
    }
},
```
## Storybook
[install Storybook](https://storybook.js.org/docs/react/get-started/install)
```
npx sb init
npm i core-js -D
```
[SCSS preset for Storybook](https://github.com/storybookjs/presets/tree/master/packages/preset-scss)
```
npm i @storybook/preset-scss -D
```
Then add the following to .storybook/main.js:
```
addons: [
    '@storybook/preset-scss'
],
```
run `npm run storybook` and see http://localhost:6006

if you get [error](https://github.com/storybookjs/storybook/issues/7386) on Windows:
```
events.js:292
      throw er; // Unhandled 'error' event
      ^

Error: spawn powershell ENOENT
    at Process.ChildProcess._handle.onexit (internal/child_process.js:267:19)
    at onErrorNT (internal/child_process.js:469:16)
    at processTicksAndRejections (internal/process/task_queues.js:84:21)
Emitted 'error' event on ChildProcess instance at:
    at Process.ChildProcess._handle.onexit (internal/child_process.js:273:12)
    at onErrorNT (internal/child_process.js:469:16)
    at processTicksAndRejections (internal/process/task_queues.js:84:21) {
  errno: 'ENOENT',
  code: 'ENOENT',
  syscall: 'spawn powershell',
  path: 'powershell',
  spawnargs: [
    '-NoProfile',
    '-NonInteractive',
    '–ExecutionPolicy',
    'Bypass',
    '-EncodedCommand',
    'UwB0AGEAcgB0ACAAIgBgACIAaAB0AHQAcAA6AC8ALwBsAG8AYwBhAGwAaABvAHMAdAA6ADYAMAAwADYALwBgACIAIgA='
  ]
}
```
install [cross-env](https://www.npmjs.com/package/cross-env)
```
npm i cross-env -D
```
edit package.json: 
```
"scripts" {
    "storybook": "cross-env BROWSER=none start-storybook -p 6006"
}

```
### Add stories
remove dir with examples `./stories`

install [controls addon](https://github.com/storybookjs/storybook/blob/next/addons/controls/README.md#writing-stories) 
```
npm i @storybook/addon-controls -D
```
edit .storybook/main.js:
```
"addons": [
    "@storybook/addon-controls"
  ]
```
Create src/components/Button/Button.stories.tsx
```
import * as React from 'react';
import Button from './Button';

export default {
    title: 'Button',
    component: Button,
    argTypes: {
        color: { control: 'color' },
        size: {
            control: {
                type: 'range',
                min: 6,
                max: 50,
            },
        },
    },
};

export const Base = (args) => <Button {...args} />;
Base.args = {
    title: 'test',
};
```
and run `npm run storybook`
