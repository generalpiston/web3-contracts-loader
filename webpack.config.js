const Webpack = require("Webpack");
const Path = require("path");

const outPath = Path.join(__dirname, "build");
const sourcePath = Path.join(__dirname, "src");

module.exports = {
  entry: {
    index: Path.join(sourcePath, "index.ts")
  },
  devtool: "source-map",
  target: "node",
  output: {
    filename: "[name].js",
    path: outPath,
    publicPath: "/"
  },
  resolve: {
    extensions: [".ts", ".js"],
    mainFields: ["browser", "main"]
  },
  module: {
    rules: [{
      test: /\.ts$/,
      use: "awesome-typescript-loader"
    }]
  },
  plugins: [
    new Webpack.NamedModulesPlugin(),
    new Webpack.NoEmitOnErrorsPlugin(),
    new Webpack.optimize.AggressiveMergingPlugin()
  ],
  node: {
    fs: "empty",
    net: "empty"
  }
};
