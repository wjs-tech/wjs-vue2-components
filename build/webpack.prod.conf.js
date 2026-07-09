const baseConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash:8].js'
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin()
  ]
})
