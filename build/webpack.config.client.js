const webpack = require('webpack')
// 使用绝对路径path,避免系统差异
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')
// 判断当前环境， 在启动命令中手动输入，在启动webpack时候手动输入指令区分开发环境，线上环境
const isDev = process.env.NODE_ENV == 'development'

console.log(process.env.NODE_ENV)

const config = webpackMerge(baseConfig,
  {
    mode: 'development',
    // app.js为打包入口，形成依赖🌲
    entry: {
      app: path.join(__dirname, '../client/app.js')
    },
    // 打包后输出的地方
    output: {
      // [] 中括号是变量的意思，filename中的变量有
      // name 代表 entry下面对应的一项的名字，这里为 app
      // hash 在对整个app打包完成后，会根据内容生成hash值，只要内容不一样会变化
      filename: '[name].[hash].js'
      // path 输出文件存放路径, 根目录下 dist 文件夹
      // 静态资源引用路径，publicPath为空时： 在html 中打包后生成的script 路径为 app.hash.js
      // publicPath='/public  ---- /public/app.hash.js
      // 帮我们区分url为静态资源还是url 请求，添加前缀
      // 当静态资源要部署在CDN上面时候，将CDN的域名写入publicPath 即可
    },
    plugins: [
      new HTMLPlugin({
        template: path.join(__dirname, '../client/template.html')
      })
    ]
  }
)

// 是开发环境的话增加配置
if (isDev) {
  // webpack的entry 可以是数组类型的，数组代表这个entry里面包含了的引用文件都会打包到同一个文件中
  // react-hot-loader/patch 是客户端热更新代码使需要用到的内容，都封装在patch模块中
  config.entry = {
    app: [
      // 'react-hot-loader/patch',  好像可以不加
      path.join(__dirname, '../client/app.js')

    ]
  }
  config.devServer = {
    // 可以使用任何方式访问，指向本机ip
    host: '0.0.0.0',
    // 启动server 的端口
    port: '8888',
    // output中编译文件的存储位置
    contentBase: path.join(__dirname, '../dist'),
    // 启动 hot module replacement
    hot: true,
    // webpack 编译过程中，出现任何错误，在网页上面显示黑色背景和错误信息，
    // errors: true只显示错误信息， warning
    overlay: {
      errors: false
    },
    // 访问所有静态路径都需要加/public 才能访问到生成的public静态文件
    publicPath: '/public/',
    // 指定dist 下的 index.html,当请求url 为404时候，应该返回这个页面。
    historyApiFallback: {
      index: '/public/index.html'
    }
  }
  // HotModuleReplacementPlugin 由于这个包时webpack里面的，记得要引用webpack
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}
module.exports = config
