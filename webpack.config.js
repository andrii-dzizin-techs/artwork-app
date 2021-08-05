'use strict';

// let path = require('path');
// let webpack = require('webpack');

// const Encore = require('@symfony/webpack-encore');
// let config = Encore.getWebpackConfig();
// config.node = { fs: 'empty' };

module.exports = {
  mode: 'development',
  // mode: 'production',
  watch: true,
  target: 'web',
  node: {
    fs: 'empty'
  },

  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: [['@babel/preset-env', {
          //       // debug: true,
          //       corejs: 3,
          //       useBuiltIns: "usage"
          //   }]]
          // }
        }
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
    ]
  }
};