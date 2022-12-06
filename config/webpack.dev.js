const { merge } = require('webpack-merge');

const paths = require('./paths');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',

  devtool: 'inline-source-map',

  output: {
    publicPath: '/',
    filename: '[name].bundle.js',
    assetModuleFilename: 'img/[name].[ext]',
  },

  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.(sass|scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1, modules: false },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [['postcss-preset-env', { browsers: 'last 2 versions' }]],
              },
            },
          },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
});
