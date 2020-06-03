const path = require('path')

const mode = process.env.NODE_ENV || 'development'
const config = {
  entry: path.resolve(__dirname, '../src/scripts/index.js'),
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: 'svelte-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  mode
}

module.exports = config
