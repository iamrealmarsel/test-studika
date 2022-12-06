const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');

module.exports = {
  entry: [paths.src + '/index.ts'],

  plugins: [
    new HtmlWebpackPlugin({
      template: paths.src + '/index.html',
      filename: 'index.html',
      favicon: paths.public + '/img/favicon.webp',
    }),
  ],

  module: {
    rules: [
      { test: /\.html$/i, use: ['html-loader'] },

      { test: /\.ts?$/, use: 'ts-loader', exclude: /node_modules/ },

      { test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i, type: 'asset/resource' },
    ],
  },

  resolve: {
    extensions: ['.ts', '...'],
  },
};
