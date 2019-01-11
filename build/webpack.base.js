const path = require('path')
// 提取出公共部分, 深度拷贝，不会直接覆盖output对象
// 里面的内容也会一条条对比
module.exports = {
  output: {
    // nodejs没有缓存的说法，所以直接写名字就好
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/'
  },
  // 不需要写后缀的文件类型
  resolve: {
    extensions: ['.js', '.jsx']
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
