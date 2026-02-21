module.exports = {
  plugins: [
    require("postcss-import"),
    require("postcss-nested"),
    require("postcss-preset-env"),
    require("autoprefixer"),
    ...(process.env.NODE_ENV === "production"
      ? [
          require("cssnano")({
            preset: "default",
          }),
        ]
      : []),
  ],
};
