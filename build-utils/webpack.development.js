var path = require('path');

module.exports = () => ({
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './src',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
});
