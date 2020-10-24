const path = require("path");
const webpack = require("webpack");

const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const parts = require("./webpack.parts");

const APP_DIR = path.resolve(__dirname, "src");
const PUBLIC_DIR = path.resolve(__dirname, "public");
const DIST_DIR = path.resolve(__dirname, "dist");

const common = merge([
  parts.loadJS({
    include: [APP_DIR],
  }),
  {
    entry: `${APP_DIR}/index.jsx`,
    output: {
      filename: "bundle.js",
      path: DIST_DIR,
      publicPath: "/",
    },
    resolve: {
      alias: {
        "~components": path.join(APP_DIR, "./components"),
        "~helpers": path.join(APP_DIR, "./helpers"),
        "~styles": path.join(APP_DIR, "./styles"),
      },
      extensions: [".js", ".jsx"],
      modules: [APP_DIR, path.join(__dirname, "./node_modules")],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: `${PUBLIC_DIR}/index.html`,
        filename: "index.html",
        inject: "body",
      }),
    ],
  },
]);

const development = merge([
  parts.loadSass({
    include: [APP_DIR],
  }),
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.hotReload(),
  parts.generateSourceMaps({ type: "inline-source-map" }),
]);

const production = merge([
  {
    output: {
      chunkFilename: "[name].[chunkhash].js",
      filename: "[name].[chunkhash].js",
    },
    performance: {
      hints: "warning",
      maxEntrypointSize: 250000,
      maxAssetSize: 200000,
    },
  },
  parts.clean(),
  parts.extractCSS({
    include: [APP_DIR],
  }),
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true,
      },
    },
    safe: true,
  }),
  parts.minifyJS(),
  parts.generateSourceMaps({ type: "source-map" }),
  {
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "initial",
          },
        },
      },
      runtimeChunk: {
        name: "manifest",
      },
    },
  },
  parts.attachRevision(),
]);

module.exports = (mode) => {
  if (mode === "production") {
    return merge(common, production, { mode });
  }
  return merge(common, development, { mode });
};
