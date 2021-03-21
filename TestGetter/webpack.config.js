const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/TestGetter.ts",
  output: {
    filename: "TestGetter.js",
    path: path.join(__dirname, "bin"),
  },
  devtool: false,
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
