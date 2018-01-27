var webpack = require("webpack")
var merge = require('webpack-merge')
var base = require('./webpack.config')

module.exports = merge(base, {
  target: 'node',
  output: {
    filename: 'ssr.js',
  },
})