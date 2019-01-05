// 在客户端webpack启动时获取template
// webpack  devserver启动时候(开发时候)，template,不写到硬盘上面，无法读取文件

// 用http请求的方式在webpack  devserver启动的服务中读取template
// 使用axios http请求工具

const axios = require('axios')
const webpack = require('webpack')
const path = require('path')
const serverConfig = require('../../build/webpack.config.server')
// 从内存中读写内容
const MemoryFs = require('memory-fs')
const RreactDomServer = require('react-dom/server')
const proxy = require('http-proxy-middleware')
let serverBundle

// 获取通过webpack 打包 在devServer 服务中生成的index.html
const getTemplate = () => {
  return new Promise((resolve, reject) => {
    // 获取到打包文件
    axios.get('http://localhost:8888/public/index.html').then(
      res => {
        resolve(res.data)
      }
    ).catch(reject)
  })
}

//
const Module = module.constructor // mudule的构造方法
const mfs = new MemoryFs()
// 启动一个webpack complier 可以监听entery下依赖的文件是否有变化，有变化就重新打包
const serverComplier = webpack(serverConfig)

// webpack 配置提供项，通过mfs 去在内存读写文件，而不是在 fs 上读写
serverComplier.outputFileSystem = mfs
serverComplier.watch({}, (err, stats) => {
  if (err) throw err
  // state 是webpack打包过程中输出的信息
  stats = stats.toJson()
  stats.errors.forEach(err => console.error(err))
  stats.warnings.forEach(warn => console.warn(warn))

  // 读取server端打包信息
  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )

  // 读去取文件，获取string内容，而不是js里可以使用的模块内容 👆 module.constructor
  const bundle = mfs.readFileSync(bundlePath, 'utf-8')
  const m = new Module()
  // 使用module解析 js string 内容，生成一个新的模块, 必须指定名字
  m._compile(bundle, 'server.entry.js')
  // require  和 export 两种方式 注意是通过 exports 挂载的
  serverBundle = m.exports.default
})

module.exports = function (app) {
  // /public开头的所有请求都代理到 webpackdev server下启动的服务
  app.use('/public', proxy({
    target: 'http://localhost:8888'
  }))
  // 进行服务器渲染
  app.get('*', function (req, res) {
    // 返回服务端渲染结果返回浏览器端
    getTemplate().then(template => {
      const content = RreactDomServer.renderToString(serverBundle)
      res.send(template.replace('<!--app-->', content))
    })
  })
}
