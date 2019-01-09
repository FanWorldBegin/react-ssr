// 服务端使用
// 使用绝对路径path,避免系统差异
const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')

module.exports = webpackMerge(baseConfig,
  {
    // 说明webpack打包出来的内容使用在哪个环境里面
    // web(浏览器) node(nodejs)
    target: 'node',
    mode: 'development',
    // app.js为打包入口，形成依赖🌲
    entry: {
      app: path.join(__dirname, '../client/server.entry.js')
    },
    // 打包后输出的地方
    output: {
      // nodejs没有缓存的说法，所以直接写名字就好
      filename: 'server-entry.js',
      // 打包出的js使用的模块方案，amd cmd ...
      // 使用最新的commonjs的模块加载方案
      libraryTarget: 'commonjs2'
    },
  }
)
