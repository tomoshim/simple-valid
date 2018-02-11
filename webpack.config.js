var webpack = require("webpack");
var ENV = process.env.NODE_ENV;
var plugins = [];

if (ENV === 'production') {
  plugins.push(
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true
      },
      sourceMap: false
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  );
}


module.exports = {

  entry: {
    bundle: './src/entry.js'
  },

  output: {
    filename: './lib/simple-valid.min.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [ 'env']
        }
      }
    ]

  },

  devtool: "#source-map",

  resolve: {
    extensions: ['.js']
  },

  plugins: plugins
};
