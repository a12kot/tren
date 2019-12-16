const path = require("path");

scripts: {
  dev: "webpack --mode development"
}

module.exports = {
  entry: './js/index.js',
  output: {
    filename: 'code.js',
    path: path.resolve(__dirname, 'dist'),
    },
  watch: true,
} 