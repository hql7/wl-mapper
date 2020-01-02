const path = require('path');
const UglifyESPlugin  = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: "production",
  entry: './src/wlmapper.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'wl-mapper.min.js'
  },
  plugins: [
    // 压缩输出的 JS 代码
    new UglifyESPlugin({
      // 多嵌套了一层
      uglifyOptions: {
        compress: {
          // 在UglifyJs删除没有用到的代码时不输出警告
          warnings: false,
          // 删除所有的 `console` 语句，可以兼容ie浏览器
          drop_console: true,
          // 内嵌定义了但是只用到一次的变量
          collapse_vars: true,
          // 提取出出现多次但是没有定义成变量去引用的静态值
          reduce_vars: true,
        },
        output: {
          // 最紧凑的输出
          beautify: false,
          // 删除所有的注释
          comments: false,
        }
      }
    })
  ],
}