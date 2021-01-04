const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: {
    secvisogram: './lib/SecvisogramPage.js',
    ...(process.env.NODE_ENV === 'production'
      ? {}
      : {
          'view-tests': './viewTests/frame.js',
          'view-tests-canvas': './viewTests/canvas.js',
          tests: [
            'mocha/mocha.css',
            'mocha/mocha.js',
            './tests/mochaSetup.js',
            './tests/index.js',
            './tests/mochaRun.js',
          ],
        }),
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          { loader: 'postcss-loader' },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HTMLWebpackPlugin({ chunks: ['secvisogram'] }),
    ...(process.env.NODE_ENV === 'production'
      ? []
      : [
          new HTMLWebpackPlugin({
            chunks: ['view-tests'],
            filename: 'view-tests.html',
          }),
          new HTMLWebpackPlugin({
            chunks: ['view-tests-canvas'],
            filename: 'view-tests-canvas.html',
          }),
          new HTMLWebpackPlugin({
            chunks: ['tests'],
            filename: 'tests.html',
            template: './tests/index.html',
          }),
        ]),
  ],
}
