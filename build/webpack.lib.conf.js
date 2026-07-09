/**
 * 组件库打包为 umd 库配置
 *
 * 原 package.json 的 build:lib 脚本引用了缺失的 webpack.lib.conf.js，
 * 这里补上。vue / element-ui 作为 externals 不打包进库。
 *
 * wjs created by 2024-07-13
 */
const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')

module.exports = merge(baseConfig, {
  mode: 'production',
  entry: './src/components/index.js',
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: 'wjs-vue2-components.js',
    library: 'WjsVue2Components',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    },
    'element-ui': {
      root: 'ELEMENT',
      commonjs: 'element-ui',
      commonjs2: 'element-ui',
      amd: 'element-ui'
    }
  }
})
