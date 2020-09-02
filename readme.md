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
            className="Title"
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
