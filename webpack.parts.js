const cssnano = require("cssnano");
const webpack = require("webpack");

const AutoPrefixer = require("autoprefixer");
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

exports.devServer = ({ host, port } = {}) => ({
  // TODO: use dotenv for HOST/PORT?
  devServer: {
    stats: "minimal",
    host,
    port,
    historyApiFallback: true,
    overlay: true,
  },
});

exports.hotReload = () => ({
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
});

exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});

exports.clean = () => ({
  plugins: [new CleanWebpackPlugin()],
});

exports.attachRevision = () => ({
  plugins: [
    new webpack.BannerPlugin({
      banner: new GitRevisionPlugin().version(),
    }),
  ],
});

exports.loadSass = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.scss$/,
        include,
        exclude,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
});

const autoPrefix = () => ({
  loader: "postcss-loader",
  options: {
    plugins: () => [new AutoPrefixer()],
  },
});

exports.extractCSS = ({ include, exclude } = {}) => {
  const plugin = new MiniCssExtractPlugin({
    filename: "[name].[contenthash].css",
  });

  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          include,
          exclude,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            autoPrefix(),
            "sass-loader",
          ],
        },
      ],
    },
    plugins: [plugin],
  };
};

exports.minifyCSS = ({ options }) => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: options,
      canPrint: false,
    }),
  ],
});

exports.loadJS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx$/],
        include,
        exclude,
        use: ["babel-loader", "eslint-loader"],
      },
    ],
  },
});

exports.minifyJS = () => ({
  optimization: {
    minimizer: [new TerserPlugin()],
  },
});
