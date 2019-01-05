const express = require('express')

const ReactSSR = require('react-dom/server')

// 判断是否为开发环境
const isDev = process.env.NODE_ENV == 'development'

// 将html文件读入
const fs = require('fs')
const path = require('path')

const app = express()

app.listen(3333, function () {
  console.log('server is listening on 3333')
})

/**
 * 1. 不是开发环境下，才会在dist 目录下有index.html 文件
 * 2.静态文件服务也是
 * 3. serverEntry
*/
if (!isDev) {
  // 访问的是打包后生成的， export defalut 使用require时候不会直接访问default
  const serverEntry = require('../dist/server-entry').default
  // 同步的读文件，所有需要路径引用的尽可能使用绝对路径, 读入打包完成的html ,格式以 utf8 格式 string
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')

  // 浏览器发出的任何请求都返回服务端渲染的代码 (打包文件代码)
  app.get('*', function (req, res) {
    const appString = ReactSSR.renderToString(serverEntry)

    // template.replace('<app></app>', appString) - 替换内容
    res.send(template.replace('<!-- app -->', appString))
  })

  // 给静态文件指定请求返回 express中提供的，模块帮助处理, 映射到文件夹
  // public 在webpack.config.client/server中的 publicPath 中设置
  app.use('/public', express.static(path.join(__dirname, '../dist')))
} else {
  const devStatic = require('./util/dev.static')
  devStatic(app)
}
