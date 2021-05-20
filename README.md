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
	
	```javascript
	import "./index.js";
	
	sayHi();
	```
	
	
	
	+ hi.js  [ Archivo de prueba ] 

````javascript
export default function sayHi() {
  document.getElementById("app").innerText = "Vamos avanzando!!";
}
````



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

```javascript
{
	"presets": [
		[
			"@babel/preset-env",
			{
				"corejs": 3.12,
				"useBuiltIns": "usage"
			}
		]
	]
}
```

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

+ Creamos una carpeta llamada img  en src donde vamos a meter las imágenes del proyecto

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



## 3. Iniciando WEB

## 3.1 Iniciando el html

````html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- ===== BOX ICONS ===== -->
    <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'>
    <!-- ===== BOX ICONS ===== -->
    <title>slanBooks</title>

<script defer src="main.e68b0ee8f84e9cad5bbe.js"></script><link href="main.css" rel="stylesheet"></head>

<body>
    <p>hola mundo</p>

</body>

</html>
````

## 3.2 Agregando variables

+ _variables.scss  ------ @use 'variables'

````scss
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;800&display=swap");

:root {
  --header-height: 3rem;

  /*=== Colors ===*/
  --first-color: #3e0e12;
  --first-color-dark: #2f0a0d;
  --text-color: #524748;
  --first-color-light: #7b6f71;
  --first-color-lighten: #fbf9f9;

  /*=== Font and typography ===*/

  --body-font: "Poppins", sans-serif;
  --biggest-font-size: 2.5rem;
  --h1-font-size: 1.5rem;
  --h2-font-size: 1.25rem;
  --h3-font-size: 1.25rem;
  --normal-font-size: 0.938rem;
  --small-font-size: 0.813rem;
  --smaller-font-size: 0.75rem;

  /*=== Font weight ===*/

  --font-medium: 500;
  --font-semi-bold: 600;
  --font-bold: 700;

  /*===  Margenes ===*/

  --mb-1: 0.5rem;
  --mb-2: 1rem;
  --mb-3: 1.5rem;
  --mb-4: 2rem;
  --mb-5: 2.5rem;
  --mb-6: 3rem;

  /*=== Z.index ===*/

  --z-normal: 1;
  --z-tooltip: 10;
  --z-fixed: 100;

  @media screen and (min-width: 768px) {
    --biggest-font-size: 4.5rem;
    --h1-font-size: 2.25rem;
    --h2-font-size: 1.5rem;
    --h3-font-size: 1.25rem;
    --normal-font-size: 1rem;
    --small-font-size: 0.875rem;
    --smaller-font-size: 0.813rem;
  }
}

````



### 3.2 Añadiendo el Reset CSS y estilos globales

#### RESET CSS

+ _global.scss ----- @use 'global'

````scss
/*=== BASE ===*/
*,
::before,
::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: var(--header-height) 0 0 0;
  font-family: var(--body-font);
  font-size: var(--normal-font-size);
  font-weight: var(--font-medium);
  background-color: var(--first-color-lighen);
  color: var(--text-color);
  line-height: 1.6;
}

h1,
h2,
h3,
ul,
p {
  margin: 0;
}

h2,
h3 {
  font-weight: var(--font-semi-bold);
}

ul {
  padding: 0;
  list-style: none;
}

a {
  text-decoration: none;
  color: var(--first-color-lighten);
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}
````

####  Estilos globales

````scss
/*==== CLASS CSS  ====*/

.section {
  padding: 4rem 0 2 rem;
}

.section-title,
.section-subtitle {
  text-align: center;
}

.section-title {
  font-size: var(--h1-font-size);
  color: var(--first-color);
  margin-bottom: var(--mb-3);
}

.section-subtitle {
  display: block;
  font-size: var(--smaller-font-size);
  font-weight: var(--font-semi-bold);
}
````

---

## 4 Header

### Header html

```html
<header class="l-header" id="header">
        <nav class="nav bd-container"><a href="#" class="nav__logo">Clay Doe</a>

            <div class="nav__menu" id="nav-menu">
                <ul class="nav__list">
                    <li class="nav__item">
                        <a href="#home" class="nav__link active-link">Home</a>
                    </li>
                    <li class="nav__item">
                        <a href="#about" class="nav__link">About</a>
                    </li>
                    <li class="nav__item">
                        <a href="#services" class="nav__link">Services</a>
                    </li>
                    <li class="nav__item">
                        <a href="#porfolio" class="nav__link">Portfolio</a>
                    </li>
                    <li class="nav__item">
                        <a href="#contact" class="nav__link">Contactme</a>
                    </li>
                </ul>
            </div>

            <div class="nav__toggle" id="nav-toggle">
                <i class='bx bx-menu'></i>
            </div>
        </nav>
    </header>
```



### Header CSS

+ layout ------ _layaout.scss

```scss
@use 'variables';

.bd-container {
  max-width: 1024px;
  width: calc(100% - 2rem);
  margin-left: var(--mb-2);
  margin-right: var(--mb-2);
}

.bd-grid {
  display: grid;
  gap: 1.5rem;
}

.l-header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--z-fixed);
  background: #000;
}

```

+ nav ----- _nav.scss

```scss
@use 'variables';

/*=== NAV ===*/

.nav {
  height: var(--header-height);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .nav__menu {
    position: fixed;
    top: -100%;
    left: 0;
    width: 100%;
    padding-top: 1.5rem;
    text-align: center;
    background-color: #000;
    transition: 0.4s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 0 0 1rem 1rem;
  }
}

.nav__item {
  margin-bottom: var(--mb-3);
}

.nav__link {
  color: var(--first-color-lighten);
  transition: 0.3s;

  :hover {
    color: var(--first-color-light);
  }
}

.nav__log,
.nav__toggle {
  color: var(--first-color-lighten);
}

.nav__toggle {
  font-size: 1.3rem;
  cursor: pointer;
}

/* Show menu */

.show-menu {
  top: var(--header-height);
}

/* Active menu */

.active-link {
  position: relative;
}

.active-link::after {
  content: "";
  position: absolute;
  bottom: -0.7rem;
  left: 0;
  width: 65%;
  height: 3px;
  background-color: var(--first-color-light);
}

/* Change background header color */

.scroll-header {
  background-color: var(--first-color-lighten);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.scroll-header {
  .nav__logo,
  .nav__toggle,
  .nav__link {
    color: var(--first-color-dark);
  }
  .nav__menu {
    background-color: var(--first-color-lighten);
  }
}

```



### Header JS

+ Menú de navegación

```javascript
//Show Menu

function showMenu(toggleId, navId) {
  const toogle = document.getElementById(toggleId);
  const nav = document.getElementById(navId);

  if (toogle && nav) {
    toogle.addEventListener("click", () => {
      nav.classList.toggle("show-menu");
    });
  }
}

showMenu("nav-toggle", "nav-menu");

// Remove menu

const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}

navLink.forEach((n) => n.addEventListener("click", linkAction));
```



+ Cambio de color del header al hacer scroll

```javascript
function scrollHeader() {
  const header = document.getElementById("header");

  if (this.scrollY >= 200) {
    header.classList.add("scroll-header");
  } else {
    header.classList.remove("scroll-header");
  }
}
window.addEventListener("scroll", scrollHeader);
```



+ Botón subir arriba

```javascript
function scrollTop() {
  const scrollTop = document.getElementById("scroll-top");

  if (this.scrollY >= 560) {
    scrollTop.classList.add("show-scroll");
  } else {
    header.classList.remove("show-scroll");
  }
}
window.addEventListener("scroll", scrollTop);

```



+ header css final

```scss
@use 'variables';

/*=== NAV ===*/

.nav {
  height: var(--header-height);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .nav__menu {
    position: fixed;
    top: -100%;
    left: 0;
    width: 100%;
    padding-top: 1.5rem;
    text-align: center;
    background-color: #000;
    transition: 0.4s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 0 0 1rem 1rem;
  }
}

.nav__item {
  margin-bottom: var(--mb-3);
}

.nav__link {
  color: var(--first-color-lighten);
  transition: 0.3s;

  :hover {
    color: var(--first-color-light);
  }
}

.nav__log,
.nav__toggle {
  color: var(--first-color-lighten);
}

.nav__toggle {
  font-size: 1.3rem;
  cursor: pointer;
}

/* Show menu */

.show-menu {
  top: var(--header-height);
}

/* Active menu */

.active-link {
  position: relative;
}

.active-link::after {
  content: "";
  position: absolute;
  bottom: -0.7rem;
  left: 0;
  width: 65%;
  height: 3px;
  background-color: var(--first-color-light);
}

/* Change background header color */

.scroll-header {
  background-color: var(--first-color-lighten);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.scroll-header {
  .nav__logo,
  .nav__toggle,
  .nav__link {
    color: var(--first-color-dark);
  }
  .nav__menu {
    background-color: var(--first-color-lighten);
  }
}

```

+ scrollTop CSS

```scss
@use 'variables';

/*=== SCROLL TOP====*/

.scrolltop {
  position: fixed;
  right: 1rem;
  bottom: -20%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(123, 111, 113, 0.7);
  border-radius: 0.5rem;
  z-index: var(--z-tooltip);
  transition: 0.4s;
  visibility: hidden;
  :hover {
    background-color: var(--first-color);
    border-radius: 0.5rem;
  }
}

.scrolltop__icon {
  font-size: 2rem;
  color: var(--first-color-lighten);
}

/*show-scroll-top*/

.show-scroll {
  visibility: visible;
  bottom: 1.5rem;
}

```



---



## 5 Home

### Home html

```html
<!-- HOME -->
        <section class="home" id="home">
            <div class="home__container bd-container bd-grid">
                <div class="home__data">
                    <span class="home__greeting">Hello, My name is</span>
                    <h1>Clay Doe</h1>
                    <span class="home__profession">Web developer</span>
                    <a href="#" class="button button-light">Contact</a>
                </div>

                <div class="home__social">
                    <a href="#" class="home__social-icon">
                        <i class='bx bxl-facebook-square'></i>
                    </a>
                    <a href="#" class="home__social-icon">
                        <i class='bx bxl-instagram'></i>
                    </a>
                    <a href="#" class="home__social-icon">
                        <i class='bx bxl-twitter'></i>
                    </a>
                </div>
                <div class="home__img">
                    <img src="./5e7e55db004783a93784.jpg" alt="">
                </div>
            </div>
        </section>
```



### Home CSS

```scss
@use 'variables';

.home {
  background-color: #000;
  overflow: hidden;
}

.home__container {
  position: relative;
  height: calc(100vh - var(--header-height));
  grid-template-rows: repeat(2, max-content);
  align-content: space-around;
  row-gap: 2rem;
}

.home__data {
  border-left: 4px solid var(--first-color-lighten);
  color: var(--first-color-lighten);
  padding-left: 1.5rem;
  z-index: var(--z-tooltip);
}

.home__name {
  font-size: var(--biggest-font-size);
}

.home__greeting,
.home__profession {
  display: block;
  font-weight: var(--font-bold);
}

.home__greeting {
  font-size: 0.813rem;
}

.home__profession {
  font-size: 0.938rem;
  margin-bottom: var(--mb-3);
}

.home__img {
  position: absolute;
  right: 0;
  bottom: 0;

  img {
    width: 240px;
  }
}

.home__social {
  display: flex;
  flex-direction: column;
}

.home__social-icon {
  width: max-content;
  font-size: 1.3rem;
  margin-bottom: var(--mb-2);
  color: var(--first-color-lighten);

  :hover {
    color: var(--first-color-light);
  }
}

/*==== BUTTONS ====*/

.button {
  display: inline-block;
  background-color: var(--first-color);
  color: var(--first-color-lighten);
  padding: 0.75rem 1rem;
  border-radius: 0.25rem;
  transition: 0.3s;
  cursor: pointer;
  :hover {
    background-color: var(--first-color-dark);
  }
}

.button-light {
  background-color: var(--first-color-light);
}

.button-white {
  background-color: var(--first-color-lighten);
  color: var(--first-color-dark);
  :hover {
    background-color: var(--first-color-lighten);
  }
}

.button-link {
  background: none;
  color: var(--first-color);
  padding: 0;
  :hover {
    background: none;
  }
}

```

---

## 6 About

### About html

```html
<!-- ===== ABOUT ===== -->

        <section class="about section bd-container" id="about">
            <div class="section-subtitle">My History</div>
            <h2 class="section-title">About me</h2>
            <div class="about__container bd-grid">
                <div class="about__data bd-grid">
                    <p class="about__description">
                        <span>
                            Hello, I am<br />
                            freelance fronted developer, I am passionate about creating and developing web interfaces.
                            With years of experience in web design and development.
                        </span>
                    </p>

                    <div>
                        <span class="about__number">05</span>
                        <span class="about__achievement">Years off Experience</span>
                    </div>

                    <div>
                        <span class="about__number">29+</span>
                        <span class="about__achievement">Projects completes</span>
                    </div>

                    <div>
                        <span class="about__number">07</span>
                        <span class="about__achievement">Best work awards</span>
                    </div>
                </div>

                <img src="./b7e511330fbac49f4620.jpg" alt="" class="about__img">
            </div>
        </section>

        <!-- ===== QUALIFICATION ===== -->

        <section class="qualification section bd-container">
            <span class="section-subtitle">Experience and education</span>
            <h2 class="section-title">Qualification</h2>

            <div class="qualification__container bd-grid">
                <div class="qualification__content">
                    <h2 class="qualification__title">
                        <i class="bx bx-briefcase-alt qualification__title-icon"></i>
                        Work Experience
                    </h2>
                    <div class="bd-grid">
                        <div class="qualification__data">
                            <h3 class="qualification__area">Senior Front end Developer
                            </h3>

                            <div class="qualification__box">
                                <span class="qualification__work">
                                    <i class="bx bx-briefcase-alt qualification__icon"></i>
                                    Adobe - New York
                                </span>

                                <span class="qualification__work">
                                    <i class="bx bx-calendar-alt qualification__icon"></i>
                                    Jan 2019 - Aug 2019
                                </span>

                            </div>
                        </div>



                        <div class="qualification__data">
                            <h3 class="qualification__area">Ui / UX Designer
                            </h3>

                            <div class="qualification__box">
                                <span class="qualification__work">
                                    <i class="bx bx-briefcase-alt qualification__icon"></i>
                                    Figma - Lima
                                </span>

                                <span class="qualification__work">
                                    <i class="bx bx-calendar-alt qualification__icon"></i>
                                    Oct 2019 - Dec 2019
                                </span>

                            </div>
                        </div>

                        <div class="qualification__data">
                            <h3 class="qualification__area">
                                Web Designer
                            </h3>

                            <div class="qualification__box">
                                <span class="qualification__work">
                                    <i class="bx bx-briefcase-alt qualification__icon"></i>
                                    Apple Inc - New York
                                </span>

                                <span class="qualification__work">
                                    <i class="bx bx-calendar-alt qualification__icon"></i>
                                    Jan 2020 - May 2020
                                </span>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="qualification__content">
                    <h2 class="qualification__title">
                        <i class="bx bx-book-bookmark qualification__title-icon"></i>
                        Education
                    </h2>
                    <div class="bd-grid">
                        <div class="qualification__data">
                            <h3 class="qualification__area">
                                Computer technician
                            </h3>

                            <div class="qualification__box">
                                <span class="qualification__work">
                                    <i class="bx bx-book-alt qualification__icon"></i>
                                    Lima - Computer institute
                                </span>

                                <span class="qualification__work">
                                    <i class="bx bx-calendar-alt qualification__icon"></i>
                                    Apr 2015 - Dec 2018
                                </span>

                            </div>
                        </div>



                        <div class="qualification__data">
                            <h3 class="qualification__area">Master in web developer
                            </h3>

                            <div class="qualification__box">
                                <span class="qualification__work">
                                    <i class="bx bx-book-alt qualification__icon"></i>
                                    Madrid - Design institute
                                </span>
                                <span class="qualification__work">
                                    <i class="bx bx-calendar-alt qualification__icon"></i>
                                    Jan 2019 - Aug 2020
                                </span>
                            </div>
                        </div>

                        <div class="qualification__data">
                            <h3 class="qualification__area">
                                Web Designer
                            </h3>

                            <div class="qualification__box">
                                <span class="qualification__work">
                                    <i class="bx bx-briefcase-alt qualification__icon"></i>
                                    Apple Inc - New York
                                </span>

                                <span class="qualification__work">
                                    <i class="bx bx-calendar-alt qualification__icon"></i>
                                    Jan 2020 - May 2020
                                </span>

                                <span class="qualification__work">
                                    <i class="bx bx-briefcase-alt qualification__icon"></i>
                                    Adobe - New York
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
```

### About CSS

```scss
@use 'variables';

/*==== about__dat ====*/
.about__data {
  text-align: center;
}

.about__description {
  span {
    font-size: var(--h2-font-size);
    font-weight: var(--font-semi-bold);
    color: var(--first-color);
  }
}

.about__number {
  font-size: var(--h1-font-size);
  color: var(--first-color);
  display: block;
}

.about__img {
  justify-self: center;
  width: 200px;
  border-radius: 0.5rem;
}

.qualification__container {
  row-gap: 2.5rem;
}

.qualification__title {
  font-size: var(--h3-font-size);
  color: var(--first-color);
  margin-bottom: var(--mb-2);
  display: flex;
  align-items: center;
}

.qualification__title-icon {
  font-size: 1.5rem;
  margin-right: var(--mb-1);
}

.qualification__box {
  padding-bottom: 1rem;
  border-bottom: 1px solid #ccc;
}
s .qualification__area {
  font-size: var(--normal-font-size);
  color: var(--first-color);
  margin-bottom: var(--mb-1);
  font-weight: var(--font-medium);
}

.qualification__icon,
.qualification_work {
  font-size: var(--smaller-font-size);
  color: var(--first-color-light);
}

.qualification_work {
  display: block;
}

```



---



## 7 Services

### Services html

```html
<!-- ===== SERVICES ===== -->

        <section class="services section bd-container" id="services">
            <span class="section-subtitle">
                What i offer
            </span>
            <h2 class="section-title">Services</h2>
            <div class="services__container bd-grid">
                <div class="services__data">
                    <i class="bx bx-palette services__icon"></i>
                    <h3 class="services__title">Ui/Ux Design</h3>
                    <p class="services__description">
                        Services that I offer and work, with years of experience in the work area.
                    </p>
                    <a href="#" class="button">Know more</a>
                </div>

                <div class="services__data">
                    <i class="bx bx-laptop services__icon"></i>
                    <h3 class="services__title">Web development</h3>
                    <p class="services__description">
                        Services that I offer and work, with years of experience in the work area.
                    </p>
                    <a href="#" class="button">Know more</a>
                </div>

                <div class="services__data">
                    <i class="bx bx-pen services__icon"></i>
                    <h3 class="services__title">Graphic Design</h3>
                    <p class="services__description">
                        Services that I offer and work, with years of experience in the work area.
                    </p>
                    <a href="#" class="button">Know more</a>
                </div>
            </div>
        </section>

        <!-- ===== PROJECT IN MIND ===== -->

        <section class="project section bd-container">
            <div class="project__container bd-grid">
                <div class="project__data">
                    <i class="bx bx-chat project__icon"></i>
                    <div>
                        <h2 class="project__title">
                            Project in mind
                        </h2>
                        <p class="project__description">Hire me to carry out the following projects</p>
                    </div>
                    <div><a href="#" class="button button-white">Hire me</a></div>
                </div>
            </div>
        </section>
```



### Services CSS

```scss
/*==== SERVICES  ====*/
.services__data {
  padding: 3rem 1rem;
  background-color: #fff;
  border-radius: 0.5rem;
  text-align: center;
  transition: 0.4s;
  box-shadow: 0 4px 6px rgba(174, 190, 205, 0.3);
}

services__icon,
.services__title {
  margin-bottom: var(--mb-2);
  color: var(--first-color);
}

.services__icon {
  font-size: 3rem;
}

.services__title {
  font-size: var(--h3-font-size);
}

.services__description {
  margin-bottom: var(--mb-4);
}

.services__data:hover {
  transform: translate(-0.5rem);
  box-shadow: 0 6px 8px rgba(174, 190, 205, 0.4);
}

/*PROJECT IN MIND*/
.project__container {
  padding: 1.5rem 1rem;
  background-color: var(--first-color-dark);
  color: var(--first-color-lighten);
  border-radius: 0.5rem;
  text-align: center;
}

.project__icon,
.project__title {
  margin-bottom: var(--mb-1);
}

.project__icon {
  font-size: 3.5rem;
}

.project__title {
  font-size: 1.5rem;
}

.project__description {
  margin-bottom: var(--mb-4);
}
```



---

## 8 Portfolio

### Portfolio html

```html
<!-- ===== PORTFOLIO ===== -->
        <section class="portfolio section bd-container" id="portfolio">
            <span class="section-subtitle">My recent works</span>
            <h2 class="section-title">Portfolio</h2>

            <div class="portfolio__nav">
                <span class="portfolio__item" data-filter="all">All</span>
                <span class="portfolio__item" data-filter=".web">Web</span>
                <span class="portfolio__item" data-filter=".ux">Ui/Ux</span>
                <span class="portfolio__item" data-filter=".app">App</span>
            </div>

            <div class="portfolio__container bd-grid">
                <div class="portfolio__content">
                    <a href="#">
                        <img src="./dd086ed02b7eca26f6fa.jpg" alt="" class="portfolio_img">
                    </a>

                    <div class="portfolio__data">
                        <span class="portfolio__subtitle">Web development</span>
                        <a href="#">
                            <h2 class="portfolio__title">New portfolio of work done for a client.</h2>
                        </a>
                        <a href="#" class="button button-link">View Detail</a>
                    </div>
                </div>

                <div class="portfolio__content">
                    <a href="#">
                        <img src="./4bb3bc5b8048d128a681.jpg" alt="" class="portfolio_img">
                    </a>

                    <div class="portfolio__data">
                        <span class="portfolio__subtitle">Web development</span>
                        <a href="#">
                            <h2 class="portfolio__title">New portfolio of work done for a client.</h2>
                        </a>
                        <a href="#" class="button button-link">View Detail</a>
                    </div>
                </div>

                <div class="portfolio__content">
                    <a href="#">
                        <img src="./379d5c43ebaf38386f41.jpg" alt="" class="portfolio_img">
                    </a>

                    <div class="portfolio__data">
                        <span class="portfolio__subtitle">Ux design</span>
                        <a href="#">
                            <h2 class="portfolio__title">New portfolio of work done for a client.</h2>
                        </a>
                        <a href="#" class="button button-link">View Detail</a>
                    </div>
                </div>

                <div class="portfolio__content">
                    <a href="#">
                        <img src="./c1c454929bf91ab26296.jpg" alt="" class="portfolio_img">
                    </a>

                    <div class="portfolio__data">
                        <span class="portfolio__subtitle">Ux design</span>
                        <a href="#">
                            <h2 class="portfolio__title">New portfolio of work done for a client.</h2>
                        </a>
                        <a href="#" class="button button-link">View Detail</a>
                    </div>
                </div>

                <div class="portfolio__content">
                    <a href="#">
                        <img src="./d255e3c0f648e0ea6987.jpg" alt="" class="portfolio_img">
                    </a>

                    <div class="portfolio__data">
                        <span class="portfolio__subtitle">Mobile app</span>
                        <a href="#">
                            <h2 class="portfolio__title">New portfolio of work done for a client.</h2>
                        </a>
                        <a href="#" class="button button-link">View Detail</a>
                    </div>
                </div>

                <div class="portfolio__content">
                    <a href="#">
                        <img src="./20b46b856fc0839d094b.jpg" alt="" class="portfolio_img">
                    </a>

                    <div class="portfolio__data">
                        <span class="portfolio__subtitle">Mobile app</span>
                        <a href="#">
                            <h2 class="portfolio__title">New portfolio of work done for a client.</h2>
                        </a>
                        <a href="#" class="button button-link">View Detail</a>
                    </div>
                </div>
            </div>
        </section>
```



### Portfolio CSS

```scss
@import url(https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;800&display=swap);
:root {
  --header-height: 3rem;
  /*=== Colors ===*/
  --first-color: #3e0e12;
  --first-color-dark: #2f0a0d;
  --text-color: #524748;
  --first-color-light: #7b6f71;
  --first-color-lighten: #fbf9f9;
  /*=== Font and typography ===*/
  --body-font: "Poppins", sans-serif;
  --biggest-font-size: 2.5rem;
  --h1-font-size: 1.5rem;
  --h2-font-size: 1.25rem;
  --h3-font-size: 1.25rem;
  --normal-font-size: 0.938rem;
  --small-font-size: 0.813rem;
  --smaller-font-size: 0.75rem;
  /*=== Font weight ===*/
  --font-medium: 500;
  --font-semi-bold: 600;
  --font-bold: 700;
  /*===  Margenes ===*/
  --mb-1: 0.5rem;
  --mb-2: 1rem;
  --mb-3: 1.5rem;
  --mb-4: 2rem;
  --mb-5: 2.5rem;
  --mb-6: 3rem;
  /*=== Z.index ===*/
  --z-normal: 1;
  --z-tooltip: 10;
  --z-fixed: 100;
}
@media screen and (min-width: 768px) {
  :root {
    --biggest-font-size: 4.5rem;
    --h1-font-size: 2.25rem;
    --h2-font-size: 1.5rem;
    --h3-font-size: 1.25rem;
    --normal-font-size: 1rem;
    --small-font-size: 0.875rem;
    --smaller-font-size: 0.813rem;
  }
}

/*=== BASE ===*/
*,
::before,
::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: var(--header-height) 0 0 0;
  font-family: var(--body-font);
  font-size: var(--normal-font-size);
  font-weight: var(--font-medium);
  background-color: var(--first-color-lighen);
  color: var(--text-color);
  line-height: 1.6;
}

h1,
h2,
h3,
ul,
p {
  margin: 0;
}

h2,
h3 {
  font-weight: var(--font-semi-bold);
}

ul {
  padding: 0;
  list-style: none;
}

a {
  text-decoration: none;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

/*==== CLASS CSS  ====*/
.section {
  padding: 4rem 0 2rem;
}

.section-title,
.section-subtitle {
  text-align: center;
}

.section-title {
  font-size: var(--h1-font-size);
  color: var(--first-color);
  margin-bottom: var(--mb-3);
}

.section-subtitle {
  display: block;
  font-size: var(--smaller-font-size);
  font-weight: var(--font-semi-bold);
}

.bd-container {
  max-width: 1024px;
  width: calc(100% - 2rem);
  margin-left: var(--mb-2);
  margin-right: var(--mb-2);
}

.bd-grid {
  display: grid;
  gap: 1.5rem;
}

.l-header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--z-fixed);
  background: #000;
}

/*=== NAV ===*/
.nav {
  height: var(--header-height);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .nav__menu {
    position: fixed;
    top: -100%;
    left: 0;
    width: 100%;
    padding-top: 1.5rem;
    text-align: center;
    background-color: #000;
    transition: 0.4s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 0 0 1rem 1rem;
  }
}
.nav__item {
  margin-bottom: var(--mb-3);
}

.nav__link {
  color: var(--first-color-lighten);
  transition: 0.3s;
}
.nav__link :hover {
  color: var(--first-color-light);
}

.nav__log,
.nav__toggle {
  color: var(--first-color-lighten);
}

.nav__toggle {
  font-size: 1.3rem;
  cursor: pointer;
}

/* Show menu */
.show-menu {
  top: var(--header-height);
}

/* Active menu */
.active-link {
  position: relative;
}

.active-link::after {
  content: "";
  position: absolute;
  bottom: -0.7rem;
  left: 0;
  width: 65%;
  height: 3px;
  background-color: var(--first-color-light);
}

/* Change background header color */
.scroll-header {
  background-color: var(--first-color-lighten);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.scroll-header .nav__logo,
.scroll-header .nav__toggle,
.scroll-header .nav__link {
  color: var(--first-color-dark);
}
.scroll-header .nav__menu {
  background-color: var(--first-color-lighten);
}

/*=== SCROLL TOP====*/
.scrolltop {
  position: fixed;
  right: 1rem;
  bottom: -20%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(123, 111, 113, 0.7);
  border-radius: 0.5rem;
  z-index: var(--z-tooltip);
  transition: 0.4s;
  visibility: hidden;
}
.scrolltop :hover {
  background-color: var(--first-color);
  border-radius: 0.5rem;
}

.scrolltop__icon {
  font-size: 2rem;
  color: var(--first-color-lighten);
}

/*show-scroll-top*/
.show-scroll {
  visibility: visible;
  bottom: 1.5rem;
}

.home {
  background-color: #000;
  overflow: hidden;
}

.home__container {
  position: relative;
  height: calc(100vh - var(--header-height));
  grid-template-rows: repeat(2, max-content);
  align-content: space-around;
  row-gap: 2rem;
}

.home__data {
  border-left: 4px solid var(--first-color-lighten);
  color: var(--first-color-lighten);
  padding-left: 1.5rem;
  z-index: var(--z-tooltip);
}

.home__name {
  font-size: var(--biggest-font-size);
}

.home__greeting,
.home__profession {
  display: block;
  font-weight: var(--font-bold);
}

.home__greeting {
  font-size: 0.813rem;
}

.home__profession {
  font-size: 0.938rem;
  margin-bottom: var(--mb-3);
}

.home__img {
  position: absolute;
  right: 0;
  bottom: 0;
}
.home__img img {
  width: 240px;
}

.home__social {
  display: flex;
  flex-direction: column;
}

.home__social-icon {
  width: max-content;
  font-size: 1.3rem;
  margin-bottom: var(--mb-2);
  color: var(--first-color-lighten);
}
.home__social-icon :hover {
  color: var(--first-color-light);
}

/*==== BUTTONS ====*/
.button {
  display: inline-block;
  background-color: var(--first-color);
  color: var(--first-color-lighten);
  padding: 0.75rem 1rem;
  border-radius: 0.25rem;
  transition: 0.3s;
  cursor: pointer;
}
.button :hover {
  background-color: var(--first-color-dark);
}

.button-light {
  background-color: var(--first-color-light);
}

.button-white {
  background-color: var(--first-color-lighten);
  color: var(--first-color-dark);
}
.button-white :hover {
  background-color: var(--first-color-lighten);
}

.button-link {
  background: none;
  color: var(--first-color);
  padding: 0;
}
.button-link :hover {
  background: none;
}

/*==== about__dat ====*/
.about__data {
  text-align: center;
}

.about__description span {
  font-size: var(--h2-font-size);
  font-weight: var(--font-semi-bold);
  color: var(--first-color);
}

.about__number {
  font-size: var(--h1-font-size);
  color: var(--first-color);
  display: block;
}

.about__img {
  justify-self: center;
  width: 200px;
  border-radius: 0.5rem;
}

.qualification__container {
  row-gap: 2.5rem;
}

.qualification__title {
  font-size: var(--h3-font-size);
  color: var(--first-color);
  margin-bottom: var(--mb-2);
  display: flex;
  align-items: center;
}

.qualification__title-icon {
  font-size: 1.5rem;
  margin-right: var(--mb-1);
}

.qualification__box {
  padding-bottom: 1rem;
  border-bottom: 1px solid #ccc;
}

s .qualification__area {
  font-size: var(--normal-font-size);
  color: var(--first-color);
  margin-bottom: var(--mb-1);
  font-weight: var(--font-medium);
}

.qualification__icon,
.qualification_work {
  font-size: var(--smaller-font-size);
  color: var(--first-color-light);
}

.qualification_work {
  display: block;
}

/*==== SERVICES  ====*/
.services__data {
  padding: 3rem 1rem;
  background-color: #fff;
  border-radius: 0.5rem;
  text-align: center;
  transition: 0.4s;
  box-shadow: 0 4px 6px rgba(174, 190, 205, 0.3);
}

services__icon,
.services__title {
  margin-bottom: var(--mb-2);
  color: var(--first-color);
}

.services__icon {
  font-size: 3rem;
}

.services__title {
  font-size: var(--h3-font-size);
}

.services__description {
  margin-bottom: var(--mb-4);
}

.services__data:hover {
  transform: translate(-0.5rem);
  box-shadow: 0 6px 8px rgba(174, 190, 205, 0.4);
}

/*PROJECT IN MIND*/
.project__container {
  padding: 1.5rem 1rem;
  background-color: var(--first-color-dark);
  color: var(--first-color-lighten);
  border-radius: 0.5rem;
  text-align: center;
}

.project__icon,
.project__title {
  margin-bottom: var(--mb-1);
}

.project__icon {
  font-size: 3.5rem;
}

.project__title {
  font-size: 1.5rem;
}

.project__description {
  margin-bottom: var(--mb-4);
}

/*=== PORTFOLIO ===*/
.portfolio__nav {
  text-align: center;
  margin-bottom: var(--mb-3);
}

.portfolio_item {
  margin: 0 var(--mb-2);
  cursor: pointer;
}

.portfolio__content {
  background-color: #fff;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(174, 190, 205, 0.3);
}

.portfolio__img {
  width: 100%;
  transition: 0.4s;
}

.portfolio__data {
  padding: 1.5rem;
}

.portfolio__subtitle {
  font-size: var(--small-font-size);
  color: var(--first-color-light);
}

.portfolio__title {
  font-size: var(--h3-font-size);
  color: var(--first-color);
  margin: var(--mb-2) 0;
}

.portfolio__content:hover {
  box-shadow: 0 6px 8px rgba(174, 190, 205, 0.4);
}
.portfolio__content:hover .portfolio__img {
  transform: scale(1.02);
}

```



---



## 10 MixItUp 3

+ Instalamos la dependencia  `npm install --save-dev mixitup`
+ O descargamos la versión mimificada de MixItUp desde la web https://www.kunkalabs.com/mixitup/
+ La importamos a nuestro index.js 

```javascript
import "./styles/index.scss";
import "./images/home.jpg";
import "./images/about.jpg";
import "./images/work1.jpg";
import "./images/work2.jpg";
import "./images/work3.jpg";
import "./images/work4.jpg";
import "./images/work5.jpg";
import "./images/work6.jpg";
import "boxicons";
import "mixitup";
import "./js/scripts.js";
```

+ O bien incrustamos el script 

```html
        <script src="/path/to/mixitup.min.js"></script>
    </body>
</html>
```





+ Para utilizar este plugin colocaremos las siguientes etiquetas 

```html

            <div class="portfolio__nav">
                <span class="portfolio__item" data-filter="all">All</span>
                <span class="portfolio__item" data-filter=".web">Web</span>
                <span class="portfolio__item" data-filter=".ux">Ui/Ux</span>
                <span class="portfolio__item" data-filter=".app">App</span>
            </div>


		 <div class="portfolio__content mix ux"> ...
```

+ Creamos un script para el control del dom

```javasc
/*=== FILTRO MIXER ===*/

const mixer = mixitup(".portfolio__container", {
  selectors: {
    target: ".portfolio__content",
  },
  animation: {
    duration: 400,
  },
});

/*=== Activo filtro*/

const linkPortfolio = document.querySelectorAll(".portfolio__item");

function activePortfolio() {
  if (linkPortfolio) {
    linkPortfolio.forEach((l) => l.classList.remove("active-portfolio"));
    this.classList.add("active-portfolio");
  }
}

linkPortfolio.forEach((l) => l.addEventListener("click", activePortfolio));
```



---

## 11 Testimonial

### Testimonial html

```html
        <!-- ===== TESTIMONIAL ===== -->
        <section class="testimonial section bd-container">
            <span class="section-subtitle">My client saying</span>
            <h2 class="section-title">Testiomial</h2>

            <div class="testimonial__container">
                <div class="testimonial__content">
                    <img src="./src/images/testimonial1.jpg" alt="" class="testimonial__img">
                    <h3 class="testimonial__title">Nik Holly</h3>
                    <span class="testimonial__client">Client</span>
                    <p class="testimonial__description">This company does a very good services, offers the best deals and does a good job, I recomend it.</p>
                </div>

                <div class="testimonial__content">
                    <img src="./src/images/testimonial2.jpg" alt="" class="testimonial__img">
                    <h3 class="testimonial__title">Sara Mill</h3>
                    <span class="testimonial__client">Client</span>
                    <p class="testimonial__description">This company does a very good services, offers the best deals and does a good job, I recomend it.</p>
                </div>

                <div class="testimonial__content">
                    <img src="./src/images/testimonial3.jpg" alt="" class="testimonial__img">
                    <h3 class="testimonial__title">Clay Mitchell</h3>
                    <span class="testimonial__client">Client</span>
                    <p class="testimonial__description">This company does a very good services, offers the best deals and does a good job, I recomend it.</p>
                </div>
            </div>
        </section>
```

 ### Testimonial CSS

```css
/*=== TESTIMONIAL ===*/
.testimonial__content {
  display: grid;
  background-color: var(--first-color-dark);
  color: var(--first-color-lighten);
  border-radius: 0.5rem;
  padding: 2rem 1rem;
  text-align: center;
  box-shadow: 0 4px 8px rgba(47, 10, 13, 0.25);
}

.testimonial__img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  justify-self: center;
  margin-bottom: var(--mb-1);
}

.testimonial__client {
  font-size: var(--small-font-size);
  color: var(--first-color-light);
  margin-bottom: var(--mb-2);
}
```

### Testimonial js

+ Usaremos la libreria https://swiperjs.com/

