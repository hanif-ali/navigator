module.exports = {
  svgo: true,
  icon: true,
  svgoConfig: {
    plugins: [
      {
        name: "preset-default",
        removeViewBox: false,
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
    ],
  },
};
