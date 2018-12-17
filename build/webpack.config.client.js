//使用绝对路径path,避免系统差异
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
module.exports = {
  //app.js为打包入口，形成依赖🌲
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  //打包后输出的地方
  output: {
    //[] 中括号是变量的意思，filename中的变量有 
    // name 代表 entry下面对应的一项的名字，这里为 app
    //hash 在对整个app打包完成后，会根据内容生成hash值，只要内容不一样会变化
    filename: '[name].[hash].js',
    //path 输出文件存放路径, 根目录下 dist 文件夹
    path: path.join(__dirname, '../dist'),
    //静态资源引用路径，publicPath为空时： 在html 中打包后生成的script 路径为 app.hash.js
    //publicPath='/public  ---- /public/app.hash.js
    //帮我们区分url为静态资源还是url 请求，添加前缀
    //当静态资源要部署在CDN上面时候，将CDN的域名写入publicPath 即可
    publicPath: '/public',
  },
  //配置loader
  module: {
    rules: [
      {
        test: /\.(jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": ["@babel/preset-react"]
          }
        }
      },
      {
        test: /\.(js)$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      }
    ]
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, '../client/template.html')
    })
  ]
}