# SlanBook

## 1 Iniciando proyecto

- Creamos una carpeta con el nombre de nuestro proyecto [ SlanBook ]
- El proyecto consiste en un tema para hacer una web portfolio ya sea de un diseñador, arquitecto, artista...
- Dentro de la carpeta abrimos la terminal de git

### 1.1 Iniciando el proyecto con Git y gitHub

- `git init`
- Vamos a gitHub.com y creamos un nuevo repositorio

  - Dueño: vallesDev
  - Nombre del repositorio: slanBooks
  - Descripción: Theme to make a web portfolio whether of a designer, architect, artist
  - Público
  - Crear repositorio
  - Copiamos ---- [ …or create a new repository on the command line ]
  - Pegamos en nuestra terminal de git

- Empezamos en una nueva rama llamada main

### 1.2 Instalamos dependencias
####  Iniciamos webpack
- `npm init -y`
- `npm i -D webpack webpack-cli webpack-dev-server`
- `code .` [ Con este copmando abrimos el editor de codigo ]
- Creamos el archivo .gitignore
	+ Añadimos al .gitignore
		+ 	node_modules
		+ 	README.md
		+ 	package-lock.json

### 1.3 Primera configuración de package.json

```javascript

{
  "name": "slanBook",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "private": true,
  "scripts": {
    "start": "webpack serve",
		"build": "webpack --mode production",
		"dev": "webpack --mode development",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/vallesDev/slanBooks.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/vallesDev/slanBooks/issues"
  },
  "homepage": "https://github.com/vallesDev/slanBooks#readme",
  "devDependencies": {
    "webpack": "^5.37.0",
    "webpack-cli": "^4.7.0",
    "webpack-dev-server": "^3.11.2"
  }
}

```
### 1.4 Añadimos carpetas y archivos

+ Public [Donde se va a publicar nuestra web]
	+ index.html
+ src [ ARCHIVOS DE DESARROLLO  ]
	+ index.js [ En este archivo va a ir todo nuestro js que vamos a compilar ]
	+ hi.js  [ Archivo de prueba ] 

### 1.5 webpack.config.js
+ Añadimos el archivo webpack.config.js

```javascript

const path = require("path");

/**@type {'webpack'}import().Configuration*/

module.exports = {
    mode: "production",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].js",
        publicPath: ""
    },

    devServer: {
        contentBase: "./dist",
    },
};

```
### 1.6 Instalamos babel

+ `npm i -D babel-loader @babel/core @babel/preset-env`
+ Configuramos webpack.config.js

```javascript

const path = require("path");

/**@type {'webpack'}import().Configuration*/

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: "",
  },
  target: "browserslist",
  devServer: {
    contentBase: "./dist",
  },
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /\.js$/i,
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".json"],
  },
};

```

+ Creamos babel.config.json

```javascript
{
	"presets": [ "@babel/preset-env" ]
}

```

+ Añadimos los polifils `npm i core-js`
+ Añadimos el arcgivo .browserslistrc

```
last 2 versions
> 0.5%
IE 10

```

+ Construimos nuestro proyecto `npm run build`



### 1.7 Instalamos plugin de limpieza

+ Instalamos `  npm i clean-webpack-plugin -D`
+ Configuramos el package.json

```javascript
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

/**@type {'webpack'}import().Configuration*/

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: "",
  },
  target: "browserslist",
  devServer: {
    contentBase: "./dist",
  },
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /\.js$/i,
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".json"],
  },
  plugins: [new CleanWebpackPlugin()],
};

```

+Instalamos el plugin `npm i html-webpack-plugin -D`

```javascript
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

/**@type {'webpack'}import().Configuration*/

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: "",
  },
  target: "browserslist",
  devServer: {
    contentBase: "./dist",
  },
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /\.js$/i,
        exclude: /node_modules/,
      },
      {
        use: ["style-loader", "css-loader"],
        test: /.css$/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".json"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

```



## 2 Agregamos estilos

+ Creamos en la carpeta public, una carpeta llamada img donde vamos a meter las imágenes del proyecto

### 2.1 CSS, SASS y PostCSS

#### Agregando CSS

+ Creamos  el archivo index.css
  + index.css
+ Agregamos las dependencias a la terminal `npm i style-loader css-loader -D`
+ Añadimos la siguiente configuración a webpack

```javascript
   {
       use: ["style-loader", "css-loader"],
       test: /.css$/,
    }
```



####  Agregando SASS

+ Cambiamos la extensión de nuestra hoja de estilos en css a scss index.scss
+ Instalamos las dependencias para sass `npm i -D sass sass-loader`
+ Agregamos la siguiente configuración

```javascript

      {
        use: ["style-loader", "css-loader", "sass-loader"],
        test: /.(css|sass|scss)$/,
      },

```
#### Agregamos configuración para imágenes

```javascript

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },

```

##### EJEMPLO PRUEBA SCSS

```scss

body {
  background: red;
  color: white;

  .foto__prueba {
    width: 400px;
    height: 400px;
    background-image: url(../images/about.jpg);
    background-position: center;
    background-size: cover;
  }
}

```

+ importamos las imagenes a nuestro index.js

```javascript

import "./styles/index.scss";
import "./images/home.jpg";

```

##### Agregando la hoja de estilo dinámica

+ Instalamos el plugin `npm install -D mini-css-extract-plugin`

```javascript

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
//=========================================================
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
//===========================================================
const path = require("path");

/**@type {'webpack'}import().Configuration*/

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: "",
  },
  target: "browserslist",
  devServer: {
    contentBase: "./dist",
  },
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /\.js$/i,
        exclude: /node_modules/,
      },
      {
      //========================================================
        use: [MiniCSSExtractPlugin.loader, "css-loader", "sass-loader"],
        test: /.(css|sass|scss)$/,
      //=======================================================
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".json"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    //=======================
    new MiniCSSExtractPlugin(),
    //=========================
  ],
};

```
#### Agregamos postCSS

+ Instalamos dependencias `$ npm i -D postcss postcss-preset-env postcss-loader`
+ Agregamos un nuevo archivo llamado postcss.config.js

```javascript


module.exports = {
    plugins: ["postcss-preset-env"],
}

```

##### Agregamos el source maps

````
"scripts": {
		"start": "webpack serve",
		"build": "webpack --mode production --devtool source-map",
		"dev": "webpack --mode development",
		"test": "echo \"Error: no test specified\" && exit 1"
	},
````



