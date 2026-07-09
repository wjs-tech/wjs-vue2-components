const baseConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    contentBase: '../dist',
    hot: true,
    port: 8080,
    open: true,
    historyApiFallback: true
  },
  devtool: 'cheap-module-eval-source-map'
})
