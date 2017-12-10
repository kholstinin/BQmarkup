const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    main: './scripts/src/mainPage/index.js',
    account: './scripts/src/account/index.js',
    order: './scripts/src/order/index.js'
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
  ]
};



