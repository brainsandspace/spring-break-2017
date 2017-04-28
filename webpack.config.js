const CircularDependencyPlugin = require('circular-dependency-plugin');
const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],

  output: {
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['stage-0', 'react', 'es2015'],
        },
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            query: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
    ],
  },

  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
  },

  devtool: 'cheap-module.eval-sourcemap',

  plugins: [
    // keeps me from using accidentally using circular dependencies
    new CircularDependencyPlugin({
      exclude: /node_modules.*/,
      failOnError: true,
    }),
  ],
};
