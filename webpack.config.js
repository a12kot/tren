const path = require("path");


module.exports = {
  entry: './js/index.js',
  output: {
    filename: 'code.js',
    path: path.resolve(__dirname, 'dist'),
    },
  watch: true,
} 