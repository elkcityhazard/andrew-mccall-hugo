module.exports = {
    plugins: [
      require('postcss-import'),
      require('postcss-preset-env')({
        // Options for postcss-preset-env
        // For example, to enable sourcemaps:
        map: true,
      }),
    ],
  };