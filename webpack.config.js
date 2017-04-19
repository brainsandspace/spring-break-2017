module.exports = ({
  entry: ['babel-polyfill', './src/index.js'],

  output: {
    filename: 'bundle.js',
  },

  // module: {}


  devtool: 'cheap-module.eval-sourcemap',
})