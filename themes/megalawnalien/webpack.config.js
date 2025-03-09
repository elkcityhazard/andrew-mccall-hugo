const path = require("path");

module.exports = {
  mode: "development",
  devtool: "source-map",
  watch: process.env.NODE_ENV === "production" ? false : true,
  entry: "./src/scripts/index.ts",
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
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", "css", "scss"],
  },
  output: {
    filename: "script.js",
    path: path.resolve(__dirname, "assets/dist/js"),
  },
};
