const path = require('path');

module.exports = {
  entry: ['./client/index.js'],
  output: {
    path: path.resolve('public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: [ 'style-loader', 'css-loader' ] },
      
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: ["react","babel-preset-es2015"] }}
    ]
  }
};
