const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/wl-mapper.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'wl-mapper.min.js'
  }
}