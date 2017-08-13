const path = require('path');

const projectRoot = path.resolve(__dirname, '../../../');

module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [projectRoot],
        exclude: /node_modules/,
      },
    ],
  },
};
