const webpack = require('webpack');

module.exports = {
  entry: [
    './src/index.jsx'
  ],
    devServer: {
    inline: true,
    contentBase: "./public",
    port: 3000
},
  output: {
    path: __dirname + '/public/js',
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
        test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    }]
  },
  
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
