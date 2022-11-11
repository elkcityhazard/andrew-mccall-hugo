const path = require('path')

module.exports = {
    entry: "./themes/somrat/src/index.js",
    output: {
        path: path.resolve(__dirname, "public/js"),
        filename: "bundle.js"
    },
    devServer: {
        static: {
          directory: path.join(__dirname, 'themes/somrat/dist/assets/js/'),
        },
        compress: true,
        port: 9000
      },
}