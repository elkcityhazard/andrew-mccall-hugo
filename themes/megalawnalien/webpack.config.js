const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  devtool: "source-map",
  watch: process.env.NODE_ENV === "production" ? false : true,
  entry: "./src/js/main.js",
  plugins: [...(MiniCssExtractPlugin ? [new MiniCssExtractPlugin()] : [])],
  module: {
    rules: [
      {
        test: /\.ts?x$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          ...(MiniCssExtractPlugin
            ? [MiniCssExtractPlugin.loader, "css-loader"]
            : []),
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css", ".scss"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "static/"),
  },
};
