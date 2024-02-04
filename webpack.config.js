const path = require('path');

module.exports = {
  mode: 'none',
  entry: path.resolve(__dirname, 'public/js/index.js'),
  output: {
    path: path.resolve(__dirname, 'public/js/bundled'),
    filename: 'bundle.js',
    clean: true,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'public'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
