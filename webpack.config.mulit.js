const path = require('path');

// 打包一份es5代码
const es5mapper = {
  mode: "production",
  entry: './src/wlmapper.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'wl-mapper-es5.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ["@babel/preset-env"]
        }
      },
      exclude: /node_modules/
    }]
  }
}

// 打包一份压缩代码
const minmapper = {
  mode: "production",
  entry: './src/wlmapper.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'wl-mapper.min.js'
  }
}

module.exports = [es5mapper, minmapper]