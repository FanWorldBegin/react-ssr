// 服务端使用
// 使用绝对路径path,避免系统差异
const path = require('path')

module.exports = {
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
    path: path.join(__dirname, '../dist'),
    // 打包出的js使用的模块方案，amd cmd ...
    // 使用最新的commonjs的模块加载方案
    libraryTarget: 'commonjs2',
    publicPath: '/public/'
  },
  // 配置loader
  module: {
    rules: [
      {
        // 在执行真正的loader代码编译之前，执行这个检查, 一旦报错就不需要继续
        enforce: 'pre',
        test: /.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ]

      },
      {
        test: /\.(jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            'presets': ['@babel/preset-react']
          }
        }
      },
      {
        test: /\.(js)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      }
    ]
  }
}
