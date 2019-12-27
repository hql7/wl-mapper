const path = require('path');

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
      use: 'babel-loader',
      exclude: /node_modules/
    }]
  }
}

const minmapper = {
  mode: "production",
  entry: './src/wlmapper.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'wl-mapper.min.js'
  },
}

module.exports = [es5mapper, minmapper]