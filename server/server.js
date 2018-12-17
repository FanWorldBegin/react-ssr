const express = require('express')

const ReactSSR = require('react-dom/server')
//访问的是打包后生成的， export defalut 使用require时候不会直接访问default 
const serverEntry = require('../dist/server-entry').default

// 将html文件读入
const fs = require('fs');
const path = require('path')
//同步的读文件，所有需要路径引用的尽可能使用绝对路径, 读入打包完成的html ,格式以 utf8 格式 string
const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8');

const app = express()
console.log(serverEntry) //打印出export 的对象

//给静态文件指定请求返回 express中提供的，模块帮助处理, 映射到文件夹
//public 在webpack.config.client/server中的 publicPath 中设置
app.use('/public', express.static(path.join(__dirname, '../dist')))


//浏览器发出的任何请求都返回服务端渲染的代码
app.get('*', function(req, res) {
  const appString = ReactSSR.renderToString(serverEntry)

  //template.replace('<app></app>', appString) - 替换内容
  res.send(template.replace('<app></app>', appString))

})

app.listen(3333, function() {
  console.log('server is listening on 3333')
})