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
