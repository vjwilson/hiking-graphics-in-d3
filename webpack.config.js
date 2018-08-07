const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);

module.exports = ({ mode, presets } = { mode: 'production', presets: [] }) => {
  const htmlConfig = {
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body'
  };

  return webpackMerge(
    {
      mode,
      output: {
        filename: 'bundle.js'
      },
      plugins: [
        new HtmlWebpackPlugin(htmlConfig),
        new webpack.ProgressPlugin()
      ]
    },
    modeConfig(mode)
  );
};
