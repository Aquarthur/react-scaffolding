const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const APP_DIR = path.resolve(__dirname, "./src");
const PUBLIC_DIR = path.resolve(__dirname, "./public");
const DIST_DIR = path.resolve(__dirname, "./dist");

module.exports = {
  entry: ["@babel/polyfill", `${APP_DIR}/index.js`],
  output: {
    filename: "bundle.js",
    path: DIST_DIR,
    publicPath: "/",
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
    stats: "minimal",
  },
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx$/],
        exclude: [/node_modules/, /dist/],
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.scss$/,
        include: [APP_DIR],
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.json$/,
        include: `${PUBLIC_DIR}/manifest.json`,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "manifest.json",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${PUBLIC_DIR}/index.html`,
      filename: "index.html",
      inject: "body",
    }),
  ],
};
